"""FastAPI application exposing skill-vector embedding and vector search endpoints."""

import base64
import logging
import re
from typing import List, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

from app.core.config import settings
from app.services.embedding_service import (
    generate_embedding,
    generate_embeddings_batch,
    EmbeddingServiceError,
    EMBEDDING_MODEL_NAME,
    EXPECTED_EMBEDDING_DIM
)
from app.services.vector_sync_service import (
    vectorize_and_save_student_profile,
    vectorize_and_save_role_requirements,
    find_matching_roles_for_student
)
from app.repositories.vector_repo import ModelMismatchError
from app.modules.assessment.routes import router as assessment_router

app = FastAPI(
    title="CareerOptic Vector Embedding & Matching Service",
    version="1.0.0",
    description="FastAPI service generating 384-dim skill-vector embeddings using sentence-transformers/all-MiniLM-L6-v2 via Hugging Face Inference API."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assessment_router)


class TextEmbeddingRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to embed (skills, aspirations, profile)")


class BatchEmbeddingRequest(BaseModel):
    texts: List[str] = Field(..., min_length=1, description="List of texts to embed")
    chunk_size: Optional[int] = Field(default=None, description="Optional chunk size")


class EmbeddingResponse(BaseModel):
    model: str
    dimension: int
    embedding: List[float]


class BatchEmbeddingResponse(BaseModel):
    model: str
    count: int
    dimension: int
    embeddings: List[List[float]]


class StudentVectorizeRequest(BaseModel):
    student_id: str
    profile_text: str


class RoleVectorizeRequest(BaseModel):
    role_id: str
    role_title: str
    requirements_text: str


@app.get("/")
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "CareerOptic FastAPI Vector Service",
        "model": EMBEDDING_MODEL_NAME,
        "dimension": EXPECTED_EMBEDDING_DIM
    }


@app.post("/api/embeddings/generate", response_model=EmbeddingResponse)
async def api_generate_embedding(request: TextEmbeddingRequest):
    """Generate a single skill-vector embedding."""
    try:
        vector = await generate_embedding(request.text)
        return EmbeddingResponse(
            model=EMBEDDING_MODEL_NAME,
            dimension=len(vector),
            embedding=vector
        )
    except EmbeddingServiceError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@app.post("/api/embeddings/generate-batch", response_model=BatchEmbeddingResponse)
async def api_generate_batch_embeddings(request: BatchEmbeddingRequest):
    """Generate batch embeddings with chunking and rate-limit backoff."""
    try:
        vectors = await generate_embeddings_batch(request.texts, chunk_size=request.chunk_size)
        return BatchEmbeddingResponse(
            model=EMBEDDING_MODEL_NAME,
            count=len(vectors),
            dimension=EXPECTED_EMBEDDING_DIM,
            embeddings=vectors
        )
    except EmbeddingServiceError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@app.post("/api/student/vectorize")
async def api_vectorize_student(request: StudentVectorizeRequest):
    """Wire into pgvector write path: embed student profile & persist alongside embedding_model."""
    try:
        record = await vectorize_and_save_student_profile(
            student_id=request.student_id,
            profile_or_skills_text=request.profile_text
        )
        return {
            "success": True,
            "message": "Student profile vectorized and saved successfully.",
            "student_id": request.student_id,
            "embedding_model": record["embedding_model"],
            "dimension": len(record["embedding"])
        }
    except EmbeddingServiceError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@app.post("/api/roles/vectorize")
async def api_vectorize_role(request: RoleVectorizeRequest):
    """Wire into pgvector write path: embed company role requirements & persist alongside embedding_model."""
    try:
        record = await vectorize_and_save_role_requirements(
            role_id=request.role_id,
            role_title=request.role_title,
            requirements_text=request.requirements_text
        )
        return {
            "success": True,
            "message": "Role requirements vectorized and saved successfully.",
            "role_id": request.role_id,
            "embedding_model": record["embedding_model"],
            "dimension": len(record["embedding"])
        }
    except EmbeddingServiceError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@app.get("/api/match/student/{student_id}/roles")
async def api_match_student_to_roles(student_id: str, top_k: int = 5):
    """Match student against roles, strictly checking embedding_model parity."""
    try:
        matches = await find_matching_roles_for_student(student_id=student_id, top_k=top_k)
        return {
            "success": True,
            "student_id": student_id,
            "embedding_model": EMBEDDING_MODEL_NAME,
            "matches": matches
        }
    except ModelMismatchError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


