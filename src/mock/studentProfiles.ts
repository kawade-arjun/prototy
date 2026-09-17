import { AcademicStream, StudentProfile } from '../types';

export const STUDENT_PROFILES: Record<AcademicStream, StudentProfile> = {
  tech_ai: {
    id: 'STU-TECH-001',
    streamId: 'tech_ai',
    streamName: 'Tech & AI',
    name: 'Arjun Kawade',
    avatarInitials: 'AK',
    degree: 'B.Tech in Computer Science & Engineering (AI & Distributed Systems)',
    institution: 'IIT Bombay (Tier 1 AICTE Center of Excellence)',
    benchmarkBadge: 'IIT Bombay Benchmark • AICTE Gold Tier',
    digiLockerId: 'DL-IN-2026-992140-BTech',
    compositeScore: 92,
    evaluationsRatio: '14 / 16 Tests Cleared (88%)',
    streakDays: 8,
    atsScore: 94,
    nationalPercentile: '99.2th',
    summary: 'Distributed systems and GenAI engineer specializing in low-latency LLM serving, CUDA Triton kernels, and high-throughput vector architectures.',
    verifiedSkills: [
      'Distributed Systems',
      'PyTorch & Triton',
      'Rust & Low-Latency C++',
      'Kubernetes & Docker',
      'pgvector & HNSW Indexes',
      'vLLM PagedAttention'
    ],
    missingSkills: [
      'Formal Statutory Auditing under India DPDP Act 2023',
      'Multi-region Kafka Disaster Recovery'
    ],
    targetRoles: [
      'Distributed Systems Engineer',
      'GenAI Infrastructure Engineer',
      'AI Research Intern'
    ],
    atsBreakdown: {
      overallScore: 94,
      quantifiedMetricsScore: 96,
      keywordDensityScore: 94,
      formattingParsabilityScore: 96,
      strengths: [
        'Strong quantified latency metrics: "Reduced inference latency by 41% using vLLM PagedAttention and Triton kernels"',
        'Pristine Judge0 verification: Top 0.8% memory-bounded C++20 distributed cache execution',
        'Zero code plagiarism: SHA-256 commit tree verified against 1.2M national repositories'
      ],
      weaknesses: [
        'Lacks explicit enterprise governance disclosures under India DPDP Act 2023',
        'Missing multi-tenant cost-per-token economics breakdown in systems documentation'
      ],
      actionableSuggestions: [
        'Add a benchmark metric comparing throughput at concurrency levels of 1,000+ requests/sec',
        'Complete the DPDP Act 2023 Statutory Clause test in the Sandbox to earn a Dual-Governance Badge'
      ]
    },
    livingResumeRankings: [
      { domain: 'AI & Machine Learning', percentile: '99.2nd', badge: 'Top 0.8%', icon: '🧠', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' },
      { domain: 'Data Structures & Algorithms', percentile: '98.7th', badge: 'Top 1.3%', icon: '⚡', color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
      { domain: 'System Design & Scalability', percentile: '97.4th', badge: 'Top 2.6%', icon: '📐', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
      { domain: 'Code Uniqueness & Veracity', percentile: '99.8th', badge: 'Top 0.2%', icon: '🛡️', color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30' }
    ]
  },

  commerce_finance: {
    id: 'STU-FIN-002',
    streamId: 'commerce_finance',
    streamName: 'Commerce & Finance',
    name: 'Priya Venkatesh',
    avatarInitials: 'PV',
    degree: 'B.Com (Hons) & Quantitative Financial Engineering',
    institution: 'Shri Ram College of Commerce (SRCC Delhi)',
    benchmarkBadge: 'SRCC / NMIMS Benchmark • CFA Institute Prep Tier 1',
    digiLockerId: 'DL-IN-2026-881204-SRCC',
    compositeScore: 89,
    evaluationsRatio: '12 / 14 Tests Cleared (86%)',
    streakDays: 11,
    atsScore: 91,
    nationalPercentile: '98.6th',
    summary: 'Quantitative finance and valuation modeler skilled in dynamic 3-statement modeling, LBO debt schedules, Basel III capital risk, and Python econometric analysis.',
    verifiedSkills: [
      'Dynamic 3-Statement Modeling',
      'DCF & LBO Debt Waterfalls',
      'Bloomberg Terminal & CapIQ',
      'Python Pandas & Statsmodels',
      'Basel III Capital Adequacy',
      'Equity Valuation Multiples'
    ],
    missingSkills: [
      'Monte Carlo Stochastic Volatility (Heston Model)',
      'Credit Default Swap Pricing Models'
    ],
    targetRoles: [
      'Quantitative Analyst',
      'Investment Banking Analyst',
      'Private Equity Associate'
    ],
    atsBreakdown: {
      overallScore: 91,
      quantifiedMetricsScore: 94,
      keywordDensityScore: 89,
      formattingParsabilityScore: 93,
      strengths: [
        'Pristine financial waterfall modeling: Audited 10-year LBO model cleared circular interest calculations without errors',
        'Quantified portfolio impact: "Constructed multi-factor risk arbitrage strategy yielding 1.84 Sharpe ratio on NSE 500"',
        'Verified CFA Institute Ethics & Quantitative Methods coursework linked to DigiLocker'
      ],
      weaknesses: [
        'Missing stress-testing tables for severe macroeconomic rate-hike shocks (> 150 bps RBI repo hike)',
        'Lacks automated XBRL financial statement ingestion scripts'
      ],
      actionableSuggestions: [
        'Include a sensitivity tornado chart measuring impact of WACC and terminal growth variance',
        'Complete the quantitative macro liquidity quest in Sandbox Tab 2'
      ]
    },
    livingResumeRankings: [
      { domain: 'Financial Valuation & DCF', percentile: '98.6th', badge: 'Top 1.4%', icon: '📈', color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30' },
      { domain: 'Quantitative Econometrics', percentile: '97.2nd', badge: 'Top 2.8%', icon: '📊', color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
      { domain: 'Corporate Finance & M&A', percentile: '96.5th', badge: 'Top 3.5%', icon: '💼', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
      { domain: 'Audited Model Integrity', percentile: '99.5th', badge: 'Top 0.5%', icon: '🛡️', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' }
    ]
  },

  healthcare_bio: {
    id: 'STU-BIO-003',
    streamId: 'healthcare_bio',
    streamName: 'Healthcare & Bio-Sciences',
    name: 'Dr. Rohan Vaidya',
    avatarInitials: 'RV',
    degree: 'BAMS Integrative Medicine & Clinical Biostatistics',
    institution: 'National Institute of Ayurveda (NIA Jaipur / AIIMS Synergy)',
    benchmarkBadge: 'Ministry of Ayush Benchmark • SIH PS 26044 National Rank #1',
    digiLockerId: 'DL-IN-2026-773419-AYUSH',
    compositeScore: 91,
    evaluationsRatio: '15 / 16 Tests Cleared (94%)',
    streakDays: 14,
    atsScore: 93,
    nationalPercentile: '99.4th',
    summary: 'Ayurvedic physician and biomedical data scientist specializing in NAMASTE-to-ICD-11 dual ontology mapping, clinical phytopharmacology, and Kaplan-Meier survival curves.',
    verifiedSkills: [
      'NAMASTE Morbidity Ontology',
      'WHO ICD-11 Module 2 (TM2)',
      'Kaplan-Meier Survival Analysis',
      'Clinical Phytopharmacology',
      'Good Clinical Practice (GCP)',
      'Bioinformatics (R & Bioconductor)'
    ],
    missingSkills: [
      'Single-Cell RNA-Seq Spatial Transcriptomics (Seurat/Scanpy)',
      'High-Throughput LC-MS Metabolomics'
    ],
    targetRoles: [
      'Clinical Bio-Statistician',
      'Ayush Medical Informatics Officer',
      'Phytomedicine Research Scientist'
    ],
    atsBreakdown: {
      overallScore: 93,
      quantifiedMetricsScore: 92,
      keywordDensityScore: 96,
      formattingParsabilityScore: 94,
      strengths: [
        'National Hackathon Winner (SIH PS 26044): Built bidirectional ontology crosswalk between NAMASTE and ICD-11',
        'Empirical biostatistics: Validated clinical trial survival model clearing log-rank test (p < 0.001)',
        'DigiLocker verified CCIM registration and Ayush practitioner credentials'
      ],
      weaknesses: [
        'Sample size in observational herbal clinical registry is under 1,500 longitudinal patient records',
        'Lacks FHIR-HL7 interoperability adapter for modern hospital electronic medical records'
      ],
      actionableSuggestions: [
        'Map 50 additional rare botanical formulations to the WHO Traditional Medicine Chapter 2',
        'Publish an open-source reproducibility script for survival rate modeling'
      ]
    },
    livingResumeRankings: [
      { domain: 'Biomedical Informatics', percentile: '99.4th', badge: 'Top 0.6%', icon: '🧬', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
      { domain: 'Ontology Mapping (ICD-11)', percentile: '99.9th', badge: 'Top 0.1%', icon: '🌐', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' },
      { domain: 'Clinical Biostatistics', percentile: '97.8th', badge: 'Top 2.2%', icon: '📊', color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
      { domain: 'Phytopharmacology & GCP', percentile: '98.5th', badge: 'Top 1.5%', icon: '🌿', color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30' }
    ]
  },

  law_governance: {
    id: 'STU-LAW-004',
    streamId: 'law_governance',
    streamName: 'Law & Governance',
    name: 'Ananya Deshmukh',
    avatarInitials: 'AD',
    degree: 'B.A. LL.B (Hons) Corporate Law & Technology Policy',
    institution: 'National Law School of India University (NLSIU Bengaluru)',
    benchmarkBadge: 'NLSIU Bangalore Benchmark • Bar Council of India Fellow',
    digiLockerId: 'DL-IN-2026-664812-NLSIU',
    compositeScore: 90,
    evaluationsRatio: '13 / 15 Tests Cleared (87%)',
    streakDays: 9,
    atsScore: 92,
    nationalPercentile: '98.9th',
    summary: 'Corporate technology counsel and privacy specialist focused on Digital Personal Data Protection (DPDP) Act 2023 compliance, cross-border data transfer agreements, and AI governance.',
    verifiedSkills: [
      'India DPDP Act 2023 Auditing',
      'Cross-Border Data Transfer Contracts',
      'Technology & SaaS Licensing',
      'EU AI Act & GDPR Conformance',
      'M&A Tech Due Diligence',
      'Statutory Notice Drafting'
    ],
    missingSkills: [
      'Algorithmic Antitrust Forensics (CCI Framework)',
      'Smart Contract Financial Solvency Auditing'
    ],
    targetRoles: [
      'Technology Legal Associate',
      'Corporate Privacy & Compliance Officer',
      'Data Protection Officer (DPO)'
    ],
    atsBreakdown: {
      overallScore: 92,
      quantifiedMetricsScore: 89,
      keywordDensityScore: 97,
      formattingParsabilityScore: 95,
      strengths: [
        'Authored statutory DPDP compliance framework: 100% clause mapping for Data Fiduciary obligations (§8)',
        'Moot court champion: 1st Place at NLSIU National Technology Law Moot on Generative AI Copyright & Liability',
        'Pre-vetted Bar Council student fellowship credentials validated via DigiLocker PKI'
      ],
      weaknesses: [
        'Lacks quantifiable financial liability matrices under Section 33 statutory penalties',
        'Limited direct exposure to patent litigation claims for neuromorphic semiconductors'
      ],
      actionableSuggestions: [
        'Draft an end-to-end Consent Manager agreement compliant with MeitY notified guidelines',
        'Complete the automated NDA risk parsing quest in Sandbox Tab 2'
      ]
    },
    livingResumeRankings: [
      { domain: 'Data Protection (DPDP 2023)', percentile: '98.9th', badge: 'Top 1.1%', icon: '⚖️', color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30' },
      { domain: 'Tech Contracts & Licensing', percentile: '98.1st', badge: 'Top 1.9%', icon: '📜', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' },
      { domain: 'Statutory Risk Analysis', percentile: '97.5th', badge: 'Top 2.5%', icon: '🛡️', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' },
      { domain: 'M&A Due Diligence', percentile: '96.8th', badge: 'Top 3.2%', icon: '💼', color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' }
    ]
  },

  ui_ux: {
    id: 'STU-DES-005',
    streamId: 'ui_ux',
    streamName: 'UI/UX & Spatial HCI',
    name: 'Kabir Mehta',
    avatarInitials: 'KM',
    degree: 'B.Des in Human-Computer Interaction & Product Design',
    institution: 'National Institute of Design (NID Ahmedabad)',
    benchmarkBadge: 'NID Ahmedabad Benchmark • World Design Organization Scholar',
    digiLockerId: 'DL-IN-2026-551930-NID',
    compositeScore: 93,
    evaluationsRatio: '15 / 16 Tests Cleared (94%)',
    streakDays: 16,
    atsScore: 95,
    nationalPercentile: '99.3th',
    summary: 'Design systems architect and spatial computing specialist dedicated to WCAG 2.2 AAA accessibility, tokenized design systems, and inclusive multimodal ergonomics.',
    verifiedSkills: [
      'WCAG 2.2 AAA Accessibility Auditing',
      'Design Token Systems (Tailwind/Figma)',
      'Spatial UI & VisionOS Prototyping',
      'Micro-Interactions & Motion Design',
      'Quantitative Usability Testing',
      'Ergonomic Component Architecture'
    ],
    missingSkills: [
      'Three.js Custom GLSL Shader Development',
      'Quantitative Eye-Tracking Heatmap Analytics'
    ],
    targetRoles: [
      'Principal Product Designer',
      'Design Systems Architect',
      'Spatial UX Lead'
    ],
    atsBreakdown: {
      overallScore: 95,
      quantifiedMetricsScore: 93,
      keywordDensityScore: 95,
      formattingParsabilityScore: 98,
      strengths: [
        'Perfect accessibility score: 100% Lighthouse & axe-core pass on multi-theme token system',
        'Spatial interface award: Designed visionOS clinical dashboard clearing 7:1 contrast under variable lighting',
        'Certified W3C Accessibility Specialist badge stamped via DigiLocker'
      ],
      weaknesses: [
        'Lacks B2B SaaS conversion-rate optimization (CRO) cohort data in public portfolio',
        'Needs documented CI/CD automated visual regression testing pipeline'
      ],
      actionableSuggestions: [
        'Publish an interactive storybook showcase demonstrating keyboard navigation focus rings',
        'Complete the WCAG AAA Sandbox challenge in Tab 2 to refresh benchmark score'
      ]
    },
    livingResumeRankings: [
      { domain: 'Accessibility & WCAG 2.2', percentile: '99.3rd', badge: 'Top 0.7%', icon: '🎨', color: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-500/30' },
      { domain: 'Design Systems Architecture', percentile: '98.8th', badge: 'Top 1.2%', icon: '✨', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30' },
      { domain: 'Spatial & Multimodal UI', percentile: '98.2nd', badge: 'Top 1.8%', icon: '🕶️', color: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
      { domain: 'Interaction & Micro-Motion', percentile: '97.9th', badge: 'Top 2.1%', icon: '⚡', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30' }
    ]
  }
};

export const ALL_STUDENT_PROFILES = Object.values(STUDENT_PROFILES);
export const DEFAULT_STUDENT = STUDENT_PROFILES.tech_ai;
