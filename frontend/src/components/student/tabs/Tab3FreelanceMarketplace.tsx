import React, { useState } from 'react';
import { 
  Briefcase, 
  Star, 
  Clock, 
  CheckCircle, 
  Send, 
  Copy, 
  ShieldCheck, 
  Filter,
  Cpu
} from 'lucide-react';

import { AcademicStream } from '../../../types';
import { useStudent } from '../../../context/StudentContext';

interface MicroProject {
  id: string;
  title: string;
  client: string;
  verifiedClient: boolean;
  budget: string;
  duration: string;
  stream: AcademicStream;
  skills: string[];
  description: string;
  proposalsCount: number;
}

const MOCK_GIGS: MicroProject[] = [
  // Tech & AI
  {
    id: 'GIG-LLM-101',
    title: 'Deploy High-Throughput vLLM Model on AWS g5.2xlarge',
    client: 'Fintech Neo AI Lab',
    verifiedClient: true,
    budget: '₹65,000',
    duration: '10 Days',
    stream: 'tech_ai',
    skills: ['vLLM', 'Docker', 'AWS CUDA', 'FastAPI'],
    description: 'Set up an inference endpoint serving Qwen2.5-14B with PagedAttention and FP8 quantization.',
    proposalsCount: 6
  },
  {
    id: 'GIG-CUDA-102',
    title: 'CUDA Kernel Optimization for Custom Softmax Layer',
    client: 'DeepScale Systems',
    verifiedClient: true,
    budget: '₹75,000',
    duration: '12 Days',
    stream: 'tech_ai',
    skills: ['CUDA C++', 'Kernel Fusion', 'GPU Memory', 'Triton'],
    description: 'Optimize multi-head attention softmax kernel reducing memory coalescing stalls on Hopper architectures.',
    proposalsCount: 4
  },

  // Commerce & Finance
  {
    id: 'GIG-FIN-404',
    title: 'Dynamic DCF Sensitivity Table for Series-B SaaS Financial Model',
    client: 'VentureHorizon Partners',
    verifiedClient: true,
    budget: '₹50,000',
    duration: '1 Week',
    stream: 'commerce_finance',
    skills: ['DCF Modeling', 'Excel / Python', 'Valuation'],
    description: 'Build automated Monte Carlo simulation grid showing revenue multiple outcomes under varied discount rates.',
    proposalsCount: 3
  },
  {
    id: 'GIG-FIN-405',
    title: 'Basel III Risk-Weighted Assets & Capital Adequacy Calculator',
    client: 'NeoBank Securities',
    verifiedClient: true,
    budget: '₹60,000',
    duration: '10 Days',
    stream: 'commerce_finance',
    skills: ['Basel III', 'Capital Adequacy', 'Python Pandas', 'Credit Risk'],
    description: 'Build automated regulatory capital computation module conforming to RBI Master Directions on capital adequacy.',
    proposalsCount: 5
  },

  // Healthcare & Bio
  {
    id: 'GIG-BIO-501',
    title: 'NAMASTE Morbidity Terminology to WHO ICD-11 Dual-Crosswalk',
    client: 'Ayush Telemedicine Council',
    verifiedClient: true,
    budget: '₹55,000',
    duration: '2 Weeks',
    stream: 'healthcare_bio',
    skills: ['NAMASTE Ontology', 'ICD-11 TM2', 'Medical Informatics', 'Biostatistics'],
    description: 'Map 120 traditional herbal formulations and clinical morbidity terms to WHO ICD-11 Chapter 2 classifications.',
    proposalsCount: 2
  },
  {
    id: 'GIG-BIO-502',
    title: 'Kaplan-Meier Survival Curve Generator for Observational Trial',
    client: 'BioStat ClinTech',
    verifiedClient: true,
    budget: '₹48,000',
    duration: '8 Days',
    stream: 'healthcare_bio',
    skills: ['Kaplan-Meier', 'R / Bioconductor', 'Log-Rank Test', 'GCP'],
    description: 'Construct automated statistical report computing hazard ratios and confidence intervals across 500 patient records.',
    proposalsCount: 4
  },

  // Law & Governance
  {
    id: 'GIG-AUDIT-202',
    title: 'DPDP Act 2023 Consent Banner & Audit Trail Implementation',
    client: 'HealthSovereign Cloud',
    verifiedClient: true,
    budget: '₹40,000',
    duration: '1 Week',
    stream: 'law_governance',
    skills: ['DPDP Act 2023', 'Consent Manager', 'Section 8 Notice', 'Tech Law'],
    description: 'Build statutory consent ledger recording tamper-proof user data preferences with cryptographic timestamps.',
    proposalsCount: 4
  },
  {
    id: 'GIG-LAW-203',
    title: 'SaaS Master Services Agreement (MSA) & DPA Statutory Review',
    client: 'GovTech Advisory',
    verifiedClient: true,
    budget: '₹45,000',
    duration: '5 Days',
    stream: 'law_governance',
    skills: ['Contract Drafting', 'DPA Terms', 'Data Transfer Clauses', 'IP Law'],
    description: 'Review and redline enterprise cloud agreement aligning liability caps and breach notification windows with Indian laws.',
    proposalsCount: 3
  },

  // UI/UX Design
  {
    id: 'GIG-DESIGN-303',
    title: 'Figma Design System WCAG 2.2 AA Contrast Rectification',
    client: 'EdTech Scaler Labs',
    verifiedClient: true,
    budget: '₹35,000',
    duration: '5 Days',
    stream: 'ui_ux',
    skills: ['WCAG 2.2', 'Figma Tokens', 'UI/UX Design'],
    description: 'Audit 60+ responsive web components and deliver compliant high-contrast color token variables.',
    proposalsCount: 8
  },
  {
    id: 'GIG-DESIGN-304',
    title: 'VisionOS Spatial UI Design Tokens & Ergonomic Asset Prep',
    client: 'SpatialDesk Interactive',
    verifiedClient: true,
    budget: '₹55,000',
    duration: '9 Days',
    stream: 'ui_ux',
    skills: ['Spatial UI', 'Design Tokens', 'Ergonomics', 'VisionOS'],
    description: 'Prepare multi-depth spatial tokens and accessible 3D interface components for clinical telemedicine headsets.',
    proposalsCount: 5
  }
];