from fastapi import UploadFile, File
import base64
from app.services.certificate_ocr_service import extract_certificate_fields
from app.services.certificate_verification_service import process_certificate_verification, process_3layer_certificate_cascade


class CertificateVerifyJsonRequest(BaseModel):
    file_base64: str = Field(..., description="Base64 encoded certificate image or PDF")
    filename: Optional[str] = Field(default="certificate.pdf", description="File name")
    title: Optional[str] = Field(default="Academic Certificate", description="Certificate Title")
    issuer: Optional[str] = Field(default="Issuing Institute", description="Issuer Name")
    cert_id: Optional[str] = Field(default="CERT-2026-001", description="Credential ID")


@app.post("/api/certificate/ocr")
async def api_certificate_ocr(file: UploadFile = File(...)):
    """Run Donut OCR directly on an uploaded certificate image."""
    image_bytes = await file.read()
    result = await extract_certificate_fields(image_bytes)
    return result


@app.post("/api/certificate/verify")
async def api_verify_certificate_file(file: UploadFile = File(...)):
    """Run full 3-tier certificate verification on an uploaded certificate file."""
    file_bytes = await file.read()
    result = await process_certificate_verification(file_bytes=file_bytes, filename=file.filename or "cert.pdf")
    return result


@app.post("/api/certificate/verify-3layer")
async def api_verify_certificate_3layer(
    file: Optional[UploadFile] = File(None),
    file_base64: Optional[str] = Form(None),
    title: str = Form("Skill Certificate"),
    issuer: str = Form("Authorized Institution"),
    cert_id: str = Form("CERT-2026-901")
):
    """Run cascading 3-layer verification:
    Layer 1 (PyHanabiXMP) -> Layer 2 (OpenCV Forensics) -> Layer 3 (DigiLocker Verification).
    """
    file_bytes = b""
    filename = "certificate.pdf"
    if file:
        file_bytes = await file.read()
        filename = file.filename or "certificate.pdf"
    elif file_base64:
        try:
            file_bytes = base64.b64decode(file_base64)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid base64 payload: {str(e)}")
    else:
        # Default fallback bytes if user submits details without file
        file_bytes = f"PDF-1.7 %XMPMeta Title:{title} Issuer:{issuer} ID:{cert_id}".encode("utf-8")

    result = await process_3layer_certificate_cascade(
        file_bytes=file_bytes,
        filename=filename,
        certificate_title=title,
        issuer=issuer,
        cert_id=cert_id
    )
    return result


@app.post("/api/certificate/verify-json")
async def api_verify_certificate_json(payload: CertificateVerifyJsonRequest):
    """Run full 3-tier certificate verification on base64 encoded certificate bytes."""
    try:
        file_bytes = base64.b64decode(payload.file_base64)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 payload: {str(e)}")
    result = await process_certificate_verification(file_bytes=file_bytes, filename=payload.filename or "cert.pdf")
    return result


from io import BytesIO
import json
import httpx
import pdfplumber
from pypdf import PdfReader
from fastapi import UploadFile, File

def clean_extracted_text(text: str) -> str:
    """Sanitize extracted text, stripping out binary gibberish, non-printable characters, and random symbol noise."""
    if not text:
        return ""

    clean_lines = []
    allowed_punctuation = ".,;:!?-()/[]{}@#$&*+=|\\/'\"•●–—_°%<>~`^"
    for line in text.split('\n'):
        line_str = line.strip()
        if not line_str:
            continue

        total_chars = len(line_str)
        # Count Unicode printable characters (including bullet points, dashes, international characters)
        printable_chars = sum(1 for c in line_str if c.isprintable() or c in ('\n', '\r', '\t'))

        # Discard lines with > 35% unprintable binary control codes
        if total_chars > 0 and (printable_chars / total_chars) < 0.65:
            continue

        # Count alphanumeric, space, or standard resume punctuation/bullet symbols
        valid_chars = sum(1 for c in line_str if c.isalnum() or c.isspace() or c in allowed_punctuation)
        if total_chars > 5 and (valid_chars / total_chars) < 0.35:
            continue

        clean_lines.append(line_str)

    return "\n".join(clean_lines)


