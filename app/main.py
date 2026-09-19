"""FastAPI application exposing skill-vector embedding and vector search endpoints."""

from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

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

app = FastAPI(
    title="CareerOptic Vector Embedding & Matching Service",
    version="1.0.0",
    description="FastAPI service generating 384-dim skill-vector embeddings using sentence-transformers/all-MiniLM-L6-v2 via Hugging Face Inference API."
)


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
from app.services.certificate_verification_service import process_certificate_verification


class CertificateVerifyJsonRequest(BaseModel):
    file_base64: str = Field(..., description="Base64 encoded certificate image or PDF")
    filename: Optional[str] = Field(default="certificate.pdf", description="File name")


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


@app.post("/api/certificate/verify-json")
async def api_verify_certificate_json(payload: CertificateVerifyJsonRequest):
    """Run full 3-tier certificate verification on base64 encoded certificate bytes."""
    try:
        file_bytes = base64.b64decode(payload.file_base64)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 payload: {str(e)}")
    result = await process_certificate_verification(file_bytes=file_bytes, filename=payload.filename or "cert.pdf")
    return result


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
