"""Lightweight skill NER pre-filtering service using Hugging Face Inference API.

Model: algiraldohe/lm-ner-linkedin-skills-recognition
Provides cheap candidate skill terms as hints for the main LLM extraction pipeline.
"""

import logging
import re
from typing import Any, List, Optional
import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

SKILL_NER_MODEL_NAME = "algiraldohe/lm-ner-linkedin-skills-recognition"


def _clean_and_deduplicate_terms(raw_terms: List[str]) -> List[str]:
    """Clean subwords and deduplicate skill terms case-insensitively preserving order."""
    seen = set()
    cleaned = []
    for term in raw_terms:
        # Strip subword tokens (e.g. BERT/RoBERTa '##', 'Ġ', ' ') and whitespace
        t = re.sub(r"^(##|Ġ| )+", "", term)
        t = re.sub(r"[^\w\s\+\#\.\-]", "", t).strip()

        if len(t) < 2:  # Skip single character noise
            continue

        lower_t = t.lower()
        if lower_t not in seen:
            seen.add(lower_t)
            cleaned.append(t)
    return cleaned


def _parse_token_classification_response(data: Any) -> List[str]:
    """Parse HF token-classification response into raw candidate skill terms."""
    if not isinstance(data, list):
        return []

    raw_terms: List[str] = []
    current_term_tokens: List[str] = []

    for item in data:
        if not isinstance(item, dict):
            continue

        word = item.get("word", "")
        entity = item.get("entity_group") or item.get("entity") or ""

        # Model tags skills as 'SKILL', 'B-SKILL', 'I-SKILL', or entity groups
        is_skill = "skill" in entity.lower() or entity in ("LABEL_0", "SKILL", "B-SKILL", "I-SKILL")

        if is_skill and word:
            # Check if this token continues a subword or previous B/I entity
            if word.startswith("##") or entity.startswith("I-"):
                clean_part = word.lstrip("#")
                if current_term_tokens:
                    current_term_tokens.append(clean_part)
                else:
                    current_term_tokens.append(word)
            else:
                if current_term_tokens:
                    assembled = "".join(current_term_tokens) if any(x.startswith("##") for x in current_term_tokens) else " ".join(current_term_tokens)
                    raw_terms.append(assembled)
                    current_term_tokens = []
                current_term_tokens.append(word)
        else:
            if current_term_tokens:
                assembled = "".join(current_term_tokens) if any(x.startswith("##") for x in current_term_tokens) else " ".join(current_term_tokens)
                raw_terms.append(assembled)
                current_term_tokens = []

    if current_term_tokens:
        assembled = "".join(current_term_tokens) if any(x.startswith("##") for x in current_term_tokens) else " ".join(current_term_tokens)
        raw_terms.append(assembled)

    # In case token-classification returned grouped entities directly
    for item in data:
        if isinstance(item, dict) and "word" in item:
            entity = item.get("entity_group") or item.get("entity") or ""
            if "skill" in entity.lower() and item["word"]:
                raw_terms.append(item["word"])

    return _clean_and_deduplicate_terms(raw_terms)


async def extract_candidate_skill_terms(
    resume_text: str,
    client: Optional[httpx.AsyncClient] = None
) -> List[str]:
    """Call HF token-classification to extract candidate skill terms as hints.

    Requirements:
    1. Returns a deduplicated list of raw skill-term strings.
    2. Respects ENABLE_SKILL_NER_PREFILTER config flag.
    3. On any failure, returns an empty list and logs a warning — never raises or blocks.

    Args:
        resume_text: Raw text of the resume.
        client: Optional shared httpx.AsyncClient.

    Returns:
        List[str]: Candidate skill terms (empty list if disabled or on error).
    """
    # Check config flag (Requirement 3)
    if not settings.enable_skill_ner_prefilter:
        logger.debug("ENABLE_SKILL_NER_PREFILTER is False. Bypassing skill NER pre-filter.")
        return []

    if not resume_text or not resume_text.strip():
        return []

    api_token = settings.hf_api_token
    url = settings.ner_inference_url
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
    }
    # Send up to first 3000 chars for token classification to stay within model max sequence limit
    payload = {"inputs": resume_text[:3000].strip()}

    should_close_client = False
    if client is None:
        client = httpx.AsyncClient(timeout=httpx.Timeout(settings.timeout_seconds))
        should_close_client = True

    try:
        response = await client.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            logger.warning(
                "Skill NER HF API returned status %d: %s. Returning empty candidate list.",
                response.status_code,
                response.text[:200]
            )
            return []

        data = response.json()
        candidate_terms = _parse_token_classification_response(data)

        logger.info(
            "Skill NER pre-filter extracted %d candidate terms from resume: %s",
            len(candidate_terms),
            candidate_terms[:10]  # log sample
        )
        return candidate_terms

    except Exception as e:
        # Never let NER errors block the main extraction pipeline
        logger.warning(
            "Skill NER pre-filter encountered an error (%s: %s). Falling back to empty candidate list.",
            type(e).__name__,
            str(e)
        )
        return []

    finally:
        if should_close_client:
            await client.aclose()
