"""Unit tests for FastAPI endpoints."""

import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import patch, MagicMock, AsyncMock

from app.main import app
from app.services.embedding_service import EMBEDDING_MODEL_NAME
from tests.test_embedding_service import make_mock_vector


@pytest.mark.asyncio
async def test_health_check_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["model"] == EMBEDDING_MODEL_NAME
        assert data["dimension"] == 384


@pytest.mark.asyncio
async def test_api_generate_embedding_endpoint():
    mock_vec = make_mock_vector(384)
    with patch("app.main.generate_embedding", new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = mock_vec

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/embeddings/generate", json={"text": "Python FastAPI"})
            assert response.status_code == 200
            data = response.json()
            assert data["model"] == EMBEDDING_MODEL_NAME
            assert data["dimension"] == 384
            assert len(data["embedding"]) == 384


@pytest.mark.asyncio
async def test_api_student_and_role_vectorize_and_match():
    mock_vec = make_mock_vector(384, 0.2)
    with patch("app.services.vector_sync_service.generate_embedding", new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = mock_vec

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Vectorize student
            student_resp = await client.post("/api/student/vectorize", json={
                "student_id": "stud_999",
                "profile_text": "Machine Learning, PyTorch, Deep Learning"
            })
            assert student_resp.status_code == 200
            assert student_resp.json()["embedding_model"] == EMBEDDING_MODEL_NAME

            # 2. Vectorize role
            role_resp = await client.post("/api/roles/vectorize", json={
                "role_id": "role_888",
                "role_title": "ML Engineer",
                "requirements_text": "Deep Learning with PyTorch and Python"
            })
            assert role_resp.status_code == 200
            assert role_resp.json()["embedding_model"] == EMBEDDING_MODEL_NAME

            # 3. Match student to roles
            match_resp = await client.get("/api/match/student/stud_999/roles")
            assert match_resp.status_code == 200
            match_data = match_resp.json()
            assert match_data["embedding_model"] == EMBEDDING_MODEL_NAME
            assert len(match_data["matches"]) > 0
            assert match_data["matches"][0]["role_id"] == "role_888"


@pytest.mark.asyncio
async def test_api_skill_ner_prefilter_and_resume_extraction():
    mock_candidates = ["Python", "Docker", "AWS"]
    with patch("app.main.extract_candidate_skill_terms", new_callable=AsyncMock) as mock_ner:
        mock_ner.return_value = mock_candidates

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # Test NER prefilter endpoint
            ner_resp = await client.post("/api/skills/ner-prefilter", json={
                "resume_text": "Experienced engineer proficient in Python, Docker, and AWS cloud."
            })
            assert ner_resp.status_code == 200
            data = ner_resp.json()
            assert data["success"] is True
            assert data["candidate_skill_terms"] == mock_candidates
            assert data["count"] == 3

            # Test resume skill extraction endpoint
            extract_resp = await client.post("/api/resume/extract-skills", json={
                "resume_text": "Experienced engineer proficient in Python, Docker, and AWS cloud."
            })
            assert extract_resp.status_code == 200
            extract_data = extract_resp.json()
            assert extract_data["success"] is True
            assert extract_data["extraction_source"] == "llm_ground_truth"


@pytest.mark.asyncio
async def test_api_certificate_verify_json_endpoint():
    import base64
    sample_pdf = b"%PDF-1.4\n1 0 obj << /Type /Catalog >> endobj\nxref\n0 1\n0000000000 65535 f \ntrailer << /Size 1 >>\nstartxref\n50\n%%EOF\n"
    b64_pdf = base64.b64encode(sample_pdf).decode("utf-8")

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        resp = await client.post("/api/certificate/verify-json", json={
            "file_base64": b64_pdf,
            "filename": "cert.pdf"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "verified" in data
        assert "verification_tier" in data


@pytest.mark.asyncio
async def test_api_chat_assistant_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        resp = await client.post("/api/chat", json={
            "message": "How does DigiLocker verification work?"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "DigiLocker" in data["response"]
        assert len(data["suggested_actions"]) > 0

