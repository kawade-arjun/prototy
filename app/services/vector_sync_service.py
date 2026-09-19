"""Service wiring the Hugging Face embedding service into pgvector write and search paths."""

import logging
from typing import Any, Dict, List
from app.services.embedding_service import generate_embedding, EMBEDDING_MODEL_NAME
from app.repositories.vector_repo import vector_repo, ModelMismatchError

logger = logging.getLogger(__name__)


async def vectorize_and_save_student_profile(
    student_id: str,
    profile_or_skills_text: str
) -> Dict[str, Any]:
    """Generate embedding for student profile/skills and persist to student_profile_vectors.

    Replaces any existing embedding source with the Hugging Face Inference API service.
    """
    logger.info(f"Generating skill-vector embedding for student {student_id} using {EMBEDDING_MODEL_NAME}")
    embedding = await generate_embedding(profile_or_skills_text)

    saved_record = await vector_repo.save_student_profile_vector(
        student_id=student_id,
        profile_text=profile_or_skills_text,
        embedding=embedding,
        embedding_model=EMBEDDING_MODEL_NAME,
    )
    return saved_record


async def vectorize_and_save_role_requirements(
    role_id: str,
    role_title: str,
    requirements_text: str
) -> Dict[str, Any]:
    """Generate embedding for company role requirements and persist to role_requirements.

    Replaces any existing embedding source with the Hugging Face Inference API service.
    """
    logger.info(f"Generating requirement-vector embedding for role {role_id} ({role_title}) using {EMBEDDING_MODEL_NAME}")
    embedding = await generate_embedding(requirements_text)

    saved_record = await vector_repo.save_role_requirement_vector(
        role_id=role_id,
        role_title=role_title,
        requirements_text=requirements_text,
        embedding=embedding,
        embedding_model=EMBEDDING_MODEL_NAME,
    )
    return saved_record


async def find_matching_roles_for_student(
    student_id: str,
    top_k: int = 5
) -> List[Dict[str, Any]]:
    """Match a student's profile vector against company role requirements.

    Enforces that only roles embedded with the exact same model are compared.
    """
    student_vector_record = await vector_repo.get_student_vector(
        student_id=student_id,
        embedding_model=EMBEDDING_MODEL_NAME
    )
    if not student_vector_record:
        raise ValueError(f"No vector found for student {student_id} with model {EMBEDDING_MODEL_NAME}")

    student_model = student_vector_record["embedding_model"]
    if student_model != EMBEDDING_MODEL_NAME:
        raise ModelMismatchError(
            f"Cannot compare: student profile embedded with '{student_model}', "
            f"but current query expects '{EMBEDDING_MODEL_NAME}'."
        )

    return await vector_repo.search_matching_roles(
        query_embedding=student_vector_record["embedding"],
        query_model=student_model,
        top_k=top_k
    )
