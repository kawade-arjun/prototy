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

  const disciplineDetails: Record<AcademicStream, { icon: React.ReactNode; institute: string; highlight: string; color: string; badgeColor: string }> = {
    tech_ai: {
      icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      institute: 'IIT Bombay • Dept of CSE',
      highlight: 'Monaco IDE Sandbox, Distributed Systems & Deep Learning (PyTorch / vLLM)',
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30'
    },
    commerce_finance: {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      institute: 'SRCC Delhi • Finance & FinTech',
      highlight: 'LBO & DCF Formula Sandbox, Financial Modeling, SEC Edgar & ESG Analytics',
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30'
    },
    healthcare_bio: {
      icon: <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      institute: 'AIIMS & AllA New Delhi • Ayush & Bio-Health',
      highlight: 'NAMASTE to WHO ICD-11 Dual-Ontology, Ayush Pharmacovigilance & Clinical Trials',
      color: 'from-amber-600 to-orange-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
    },
    law_governance: {
      icon: <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      institute: 'NLSIU Bengaluru • Corporate Law',
      highlight: 'India DPDP Act 2023 Statutory Compliance, Cross-Border M&A & Fiduciary Tokenization',
      color: 'from-purple-600 to-violet-600',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30'
    },
    ui_ux: {
      icon: <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
      institute: 'NID Ahmedabad • Interaction Design & HCI',
      highlight: 'WCAG 2.2 AAA Accessibility Sandbox, Design Tokens & Design Systems',
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:border-pink-500/30'
    }
  };

  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-6xl mx-auto">
      
      {/* Hero Welcome Banner */}
      <div className="text-center space-y-4 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-300 text-xs font-bold shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>National Sovereign Talent & Regulatory Substrate • NEP 2020 Aligned</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">CareerLens</span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
          Select your stakeholder user persona below to access proctored competency sandboxes, 
          institutional placement accreditation, corporate recruitment funnels, or sovereign regulatory telemetry.
        </p>

        {/* National Metric Quick Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
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

      {/* Role Selection Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.06] pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Select Your User Type</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pick a stakeholder category to launch your customized workspace
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-500/20">
            4 Core Portals
          </div>
        </div>

        {/* 1. Primary Student Role Card with 5 Disciplinary Fields Embed */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/30 dark:border-indigo-500/40 relative overflow-hidden shadow-xl hover:shadow-indigo-500/10 transition-all">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
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
                    Skill mapping, 40-40-20 sandboxes, ATS diagnostics, freelance gigs, and DigiLocker living resumes
                  </p>
                </div>
              </div>

              {/* 5-Disciplinary Fields Selector */}
              <div className="pt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Select Your Academic Field (5 Specialized Personas):
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    All tabs auto-filter to this field
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {allStudents.map((stu) => {
                    const isSelected = activeTabField === stu.streamId;
                    const meta = disciplineDetails[stu.streamId];
                    return (
                      <button
                        key={stu.id}
                        type="button"
                        onClick={() => handleSelectStudentField(stu.streamId)}
                        className={`text-left p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-2 relative ${
                          isSelected
                            ? 'bg-white dark:bg-[#121a30] border-indigo-600 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                            : 'bg-slate-50/80 dark:bg-[#0c1222]/80 border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                              {meta.icon}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                {stu.streamName}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                                {stu.name}
                              </div>
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                            isSelected 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {stu.compositeScore}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                          {meta.institute}
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 pt-1 border-t border-indigo-100 dark:border-indigo-500/20">
                            <CheckCircle2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            <span>Active Field Selected</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Student Persona Launch Action Button */}
            <div className="lg:w-72 flex flex-col justify-between gap-4 p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/20">
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center justify-between">
                  <span>Selected Candidate:</span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400">
                    {activeStudent.digiLockerId}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-1.5">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{activeStudent.name}</span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Score: {activeStudent.compositeScore}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {activeStudent.degree}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-500 leading-tight">
                    {disciplineDetails[activeTabField]?.highlight}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DigiLocker Marksheet Verified</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLaunchStudent}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all group"
              >
                <span>Enter Student Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Other Institutional & Corporate Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 2. College & Placement Cell (TPO) */}
          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-5 relative group">
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
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all group"
            >
              <span>Launch TPO Command Center</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3. Corporate Recruiter */}
          <div className="glass-panel rounded-3xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-5 relative group">
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
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 active:scale-95 transition-all group"
            >
              <span>Enter Recruiter Console</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4. Government & Regulatory Body */}
          <div className="glass-panel rounded-3xl p-6 border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between gap-5 relative group">
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
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 active:scale-95 transition-all group"
            >
              <span>Access Policy Observatory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

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
