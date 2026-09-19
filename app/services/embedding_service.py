"""Embedding service integrating Hugging Face Inference API for skill-vectors.

Model: sentence-transformers/all-MiniLM-L6-v2 (384-dim)
"""

import asyncio
import logging
from typing import List, Optional, Union
import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

# Constant for the canonical model name
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
EXPECTED_EMBEDDING_DIM = 384


class EmbeddingServiceError(Exception):
    """Custom exception raised when embedding generation fails."""
    pass


def _extract_vector_from_response(data: Union[List, dict]) -> List[float]:
    """Parse and validate vector output from HF feature-extraction response."""
    if isinstance(data, dict):
        # Hugging Face sometimes returns an error dictionary
        if "error" in data:
            raise EmbeddingServiceError(f"Hugging Face API returned error: {data['error']}")
        raise EmbeddingServiceError(f"Unexpected response format from Hugging Face API: {data}")

    if not isinstance(data, list) or len(data) == 0:
        raise EmbeddingServiceError("Empty or invalid vector returned by Hugging Face API.")

    # Single text inputs may return [x1, x2, ..., x384]
    # Or in some pipeline variants [[x1, x2, ..., x384]]
    if isinstance(data[0], list):
        # Flatten one level if it's a 2D array representing one text
        if len(data) == 1 and isinstance(data[0][0], (int, float)):
            candidate = [float(x) for x in data[0]]
        else:
            raise EmbeddingServiceError(f"Unexpected nested list structure in response: {len(data)} items")
    else:
        candidate = [float(x) for x in data]

    if len(candidate) != EXPECTED_EMBEDDING_DIM:
        raise EmbeddingServiceError(
            f"Dimension mismatch: expected {EXPECTED_EMBEDDING_DIM}-dim vector, got {len(candidate)}-dim."
        )

    return candidate


def _extract_batch_vectors_from_response(data: Union[List, dict], expected_count: int) -> List[List[float]]:
    """Parse and validate multiple vectors from HF batch response."""
    if isinstance(data, dict) and "error" in data:
        raise EmbeddingServiceError(f"Hugging Face API returned error: {data['error']}")

    if not isinstance(data, list):
        raise EmbeddingServiceError(f"Unexpected batch response format: expected list, got {type(data)}")

    results: List[List[float]] = []

    # HF returns list of lists: [[x1...x384], [x1...x384], ...]
    # For a single item list, it might be [x1...x384] or [[x1...x384]]
    if expected_count == 1 and len(data) > 0 and isinstance(data[0], (int, float)):
        # Received flat array for single item
        results.append([float(x) for x in data])
    else:
        for idx, item in enumerate(data):
            if isinstance(item, list):
                vec = [float(x) for x in item]
                if len(vec) != EXPECTED_EMBEDDING_DIM:
                    raise EmbeddingServiceError(
                        f"Item at index {idx} has invalid dimension {len(vec)}, expected {EXPECTED_EMBEDDING_DIM}."
                    )
                results.append(vec)
            else:
                raise EmbeddingServiceError(f"Item at index {idx} in batch is not a valid vector: {type(item)}")

    if len(results) != expected_count:
        raise EmbeddingServiceError(
            f"Batch count mismatch: submitted {expected_count} texts, received {len(results)} embeddings."
        )

    return results


async def generate_embedding(
    text: str,
    client: Optional[httpx.AsyncClient] = None
) -> List[float]:
    """Generate a 384-dimensional skill-vector embedding using Hugging Face Inference API.

    Args:
        text: The input text (skills, profile, role description).
        client: Optional shared httpx.AsyncClient for connection reuse or testing.

    Returns:
        List[float]: 384-dimensional embedding vector.

    Raises:
        EmbeddingServiceError: If API call fails after retries, times out, or returns invalid data.
    """
    if not text or not text.strip():
        raise EmbeddingServiceError("Input text cannot be empty.")

    api_token = settings.hf_api_token
    if not api_token:
        raise EmbeddingServiceError("HF_API_TOKEN is not configured in settings or environment.")

    url = settings.feature_extraction_url
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
    }
    payload = {"inputs": text.strip()}

    should_close_client = False
    if client is None:
        client = httpx.AsyncClient(timeout=httpx.Timeout(settings.timeout_seconds))
        should_close_client = True

    try:
        max_attempts = settings.max_retries + 1  # 1 initial + up to 2 retries
        last_error_msg = ""

        for attempt in range(max_attempts):
            try:
                response = await client.post(url, headers=headers, json=payload)

                # Retry on 5xx server errors
                if 500 <= response.status_code < 600:
                    last_error_msg = f"HTTP {response.status_code} server error"
                    logger.warning(
                        f"HF Inference API returned {response.status_code} on attempt {attempt + 1}/{max_attempts}."
                    )
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(0.5 * (2 ** attempt))
                        continue
                    raise EmbeddingServiceError(f"Hugging Face server error after retries: {last_error_msg}")

                # Handle rate limiting (429)
                if response.status_code == 429:
                    retry_after = 1.0
                    header_val = response.headers.get("retry-after")
                    if header_val and header_val.isdigit():
                        retry_after = float(header_val)
                    last_error_msg = f"Rate limit exceeded (HTTP 429), retry after {retry_after}s"
                    logger.warning(f"HF Inference API rate limited (429) on attempt {attempt + 1}/{max_attempts}.")
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(retry_after)
                        continue
                    raise EmbeddingServiceError(f"Rate limit exceeded on Hugging Face free tier: {last_error_msg}")

                # Client errors (4xx) - do not retry
                if 400 <= response.status_code < 500:
                    try:
                        err_detail = response.json().get("error", response.text)
                    except Exception:
                        err_detail = response.text
                    raise EmbeddingServiceError(
                        f"Hugging Face API client error (HTTP {response.status_code}): {err_detail}"
                    )

                response.raise_for_status()
                data = response.json()
                return _extract_vector_from_response(data)

            except (httpx.TimeoutException, httpx.NetworkError) as e:
                last_error_msg = f"{type(e).__name__}: {str(e)}"
                logger.warning(
                    f"Network/timeout error connecting to HF on attempt {attempt + 1}/{max_attempts}: {last_error_msg}"
                )
                if attempt < max_attempts - 1:
                    await asyncio.sleep(0.5 * (2 ** attempt))
                    continue
                raise EmbeddingServiceError(
                    f"Connection to Hugging Face Inference API timed out/failed after {max_attempts} attempts: {last_error_msg}"
                ) from e
            except EmbeddingServiceError:
                raise
            except Exception as e:
                # Catch any unexpected deserialization or other errors
                raise EmbeddingServiceError(f"Unexpected error processing embedding response: {str(e)}") from e

        raise EmbeddingServiceError(f"Failed to generate embedding after {max_attempts} attempts: {last_error_msg}")

    finally:
        if should_close_client:
            await client.aclose()


