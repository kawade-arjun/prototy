export interface DepartmentCohort {
  id: string;
  name: string;
  shortCode: string;
  icon: string;
  totalStudents: number;
  readyStudents: number;
  avgScore: number;
  topSkill: string;
  topBenchmark: string;
  medianCtc: string;
  placementPercent: number;
  color: string;
  deficitSkill: string;
  deficitPercent: number;
}

export const DEPARTMENT_COHORTS: DepartmentCohort[] = [
  {
    id: 'DEPT-CSE',
    name: 'Computer Science & Engineering (AI & Systems)',
    shortCode: 'CSE',
    icon: 'cpu',
    totalStudents: 240,
    readyStudents: 215,
    avgScore: 88.4,
    topSkill: 'Cloud Architecture, vLLM & FastAPI Concurrency',
    topBenchmark: 'IIT Bombay Benchmark Top 3%',
    medianCtc: '₹16.5 LPA',
    placementPercent: 89.6,
    color: 'indigo',
    deficitSkill: 'Triton Kernel Fusion & Distributed GPU Memory',
    deficitPercent: 78
  },
  {
    id: 'DEPT-COMM',
    name: 'Commerce & Quantitative Finance',
    shortCode: 'FIN',
    icon: 'trending-up',
    totalStudents: 190,
    readyStudents: 170,
    avgScore: 85.2,
    topSkill: 'DCF Sensitivity Modeling & LBO Debt Sweeps',
    topBenchmark: 'SRCC / NMIMS Benchmark Top 4%',
    medianCtc: '₹14.0 LPA',
    placementPercent: 89.5,
    color: 'amber',
    deficitSkill: 'ESG Derivative Modeling & Monte Carlo VaR',
    deficitPercent: 65
  },
  {
    id: 'DEPT-BIO',
    name: 'Ayurveda, Multi-Omics & Bio-Health',
    shortCode: 'BIO',
    icon: 'activity',
    totalStudents: 120,
    readyStudents: 104,
    avgScore: 86.8,
    topSkill: 'NAMASTE / ICD-11 ASU Standards & Kaplan-Meier Survival',
    topBenchmark: 'AIIMS New Delhi Benchmark Top 2%',
    medianCtc: '₹12.2 LPA',
    placementPercent: 86.7,
    color: 'teal',
    deficitSkill: 'Single-Cell RNA-seq Containerized Pipeline Dev',
    deficitPercent: 71
  },
  {
    id: 'DEPT-LAW',
    name: 'Corporate Law, Tech IP & Public Policy',
    shortCode: 'LAW',
    icon: 'scale',
    totalStudents: 85,
    readyStudents: 75,
    avgScore: 91.0,
    topSkill: 'Patent Tech IP & DPDP Act 2023 Statutory Audits',
    topBenchmark: 'NLSIU Bengaluru Benchmark Top 1%',
    medianCtc: '₹15.8 LPA',
    placementPercent: 88.2,
    color: 'rose',
    deficitSkill: 'Statutory DPDP Fiduciary Consent Tokenization',
    deficitPercent: 82
  },
  {
    id: 'DEPT-DES',
    name: 'UI/UX Design & Human-Computer Systems',
    shortCode: 'DES',
    icon: 'palette',
    totalStudents: 95,
    readyStudents: 88,
    avgScore: 89.1,
    topSkill: 'WCAG 2.2 AAA Accessibility & Figma Design Tokens',
    topBenchmark: 'NID Ahmedabad Benchmark Top 2%',
    medianCtc: '₹13.5 LPA',
    placementPercent: 92.6,
    color: 'purple',
    deficitSkill: 'Spatial AR/VR Interface Design & VisionOS Tokens',
    deficitPercent: 68
  }
];

export interface VisitingDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  roleTitle: string;
  driveDate: string;
  packageOffered: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
  criteria: {
    minCgpa: number;
    minSandboxScore: number;
    maxBacklogs: number;
  };
  eligibleCount: number;
  totalApplied: number;
}

export const VISITING_CAMPUS_DRIVES: VisitingDrive[] = [
  {
    id: 'DRIVE-MSFT-2026',
    companyName: 'Microsoft Research & Cloud Systems',
    companyLogo: 'MS',
    roleTitle: 'GenAI & Applied Research Engineer',
    driveDate: '2026-09-24',
    packageOffered: '₹28 - 36 LPA',
    status: 'upcoming',
    venue: 'Main Auditorium (Presentation) • Lab 4 (Proctored Test)',
    criteria: {
      minCgpa: 8.0,
      minSandboxScore: 85,
      maxBacklogs: 0
    },
    eligibleCount: 84,
    totalApplied: 112
  },
  {
    id: 'DRIVE-GS-2026',
    companyName: 'Goldman Sachs Quantitative Engineering',
    companyLogo: 'GS',
    roleTitle: 'Quantitative Analyst & Risk Modeler',
    driveDate: '2026-09-28',
    packageOffered: '₹26 - 32 LPA',
    status: 'upcoming',
    venue: 'Seminar Hall B • Finance Sandbox Suite 2',
    criteria: {
      minCgpa: 7.5,
      minSandboxScore: 82,
      maxBacklogs: 0
    },
    eligibleCount: 68,
    totalApplied: 95
  },
  {
    id: 'DRIVE-TCS-2026',
    companyName: 'TCS Digital Innovation & Research',
    companyLogo: 'TCS',
    roleTitle: 'Systems Architect & Full-Stack Lead',
    driveDate: '2026-10-04',
    packageOffered: '₹11 - 15 LPA',
    status: 'upcoming',
    venue: 'Central Computer Center • Interview Suites 101-108',
    criteria: {
      minCgpa: 7.0,
      minSandboxScore: 75,
      maxBacklogs: 0
    },
    eligibleCount: 290,
    totalApplied: 340
  }
];

