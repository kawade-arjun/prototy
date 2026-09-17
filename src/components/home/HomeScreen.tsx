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
  Play
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
    <div className="space-y-16 py-4 sm:py-8 max-w-6xl mx-auto animate-fadeIn relative [perspective:1000px]">
      
      {/* 3D DYNAMIC ISOMETRIC BACKGROUND MESH & FLOATING 3D SPHERES */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* 3D Ambient Glowing Floating Orbs */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-72 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[600px] -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

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
          verifiable competency network powered by real-time skill diagnostics and transparent placement matching.
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

        {/* Feature Highlights Grid (Clean text with no unsubstantiated numbers) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-indigo-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Accelerated AI Hiring</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Skill Intelligence Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-emerald-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <ShieldCheck className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Tamper-Proof Verification</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">OpenCV ELA Forensic Scan</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-purple-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <BarChart3 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Automated Compliance</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">NIRF & NAAC Audit Reporting</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:border-cyan-400/50 transition-all flex flex-col items-center justify-center space-y-1 text-center group hover:shadow-md hover:-translate-y-0.5">
            <Lock className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-slate-900 dark:text-white">Statutory Privacy</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">India DPDP Act 2023 Guardrails</span>
          </div>
        </div>

      </div>

      {/* SECTION 2: INTERACTIVE CORE SUBSTRATE ARCHITECTURE (ADAPTIVE GLASSMORPHIC THEME) */}
      <div className="space-y-6 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/80 dark:from-[#0b1224] dark:via-[#0f1932] dark:to-[#0b1224] border-2 border-indigo-200 dark:border-indigo-500/40 p-6 sm:p-8 relative overflow-hidden shadow-xl transition-colors">
        {/* Glow accent in top right */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100 dark:border-white/[0.08] pb-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-cyan-300 text-xs font-mono font-extrabold border border-indigo-200 dark:border-indigo-500/40 mb-2.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>CORE ARCHITECTURE ENGINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">How CareerLens Substrate Works</h3>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-[#070d1a]/80 p-1.5 rounded-2xl border border-slate-200 dark:border-white/[0.1] shadow-inner">
            {architectureSteps.map((item) => (
              <button
                key={item.step}
                onClick={() => setActiveArchitectureStep(item.step)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeArchitectureStep === item.step
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Pillar {item.step}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Architecture Pillar Detail (Light / Dark Adaptive Glassmorphic Layout) */}
        {architectureSteps.map((pillar) => {
          if (pillar.step !== activeArchitectureStep) return null;
          return (
            <div key={pillar.step} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2 animate-fadeIn relative z-10">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">{pillar.badge}</span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{pillar.title}</h4>
                  </div>
                </div>
                
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed bg-white/90 dark:bg-[#121b33] p-5 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm">
                  {pillar.desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#121b33] border-2 border-indigo-200 dark:border-indigo-500/30 flex flex-col justify-center items-center text-center space-y-2.5 shadow-md">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Platform Capability</span>
                <span className="text-base sm:text-lg font-black text-indigo-700 dark:text-emerald-400 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/60">
                  {pillar.metric}
                </span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Verified System Substrate</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: PORTAL SELECTION GRID (SLIGHTLY COMPACT BOX SIZES) */}
      <div id="portal-selection" className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Select Stakeholder Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Choose your role to enter your dedicated interactive command workspace
          </p>
        </div>

        {/* 4 Portal Cards Grid (Compact & Sleek Sizing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* PORTAL 1: STUDENT & JOB SEEKER */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-indigo-500/40 dark:border-indigo-500/50 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500 transition-all duration-300 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/40 dark:from-[#0b1020] dark:via-[#0e1628] dark:to-[#0b1020] group">
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  Multi-Disciplinary
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Student & Job Seeker
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Proctored sandboxes, ATS diagnostics, freelance marketplace & DigiLocker living resume
                </p>
              </div>

              {/* Feature Highlights List */}
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Proctored Sandboxes & 0–100 Competency Index</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>ATS Resume Diagnostic Studio & AI Skill Gap Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>DigiLocker Living Resume & Verified Credential Ledger</span>
                </li>
              </ul>
            </div>

            {/* Discipline Dropdown & Launch Workspace Button */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Select Academic Field:</span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400 font-bold">
                    5 Disciplines
                  </span>
                </label>

                <div className="relative">
                  <select
                    value={activeTabField}
                    onChange={(e) => handleSelectStudentField(e.target.value as AcademicStream)}
                    className="w-full px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#0c1222] text-slate-900 dark:text-white font-bold text-xs shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer appearance-none pr-10"
                  >
                    {allStudents.map((stu) => (
                      <option key={stu.id} value={stu.streamId}>
                        {stu.streamName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleLaunchStudent}
                className="w-full py-2.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-indigo-500"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* PORTAL 2: COLLEGE PLACEMENT CELL (TPO) */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 dark:from-[#081512] dark:via-[#0c1a16] dark:to-[#081512] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  Institutional
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  College Placement Cell (TPO)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Institutional TPO Command Center for deans and placement officers
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Branch-by-Branch Cohort Skill Heatmaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>1-Click NIRF & NAAC 5.2.1 Audit Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>OpenCV ELA Marksheet Fraud Inspector</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRole('college')}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-emerald-500"
            >
              <span>Launch TPO Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 3: CORPORATE RECRUITER */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 hover:border-amber-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-[#161208] dark:via-[#1c170b] dark:to-[#161208] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Employers
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Corporate Recruiter
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Corporate Talent Console with pre-verified talent pipeline
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
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

            <button
              type="button"
              onClick={() => onSelectRole('recruiter')}
              className="w-full py-2.5 px-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-amber-500"
            >
              <span>Enter Recruiter Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 4: GOVERNMENT & POLICY OBSERVATORY */}
          <div className="glass-panel rounded-3xl p-5 sm:p-6 border-2 border-rose-500/30 hover:border-rose-500/60 flex flex-col justify-between space-y-5 relative overflow-hidden shadow-lg hover:shadow-rose-500/20 transition-all duration-300 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40 dark:from-[#18090d] dark:via-[#200d12] dark:to-[#18090d] group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20 group-hover:scale-105 transition-transform">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                  Regulatory
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Government & AICTE
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  National Talent & Policy Observatory for AICTE & Ministry of Ayush
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>State-Wise Skill Deficit Heatmap (Supply/Demand)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>National Ayush Observatory (NAMASTE to ICD-11)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Empirical NEP 2020 Syllabus Directives</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectRole('government')}
              className="w-full py-2.5 px-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 active:scale-95 transition-all cursor-pointer group-hover:bg-rose-500"
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
