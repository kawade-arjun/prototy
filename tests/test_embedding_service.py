"""Unit tests for the Hugging Face embedding service and pgvector persistence."""

import asyncio
import pytest
import httpx
from unittest.mock import AsyncMock, patch, MagicMock

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
from app.repositories.vector_repo import (
    vector_repo,
    ModelMismatchError
)


# Helper to generate a fake 384-dimensional float vector
def make_mock_vector(dim: int = 384, val: float = 0.05) -> list[float]:
    return [float(val + i * 0.001) for i in range(dim)]


@pytest.fixture(autouse=True)
def setup_test_environment(monkeypatch):
    """Ensure HF_API_TOKEN is set during tests."""
    monkeypatch.setattr(settings, "hf_api_token", "test_hf_token_mock_123")
    monkeypatch.setattr(settings, "hf_embedding_model", EMBEDDING_MODEL_NAME)
    # Reset in-memory vector store before each test
    vector_repo._student_vectors.clear()
    vector_repo._role_vectors.clear()


# ============================================================================
# Requirement 6: Unit test with mocked HF response asserting 384-length float vector
# ============================================================================

@pytest.mark.asyncio
async def test_generate_embedding_returns_384_float_vector():
    """Assert a 384-length float vector is returned from generate_embedding with mocked HF response."""
    mock_vector = make_mock_vector(384)

    # Mock httpx.AsyncClient.post
    mock_response = MagicMock(spec=httpx.Response)
    mock_response.status_code = 200
    mock_response.json.return_value = mock_vector
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_response

    result = await generate_embedding("Python FastAPI PyTorch", client=mock_client)

    # 1. Assert return type is list of floats
    assert isinstance(result, list)
    assert all(isinstance(x, float) for x in result)

    # 2. Assert vector length is exactly 384
    assert len(result) == 384
    assert len(result) == EXPECTED_EMBEDDING_DIM

    # 3. Assert correct payload and auth header were used
    mock_client.post.assert_called_once()
    call_args, call_kwargs = mock_client.post.call_args
    assert call_kwargs["headers"]["Authorization"] == f"Bearer {settings.hf_api_token}"
    assert call_kwargs["json"] == {"inputs": "Python FastAPI PyTorch"}


# ============================================================================
# Requirement 3 & 6: embedding_model persistence alongside vector
# ============================================================================

@pytest.mark.asyncio
async def test_embedding_model_persisted_correctly_on_student_and_role():
    """Assert that 'sentence-transformers/all-MiniLM-L6-v2' is persisted alongside every embedding."""
    mock_vector = make_mock_vector(384)

    mock_response = MagicMock(spec=httpx.Response)
    mock_response.status_code = 200
    mock_response.json.return_value = mock_vector
    mock_response.raise_for_status = MagicMock()

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = mock_response

        # Wire into student profile write path
        student_record = await vectorize_and_save_student_profile(
            student_id="student_scholar_001",
            profile_or_skills_text="PostgreSQL, FastAPI, Machine Learning, React"
        )

        assert student_record["student_id"] == "student_scholar_001"
        assert student_record["embedding_model"] == "sentence-transformers/all-MiniLM-L6-v2"
        assert len(student_record["embedding"]) == 384

        # Wire into role requirements write path
        role_record = await vectorize_and_save_role_requirements(
            role_id="role_ai_engineer_001",
            role_title="AI Research Engineer",
            requirements_text="Deep Learning, NLP, FastAPI microservices, pgvector"
        )

        assert role_record["role_id"] == "role_ai_engineer_001"
        assert role_record["role_title"] == "AI Research Engineer"
        assert role_record["embedding_model"] == "sentence-transformers/all-MiniLM-L6-v2"
        assert len(role_record["embedding"]) == 384


# ============================================================================
# Requirement 3: Never compare or search across two different embedding_model values
# ============================================================================

@pytest.mark.asyncio
async def test_never_compare_or_search_across_different_embedding_models():
    """Assert that vectors from two different embedding models cannot be searched or compared."""
    model_canonical = "sentence-transformers/all-MiniLM-L6-v2"
    model_foreign = "text-embedding-ada-002"

    vec_a = make_mock_vector(384, 0.1)
    vec_b = make_mock_vector(384, 0.2)

    # Save one role with canonical model
    await vector_repo.save_role_requirement_vector(
        role_id="role_canonical",
        role_title="Canonical Role",
        requirements_text="Python",
        embedding=vec_a,
        embedding_model=model_canonical
    )

    # Save another role with a different model
    await vector_repo.save_role_requirement_vector(
        role_id="role_foreign",
        role_title="Foreign Model Role",
        requirements_text="Python Legacy",
        embedding=vec_b,
        embedding_model=model_foreign
    )

    # Search using query with canonical model
    canonical_results = await vector_repo.search_matching_roles(
        query_embedding=vec_a,
        query_model=model_canonical
    )

    # MUST only match role_canonical, role_foreign MUST NOT be included
    matched_roles = [r["role_id"] for r in canonical_results]
    assert "role_canonical" in matched_roles
    assert "role_foreign" not in matched_roles
    for r in canonical_results:
        assert r["embedding_model"] == model_canonical

    # Direct validation check should reject comparison
    with pytest.raises(ModelMismatchError):
        vector_repo.validate_model_compatibility(model_canonical, model_foreign)