export interface FacultyGrant {
  id: string;
  title: string;
  facultyName: string;
  department: string;
  corporateSponsor: string;
  grantAmount: string;
  aictePointsAwarded: number;
  status: 'funded' | 'term_sheet_active' | 'proposal_review';
  ipTermSheetStatus: 'Indian Patents Act 1970 Compliant';
  durationMonths: number;
}

export const FACULTY_RND_PROJECTS: FacultyGrant[] = [
  {
    id: 'GRANT-REDHAT-01',
    title: 'Containerized eBPF Kernel Observability for High-Throughput Cloud AI',
    facultyName: 'Dr. Anandvardhan Joshi',
    department: 'Computer Science & Engineering',
    corporateSponsor: 'Red Hat Enterprise Research',
    grantAmount: '₹42,00,000',
    aictePointsAwarded: 50,
    status: 'funded',
    ipTermSheetStatus: 'Indian Patents Act 1970 Compliant',
    durationMonths: 24
  },
  {
    id: 'GRANT-PATANJALI-02',
    title: 'Standardization of ASU Herbal Bio-Actives using HPLC-MS & ICD-11 Ontologies',
    facultyName: 'Prof. Gayatri Deshpande',
    department: 'Ayurveda & Bio-Health',
    corporateSponsor: 'Patanjali Research Foundation',
    grantAmount: '₹28,50,000',
    aictePointsAwarded: 45,
    status: 'funded',
    ipTermSheetStatus: 'Indian Patents Act 1970 Compliant',
    durationMonths: 18
  },
  {
    id: 'GRANT-TRILEGAL-03',
    title: 'Automated DPDP Act 2023 Consent Audit Engine for Financial Intermediaries',
    facultyName: 'Dr. Raghavendra Shenoy',
    department: 'Corporate Law & Tech Policy',
    corporateSponsor: 'Trilegal IP Advisory',
    grantAmount: '₹18,00,000',
    aictePointsAwarded: 35,
    status: 'term_sheet_active',
    ipTermSheetStatus: 'Indian Patents Act 1970 Compliant',
    durationMonths: 12
  }
];

export interface StudentUploadInspection {
  id: string;
  studentName: string;
  rollNumber: string;
  department: string;
  docTitle: string;
  uploadDate: string;
  auditStatus: 'passed' | 'tampered';
  elaIndex: number;
  details: string;
  sha256: string;
  tamperedArea?: string;
}

export const STUDENT_DOC_INSPECTIONS: StudentUploadInspection[] = [
  {
    id: 'DOC-901',
    studentName: 'Vikramaditya Rao',
    rollNumber: '1VT22CS089',
    department: 'Computer Science',
    docTitle: 'Semester 8 Consolidated Marksheet (Tamper Suspect)',
    uploadDate: '2026-09-15',
    auditStatus: 'tampered',
    elaIndex: 0.884,
    details: 'Photoshopped CGPA: Altered from 7.20 to 9.85 with JPEG resave discrepancy.',
    sha256: '0x4f82a19b8823c10e392d4710',
    tamperedArea: 'CGPA numerical bounding box [X: 320, Y: 145]'
  },
  {
    id: 'DOC-902',
    studentName: 'Arjun Kawade',
    rollNumber: '1VT22CS042',
    department: 'Computer Science',
    docTitle: 'IIT Bombay Benchmark Certificate & Degree Transcript',
    uploadDate: '2026-09-12',
    auditStatus: 'passed',
    elaIndex: 0.082,
    details: 'DigiLocker PKI Validated. Cryptographic signature matches university registry.',
    sha256: '0x9a12c833fa481e102283dc91'
  },
  {
    id: 'DOC-903',
    studentName: 'Priya Sharma',
    rollNumber: '1VT22CF018',
    department: 'Commerce & Finance',
    docTitle: 'SRCC Financial Lab LBO Certification',
    uploadDate: '2026-09-14',
    auditStatus: 'passed',
    elaIndex: 0.045,
    details: 'Uniform compression baseline across all DCT blocks. Zero tampering.',
    sha256: '0x7e33d28fa0021c44919bc301'
  }
];
