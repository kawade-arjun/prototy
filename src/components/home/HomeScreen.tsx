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
  FileText, 
  Layers, 
  Flame,
  Award,
  ChevronRight,
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
  const [roleCategory, setRoleCategory] = useState<'all' | 'student' | 'college' | 'recruiter' | 'government'>('all');

  const handleSelectStudentField = (streamId: AcademicStream) => {
    setActiveTabField(streamId);
    setStudentStream(streamId);
  };

  const handleLaunchStudent = () => {
    setStudentStream(activeTabField);
    onSelectRole('student');
  };

  const disciplineDetails: Record<AcademicStream, { icon: React.ReactNode; institute: string; highlight: string; color: string; badgeColor: string }> = {
    tech_ai: {
      icon: <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      institute: 'IIT Bombay • Dept of CSE',
      highlight: 'Monaco IDE Sandbox, Distributed Systems & Deep Learning (PyTorch / vLLM)',
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30'
    },
    commerce_finance: {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      institute: 'SRCC Delhi • Finance & FinTech',
      highlight: 'LBO & DCF Formula Sandbox, Financial Modeling, SEC Edgar & ESG Analytics',
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30'
    },
    healthcare_bio: {
      icon: <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      institute: 'AIIMS & AllA New Delhi • Ayush & Bio-Health',
      highlight: 'NAMASTE to WHO ICD-11 Dual-Ontology, Ayush Pharmacovigilance & Clinical Trials',
      color: 'from-amber-600 to-orange-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
    },
    law_governance: {
      icon: <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      institute: 'NLSIU Bengaluru • Corporate Law',
      highlight: 'India DPDP Act 2023 Statutory Compliance, Cross-Border M&A & Fiduciary Tokenization',
      color: 'from-purple-600 to-violet-600',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30'
    },
    ui_ux: {
      icon: <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
      institute: 'NID Ahmedabad • Interaction Design & HCI',
      highlight: 'WCAG 2.2 AAA Accessibility Sandbox, Design Tokens & Design Systems',
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-500/30'
    }
  };

  return (
    <div className="space-y-10 py-4 sm:py-6 max-w-6xl mx-auto">
      
      {/* Hero Welcome Banner */}
      <div className="text-center space-y-4 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-300 text-xs font-bold shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>National Sovereign Talent & Regulatory Substrate • NEP 2020 Aligned</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">CareerLens</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
          Select your stakeholder user persona below to access proctored competency sandboxes, 
          institutional placement accreditation, corporate recruitment funnels, or sovereign regulatory telemetry.
        </p>

        {/* National Metric Quick Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>75% Faster Corporate Hiring</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>0% Credential Fraud Guaranteed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>85% Reduction in NIRF / NAAC Audits</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0c1222]/80 border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <Lock className="w-3.5 h-3.5 text-cyan-500" />
            <span>India DPDP Act 2023 Conformance</span>
          </div>
        </div>
      </div>

      {/* Stakeholder Category Filter Tabs (Section UI Diff) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Select Stakeholder User Portal</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter portals by category or launch directly into your role
            </p>
          </div>

          {/* Section Category Tabs - Material Design 3 Segmented Chips */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-200/60 dark:bg-[#131824] overflow-x-auto">
            <button
              onClick={() => setRoleCategory('all')}
              className={`m3-chip ${roleCategory === 'all' ? 'm3-chip-active' : 'm3-chip-inactive'}`}
            >
              All Portals
            </button>
            <button
              onClick={() => setRoleCategory('student')}
              className={`m3-chip ${roleCategory === 'student' ? 'm3-chip-active' : 'm3-chip-inactive'}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setRoleCategory('college')}
              className={`m3-chip ${roleCategory === 'college' ? 'bg-emerald-600 text-white shadow-sm' : 'm3-chip-inactive'}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>College TPO</span>
            </button>
            <button
              onClick={() => setRoleCategory('recruiter')}
              className={`m3-chip ${roleCategory === 'recruiter' ? 'bg-amber-600 text-white shadow-sm' : 'm3-chip-inactive'}`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </button>
            <button
              onClick={() => setRoleCategory('government')}
              className={`m3-chip ${roleCategory === 'government' ? 'bg-rose-600 text-white shadow-sm' : 'm3-chip-inactive'}`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Government</span>
            </button>
          </div>
        </div>

        {/* 1. Primary Student Role Card (Compact Dropdown Selector) */}
        {(roleCategory === 'all' || roleCategory === 'student') && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/40 dark:border-indigo-500/50 relative overflow-hidden shadow-xl hover:shadow-indigo-500/10 transition-all bg-gradient-to-r from-indigo-50/40 via-white to-cyan-50/30 dark:from-[#0b1020] dark:via-[#0e1628] dark:to-[#0b1020]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">Student & Job Seeker</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                        Multi-Disciplinary
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Proctored 40-40-20 sandboxes, ATS diagnostics, freelance marketplace & DigiLocker living resume
                    </p>
                  </div>
                </div>

                {/* Compact Dropdown Menu for Discipline Selection */}
                <div className="space-y-2 max-w-xl">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      Select Academic Field / Student Persona:
                    </span>
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400">
                      5 Disciplines Available
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
                          {stu.streamName} • {stu.name} ({stu.compositeScore}/100) — {stu.institution.split('(')[0]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Selected Candidate Live Summary & Entry Action */}
              <div className="lg:w-80 p-5 rounded-2xl bg-white dark:bg-[#0d1424] border border-indigo-200 dark:border-indigo-500/30 shadow-lg space-y-4 shrink-0">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span className="flex items-center gap-1.5">
                    {disciplineDetails[activeTabField]?.icon}
                    <span>{activeStudent.name}</span>
                  </span>
                  <span className="text-xs font-mono font-black text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                    {activeStudent.compositeScore}/100
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{activeStudent.degree}</div>
                  <div className="text-[11px] text-slate-500">{disciplineDetails[activeTabField]?.institute}</div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DigiLocker Marksheet Verified</span>
                </div>

                <button
                  type="button"
                  onClick={handleLaunchStudent}
                  className="m3-btn-filled w-full rounded-full"
                >
                  <span>Enter Student Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 3 Other Institutional & Corporate Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 2. College & Placement Cell (TPO) */}
          {(roleCategory === 'all' || roleCategory === 'college') && (
            <div className="glass-panel rounded-3xl p-6 border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-5 relative group bg-gradient-to-b from-emerald-50/30 to-transparent dark:from-emerald-950/10 dark:to-transparent">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                    Institutional
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">College Placement Cell (TPO)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Institutional TPO Command Center for deans and placement officers
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>Branch-by-Branch Cohort Skill Heatmaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>1-Click NIRF & NAAC 5.2.1 Audit Reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>OpenCV ELA Marksheet Fraud Inspector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>0% Ghost Resume Corporate Protection</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectRole('college')}
                className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all group"
              >
                <span>Launch TPO Command Center</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* 3. Corporate Recruiter */}
          {(roleCategory === 'all' || roleCategory === 'recruiter') && (
            <div className="glass-panel rounded-3xl p-6 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all flex flex-col justify-between gap-5 relative group bg-gradient-to-b from-amber-50/30 to-transparent dark:from-amber-950/10 dark:to-transparent">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                    Employers
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Corporate Recruiter</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Corporate Talent Console with pre-verified talent pipeline
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>40-40-20 Composite AI Scoring Engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>OpenCV ELA Forensic Fraud Audit Viewer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Gale-Shapley Stable Matching Algorithm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Dynamic Cutoff Slider & 8-Stage Pipeline</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectRole('recruiter')}
                className="w-full py-2.5 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all group"
              >
                <span>Enter Recruiter Console</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* 4. Government & Regulatory Body */}
          {(roleCategory === 'all' || roleCategory === 'government') && (
            <div className="glass-panel rounded-3xl p-6 border-2 border-rose-500/30 hover:border-rose-500/50 transition-all flex flex-col justify-between gap-5 relative group bg-gradient-to-b from-rose-50/30 to-transparent dark:from-rose-950/10 dark:to-transparent">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/20">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                    Regulatory
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Government & AICTE</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    National Talent & Policy Observatory for AICTE & Ministry of Ayush
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                    <span>State-Wise Skill Deficit Heatmap (Supply/Demand)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                    <span>National Ayush Observatory (NAMASTE to ICD-11)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                    <span>Empirical NEP 2020 Syllabus Directives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />
                    <span>Single Sovereign Tamper-Proof Talent Substrate</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectRole('government')}
                className="w-full py-2.5 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 transition-all group"
              >
                <span>Access Policy Observatory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Sovereign Statutory Compliance Footer Note */}
      <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#0c1222]/60 border border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Backed by DigiLocker Sovereign Identity & India DPDP Act 2023 Statutory Guardrails</span>
        </div>
        <div className="font-mono text-[11px]">
          Build: 2026.09-NEP2020-v2.6 • Verified Integrity
        </div>
      </div>

    </div>
  );
};
