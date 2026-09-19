"""Unit and integration tests for Donut Certificate OCR and 3-Tier Verification Pipeline."""

import io
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
import httpx
from PIL import Image

from app.core.config import settings
from app.services.certificate_ocr_service import (
    extract_certificate_fields,
    DONUT_MODEL_NAME
)
from app.services.certificate_verification_service import (
    process_certificate_verification,
    extract_pdf_text_layer,
    verify_tier_2_portal_lookup,
    verify_tier_3_heuristic
)


# ============================================================================
# Fixtures
# ============================================================================

@pytest.fixture
def sample_certificate_image_bytes() -> bytes:
    """Fixture generating a valid minimal PNG certificate image."""
    img = Image.new("RGB", (400, 300), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


@pytest.fixture
def corrupted_image_bytes() -> bytes:
    """Fixture providing unreadable, corrupted bytes."""
    return b"\x89PNG\r\n\x1a\n\x00\x00Corrupted_image_data_that_cannot_be_parsed_by_any_decoder"


@pytest.fixture
def parseable_pdf_bytes() -> bytes:
    """Fixture providing a minimal PDF with machine-readable text layer."""
    return (
        b"%PDF-1.4\n"
        b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n"
        b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n"
        b"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n"
        b"4 0 obj << /Length 120 >> stream\n"
        b"BT\n/F1 12 Tf\n100 700 Td\n(Coursera Verified Certificate for Arjun Kawade ID: COURSERA-987654) Tj\nET\nendstream\nendobj\n"
        b"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n"
        b"xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000244 00000 n \n0000000414 00000 n \n"
        b"trailer << /Size 6 /Root 1 0 R >>\nstartxref\n492\n%%EOF\n"
    )


@pytest.fixture
def scanned_image_certificate_bytes(sample_certificate_image_bytes) -> bytes:
    """Fixture representing a scanned image certificate without text layer."""
    return sample_certificate_image_bytes


# ============================================================================
# Requirement 1 & 5: Certificate OCR extraction & expected dictionary keys
# ============================================================================

@pytest.mark.asyncio
async def test_extract_certificate_fields_returns_expected_keys(sample_certificate_image_bytes):
    """Assert extract_certificate_fields returns a dict with expected keys from mocked Donut response."""
    mock_donut_response = [
        {
            "generated_text": (
                "<s_issuer>Coursera</s_issuer>"
                "<s_recipient_name>Arjun Kawade</s_recipient_name>"
                "<s_course_or_credential_name>Advanced Deep Learning</s_course_or_credential_name>"
                "<s_issue_date>2026-03-15</s_issue_date>"
                "<s_certificate_id>COURSERA-DL-77312</s_certificate_id>"
            )
        }
    ]

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 200
    mock_resp.json.return_value = mock_donut_response

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp

    result = await extract_certificate_fields(sample_certificate_image_bytes, client=mock_client)

    # Assert expected dictionary keys
    expected_keys = {
        "ocr_status",
        "issuer",
        "recipient_name",
        "course_or_credential_name",
        "issue_date",
        "certificate_id",
        "confidence",
        "model",
        "latency_ms",
    }
    assert expected_keys.issubset(result.keys())

    # Assert extracted content matches Donut response
    assert result["ocr_status"] == "success"
    assert result["issuer"] == "Coursera"
    assert result["recipient_name"] == "Arjun Kawade"
    assert result["course_or_credential_name"] == "Advanced Deep Learning"
    assert result["issue_date"] == "2026-03-15"
    assert result["certificate_id"] == "COURSERA-DL-77312"
    assert result["model"] == settings.hf_donut_model


@pytest.mark.asyncio
async def test_extract_certificate_fields_unextracted_fields_are_none(sample_certificate_image_bytes):
    """Assert that any field not confidently extracted is None, never guessed."""
    # Only issuer and course returned, no recipient or certificate ID
    mock_donut_response = [
        {
            "generated_text": (
                "<s_issuer>AWS</s_issuer>"
                "<s_course_or_credential_name>Cloud Practitioner</s_course_or_credential_name>"
            )
        }
    ]

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 200
    mock_resp.json.return_value = mock_donut_response

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp

    result = await extract_certificate_fields(sample_certificate_image_bytes, client=mock_client)

    assert result["ocr_status"] == "success"
    assert result["issuer"] == "AWS"
    assert result["course_or_credential_name"] == "Cloud Practitioner"
    # These MUST be None, not guessed
    assert result["recipient_name"] is None
    assert result["issue_date"] is None
    assert result["certificate_id"] is None


# ============================================================================
# Requirement 1 & 5: Fail-safe error handling on corrupted/unreadable images
# ============================================================================

@pytest.mark.asyncio
async def test_does_not_throw_on_corrupted_or_unreadable_image(corrupted_image_bytes):
    """Assert function does NOT throw on corrupted/unreadable image, returns ocr_status: 'failed'."""
    # When HF API returns 400 Bad Request or decoding failure
    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 400
    mock_resp.text = "Failed to decode image"

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp

    # MUST NOT raise an uncaught exception
    result = await extract_certificate_fields(corrupted_image_bytes, client=mock_client)

    assert isinstance(result, dict)
    assert result["ocr_status"] == "failed"
    assert "error" in result
    assert result["issuer"] is None
    assert result["recipient_name"] is None
    assert result["course_or_credential_name"] is None
    assert result["certificate_id"] is None


@pytest.mark.asyncio
async def test_does_not_throw_on_network_timeout(sample_certificate_image_bytes):
    """Assert function returns ocr_status: 'failed' on network timeout rather than crashing."""
    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.side_effect = httpx.TimeoutException("HF Inference Gateway Timeout")

    result = await extract_certificate_fields(sample_certificate_image_bytes, client=mock_client)

    assert result["ocr_status"] == "failed"
    assert "Gateway Timeout" in result.get("error", "")
    assert result["certificate_id"] is None


# ============================================================================
# Requirement 2: Do not call Donut OCR on already-parseable PDFs
# ============================================================================

@pytest.mark.asyncio
async def test_already_parseable_pdf_skips_donut_ocr(parseable_pdf_bytes):
    """Assert standard PDF with text layer bypasses Donut OCR to save latency and cost."""
    with patch("app.services.certificate_verification_service.extract_certificate_fields", new_callable=AsyncMock) as mock_ocr:
        # Pass parseable PDF with text layer
        result = await process_certificate_verification(parseable_pdf_bytes, filename="course_cert.pdf")

        # Donut OCR MUST NOT have been called
        mock_ocr.assert_not_called()
        assert result["ocr_called"] is False
        assert result["metadata"]["ocr_status"] == "skipped_parseable_pdf"


# ============================================================================
# Requirement 3: 3-Tier Verification Flow & Tier-2 Lookup Routing
# ============================================================================

@pytest.mark.asyncio
async def test_donut_extracted_tier_2_id_routes_to_portal_lookup(sample_certificate_image_bytes):
    """Assert extracted Tier-2 ID and issuer pass into Tier-2 portal lookup adapter."""
    mock_ocr_result = {
        "ocr_status": "success",
        "issuer": "Coursera",
        "recipient_name": "Arjun Kawade",
        "course_or_credential_name": "Deep Learning Specialization",
        "issue_date": "2026-01-10",
        "certificate_id": "COURSERA-899120-VALID",
        "confidence": 0.95,
        "model": settings.hf_donut_model,
    }

    with patch("app.services.certificate_verification_service.extract_certificate_fields", new_callable=AsyncMock) as mock_ocr:
        mock_ocr.return_value = mock_ocr_result

        result = await process_certificate_verification(sample_certificate_image_bytes, filename="cert.png")

        # OCR was called for image
        assert result["ocr_called"] is True
        # Tier-2 adapter verified the certificate
        assert result["verification_tier"] == "tier_2_portal_lookup"
        assert result["verified"] is True
        assert "Coursera Verification Portal" in result["details"]["reason"]


@pytest.mark.asyncio
async def test_unknown_issuer_falls_through_to_tier_3_heuristics(sample_certificate_image_bytes):
    """Assert unknown issuer or missing ID falls through to Tier-3 heuristics."""
    mock_ocr_result = {
        "ocr_status": "success",
        "issuer": "Random Unknown Academy",
        "recipient_name": "Student Scholar",
        "course_or_credential_name": "Introduction to Web Dev",
        "issue_date": "2026-02-01",
        "certificate_id": "RANDOM-ID-4421",
        "confidence": 0.8,
        "model": settings.hf_donut_model,
    }

    with patch("app.services.certificate_verification_service.extract_certificate_fields", new_callable=AsyncMock) as mock_ocr:
        mock_ocr.return_value = mock_ocr_result

        result = await process_certificate_verification(sample_certificate_image_bytes, filename="scanned.png")

        # Must fall through to tier_3_heuristic
        assert result["verification_tier"] == "tier_3_heuristic"
        # STRICT INVARIANT: Must NOT be marked verified
        assert result["verified"] is False


@pytest.mark.asyncio
async def test_ocr_output_alone_never_marks_certificate_verified(sample_certificate_image_bytes):
    """CRITICAL INVARIANT: Never mark a certificate 'verified' purely on OCR output."""
    mock_ocr_result = {
        "ocr_status": "success",
        "issuer": "Elite Certificates Global",
        "recipient_name": "Scholar",
        "course_or_credential_name": "Super AI Course",
        "issue_date": "2026-04-01",
        "certificate_id": "CERT-99999",
        "confidence": 1.0,  # Even with 100% OCR confidence
        "model": settings.hf_donut_model,
    }

    with patch("app.services.certificate_verification_service.extract_certificate_fields", new_callable=AsyncMock) as mock_ocr:
        mock_ocr.return_value = mock_ocr_result

        result = await process_certificate_verification(sample_certificate_image_bytes, filename="cert.jpg")

        # Verified MUST be False because OCR is only an extractor, not a verification method
        assert result["verified"] is False
        assert result["verification_tier"] == "tier_3_heuristic"
