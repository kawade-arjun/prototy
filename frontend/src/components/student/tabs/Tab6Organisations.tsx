import React, { useState } from 'react';
import { AcademicStream } from '../../../types';
import { useStudent } from '../../../context/StudentContext';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';

interface OrgProfile {
  id: string;
  name: string;
  category: 'corporate' | 'academic';
  stream: AcademicStream | 'all';
  logo: string;
  location: string;
  verifiedStatus: string;
  description: string;
  hiringCriteria: string[];
  interviewProcess: string[];
  activeVacanciesCount: number;
  benchmarkScoreRequired: number;
}

const ORGANISATIONS_LIST: OrgProfile[] = [
  // 1. Tech & AI
  {
    id: 'ORG-MSFT',
    name: 'Microsoft Research & Cloud',
    category: 'corporate',
    stream: 'tech_ai',
    logo: 'MS',
    location: 'Bengaluru & Hyderabad, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Pioneering global cloud infrastructure, foundational AI models, and enterprise software systems.',
    hiringCriteria: [
      'Verified Score >= 82% on CareerOptic Sandbox',
      'Hands-on expertise in vLLM, distributed CUDA, or systems programming',
      '0% credential discrepancy on 3-tier pre-flight audit'
    ],
    interviewProcess: [
      'Round 1: Waived for CareerOptic Top 5% verified candidates',
      'Round 2: Architecture & Distributed Systems Deep Dive (45 mins)',
      'Round 3: Values & Executive Alignment'
    ],
    activeVacanciesCount: 14,
    benchmarkScoreRequired: 82
  },
  {
    id: 'ORG-NVDA',
    name: 'NVIDIA AI Tech Center',
    category: 'corporate',
    stream: 'tech_ai',
    logo: 'NV',
    location: 'Pune & Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Accelerated computing, CUDA kernel engineering, and autonomous robotics platforms.',
    hiringCriteria: [
      'Verified Score >= 88% on Monaco Code Sandbox (C++ / CUDA)',
      'Demonstrated kernel optimization and memory coalescing principles'
    ],
    interviewProcess: [
      'Round 1: CareerOptic Verified Code Sandbox submission review',
      'Round 2: GPU Architecture & Parallel Algorithms panel'
    ],
    activeVacanciesCount: 8,
    benchmarkScoreRequired: 88
  },
  {
    id: 'ORG-IITB',
    name: 'IIT Bombay - Dept. of Computer Science & AI',
    category: 'academic',
    stream: 'tech_ai',
    logo: 'IITB',
    location: 'Mumbai, India',
    verifiedStatus: 'National Academic Benchmark Institute',
    description: 'Premier technological research institute leading national high-performance computing and NLP initiatives.',
    hiringCriteria: [
      'Verified Top 2% National Percentile in Theoretical CS / AI',
      'Published research or reproducible sandbox artifacts'
    ],
    interviewProcess: [
      'Faculty Research Committee review of verified Living Resume',
      'Seminar Presentation & Fellowship Defense'
    ],
    activeVacanciesCount: 6,
    benchmarkScoreRequired: 92
  },

  // 2. Commerce & Finance
  {
    id: 'ORG-GS',
    name: 'Goldman Sachs Quantitative Asset Management',
    category: 'corporate',
    stream: 'commerce_finance',
    logo: 'GS',
    location: 'Mumbai & Bengaluru, India',
    verifiedStatus: 'Verified Institutional Partner',
    description: 'Global investment banking and quantitative risk management managing multi-billion dollar portfolios.',
    hiringCriteria: [
      'Verified Score >= 84% on DCF / LBO Financial Sandbox',
      'Proven expertise in dynamic debt amortization waterfalls and Basel III rules',
      'CFA Level 1 verified curriculum alignment'
    ],
    interviewProcess: [
      'Round 1: Waived for CareerOptic Top 5% verified finance scholars',
      'Round 2: Dynamic LBO Modeling & Credit Risk Defense (45 mins)',
      'Round 3: Managing Director Interview'
    ],
    activeVacanciesCount: 9,
    benchmarkScoreRequired: 84
  },
  {
    id: 'ORG-RZP-FIN',
    name: 'Razorpay Financial Engineering & Treasury',
    category: 'corporate',
    stream: 'commerce_finance',
    logo: 'RZ',
    location: 'Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'India’s premier payment gateway handling billions in real-time merchant transactions and banking rails.',
    hiringCriteria: [
      'Verified Score >= 80% on Commerce or Tech Sandbox',
      'High reliability liquidity risk assessment and Working Capital cycle understanding'
    ],
    interviewProcess: [
      'Automated candidate matching via Gale-Shapley pipeline',
      'Quantitative Treasury Case Study'
    ],
    activeVacanciesCount: 12,
    benchmarkScoreRequired: 80
  },
  {
    id: 'ORG-SRCC',
    name: 'Shri Ram College of Commerce (SRCC Delhi)',
    category: 'academic',
    stream: 'commerce_finance',
    logo: 'SRCC',
    location: 'New Delhi, India',
    verifiedStatus: 'National Academic Benchmark Institute',
    description: 'Premier commerce institution advancing research in Indian capital markets, fintech valuation, and monetary policy.',
    hiringCriteria: [
      'Top 2% National Percentile in Financial Econometrics & Corporate Finance',
      'Verifiable DigiLocker academic marksheets'
    ],
    interviewProcess: [
      'Research Fellowship Committee Review',
      'Empirical Valuation Defense'
    ],
    activeVacanciesCount: 5,
    benchmarkScoreRequired: 89
  },

  // 3. Healthcare & Bio
  {
    id: 'ORG-NIA',
    name: 'National Institute of Ayurveda (NIA Jaipur)',
    category: 'academic',
    stream: 'healthcare_bio',
    logo: 'NIA',
    location: 'Jaipur, India',
    verifiedStatus: 'Ministry of Ayush National Apex Body',
    description: 'National center of excellence for traditional medicine, clinical phytopharmacology, and ontological data integration.',
    hiringCriteria: [
      'Verified Score >= 82% on Kaplan-Meier Survival Sandbox',
      'Proficiency in NAMASTE morbidity coding and WHO ICD-11 Module 2 TM'
    ],
    interviewProcess: [
      'Clinical Protocol Evaluation by Ayush Apex Board',
      'Biostatistical Trial Reproducibility Defense'
    ],
    activeVacanciesCount: 7,
    benchmarkScoreRequired: 82
  },
  {
    id: 'ORG-AIIMS',
    name: 'AIIMS New Delhi Genomics & Oncology Lab',
    category: 'academic',
    stream: 'healthcare_bio',
    logo: 'AIIMS',
    location: 'New Delhi, India',
    verifiedStatus: 'National Medical Benchmark Institute',
    description: 'Premier medical research center pioneering precision genomics and clinical trial biostatistics.',
    hiringCriteria: [
      'Verified Score >= 80% on Bioinformatics Sandbox',
      'Demonstrated quality control in single-cell RNA-seq datasets'
    ],
    interviewProcess: [
      'Principal Investigator Review of Verified Dossier',
      'Practical Genomic Data Pipeline Walkthrough'
    ],
    activeVacanciesCount: 4,
    benchmarkScoreRequired: 80
  },
  {
    id: 'ORG-BIOC',
    name: 'Biocon Biologics Research Lab',
    category: 'corporate',
    stream: 'healthcare_bio',
    logo: 'BC',
    location: 'Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Global biopharmaceutical manufacturer specializing in biosimilars, clinical pharmacology, and automated trial analytics.',
    hiringCriteria: [
      'Verified Score >= 84% on Bio-Health Sandbox',
      'Hands-on Good Clinical Practice (GCP) compliance accreditation'
    ],
    interviewProcess: [
      'Round 1: Waived for verified Ayush/Bio scholars',
      'Round 2: Clinical Biostatistics & Assay Evaluation panel'
    ],
    activeVacanciesCount: 8,
    benchmarkScoreRequired: 84
  },

  // 4. Law & Governance
  {
    id: 'ORG-TRILEGAL',
    name: 'Trilegal & TechLaw Partners',
    category: 'corporate',
    stream: 'law_governance',
    logo: 'TL',
    location: 'New Delhi & Mumbai, India',
    verifiedStatus: 'Verified Legal Partner',
    description: 'Leading tier-1 law firm specializing in technology transactions, India DPDP Act 2023 compliance, and cross-border M&A.',
    hiringCriteria: [
      'Verified Score >= 82% on Statutory NDA & DPDP Risk Parser Sandbox',
      'Verifiable Bar Council Student Fellowship credential via DigiLocker'
    ],
    interviewProcess: [
      'Round 1: Waived for NLSIU / Top 5% Verified Law Scholars',
      'Round 2: Cross-Border Data Contract Redlining Exercise',
      'Round 3: Partner Technical Panel'
    ],
    activeVacanciesCount: 6,
    benchmarkScoreRequired: 82
  },
  {
    id: 'ORG-NLSIU',
    name: 'NLSIU Bengaluru - Center for Tech Policy',
    category: 'academic',
    stream: 'law_governance',
    logo: 'NLS',
    location: 'Bengaluru, India',
    verifiedStatus: 'National Academic Benchmark Institute',
    description: 'Apex legal institution advising statutory authorities on digital personal data regulations and algorithmic accountability.',
    hiringCriteria: [
      'Top 3% National Percentile in Data Governance & Constitutional Law',
      'Published empirical legal research on DPDP Act or AI governance'
    ],
    interviewProcess: [
      'Faculty Fellowship Committee Review',
      'Statutory Framework Defense'
    ],
    activeVacanciesCount: 5,
    benchmarkScoreRequired: 90
  },
  {
    id: 'ORG-CAM',
    name: 'Cyril Amarchand Mangaldas - Tech & Data Group',
    category: 'corporate',
    stream: 'law_governance',
    logo: 'CAM',
    location: 'Bengaluru & New Delhi, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Premier full-service law firm leading marquee cross-border technology transfers and data fiduciary statutory audits.',
    hiringCriteria: [
      'Verified Score >= 85% on Contract Risk Sandbox',
      'Demonstrated expertise in Consent Manager statutory obligations (§8)'
    ],
    interviewProcess: [
      'Round 1: Direct Dossier Verification Review',
      'Round 2: Regulatory Impact Scenario Defense'
    ],
    activeVacanciesCount: 7,
    benchmarkScoreRequired: 85
  },

  // 5. UI/UX Design
  {
    id: 'ORG-NID',
    name: 'National Institute of Design (NID Ahmedabad)',
    category: 'academic',
    stream: 'ui_ux',
    logo: 'NID',
    location: 'Ahmedabad, India',
    verifiedStatus: 'National Academic Benchmark Institute',
    description: 'Internationally acclaimed design institute setting national standards for ergonomic design, design systems, and inclusive UI.',
    hiringCriteria: [
      'Verified Score >= 88% on WCAG 2.2 AA Accessibility Audit Sandbox',
      'Demonstrated multi-theme token hierarchy and spatial layout research'
    ],
    interviewProcess: [
      'Design Faculty Portfolio & Token Inspection',
      'Ergonomics & Inclusive Design Thesis Defense'
    ],
    activeVacanciesCount: 4,
    benchmarkScoreRequired: 88
  },
  {
    id: 'ORG-ADBE',
    name: 'Adobe Design Systems & Spatial Lab',
    category: 'corporate',
    stream: 'ui_ux',
    logo: 'AD',
    location: 'Noida & Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Global creative technology leader building industry-standard accessibility engines and multi-platform design tokens.',
    hiringCriteria: [
      'Verified Score >= 84% on WCAG AAA Accessibility Sandbox',
      'Pristine Lighthouse/axe-core pass on submitted design token components'
    ],
    interviewProcess: [
      'Round 1: Waived for CareerOptic Top 5% verified UI/UX scholars',
      'Round 2: Live Token Architecture & Color Space Inspection (45 mins)'
    ],
    activeVacanciesCount: 8,
    benchmarkScoreRequired: 84
  },
  {
    id: 'ORG-FLPK',
    name: 'Flipkart UX & Vernacular Design Labs',
    category: 'corporate',
    stream: 'ui_ux',
    logo: 'FK',
    location: 'Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Leading e-commerce design ecosystem designing accessible and low-cognitive-load spatial interfaces for 500M+ users.',
    hiringCriteria: [
      'Verified Score >= 82% on UI/UX Sandbox',
      'Understanding of multimodal voice/gesture UX and Bharat typography'
    ],
    interviewProcess: [
      'Automated candidate matching via verified design dossier',
      'Spatial UX System Walkthrough'
    ],
    activeVacanciesCount: 11,
    benchmarkScoreRequired: 82
  }
];