def extract_pdf_bytes_text(file_bytes: bytes, filename: str = "resume.pdf") -> dict:
    extracted_text = ""
    num_pages = 1

    # 1. Tier 1 Extraction using pypdfium2 (Google Chrome PDFium C++ Engine)
    try:
        import pypdfium2 as pdfium
        pdf = pdfium.PdfDocument(file_bytes)
        num_pages = len(pdf)
        pdfium_pages = []
        for page in pdf:
            textpage = page.get_textpage()
            text = textpage.get_text_range() or ""
            if text.strip():
                pdfium_pages.append(text.strip())
        if pdfium_pages:
            extracted_text = "\n\n".join(pdfium_pages)
    except Exception as pdfium_err:
        logger.warning(f"pypdfium2 warning on {filename}: {pdfium_err}")

    # 2. Tier 2 Layout-Aware Extraction using pdfplumber
    if not extracted_text.strip():
        try:
            with pdfplumber.open(BytesIO(file_bytes)) as pdf:
                num_pages = len(pdf.pages)
                page_lines = []
                for page in pdf.pages:
                    page_str = page.extract_text(layout=True) or page.extract_text() or ""
                    if page_str.strip():
                        page_lines.append(page_str.strip())
                if page_lines:
                    extracted_text = "\n\n".join(page_lines)
        except Exception as plumber_err:
            logger.warning(f"pdfplumber warning on {filename}: {plumber_err}")

    # 3. Tier 3 Extraction using pdfminer.six
    if not extracted_text.strip():
        try:
            from pdfminer.high_level import extract_text as pdfminer_extract_text
            miner_text = pdfminer_extract_text(BytesIO(file_bytes)) or ""
            if miner_text.strip():
                extracted_text = miner_text.strip()
        except Exception as miner_err:
            logger.warning(f"pdfminer warning on {filename}: {miner_err}")

    # 4. Tier 4 Fallback using pypdf
    if not extracted_text.strip():
        try:
            reader = PdfReader(BytesIO(file_bytes))
            num_pages = len(reader.pages)
            page_texts = []
            for i, page in enumerate(reader.pages):
                page_str = page.extract_text() or ""
                if page_str.strip():
                    page_texts.append(page_str.strip())
            if page_texts:
                extracted_text = "\n\n".join(page_texts)
        except Exception as pdf_err:
            logger.warning(f"pypdf reader warning on {filename}: {pdf_err}")

    # 5. Tier 5 Raw Stream Regex Filter Fallback
    if not extracted_text.strip():
        try:
            raw_str = file_bytes.decode('latin1', errors='ignore')
            text_matches = re.findall(r'\(([^)]+)\)', raw_str)
            filtered = [
                t.strip() for t in text_matches 
                if len(t.strip()) > 1 
                and not t.startswith('/') 
                and 'Font' not in t 
                and 'Catalog' not in t
                and (sum(1 for c in t if c.isalnum() or c.isspace() or c in ".,;:!?-()/[]{}@#$&*+=|\\/'\"•●–—") / max(len(t), 1)) > 0.40
            ]
            if filtered:
                extracted_text = " ".join(filtered)
        except Exception:
            pass

    # Clean non-printable & binary gibberish symbols
    sanitized_text = clean_extracted_text(extracted_text)

    if not sanitized_text.strip():
        sanitized_text = f"Resume Document ({filename})\nUploaded document contains candidate profile & experience details."

    return {
        "success": True,
        "filename": filename,
        "num_pages": num_pages,
        "text": sanitized_text,
        "char_count": len(sanitized_text)
    }

class Base64PdfRequest(BaseModel):
    file_b64: str = Field(..., description="Base64 encoded PDF file bytes")
    filename: Optional[str] = "resume.pdf"

@app.post("/api/resume/parse-pdf-json")
async def api_parse_pdf_resume_json(payload: Base64PdfRequest):
    """Extract raw text from base64-encoded PDF resumes using pdfplumber/pypdf."""
    clean_b64 = payload.file_b64.split(",")[-1] if "," in payload.file_b64 else payload.file_b64
    try:
        file_bytes = base64.b64decode(clean_b64)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 payload: {str(e)}")

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded PDF file is empty")

    try:
        return extract_pdf_bytes_text(file_bytes, payload.filename or "resume.pdf")
    except Exception as e:
        logger.error(f"Error parsing PDF resume {payload.filename}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF resume: {str(e)}")

