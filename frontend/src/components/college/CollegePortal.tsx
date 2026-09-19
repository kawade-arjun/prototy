import React, { useState } from 'react';
import { 
  Building2, 
  BarChart2, 
  Download, 
  FileSpreadsheet, 
  FileCheck, 
  ShieldCheck, 
  ShieldAlert, 
  Calendar, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  RefreshCw, 
  Link, 
  Briefcase, 
  Award, 
  Lock, 
  ChevronRight, 
  ExternalLink,
  Flame,
  Terminal,
  Clock,
  TrendingUp,
  Activity,
  Scale,
  Palette,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { 
  DEPARTMENT_COHORTS, 
  VISITING_CAMPUS_DRIVES, 
  FACULTY_RND_PROJECTS, 
  STUDENT_DOC_INSPECTIONS 
} from '../../mock/collegeData';
import { NirfNaacModal } from './NirfNaacModal';
import { DriveRosterModal } from './DriveRosterModal';
import { CollegeElaInspectorModal } from './CollegeElaInspectorModal';

const getDeptIcon = (deptId: string, className = "w-4 h-4") => {
  switch (deptId) {
    case 'DEPT-CSE':
      return <Cpu className={className} />;
    case 'DEPT-COMM':
      return <TrendingUp className={className} />;
    case 'DEPT-BIO':
      return <Activity className={className} />;
    case 'DEPT-LAW':
      return <Scale className={className} />;
    case 'DEPT-DES':
      return <Palette className={className} />;
    default:
      return <Building2 className={className} />;
  }
};

export const CollegePortal: React.FC = () => {
  const { theme } = useTheme();

  // Navigation Sub-Tabs
  type TpoTab = 'cohort_readiness' | 'campus_drives' | 'curriculum_radar' | 'erp_onboarding' | 'faculty_rnd';
  const [activeTab, setActiveTab] = useState<TpoTab>('cohort_readiness');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Modals State
  const [showNirfModal, setShowNirfModal] = useState(false);
  const [showDriveRosterModal, setShowDriveRosterModal] = useState(false);
  const [showElaModal, setShowElaModal] = useState(false);

  // ERP Sync Simulation
  const [isErpSyncing, setIsErpSyncing] = useState(false);
  const [erpSyncSuccess, setErpSyncSuccess] = useState(false);

  // Bulk Ingestion Simulation
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // BoS Memo Generation
  const [isGeneratingBosMemo, setIsGeneratingBosMemo] = useState(false);

  const handleTriggerErpSync = () => {
    setIsErpSyncing(true);
    setTimeout(() => {
      setIsErpSyncing(false);
      setErpSyncSuccess(true);
      setTimeout(() => setErpSyncSuccess(false), 3500);
    }, 1200);
  };

  const handleSimulateCsvUpload = () => {
    setIsUploadingCsv(true);
    setTimeout(() => {
      setIsUploadingCsv(false);
      setUploadSuccessMessage('Successfully ingested 420 student records from Batch_2026_Semester8.csv. DigiLocker PKI validation initialized.');
      setTimeout(() => setUploadSuccessMessage(null), 4000);
    }, 1100);
  };

  const handleGenerateBosMemo = () => {
    setIsGeneratingBosMemo(true);
    setTimeout(() => {
      setIsGeneratingBosMemo(false);
      alert('Board of Studies (BoS) Curriculum Reform Advisory Memo compiled with AICTE Syllabus Alignment Index.');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* 1. INSTITUTIONAL TPO COMMAND CENTER HERO BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xl space-y-4 border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-transparent to-teal-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                INSTITUTIONAL TPO COMMAND CENTER
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-500" /> ZERO GHOST RESUME GUARANTEE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Cohort Skill Readiness, 1-Click NIRF / NAAC Engine & Sovereign TPO Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Liberating placement officers, deans, and faculty from chaotic spreadsheets and manual file audits with <strong>85% auditing workload reduction</strong>, cryptographically verifiable accreditation reports, and in-house ELA forensic inspections.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowNirfModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black shadow-lg shadow-amber-600/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>1-Click NIRF / NAAC Report</span>
            </button>

            <button
              onClick={() => setShowDriveRosterModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-lg shadow-teal-600/20 transition-all active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Verified Drive Roster</span>
            </button>

            <button
              onClick={() => setShowElaModal(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold transition-all active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>In-House ELA Inspector</span>
            </button>
          </div>

        </div>

        {/* Hero KPI Summary Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credential Audit Reduction</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">85% Slashed</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Weeks of manual file audits to seconds</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accreditation Readiness</div>
            <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400">NAAC A++ / NIRF</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Criterion 5.2.1 / GPH Outcome ready</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corporate Ghost Resumes</div>
            <div className="text-xl sm:text-2xl font-black text-stone-600 dark:text-stone-400">0.0% Fakes</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero corporate blacklisting guarantee</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Verified Cohort</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">1,850 Students</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">96.4% Active in Sovereign Sandboxes</div>
          </div>
        </div>

      </div>

      {/* 2. SUB-TAB NAVIGATION BAR */}
      <div className="relative z-30">
        
        {/* Mobile View: 3 Horizontal Lines Hamburger Toggle (md:hidden) */}
        <div className="md:hidden space-y-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full m3-surface-2 rounded-2xl p-3.5 border border-slate-200/80 dark:border-white/[0.08] shadow-md flex items-center justify-between gap-3 text-slate-900 dark:text-white font-bold text-xs"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Menu className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left truncate">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                  TPO Console Tab
                </span>
                <span className="text-xs font-extrabold truncate text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  {activeTab === 'cohort_readiness' && <BarChart2 className="w-3.5 h-3.5" />}
                  {activeTab === 'campus_drives' && <Briefcase className="w-3.5 h-3.5" />}
                  {activeTab === 'curriculum_radar' && <BookOpen className="w-3.5 h-3.5" />}
                  {activeTab === 'erp_onboarding' && <Layers className="w-3.5 h-3.5" />}
                  {activeTab === 'faculty_rnd' && <Award className="w-3.5 h-3.5" />}
                  {activeTab === 'cohort_readiness' && 'Cohort Readiness'}
                  {activeTab === 'campus_drives' && 'Campus Drives'}
                  {activeTab === 'curriculum_radar' && 'Curriculum Gaps'}
                  {activeTab === 'erp_onboarding' && 'Batch Onboarding'}
                  {activeTab === 'faculty_rnd' && 'Faculty R&D'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400 shrink-0">
              {isMobileMenuOpen ? (
                <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </button>

          {/* Expanded Mobile Dropdown List */}
          {isMobileMenuOpen && (
            <div className="m3-surface-2 rounded-2xl p-2 border border-slate-200 dark:border-white/[0.1] shadow-2xl space-y-1.5 animate-fadeIn">
              {[
                { id: 'cohort_readiness', label: 'Cohort Readiness', icon: <BarChart2 className="w-4 h-4" /> },
                { id: 'campus_drives', label: 'Campus Drives', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'curriculum_radar', label: 'Curriculum Gaps', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'erp_onboarding', label: 'Batch Onboarding', icon: <Layers className="w-4 h-4" /> },
                { id: 'faculty_rnd', label: 'Faculty R&D', icon: <Award className="w-4 h-4" /> }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TpoTab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop View: Sub-Tab Navigation Bar (hidden md:flex) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('cohort_readiness')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === 'cohort_readiness'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Cohort Readiness</span>
          </button>

          <button
            onClick={() => setActiveTab('campus_drives')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === 'campus_drives'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Campus Drives</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black">{VISITING_CAMPUS_DRIVES.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum_radar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === 'curriculum_radar'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Gaps</span>
          </button>

          <button
            onClick={() => setActiveTab('erp_onboarding')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === 'erp_onboarding'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Batch Onboarding</span>
          </button>

          <button
            onClick={() => setActiveTab('faculty_rnd')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              activeTab === 'faculty_rnd'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Faculty R&D</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: COHORT SKILL READINESS & REAL-TIME HEATMAPS */}
      {/* ========================================================================= */}
      {activeTab === 'cohort_readiness' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Departmental Cohort Breakdown & Real-Time Heatmaps</span>
              </h2>
              <p className="text-xs text-slate-500">
                Visualizing batch-by-batch competency scores, corporate threshold readiness, and top verified skills.
              </p>
            </div>

            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              Active Evaluation Cycle: 2025-2026 Academic Term
            </span>
          </div>

          {/* Departmental Cohort Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENT_COHORTS.map((dept) => {
              const readinessPercent = Math.round((dept.readyStudents / dept.totalStudents) * 100);

              return (
                <div
                  key={dept.id}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        {getDeptIcon(dept.id, "w-5 h-5")}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {dept.shortCode} DEPT
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {dept.name}
                      </h3>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {dept.topBenchmark}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-white/[0.08]">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Placement Ready</div>
                        <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">
                          {dept.readyStudents} / {dept.totalStudents}
                        </div>
                        <div className="text-[9px] text-slate-500">{readinessPercent}% of batch</div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Avg Competency</div>
                        <div className="text-sm font-black text-teal-600 dark:text-teal-400 font-mono">
                          {dept.avgScore}%
                        </div>
                        <div className="text-[9px] text-slate-500">Median: {dept.medianCtc}</div>
                      </div>
                    </div>

                    {/* Placement Readiness Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500">Corporate Threshold Readiness:</span>
                        <span className="text-amber-600 font-mono">{readinessPercent}% Cleared</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${readinessPercent}%` }} />
                      </div>
                    </div>

                    {/* Top Verified Skill */}
                    <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-0.5">
                      <div className="text-[9px] font-bold text-amber-700 dark:text-amber-300 uppercase">Top Tested Skill</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{dept.topSkill}</div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-600 font-bold">
                      {dept.placementPercent}% Placed
                    </span>
                    <button
                      onClick={() => setShowDriveRosterModal(true)}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      <span>Drive Roster</span>
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
      {/* SUB-TAB 2: VISITING CAMPUS DRIVES & DRIVE CALENDAR */}
      {/* ========================================================================= */}
      {activeTab === 'campus_drives' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Campus Drive Management Calendar & Verified Rosters</span>
              </h2>
              <p className="text-xs text-slate-500">
                Centralized scheduler for presentations, written test lab allocations, and 100% verified candidate exports.
              </p>
            </div>

            <button
              onClick={() => setShowDriveRosterModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-95 transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export 100% Verified Drive Roster</span>
            </button>
          </div>

          {/* Drives Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VISITING_CAMPUS_DRIVES.map((drive) => (
              <div
                key={drive.id}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-slate-200 dark:border-white/[0.08] shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-black text-xs flex items-center justify-center border border-amber-200 dark:border-amber-800">
                      {drive.companyLogo}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                      Drive Date: {drive.driveDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {drive.companyName}
                    </h3>
                    <div className="text-xs text-teal-600 dark:text-teal-400 font-bold mt-0.5">
                      {drive.roleTitle}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                      Package: {drive.packageOffered}
                    </div>
                  </div>

                  {/* Venue Allocation */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                    <div className="text-[9px] font-bold uppercase text-slate-400">Allocated Venue & Labs</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">{drive.venue}</div>
                  </div>

                  {/* Criteria & Eligibility Count */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Criteria: CGPA &ge; {drive.criteria.minCgpa} • Sandbox &ge; {drive.criteria.minSandboxScore}%</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Eligible Verified Students:</span>
                      <span className="text-amber-600 dark:text-amber-400 font-mono text-sm">{drive.eligibleCount}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{drive.totalApplied} Applied</span>
                  <button
                    onClick={() => setShowDriveRosterModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Export Roster
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: CURRICULUM DEFICIT & SYLLABUS REFORM RADAR */}
      {/* ========================================================================= */}
      {activeTab === 'curriculum_radar' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-md border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  DEAN & BOARD OF STUDIES (BoS) ADVISORY RADAR
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  Empirical Curriculum Deficit Intelligence
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Comparing students' live proctored sandbox results against corporate hiring demand to introduce targeted micro-modules before graduation.
                </p>
              </div>

              <button
                onClick={handleGenerateBosMemo}
                disabled={isGeneratingBosMemo}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{isGeneratingBosMemo ? 'Generating Memo...' : 'Export BoS Advisory Memo'}</span>
              </button>
            </div>

            {/* Empirical Deficit Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {DEPARTMENT_COHORTS.map((dept) => (
                <div
                  key={dept.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
                      <span className="p-1 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                        {getDeptIcon(dept.id, "w-3.5 h-3.5")}
                      </span>
                      <span>{dept.name}</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                      {dept.deficitPercent}% Deficit Detected
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                      Identified Syllabus Lag: {dept.deficitSkill}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Proctored testing proves that while students pass theoretical university finals, {dept.deficitPercent}% fail the corporate proctored sandbox on this practical industry module.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-teal-600 dark:text-teal-400 font-bold">Recommended: 15-Hour Micro-Module Lab</span>
                    <span className="text-slate-400">Target Term: Sem 7/8</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: BATCH ONBOARDING & ERP HUB */}
      {/* ========================================================================= */}
      {activeTab === 'erp_onboarding' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bulk Spreadsheet Ingestion */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Bulk Student Spreadsheet Ingestion</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Onboard an entire graduating batch of thousands of students in seconds via CSV/Excel upload.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-3 text-center">
                <Upload className="w-8 h-8 text-amber-500" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Drag & Drop Institutional Roster CSV or Excel
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Supported: .csv, .xlsx (Auto-mapped to DigiLocker PKI register)
                  </div>
                </div>

                <button
                  onClick={handleSimulateCsvUpload}
                  disabled={isUploadingCsv}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-95 transition-all"
                >
                  {isUploadingCsv ? 'Validating Schema & Ingesting...' : 'Simulate Ingestion (420 Students)'}
                </button>
              </div>

              {uploadSuccessMessage && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold animate-fadeIn">
                  ✓ {uploadSuccessMessage}
                </div>
              )}
            </div>

            {/* Campus ERP Connectors */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Campus ERP Webhook Connectors</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    Auto-Sync Active
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Bi-directional REST webhooks with institutional student lifecycle systems.
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">SAP Student Lifecycle Management (SLcM)</div>
                      <div className="text-[10px] text-slate-400">Last Synced: 14 mins ago • Latency: 28ms</div>
                    </div>
                    <span className="font-mono text-amber-600 font-bold text-[11px]">Connected ✓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Oracle PeopleSoft Campus Solutions</div>
                      <div className="text-[10px] text-slate-400">Marksheet Registry Webhook • SSL TLS 1.3</div>
                    </div>
                    <span className="font-mono text-amber-600 font-bold text-[11px]">Connected ✓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">University Sovereign DigiLocker Gateway</div>
                      <div className="text-[10px] text-slate-400">Institutional SHA-256 Authority Ledger</div>
                    </div>
                    <span className="font-mono text-amber-600 font-bold text-[11px]">Active ✓</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  onClick={handleTriggerErpSync}
                  disabled={isErpSyncing}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isErpSyncing ? 'animate-spin' : ''}`} />
                  <span>{isErpSyncing ? 'Syncing with Campus ERP...' : 'Trigger Bi-Directional ERP Sync'}</span>
                </button>

                {erpSyncSuccess && (
                  <div className="text-center text-xs font-bold text-amber-600 dark:text-amber-400 mt-2">
                    ✓ All 1,850 student attendance and semester grades synchronized!
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: FACULTY-INDUSTRY R&D & NEP 2020 */}
      {/* ========================================================================= */}
      {activeTab === 'faculty_rnd' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                  NATIONAL EDUCATION POLICY (NEP 2020) • AICTE 360° FACULTY POINTS
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  Faculty-Industry R&D & Sabbatical Hub
                </h2>
                <p className="text-xs text-slate-500">
                  Matching academic faculty research proposals with direct corporate grants, 1-click mutual NDAs, and automated institutional NOCs.
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-lg">
                Total Industry Grants: ₹88,50,000 Active
              </span>
            </div>

            {/* Grants List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {FACULTY_RND_PROJECTS.map((grant) => (
                <div
                  key={grant.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {grant.corporateSponsor}
                      </span>
                      <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">
                        {grant.grantAmount}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">
                      {grant.title}
                    </h4>

                    <div className="text-[11px] text-slate-500">
                      Investigator: <strong className="text-slate-800 dark:text-slate-200">{grant.facultyName}</strong>
                    </div>

                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-800 dark:text-amber-300 font-bold flex items-center justify-between">
                      <span>{grant.ipTermSheetStatus}</span>
                      <span>+{grant.aictePointsAwarded} AICTE Pts</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Horizon: {grant.durationMonths} Mos</span>
                    <button
                      onClick={() => alert(`Mutual NDA & IP Term Sheet for ${grant.corporateSponsor} downloaded. Stamped under Indian Patents Act 1970.`)}
                      className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      1-Click NDA
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. NIRF / NAAC Report Modal */}
      {showNirfModal && (
        <NirfNaacModal onClose={() => setShowNirfModal(false)} />
      )}

      {/* 2. 100% Verified Drive Roster Modal */}
      {showDriveRosterModal && (
        <DriveRosterModal onClose={() => setShowDriveRosterModal(false)} />
      )}

      {/* 3. In-House OpenCV ELA Forensic Inspector Modal */}
      {showElaModal && (
        <CollegeElaInspectorModal onClose={() => setShowElaModal(false)} />
      )}

    </div>
  );
};
