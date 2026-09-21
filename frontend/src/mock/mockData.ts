import { 
  AcademicStream, 
  StreamMetadata, 
  AtsDiagnosticResult, 
  EmergingSkillPrediction, 
  OpportunityListing, 
  DailyQuest, 
  CredentialAudit 
} from '../types';

export interface DisciplineBranch {
  id: string;
  name: string;
  skills: string[];
}

export interface DisciplineConfig {
  id: AcademicStream;
  name: string;
  badge: string;
  institution: string;
  description: string;
  icon: string;
  branches: DisciplineBranch[];
}

export const ALL_DISCIPLINES: DisciplineConfig[] = [
  {
    id: 'tech_ai',
    name: 'Engineering & Technology',
    badge: 'IIT Bombay Benchmark',
    institution: 'IIT Bombay',
    description: 'Software, AI/ML, Cloud Systems, Electronics & Hardware Engineering',
    icon: 'Cpu',
    branches: [
      { id: 'cse', name: 'Computer Science & Engineering (CSE)', skills: ['Data Structures & Algorithms', 'Python', 'C++', 'Java', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'System Design'] },
      { id: 'ai_ds', name: 'Artificial Intelligence & Data Science', skills: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'NLP / Transformers', 'Computer Vision', 'vLLM', 'Pandas / NumPy', 'SQL'] },
      { id: 'ece', name: 'Electronics & Communication (ECE)', skills: ['Embedded C', 'VLSI Design', 'Verilog / VHDL', 'Microcontrollers (ARM/ESP32)', 'Signal Processing', 'PCB Design', 'IoT Protocols'] },
      { id: 'mechanical', name: 'Mechanical Engineering', skills: ['SolidWorks / CAD', 'Finite Element Analysis (FEA)', 'ANSYS', 'Thermodynamics', 'Robotics & Kinematics', 'CNC Machining', 'MATLAB'] },
      { id: 'civil', name: 'Civil Engineering', skills: ['AutoCAD', 'STAAD Pro', 'Structural Analysis', 'Revit / BIM', 'Geotechnical Engineering', 'Project Scheduling', 'GIS Mapping'] },
      { id: 'electrical', name: 'Electrical Engineering', skills: ['Power Systems', 'Control Systems', 'MATLAB / Simulink', 'PLC & SCADA', 'Power Electronics', 'High Voltage Engineering'] }
    ]
  },
  {
    id: 'commerce_finance',
    name: 'Commerce & Finance',
    badge: 'SRCC / NMIMS Benchmark',
    institution: 'SRCC / NMIMS',
    description: 'Financial Modeling, Investment Banking, Accounting & Quantitative Risk',
    icon: 'TrendingUp',
    branches: [
      { id: 'fin_model', name: 'Financial Risk & Quantitative Modeling', skills: ['DCF Modeling', 'Monte Carlo Simulation', 'Financial Risk', 'Python Quantlib', 'VaR Analysis', 'Excel Analytics'] },
      { id: 'inv_bank', name: 'Investment Banking & M&A', skills: ['LBO Waterfall', '3-Statement Modeling', 'CFA Level 1', 'M&A Accretion/Dilution', 'Valuation Multiples'] },
      { id: 'acc_audit', name: 'Accounting, Audit & Taxation', skills: ['Corporate Accounting', 'Statutory Audit', 'GST & Direct Tax', 'IFRS Standards', 'Financial Analysis'] },
      { id: 'fintech', name: 'Fintech & Banking Operations', skills: ['Payment Gateway Rails', 'AML/KYC Compliance', 'Treasury Management', 'API Reconciliation', 'Risk Assessment'] }
    ]
  },
  {
    id: 'ui_ux',
    name: 'UI/UX & Spatial Design',
    badge: 'NID Ahmedabad Benchmark',
    institution: 'NID Ahmedabad',
    description: 'Product Design, Design Systems, Accessibility Audit (WCAG) & Spatial UI',
    icon: 'Palette',
    branches: [
      { id: 'product_design', name: 'Product & Visual Interface Design', skills: ['Figma Tokens', 'Design Systems', 'Micro-Interactions', 'Prototyping', 'User Flows', 'Tailwind CSS'] },
      { id: 'ux_research', name: 'UX Research & Usability Engineering', skills: ['WCAG 2.2 AAA Audit', 'Usability Testing', 'Information Architecture', 'User Journey Mapping', 'A/B Testing'] },
      { id: 'spatial_ui', name: 'Spatial UI & Multimodal Interfaces', skills: ['Spatial Design (AR/VR)', 'Voice UI', 'Gesture Controls', 'Figma Variables', 'Accessibility (ARIA)'] }
    ]
  },
  {
    id: 'law_governance',
    name: 'Law, Governance & Tech Policy',
    badge: 'NLSIU Bangalore Benchmark',
    institution: 'NLSIU Bangalore',
    description: 'Digital Data Protection (DPDP), Corporate Law, Tech Patents & Policy',
    icon: 'Scale',
    branches: [
      { id: 'dpdp_policy', name: 'Technology Policy & Data Protection (DPDP)', skills: ['DPDP Act 2023', 'Consent Manager Flow', 'GDPR Section 8', 'Statutory Audit', 'Tech IP'] },
      { id: 'corp_law', name: 'Corporate Law & M&A Governance', skills: ['NDA Contract Parsing', 'Statutory Compliance', 'Due Diligence', 'Cross-Border Transfer', 'Legal Drafting'] },
      { id: 'ip_patent', name: 'Intellectual Property & Tech Patent Law', skills: ['Patent Drafting', 'Copyright & Tech IP', 'Trademark Prosecution', 'Licensing Agreements'] }
    ]
  },
  {
    id: 'healthcare_bio',
    name: 'Healthcare, Bio-Tech & Ayush',
    badge: 'AIIMS New Delhi Benchmark',
    institution: 'AIIMS New Delhi',
    description: 'Genomics, Computational Biology, Clinical Biostatistics & Ayush Research',
    icon: 'Activity',
    branches: [
      { id: 'bioinfo', name: 'Computational Biology & Genomics', skills: ['Single-Cell RNA-seq', 'Scanpy / Seurat', 'Bio-Statistics', 'Python BioPy', 'UMAP Analysis'] },
      { id: 'clin_biostat', name: 'Clinical Biostatistics & Trial Data', skills: ['Kaplan-Meier Survival', 'CDSCO Regulations', 'GCP Compliance', 'NAMASTE Ontology', 'Clinical Data Analysis'] },
      { id: 'ayush_res', name: 'Ayush & Traditional Medicine Research', skills: ['WHO ICD-11 TM2', 'Ayurveda Pharmaco-Vigilance', 'Phytochemistry Analysis', 'Clinical Documentation'] }
    ]
  }
];

