export interface StateTelemetry {
  stateCode: string;
  stateName: string;
  institutionCount: number;
  verifiedScholarsCount: number;
  majorHub: string;
  identifiedDeficit: string;
  deficitSeverity: 'Critical Deficit' | 'Moderate Deficit' | 'Demand Met';
  supplyIndex: number; // 0-100
  demandIndex: number; // 0-100
  gapPercent: number; // negative is deficit
  recommendedGrant: string;
  topDeficitSkills: string[];
}

export const STATE_TELEMETRY_DATA: StateTelemetry[] = [
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    institutionCount: 82,
    verifiedScholarsCount: 8420,
    majorHub: 'Mumbai / Pune / Nashik',
    identifiedDeficit: 'ASU Formulation Chemists & Phytochemical Analysts',
    deficitSeverity: 'Critical Deficit',
    supplyIndex: 58,
    demandIndex: 94,
    gapPercent: -36,
    recommendedGrant: '₹14.5 Cr Sovereign Lab Grant',
    topDeficitSkills: ['HPLC Standardization', 'Ayurvedic Pharmacopoeia Specs', 'Extract Quality Assurance']
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
    institutionCount: 58,
    verifiedScholarsCount: 6200,
    majorHub: 'Bengaluru / Mysuru / Hubballi',
    identifiedDeficit: 'Pharmacovigilance Analysts & Clinical Trial Biostatisticians',
    deficitSeverity: 'Critical Deficit',
    supplyIndex: 42,
    demandIndex: 96,
    gapPercent: -54,
    recommendedGrant: '₹18.0 Cr Clinical Data Lab Grant',
    topDeficitSkills: ['ADR Reporting (WHO-UMC Vigiflow)', 'Kaplan-Meier Survival Analysis', 'ICD-11 Dual Coding']
  },
  {
    stateCode: 'KL',
    stateName: 'Kerala',
    institutionCount: 64,
    verifiedScholarsCount: 7150,
    majorHub: 'Kottakkal / Thiruvananthapuram / Kochi',
    identifiedDeficit: 'Clinical Research Associates (Demand Balanced)',
    deficitSeverity: 'Demand Met',
    supplyIndex: 88,
    demandIndex: 84,
    gapPercent: +4,
    recommendedGrant: '₹6.0 Cr Global Export Centre Grant',
    topDeficitSkills: ['Panchakarma Clinical Trial Protocols', 'NAMASTE Diagnostic Ontologies']
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    institutionCount: 74,
    verifiedScholarsCount: 5900,
    majorHub: 'Varanasi / Lucknow / Noida',
    identifiedDeficit: 'Quality Control Lab Technicians & Heavy Metal Auditors',
    deficitSeverity: 'Moderate Deficit',
    supplyIndex: 64,
    demandIndex: 86,
    gapPercent: -22,
    recommendedGrant: '₹11.2 Cr Testing Infrastructure Grant',
    topDeficitSkills: ['AAS/ICP-MS Heavy Metal Testing', 'Aflatoxin Residue Testing', 'GMP Plant Auditing']
  },
  {
    stateCode: 'DL',
    stateName: 'Delhi-NCR',
    institutionCount: 42,
    verifiedScholarsCount: 5100,
    majorHub: 'New Delhi / Gurugram',
    identifiedDeficit: 'DPDP Act 2023 Health Data Fiduciaries & Statutory IP Advocates',
    deficitSeverity: 'Critical Deficit',
    supplyIndex: 48,
    demandIndex: 92,
    gapPercent: -44,
    recommendedGrant: '₹9.5 Cr Sovereign Compliance Lab',
    topDeficitSkills: ['DPDP Statutory Audits', 'TKDL Traditional Knowledge Patent Clearing', 'Consent Token Ledgers']
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    institutionCount: 45,
    verifiedScholarsCount: 4800,
    majorHub: 'Jamnagar (WHO GCTM Hub) / Ahmedabad',
    identifiedDeficit: 'Traditional Medicine Standardization & WHO GCTM Liaisons',
    deficitSeverity: 'Moderate Deficit',
    supplyIndex: 68,
    demandIndex: 90,
    gapPercent: -22,
    recommendedGrant: '₹12.0 Cr WHO Global Centre Immersion Grant',
    topDeficitSkills: ['WHO GCTM Compliance', 'Traditional Medicine Module 2 ICD-11', 'Herbal Pharmacovigilance']
  }
];