# ============================================================================
# Requirement 2: Retries on 5xx/timeout & raises custom EmbeddingServiceError
# ============================================================================

@pytest.mark.asyncio
async def test_retry_on_5xx_server_error_and_succeed():
    """Assert that 5xx errors trigger retries and succeed if a later attempt passes."""
    mock_vector = make_mock_vector(384)

    # 1st attempt: 503 Server Error
    resp_503 = MagicMock(spec=httpx.Response)
    resp_503.status_code = 503

    # 2nd attempt: 200 Success
    resp_200 = MagicMock(spec=httpx.Response)
    resp_200.status_code = 200
    resp_200.json.return_value = mock_vector
    resp_200.raise_for_status = MagicMock()

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.side_effect = [resp_503, resp_200]

    result = await generate_embedding("Test retry text", client=mock_client)
    assert len(result) == 384
    assert mock_client.post.call_count == 2


@pytest.mark.asyncio
async def test_raises_custom_embedding_service_error_on_persistent_failure():
    """Assert that EmbeddingServiceError is raised on 5xx failure after retries (raw HF errors never leak)."""
    resp_500 = MagicMock(spec=httpx.Response)
    resp_500.status_code = 500

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = resp_500

    with pytest.raises(EmbeddingServiceError) as exc_info:
        await generate_embedding("Failing request text", client=mock_client)

    assert "Hugging Face server error after retries" in str(exc_info.value)
    # Total attempts: 1 initial + 2 retries = 3
    assert mock_client.post.call_count == 3


@pytest.mark.asyncio
async def test_raises_custom_embedding_service_error_on_timeout():
    """Assert that timeout triggers retry and raises EmbeddingServiceError if persistent."""
    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.side_effect = httpx.TimeoutException("Read timed out")

    with pytest.raises(EmbeddingServiceError) as exc_info:
        await generate_embedding("Timeout text", client=mock_client)

    assert "timed out" in str(exc_info.value).lower()
    assert mock_client.post.call_count == 3


# ============================================================================
# Requirement 4: Batch variant with chunking and rate-limit backoff
# ============================================================================

@pytest.mark.asyncio
async def test_generate_embeddings_batch_chunking():
    """Assert generate_embeddings_batch chunks requests properly."""
    texts = [f"skill_{i}" for i in range(5)]
    mock_vectors = [make_mock_vector(384, i * 0.01) for i in range(5)]

    mock_client = AsyncMock(spec=httpx.AsyncClient)

    # Simulate chunk_size=2: calls for chunk [0, 1], chunk [2, 3], chunk [4]
    def side_effect(url, headers, json):
        chunk = json["inputs"]
        chunk_len = len(chunk)
        resp = MagicMock(spec=httpx.Response)
        resp.status_code = 200
        resp.json.return_value = [make_mock_vector(384) for _ in range(chunk_len)]
        resp.raise_for_status = MagicMock()
        return resp

    mock_client.post.side_effect = side_effect

    results = await generate_embeddings_batch(texts, chunk_size=2, client=mock_client)

    assert len(results) == 5
    for vec in results:
        assert len(vec) == 384
    # 5 items with chunk_size 2 => 3 requests
    assert mock_client.post.call_count == 3


@pytest.mark.asyncio
async def test_generate_embeddings_batch_rate_limit_backoff():
    """Assert 429 rate limit triggers backoff retry and succeeds."""
    texts = ["React", "FastAPI"]

    resp_429 = MagicMock(spec=httpx.Response)
    resp_429.status_code = 429
    resp_429.headers = {"retry-after": "0.1"}

    resp_200 = MagicMock(spec=httpx.Response)
    resp_200.status_code = 200
    resp_200.json.return_value = [make_mock_vector(384), make_mock_vector(384)]
    resp_200.raise_for_status = MagicMock()

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.side_effect = [resp_429, resp_200]

    results = await generate_embeddings_batch(texts, chunk_size=10, client=mock_client)

    assert len(results) == 2
    assert len(results[0]) == 384
    assert mock_client.post.call_count == 2


# ============================================================================
# Validation: Dimension mismatch detection
# ============================================================================

@pytest.mark.asyncio
async def test_dimension_mismatch_raises_error():
    """Assert that a vector not matching 384 dimensions raises EmbeddingServiceError."""
    # Return 128-dim vector instead of 384
    bad_vector = make_mock_vector(128)

    mock_response = MagicMock(spec=httpx.Response)
    mock_response.status_code = 200
    mock_response.json.return_value = bad_vector
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock(spec=httpx.AsyncClient)
    mock_client.post.return_value = mock_response

    with pytest.raises(EmbeddingServiceError) as exc_info:
        await generate_embedding("Test invalid dimension", client=mock_client)

    assert "Dimension mismatch: expected 384-dim vector, got 128-dim" in str(exc_info.value)
