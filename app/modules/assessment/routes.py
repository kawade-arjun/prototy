"""FastAPI Assessment API Routes.

Exposes `/api/assessment/execute` endpoint for real code compilation and test suite evaluation.
"""

from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.modules.assessment.executor import run_code_assessment
from app.modules.assessment.formatter import format_assessment_response

router = APIRouter(prefix="/api/assessment", tags=["Assessment Execution"])


class AssessmentExecutionRequest(BaseModel):
    source_code: str = Field(..., description="Candidate editor source code to execute")
    language: Optional[str] = Field(default="python", description="Programming language (python, cpp, java, typescript)")
    assessment_id: str = Field(..., description="ID of the assessment being executed (e.g., QUEST-2SUM)")


class AssessmentExecutionResponse(BaseModel):
    status: str = Field(..., description="Execution status: passed, failed, compile_error, runtime_error, timeout")
    passedCount: int = Field(..., description="Number of passed test cases")
    totalCount: int = Field(..., description="Total number of test cases evaluated")
    runtime: str = Field(..., description="Execution runtime (e.g. 4ms)")
    memory: str = Field(..., description="Memory overhead (e.g. 4.2 MB)")
    details: str = Field(..., description="Detailed execution feedback & logs")
    failedCases: List[Dict[str, Any]] = Field(default=[], description="List of failed test case details")


@router.post("/execute", response_model=AssessmentExecutionResponse)
async def api_execute_assessment(payload: AssessmentExecutionRequest):
    """Execute candidate source code against backend test suite in isolated subprocess."""
    try:
        raw_result = run_code_assessment(
            source_code=payload.source_code,
            language=payload.language or "python",
            assessment_id=payload.assessment_id
        )
        formatted = format_assessment_response(
            status=raw_result.get("status", "failed"),
            passed_count=raw_result.get("passedCount", 0),
            total_count=raw_result.get("totalCount", 1),
            runtime=raw_result.get("runtime", "0ms"),
            memory=raw_result.get("memory", "0 MB"),
            details=raw_result.get("details", ""),
            failed_cases=raw_result.get("failedCases", [])
        )
        return formatted
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assessment execution error: {str(e)}")