export const ACADEMIC_STREAMS: StreamMetadata[] = [
  {
    id: 'tech_ai',
    name: 'Engineering & Technology',
    badge: 'IIT Bombay Benchmark',
    institution: 'IIT Bombay',
    sandboxTitle: 'Monaco Code Sandbox (Judge0 Isolated Container)',
    targetRoles: ['AI Research Intern', 'GenAI / ML Engineer', 'Full-Stack Developer'],
    icon: 'cpu'
  },
  {
    id: 'commerce_finance',
    name: 'Commerce & Finance',
    badge: 'SRCC / NMIMS Benchmark',
    institution: 'SRCC / NMIMS',
    sandboxTitle: 'Dynamic 3-Statement & DCF Financial Modeling Simulator',
    targetRoles: ['Quant Analyst', 'Investment Banking Analyst', 'Equity Research'],
    icon: 'trending-up'
  },
  {
    id: 'ui_ux',
    name: 'UI/UX Design',
    badge: 'NID Ahmedabad Benchmark',
    institution: 'NID Ahmedabad',
    sandboxTitle: 'Live WCAG 2.2 AA Accessibility & Spatial Layout Audit',
    targetRoles: ['Product Designer', 'Design Systems Architect', 'UX Researcher'],
    icon: 'palette'
  },
  {
    id: 'law_governance',
    name: 'Law & Governance',
    badge: 'NLSIU Bangalore Benchmark',
    institution: 'NLSIU Bangalore',
    sandboxTitle: 'Statutory NDA & Contract Clause Risk Parser',
    targetRoles: ['Technology Associate', 'Corporate Legal Counsel', 'Compliance Officer'],
    icon: 'scale'
  },
  {
    id: 'healthcare_bio',
    name: 'Healthcare & Bio',
    badge: 'AIIMS New Delhi Benchmark',
    institution: 'AIIMS New Delhi',
    sandboxTitle: 'Single-cell RNA-seq Workflow Validator',
    targetRoles: ['Clinical Bio-Statistician', 'Bioinformatician', 'Genomic Data Analyst'],
    icon: 'activity'
  }
];