export interface NationalTalentRecord {
  id: string;
  name: string;
  discipline: string;
  institution: string;
  state: string;
  digiLockerStatus: '100% Cryptographically Verified';
  proctoredSandboxScore: number;
  placementStatus: 'Verified Placed' | 'Available for NIP / PSU' | 'Shortlisted for Ministry R&D';
  recruiterOrAgency: string;
  offerVerificationHash: string;
  nipStatus: 'Dispatched to AICTE Portal' | 'Eligible for Central PSU Direct Drive';
  namasteIcd11Certified: boolean;
}

export const NATIONAL_TALENT_REGISTRY: NationalTalentRecord[] = [
  {
    id: 'NAT-SCH-019',
    name: 'Dr. Pooja Nair',
    discipline: 'Ayurveda & Bio-Health (BAMS / MD)',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    state: 'Delhi-NCR',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 97,
    placementStatus: 'Verified Placed',
    recruiterOrAgency: 'Patanjali Research Foundation (Clinical Trials)',
    offerVerificationHash: 'SHA-256 [0x92f8a...41c]',
    nipStatus: 'Dispatched to AICTE Portal',
    namasteIcd11Certified: true
  },
  {
    id: 'NAT-SCH-042',
    name: 'Arjun Kawade',
    discipline: 'Computer Science & AI (B.Tech)',
    institution: 'Indian Institute of Technology (IIT) Bombay',
    state: 'Maharashtra',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 98,
    placementStatus: 'Verified Placed',
    recruiterOrAgency: 'Microsoft Research India (Azure AI)',
    offerVerificationHash: 'SHA-256 [0x4b719...a82]',
    nipStatus: 'Dispatched to AICTE Portal',
    namasteIcd11Certified: false
  },
  {
    id: 'NAT-SCH-088',
    name: 'Vipin Chandran',
    discipline: 'Ayurveda Medicine & Surgery (BAMS)',
    institution: 'Vaidyaratnam P.S. Varier Ayurveda College, Kottakkal',
    state: 'Kerala',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 94,
    placementStatus: 'Available for NIP / PSU',
    recruiterOrAgency: 'Open for Ministry of Ayush Public Sector Intake',
    offerVerificationHash: 'SHA-256 [0x6812a...77e]',
    nipStatus: 'Eligible for Central PSU Direct Drive',
    namasteIcd11Certified: true
  },
  {
    id: 'NAT-SCH-112',
    name: 'Priya Sharma',
    discipline: 'Commerce & Quantitative Finance (M.Com)',
    institution: 'Shri Ram College of Commerce (SRCC), Delhi',
    state: 'Delhi-NCR',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 94,
    placementStatus: 'Verified Placed',
    recruiterOrAgency: 'Razorpay (Treasury Risk & Capital Markets)',
    offerVerificationHash: 'SHA-256 [0x12fc3...990]',
    nipStatus: 'Dispatched to AICTE Portal',
    namasteIcd11Certified: false
  },
  {
    id: 'NAT-SCH-145',
    name: 'Ananya Iyer',
    discipline: 'Corporate Law & Public Policy (BA LLB)',
    institution: 'National Law School of India University (NLSIU), Bengaluru',
    state: 'Karnataka',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 95,
    placementStatus: 'Verified Placed',
    recruiterOrAgency: 'Trilegal & TechLaw Partners',
    offerVerificationHash: 'SHA-256 [0x8891d...31b]',
    nipStatus: 'Dispatched to AICTE Portal',
    namasteIcd11Certified: false
  },
  {
    id: 'NAT-SCH-190',
    name: 'Kavita Shinde',
    discipline: 'Ayurveda Pharmacy & Formulation (B.Pharm Ayush)',
    institution: 'Government Ayurveda College, Nanded',
    state: 'Maharashtra',
    digiLockerStatus: '100% Cryptographically Verified',
    proctoredSandboxScore: 92,
    placementStatus: 'Available for NIP / PSU',
    recruiterOrAgency: 'Open for Ayush Drug Controller & Testing Labs',
    offerVerificationHash: 'SHA-256 [0x5501b...841]',
    nipStatus: 'Eligible for Central PSU Direct Drive',
    namasteIcd11Certified: true
  }
];

export interface NamasteIcd11Mapping {
  namasteCode: string;
  namasteTerm: string;
  ayurvedaConcept: string;
  icd11Tm2Code: string;
  icd11EntityTitle: string;
  globalEquivalentCategory: string;
  certifiedScholarsCount: number;
}

