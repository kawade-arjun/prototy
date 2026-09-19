import { AcademicStream } from '../types';

export type FunnelStage = 
  | 'applied' 
  | 'ai_screened' 
  | 'assessment_passed' 
  | 'shortlisted_404020' 
  | 'technical_round_1' 
  | 'culture_fit' 
  | 'offer_released' 
  | 'onboarded';

export interface RecruiterCandidate {
  id: string;
  name: string;
  avatar: string;
  college: string;
  stream: AcademicStream;
  streamLabel: string;
  targetRole: string;
  appliedOpeningId: string;
  appliedDate: string;
  stage: FunnelStage;
  
  // 40-40-20 Composite AI Scoring Components
  scores: {
    sandbox: number; // 40% (0-100)
    projects: number; // 40% (0-100)
    academics: number; // 20% (0-100)
    composite: number; // calculated 0-100
  };

  // Screening & AI Match Telemetry
  vectorSimilarity: number; // pgvector cosine match against JD (e.g. 94.6%)
  atsScore: number;
  
  // Fraud & Verification Audit
  fraudRisk: 'pristine' | 'tamper_suspect';
  fraudBadgeText: string;
  elaTelemetry?: {
    isTampered: boolean;
    deviationIndex: number; // e.g. 0.884
    tamperedField: string; // e.g. 'CGPA altered from 7.20 to 9.85 & Spliced Registrar Stamp'
    docName: string;
    docType: string;
    softwareMarker: string; // e.g. 'Adobe Photoshop 2025.2 (Macintosh)'
    resaveCount: number;
    sha256Checksum: string;
    expectedChecksum: string;
    originalDocImage: string;
    elaHeatmapImage: string;
  };

  badges: string[];
  interviewStatus: 'none' | 'invited_r1' | 'scheduled_r1' | 'passed_r1' | 'invited_r2' | 'offered' | 'quarantined';
  scheduledInterview?: {
    date: string;
    time: string;
    round: string;
    meetingUrl: string;
    interviewer: string;
  };
}

export interface FunnelStageMeta {
  id: FunnelStage;
  label: string;
  shortLabel: string;
  count: number;
  conversionRate: string;
  color: string;
  badgeBg: string;
  description: string;
}

export const FUNNEL_STAGES: FunnelStageMeta[] = [
  { 
    id: 'applied', 
    label: '1. Applied', 
    shortLabel: 'Applied', 
    count: 48, 
    conversionRate: '100%', 
    color: 'border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300',
    badgeBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    description: 'Raw campus and off-campus applications received.' 
  },
  { 
    id: 'ai_screened', 
    label: '2. AI Screened', 
    shortLabel: 'Screened', 
    count: 32, 
    conversionRate: '66.7%', 
    color: 'border-amber-400 text-amber-700 dark:border-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    description: 'Resumes semantically parsed and vector-matched to JD.' 
  },
  { 
    id: 'assessment_passed', 
    label: '3. Assessment Passed', 
    shortLabel: 'Assessed', 
    count: 18, 
    conversionRate: '56.2%', 
    color: 'border-orange-400 text-orange-700 dark:border-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    description: 'Cleared proctored sandboxes (Judge0 code runs, DCF modeling).' 
  },
  { 
    id: 'shortlisted_404020', 
    label: '4. 40-40-20 Shortlisted', 
    shortLabel: 'Shortlisted', 
    count: 9, 
    conversionRate: '50.0%', 
    color: 'border-amber-500 text-amber-800 dark:border-amber-500 dark:text-amber-300',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    description: 'Surpassed recruiter dynamic composite cutoff threshold.' 
  },
  { 
    id: 'technical_round_1', 
    label: '5. Technical Round 1', 
    shortLabel: 'Tech R1', 
    count: 6, 
    conversionRate: '66.7%', 
    color: 'border-orange-500 text-orange-800 dark:border-orange-500 dark:text-orange-300',
    badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
    description: 'Live domain & algorithmic architectural interview.' 
  },
  { 
    id: 'culture_fit', 
    label: '6. Culture / HR Fit', 
    shortLabel: 'Culture Fit', 
    count: 3, 
    conversionRate: '50.0%', 
    color: 'border-purple-400 text-purple-700 dark:border-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    description: 'Leadership alignment, communication & ethics evaluation.' 
  },
  { 
    id: 'offer_released', 
    label: '7. Offer Released', 
    shortLabel: 'Offered', 
    count: 2, 
    conversionRate: '66.7%', 
    color: 'border-amber-400 text-amber-700 dark:border-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    description: 'Cryptographically signed digital offer letter released.' 
  },
  { 
    id: 'onboarded', 
    label: '8. Onboarded / Joined', 
    shortLabel: 'Joined', 
    count: 2, 
    conversionRate: '100%', 
    color: 'border-teal-400 text-teal-700 dark:border-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
    description: 'Placement locked & auto-synced with college TPO NIRF ledger.' 
  }
];

