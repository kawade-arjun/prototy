import React, { useState } from 'react';
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
  Palette
} from 'lucide-react';

interface HomeScreenProps {
  onSelectRole: (role: UserRole) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectRole }) => {
  const { allStudents, selectedStream, setStudentStream, activeStudent } = useStudent();
  const [activeTabField, setActiveTabField] = useState<AcademicStream>(selectedStream);

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

  const disciplineDetails: Record<AcademicStream, { icon: React.ReactNode; institute: string }> = {
    tech_ai: {
      icon: <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      institute: 'IIT Bombay • Dept of CSE'
    },
    commerce_finance: {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      institute: 'SRCC Delhi • Finance & FinTech'
    },
    healthcare_bio: {
      icon: <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      institute: 'AIIMS & AllA New Delhi • Ayush & Bio-Health'
    },
    law_governance: {
      icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      institute: 'NLSIU Bengaluru • Corporate Law'
    },
    ui_ux: {
      icon: <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
      institute: 'NID Ahmedabad • Interaction Design & HCI'
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-6xl mx-auto animate-fadeIn">
      
      {/* SECTION 1: HERO WELCOME BANNER */}
      <div className="text-center space-y-6 relative pt-4 sm:pt-8">
        
        {/* Top Sovereign Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-300 text-xs sm:text-sm font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>National Sovereign Talent & Regulatory Substrate</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">CareerLens</span>
        </h1>

        {/* Hero Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Empowering Students, Higher Education Institutions, Corporate Recruiters, and Regulators 
          with Real-Time Verified Competency Diagnostics and Transparent Placement Telemetry.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm flex flex-col items-center justify-center space-y-1 text-center">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-slate-900 dark:text-white">75% Faster Hiring</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">40-40-20 AI Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm flex flex-col items-center justify-center space-y-1 text-center">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="font-extrabold text-slate-900 dark:text-white">0% Credential Fraud</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">OpenCV ELA Verified</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm flex flex-col items-center justify-center space-y-1 text-center">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span className="font-extrabold text-slate-900 dark:text-white">85% Audit Savings</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">1-Click NIRF / NAAC</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200/80 dark:border-white/[0.06] shadow-sm flex flex-col items-center justify-center space-y-1 text-center">
            <Lock className="w-5 h-5 text-cyan-500" />
            <span className="font-extrabold text-slate-900 dark:text-white">Statutory Privacy</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">India DPDP Act 2023</span>
          </div>
        </div>

        {/* Smooth Scroll Button to Portal Selection Section */}
        <div className="pt-6">
          <button
            onClick={handleScrollToPortals}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore User Portals</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>

      {/* SECTION 2: PORTAL SELECTION GRID (NO HORIZONTAL CHIP MENU) */}
      <div id="portal-selection" className="space-y-8 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Select Your Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Choose your stakeholder workspace below to launch your dedicated dashboard
          </p>
        </div>

        {/* 4 Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* PORTAL 1: STUDENT & JOB SEEKER */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/40 dark:border-indigo-500/50 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-indigo-500/15 transition-all bg-gradient-to-br from-indigo-50/40 via-white to-cyan-50/30 dark:from-[#0b1020] dark:via-[#0e1628] dark:to-[#0b1020]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  Multi-Disciplinary
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Student & Job Seeker</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Proctored 40-40-20 sandboxes, ATS diagnostics, freelance marketplace & DigiLocker living resume
                </p>
              </div>

              {/* Discipline Switcher Dropdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Select Academic Field:</span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400">
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
                <span className="text-xs font-mono font-black text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 shrink-0">
                  {activeStudent.compositeScore}/100
                </span>
              </div>

              <button
                type="button"
                onClick={handleLaunchStudent}
                className="w-full py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Enter Student Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* PORTAL 2: COLLEGE PLACEMENT CELL (TPO) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 hover:border-emerald-500/50 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-emerald-500/15 transition-all bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 dark:from-[#081512] dark:via-[#0c1a16] dark:to-[#081512]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  Institutional
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">College Placement Cell (TPO)</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Institutional TPO Command Center for deans and placement officers
                </p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
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
              className="w-full py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Launch TPO Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 3: CORPORATE RECRUITER */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-amber-500/30 hover:border-amber-500/50 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-amber-500/15 transition-all bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 dark:from-[#161208] dark:via-[#1c170b] dark:to-[#161208]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/20">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                  Employers
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Corporate Recruiter</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Corporate Talent Console with pre-verified talent pipeline
                </p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
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
              className="w-full py-3 px-5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Enter Recruiter Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 4: GOVERNMENT & POLICY OBSERVATORY */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 hover:border-rose-500/50 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl hover:shadow-rose-500/15 transition-all bg-gradient-to-br from-rose-50/40 via-white to-pink-50/30 dark:from-[#18090d] dark:via-[#200d12] dark:to-[#18090d]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                  Regulatory
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Government & AICTE</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  National Talent & Policy Observatory for AICTE & Ministry of Ayush
                </p>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
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
              className="w-full py-3 px-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Access Policy Observatory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER GUARANTEE BADGE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-[#0c1222]/60 border border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Backed by DigiLocker Sovereign Identity & India DPDP Act 2023 Statutory Guardrails</span>
        </div>
        <div className="font-mono text-xs">
          Build: 2026.09-NEP2020-v2.6
        </div>
      </div>

    </div>
  );
};