export const INITIAL_ATS_RESULT: AtsDiagnosticResult = {
  overallScore: 84,
  quantifiedMetricsScore: 88,
  keywordDensityScore: 79,
  formattingParsabilityScore: 92,
  strengths: [
    'Strong quantified impact statements (e.g., "Reduced latency by 42% through Redis vector caching")',
    'Clean single-column ATS parsable semantic structure without non-standard glyphs',
    'Direct mapping to high-velocity keywords: PyTorch, vLLM, Distributed Training, Triton'
  ],
  weaknesses: [
    'Missing formal compliance coverage for Indian DPDP Act 2023 or GDPR data governance in previous systems',
    'Low keyword saturation for automated CI/CD container security (Trivy, Cosign, eBPF)',
    'Executive summary lacks explicit specialization statement for target roles'
  ],
  actionableSuggestions: [
    'Insert 2 quantified lines demonstrating API latency budgets or token throughput metrics in GenAI projects',
    'Add verified Sovereign Credentials badge and DigiLocker verifiable hash for instant recruiter trust',
    'Align terminology with target Job ID (e.g. replace "fast API" with "FastAPI asynchronous endpoints")'
  ]
};

export const EMERGING_SKILLS_PREDICTIONS: EmergingSkillPrediction[] = [
  {
    skill: 'vLLM / Triton Inference Optimization',
    growthRate: '+340%',
    trend: 'exploding',
    category: 'High-Velocity Emerging',
    impactScore: 98,
    description: 'Kernel fusion, tensor parallel serving, and custom paged-attention decoding pipelines.'
  },
  {
    skill: 'DPDP Act 2023 & Sovereign Data Compliance',
    growthRate: '+310%',
    trend: 'exploding',
    category: 'High-Velocity Emerging',
    impactScore: 95,
    description: 'Statutory consent architectures, fiduciary data tokenization, and audit trails.'
  },
  {
    skill: 'Single-Cell RNA-seq & Multi-Omics Pipeline Dev',
    growthRate: '+265%',
    trend: 'exploding',
    category: 'High-Velocity Emerging',
    impactScore: 92,
    description: 'Seurat/Scanpy workflow containerization for precision computational biology.'
  },
  {
    skill: 'Boilerplate Non-AI CRUD Web Development',
    growthRate: '-45%',
    trend: 'declining',
    category: 'Commoditizing Skill',
    impactScore: 28,
    description: 'Manual scaffolding of standard database endpoints rapidly automated by AI code generation.'
  },
  {
    skill: 'Manual Financial Ledgers & Static Excel Prep',
    growthRate: '-70%',
    trend: 'declining',
    category: 'Commoditizing Skill',
    impactScore: 14,
    description: 'Replaced by programmatic financial modeling, Python Quantlib, and real-time APIs.'
  }
];

