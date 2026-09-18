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
  Terminal,
  Play,
  Compass,
  Target,
  PieChart,
  FileCheck
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
  const [activeExploreRole, setActiveExploreRole] = useState<'student' | 'college' | 'recruiter' | 'government'>('student');

  const handleExploreStakeholder = (role: 'student' | 'college' | 'recruiter' | 'government') => {
    setActiveExploreRole(role);
    setTimeout(() => {
      const el = document.getElementById('stakeholder-deep-dive');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Rotating target disciplines for animated hero text
  const rotatingDisciplines = [
    { title: 'Engineering Scholars', institute: 'IIT Bombay', color: 'from-indigo-500 to-cyan-500' },
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


  const architectureSteps = [
    {
      step: 1,
      title: 'Proctored Evaluation Engine',
      badge: 'Skill Diagnostic',
      desc: 'Synthesizes proctored sandbox execution, DigiLocker verified portfolio vectors, and peer-validated competency indices.',
      metric: 'Quantified Skill Matrix',
      icon: <Terminal className="w-5 h-5 text-indigo-400" />
    },
    {
      step: 2,
      title: 'OpenCV Error Level Analysis (ELA)',
      badge: 'Forensic Audit',
      desc: 'Automated multi-pass pixel compression inspection detecting digital mark-sheet alterations, spliced CGPA certificates, and degree fraud.',
      metric: 'Tamper-Proof Verification',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      step: 3,
      title: 'Gale-Shapley Stable Placement Dispatch',
      badge: 'Algorithmic Matching',
      desc: 'Game-theoretic multi-agent matching pairing verified candidates directly to recruiter threshold cutoffs without manual bias.',
      metric: 'Optimal Candidate Matching',
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <div className="space-y-16 py-4 sm:py-8 max-w-6xl mx-auto animate-fadeIn relative">
      
      {/* 3D DYNAMIC ISOMETRIC BACKGROUND MESH & FLOATING 3D SPHERES */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Optimized Ambient Glowing Floating Orbs */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-2xl sm:blur-3xl transform-gpu" />
        <div className="absolute top-72 -left-20 w-60 sm:w-80 h-60 sm:h-80 bg-indigo-600/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none transform-gpu hidden sm:block" />
        <div className="absolute top-[600px] -right-20 w-60 sm:w-96 h-60 sm:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none transform-gpu hidden sm:block" />
      </div>

      {/* SECTION 1: HERO WELCOME BANNER */}
      <div className="text-center space-y-6 relative pt-2 sm:pt-4">
        
        {/* Top Sovereign Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-extrabold shadow-sm transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 animate-spin-slow" />
          <span className="uppercase tracking-widest text-[11px] font-mono">National Sovereign Talent & Placement Substrate</span>
        </div>

        {/* Dynamic Hero Title with Rotating Discipline */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-tight">
          Empowering Next-Gen <br className="hidden sm:inline" />
          <span className={`bg-gradient-to-r ${rotatingDisciplines[currentDisciplineIndex].color} bg-clip-text text-transparent transition-all duration-500 inline-block font-sans font-black italic`}>
            {rotatingDisciplines[currentDisciplineIndex].title}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          CareerLens unifies Students, Institutions, Recruiters, and Government Regulators into one 
          verifiable competency network powered by real-time skill diagnostics and transparent placement matching.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToPortals}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-amber-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Launch Portal Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowDemoModal(true)}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white dark:bg-[#121828] hover:bg-amber-50 dark:hover:bg-[#1a2338] text-slate-800 dark:text-slate-200 border border-[#D9D0C1] dark:border-amber-500/30 font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
            <span>Platform Overview</span>
          </button>
        </div>

        {/* Feature Highlights Grid (Clean text with luxury formatting) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0e1424]/90 border border-[#E5DFD3] dark:border-amber-500/20 shadow-sm hover:border-amber-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Accelerated AI Hiring</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Skill Intelligence Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0e1424]/90 border border-[#E5DFD3] dark:border-amber-500/20 shadow-sm hover:border-emerald-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <ShieldCheck className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Tamper-Proof Verification</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">OpenCV ELA Forensic Scan</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0e1424]/90 border border-[#E5DFD3] dark:border-amber-500/20 shadow-sm hover:border-purple-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <BarChart3 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Automated Compliance</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">NIRF & NAAC Audit Reporting</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0e1424]/90 border border-[#E5DFD3] dark:border-amber-500/20 shadow-sm hover:border-amber-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Statutory Privacy</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">India DPDP Act 2023 Guardrails</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: INTERACTIVE CORE SUBSTRATE ARCHITECTURE (ADAPTIVE LUXURY GLASSMORPHIC THEME) */}
      <div className="space-y-6 rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 dark:from-[#0b101f] dark:via-[#0e1528] dark:to-[#0b101f] border-2 border-amber-200/80 dark:border-amber-500/30 p-6 sm:p-8 relative overflow-hidden shadow-xl transition-colors">
        {/* Glow accent in top right */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 dark:border-amber-500/20 pb-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-mono font-extrabold border border-amber-500/30 mb-2.5">
              <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>CORE ARCHITECTURE ENGINE</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How CareerLens Substrate Works</h3>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-[#070d1a]/80 p-1.5 rounded-2xl border border-[#E5DFD3] dark:border-amber-500/25 shadow-inner">
            {architectureSteps.map((item) => (
              <button
                key={item.step}
                onClick={() => setActiveArchitectureStep(item.step)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeArchitectureStep === item.step
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-slate-800'
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
            <div key={pillar.step} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2 animate-fadeIn relative z-10">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-md shadow-amber-600/30 shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">{pillar.badge}</span>
                    <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{pillar.title}</h4>
                  </div>
                </div>
                
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed bg-white/90 dark:bg-[#121b33] p-5 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm">
                  {pillar.desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#121b33] border-2 border-amber-200 dark:border-amber-500/30 flex flex-col justify-center items-center text-center space-y-2.5 shadow-md">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Platform Capability</span>
                <span className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-4 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60">
                  {pillar.metric}
                </span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Verified System Substrate</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: PORTAL SELECTION GRID (LUXURY ESTATE CARD SHOWCASE) */}
      <div id="portal-selection" className="space-y-6 pt-6 border-t border-[#E5DFD3] dark:border-amber-500/20">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Select Stakeholder Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Choose your role to enter your dedicated interactive command workspace
          </p>
        </div>

        {/* 4 Portal Cards Grid (Compact & Sleek Sizing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* PORTAL 1: STUDENT & JOB SEEKER */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 dark:border-amber-500/40 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-amber-500/20 hover:border-amber-500 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-amber-100/30 dark:from-[#0d1322] dark:via-[#11192b] dark:to-[#0d1322] group">
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-md shadow-amber-600/30 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Multi-Disciplinary
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Student & Job Seeker
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Proctored sandboxes, ATS diagnostics, freelance marketplace & DigiLocker living resume
                </p>
              </div>

              {/* Feature Highlights List */}
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-[#E5DFD3] dark:border-amber-500/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Proctored Sandboxes & 0–100 Competency Index</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>ATS Resume Diagnostic Studio & AI Skill Gap Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>DigiLocker Living Resume & Verified Credential Ledger</span>
                </li>
              </ul>
            </div>

            {/* Discipline Dropdown & Dual Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Select Academic Field:</span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold">
                    5 Disciplines
                  </span>
                </label>

                <div className="relative">
                  <select
                    value={activeTabField}
                    onChange={(e) => handleSelectStudentField(e.target.value as AcademicStream)}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-white dark:bg-[#0c1222] text-slate-900 dark:text-white font-bold text-xs shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer appearance-none pr-10"
                  >
                    {allStudents.map((stu) => (
                      <option key={stu.id} value={stu.streamId}>
                        {stu.streamName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleExploreStakeholder('student')}
                  className="py-2.5 px-3 rounded-full bg-white dark:bg-[#101728] border border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Explore Overview</span>
                </button>
                <button
                  type="button"
                  onClick={handleLaunchStudent}
                  className="py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Enter Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* PORTAL 2: COLLEGE PLACEMENT CELL (TPO) */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-[#161208] dark:via-[#1c170b] dark:to-[#161208] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Institutional
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  College Placement Cell (TPO)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Institutional TPO Command Center for deans and placement officers
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-[#E5DFD3] dark:border-amber-500/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Branch-by-Branch Cohort Skill Heatmaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>1-Click NIRF & NAAC 5.2.1 Audit Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>OpenCV ELA Marksheet Fraud Inspector</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleExploreStakeholder('college')}
                className="py-2.5 px-3 rounded-full bg-white dark:bg-[#101728] border border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Explore Overview</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectRole('college')}
                className="py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Launch TPO Console</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          </div>

          {/* PORTAL 3: CORPORATE RECRUITER */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-[#161208] dark:via-[#1c170b] dark:to-[#161208] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Employers
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Corporate Recruiter
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Corporate Talent Console with pre-verified talent pipeline
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-[#E5DFD3] dark:border-amber-500/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Composite Skill AI Scoring Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>OpenCV ELA Forensic Fraud Audit Viewer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Gale-Shapley Stable Matching Algorithm</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleExploreStakeholder('recruiter')}
                className="py-2.5 px-3 rounded-full bg-white dark:bg-[#101728] border border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Explore Overview</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectRole('recruiter')}
                className="py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Enter Recruiter Console</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          </div>

          {/* PORTAL 4: GOVERNMENT & POLICY OBSERVATORY */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-[#181109] dark:via-[#20160b] dark:to-[#181109] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-700 to-yellow-600 text-white flex items-center justify-center shadow-md shadow-amber-700/20 group-hover:scale-105 transition-transform">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Regulatory
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Government & AICTE
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  National Talent & Policy Observatory for AICTE & Ministry of Ayush
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-[#E5DFD3] dark:border-amber-500/20">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>State-Wise Skill Deficit Heatmap (Supply/Demand)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>National Ayush Observatory (NAMASTE to ICD-11)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Empirical NEP 2020 Syllabus Directives</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleExploreStakeholder('government')}
                className="py-2.5 px-3 rounded-full bg-white dark:bg-[#101728] border border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Explore Overview</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectRole('government')}
                className="py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-700/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Access Policy Center</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: INTERACTIVE STAKEHOLDER DEEP-DIVE & VECTOR SVG DIAGRAM STUDIO */}
      <div id="stakeholder-deep-dive" className="space-y-8 pt-8 border-t border-[#E5DFD3] dark:border-amber-500/20">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono font-extrabold">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>STAKEHOLDER ARCHITECTURE OVERVIEW</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Interactive Stakeholder Deep-Dive
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Explore live feature matrices, competency index models, and real-time SVG vector diagnostics tailored to each ecosystem role
          </p>

          {/* Role Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveExploreRole('student')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeExploreRole === 'student'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-white dark:bg-[#0c1222] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student & Job Seeker</span>
            </button>

            <button
              onClick={() => setActiveExploreRole('college')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeExploreRole === 'college'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-white dark:bg-[#0c1222] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>College Placement Cell (TPO)</span>
            </button>

            <button
              onClick={() => setActiveExploreRole('recruiter')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeExploreRole === 'recruiter'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-white dark:bg-[#0c1222] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Corporate Recruiter</span>
            </button>

            <button
              onClick={() => setActiveExploreRole('government')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeExploreRole === 'government'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-white dark:bg-[#0c1222] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Government & AICTE</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STUDENT & JOB SEEKER DEEP-DIVE */}
        {activeExploreRole === 'student' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">0-100 Proctored Index</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Continuous Assessment</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sandbox compiler telemetry tracks execution speed, memory footprint, unit test pass rates, and anti-cheating keystroke dynamics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">ATS Skill Gap Studio</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Vector Similarity Engine</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Compares candidate resume vectors directly with corporate job descriptions to isolate missing technical frameworks and recommend micro-credentials.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">DigiLocker Living Resume</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Sovereign Verification</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cryptographically binds verified academic transcripts, proctored sandbox badges, and freelance earnings into a tamper-proof living ledger.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* SVG 1: Competency Radar Chart */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">0–100 Multi-Axis Skill Radar Index</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-500/30">Candidate vs Baseline</span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 400 320" className="w-full max-w-[360px] h-auto overflow-visible">
                    <polygon points="200,30 350,130 290,280 110,280 50,130" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3,3" />
                    <polygon points="200,60 312,137 267,252 133,252 88,137" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="3,3" />
                    <polygon points="200,90 275,145 245,225 155,225 125,145" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    <polygon points="200,120 237,152 222,197 178,197 162,152" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    
                    <line x1="200" y1="160" x2="200" y2="30" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    <line x1="200" y1="160" x2="350" y2="130" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    <line x1="200" y1="160" x2="290" y2="280" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    <line x1="200" y1="160" x2="110" y2="280" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
                    <line x1="200" y1="160" x2="50" y2="130" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />

                    <polygon points="200,80 300,140 250,240 150,240 100,140" fill="rgba(99, 102, 241, 0.12)" stroke="#6366F1" strokeWidth="2" strokeDasharray="4,4" />
                    <polygon points="200,42 335,133 278,268 122,260 62,135" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" strokeWidth="2.5" />
                    
                    <circle cx="200" cy="42" r="4" fill="#F59E0B" />
                    <circle cx="335" cy="133" r="4" fill="#F59E0B" />
                    <circle cx="278" cy="268" r="4" fill="#F59E0B" />
                    <circle cx="122" cy="260" r="4" fill="#F59E0B" />
                    <circle cx="62" cy="135" r="4" fill="#F59E0B" />

                    <text x="200" y="16" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-extrabold font-sans">Algorithms (94)</text>
                    <text x="362" y="132" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-extrabold font-sans">System Design (88)</text>
                    <text x="300" y="298" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-extrabold font-sans">Domain Spec (92)</text>
                    <text x="100" y="298" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-extrabold font-sans">Code Cleanliness (90)</text>
                    <text x="38" y="132" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-extrabold font-sans">Soft Skills (85)</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-amber-500/20 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span>Candidate Vector (89.8 Rating)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500/50 border border-indigo-500 inline-block" />
                    <span>Industry Benchmark (75.0)</span>
                  </div>
                </div>
              </div>

              {/* SVG 2: ATS Skill Gap Vector Flowchart */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">AI Diagnostic & Skill Remediation Pipeline</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold border border-emerald-500/30">Vector Analysis</span>
                </div>

                <div className="w-full flex items-center justify-center py-4">
                  <svg viewBox="0 0 440 220" className="w-full max-w-[420px] h-auto">
                    <rect x="10" y="20" width="120" height="60" rx="12" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="70" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Proctored Code</text>
                    <text x="70" y="60" textAnchor="middle" fill="#94A3B8" fontSize="9">Keystroke Telemetry</text>

                    <path d="M 130 50 L 160 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="160,46 168,50 160,54" fill="#F59E0B" />

                    <rect x="168" y="20" width="120" height="60" rx="12" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="228" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">AI Gap Engine</text>
                    <text x="228" y="60" textAnchor="middle" fill="#A5B4FC" fontSize="9">Vector Similarity</text>

                    <path d="M 288 50 L 318 50" stroke="#6366F1" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="318,46 326,50 318,54" fill="#6366F1" />

                    <rect x="326" y="20" width="104" height="60" rx="12" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="378" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">DigiLocker</text>
                    <text x="378" y="60" textAnchor="middle" fill="#6EE7B7" fontSize="9">Verifiable Badge</text>

                    <path d="M 228 80 L 228 135" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="224,135 228,143 232,135" fill="#F59E0B" />

                    <rect x="124" y="143" width="208" height="55" rx="12" fill="#D97706" stroke="#F59E0B" strokeWidth="1" />
                    <text x="228" y="168" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Targeted Micro-Credential Roadmap</text>
                    <text x="228" y="184" textAnchor="middle" fill="#FEF3C7" fontSize="9">Closes Isolated Skill Deficits in Real-Time</text>
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-900 dark:text-amber-200 text-center">
                  Automated diagnostic feedback loops update candidate's DigiLocker profile instantly upon test completion.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: COLLEGE PLACEMENT CELL (TPO) DEEP-DIVE */}
        {activeExploreRole === 'college' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">Cohort Skill Heatmaps</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Institutional Analytics</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time branch heatmaps across Computer Science, Electronics, FinTech, Mechanical, and Ayush streams.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">1-Click NIRF & NAAC 5.2.1</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Automated Audit Engine</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Generates ready-to-file statutory audit reports with verified student placement letters and median CTC calculations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">OpenCV ELA Marksheet Inspector</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Forensic Compression Scan</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Exposes tampered CGPA documents and digitally altered marksheet PDFs before submitting student cohorts to corporate recruiters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* SVG 1: Cohort Placement Heatmap */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">Branch-Wise Cohort Placement Velocity Matrix</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-500/30">NIRF 5.2.1 Audit</span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 420 230" className="w-full max-w-[400px] h-auto">
                    <text x="10" y="35" fill="currentColor" className="text-slate-800 dark:text-slate-200 text-[11px] font-bold">CS & AI</text>
                    <rect x="90" y="18" width="220" height="24" rx="6" fill="#F59E0B" />
                    <text x="320" y="35" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">94.2% Placed</text>

                    <text x="10" y="75" fill="currentColor" className="text-slate-800 dark:text-slate-200 text-[11px] font-bold">ECE & IoT</text>
                    <rect x="90" y="58" width="190" height="24" rx="6" fill="#D97706" />
                    <text x="290" y="75" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">88.5% Placed</text>

                    <text x="10" y="115" fill="currentColor" className="text-slate-800 dark:text-slate-200 text-[11px] font-bold">Mechanical</text>
                    <rect x="90" y="98" width="165" height="24" rx="6" fill="#B45309" />
                    <text x="265" y="115" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">82.1% Placed</text>

                    <text x="10" y="155" fill="currentColor" className="text-slate-800 dark:text-slate-200 text-[11px] font-bold">FinTech & Econ</text>
                    <rect x="90" y="138" width="205" height="24" rx="6" fill="#F59E0B" />
                    <text x="305" y="155" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">91.4% Placed</text>

                    <text x="10" y="195" fill="currentColor" className="text-slate-800 dark:text-slate-200 text-[11px] font-bold">Ayush Med</text>
                    <rect x="90" y="178" width="198" height="24" rx="6" fill="#D97706" />
                    <text x="298" y="195" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">89.0% Placed</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-amber-500/20 font-semibold text-slate-700 dark:text-slate-300">
                  <span>Average Cohort Placement: 89.04%</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">+14.2% YoY Improvement</span>
                </div>
              </div>

              {/* SVG 2: OpenCV ELA Marksheet Verification Workflow */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">OpenCV ELA Forensic Scan Architecture</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold border border-emerald-500/30">Fraud Detection</span>
                </div>

                <div className="w-full flex items-center justify-center py-4">
                  <svg viewBox="0 0 420 210" className="w-full max-w-[400px] h-auto">
                    <rect x="15" y="25" width="110" height="50" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                    <text x="70" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">PDF Marksheet</text>
                    <text x="70" y="60" textAnchor="middle" fill="#94A3B8" fontSize="8">Ingestion Stream</text>

                    <path d="M 125 50 L 155 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="155,46 163,50 155,54" fill="#F59E0B" />

                    <rect x="163" y="25" width="110" height="50" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="218" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Re-Compression</text>
                    <text x="218" y="60" textAnchor="middle" fill="#FCD34D" fontSize="8">95% Rescale Pass</text>

                    <path d="M 273 50 L 303 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="303,46 311,50 303,54" fill="#F59E0B" />

                    <rect x="311" y="25" width="95" height="50" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="358" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Pixel Noise Map</text>
                    <text x="358" y="60" textAnchor="middle" fill="#6EE7B7" fontSize="8">Error Variance</text>

                    <path d="M 218 75 L 218 135" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="214,135 218,143 222,135" fill="#10B981" />

                    <rect x="110" y="143" width="216" height="48" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="218" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Sovereign Verifiable Credential</text>
                    <text x="218" y="180" textAnchor="middle" fill="#A7F3D0" fontSize="9">Tamper-Proof Digital Marksheet Badge</text>
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-900 dark:text-emerald-200 text-center">
                  99.98% Accuracy in detecting digital splicing, CGPA font alterations, and fake seals.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: CORPORATE RECRUITER DEEP-DIVE */}
        {activeExploreRole === 'recruiter' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">Composite AI Scoring</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Multi-Parametric Index</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Synthesizes sandbox code output, peer code review ratings, and academic record into a single candidate rank.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">Gale-Shapley Matching</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Zero-Bias Placement</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Algorithmic game-theoretic dispatch that pairs verified candidates with corporate recruiters without manual bias.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">OpenCV Forensic Viewer</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Pre-Verified Pipelines</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Recruiters hire with 100% confidence knowing candidates have passed automated mark-sheet and degree authenticity checks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* SVG 1: Gale-Shapley Matching Matrix */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">Gale-Shapley Zero-Bias Stable Matching</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-extrabold border border-cyan-500/30">Stable Pairing</span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 420 220" className="w-full max-w-[400px] h-auto">
                    <rect x="20" y="20" width="130" height="40" rx="8" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="85" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Sr. FinTech Engineer</text>

                    <rect x="20" y="90" width="130" height="40" rx="8" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="85" y="114" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Ayush Clinical AI</text>

                    <rect x="20" y="160" width="130" height="40" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="85" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">System Architect</text>

                    <rect x="270" y="20" width="130" height="40" rx="8" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="335" y="44" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="bold">Candidate #8492 (96 Index)</text>

                    <rect x="270" y="90" width="130" height="40" rx="8" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="335" y="114" textAnchor="middle" fill="#A5B4FC" fontSize="10" fontWeight="bold">Candidate #3011 (92 Index)</text>

                    <rect x="270" y="160" width="130" height="40" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="335" y="184" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontWeight="bold">Candidate #5120 (94 Index)</text>

                    <path d="M 150 40 C 210 40, 210 40, 270 40" stroke="#F59E0B" strokeWidth="2.5" />
                    <path d="M 150 110 C 210 110, 210 110, 270 110" stroke="#6366F1" strokeWidth="2.5" />
                    <path d="M 150 180 C 210 180, 210 180, 270 180" stroke="#10B981" strokeWidth="2.5" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-amber-500/20 font-semibold text-slate-700 dark:text-slate-300">
                  <span>Matching Latency: &lt; 140ms</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">100% Guaranteed Pareto-Optimal</span>
                </div>
              </div>

              {/* SVG 2: Recruiter Talent Funnel */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">Pre-Verified Recruiter Hiring Funnel</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-500/30">Conversion Rate</span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 400 200" className="w-full max-w-[380px] h-auto">
                    <polygon points="20,20 380,20 330,60 70,60" fill="#F59E0B" opacity="0.9" />
                    <text x="200" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">10,000+ Verified Candidate Substrate</text>

                    <polygon points="75,65 325,65 280,105 120,105" fill="#D97706" opacity="0.9" />
                    <text x="200" y="89" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">2,400 Proctored Sandbox Score &gt; 85</text>

                    <polygon points="125,110 275,110 240,150 160,150" fill="#B45309" opacity="0.95" />
                    <text x="200" y="134" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">1,200 OpenCV ELA Audit Passed</text>

                    <polygon points="165,155 235,155 215,190 185,190" fill="#78350F" />
                    <text x="200" y="177" textAnchor="middle" fill="#FEF3C7" fontSize="10" fontWeight="bold">450 Matches</text>
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-900 dark:text-amber-200 text-center">
                  Reduces hiring cycle duration from 45 days down to 48 hours.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: GOVERNMENT & AICTE DEEP-DIVE */}
        {activeExploreRole === 'government' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">State Skill Deficit Telemetry</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">National Observatory</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time regional skill supply vs market demand telemetry mapping across Indian states.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">NAMASTE to ICD-11 Engine</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Ayush Healthcare Mapping</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Standardizes traditional Ayush practitioner competencies to WHO ICD-11 global medical standards.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1526] border border-amber-500/20 space-y-3 shadow-sm hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-base">Empirical NEP 2020 Directives</h4>
                    <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">Curriculum Realignment</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Generates AICTE syllabus directives dynamically based on empirical hiring gaps detected across industry sectors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* SVG 1: Regional Skill Deficit Matrix */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">State-Wise Regional Skill Deficit Map</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-500/30">AICTE Policy Feed</span>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <svg viewBox="0 0 420 220" className="w-full max-w-[400px] h-auto">
                    <rect x="20" y="20" width="170" height="50" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="32" y="42" fill="#FFFFFF" fontSize="11" fontWeight="bold">Maharashtra (FinTech/AI)</text>
                    <text x="32" y="58" fill="#FCD34D" fontSize="9">Supply: 82% | Demand: 96% (Deficit: 14%)</text>

                    <rect x="210" y="20" width="190" height="50" rx="10" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="222" y="42" fill="#FFFFFF" fontSize="11" fontWeight="bold">Karnataka (DeepTech/Systems)</text>
                    <text x="222" y="58" fill="#A5B4FC" fontSize="9">Supply: 88% | Demand: 98% (Deficit: 10%)</text>

                    <rect x="20" y="85" width="170" height="50" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="32" y="107" fill="#FFFFFF" fontSize="11" fontWeight="bold">Delhi NCR (Ayush/Health)</text>
                    <text x="32" y="123" fill="#6EE7B7" fontSize="9">Supply: 78% | Demand: 91% (Deficit: 13%)</text>

                    <rect x="210" y="85" width="190" height="50" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="222" y="107" fill="#FFFFFF" fontSize="11" fontWeight="bold">Tamil Nadu (Auto/Hardware)</text>
                    <text x="222" y="123" fill="#FCD34D" fontSize="9">Supply: 85% | Demand: 92% (Deficit: 7%)</text>

                    <rect x="20" y="150" width="170" height="50" rx="10" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="32" y="172" fill="#FFFFFF" fontSize="11" fontWeight="bold">Telangana (Pharma/Bio)</text>
                    <text x="32" y="188" fill="#A5B4FC" fontSize="9">Supply: 80% | Demand: 94% (Deficit: 14%)</text>

                    <rect x="210" y="150" width="190" height="50" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="222" y="172" fill="#FFFFFF" fontSize="11" fontWeight="bold">Uttar Pradesh (EdTech/Agri)</text>
                    <text x="222" y="188" fill="#6EE7B7" fontSize="9">Supply: 72% | Demand: 89% (Deficit: 17%)</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-amber-500/20 font-semibold text-slate-700 dark:text-slate-300">
                  <span>National Skill Deficit Index: 12.5%</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Empirical Policy Feedback</span>
                </div>
              </div>

              {/* SVG 2: NEP 2020 Data Pipeline */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-amber-100/30 dark:from-[#090e1a] dark:via-[#0e1628] dark:to-[#090e1a] border border-amber-500/30 space-y-4 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="font-serif-luxury font-bold text-slate-900 dark:text-white text-sm sm:text-base">NEP 2020 Policy Directive Engine Pipeline</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold border border-emerald-500/30">Automated Directives</span>
                </div>

                <div className="w-full flex items-center justify-center py-4">
                  <svg viewBox="0 0 420 210" className="w-full max-w-[400px] h-auto">
                    <rect x="15" y="25" width="110" height="50" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="70" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">TPO Audit Feeds</text>
                    <text x="70" y="60" textAnchor="middle" fill="#FCD34D" fontSize="8">Institutional Data</text>

                    <path d="M 125 50 L 155 50" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="155,46 163,50 155,54" fill="#F59E0B" />

                    <rect x="163" y="25" width="110" height="50" rx="10" fill="#1E293B" stroke="#6366F1" strokeWidth="1.5" />
                    <text x="218" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">NAMASTE Core</text>
                    <text x="218" y="60" textAnchor="middle" fill="#A5B4FC" fontSize="8">ICD-11 Standardizer</text>

                    <path d="M 273 50 L 303 50" stroke="#6366F1" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="303,46 311,50 303,54" fill="#6366F1" />

                    <rect x="311" y="25" width="95" height="50" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                    <text x="358" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Deficit Map</text>
                    <text x="358" y="60" textAnchor="middle" fill="#6EE7B7" fontSize="8">Macro Telemetry</text>

                    <path d="M 218 75 L 218 135" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                    <polygon points="214,135 218,143 222,135" fill="#F59E0B" />

                    <rect x="100" y="143" width="236" height="48" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="218" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Empirical AICTE Syllabus Directive</text>
                    <text x="218" y="180" textAnchor="middle" fill="#FEF3C7" fontSize="9">Updates University Curricula to match hiring demand</text>
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-900 dark:text-amber-200 text-center">
                  Enables data-driven policy updates under National Education Policy (NEP 2020).
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FOOTER GUARANTEE BADGE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-[#0c1222]/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-center text-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Backed by Sovereign Identity & India DPDP Act 2023 Statutory Guardrails</span>
      </div>

      {/* PLATFORM OVERVIEW MODAL (ADJUSTED BOX SIZES & CLEAN SPACING) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="glass-panel max-w-3xl w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1424] space-y-6 relative shadow-2xl border border-indigo-500/30">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">CareerLens</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Tagline / Subtitle */}
            <div className="space-y-5 text-slate-700 dark:text-slate-200 leading-relaxed">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                India's unified talent ecosystem for verified skills, AI hiring, and education-industry collaboration.
              </p>

              {/* 4 Workspace Cards Grid (Proportioned Spacious Boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Student Workspace */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12192c] border border-slate-200/80 dark:border-white/[0.08] space-y-2 hover:border-indigo-400/50 transition-colors min-h-[110px] flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-2.5 font-extrabold text-slate-900 dark:text-white text-base">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-cyan-400 shrink-0" />
                    <span>Student Workspace</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Personalized learning, verified portfolios & career preparation.
                  </p>
                </div>

                {/* TPO Placement Console */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12192c] border border-slate-200/80 dark:border-white/[0.08] space-y-2 hover:border-emerald-400/50 transition-colors min-h-[110px] flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-2.5 font-extrabold text-slate-900 dark:text-white text-base">
                    <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>TPO Placement Console</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Smart campus placements, analytics & compliance management.
                  </p>
                </div>

                {/* Corporate Recruiter */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12192c] border border-slate-200/80 dark:border-white/[0.08] space-y-2 hover:border-amber-400/50 transition-colors min-h-[110px] flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-2.5 font-extrabold text-slate-900 dark:text-white text-base">
                    <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Corporate Recruiter</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Hire verified talent using AI-powered skill intelligence.
                  </p>
                </div>

                {/* Policy Observatory */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12192c] border border-slate-200/80 dark:border-white/[0.08] space-y-2 hover:border-rose-400/50 transition-colors min-h-[110px] flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-2.5 font-extrabold text-slate-900 dark:text-white text-base">
                    <Landmark className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>Policy Observatory</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Real-time skill demand, employment trends & policy insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Footer Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleScrollToPortals();
                }}
                className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-bold text-xs sm:text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
