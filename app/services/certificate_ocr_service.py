"""Certificate OCR and field extraction service using Hugging Face Donut model.

Model: naver-clova-ix/donut-base
Extracts certificate metadata (issuer, recipient, course, date, ID) from scanned/image certificates.
"""

import json
import logging
import re
import time
from typing import Any, Dict, Optional
import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

DONUT_MODEL_NAME = "naver-clova-ix/donut-base"


def _parse_donut_output(raw_output: Any) -> Dict[str, Optional[str]]:
    """Parse Donut model response into standardized certificate fields.

    Fields absent or uncertain are set to None (never guessed).
    """
    fields: Dict[str, Optional[str]] = {
        "issuer": None,
        "recipient_name": None,
        "course_or_credential_name": None,
        "issue_date": None,
        "certificate_id": None,
    }

    # Case 1: Response is already a structured dict
    if isinstance(raw_output, dict):
        if "parsed" in raw_output and isinstance(raw_output["parsed"], dict):
            raw_output = raw_output["parsed"]

        fields["issuer"] = raw_output.get("issuer") or raw_output.get("organization") or raw_output.get("issued_by")
        fields["recipient_name"] = raw_output.get("recipient_name") or raw_output.get("recipient") or raw_output.get("name") or raw_output.get("student_name")
        fields["course_or_credential_name"] = (
            raw_output.get("course_or_credential_name")
            or raw_output.get("course_name")
            or raw_output.get("credential_name")
            or raw_output.get("title")
            or raw_output.get("course")
        )
        fields["issue_date"] = raw_output.get("issue_date") or raw_output.get("date") or raw_output.get("date_issued")
        fields["certificate_id"] = (
            raw_output.get("certificate_id")
            or raw_output.get("cert_id")
            or raw_output.get("credential_id")
            or raw_output.get("id")
        )
        return fields

    # Case 2: Response is a list of predictions (e.g. [{"generated_text": "..."}])
    generated_text = ""
    if isinstance(raw_output, list) and len(raw_output) > 0:
        item = raw_output[0]
        if isinstance(item, dict):
            generated_text = item.get("generated_text", "")
            # If the dict itself contains direct fields
            for k in ["issuer", "recipient_name", "course_or_credential_name", "issue_date", "certificate_id"]:
                if k in item and item[k]:
                    fields[k] = str(item[k]).strip()
        elif isinstance(item, str):
            generated_text = item

    if generated_text:
        # Donut often outputs XML-like tokens: <s_tag>value</s_tag> or JSON strings
        if "{" in generated_text and "}" in generated_text:
            try:
                # Try parsing embedded JSON
                json_match = re.search(r"(\{.*\})", generated_text, re.DOTALL)
                if json_match:
                    parsed_json = json.loads(json_match.group(1))
                    return _parse_donut_output(parsed_json)
            except Exception:
                pass

        # Regex patterns for XML-like tags used in Donut sequence generation
        patterns = {
            "issuer": [r"<s_issuer>(.*?)</s_issuer>", r"<s_organization>(.*?)</s_organization>", r"<s_issued_by>(.*?)</s_issued_by>"],
            "recipient_name": [r"<s_recipient_name>(.*?)</s_recipient_name>", r"<s_recipient>(.*?)</s_recipient>", r"<s_name>(.*?)</s_name>", r"<s_student_name>(.*?)</s_student_name>"],
            "course_or_credential_name": [r"<s_course_or_credential_name>(.*?)</s_course_or_credential_name>", r"<s_course_name>(.*?)</s_course_name>", r"<s_course>(.*?)</s_course>", r"<s_title>(.*?)</s_title>"],
            "issue_date": [r"<s_issue_date>(.*?)</s_issue_date>", r"<s_date>(.*?)</s_date>"],
            "certificate_id": [r"<s_certificate_id>(.*?)</s_certificate_id>", r"<s_cert_id>(.*?)</s_cert_id>", r"<s_id>(.*?)</s_id>"],
        }

        for field_name, regex_list in patterns.items():
            if fields[field_name] is None:
                for pat in regex_list:
                    match = re.search(pat, generated_text, re.IGNORECASE)
                    if match and match.group(1).strip():
                        fields[field_name] = match.group(1).strip()
                        break

    # Clean up empty strings to None
    for k, v in fields.items():
        if isinstance(v, str) and not v.strip():
            fields[k] = None

    return fields