export const MOCK_OPPORTUNITIES: OpportunityListing[] = [
  // 1. Tech & AI
  {
    id: 'JOB-MSFT-901',
    title: 'GenAI & Applied Research Engineer',
    organization: 'Microsoft Research',
    orgLogo: 'MS',
    type: 'job',
    location: 'Bengaluru / Hybrid',
    stipendOrSalary: '₹28 - 36 LPA',
    stream: 'tech_ai',
    tags: ['PyTorch', 'vLLM', 'Distributed Systems', 'CUDA'],
    cutoffScore: 85,
    deadline: 'In 6 days',
    description: 'Design and deploy scalable inference architectures for large generative models with optimized latency budgets.',
    responsibilities: [
      'Implement custom kernel optimizations using Triton/CUDA',
      'Benchmark multi-node model execution across high-throughput clusters',
      'Coordinate with the Azure AI infrastructure security team'
    ],
    interviewTips: [
      'Expect 1 live Monaco coding challenge on distributed cache partitioning',
      'Be prepared to explain PagedAttention memory fragmentation mitigation',
      'Highlight any verified open-source benchmarks on HuggingFace or GitHub'
    ]
  },
  {
    id: 'INT-MSFT-101',
    title: 'AI Platform Systems Intern',
    organization: 'Microsoft',
    orgLogo: 'MS',
    type: 'internship',
    location: 'Hyderabad / In-office',
    stipendOrSalary: '₹1,25,000 / month',
    stream: 'tech_ai',
    tags: ['Python', 'Docker', 'Judge0', 'APIs'],
    cutoffScore: 78,
    deadline: 'In 3 days',
    description: 'Work with the developer developer platform team building next-generation evaluation harnesses and automated sandboxes.',
    responsibilities: [
      'Construct automated unit evaluation pipelines',
      'Monitor container telemetry and latency telemetry'
    ],
    interviewTips: [
      'Focus on algorithmic complexity and asynchronous Python concurrency'
    ]
  },

  // 2. Commerce & Finance
  {
    id: 'JOB-RZP-402',
    title: 'Quantitative Risk & Treasury Analyst',
    organization: 'Razorpay',
    orgLogo: 'RZ',
    type: 'job',
    location: 'Bengaluru / In-office',
    stipendOrSalary: '₹18 - 24 LPA',
    stream: 'commerce_finance',
    tags: ['DCF Modeling', 'Monte Carlo', 'Financial Risk', 'Python'],
    cutoffScore: 80,
    deadline: 'In 9 days',
    description: 'Execute high-frequency reconciliation, liquidity risk assessments, and dynamic discounted cash flow simulations.',
    responsibilities: [
      'Build 3-statement forecast models across multi-currency merchant settlements',
      'Model VaR (Value at Risk) scenarios for instant payment rail disruptions'
    ],
    interviewTips: [
      'Review Working Capital cycle calculations and WACC sensitivity grids'
    ]
  },
  {
    id: 'INT-GS-201',
    title: 'Investment Banking & LBO Valuation Intern',
    organization: 'Goldman Sachs',
    orgLogo: 'GS',
    type: 'internship',
    location: 'Mumbai / In-office',
    stipendOrSalary: '₹1,10,000 / month',
    stream: 'commerce_finance',
    tags: ['LBO Waterfall', '3-Statement Modeling', 'CFA Level 1', 'M&A'],
    cutoffScore: 84,
    deadline: 'In 5 days',
    description: 'Structure leveraged buyout models, debt amortization schedules, and accretion/dilution analysis for institutional transactions.',
    responsibilities: [
      'Construct dynamic DCF models and sensitivity matrices',
      'Audit balance sheet circularities in private equity transaction models'
    ],
    interviewTips: [
      'Master Enterprise Value to Equity Value bridge adjustments'
    ]
  },

  // 3. Healthcare & Bio
  {
    id: 'JOB-NIA-401',
    title: 'Clinical Biostatistician & Ayush Research Officer',
    organization: 'National Institute of Ayurveda',
    orgLogo: 'NIA',
    type: 'job',
    location: 'Jaipur / On-site',
    stipendOrSalary: '₹15 - 20 LPA',
    stream: 'healthcare_bio',
    tags: ['NAMASTE Ontology', 'Kaplan-Meier', 'GCP', 'Biostatistics'],
    cutoffScore: 82,
    deadline: 'In 11 days',
    description: 'Lead clinical research biostatistics translating standardized NAMASTE terminology into WHO ICD-11 Traditional Medicine datasets.',
    responsibilities: [
      'Model longitudinal patient survival curves and treatment hazard ratios',
      'Validate multi-centric observational clinical trial data under CDSCO rules'
    ],
    interviewTips: [
      'Review WHO ICD-11 Chapter 2 TM2 classification guidelines'
    ]
  },
  {
    id: 'INT-AIIMS-302',
    title: 'Computational Oncology Single-Cell Fellow',
    organization: 'AIIMS New Delhi Genomics Lab',
    orgLogo: 'AI',
    type: 'internship',
    location: 'New Delhi / In-person',
    stipendOrSalary: '₹60,000 / month',
    stream: 'healthcare_bio',
    tags: ['RNA-seq', 'Scanpy', 'Bio-Statistics', 'Python'],
    cutoffScore: 80,
    deadline: 'In 5 days',
    description: 'Analyze single-cell RNA-sequencing data from clinical immunotherapy trials using automated quality-control pipelines.',
    responsibilities: [
      'Filter low-quality droplets and normalize mitochondrial gene readouts',
      'Perform UMAP cluster projection and differential gene expression analysis'
    ]
  },

  // 4. Law & Governance
  {
    id: 'JOB-NLSIU-501',
    title: 'Digital Tech Policy & Statutory Compliance Associate',
    organization: 'Trilegal & TechLaw Partners',
    orgLogo: 'TL',
    type: 'job',
    location: 'New Delhi / Hybrid',
    stipendOrSalary: '₹16 - 22 LPA',
    stream: 'law_governance',
    tags: ['DPDP Act 2023', 'NDA Analysis', 'Statutory Audit', 'Tech IP'],
    cutoffScore: 82,
    deadline: 'In 12 days',
    description: 'Analyze enterprise vendor agreements and SaaS DPAs against India DPDP Act 2023 statutory fiduciary responsibilities.',
    responsibilities: [
      'Audit cross-border data transfer clauses and breach reporting provisions',
      'Parse vendor non-disclosure contracts for non-standard indemnity triggers'
    ]
  },
  {
    id: 'INT-CAM-102',
    title: 'Corporate Privacy & DPDP Conformance Legal Intern',
    organization: 'Cyril Amarchand Mangaldas',
    orgLogo: 'CAM',
    type: 'internship',
    location: 'Bengaluru / Hybrid',
    stipendOrSalary: '₹55,000 / month',
    stream: 'law_governance',
    tags: ['DPDP Section 8', 'Consent Manager', 'GDPR', 'Tech Policy'],
    cutoffScore: 80,
    deadline: 'In 7 days',
    description: 'Draft statutory notice disclosures, consent manager agreements, and cross-border data protection impact assessments.',
    responsibilities: [
      'Review enterprise agreements for statutory penalty liabilities under Section 33',
      'Draft standardized terms for Data Fiduciary and Data Processor engagements'
    ]
  },

  // 5. UI/UX Design
  {
    id: 'JOB-FLPK-202',
    title: 'Principal Product Designer (Spatial & Multimodal UI)',
    organization: 'Flipkart UX Labs',
    orgLogo: 'FK',
    type: 'job',
    location: 'Bengaluru / Hybrid',
    stipendOrSalary: '₹24 - 32 LPA',
    stream: 'ui_ux',
    tags: ['WCAG 2.2 AAA', 'Spatial UI', 'Figma Tokens', 'Micro-Interactions'],
    cutoffScore: 86,
    deadline: 'In 8 days',
    description: 'Architect tokenized design systems and accessible user interfaces for next-generation mobile and spatial e-commerce.',
    responsibilities: [
      'Enforce automated color contrast and keyboard navigation audits across 40+ web components',
      'Deliver fluid gesture and voice micro-interactions for Bharat vernacular users'
    ]
  },
  {
    id: 'INT-ADBE-101',
    title: 'Design Systems & Accessibility Engineering Intern',
    organization: 'Adobe Design Lab',
    orgLogo: 'AD',
    type: 'internship',
    location: 'Noida / In-office',
    stipendOrSalary: '₹90,000 / month',
    stream: 'ui_ux',
    tags: ['Design Systems', 'WCAG AAA', 'Tailwind', 'Figma'],
    cutoffScore: 82,
    deadline: 'In 4 days',
    description: 'Work with the design foundation team implementing cross-platform tokens, dark/light ambient adaptations, and ARIA attributes.',
    responsibilities: [
      'Benchmark UI components against WCAG 2.2 AAA guidelines',
      'Maintain synchronized Figma variables and Tailwind CSS token themes'
    ]
  },
  {
    id: 'GIG-DES-104',
    title: 'Design System Accessibility (WCAG 2.2 AA) Audit',
    organization: 'GovTech Innovations',
    orgLogo: 'GT',
    type: 'gig',
    location: 'Remote',
    stipendOrSalary: '₹45,000 / project',
    budget: '₹45,000',
    duration: '2 Weeks',
    stream: 'ui_ux',
    tags: ['WCAG 2.2', 'Figma Tokens', 'ARIA', 'Design Systems'],
    cutoffScore: 75,
    deadline: 'Rolling',
    description: 'Conduct a systematic screen-reader, contrast ratio, and spatial layout audit across 24 citizen services portals.',
    responsibilities: [
      'Audit color contrast ratios against AAA/AA standards',
      'Deliver Figma component token adjustments and keyboard navigation maps'
    ]
  }
];

