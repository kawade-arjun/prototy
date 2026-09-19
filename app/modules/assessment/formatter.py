"""Assessment Response Formatter Module.

Formats assessment execution metrics and test case outcomes into standardized response payloads.
"""

from typing import Dict, Any, List


def format_assessment_response(
    status: str,
    passed_count: int,
    total_count: int,
    runtime: str,
    memory: str,
    details: str,
    failed_cases: List[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Format assessment execution result into standard API JSON response."""
    valid_statuses = {"passed", "failed", "compile_error", "runtime_error", "timeout"}
    final_status = status if status in valid_statuses else "failed"

    return {
        "status": final_status,
        "passedCount": max(0, passed_count),
        "totalCount": max(1, total_count),
        "runtime": runtime or "0ms",
        "memory": memory or "0 MB",
        "details": details or "",
        "failedCases": failed_cases or []
    }
