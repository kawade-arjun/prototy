"""Unit tests for the skill NER pre-filtering service and LLM prompt hint integration."""

import pytest
from unittest.mock import AsyncMock, MagicMock, patch
import httpx

from app.core.config import settings
from app.services.skill_ner_service import (
    extract_candidate_skill_terms,
    SKILL_NER_MODEL_NAME
)
from app.services.resume_extraction_service import (
    process_resume_skill_extraction,
    build_skill_extraction_prompt
)


@pytest.fixture(autouse=True)
def setup_ner_settings(monkeypatch):
    """Ensure NER settings are enabled by default for tests."""
    monkeypatch.setattr(settings, "hf_api_token", "test_hf_token_ner_123")
    monkeypatch.setattr(settings, "enable_skill_ner_prefilter", True)
    monkeypatch.setattr(settings, "hf_ner_model", SKILL_NER_MODEL_NAME)


# ============================================================================
# Requirement 1: Extract candidate skill terms & deduplication
# ============================================================================

@pytest.mark.asyncio
async def test_extract_candidate_skill_terms_success():
    """Assert successful HF call returns deduplicated candidate skill terms."""
    mock_hf_response = [
        {"entity_group": "SKILL", "score": 0.98, "word": "Python"},
        {"entity_group": "SKILL", "score": 0.94, "word": "FastAPI"},
        {"entity_group": "SKILL", "score": 0.91, "word": "Docker"},
        {"entity_group": "SKILL", "score": 0.95, "word": "python"},  # duplicate case variant
        {"entity_group": "O", "score": 0.20, "word": "engineer"},    # not a skill
    ]

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 200
    mock_resp.json.return_value = mock_hf_response

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp

    resume_text = "Senior Backend Engineer with 5 years experience in Python, FastAPI, and Docker."
    candidates = await extract_candidate_skill_terms(resume_text, client=mock_client)

    # Assert terms are returned and deduplicated
    assert isinstance(candidates, list)
    assert candidates == ["Python", "FastAPI", "Docker"]
    assert "engineer" not in candidates


# ============================================================================
# Requirement 4: On HF failure, returns [] without raising
# ============================================================================

@pytest.mark.asyncio
async def test_extract_candidate_skill_terms_failure_returns_empty_and_does_not_raise():
    """Assert when HF call fails (500 or timeout), extract_candidate_skill_terms returns [] and does not raise."""
    # Test HTTP 500
    mock_resp_500 = MagicMock(spec=httpx.Response)
    mock_resp_500.status_code = 500
    mock_resp_500.text = "Internal Model Error"

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp_500

    result = await extract_candidate_skill_terms("Some resume text", client=mock_client)
    assert result == []

    # Test Network Timeout
    mock_client.post.side_effect = httpx.TimeoutException("Connection timed out to HF NER")
    result_timeout = await extract_candidate_skill_terms("Some resume text", client=mock_client)
    assert result_timeout == []


# ============================================================================
# Requirement 4: Main extraction flow still completes when NER fails
# ============================================================================

@pytest.mark.asyncio
async def test_main_extraction_flow_completes_when_ner_fails():
    """Assert main extraction flow still completes successfully with an empty hint list when NER fails."""
    mock_client = AsyncMock(spec=httpx.AsyncClient)
    # Simulate HF failure returning 503
    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 503
    mock_resp.text = "Service Unavailable"
    mock_client.post.return_value = mock_resp

    resume_text = "Arjun Kawade is a developer with expertise in Python, PostgreSQL, and Machine Learning."

    result = await process_resume_skill_extraction(resume_text=resume_text, client=mock_client)

    # 1. Assert pipeline succeeded
    assert result["success"] is True

    # 2. Assert candidate hints list is empty (graceful fallback)
    assert result["ner_candidate_hints"] == []

    # 3. Assert prompt states no hints were provided
    assert "No prior NER hints provided" in result["prompt_used"]

    # 4. Assert verified skills were still extracted by main flow
    verified_names = [s["name"] for s in result["verified_skills"]]
    assert "Python" in verified_names
    assert "PostgreSQL" in verified_names
    assert "Machine Learning" in verified_names


# ============================================================================
# Requirement 3: Config flag ENABLE_SKILL_NER_PREFILTER
# ============================================================================

@pytest.mark.asyncio
async def test_ner_prefilter_disabled_flag(monkeypatch):
    """Assert setting ENABLE_SKILL_NER_PREFILTER to False cleanly bypasses HF call."""
    monkeypatch.setattr(settings, "enable_skill_ner_prefilter", False)

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    candidates = await extract_candidate_skill_terms("Python, React, TypeScript", client=mock_client)

    # Must return [] immediately without contacting HF API
    assert candidates == []
    mock_client.post.assert_not_called()


# ============================================================================
# Requirement 2: Hint, not ground truth (prompt context vs final skills)
# ============================================================================

@pytest.mark.asyncio
async def test_ner_output_treated_as_hint_not_ground_truth():
    """Assert NER candidate terms are passed into prompt as hints and LLM is source of truth."""
    # NER model flags "Fortran" (a false positive or low-confidence hallucination) along with "Python"
    mock_hf_response = [
        {"entity_group": "SKILL", "score": 0.99, "word": "Python"},
        {"entity_group": "SKILL", "score": 0.51, "word": "Fortran"},  # Not in candidate resume
    ]

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 200
    mock_resp.json.return_value = mock_hf_response

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_resp

    resume_text = "Backend engineer working with Python, FastAPI, and Docker."

    result = await process_resume_skill_extraction(resume_text=resume_text, client=mock_client)

    # 1. Both candidate hints are present in ner_candidate_hints
    assert "Python" in result["ner_candidate_hints"]
    assert "Fortran" in result["ner_candidate_hints"]

    # 2. Prompt contains the specific hint instruction
    assert "Terms an NER pass flagged as possible skills: [Python, Fortran]" in result["prompt_used"]
    assert "Confirm, correct, or discard these against the actual resume text." in result["prompt_used"]

    # 3. Final verified skills DO NOT include the unverified false positive "Fortran"
    final_skill_names = [s["name"] for s in result["verified_skills"]]
    assert "Python" in final_skill_names
    assert "FastAPI" in final_skill_names
    assert "Fortran" not in final_skill_names