export const MOCK_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'q1',
    title: 'Complete 1 Proctored Domain Sandbox Challenge',
    xp: 150,
    progress: 1,
    total: 1,
    completed: true,
    rewardBadge: 'Verified Code Pioneer'
  },
  {
    id: 'q2',
    title: 'Run AI Skill Gap Diff on Target Role JOB-MSFT-901',
    xp: 100,
    progress: 1,
    total: 1,
    completed: true,
    rewardBadge: 'Gap Explorer'
  },
  {
    id: 'q3',
    title: 'Verify 1 Credential through Tier 2 OpenCV ELA',
    xp: 200,
    progress: 0,
    total: 1,
    completed: false,
    rewardBadge: 'Tamper-Proof Scholar'
  }
];

export const MOCK_CREDENTIAL_AUDIT: CredentialAudit = {
  tier1_xmpTimestamp: {
    verified: true,
    timestamp: '2026-08-14T09:42:15Z',
    engine: 'pyHanko PKI Validator',
    certAuthority: 'National Informatics Centre (NIC) Sub-CA',
    status: 'AUTHENTIC'
  },
  tier2_opencvELA: {
    verified: true,
    errorLevelScore: 1.84, // Pristine!
    alteredPixelsDetected: 0,
    engine: 'OpenCV Error Level Analysis (ELA)',
    status: 'PRISTINE_ORIGINAL'
  },
  tier3_sovereignPKI: {
    verified: true,
    digiLockerId: 'DL-IN-2026-992140-BTech',
    ledgerHash: '0x7e8f99a3c2009bf6d321550a18e244b7918ca12189ff4c40de83b9b4783ac872',
    status: 'VERIFIED_SOVEREIGN'
  }
};
