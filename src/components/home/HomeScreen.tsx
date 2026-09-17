import React, { useState, useEffect } from 'react';
import { UserRole, AcademicStream } from '../../types';
import { useStudent } from '../../context/StudentContext';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Landmark, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  BarChart3, 
  ChevronDown,
  Cpu,
  TrendingUp,
  Activity,
  Scale,
  Palette,
  Layers,
  Globe,
  Terminal,
  Award,
  Play,
  ArrowUpRight,
  Sliders,
  Check,
  RefreshCw
} from 'lucide-react';

interface HomeScreenProps {
  onSelectRole: (role: UserRole) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectRole }) => {
  const { allStudents, selectedStream, setStudentStream, activeStudent } = useStudent();
  const [activeTabField, setActiveTabField] = useState<AcademicStream>(selectedStream);
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [activeArchitectureStep, setActiveArchitectureStep] = useState<number>(1);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Rotating target disciplines for animated hero text
  const rotatingDisciplines = [
    { title: 'Tech & AI Engineers', institute: 'IIT Bombay', color: 'from-indigo-500 to-cyan-500' },
    { title: 'FinTech & Finance Scholars', institute: 'SRCC Delhi', color: 'from-emerald-500 to-teal-500' },
    { title: 'Ayush & Medical Practitioners', institute: 'AIIMS & AIIA New Delhi', color: 'from-amber-500 to-orange-500' },
    { title: 'Corporate Law Specialists', institute: 'NLSIU Bengaluru', color: 'from-purple-500 to-indigo-500' },
    { title: 'UI/UX & HCI Designers', institute: 'NID Ahmedabad', color: 'from-pink-500 to-rose-500' }
  ];

  // Cycle rotating disciplines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDisciplineIndex((prev) => (prev + 1) % rotatingDisciplines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingDisciplines.length]);

  const handleSelectStudentField = (streamId: AcademicStream) => {
    setActiveTabField(streamId);
    setStudentStream(streamId);
  };

  const handleLaunchStudent = () => {
    setStudentStream(activeTabField);
    onSelectRole('student');
  };

  const handleScrollToPortals = () => {
    const el = document.getElementById('portal-selection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const disciplineDetails: Record<AcademicStream, { icon: React.ReactNode; institute: string; color: string }> = {
    tech_ai: {
      icon: <Cpu className="w-4 h-4 text-indigo-500" />,
      institute: 'IIT Bombay • Dept of CSE',
      color: 'indigo'
    },
    commerce_finance: {
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      institute: 'SRCC Delhi • Finance & FinTech',
      color: 'emerald'
    },
    healthcare_bio: {
      icon: <Activity className="w-4 h-4 text-amber-500" />,
      institute: 'AIIMS & AIIA New Delhi • Ayush & Bio-Health',
      color: 'amber'
    },
    law_governance: {
      icon: <Scale className="w-4 h-4 text-purple-500" />,
      institute: 'NLSIU Bengaluru • Corporate Law',
      color: 'purple'
    },
    ui_ux: {
      icon: <Palette className="w-4 h-4 text-pink-500" />,
      institute: 'NID Ahmedabad • Interaction Design',
      color: 'pink'
    }
  };

  const architectureSteps = [
    {
      step: 1,
      title: 'Proctored 40-40-20 Evaluation Engine',
      badge: 'Skill Diagnostic',
      desc: 'Synthesizes 40% proctored sandbox coding/case execution, 40% DigiLocker verified portfolio vector, and 20% peer-validated competency index.',
      metric: '0-100 Quantified Score',
      icon: <Terminal className="w-5 h-5 text-indigo-500" />
    },
    {
      step: 2,
      title: 'OpenCV Error Level Analysis (ELA)',
      badge: 'Forensic Audit',
      desc: 'Automated 16-pass pixel compression inspection detecting digital mark-sheet alterations, spliced CGPA certificates, and degree fraud.',
      metric: '99.98% Tamper Detection',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      step: 3,
      title: 'Gale-Shapley Stable Placement Dispatch',
      badge: 'Algorithmic Matching',
      desc: 'Game-theoretic multi-agent matching matching top verified candidates directly to recruiter threshold cutoffs without manual bias.',
      metric: 'Zero Pareto Inefficiency',
      icon: <Zap className="w-5 h-5 text-cyan-500" />
    }
  ];

  return (
    <div className="space-y-16 py-4 sm:py-8 max-w-6xl mx-auto animate-fadeIn relative">
      
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-96 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SECTION 1: HERO WELCOME BANNER */}
      <div className="text-center space-y-6 relative pt-2 sm:pt-4">
        
        {/* Top Sovereign Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/15 dark:border-indigo-500/30 dark:text-indigo-300 text-xs sm:text-sm font-bold shadow-sm transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 animate-spin-slow" />
          <span>National Sovereign Talent & Placement Substrate</span>
        </div>

        {/* Dynamic Hero Title with Rotating Discipline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-tight">
          Empowering Next-Gen <br className="hidden sm:inline" />
          <span className={`bg-gradient-to-r ${rotatingDisciplines[currentDisciplineIndex].color} bg-clip-text text-transparent transition-all duration-500 inline-block`}>
            {rotatingDisciplines[currentDisciplineIndex].title}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          CareerLens unifies Students, Institutions, Recruiters, and Government Regulators into one 
          cryptographically verifiable competency network powered by 0–100 ATS diagnostics and automated placement matching.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToPortals}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Launch Portal Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowDemoModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#121828] hover:bg-slate-100 dark:hover:bg-[#1a2338] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/[0.1] font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 fill-indigo-600 dark:fill-cyan-400" />
            <span>Platform Overview</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-indigo-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group">
            <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">75% Faster Hiring</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">40-40-20 Composite Vector</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-emerald-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group">
            <ShieldCheck className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">0% Credential Fraud</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">OpenCV ELA Forensic Scan</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-purple-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group">
            <BarChart3 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">85% Audit Savings</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">1-Click NIRF / NAAC 5.2.1</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-cyan-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group">
            <Lock className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Statutory Privacy</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">India DPDP Act 2023 Guardrails</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: INTERACTIVE CORE SUBSTRATE ARCHITECTURE */}
      <div className="space-y-6 glass-panel p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-indigo-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 mb-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE ARCHITECTURE ENGINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">How CareerLens Substrate Works</h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
            {architectureSteps.map((item) => (
              <button
                key={item.step}
                onClick={() => setActiveArchitectureStep(item.step)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeArchitectureStep === item.step
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pillar {item.step}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Architecture Pillar Detail */}
        {architectureSteps.map((pillar) => {
          if (pillar.step !== activeArchitectureStep) return null;
          return (
            <div key={pillar.step} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2 animate-fadeIn">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">{pillar.badge}</span>
                    <h4 className="text-lg font-extrabold text-white">{pillar.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col justify-center items-center text-center space-y-2">
                <span className="text-xs text-slate-400 uppercase font-mono">Telemetry Outcome</span>
                <span className="text-2xl font-black text-emerald-400">{pillar.metric}</span>
                <span className="text-[11px] text-slate-400 font-normal">Validated Real-Time</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: PORTAL SELECTION GRID */}
      <div id="portal-selection" className="space-y-8 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Select Stakeholder Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Choose your role to enter your dedicated interactive command workspace
          </p>
        </div>

        {/* 4 Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* PORTAL 1: STUDENT & JOB SEEKER */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/40 dark:border-indigo-500/50 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500 transition-all duration-300 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/40 dark:from-[#0b1020] dark:via-[#0e1628] dark:to-[#0b1020] group">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  Multi-Disciplinary
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Student & Job Seeker
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Proctored 40-40-20 sandboxes, ATS diagnostics, freelance marketplace & DigiLocker living resume
                </p>
              </div>

              {/* Discipline Switcher Dropdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Select Academic Field:</span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400 font-bold">
                    5 Disciplines
                  </span>
                </label>

                <div className="relative">
                  <select
                    value={activeTabField}
                    onChange={(e) => handleSelectStudentField(e.target.value as AcademicStream)}
                    className="w-full px-4 py-3 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#0c1222] text-slate-900 dark:text-white font-bold text-xs shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer appearance-none pr-10"
                  >
                    {allStudents.map((stu) => (
                      <option key={stu.id} value={stu.streamId}>
                        {stu.streamName} • {stu.name} ({stu.compositeScore}/100)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Candidate Summary & Action */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0d1424] border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <div className="flex items-center gap-2 truncate">
                  {disciplineDetails[activeTabField]?.icon}
                  <span className="truncate">{activeStudent.name}</span>
                </div>
                <span className="text-xs font-mono font-black text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 shrink-0">
                  {activeStudent.compositeScore}/100
                </span>
              </div>

              <button
                type="button"
                onClick={handleLaunchStudent}
                className="w-full py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-indigo-500"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* PORTAL 2: COLLEGE PLACEMENT CELL (TPO) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 dark:from-[#081512] dark:via-[#0c1a16] dark:to-[#081512] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  Institutional
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  College Placement Cell (TPO)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Institutional TPO Command Center for deans and placement officers
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Branch-by-Branch Cohort Skill Heatmaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>1-Click NIRF & NAAC 5.2.1 Audit Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>OpenCV ELA Marksheet Fraud Inspector</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRole('college')}
              className="w-full py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-emerald-500"
            >
              <span>Launch TPO Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 3: CORPORATE RECRUITER */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-amber-500/20 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-[#161208] dark:via-[#1c170b] dark:to-[#161208] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/20 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Employers
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Corporate Recruiter
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Corporate Talent Console with pre-verified talent pipeline
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>40-40-20 Composite AI Scoring Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>OpenCV ELA Forensic Fraud Audit Viewer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Gale-Shapley Stable Matching Algorithm</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRole('recruiter')}
              className="w-full py-3 px-5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-amber-500"
            >
              <span>Enter Recruiter Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 4: GOVERNMENT & POLICY OBSERVATORY */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 hover:border-rose-500/60 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-rose-500/20 transition-all duration-300 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40 dark:from-[#18090d] dark:via-[#200d12] dark:to-[#18090d] group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                  Regulatory
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Government & AICTE
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  National Talent & Policy Observatory for AICTE & Ministry of Ayush
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>State-Wise Skill Deficit Heatmap (Supply/Demand)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>National Ayush Observatory (NAMASTE to ICD-11)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Empirical NEP 2020 Syllabus Directives</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRole('government')}
              className="w-full py-3 px-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-rose-500"
            >
              <span>Access Policy Observatory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER GUARANTEE BADGE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-[#0c1222]/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-center text-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Backed by DigiLocker Sovereign Identity & India DPDP Act 2023 Statutory Guardrails</span>
      </div>

      {/* PLATFORM OVERVIEW MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1424] space-y-6 relative shadow-2xl border border-indigo-500/30">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">CareerLens</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Subtitle description */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                India's unified talent ecosystem for verified skills, AI hiring, and education-industry collaboration.
              </p>

              {/* 4 Workspace Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0" />
                    <span>Student Workspace</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Personalized learning, verified portfolios & career preparation.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>TPO Placement Console</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Smart campus placements, analytics & compliance management.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Corporate Recruiter</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Hire verified talent using AI-powered skill intelligence.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <Landmark className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>Policy Observatory</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Real-time skill demand, employment trends & policy insights.
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleScrollToPortals();
                }}
                className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
              >
                Explore Portals
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