export const RECRUITER_CANDIDATES: RecruiterCandidate[] = [
  {
    id: 'CAND-984',
    name: 'Arjun Kawade',
    avatar: 'AK',
    college: 'IIT Bombay',
    stream: 'tech_ai',
    streamLabel: 'Engineering',
    targetRole: 'GenAI & Applied Research Engineer',
    appliedOpeningId: 'JOB-MSFT-901',
    appliedDate: '2026-09-12',
    stage: 'technical_round_1',
    scores: {
      sandbox: 98,
      projects: 92,
      academics: 88,
      composite: Math.round((98 * 0.4 + 92 * 0.4 + 88 * 0.2) * 10) / 10 // 93.6
    },
    vectorSimilarity: 96.4,
    atsScore: 92,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['IITB Benchmark Top 1%', 'vLLM Kernel Author', 'DigiLocker PKI Validated'],
    interviewStatus: 'scheduled_r1',
    scheduledInterview: {
      date: '2026-09-19',
      time: '14:30 IST',
      round: 'Round 1: Distributed Kernel Concurrency',
      meetingUrl: 'meet.google.com/xyz-careeroptic-984',
      interviewer: 'Dr. Satya Ramanathan (Principal Research Lead)'
    }
  },
  {
    id: 'CAND-742',
    name: 'Priya Sharma',
    avatar: 'PS',
    college: 'SRCC Delhi',
    stream: 'commerce_finance',
    streamLabel: 'Commerce & Finance',
    targetRole: 'Quantitative Risk & Treasury Analyst',
    appliedOpeningId: 'JOB-RZP-402',
    appliedDate: '2026-09-14',
    stage: 'shortlisted_404020',
    scores: {
      sandbox: 94,
      projects: 95,
      academics: 92,
      composite: Math.round((94 * 0.4 + 95 * 0.4 + 92 * 0.2) * 10) / 10 // 94.0
    },
    vectorSimilarity: 94.8,
    atsScore: 94,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['SRCC DCF Top 2%', 'Bloomberg Quant Certified', 'DigiLocker Verified'],
    interviewStatus: 'invited_r1'
  },
  {
    id: 'CAND-619',
    name: 'Rohan Mehta',
    avatar: 'RM',
    college: 'NID Ahmedabad',
    stream: 'ui_ux',
    streamLabel: 'UI/UX Design',
    targetRole: 'Design System Architect & Accessibility Auditor',
    appliedOpeningId: 'GIG-DES-104',
    appliedDate: '2026-09-13',
    stage: 'culture_fit',
    scores: {
      sandbox: 96,
      projects: 89,
      academics: 85,
      composite: Math.round((96 * 0.4 + 89 * 0.4 + 85 * 0.2) * 10) / 10 // 91.0
    },
    vectorSimilarity: 93.1,
    atsScore: 90,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['NID WCAG 2.2 Master', 'Figma Tokens Guild', '0% Fraud Seal'],
    interviewStatus: 'scheduled_r1',
    scheduledInterview: {
      date: '2026-09-20',
      time: '11:00 IST',
      round: 'Culture & Design Systems Fit',
      meetingUrl: 'meet.google.com/ux-cred-design-619',
      interviewer: 'Aakash Verma (VP of Product Design)'
    }
  },
  {
    id: 'CAND-811',
    name: 'Vikramaditya Rao',
    avatar: 'VR',
    college: 'Apex Institute of Technology',
    stream: 'tech_ai',
    streamLabel: 'Engineering',
    targetRole: 'GenAI & Applied Research Engineer',
    appliedOpeningId: 'JOB-MSFT-901',
    appliedDate: '2026-09-15',
    stage: 'applied',
    scores: {
      sandbox: 58,
      projects: 52,
      academics: 98, // Falsified marksheets!
      composite: Math.round((58 * 0.4 + 52 * 0.4 + 98 * 0.2) * 10) / 10 // 63.6
    },
    vectorSimilarity: 68.2,
    atsScore: 78,
    fraudRisk: 'tamper_suspect',
    fraudBadgeText: 'Tamper Suspect (ELA High)',
    badges: ['Flagged by CV2 ELA Engine', 'Digital Seal Mismatch'],
    interviewStatus: 'none',
    elaTelemetry: {
      isTampered: true,
      deviationIndex: 0.884,
      tamperedField: 'Transcript CGPA modified from 7.20 to 9.85; Registrar Seal cloned with 4-cycle JPEG compression variance.',
      docName: 'B.Tech_Semester_8_Final_Marksheet_Tampered.pdf',
      docType: 'Official Academic Transcript',
      softwareMarker: 'Adobe Photoshop 2025.2 (Macintosh)',
      resaveCount: 4,
      sha256Checksum: '0x4f82a19b8823c10e392d4710',
      expectedChecksum: '0x9a12c833fa481e102283dc91 (University Registry)',
      originalDocImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      elaHeatmapImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'CAND-503',
    name: 'Ananya Iyer',
    avatar: 'AI',
    college: 'NLSIU Bengaluru',
    stream: 'law_governance',
    streamLabel: 'Law & Governance',
    targetRole: 'Digital Tech Policy & Statutory Compliance Associate',
    appliedOpeningId: 'JOB-NLSIU-501',
    appliedDate: '2026-09-11',
    stage: 'offer_released',
    scores: {
      sandbox: 95,
      projects: 93,
      academics: 94,
      composite: Math.round((95 * 0.4 + 93 * 0.4 + 94 * 0.2) * 10) / 10 // 94.0
    },
    vectorSimilarity: 97.2,
    atsScore: 95,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['NLSIU DPDP Gold Scholar', 'MeitY Policy Fellow', 'DigiLocker Verified'],
    interviewStatus: 'offered'
  },
  {
    id: 'CAND-429',
    name: 'Dr. Pooja Nair',
    avatar: 'PN',
    college: 'AIIMS New Delhi',
    stream: 'healthcare_bio',
    streamLabel: 'Healthcare & Bio',
    targetRole: 'Clinical Trial Biostatistician & Multi-Omics Lead',
    appliedOpeningId: 'JOB-BIO-701',
    appliedDate: '2026-09-10',
    stage: 'onboarded',
    scores: {
      sandbox: 97,
      projects: 96,
      academics: 95,
      composite: Math.round((97 * 0.4 + 96 * 0.4 + 95 * 0.2) * 10) / 10 // 96.2
    },
    vectorSimilarity: 98.4,
    atsScore: 96,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['AIIMS Gold Medalist', 'Kaplan-Meier Suite Author', 'DigiLocker Verified'],
    interviewStatus: 'offered'
  },
  {
    id: 'CAND-338',
    name: 'Devansh Gupta',
    avatar: 'DG',
    college: 'BITS Pilani',
    stream: 'tech_ai',
    streamLabel: 'Engineering',
    targetRole: 'GenAI & Applied Research Engineer',
    appliedOpeningId: 'JOB-MSFT-901',
    appliedDate: '2026-09-14',
    stage: 'assessment_passed',
    scores: {
      sandbox: 86,
      projects: 84,
      academics: 80,
      composite: Math.round((86 * 0.4 + 84 * 0.4 + 80 * 0.2) * 10) / 10 // 84.0
    },
    vectorSimilarity: 89.5,
    atsScore: 86,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['C++20 Concurrency', 'Redis Vector Cache'],
    interviewStatus: 'none'
  },
  {
    id: 'CAND-214',
    name: 'Sneha Kulkarni',
    avatar: 'SK',
    college: 'COEP Pune',
    stream: 'tech_ai',
    streamLabel: 'Engineering',
    targetRole: 'GenAI & Applied Research Engineer',
    appliedOpeningId: 'JOB-MSFT-901',
    appliedDate: '2026-09-15',
    stage: 'ai_screened',
    scores: {
      sandbox: 79,
      projects: 81,
      academics: 84,
      composite: Math.round((79 * 0.4 + 81 * 0.4 + 84 * 0.2) * 10) / 10 // 80.8
    },
    vectorSimilarity: 85.0,
    atsScore: 82,
    fraudRisk: 'pristine',
    fraudBadgeText: '0.0% Fraud (Pristine)',
    badges: ['PyTorch Transformer Specialist'],
    interviewStatus: 'none'
  }
];

export interface RecruiterOpening {
  id: string;
  title: string;
  department: string;
  organization: string;
  location: string;
  ctc: string;
  stream: AcademicStream;
  activeCandidatesCount: number;
  cutoffScore: number;
  hiringManager: string;
  daysActive: number;
  
  // 8-Step Analytics Data
  overview: {
    description: string;
    requirements: string[];
    deliverables: string[];
    budgetHead: string;
  };
  applicantStats: {
    total: number;
    new: number;
    underReview: number;
    shortlisted: number;
    rejected: number;
    selected: number;
  };
  resumeScreening: {
    avgVectorSimilarity: number;
    topMatches: { candidateName: string; similarity: number; keyStrength: string }[];
  };
  pipelineMatrix: {
    stageName: string;
    entered: number;
    passed: number;
    dropoffPercent: string;
  }[];
  assessmentStats: {
    avgScore: number;
    passRate: number;
    p95LatencyMs: number;
    antiCheatViolations: number;
  };
}

export const RECRUITER_OPENINGS: RecruiterOpening[] = [
  {
    id: 'JOB-MSFT-901',
    title: 'GenAI & Applied Research Engineer',
    department: 'Azure AI Systems & Applied Sciences',
    organization: 'Microsoft Research India',
    location: 'Bengaluru / Hybrid',
    ctc: '₹28 - 36 LPA',
    stream: 'tech_ai',
    activeCandidatesCount: 48,
    cutoffScore: 85,
    hiringManager: 'Dr. Satya Ramanathan (Principal Research Director)',
    daysActive: 12,
    overview: {
      description: 'Build custom vLLM paged-attention kernels, Triton execution operators, and multi-node GPU cluster evaluation harnesses.',
      requirements: [
        'C++ 20 / CUDA custom operator development experience',
        'Python 3.12 asynchronous concurrency & distributed training',
        'Demonstrated Judge0 proctored algorithmic benchmarks (O(N) latency bounds)'
      ],
      deliverables: [
        'Optimized KV-cache quantization engine',
        'Sub-15ms p99 token generation latency pipeline'
      ],
      budgetHead: 'FY26-Q3-RESEARCH-INNOVATION-01'
    },
    applicantStats: {
      total: 48,
      new: 14,
      underReview: 18,
      shortlisted: 9,
      rejected: 5,
      selected: 2
    },
    resumeScreening: {
      avgVectorSimilarity: 88.4,
      topMatches: [
        { candidateName: 'Arjun Kawade', similarity: 96.4, keyStrength: 'Triton Kernel Fusion + vLLM Contributor' },
        { candidateName: 'Devansh Gupta', similarity: 89.5, keyStrength: 'Distributed GPU Memory Allocator' },
        { candidateName: 'Sneha Kulkarni', similarity: 85.0, keyStrength: 'Transformer Inference Quantization' }
      ]
    },
    pipelineMatrix: [
      { stageName: 'Applied -> AI Screened', entered: 48, passed: 32, dropoffPercent: '33.3%' },
      { stageName: 'Screened -> Assessment Passed', entered: 32, passed: 18, dropoffPercent: '43.8%' },
      { stageName: 'Assessed -> 40-40-20 Shortlisted', entered: 18, passed: 9, dropoffPercent: '50.0%' },
      { stageName: 'Shortlisted -> Tech Round 1', entered: 9, passed: 6, dropoffPercent: '33.3%' },
      { stageName: 'Tech R1 -> Culture Fit', entered: 6, passed: 3, dropoffPercent: '50.0%' },
      { stageName: 'Culture Fit -> Offer Released', entered: 3, passed: 2, dropoffPercent: '33.3%' },
      { stageName: 'Offer -> Onboarded', entered: 2, passed: 2, dropoffPercent: '0.0%' }
    ],
    assessmentStats: {
      avgScore: 79.4,
      passRate: 68.0,
      p95LatencyMs: 14,
      antiCheatViolations: 0
    }
  },
  {
    id: 'JOB-RZP-402',
    title: 'Quantitative Risk & Treasury Analyst',
    department: 'Treasury, Settlement Risk & Merchant Liquidity',
    organization: 'Razorpay',
    location: 'Bengaluru / In-Office',
    ctc: '₹18 - 24 LPA',
    stream: 'commerce_finance',
    activeCandidatesCount: 34,
    cutoffScore: 82,
    hiringManager: 'Pooja Venkatesh (Head of Capital Markets)',
    daysActive: 8,
    overview: {
      description: 'Design Monte Carlo liquidity simulations, real-time FX hedging algorithms, and 3-statement merchant credit default risk models.',
      requirements: [
        'Deep command of DCF sensitivity grids, WACC, and LBO debt amortization',
        'Python quantitative modeling (NumPy, SciPy, Pandas)',
        'DigiLocker-verified academic degree in Economics, Finance, or Statistics'
      ],
      deliverables: [
        'Instant merchant settlement default probability matrices',
        'Automated liquidity cash-sweep optimization engine'
      ],
      budgetHead: 'CAP-MKT-2026-RZP'
    },
    applicantStats: {
      total: 34,
      new: 9,
      underReview: 12,
      shortlisted: 7,
      rejected: 4,
      selected: 2
    },
    resumeScreening: {
      avgVectorSimilarity: 86.2,
      topMatches: [
        { candidateName: 'Priya Sharma', similarity: 94.8, keyStrength: 'SRCC LBO Model Champion + VaR Simulation' },
        { candidateName: 'Rishabh Mehta', similarity: 88.0, keyStrength: 'Multi-Tranche Debt Waterfall' }
      ]
    },
    pipelineMatrix: [
      { stageName: 'Applied -> AI Screened', entered: 34, passed: 24, dropoffPercent: '29.4%' },
      { stageName: 'Screened -> Assessment Passed', entered: 24, passed: 14, dropoffPercent: '41.7%' },
      { stageName: 'Assessed -> 40-40-20 Shortlisted', entered: 14, passed: 7, dropoffPercent: '50.0%' },
      { stageName: 'Shortlisted -> Tech Round 1', entered: 7, passed: 4, dropoffPercent: '42.8%' },
      { stageName: 'Tech R1 -> Culture Fit', entered: 4, passed: 2, dropoffPercent: '50.0%' },
      { stageName: 'Culture Fit -> Offer Released', entered: 2, passed: 2, dropoffPercent: '0.0%' },
      { stageName: 'Offer -> Onboarded', entered: 2, passed: 1, dropoffPercent: '50.0%' }
    ],
    assessmentStats: {
      avgScore: 82.1,
      passRate: 72.4,
      p95LatencyMs: 18,
      antiCheatViolations: 0
    }
  }
];

export interface CustomAssessmentConfig {
  id: string;
  title: string;
  stream: AcademicStream;
  targetOpeningId: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard' | 'Elite Benchmark';
  runtimeLimitSeconds: number; // e.g. 2.0s
  memoryLimitMb: number; // e.g. 16MB
  proctoring: {
    antiPasteGuard: boolean;
    focusBlurTracker: boolean;
    automatedSessionLock: boolean;
  };
  starterCode: string;
  testCases: {
    input: string;
    expected: string;
    isHidden: boolean;
  }[];
}

export const INITIAL_CUSTOM_ASSESSMENTS: CustomAssessmentConfig[] = [
  {
    id: 'ASSESS-MSFT-AI-01',
    title: 'Distributed KV-Cache Multi-Node Partitioner',
    stream: 'tech_ai',
    targetOpeningId: 'JOB-MSFT-901',
    durationMinutes: 45,
    difficulty: 'Elite Benchmark',
    runtimeLimitSeconds: 2.0,
    memoryLimitMb: 16,
    proctoring: {
      antiPasteGuard: true,
      focusBlurTracker: true,
      automatedSessionLock: true
    },
    starterCode: `# Microsoft Azure AI - Kernel Assessment Sandbox
from typing import List, Dict

def optimize_paged_kv_cache(token_ids: List[int], block_size: int = 16) -> Dict[str, any]:
    """
    Allocate contiguous page tables for fragmented LLM context windows.
    Enforce runtime < 2.0s and memory limit < 16MB.
    """
    pass
`,
    testCases: [
      { input: 'token_ids=[102, 492, 18, 920], block_size=2', expected: '{"allocated_pages": 2, "fragmentation_ratio": 0.0}', isHidden: false },
      { input: 'token_ids=[1..10000], block_size=16', expected: '{"allocated_pages": 625, "throughput_tokens_per_sec": 48200}', isHidden: true }
    ]
  },
  {
    id: 'ASSESS-RZP-FIN-02',
    title: 'Dynamic Liquidity Cash-Sweep Covenant Auditor',
    stream: 'commerce_finance',
    targetOpeningId: 'JOB-RZP-402',
    durationMinutes: 30,
    difficulty: 'Hard',
    runtimeLimitSeconds: 1.5,
    memoryLimitMb: 12,
    proctoring: {
      antiPasteGuard: true,
      focusBlurTracker: true,
      automatedSessionLock: true
    },
    starterCode: `# Razorpay Treasury Engineering - Financial Sandbox
def audit_debt_covenant(ebitda: float, senior_debt: float, cash_flow: float) -> dict:
    """
    Compute voluntary cash sweep under 3.5x maximum leverage covenant.
    """
    pass
`,
    testCases: [
      { input: 'ebitda=120.0, senior_debt=300.0, cash_flow=45.0', expected: '{"covenant_status": "COMPLIANT", "sweep_amount": 22.5}', isHidden: false },
      { input: 'ebitda=80.0, senior_debt=340.0, cash_flow=30.0', expected: '{"covenant_status": "BREACH_WARNING", "sweep_amount": 30.0}', isHidden: true }
    ]
  }
];

export interface RecruiterChatMessage {
  id: string;
  sender: 'recruiter' | 'candidate' | 'tpo';
  senderName: string;
  timestamp: string;
  text: string;
  isEncrypted: boolean;
}

export interface RecruiterChatThread {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientRole: string;
  recipientOrg: string;
  avatar: string;
  unreadCount: number;
  lastMessageTime: string;
  channelType: 'tpo_channel' | 'candidate_channel';
  messages: RecruiterChatMessage[];
}

export const INITIAL_CHAT_THREADS: RecruiterChatThread[] = [
  {
    id: 'THREAD-TPO-IITB',
    recipientId: 'TPO-IITB-01',
    recipientName: 'Prof. K. Ramanathan',
    recipientRole: 'Head of Placements & Industry Relations',
    recipientOrg: 'IIT Bombay',
    avatar: 'IITB',
    unreadCount: 1,
    lastMessageTime: '10:45 AM',
    channelType: 'tpo_channel',
    messages: [
      {
        id: 'M1',
        sender: 'tpo',
        senderName: 'Prof. K. Ramanathan (IIT Bombay TPO)',
        timestamp: '10:30 AM',
        text: 'Greetings from IIT Bombay Placement Cell. We have released the official DigiLocker cryptographically signed marksheet ledger for the 2026 Graduating Cohort.',
        isEncrypted: true
      },
      {
        id: 'M2',
        sender: 'recruiter',
        senderName: 'Corporate Talent Console',
        timestamp: '10:38 AM',
        text: 'Thank you Professor. Candidate Arjun Kawade has cleared our 40-40-20 cutoff with a 93.6 composite score. We have scheduled Technical Round 1 for Friday.',
        isEncrypted: true
      },
      {
        id: 'M3',
        sender: 'tpo',
        senderName: 'Prof. K. Ramanathan (IIT Bombay TPO)',
        timestamp: '10:45 AM',
        text: 'Excellent. This is synchronized in our NAAC / NIRF Category 5 placement ledger. Let us know if you need proctored interview rooms on campus.',
        isEncrypted: true
      }
    ]
  },
  {
    id: 'THREAD-CAND-PRIYA',
    recipientId: 'CAND-742',
    recipientName: 'Priya Sharma',
    recipientRole: 'Quant Finance Applicant',
    recipientOrg: 'SRCC Delhi',
    avatar: 'PS',
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    channelType: 'candidate_channel',
    messages: [
      {
        id: 'M101',
        sender: 'recruiter',
        senderName: 'Corporate Talent Console',
        timestamp: 'Yesterday 3:15 PM',
        text: 'Congratulations Priya! Your DCF & LBO financial sandbox score of 94% placed you in the 98.6 percentile. You have been fast-tracked to Round 1.',
        isEncrypted: true
      },
      {
        id: 'M102',
        sender: 'candidate',
        senderName: 'Priya Sharma',
        timestamp: 'Yesterday 3:25 PM',
        text: 'Thank you! Looking forward to discussing quantitative portfolio risk and automated debt sweeps.',
        isEncrypted: true
      }
    ]
  }
];