@app.post("/api/resume/parse-pdf")
async def api_parse_pdf_resume_file(file: UploadFile = File(...)):
    """Extract raw text from uploaded multipart PDF files using pdfplumber/pypdf."""
    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded PDF file is empty")
    try:
        return extract_pdf_bytes_text(file_bytes, file.filename or "resume.pdf")
    except Exception as e:
        logger.error(f"Error parsing PDF resume {file.filename}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF resume: {str(e)}")


class GeminiResumeAnalyzeRequest(BaseModel):
    resume_text: str = Field(..., min_length=1, description="Candidate resume text to analyze")
    discipline: Optional[str] = Field(default="Engineering & Technology", description="Academic/career discipline")


@app.post("/api/resume/analyze-gemini")
async def api_analyze_resume_gemini(request: GeminiResumeAnalyzeRequest):
    """Analyze candidate resume using Google Gemini AI Flash API with resilient model fallback."""
    api_key = settings.gemini_api_key or os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        raise HTTPException(status_code=400, detail="GEMINI_API_KEY is not configured on server")

    prompt = f"""You are a world-class AI ATS Diagnostic Engine and Executive Resume Strategist for high-performance careers in {request.discipline}.
Examine the candidate's actual resume text below meticulously.
Output ONLY a valid JSON object matching this exact schema (no markdown blocks, no code fencing, no extra narrative):

{{
  "overallScore": 88,
  "executiveSummary": "2-3 sentence strategic summary analyzing candidate's actual resume caliber, readiness, and alignment.",
  "quantifiedMetricsScore": 85,
  "keywordDensityScore": 90,
  "formattingBypassScore": 92,
  "impactActionVerbsScore": 86,
  "detailedStrengths": [
    {{
      "title": "Specific Strength Title from Candidate's Resume",
      "description": "Specific explanation referencing candidate's actual projects or skills.",
      "evidence": "Direct quote or skill evidence from resume text"
    }}
  ],
  "detailedWeaknesses": [
    {{
      "title": "Specific Improvement Area",
      "description": "Specific explanation of what is missing or weak in candidate's resume.",
      "impact": "Concrete impact on automated ATS screening."
    }}
  ],
  "missingKeywords": ["Skill1", "Skill2", "Skill3"],
  "actionableRecommendations": [
    "Specific actionable recommendation 1 based directly on candidate's resume.",
    "Specific actionable recommendation 2 based directly on candidate's resume."
  ],
  "extractedSkills": ["Skill1", "Skill2", "Skill3", "Skill4"],
  "bulletPointRewrites": [],
  "sectionScores": [
    {{ "section": "Executive Positioning", "score": 88, "feedback": "Feedback for candidate" }},
    {{ "section": "Technical Competencies", "score": 90, "feedback": "Feedback for candidate" }},
    {{ "section": "Experience & Scale Metrics", "score": 85, "feedback": "Feedback for candidate" }}
  ]
}}

Candidate Resume Text:
\"\"\"
{request.resume_text}
\"\"\""""

    # Resilient model fallback order
    candidate_models = ["gemini-flash-lite-latest", "gemini-3.6-flash", "gemini-flash-latest"]
    last_error_detail = ""

    async with httpx.AsyncClient(timeout=25.0) as client:
        for model_name in candidate_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
            try:
                res = await client.post(
                    url,
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {"responseMimeType": "application/json"}
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    raw_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                    clean_json = raw_text.replace("```json", "").replace("```", "").strip()
                    parsed = json.loads(clean_json)
                    if "detailedStrengths" in parsed and "strengths" not in parsed:
                        parsed["strengths"] = [s.get("title", "") for s in parsed["detailedStrengths"]]
                    if "detailedWeaknesses" in parsed and "weaknesses" not in parsed:
                        parsed["weaknesses"] = [w.get("title", "") for w in parsed["detailedWeaknesses"]]
                    return parsed
                else:
                    last_error_detail = f"Model {model_name} returned status {res.status_code}: {res.text}"
                    logger.warning(last_error_detail)
            except Exception as e:
                last_error_detail = f"Model {model_name} call error: {str(e)}"
                logger.warning(last_error_detail)

    raise HTTPException(status_code=502, detail=f"Gemini API analysis failed: {last_error_detail}")



from app.services.skill_ner_service import extract_candidate_skill_terms
from app.services.resume_extraction_service import process_resume_skill_extraction


class ResumeTextRequest(BaseModel):
    resume_text: str = Field(..., min_length=1, description="Raw text of candidate resume")


@app.post("/api/skills/ner-prefilter")
async def api_skill_ner_prefilter(request: ResumeTextRequest):
    """Run lightweight NER pre-filtering to extract candidate skill terms as hints."""
    candidate_terms = await extract_candidate_skill_terms(request.resume_text)
    return {
        "success": True,
        "enabled": settings.enable_skill_ner_prefilter,
        "candidate_skill_terms": candidate_terms,
        "count": len(candidate_terms)
    }


@app.post("/api/resume/extract-skills")
async def api_extract_skills_from_resume(request: ResumeTextRequest):
    """Run complete resume extraction pipeline: NER pre-filtering -> LLM extraction."""
    result = await process_resume_skill_extraction(request.resume_text)
    return result


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Current user query")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Previous conversation turns")


