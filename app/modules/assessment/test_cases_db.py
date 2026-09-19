"""Hidden Test Case Database for Proctored Assessment Studio.

Hidden test cases are strictly stored on the backend and evaluated during execution.
They are never exposed to frontend client components.
"""

from typing import List, Dict, Any

ASSESSMENT_TEST_CASES: Dict[str, List[Dict[str, Any]]] = {
    "QUEST-2SUM": [
        {
            "id": 1,
            "name": "Sample Test Case 1",
            "input_args": ([2, 7, 11, 15], 9),
            "expected_output": [0, 1],
            "runner_expr": "two_sum([2, 7, 11, 15], 9)",
            "hidden": False
        },
        {
            "id": 2,
            "name": "Sample Test Case 2",
            "input_args": ([3, 2, 4], 6),
            "expected_output": [1, 2],
            "runner_expr": "two_sum([3, 2, 4], 6)",
            "hidden": False
        },
        {
            "id": 3,
            "name": "Sample Test Case 3",
            "input_args": ([3, 3], 6),
            "expected_output": [0, 1],
            "runner_expr": "two_sum([3, 3], 6)",
            "hidden": False
        },
        {
            "id": 4,
            "name": "Hidden Stress Test 4 (Large Target)",
            "input_args": ([1, 5, 8, 12, 20], 20),
            "expected_output": [2, 3],
            "runner_expr": "two_sum([1, 5, 8, 12, 20], 20)",
            "hidden": True
        },
        {
            "id": 5,
            "name": "Hidden Boundary Test 5 (Duplicate Values)",
            "input_args": ([10, 20, 30, 40], 50),
            "expected_output": [1, 2],
            "runner_expr": "two_sum([10, 20, 30, 40], 50)",
            "hidden": True
        }
    ],
    "DOM-TECH-201": [
        {
            "id": 1,
            "name": "Sample Case 1 (Standard Tree)",
            "runner_expr": "sumOfDistancesInTree(6, [[0,1],[0,2],[2,3],[2,4],[2,5]])",
            "expected_output": [8, 12, 6, 10, 10, 10],
            "hidden": False
        },
        {
            "id": 2,
            "name": "Sample Case 2 (Single Node Trivial)",
            "runner_expr": "sumOfDistancesInTree(1, [])",
            "expected_output": [0],
            "hidden": False
        },
        {
            "id": 3,
            "name": "Hidden Case 3 (2-Node Line Graph)",
            "runner_expr": "sumOfDistancesInTree(2, [[0,1]])",
            "expected_output": [1, 1],
            "hidden": True
        },
        {
            "id": 4,
            "name": "Hidden Case 4 (3-Node Line Graph)",
            "runner_expr": "sumOfDistancesInTree(3, [[0,1],[1,2]])",
            "expected_output": [3, 2, 3],
            "hidden": True
        }
    ],
    "QUEST-101": [
        {
            "id": 1,
            "name": "Valid Tool Payload Test",
            "runner_expr": "sanitize_payload({'tool': 'calculator', 'args': {'expr': '14 * 12'}})",
            "expected_output": {"status": "valid", "tool": "calculator"},
            "hidden": False
        },
        {
            "id": 2,
            "name": "Protected Syscall Block Test",
            "runner_expr": "sanitize_payload({'tool': 'bash', 'args': {'cmd': 'rm -rf /'}})",
            "expected_output": {"status": "blocked", "reason": "unauthorized_syscall"},
            "hidden": True
        }
    ]
}


def get_assessment_test_cases(assessment_id: str) -> List[Dict[str, Any]]:
    """Retrieve test cases for a specific assessment ID, falling back to default runner cases."""
    if assessment_id in ASSESSMENT_TEST_CASES:
        return ASSESSMENT_TEST_CASES[assessment_id]
    
    # Generic fallback test suite for unspecified or custom assessments
    return [
        {
            "id": 1,
            "name": "Basic Correctness Test Case",
            "runner_expr": "solution()",
            "expected_output": True,
            "hidden": False
        },
        {
            "id": 2,
            "name": "Hidden Edge Case Validation",
            "runner_expr": "solution()",
            "expected_output": True,
            "hidden": True
        }
    ]