export const NAMASTE_TO_ICD11_ONTOLOGY: NamasteIcd11Mapping[] = [
  {
    namasteCode: 'NAM-AYU-DIS-0104',
    namasteTerm: 'Amavata (आमवात)',
    ayurvedaConcept: 'Vitiated Vata dosha circulating Ama in joints causing inflammatory pain',
    icd11Tm2Code: 'TM2-MG20.1',
    icd11EntityTitle: 'Rheumatoid and Systemic Synovial Arthropathies (Traditional Medicine Module 2)',
    globalEquivalentCategory: 'WHO Category 15: Musculoskeletal Conditions',
    certifiedScholarsCount: 4280
  },
  {
    namasteCode: 'NAM-AYU-DIS-0219',
    namasteTerm: 'Prameha / Madhumeha (प्रमेह)',
    ayurvedaConcept: 'Metabolic syndrome and urinary turbidity characterized by Meda-Kleda-Kapha derangement',
    icd11Tm2Code: 'TM2-5A10.Y',
    icd11EntityTitle: 'Disorders of Carbohydrate Metabolism (Traditional Medicine Module 2)',
    globalEquivalentCategory: 'WHO Category 05: Endocrine & Metabolic Diseases',
    certifiedScholarsCount: 5120
  },
  {
    namasteCode: 'NAM-AYU-DIS-0342',
    namasteTerm: 'Tamaka Shwasa (तमक श्वास)',
    ayurvedaConcept: 'Pranavaha Srotas obstruction by Kapha manifesting as paroxysmal nocturnal dyspnea',
    icd11Tm2Code: 'TM2-CA23.0',
    icd11EntityTitle: 'Bronchial Asthma & Hyperreactive Airway Disorders (TM-2 Dual Standard)',
    globalEquivalentCategory: 'WHO Category 12: Diseases of the Respiratory System',
    certifiedScholarsCount: 3890
  },
  {
    namasteCode: 'NAM-AYU-DIS-0408',
    namasteTerm: 'Yakritodara / Kamala (कामला)',
    ayurvedaConcept: 'Pitta aggravation in Raktavaha Srotas leading to hepatic and biliary jaundice',
    icd11Tm2Code: 'TM2-DB90.2',
    icd11EntityTitle: 'Hepatic Parenchymal & Biliary Transport Syndromes (TM-2 Dual Standard)',
    globalEquivalentCategory: 'WHO Category 13: Diseases of the Digestive System',
    certifiedScholarsCount: 2940
  }
];

export interface MacroCurriculumDirective {
  id: string;
  discipline: string;
  nepTrack: string;
  wideningGapDescription: string;
  industryDemandGrowth: string;
  academicSyllabusCoverage: string;
  aiCTEActionDirective: string;
  mandatoryCredits: number;
}

export const MACRO_CURRICULUM_DIRECTIVES: MacroCurriculumDirective[] = [
  {
    id: 'DIR-AICTE-NEP-01',
    discipline: 'Computer Science & AI',
    nepTrack: 'Accelerated Hardware-Aware AI & Inference Kernels',
    wideningGapDescription: '78% of graduating engineering cohorts lack vLLM, Triton kernel fusion, and distributed GPU memory optimization skills.',
    industryDemandGrowth: '+340% YoY',
    academicSyllabusCoverage: '18% syllabus penetration across affiliated universities',
    aiCTEActionDirective: 'Mandate 4-credit laboratory module "AI Accelerator Architecture & Kernel Compilation" under NEP 2020 Credit Framework.',
    mandatoryCredits: 4
  },
  {
    id: 'DIR-AYUSH-NEP-02',
    discipline: 'Ayurveda & Allied Health Sciences',
    nepTrack: 'NAMASTE-to-ICD-11 Digital Health & Pharmacovigilance',
    wideningGapDescription: 'Graduates lack formal training in dual-ontology coding required by WHO and international insurance reimbursement frameworks.',
    industryDemandGrowth: '+265% YoY',
    academicSyllabusCoverage: '24% of state health universities offer dual coding modules',
    aiCTEActionDirective: 'Embed mandatory 3-credit practicum in BAMS final year on ICD-11 Traditional Medicine Module 2 electronic health records.',
    mandatoryCredits: 3
  },
  {
    id: 'DIR-FIN-NEP-03',
    discipline: 'Commerce, Banking & Quantitative Finance',
    nepTrack: 'ESG Quantitative Modeling & Real-Time Settlement APIs',
    wideningGapDescription: '65% of commerce syllabus is confined to legacy manual bookkeeping, failing to address algorithmic LBO debt waterfalls and FinTech VaR.',
    industryDemandGrowth: '+195% YoY',
    academicSyllabusCoverage: '31% coverage in standard university curricula',
    aiCTEActionDirective: 'Integrate dynamic Python financial modeling and automated cash sweep simulators into university degree curriculum.',
    mandatoryCredits: 4
  },
  {
    id: 'DIR-LAW-NEP-04',
    discipline: 'Corporate Law & Public Governance',
    nepTrack: 'Statutory DPDP Act 2023 & Sovereign Data Fiduciary Tokenization',
    wideningGapDescription: 'Law graduates enter industry with general jurisprudence without hands-on expertise in statutory digital consent ledgers and AI IP audits.',
    industryDemandGrowth: '+310% YoY',
    academicSyllabusCoverage: '14% coverage in current LLB curricula',
    aiCTEActionDirective: 'Issue National Directive mandating "Digital Personal Data Protection & Sovereign Cybersecurity Law" in all Bar Council accredited institutions.',
    mandatoryCredits: 3
  }
];