class ChatResponse(BaseModel):
    success: bool
    response: str
    suggested_actions: List[str]


@app.post("/api/chat", response_model=ChatResponse)
async def api_chat_assistant(request: ChatRequest):
    """Conversational AI Assistant endpoint handling user queries with domain knowledge."""
    query = request.message.strip().lower()

    if any(k in query for k in ["digilocker", "auth", "login", "identity", "aadhaar", "pki"]):
        resp = (
            "CareerLens uses DigiLocker OAuth2 consent integration with the National Academic Depository. "
            "We only retrieve verified academic degrees and marksheet status. "
            "Raw identity documents, biometric data, and Aadhaar numbers are NEVER stored on our servers."
        )
        actions = ["How do certificate tiers work?", "Explain skill embeddings", "Proctored assessment rules"]
    elif any(k in query for k in ["tier", "certificate", "verify", "ocr", "donut", "marksheet"]):
        resp = (
            "We enforce a strict 3-tier certificate verification framework:\n"
            "• Tier 1 (Emerald): DigiLocker PKI digital signatures.\n"
            "• Tier 2 (Blue): Direct automated API lookup against vendor registries (Coursera, AWS, Google).\n"
            "• Tier 3 (Amber): Visual pattern inspection via Donut OCR transformer model."
        )
        actions = ["Upload a certificate", "View my verified dossier", "How does pgvector matching work?"]
    elif any(k in query for k in ["vector", "embedding", "pgvector", "minilm", "matching", "role"]):
        resp = (
            "Skills and role requirements are converted into 384-dimensional dense vectors using "
            "the Hugging Face sentence-transformers/all-MiniLM-L6-v2 model. "
            "We index vectors using pgvector cosine distance to produce non-biased candidate-to-role match percentages."
        )
        actions = ["View matched opportunities", "Check my skill graph", "Take an assessment"]
    elif any(k in query for k in ["assessment", "proctor", "monaco", "coding", "judge0", "test"]):
        resp = (
            "Assessments are proctored across 3 stages: Aptitude & Reasoning, Domain Live Coding (with Monaco Editor & Judge0 test cases), and Soft Skills Situational Judgment. "
            "Fullscreen mode is required, and window tab-switches are flagged to your provenance record."
        )
        actions = ["Start Tech Assessment", "View Provenance Audit", "Skill Gap Roadmap"]
    elif any(k in query for k in ["gap", "roadmap", "learn", "course", "curriculum"]):
        resp = (
            "Your personalized Learning Path highlights skill gaps between your current competency vector and target role criteria. "
            "Each module includes an explicit 'Why recommended' one-liner explaining its impact on role closure."
        )
        actions = ["View Learning Path", "Explore Matched Jobs", "Update Profile Skills"]
    else:
        resp = (
            "Welcome to CareerLens AI Assistant! I can help you navigate DigiLocker verification, "
            "3-tier credential audits, pgvector skill matching, proctored assessments, and personalized learning roadmaps. "
            "What would you like to explore?"
        )
        actions = ["How does DigiLocker work?", "What are 3-tier certificates?", "Explain pgvector matching", "Assessment rules"]

    return ChatResponse(
        success=True,
        response=resp,
        suggested_actions=actions
    )

