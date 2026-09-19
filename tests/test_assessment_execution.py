"""Unit tests for Assessment Real Code Execution Module."""

import pytest
from app.modules.assessment.executor import run_code_assessment
from app.modules.assessment.test_cases_db import get_assessment_test_cases


def test_assessment_two_sum_passing_execution():
    """Test real code execution for valid Two Sum solution."""
    source_code = """
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
"""
    result = run_code_assessment(source_code, "python", "QUEST-2SUM")
    assert result["status"] == "passed"
    assert result["passedCount"] == result["totalCount"]
    assert result["passedCount"] >= 3
    assert len(result["failedCases"]) == 0


def test_assessment_failing_execution():
    """Test real code execution for failing code logic."""
    source_code = """
def two_sum(nums, target):
    return []
"""
    result = run_code_assessment(source_code, "python", "QUEST-2SUM")
    assert result["status"] == "failed"
    assert result["passedCount"] == 0
    assert len(result["failedCases"]) > 0


def test_assessment_syntax_error():
    """Test compilation / syntax error handling."""
    source_code = """
def two_sum(nums, target)
    invalid python syntax!!
"""
    result = run_code_assessment(source_code, "python", "QUEST-2SUM")
    assert result["status"] == "compile_error"
    assert result["passedCount"] == 0
    assert "Syntax" in result["details"] or "Compile" in result["details"]


def test_test_cases_db_loader():
    """Test test case loader retrieval."""
    cases = get_assessment_test_cases("QUEST-2SUM")
    assert len(cases) >= 3
    assert any(c.get("hidden") is True for c in cases)
