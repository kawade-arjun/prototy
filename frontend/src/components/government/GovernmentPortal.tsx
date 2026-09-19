import React, { useState } from 'react';
import { 
  Landmark, 
  Map, 
  AlertTriangle, 
  BookOpen, 
  Download, 
  ShieldCheck, 
  Globe2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Building2, 
  Lock, 
  Award, 
  Cpu, 
  Layers, 
  ExternalLink, 
  Check, 
  Flame, 
  Sliders, 
  Server, 
  Send,
  ChevronRight,
  Database,
  HeartPulse
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { 
  STATE_TELEMETRY_DATA, 
  StateTelemetry,
  NATIONAL_TALENT_REGISTRY, 
  NationalTalentRecord,
  NAMASTE_TO_ICD11_ONTOLOGY,
  MACRO_CURRICULUM_DIRECTIVES,
  COFUNDED_RND_PROJECTS 
} from '../../mock/governmentData';
import { NamasteIcd11Modal } from './NamasteIcd11Modal';
import { SovereignGrantModal } from './SovereignGrantModal';

export const GovernmentPortal: React.FC = () => {
  const { theme } = useTheme();

  // Sub-Tab Navigation
  type GovTab = 'state_heatmap' | 'national_registry' | 'ayush_observatory' | 'nep_curriculum' | 'rnd_grants' | 'sovereign_governance';
  const [activeTab, setActiveTab] = useState<GovTab>('state_heatmap');

  // State Heatmap Selection
  const [selectedStateCode, setSelectedStateCode] = useState<string>('MH');
  const selectedState = STATE_TELEMETRY_DATA.find(s => s.stateCode === selectedStateCode) || STATE_TELEMETRY_DATA[0];

  // National Registry Search & Filter
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryDisciplineFilter, setRegistryDisciplineFilter] = useState<'all' | 'ayush' | 'tech' | 'finance' | 'law'>('all');

  // Modals
  const [showNamasteModal, setShowNamasteModal] = useState(false);
  const [showGrantModal, setShowGrantModal] = useState(false);

  // Policy Gazette Generation
  const [isExportingGazette, setIsExportingGazette] = useState(false);

  // National Internship Portal Dispatch
  const [dispatchedCandidates, setDispatchedCandidates] = useState<string[]>([]);

  const handleExportGazette = () => {
    setIsExportingGazette(true);
    setTimeout(() => {
      setIsExportingGazette(false);
      alert('Official National Skill Deficit & NEP 2020 Vocational Directive Gazette published under Authority of AICTE & Ministry of Ayush.');
    }, 900);
  };

  const handleDispatchToNip = (candidateId: string) => {
    setDispatchedCandidates(prev => [...prev, candidateId]);
    alert(`Candidate ${candidateId} successfully pushed to AICTE National Internship Portal (NIP) and Central PSU Priority Gateway!`);
  };

  // Filter Registry
  const filteredRegistry = NATIONAL_TALENT_REGISTRY.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
      r.institution.toLowerCase().includes(registrySearch.toLowerCase()) ||
      r.state.toLowerCase().includes(registrySearch.toLowerCase());
    const matchesDisc = registryDisciplineFilter === 'all' ? true :
      registryDisciplineFilter === 'ayush' ? r.discipline.includes('Ayurveda') :
      registryDisciplineFilter === 'tech' ? r.discipline.includes('Computer Science') :
      registryDisciplineFilter === 'finance' ? r.discipline.includes('Finance') :
      r.discipline.includes('Law');
    return matchesSearch && matchesDisc;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* 1. NATIONAL TALENT & POLICY OBSERVATORY HERO BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xl space-y-4 border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-amber-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-rose-500" />
                NATIONAL TALENT & POLICY OBSERVATORY
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> MINISTRY OF AYUSH • AICTE • NEP 2020
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              State Skill Gap Telemetry, Sovereign Talent Registry & Curriculum Reforms
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              High-altitude regulatory engine providing real-time macro telemetry across <strong>480+ Ayush institutions</strong>, 38,400+ verified scholars, and 28 states to empirically drive the <strong>National Education Policy (NEP 2020)</strong>.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowNamasteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Globe2 className="w-4 h-4" />
              <span>WHO ICD-11 Crosswalk (SIH 26044)</span>
            </button>

            <button
              onClick={() => setShowGrantModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg shadow-rose-600/20 transition-all active:scale-95"
            >
              <Landmark className="w-4 h-4" />
              <span>Allocate Sovereign Grant</span>
            </button>

            <button
              onClick={handleExportGazette}
              disabled={isExportingGazette}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.08] text-xs font-bold transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingGazette ? 'Publishing...' : 'Export AICTE Gazette'}</span>
            </button>
          </div>

        </div>

        {/* Hero KPI Summary Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ayush Scholars Monitored</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">38,400+ Verified</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Across 480+ BAMS, MD colleges</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ghost Placement Deficit</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">0.0% Fake Claims</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">100% DigiLocker PKI degree sealed</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry Co-Funded R&D</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">₹48.2 Cr Grants</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Active across 42 collaborative projects</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Indian Cloud Residency</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">100% Sovereign</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">MeitY Empaneled • DPDP Act 2023</div>
          </div>
        </div>

      </div>

      {/* 2. SUB-TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('state_heatmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'state_heatmap'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>State Skill Deficit Heatmap & Grants</span>
        </button>

        <button
          onClick={() => setActiveTab('national_registry')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'national_registry'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Unified National Talent Registry (NIP & PSUs)</span>
        </button>

        <button
          onClick={() => setActiveTab('ayush_observatory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'ayush_observatory'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>Ayush Talent Observatory (SIH 26044)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-black">WHO</span>
        </button>

        <button
          onClick={() => setActiveTab('nep_curriculum')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'nep_curriculum'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Empirical NEP 2020 Curriculum Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('rnd_grants')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'rnd_grants'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Co-Funded R&D Tracker (₹48.2 Cr)</span>
        </button>

        <button
          onClick={() => setActiveTab('sovereign_governance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            activeTab === 'sovereign_governance'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 border-rose-600'
              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Sovereign Cloud & DPDP Compliance</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: STATE-WISE SKILL DEFICIT HEATMAP & TARGETED GRANTS */}
      {/* ========================================================================= */}
      {activeTab === 'state_heatmap' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>State-Wise Skill Deficit Heatmap & Supply-Demand Radar</span>
              </h2>
              <p className="text-xs text-slate-500">
                Live geographic radar of India tracking where talent shortages exist versus where corporate demand is surging.
              </p>
            </div>

            <button
              onClick={() => setShowGrantModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 active:scale-95 transition-all shrink-0"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Allocate Targeted Sovereign Grant</span>
            </button>
          </div>

          {/* Interactive State Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATE_TELEMETRY_DATA.map((st) => {
              const isSelected = selectedStateCode === st.stateCode;
              const isCritical = st.deficitSeverity === 'Critical Deficit';

              return (
                <div
                  key={st.stateCode}
                  onClick={() => setSelectedStateCode(st.stateCode)}
                  className={`glass-panel p-5 rounded-2xl cursor-pointer transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-3.5 border ${
                    isSelected
                      ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20'
                      : 'hover:border-rose-400 dark:hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {st.stateCode}
                        </span>
                        <span className="font-black text-slate-900 dark:text-white text-base">
                          {st.stateName}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isCritical
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                          : st.gapPercent < 0
                            ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                      }`}>
                        {st.gapPercent > 0 ? `+${st.gapPercent}% Surplus` : `${st.gapPercent}% Deficit`}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Major Hub: <strong>{st.majorHub}</strong>
                    </div>

                    {/* Identified Deficit */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                      <div className="text-[9px] uppercase font-bold text-slate-400">Identified Critical Shortage</div>
                      <div className="text-xs font-extrabold text-rose-600 dark:text-rose-400 leading-snug">
                        {st.identifiedDeficit}
                      </div>
                    </div>

                    {/* Telemetry Numbers */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400">Institutions:</span>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{st.institutionCount} Monitored</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Verified Scholars:</span>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{st.verifiedScholarsCount.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Top Deficit Skills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {st.topDeficitSkills.map((sk, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 text-[11px]">{st.recommendedGrant}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStateCode(st.stateCode);
                        setShowGrantModal(true);
                      }}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <span>Grant Action</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: UNIFIED NATIONAL TALENT REGISTRY (NIP & PSUs) */}
      {/* ========================================================================= */}
      {activeTab === 'national_registry' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm border border-amber-500/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                    SINGLE SOVEREIGN TALENT SUBSTRATE
                  </span>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    AICTE National Internship Portal (NIP) Synced ✓
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Unified National Talent Registry & Zero Ghost Placement Ledger
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Consolidating verified candidate competency vectors from higher education institutions across India into one tamper-proof national database, preventing fraudulent placement claims.
                </p>
              </div>

              {/* Discipline Filter */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-bold mr-1">Discipline:</span>
                {[
                  { id: 'all', label: 'All Disciplines' },
                  { id: 'ayush', label: 'Ayush & Bio' },
                  { id: 'tech', label: 'Engineering' },
                  { id: 'finance', label: 'Finance' },
                  { id: 'law', label: 'Law & Policy' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setRegistryDisciplineFilter(f.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                      registryDisciplineFilter === f.id
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by scholar name, university, or state..."
                value={registrySearch}
                onChange={(e) => setRegistrySearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Registry Table */}
          <div className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Scholar & State</th>
                    <th className="p-3">Academic Institution</th>
                    <th className="p-3">Proctored Sandbox</th>
                    <th className="p-3">Placement Verification</th>
                    <th className="p-3">DigiLocker Hash</th>
                    <th className="p-3">AICTE NIP / PSU Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {filteredRegistry.map((scholar) => {
                    const isDispatched = dispatchedCandidates.includes(scholar.id);

                    return (
                      <tr key={scholar.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-white">{scholar.name}</div>
                          <div className="text-[11px] text-slate-500">{scholar.discipline} • {scholar.state}</div>
                          {scholar.namasteIcd11Certified && (
                            <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                              WHO ICD-11 Certified ✓
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-slate-700 dark:text-slate-300">
                          {scholar.institution}
                        </td>

                        <td className="p-3 font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                          {scholar.proctoredSandboxScore}%
                        </td>

                        <td className="p-3">
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{scholar.placementStatus}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                            {scholar.recruiterOrAgency}
                          </div>
                        </td>

                        <td className="p-3 font-mono text-[10px] text-slate-400">
                          {scholar.offerVerificationHash}
                        </td>

                        <td className="p-3">
                          {isDispatched ? (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Pushed to NIP ✓
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDispatchToNip(scholar.id)}
                              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] shadow-sm transition-all active:scale-95"
                            >
                              Dispatch to NIP / PSU
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: AYUSH TALENT OBSERVATORY (SIH PS 26044) */}
      {/* ========================================================================= */}
      {activeTab === 'ayush_observatory' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  SMART INDIA HACKATHON PROBLEM STATEMENT 26044
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  National Ayush & Multi-Disciplinary Talent Observatory
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Monitoring 480+ Ayush institutions and 38,400+ scholars. Bridging classical Indian medicine (NAMASTE portal) with global WHO standards (ICD-11 TM-2).
                </p>
              </div>

              <button
                onClick={() => setShowNamasteModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all shrink-0"
              >
                <Globe2 className="w-4 h-4" />
                <span>Launch Dual-Ontology Crosswalk</span>
              </button>
            </div>

            {/* Ayush Observatory Metric Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Registered Ayush Colleges</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">480+</div>
                <div className="text-[10px] text-slate-500">BAMS, MD, Siddha, Unani</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Verified Ayush Scholars</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">38,400+</div>
                <div className="text-[10px] text-slate-500">100% Sovereign Registry Verified</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">ICD-11 Certified Graduates</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">16,230</div>
                <div className="text-[10px] text-slate-500">Globally Employable Underwriters</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">WHO GCTM Research Hubs</div>
                <div className="text-2xl font-black text-amber-500">14 Centres</div>
                <div className="text-[10px] text-slate-500">Linked to Jamnagar WHO Centre</div>
              </div>
            </div>
          </div>

          {/* NAMASTE-to-ICD-11 Preview Snippet */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Live NAMASTE ➔ WHO ICD-11 Traditional Medicine Module 2 Standardized Registry
              </h3>
              <button
                onClick={() => setShowNamasteModal(true)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View Full 4-Category Crosswalk
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {NAMASTE_TO_ICD11_ONTOLOGY.slice(0, 2).map((item) => (
                <div key={item.namasteCode} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black text-slate-900 dark:text-white">{item.namasteTerm}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                      {item.icd11Tm2Code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.ayurvedaConcept}</p>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                    {item.certifiedScholarsCount.toLocaleString()} Indian Scholars Certified for Global Practice
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: EMPIRICAL NEP 2020 CURRICULUM RADAR */}
      {/* ========================================================================= */}
      {activeTab === 'nep_curriculum' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                  NATIONAL EDUCATION POLICY (NEP 2020) REFORM ENGINE
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Empirical Macro Syllabus Gap Reports & Directives
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Replacing 3-to-5-year anecdotal meetings with real-time empirical telemetry comparing corporate hiring demands against university course syllabi.
                </p>
              </div>

              <button
                onClick={handleExportGazette}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Issue National AICTE Directive</span>
              </button>
            </div>

            {/* Directives List */}
            <div className="space-y-3 pt-2">
              {MACRO_CURRICULUM_DIRECTIVES.map((d) => (
                <div
                  key={d.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">{d.id}</span>
                      <h3 className="font-black text-slate-900 dark:text-white text-sm">
                        {d.discipline} ➔ {d.nepTrack}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">
                        Demand: {d.industryDemandGrowth}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">
                        {d.mandatoryCredits} Mandatory NEP Credits
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="text-[10px] font-bold uppercase text-slate-400">Widening Deficit Telemetry</div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{d.wideningGapDescription}</p>
                      <div className="text-[10px] text-rose-500 font-bold">{d.academicSyllabusCoverage}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                      <div className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">AICTE Action Directive</div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{d.aiCTEActionDirective}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: CO-FUNDED R&D GRANTS TRACKER & AICTE 360° */}
      {/* ========================================================================= */}
      {activeTab === 'rnd_grants' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  INDUSTRY-GOVERNMENT CO-FUNDED INNOVATION BOUNTIES
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Active R&D Bounties Tracker: ₹48.2 Cr across 42 Projects
                </h2>
                <p className="text-xs text-slate-500">
                  Monitoring joint public-private research partnerships with automated AICTE 360° faculty accreditation point credits.
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-lg">
                100% Matched Corporate Funding
              </span>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {COFUNDED_RND_PROJECTS.map((proj) => {
                const progressPct = Math.round((proj.milestonesCompleted / proj.totalMilestones) * 100);

                return (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3.5 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          {proj.industryPartner}
                        </span>
                        <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                          {proj.totalGrant}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">
                        {proj.title}
                      </h3>

                      <div className="text-xs text-slate-500">
                        Lead Campus: <strong>{proj.leadInstitution}</strong> ({proj.state})
                      </div>

                      {/* Funding Split */}
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Govt Grant:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{proj.governmentShare}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Corporate Share:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{proj.industryShare}</span>
                        </div>
                      </div>

                      {/* Milestone Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-500">Milestone Progress:</span>
                          <span className="font-mono text-amber-600 dark:text-amber-400">{proj.milestonesCompleted} / {proj.totalMilestones} Completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-600 rounded-full" style={{ width: `${progressPct}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px]">
                      <span className="text-emerald-600 font-bold">+{proj.aicte360Points} AICTE 360° Points</span>
                      {proj.patentFiled ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">Patent Filed ✓</span>
                      ) : (
                        <span className="text-slate-400">Patent in Progress</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 6: SOVEREIGN CLOUD & DPDP ACT 2023 GOVERNANCE */}
      {/* ========================================================================= */}
      {activeTab === 'sovereign_governance' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm border border-amber-500/20">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-500" />
              <span>Sovereign Cloud Residency & DPDP Act 2023 Statutory Compliance</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-xs">100% Indian Data Residency</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  All candidate marksheets, competency vectors, and corporate hiring telemetry are stored exclusively within MeitY-empaneled Indian cloud availability zones (NIC MeghRaj / AWS ap-south-1 Mumbai / CtrlS).
                </p>
                <div className="text-[10px] font-mono font-bold text-emerald-600">Sovereign Boundary Enforced ✓</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-xs">Zero Invasive Biometrics</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Proctoring strictly complies with Indian privacy laws by monitoring non-invasive behavioral telemetry (paste interception, focus tab blur) rather than capturing intrusive persistent facial or biometric recordings.
                </p>
                <div className="text-[10px] font-mono font-bold text-emerald-600">Privacy-First Architecture ✓</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-xs">Role-Gated Sovereign Login</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Access is strictly gated via MeriPehchaan / Parichay National SSO with mandatory hardware multi-factor authentication (MFA) for authorized ministry directors and statutory inspectors.
                </p>
                <div className="text-[10px] font-mono font-bold text-emerald-600">MeriPehchaan SSO Active ✓</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. NAMASTE-to-ICD-11 Dual-Ontology Modal */}
      {showNamasteModal && (
        <NamasteIcd11Modal onClose={() => setShowNamasteModal(false)} />
      )}

      {/* 2. Targeted Sovereign Grant Modal */}
      {showGrantModal && (
        <SovereignGrantModal
          initialStateCode={selectedStateCode}
          onClose={() => setShowGrantModal(false)}
        />
      )}

    </div>
  );
};