async def generate_embeddings_batch(
    texts: List[str],
    chunk_size: Optional[int] = None,
    client: Optional[httpx.AsyncClient] = None
) -> List[List[float]]:
    """Generate skill-vector embeddings for a batch of texts, chunking payloads and respecting rate limits.

    Args:
        texts: List of input strings.
        chunk_size: Optional chunk size (defaults to settings.batch_chunk_size, e.g. 32).
        client: Optional shared httpx.AsyncClient.

    Returns:
        List[List[float]]: Ordered list of 384-dimensional embeddings.

    Raises:
        EmbeddingServiceError: If any batch chunk fails or input is invalid.
    """
    if not texts:
        return []

    # Clean and filter texts
    cleaned_texts = [t.strip() if isinstance(t, str) else "" for t in texts]
    for idx, t in enumerate(cleaned_texts):
        if not t:
            raise EmbeddingServiceError(f"Text at index {idx} is empty.")

    api_token = settings.hf_api_token
    if not api_token:
        raise EmbeddingServiceError("HF_API_TOKEN is not configured in settings or environment.")

    effective_chunk_size = chunk_size or settings.batch_chunk_size
    url = settings.feature_extraction_url
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
    }

    should_close_client = False
    if client is None:
        client = httpx.AsyncClient(timeout=httpx.Timeout(settings.timeout_seconds))
        should_close_client = True

    all_embeddings: List[List[float]] = []

    try:
        # Process in chunks
        for start_idx in range(0, len(cleaned_texts), effective_chunk_size):
            chunk = cleaned_texts[start_idx : start_idx + effective_chunk_size]
            payload = {"inputs": chunk}

            # Retry loop for chunk
            max_attempts = settings.max_retries + 1
            chunk_success = False
            last_err = ""

            for attempt in range(max_attempts):
                try:
                    response = await client.post(url, headers=headers, json=payload)

                    # 429 Rate Limit backoff
                    if response.status_code == 429:
                        header_retry = response.headers.get("retry-after")
                        delay = float(header_retry) if header_retry and header_retry.isdigit() else (2.0 * (attempt + 1))
                        logger.warning(
                            f"HF rate limit reached during batch chunk (start index {start_idx}). Backing off for {delay}s."
                        )
                        await asyncio.sleep(delay)
                        continue

                    # 5xx Server Error retry
                    if 500 <= response.status_code < 600:
                        last_err = f"HTTP {response.status_code}"
                        if attempt < max_attempts - 1:
                            await asyncio.sleep(0.5 * (2 ** attempt))
                            continue
                        raise EmbeddingServiceError(f"HF Server error during batch processing: {last_err}")

                    # 4xx Client Error
                    if 400 <= response.status_code < 500:
                        try:
                            err_detail = response.json().get("error", response.text)
                        except Exception:
                            err_detail = response.text
                        raise EmbeddingServiceError(f"HF Client error (HTTP {response.status_code}): {err_detail}")

                    response.raise_for_status()
                    data = response.json()
                    chunk_vectors = _extract_batch_vectors_from_response(data, expected_count=len(chunk))
                    all_embeddings.extend(chunk_vectors)
                    chunk_success = True
                    break

                except (httpx.TimeoutException, httpx.NetworkError) as e:
                    last_err = f"{type(e).__name__}: {str(e)}"
                    if attempt < max_attempts - 1:
                        await asyncio.sleep(0.5 * (2 ** attempt))
                        continue
                    raise EmbeddingServiceError(f"Network error in batch chunk: {last_err}") from e
                except EmbeddingServiceError:
                    raise
                except Exception as e:
                    raise EmbeddingServiceError(f"Unexpected error in batch chunk: {str(e)}") from e

            if not chunk_success:
                raise EmbeddingServiceError(f"Failed to process batch chunk starting at {start_idx}: {last_err}")

            # Small pacing pause between chunks to respect free-tier rate limits
            if start_idx + effective_chunk_size < len(cleaned_texts):
                await asyncio.sleep(0.1)

        return all_embeddings

    finally:
        if should_close_client:
            await client.aclose()