export const Tab3FreelanceMarketplace: React.FC = () => {
  const { activeStudent, selectedStream } = useStudent();
  const [selectedGig, setSelectedGig] = useState<MicroProject | null>(null);
  const [generatedProposal, setGeneratedProposal] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [onlyMyField, setOnlyMyField] = useState(true);

  // Filter gigs strictly by student's disciplinary stream
  const disciplineGigs = onlyMyField 
    ? MOCK_GIGS.filter(g => g.stream === selectedStream) 
    : MOCK_GIGS;

  const tags = ['All', ...Array.from(new Set(disciplineGigs.flatMap(g => g.skills)))];

  const filteredGigs = selectedTag === 'All' 
    ? disciplineGigs 
    : disciplineGigs.filter(g => g.skills.includes(selectedTag));

  const handleOpenAiProposal = (gig: MicroProject) => {
    setSelectedGig(gig);
    setIsGenerating(true);
    setGeneratedProposal('');

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedProposal(
        `Dear ${gig.client},\n\nI am writing to express my strong interest in your micro-gig "${gig.title}". As a candidate verified in ${activeStudent.streamName}, my verified skills directly align with your requirements.\n\n` +
        `• Verified Benchmark Percentile: Top ${100 - activeStudent.compositeScore}% (${activeStudent.compositeScore}% Composite Score)\n` +
        `• Primary Competencies: ${gig.skills.join(', ')}\n` +
        `• Cryptographic ID: ${activeStudent.id}\n\n` +
        `I am available to commence work immediately and guarantee delivery within ${gig.duration}.\n\n` +
        `Best regards,\n${activeStudent.name}`
      );
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedProposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendProposal = () => {
    alert(`Proposal submitted to ${selectedGig?.client}! Escrow pre-allocated upon milestone verification.`);
    setSelectedGig(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-amber-50/40 dark:bg-slate-900">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TAB 3 • VERIFIED FREELANCE MARKETPLACE</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Build Real Industry Experience & Earnings Prior to Graduation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Micro-projects curated by skill tag, featuring 1-click benchmark-backed AI proposal generation and an immutable reputation ledger.
          </p>
        </div>
      </div>

      {/* Reputation Ledger Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Total Verified Earnings</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">₹1,85,000</div>
          <div className="text-[10px] text-slate-500">Escrow settled via smart contract</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Client Satisfaction Rating</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
            4.95 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-500">Based on 14 completed micro-gigs</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">On-Time Delivery Rate</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">100%</div>
          <div className="text-[10px] text-slate-500">Zero deadline breaches</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Platform Reputation Tier</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">Top Rated Plus</div>
          <div className="text-[10px] text-slate-500">Verified Sovereign Badge Active</div>
        </div>
      </div>

      {/* Filter by skill tag & discipline */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
        <button
          onClick={() => setOnlyMyField(!onlyMyField)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
            onlyMyField 
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-600/20 dark:text-amber-300 dark:border-amber-500/30 shadow-sm' 
              : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-white/[0.08]'
          }`}
        >
          {onlyMyField ? `✓ Only ${activeStudent.streamName}` : 'Showing All Disciplines'}
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">Tags:</span>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTag === tag 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gigs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGigs.map((gig) => (
          <div
            key={gig.id}
            className="glass-panel p-6 rounded-2xl hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between shadow-sm hover:shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-slate-700">
                  {gig.id}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {gig.duration}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                {gig.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{gig.client}</span>
                {gig.verifiedClient && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-500/30">
                    <ShieldCheck className="w-3 h-3" /> Verified Client
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{gig.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {gig.skills.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Fixed Budget</div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">{gig.budget}</div>
              </div>

              <button
                onClick={() => handleOpenAiProposal(gig)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all active:scale-95"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Proposal Generator</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Proposal Generator Modal */}
      {selectedGig && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-7 border space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Proposal Generator</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Benchmark-backed, personalized pitch for {selectedGig.id}</p>
              </div>
              <button
                onClick={() => setSelectedGig(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {isGenerating ? (
              <div className="p-8 flex flex-col items-center justify-center space-y-2">
                <Cpu className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-spin" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Synthesizing verified benchmarks & project tokens...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={generatedProposal}
                  onChange={(e) => setGeneratedProposal(e.target.value)}
                  rows={10}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-slate-200 font-mono focus:outline-none focus:border-amber-500 leading-relaxed"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Pre-verified benchmark stats automatically embedded
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedGig(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendProposal}
                disabled={isGenerating}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Proposal</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