async def extract_certificate_fields(
    image_bytes: bytes,
    client: Optional[httpx.AsyncClient] = None
) -> Dict[str, Any]:
    """Extract structured fields from a certificate image using Hugging Face Donut model.

    Args:
        image_bytes: Raw binary bytes of the certificate image (PNG, JPEG, etc.).
        client: Optional shared httpx.AsyncClient.

    Returns:
        Dict[str, Any]: Extracted fields with ocr_status ("success" or "failed").
        On failure, returns ocr_status: "failed" with None fields so callers can
        seamlessly fall back to Tier-3 heuristics without crashing.
    """
    start_time = time.perf_counter()

    # Pre-validation
    if not image_bytes or len(image_bytes) < 32:
        logger.warning("Empty or truncated image bytes passed to extract_certificate_fields.")
        return {
            "ocr_status": "failed",
            "error": "Empty or invalid image bytes provided.",
            "issuer": None,
            "recipient_name": None,
            "course_or_credential_name": None,
            "issue_date": None,
            "certificate_id": None,
            "confidence": 0.0,
            "model": settings.hf_donut_model,
        }

    api_token = settings.hf_api_token
    url = settings.donut_inference_url
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/octet-stream",
    }

    should_close_client = False
    if client is None:
        client = httpx.AsyncClient(timeout=httpx.Timeout(settings.timeout_seconds))
        should_close_client = True

    try:
        # Wrap HF call in try/except; never let raw errors crash caller
        response = await client.post(url, headers=headers, content=image_bytes)

        elapsed_ms = int((time.perf_counter() - start_time) * 1000)

        if response.status_code != 200:
            err_msg = f"HF Inference API returned HTTP {response.status_code}: {response.text[:200]}"
            logger.warning("Donut OCR call failed: %s (latency: %dms)", err_msg, elapsed_ms)
            return {
                "ocr_status": "failed",
                "error": err_msg,
                "issuer": None,
                "recipient_name": None,
                "course_or_credential_name": None,
                "issue_date": None,
                "certificate_id": None,
                "confidence": 0.0,
                "model": settings.hf_donut_model,
                "latency_ms": elapsed_ms,
            }

        data = response.json()
        extracted = _parse_donut_output(data)

        # Estimate confidence based on extracted key coverage
        extracted_count = sum(1 for v in extracted.values() if v is not None)
        confidence = round(min(1.0, extracted_count / 3.0), 2)  # 3 or more fields = high confidence

        # Structured audit log (Requirement 4): logs metadata/confidence without persisting raw bytes
        logger.info(
            "Donut OCR extraction success | model=%s | issuer=%s | cert_id=%s | recipient=%s | confidence=%.2f | latency=%dms",
            settings.hf_donut_model,
            extracted.get("issuer"),
            extracted.get("certificate_id"),
            extracted.get("recipient_name"),
            confidence,
            elapsed_ms,
        )

        return {
            "ocr_status": "success",
            "issuer": extracted["issuer"],
            "recipient_name": extracted["recipient_name"],
            "course_or_credential_name": extracted["course_or_credential_name"],
            "issue_date": extracted["issue_date"],
            "certificate_id": extracted["certificate_id"],
            "confidence": confidence,
            "model": settings.hf_donut_model,
            "latency_ms": elapsed_ms,
        }

    except Exception as e:
        elapsed_ms = int((time.perf_counter() - start_time) * 1000)
        logger.exception("Unexpected exception in Donut OCR service: %s", str(e))
        return {
            "ocr_status": "failed",
            "error": str(e),
            "issuer": None,
            "recipient_name": None,
            "course_or_credential_name": None,
            "issue_date": None,
            "certificate_id": None,
            "confidence": 0.0,
            "model": settings.hf_donut_model,
            "latency_ms": elapsed_ms,
        }

    finally:
        if should_close_client:
            await client.aclose()
        # Ensure image_bytes reference is released promptly from local memory
        del image_bytes