export const Tab6Organisations: React.FC = () => {
  const { activeStudent, selectedStream } = useStudent();
  const [filterType, setFilterType] = useState<'all' | 'corporate' | 'academic'>('all');
  const [selectedOrg, setSelectedOrg] = useState<OrgProfile | null>(null);
  const [onlyMyField, setOnlyMyField] = useState(true);

  // Filter out organizations not related to the student's field
  const streamOrgs = onlyMyField 
    ? ORGANISATIONS_LIST.filter(o => o.stream === selectedStream || o.stream === 'all')
    : ORGANISATIONS_LIST;

  const filtered = filterType === 'all' 
    ? streamOrgs 
    : streamOrgs.filter(o => o.category === filterType);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 text-2xl font-bold">
            <Building2 className="w-4.5 h-4.5" />
            <span>ORGANISATIONS DIRECTORY </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Verified Corporate Organisations & Academic Benchmark Labs
          </h2>
          {/* <p className="text-sm text-slate-600 dark:text-slate-300">
            Directly inspect verified partner requirements, bypass interview stages, and explore active opportunities in {activeStudent.streamName}.
          </p> */}
        </div>
      </div>

      {/* Filter Tabs & Discipline Lock */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Organisations
          </button>
          <button
            onClick={() => setFilterType('corporate')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'corporate' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Corporate Partners
          </button>
          <button
            onClick={() => setFilterType('academic')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'academic' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Benchmark Institutes
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyMyField(!onlyMyField)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              onlyMyField 
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-600/20 dark:text-amber-300 dark:border-amber-500/30 shadow-sm' 
                : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-white/[0.08]'
            }`}
          >
            {onlyMyField ? `✓ Filtered: ${activeStudent.streamName}` : 'Showing All Sectors'}
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <strong>{filtered.length}</strong> Entities
          </span>
        </div>
      </div>

      {/* Grid of Organisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((org) => {
          const isAcademic = org.category === 'academic';
          return (
            <div 
              key={org.id} 
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-amber-500 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center font-black text-sm text-amber-700 dark:text-amber-300 shadow-inner">
                    {org.logo}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    isAcademic 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
                  }`}>
                    {isAcademic ? <GraduationCap className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                    <span>{isAcademic ? 'Benchmark Institute' : 'Verified Employer'}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {org.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {org.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Cutoff Score:</span>
                    <span className="font-black text-amber-600 dark:text-amber-400 font-mono">
                      {org.benchmarkScoreRequired}% Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Active Openings:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {org.activeVacanciesCount} Vacancies
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  onClick={() => setSelectedOrg(org)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View Hiring Protocol</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hiring Protocol Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 space-y-5 border border-slate-200 dark:border-white/[0.1] shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center font-black text-sm text-amber-700 dark:text-amber-300">
                  {selectedOrg.logo}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedOrg.name}</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{selectedOrg.verifiedStatus}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrg(null)}
                className="text-xs font-bold p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                Verified Hiring Criteria
              </h5>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                {selectedOrg.hiringCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-xs pt-2 border-t border-slate-100 dark:border-white/[0.06]">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                Interview Process & Automated Waivers
              </h5>
              <ol className="space-y-2 text-slate-600 dark:text-slate-300 list-decimal list-inside">
                {selectedOrg.interviewProcess.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  alert(`Direct verified talent application dispatch sent to ${selectedOrg.name}!`);
                  setSelectedOrg(null);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Dispatch Pre-Verified Living Resume to {selectedOrg.name}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