export interface CoFundedGrandProject {
  id: string;
  title: string;
  industryPartner: string;
  leadInstitution: string;
  state: string;
  totalGrant: string;
  governmentShare: string;
  industryShare: string;
  milestonesCompleted: number;
  totalMilestones: number;
  aicte360Points: number;
  patentFiled: boolean;
}

export const COFUNDED_RND_PROJECTS: CoFundedGrandProject[] = [
  {
    id: 'RND-AYU-01',
    title: 'Standardization of Classical Rasayana Formulations using HPLC-MS & Genomics',
    industryPartner: 'Patanjali Research Foundation',
    leadInstitution: 'All India Institute of Ayurveda (AIIA) & IIT Delhi',
    state: 'Delhi-NCR',
    totalGrant: '₹14,50,00,000',
    governmentShare: '₹7,25,00,000 (Ministry of Ayush)',
    industryShare: '₹7,25,00,000 (Corporate R&D)',
    milestonesCompleted: 4,
    totalMilestones: 5,
    aicte360Points: 80,
    patentFiled: true
  },
  {
    id: 'RND-TECH-02',
    title: 'Sovereign eBPF Linux Kernel Security & Hardware Memory Isolation for Public Cloud',
    industryPartner: 'Red Hat & C-DAC',
    leadInstitution: 'IIT Bombay & COEP Tech University',
    state: 'Maharashtra',
    totalGrant: '₹18,20,00,000',
    governmentShare: '₹9,10,00,000 (MeitY & AICTE)',
    industryShare: '₹9,10,00,000 (Enterprise Research)',
    milestonesCompleted: 3,
    totalMilestones: 4,
    aicte360Points: 95,
    patentFiled: true
  },
  {
    id: 'RND-PHARMA-03',
    title: 'High-Throughput Phytochemical Screening for Metabolic Syndrome & NAFLD',
    industryPartner: 'Dabur Research & Development',
    leadInstitution: 'Banaras Hindu University (BHU) Faculty of Ayurveda',
    state: 'Uttar Pradesh',
    totalGrant: '₹8,80,00,000',
    governmentShare: '₹4,40,00,000 (Ministry of Ayush)',
    industryShare: '₹4,40,00,000 (Dabur Pharma)',
    milestonesCompleted: 2,
    totalMilestones: 3,
    aicte360Points: 65,
    patentFiled: false
  },
  {
    id: 'RND-MEDTECH-04',
    title: 'Autonomous Clinical Pulse Diagnostics & Optical PPG Tri-Dosha Bio-Sensor',
    industryPartner: 'Charak Pharma & MedTech India',
    leadInstitution: 'IISc Bengaluru & Government Ayurveda Medical College',
    state: 'Karnataka',
    totalGrant: '₹6,70,00,000',
    governmentShare: '₹3,35,00,000 (AICTE Innovation Council)',
    industryShare: '₹3,35,00,000 (Charak MedTech)',
    milestonesCompleted: 3,
    totalMilestones: 3,
    aicte360Points: 90,
    patentFiled: true
  }
];
