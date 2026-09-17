import React, { useState } from 'react';
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
  {
    id: 'ORG-MSFT',
    name: 'Microsoft Research & Cloud',
    category: 'corporate',
    logo: 'MS',
    location: 'Bengaluru & Hyderabad, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Pioneering global cloud infrastructure, foundational AI models, and enterprise software systems.',
    hiringCriteria: [
      'Verified Score >= 82% on CareerLens Sandbox',
      'Hands-on expertise in vLLM, distributed CUDA, or systems programming',
      '0% credential discrepancy on 3-tier pre-flight audit'
    ],
    interviewProcess: [
      'Round 1: Waived for CareerLens Top 5% verified candidates',
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
    logo: 'NV',
    location: 'Pune & Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'Accelerated computing, CUDA kernel engineering, and autonomous robotics platforms.',
    hiringCriteria: [
      'Verified Score >= 88% on Monaco Code Sandbox (C++ / CUDA)',
      'Demonstrated kernel optimization and memory coalescing principles'
    ],
    interviewProcess: [
      'Round 1: CareerLens Verified Code Sandbox submission review',
      'Round 2: GPU Architecture & Parallel Algorithms panel'
    ],
    activeVacanciesCount: 8,
    benchmarkScoreRequired: 88
  },
  {
    id: 'ORG-RZP',
    name: 'Razorpay Financial Engineering',
    category: 'corporate',
    logo: 'RZ',
    location: 'Bengaluru, India',
    verifiedStatus: 'Verified Enterprise Partner',
    description: 'India’s premier payment gateway handling billions in real-time merchant transactions and banking rails.',
    hiringCriteria: [
      'Verified Score >= 80% on Tech or Commerce Sandbox',
      'High reliability, microservices resilience, and DPDP compliance understanding'
    ],
    interviewProcess: [
      'Automated candidate matching via Gale-Shapley pipeline',
      'High-level system design discussion'
    ],
    activeVacanciesCount: 12,
    benchmarkScoreRequired: 80
  },
  {
    id: 'ORG-IITB',
    name: 'IIT Bombay - Dept. of Computer Science & AI',
    category: 'academic',
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
  {
    id: 'ORG-IISC',
    name: 'IISc Bangalore - Division of EECS',
    category: 'academic',
    logo: 'IISc',
    location: 'Bengaluru, India',
    verifiedStatus: 'National Academic Benchmark Institute',
    description: 'India’s foremost research university focusing on advanced quantum computing, robotics, and mathematical modeling.',
    hiringCriteria: [
      'Verified Score >= 90% across Mathematics and Systems',
      'Verified sovereign credential via DigiLocker PKI'
    ],
    interviewProcess: [
      'Research Fellowship Aptitude Interview',
      'Lab Practical Evaluation'
    ],
    activeVacanciesCount: 4,
    benchmarkScoreRequired: 90
  }
];

export const Tab6Organisations: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'corporate' | 'academic'>('all');
  const [selectedOrg, setSelectedOrg] = useState<OrgProfile | null>(null);

  const filtered = filterType === 'all' 
    ? ORGANISATIONS_LIST 
    : ORGANISATIONS_LIST.filter(o => o.category === filterType);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-gradient-to-r from-slate-100 via-white to-indigo-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>TAB 6 • ORGANISATIONS DIRECTORY</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Transparent Corporate Employers & Academic Research Labs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Directly inspect verified partner requirements, bypass interview stages, and explore active research fellowships.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Organisations
          </button>
          <button
            onClick={() => setFilterType('corporate')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'corporate' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Corporate Employers
          </button>
          <button
            onClick={() => setFilterType('academic')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'academic' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Academic & Research Labs
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <span className="text-slate-900 dark:text-white font-bold">{filtered.length}</span> Verified Institutions
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="glass-panel p-6 rounded-2xl hover:border-indigo-400 transition-all space-y-4 flex flex-col justify-between shadow-sm hover:shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                    {org.logo}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{org.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> {org.location}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  org.category === 'corporate'
                    ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30'
                }`}>
                  {org.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{org.verifiedStatus}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{org.description}</p>

              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hiring Criteria:</div>
                <ul className="space-y-1">
                  {org.hiringCriteria.slice(0, 2).map((crit, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Active Vacancies: <span className="font-bold text-slate-900 dark:text-white">{org.activeVacanciesCount}</span>
              </div>
              <button
                onClick={() => setSelectedOrg(org)}
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                View Full Dossier <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Org Dossier Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-xl w-full rounded-3xl p-7 border space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-base shadow-md">
                  {selectedOrg.logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedOrg.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedOrg.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrg(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Standardized Interview & Bypass Process:
              </div>
              <ul className="space-y-1.5">
                {selectedOrg.interviewProcess.map((step, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">All Hiring Criteria:</div>
              <ul className="space-y-1">
                {selectedOrg.hiringCriteria.map((c, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedOrg(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Direct verified profile dossier dispatched to ${selectedOrg.name}!`);
                  setSelectedOrg(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Submit Living Resume for Vacancies
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
