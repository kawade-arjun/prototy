import { AcademicStream } from '../types';

export type AssessmentSubTab = 
  | 'all_tests'
  | 'daily_quests' 
  | 'domain_benchmarks' 
  | 'recruiter_drives' 
  | 'aptitude_logic' 
  | 'soft_skills_ethics';

export interface AssessmentTest {
  id: string;
  title: string;
  subTab: AssessmentSubTab;
  stream: AcademicStream;
  durationMinutes: number;
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard' | 'National Benchmark';
  benchmarkEntity: {
    name: string;
    logo: string; // e.g. "MS", "GS", "AICTE", "IITB", "AIIMS"
    badgeTitle: string;
  };
  skillTags: string[];
  status: 'not_attempted' | 'in_progress' | 'completed';
  score?: number; // e.g. 94
  percentile?: number;
  cutoffScore?: number;
  progressPercent?: number; // for in_progress
  description: string;
  instructions: string[];
  sampleCases: { input: string; expected: string; explanation: string }[];
  initialCode?: string;
  strengthsDemonstrated?: string[];
  deficitsDetected?: string[];
  awardedBadge?: string;
  skillBridgeRecommendation?: {
    title: string;
    duration: string;
    type: string;
    url: string;
  };
}

export const ASSESSMENT_TESTS: AssessmentTest[] = [
  // 1. DAILY QUESTS (5-10 Mins)
  {
    id: 'QUEST-101',
    title: 'Agent Tool Calling Parameter Sanitizer',
    subTab: 'daily_quests',
    stream: 'tech_ai',
    durationMinutes: 8,
    questionCount: 1,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'AICTE Habit Engine',
      logo: 'AICTE',
      badgeTitle: 'Daily Habit Verified'
    },
    skillTags: ['Python 3.12', 'LLM Agents', 'Schema Validation'],
    status: 'completed',
    score: 100,
    percentile: 99.1,
    description: 'Parse JSON tool-call invocations from LLM payloads and enforce strict type coercion before sandbox execution.',
    instructions: [
      'Parse the raw JSON schema payload representing LLM tool arguments.',
      'Sanitize string injection markers (e.g. system override tokens).',
      'Return typed dictionary or raise ValidationError.'
    ],
    sampleCases: [
      { input: '{"tool": "calculator", "args": {"expr": "14 * 12"}}', expected: '{"status": "valid", "tool": "calculator"}', explanation: 'Valid mathematical tool payload.' },
      { input: '{"tool": "bash", "args": {"cmd": "rm -rf /"}}', expected: '{"status": "blocked", "reason": "unauthorized_syscall"}', explanation: 'Protected syscall blocked.' }
    ],
    strengthsDemonstrated: ['Zero-day prompt injection mitigation', 'Strict pydantic type serialization'],
    deficitsDetected: ['None - pristine execution.'],
    awardedBadge: '🔥 Day 8 Habit Pioneer'
  },
  {
    id: 'QUEST-102',
    title: 'DPDP Fiduciary Consent Token Validator',
    subTab: 'daily_quests',
    stream: 'law_governance',
    durationMinutes: 6,
    questionCount: 1,
    difficulty: 'Beginner',
    benchmarkEntity: {
      name: 'Ministry of IT Standards',
      logo: 'MeitY',
      badgeTitle: 'Statutory Verified'
    },
    skillTags: ['DPDP Act 2023', 'Consent Tokens', 'Audit Ledger'],
    status: 'not_attempted',
    description: 'Verify statutory consent expirations and validate purpose limitation tokens against the DPDP Act 2023 Rules.',
    instructions: [
      'Inspect the consent timestamp and verify digital signature.',
      'Ensure processing purpose matches statutory category.',
      'Log audit trace to tamper-proof ledger.'
    ],
    sampleCases: [
      { input: 'ConsentToken(user="U98", purpose="loan_origination", valid_until="2026-12-31")', expected: 'Valid: Authorized Processing', explanation: 'Within validity horizon.' }
    ]
  },
  {
    id: 'QUEST-103',
    title: 'LBO Cash Sweep Calculation',
    subTab: 'daily_quests',
    stream: 'commerce_finance',
    durationMinutes: 10,
    questionCount: 1,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'SRCC Financial Lab',
      logo: 'SRCC',
      badgeTitle: 'Daily Finance Habit'
    },
    skillTags: ['LBO Waterfall', 'Cash Sweep', 'Debt Amortization'],
    status: 'not_attempted',
    description: 'Compute 50% voluntary cash sweep to prepay senior tranche debt given operating cash flow and working capital changes.',
    instructions: [
      'Calculate Free Cash Flow to Firm (FCFF).',
      'Deduct mandatory debt service and tax provision.',
      'Sweep remaining excess cash at specified 50% covenant threshold.'
    ],
    sampleCases: [
      { input: 'EBITDA=100, Capex=20, Tax=15, MandDebt=25', expected: 'Cash Sweep = 20.0 Cr', explanation: '50% of 40 Cr available cash.' }
    ]
  },

  // 2. DOMAIN-SPECIFIC BENCHMARKS (30-60 Mins)
  {
    id: 'DOM-TECH-201',
    title: 'Tree Rerooting & Algorithmic Graph Optimization',
    subTab: 'domain_benchmarks',
    stream: 'tech_ai',
    durationMinutes: 45,
    questionCount: 2,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'IIT Bombay Benchmark Suite',
      logo: 'IITB',
      badgeTitle: 'IITB Gold Tier'
    },
    skillTags: ['Dynamic Programming', 'Graph Theory', 'C++ 20', 'Python 3.12'],
    status: 'completed',
    score: 94,
    percentile: 98.4,
    description: 'Implement an optimal O(N) tree dynamic programming algorithm with state re-rooting to compute all-pairs distance metrics under distributed network latency constraints.',
    instructions: [
      'Solve in two tree traversal passes: Pass 1 calculates subtree sums rooted at node 0.',
      'Pass 2 transitions the root dynamically to compute all nodes in O(N) instead of O(N^2).',
      'All hidden Judge0 container test suites will evaluate memory limits under 16MB.'
    ],
    sampleCases: [
      { input: 'N = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]', expected: '[8, 12, 6, 10, 10, 10]', explanation: 'Sum of distances to all other nodes from each root.' },
      { input: 'N = 1, edges = []', expected: '[0]', explanation: 'Single node trivial tree.' }
    ],
    initialCode: `# IIT Bombay Benchmark: Tree Rerooting & Dynamic State Propagation
from typing import List

def sumOfDistancesInTree(n: int, edges: List[List[int]]) -> List[int]:
    """
    Compute sum of distances from node i to all other nodes for 0 <= i < n.
    Must run in O(N) time and O(N) space.
    """
    from collections import defaultdict
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        
    count = [1] * n
    ans = [0] * n
    
    # Pass 1: Post-order DFS
    def dfs1(node=0, parent=-1):
        for child in graph[node]:
            if child != parent:
                dfs1(child, node)
                count[node] += count[child]
                ans[node] += ans[child] + count[child]
                
    # Pass 2: Pre-order DFS (Rerooting)
    def dfs2(node=0, parent=-1):
        for child in graph[node]:
            if child != parent:
                # When moving root from node -> child:
                # ans[child] = ans[node] - count[child] + (n - count[child])
                ans[child] = ans[node] - count[child] + (n - count[child])
                dfs2(child, node)
                
    dfs1()
    dfs2()
    return ans
`,
    strengthsDemonstrated: [
      'Mastered 2-pass dynamic tree re-rooting in linear O(N) time',
      'Zero memory fragmentation, optimal recursion stack allocation'
    ],
    deficitsDetected: [
      'Failed edge-case #18: Disconnected forest graph handling (minor timeout)'
    ],
    awardedBadge: 'Verified Graph Algorithm Master (IITB Benchmark)',
    skillBridgeRecommendation: {
      title: 'Disjoint Set Union & Forest Partitioning Lab',
      duration: '45 Mins',
      type: 'Interactive Sandbox Blueprint',
      url: 'careerlens.in/labs/dsu-graphs'
    }
  },
  {
    id: 'DOM-FIN-202',
    title: 'LBO Senior Debt Waterfall & IRR Sensitivity Modeler',
    subTab: 'domain_benchmarks',
    stream: 'commerce_finance',
    durationMinutes: 50,
    questionCount: 1,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'SRCC / NMIMS Financial Board',
      logo: 'SRCC',
      badgeTitle: 'Quant Benchmark'
    },
    skillTags: ['LBO Model', 'IRR Sensitivity', 'Debt Tranches', 'Valuation'],
    status: 'in_progress',
    progressPercent: 65,
    description: 'Build an interactive 3-statement LBO capital structure model. Implement senior term loan amortization, mezzanine debt PIK interest, and calculate sponsor equity return (MoIC & IRR).',
    instructions: [
      'Model Entry Enterprise Value at 10.5x EBITDA multiple.',
      'Construct debt waterfall: Senior Term Loan A (3.5x leverage), Mezzanine Notes (2.0x leverage).',
      'Compute Sponsor IRR across 3-year and 5-year exit horizons under multiple expansion/contraction.'
    ],
    sampleCases: [
      { input: 'Entry EBITDA: ₹150 Cr, Leverage: 5.5x, Exit: 11.0x in Yr 5', expected: 'Target IRR: 24.8%, MoIC: 2.85x', explanation: 'Passed institutional private equity return threshold.' }
    ]
  },
  {
    id: 'DOM-DES-203',
    title: 'Live WCAG 2.2 / 3.0 AAA Spatial & Contrast Auditor',
    subTab: 'domain_benchmarks',
    stream: 'ui_ux',
    durationMinutes: 40,
    questionCount: 3,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'NID Ahmedabad Design Systems',
      logo: 'NID',
      badgeTitle: 'NID Accessibility'
    },
    skillTags: ['WCAG 2.2 AAA', 'Contrast Ratios', 'ARIA Trees', 'Layout Usability'],
    status: 'completed',
    score: 98,
    percentile: 99.4,
    description: 'Audit live design token state machines and DOM element contrasts for WCAG 2.2 Level AAA compliance and touch target spatial tolerances.',
    instructions: [
      'Audit 48 dynamic color token pairings against 7.0:1 AAA contrast requirement.',
      'Check touch target bounding boxes for minimum 48px × 48px spatial clearance.',
      'Verify aria-expanded and aria-live announcements for screen readers.'
    ],
    sampleCases: [
      { input: 'Token: text-slate-400 on bg-slate-900', expected: 'Passed: 8.2:1 AAA Compliant', explanation: 'Exceeds 7:1 ratio.' }
    ],
    strengthsDemonstrated: [
      '100% precision in contrast ratio mathematical derivation',
      'Flawless screen reader semantic tree verification'
    ],
    deficitsDetected: ['None'],
    awardedBadge: 'Verified WCAG 2.2 Design Systems Architect'
  },
  {
    id: 'DOM-LAW-204',
    title: 'Enterprise Cloud Contract & Statutory NDA Risk Review',
    subTab: 'domain_benchmarks',
    stream: 'law_governance',
    durationMinutes: 45,
    questionCount: 2,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'NLSIU Bangalore Tech Law Lab',
      logo: 'NLSIU',
      badgeTitle: 'Tech Law Benchmark'
    },
    skillTags: ['DPDP Act 2023', 'Contract Markup', 'Indemnity Clauses', 'Statutory Audit'],
    status: 'not_attempted',
    description: 'Examine enterprise software-as-a-service (SaaS) and vendor master agreements to detect statutory fiduciary violations under India’s Digital Personal Data Protection Act 2023.',
    instructions: [
      'Parse Section 4, 8, and 16 of the vendor agreement.',
      'Flag cross-border biometric transfer triggers and non-standard indemnities.',
      'Formulate legally enforceable remedial amendment clauses.'
    ],
    sampleCases: [
      { input: 'Clause 12.3: "Customer waives right to breach notifications under 72 hours"', expected: 'HIGH STATUTORY RISK: Violates DPDP Section 8(6) mandatory reporting.', explanation: 'Statutory provisions cannot be contracted away.' }
    ]
  },
  {
    id: 'DOM-BIO-205',
    title: 'Clinical Trial Survival Analysis (Kaplan-Meier Validator)',
    subTab: 'domain_benchmarks',
    stream: 'healthcare_bio',
    durationMinutes: 50,
    questionCount: 1,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'AIIMS New Delhi Biostat Lab',
      logo: 'AIIMS',
      badgeTitle: 'Clinical Bio-Stat'
    },
    skillTags: ['Kaplan-Meier', 'Hazard Ratios', 'Biostatistics', 'Python/R'],
    status: 'not_attempted',
    description: 'Process clinical oncology cohort trials data, derive log-rank test statistics, generate Kaplan-Meier progression-free survival curves, and report 95% confidence intervals.',
    instructions: [
      'Compute survival probability S(t) using product-limit estimator.',
      'Compute Cox proportional hazards ratio between arm A and arm B.',
      'Report p-value and log-rank significance.'
    ],
    sampleCases: [
      { input: 'Arm A vs Arm B, N=420, Events=180', expected: 'HR = 0.68 (95% CI: 0.52-0.89), Log-Rank p = 0.004', explanation: 'Statistically significant survival benefit.' }
    ]
  },

  // 3. RECRUITER / COMPANY DRIVE TESTS (45-90 Mins)
  {
    id: 'REC-MSFT-301',
    title: 'Microsoft Applied GenAI & Distributed Systems Drive',
    subTab: 'recruiter_drives',
    stream: 'tech_ai',
    durationMinutes: 75,
    questionCount: 3,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'Microsoft University Recruitment',
      logo: 'MS',
      badgeTitle: 'Round 1 Bypass Test'
    },
    skillTags: ['vLLM', 'Distributed CUDA', 'FastAPI', 'High Throughput'],
    cutoffScore: 85,
    status: 'completed',
    score: 92,
    percentile: 98.9,
    description: 'Official technical pre-flight evaluation for candidate referral pipeline JOB-MSFT-901. Candidates scoring >=85% receive direct Round-1 interview waivers.',
    instructions: [
      'Problem 1: PagedAttention token buffer allocator simulation.',
      'Problem 2: Distributed lock with Redis and exponential backoff.',
      'Problem 3: Microservices latency SLA budget decomposition.'
    ],
    sampleCases: [
      { input: 'Tokens: 8192, BatchSize: 64', expected: 'P99 Latency < 18ms, KV-cache fragmentation < 3.2%', explanation: 'Exceeds Microsoft Azure AI SLA.' }
    ],
    strengthsDemonstrated: [
      'Scored 92% (Exceeded Microsoft 85% Cutoff threshold)',
      'Qualified for Direct Interview Invitation (Round 1 Waived)'
    ],
    deficitsDetected: [
      'Slight latency bump in Redis distributed lock under high concurrency'
    ],
    awardedBadge: 'Microsoft GenAI Pre-Verified Scholar (R1 Waived)'
  },
  {
    id: 'REC-GS-302',
    title: 'Goldman Sachs Quantitative Risk & Algorithmic Trading Drive',
    subTab: 'recruiter_drives',
    stream: 'commerce_finance',
    durationMinutes: 90,
    questionCount: 3,
    difficulty: 'National Benchmark',
    benchmarkEntity: {
      name: 'Goldman Sachs Engineering',
      logo: 'GS',
      badgeTitle: 'Global Placement Drive'
    },
    skillTags: ['Black-Scholes', 'Monte Carlo', 'VaR Calculations', 'C++ / Python'],
    cutoffScore: 88,
    status: 'not_attempted',
    description: 'Official assessment testing numerical pricing engines, derivative risk greeks (Delta, Gamma, Vega), and real-time Value at Risk (VaR) calculations under liquidity shocks.',
    instructions: [
      'Implement Monte Carlo option pricing engine with variance reduction.',
      'Compute portfolio 99% 1-day Historical and Parametric VaR.',
      'Analyze market maker order book spread dynamics.'
    ],
    sampleCases: [
      { input: 'S0=100, K=105, r=0.05, sigma=0.2, T=1.0', expected: 'Call = 8.02, Delta = 0.52', explanation: 'Analytic Black-Scholes benchmark match.' }
    ]
  },
  {
    id: 'REC-RZP-303',
    title: 'Razorpay Payment Orchestration & Idempotency Challenge',
    subTab: 'recruiter_drives',
    stream: 'tech_ai',
    durationMinutes: 60,
    questionCount: 2,
    difficulty: 'Hard',
    benchmarkEntity: {
      name: 'Razorpay Engineering',
      logo: 'RZP',
      badgeTitle: 'FinTech Systems Drive'
    },
    skillTags: ['Idempotency Keys', 'Distributed Transactions', 'PostgreSQL', 'Kafka'],
    cutoffScore: 80,
    status: 'not_attempted',
    description: 'Build a double-spend prevention banking ledger implementing transactional outbox patterns and idempotent payment webhooks.',
    instructions: [
      'Ensure zero duplicate ledger entries under network retry bursts.',
      'Enforce atomic wallet balance mutations with optimistic locking.',
      'Pass concurrent 500 RPS stress test in sandbox container.'
    ],
    sampleCases: [
      { input: '10 concurrent payments with identical Idempotency-Key "IDEMP-99"', expected: 'Exactly 1 debit processed, 9 return cached 200 OK response.', explanation: 'Flawless idempotency.' }
    ]
  },

  // 4. APTITUDE & QUANTITATIVE REASONING (30-45 Mins)
  {
    id: 'APT-101',
    title: 'Permutations, Combinatorics & Bayesian Probability',
    subTab: 'aptitude_logic',
    stream: 'tech_ai',
    durationMinutes: 35,
    questionCount: 15,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'AICTE National Standard Exam',
      logo: 'AICTE',
      badgeTitle: 'Placement Readiness'
    },
    skillTags: ['Probability', 'Combinatorics', 'Bayes Theorem', 'Data Analysis'],
    status: 'completed',
    score: 96,
    percentile: 98.7,
    description: 'Standardized assessment covering conditional probability, Bayes theorem in machine learning, Pigeonhole principle, and arrangement permutations.',
    instructions: [
      '15 timed questions with numerical and formula responses.',
      'Zero pen-paper dependencies: built-in scientific scratchpad available.',
      'Normalized against 180,000 national campus placement test takers.'
    ],
    sampleCases: [
      { input: 'False positive rate 1%, Base disease rate 0.1%, Test sensitivity 99%', expected: 'Posterior probability = 9.0%', explanation: 'Classic Bayesian medical screening paradox.' }
    ],
    strengthsDemonstrated: [
      'Top 1.3% national score in probabilistic inference',
      'Zero calculation errors across Bayes theorem section'
    ],
    deficitsDetected: ['Minor delay on circular permutation problem #12'],
    awardedBadge: 'National Aptitude Excellence: 98.7th Percentile'
  },
  {
    id: 'APT-102',
    title: 'Data Interpretation & Financial Ratio Inference',
    subTab: 'aptitude_logic',
    stream: 'commerce_finance',
    durationMinutes: 40,
    questionCount: 12,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'National Placement Consortium',
      logo: 'NPC',
      badgeTitle: 'Quantitative Aptitude'
    },
    skillTags: ['Ratio Analysis', 'Chart Inference', 'Working Capital', 'CAGR'],
    status: 'not_attempted',
    description: 'Solve complex corporate balance sheets, multi-year revenue tables, CAGR trends, and working capital cycles under timed constraints.',
    instructions: [
      'Analyze 4 corporate case chart panels.',
      'Compute DuPont ROE decompositions and quick ratio health.',
      'Answer multi-scenario inference questions.'
    ],
    sampleCases: [
      { input: 'Net Profit Margin=12%, Asset Turnover=1.5, Equity Multiplier=2.0', expected: 'ROE = 36.0%', explanation: 'DuPont 3-factor identity.' }
    ]
  },

  // 5. SOFT SKILLS & BUSINESS ETHICS (15-30 Mins)
  {
    id: 'ETH-101',
    title: 'DPDP Act 2023 Data Privacy & Algorithmic Ethics Case',
    subTab: 'soft_skills_ethics',
    stream: 'law_governance',
    durationMinutes: 20,
    questionCount: 2,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'Ministry of Corporate Affairs Ethics Board',
      logo: 'MCA',
      badgeTitle: 'Statutory Ethics Seal'
    },
    skillTags: ['DPDP Act 2023', 'AI Governance', 'Data Fiduciary', 'Whistleblowing'],
    status: 'completed',
    score: 95,
    percentile: 97.5,
    description: 'Interactive statutory ethics simulation. You are the Lead Systems Architect when marketing requests unconsented training on confidential user biometric data.',
    instructions: [
      'Evaluate statutory fiduciary liabilities under Section 8 of DPDP Act.',
      'Formulate executive response balancing business revenue and statutory compliance.',
      'Draft whistleblower escalation trail under protected legal channels.'
    ],
    sampleCases: [
      { input: 'Scenario: Executive pressure to bypass DPDP Board audit before Q4 launch', expected: 'Appropriate Action: Formal statutory refusal citing personal director liability.', explanation: 'Direct statutory protection.' }
    ],
    strengthsDemonstrated: [
      'Clear articulation of corporate fiduciary accountability',
      'Defensible legal risk mitigation roadmap'
    ],
    deficitsDetected: ['None'],
    awardedBadge: 'Verified DPDP Statutory Ethics Fellow'
  },
  {
    id: 'ETH-102',
    title: 'Executive Technical Storytelling & Client Escalation',
    subTab: 'soft_skills_ethics',
    stream: 'tech_ai',
    durationMinutes: 25,
    questionCount: 2,
    difficulty: 'Intermediate',
    benchmarkEntity: {
      name: 'Enterprise Consulting Leadership',
      logo: 'ECL',
      badgeTitle: 'Executive Communications'
    },
    skillTags: ['Client Management', 'SLA Incident Post-Mortem', 'Storytelling'],
    status: 'not_attempted',
    description: 'Present a root-cause analysis (RCA) and executive post-mortem to the C-Suite after a 42-minute production outage on black-friday checkout rails.',
    instructions: [
      'Structure the 5-whys root cause analysis for non-technical stakeholders.',
      'Frame remediation commitments without admitting uninsurable negligence.',
      'Present customer restitution and SLA credit strategy.'
    ],
    sampleCases: [
      { input: 'Outage caused by database connection pool exhaustion', expected: 'Delivered: Clear, empathetic, non-jargon RCA with preventative architectural commitments.', explanation: 'Approved executive communication.' }
    ]
  }
];
