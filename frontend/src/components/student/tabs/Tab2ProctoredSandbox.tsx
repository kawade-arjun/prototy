import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  ASSESSMENT_TESTS, 
  AssessmentTest, 
  AssessmentSubTab 
} from '../../../mock/assessmentData';
import { ACADEMIC_STREAMS } from '../../../mock/mockData';
import { AcademicStream } from '../../../types';
import { 
  Trophy, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Lock, 
  Play, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  Layers, 
  FileText, 
  Check, 
  X, 
  Activity, 
  BarChart3, 
  Cpu, 
  ShieldAlert, 
  Maximize2, 
  RefreshCw, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  TrendingUp,
  Scale,
  Palette,
  Award
} from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

const getStreamIcon = (streamId: string, className = "w-4 h-4") => {
  switch (streamId) {
    case 'tech_ai':
      return <Cpu className={className} />;
    case 'commerce_finance':
      return <TrendingUp className={className} />;
    case 'healthcare_bio':
      return <Activity className={className} />;
    case 'law_governance':
      return <Scale className={className} />;
    case 'ui_ux':
      return <Palette className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

export const Tab2ProctoredSandbox: React.FC = () => {
  const { theme } = useTheme();
  const { selectedStream, setStudentStream, activeStudent } = useStudent();

  // Quick dropdown toggle
  const [showStreamDropdown, setShowStreamDropdown] = useState(false);

  // Active sub-tabs (defaults to all_tests)
  const [activeSubTab, setActiveSubTab] = useState<AssessmentSubTab>('all_tests');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Active Test Split-Screen Modal State
  const [activeTest, setActiveTest] = useState<AssessmentTest | null>(null);
  const [editorLanguage, setEditorLanguage] = useState<'python' | 'cpp' | 'java' | 'typescript'>('python');
  const [currentCode, setCurrentCode] = useState('');
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);
  const [terminalTrayMode, setTerminalTrayMode] = useState<'suite' | 'custom_input'>('suite');
  const [customInputText, setCustomInputText] = useState('arr = [10, 20, 35, 50, 75]\ntarget = 85');
  const [customInputOutput, setCustomInputOutput] = useState<string | null>(null);
  const [sandboxOutput, setSandboxOutput] = useState<{
    status: 'passed' | 'failed' | 'idle';
    passedCount: number;
    totalCount: number;
    details: string;
  } | null>(null);

  // Sovereign Cryptographic Badge Minting Modal State
  const [mintedBadge, setMintedBadge] = useState<{
    testTitle: string;
    badgeName: string;
    hash: string;
    timestamp: string;
  } | null>(null);

  // Anti-Cheat Telemetry State for Active Session
  const [antiCheatFlags, setAntiCheatFlags] = useState(0);
  const [showPasteWarning, setShowPasteWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45:00
  const [sessionLocked, setSessionLocked] = useState(false);

  // Diagnostic Report Modal State
  const [diagnosticReportTest, setDiagnosticReportTest] = useState<AssessmentTest | null>(null);

  const getBoilerplateCode = (lang: 'python' | 'cpp' | 'java' | 'typescript', title: string) => {
    switch (lang) {
      case 'python':
        return `# ${title} - Python 3.12 Sandbox\ndef solution(*args):\n    # Write production-grade code below\n    return True\n`;
      case 'cpp':
        return `// ${title} - C++ 20 Sandbox\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write production-grade code below\n    cout << "Passed" << endl;\n    return 0;\n}\n`;
      case 'java':
        return `// ${title} - Java 17 Sandbox\nimport java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write production-grade code below\n        System.out.println("Passed");\n    }\n}\n`;
      case 'typescript':
        return `// ${title} - TypeScript 5.4 Sandbox\nexport function solution(input: any): any {\n    // Write production-grade code below\n    return true;\n}\n`;
    }
  };

  // Sub-tabs definition with colors & icons (All Tests tab placed before Daily Quests)
  const subTabs = [
    { id: 'all_tests' as AssessmentSubTab, label: 'All Tests', duration: 'All', color: 'text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30 dark:bg-amber-500/10' },
    { id: 'daily_quests' as AssessmentSubTab, label: 'Daily Quests', duration: '5–10 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
    { id: 'domain_benchmarks' as AssessmentSubTab, label: 'Domain-Specific Benchmarks', duration: '30–60 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
    { id: 'recruiter_drives' as AssessmentSubTab, label: 'Recruiter Drives', duration: '45–90 Mins', color: 'text-purple-500 border-purple-500/30 bg-purple-500/10' },
    { id: 'aptitude_logic' as AssessmentSubTab, label: 'Aptitude & Logic', duration: '30–45 Mins', color: 'text-orange-500 border-orange-500/30 bg-orange-500/10' },
    { id: 'soft_skills_ethics' as AssessmentSubTab, label: 'Soft Skills & Ethics', duration: '15–30 Mins', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' }
  ];

  // Active stream metadata
  const currentStreamMeta = ACADEMIC_STREAMS.find(s => s.id === selectedStream)!;

  // Anti-Cheat Listeners when Active Test is open
  useEffect(() => {
    if (!activeTest) return;

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      setShowPasteWarning(true);
      setAntiCheatFlags(prev => prev + 1);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAntiCheatFlags(prev => prev + 1);
      }
    };

    window.addEventListener('paste', handlePaste);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('paste', handlePaste);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeTest]);

  // Real-time ticking countdown timer when active test is open
  useEffect(() => {
    if (!activeTest) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setSessionLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTest]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Launch Split-Screen Test Sandbox
  const handleLaunchTest = (test: AssessmentTest) => {
    setActiveTest(test);
    setTimeRemaining(test.durationMinutes * 60);
    setAntiCheatFlags(0);
    setSessionLocked(false);
    setSandboxOutput(null);
    setCurrentCode(test.initialCode || `# ${test.title} - Candidate Sandbox Engine\n# Write your production-grade implementation below:\n\ndef solution():\n    pass\n`);
  };

  // Execute Sandbox Runner
  const handleExecuteSandbox = () => {
    setIsRunningSandbox(true);
    setSandboxOutput(null);

    setTimeout(() => {
      setIsRunningSandbox(false);
      setSandboxOutput({
        status: 'passed',
        passedCount: 4,
        totalCount: 4,
        details: 'All 4/4 Judge0 Test Suites Cleared in 14ms. P99 Memory Overhead < 4MB. Ready for Submission.'
      });
    }, 1200);
  };

  // Final Submit Test in Modal
  const handleSubmitTest = () => {
    if (!activeTest) return;
    const finishedTest = { ...activeTest, status: 'completed' as const, score: 96, percentile: 98.9 };
    setActiveTest(null);
    setDiagnosticReportTest(finishedTest);
  };

  // Filter tests strictly by sub-tab, student discipline, and search query
  const filteredTests = ASSESSMENT_TESTS.filter(t => {
    const matchSubTab = activeSubTab === 'all_tests' ? true : t.subTab === activeSubTab;
    // Delete/exclude any tests from other fields unless they are universal aptitude or soft skills
    const matchStream = (t.subTab === 'aptitude_logic' || t.subTab === 'soft_skills_ethics')
      ? true
      : t.stream === selectedStream;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skillTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.benchmarkEntity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubTab && matchStream && matchSearch;
  });

  return (
    <div className="space-y-5 font-sans">

      {/* 1. TOP PERFORMANCE & CREDENTIAL KPI BAR */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                ENGINE OF PROOF
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Skill Verification & Assessment Studio
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proving verified capability through proctored sandboxes, isolated test runners, and anti-cheat telemetry.
            </p>
          </div>

          {/* Discipline Quick-Switch Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowStreamDropdown(!showStreamDropdown)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0d1424] border border-slate-200 dark:border-white/[0.08] hover:border-amber-500 transition-all text-xs font-bold text-slate-900 dark:text-white shadow-sm"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                {getStreamIcon(currentStreamMeta.id, "w-4 h-4")}
              </div>
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase font-semibold">Discipline</div>
                <div className="text-xs font-extrabold text-amber-600 dark:text-amber-400">{currentStreamMeta.name}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {showStreamDropdown && (
              <div className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-2xl p-2 border border-slate-200 dark:border-white/[0.1] shadow-2xl z-40 space-y-1">
                {ACADEMIC_STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setStudentStream(s.id);
                      setShowStreamDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedStream === s.id
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${selectedStream === s.id ? 'bg-white/20 text-white' : 'bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300'} flex items-center justify-center shrink-0`}>
                      {getStreamIcon(s.id, "w-3.5 h-3.5")}
                    </div>
                    <div className="truncate">
                      <div>{s.name}</div>
                      <div className="text-[10px] font-normal opacity-80">{s.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* The 4 KPI Gauges (Dynamic per Active Student Disciplinary Field) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.08]">
          
          {/* KPI 1: Composite Competency Score */}
          <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Composite Competency Score
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">{activeStudent.compositeScore}</span>
              <span className="text-[11px] text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 truncate">
              <Trophy className="w-3 h-3 shrink-0" /> {activeStudent.nationalPercentile} Percentile
            </div>
          </div>

          {/* KPI 2: Evaluations Ratio */}
          <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Evaluations Ratio
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                {activeStudent.evaluationsRatio.split(' ')[0]} / {activeStudent.evaluationsRatio.split(' ')[2]}
              </span>
              <span className="text-[11px] text-slate-400 font-bold">Cleared</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {activeStudent.evaluationsRatio.includes('(') ? activeStudent.evaluationsRatio.split('(')[1].replace(')', '') : '88% Completion'}
            </div>
          </div>

          {/* KPI 3: Gamified Streak Counter */}
          <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              Gamified Streak & Level
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-500 tracking-tight flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 shrink-0" /> {activeStudent.streakDays}-Day
              </span>
              <span className="text-[11px] text-slate-400 font-bold">Streak</span>
            </div>
            <div className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold truncate">
              Level {Math.floor(activeStudent.streakDays / 3) + 2} Scholar • +50 XP/Test
            </div>
          </div>

          {/* KPI 4: National AICTE Benchmark Badge */}
          <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-[#080d1a]/90 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                National Benchmark Badge
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{activeStudent.benchmarkBadge.split('•')[0]}</span>
              </div>
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold truncate">
              0% Fraud • {activeStudent.digiLockerId}
            </div>
          </div>

        </div>
      </div>

      {/* 2. DISTINCT ASSESSMENT SUB-TABS (All Tests placed before Daily Quests) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* The Sub-Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? `${tab.color} shadow-md`
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {tab.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search within Assessments */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search test or skill tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

      </div>

      {/* 3. ASSESSMENT TEST CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTests.map((test) => {
          const isCompleted = test.status === 'completed';
          const isInProgress = test.status === 'in_progress';

          return (
            <div
              key={test.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-lg group hover:-translate-y-0.5"
            >
              <div className="space-y-2.5">
                
                {/* Header: Category Pill + Duration & Question Count */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
                    {test.subTab.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {test.durationMinutes} Mins • {test.questionCount} {test.questionCount === 1 ? 'Task' : 'Tasks'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {test.title}
                </h3>

                {/* Benchmarking Entity */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[9px] flex items-center justify-center border border-amber-200 dark:border-amber-800 shrink-0">
                    {test.benchmarkEntity.logo}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">{test.benchmarkEntity.name}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {test.description}
                </p>

                {/* Skills Tested */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(test.skillTags || []).map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{sk}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer: Action / Status */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                {isCompleted ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Score: {test.score}% • Cleared</span>
                    </div>
                    <button
                      onClick={() => setDiagnosticReportTest(test)}
                      className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>Diagnostic</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : isInProgress ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> In Progress
                      </span>
                      <span className="text-slate-500 font-mono">{test.progressPercent}% complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${test.progressPercent}%` }} />
                    </div>
                    <button
                      onClick={() => handleLaunchTest(test)}
                      className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all active:scale-95"
                    >
                      Resume Assessment
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {test.difficulty}
                    </span>
                    <button
                      onClick={() => handleLaunchTest(test)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                    >
                      <span>Start Assessment</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. SPLIT-SCREEN DISTRACTION-FREE PROCTORED SANDBOX MODAL */}
      {activeTest && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          
          {/* Top Proctoring Status HUD Header */}
          <div className="bg-[#0a0f1d] border-b border-white/[0.1] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-white">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                {activeTest.id}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white truncate max-w-md">
                {activeTest.title}
              </h3>
            </div>

            {/* Proctoring Status Banner (Specification 4) */}
            <div className="flex items-center gap-3">
              
              {/* Proctored Environment Active Pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Proctored Environment: Fullscreen Enforced • Paste Guard Active</span>
              </div>

              {/* Tab Switches & Focus Flags */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                antiCheatFlags === 0
                  ? 'bg-slate-900 border-white/[0.08] text-slate-300'
                  : 'bg-amber-500/20 border-amber-500 text-amber-300'
              }`}>
                <span>Flags:</span>
                <span className="font-mono text-sm">{antiCheatFlags} / 3</span>
              </div>

              {/* Automated Countdown Timer */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-black shadow-inner">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-sm tracking-wider">{formatTimer(timeRemaining)}</span>
              </div>

              {/* Submit / Exit */}
              <button
                onClick={handleSubmitTest}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>

              <button
                onClick={() => setActiveTest(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                title="Exit Sandbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Main Split-Screen Workspace (Left: Instructions, Right: Sandbox Engine) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            
            {/* Left Pane: Instructions, Constraints, Sample Cases */}
            <div className="p-6 overflow-y-auto border-r border-white/[0.1] bg-[#070b14] space-y-5 text-slate-300 font-sans">
              
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Benchmarked by {activeTest.benchmarkEntity.name}
                </div>
                <h2 className="text-xl font-black text-white">{activeTest.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{activeTest.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0c1222] border border-white/[0.08] space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Assessment Instructions & Rules:
                </h4>
                <ul className="space-y-1.5">
                  {activeTest.instructions.map((inst, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Test Cases */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sample Test Cases:</h4>
                {activeTest.sampleCases.map((sc, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#090e1c] border border-white/[0.06] font-mono text-xs space-y-1.5">
                    <div className="text-slate-400 text-[11px] font-bold">Case #{idx + 1}:</div>
                    <div className="text-slate-200"><strong className="text-slate-400">Input:</strong> {sc.input}</div>
                    <div className="text-amber-400"><strong className="text-slate-400">Expected:</strong> {sc.expected}</div>
                    <div className="text-[11px] text-slate-500 font-sans mt-1">{sc.explanation}</div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Pane: Native Hands-On Practical Sandbox */}
            <div className="flex flex-col bg-[#121624] overflow-hidden">
              
              {/* Specialized Engine 1: Monaco IDE (Tech & AI) */}
              {activeTest.stream === 'tech_ai' && (
                <div className="flex-1 flex flex-col h-full">
                  <div className="bg-[#0b101e] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Judge0 Multi-Language Sandbox</span>
                      <div className="flex items-center bg-[#070b14] p-0.5 rounded-lg border border-white/[0.08]">
                        {(['python', 'cpp', 'java', 'typescript'] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              setEditorLanguage(l);
                              if (activeTest) {
                                setCurrentCode(getBoilerplateCode(l, activeTest.title));
                              }
                            }}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                              editorLanguage === l ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'
                            }`}
                          >
                            {l === 'cpp' ? 'C++ 20' : l === 'python' ? 'Python 3.12' : l === 'java' ? 'Java 17' : 'TS 5.4'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleExecuteSandbox}
                      disabled={isRunningSandbox}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm active:scale-95"
                    >
                      <Play className={`w-3.5 h-3.5 ${isRunningSandbox ? 'animate-spin' : 'fill-white'}`} />
                      <span>{isRunningSandbox ? 'Running Container...' : 'Run Test Cases'}</span>
                    </button>
                  </div>

                  <div className="flex-1 bg-[#1e1e1e]">
                    <Editor
                      height="100%"
                      language={editorLanguage}
                      theme="vs-dark"
                      value={currentCode}
                      onChange={(val) => setCurrentCode(val || '')}
                      options={{
                        fontSize: 13,
                        fontFamily: 'JetBrains Mono, monospace',
                        minimap: { enabled: false },
                        tabSize: 4
                      }}
                    />
                  </div>

                  {/* Terminal Execution & Custom Input Tray */}
                  <div className="bg-[#080c16] border-t border-white/[0.1] text-xs font-mono">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#050810]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTerminalTrayMode('suite')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                            terminalTrayMode === 'suite' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Automated Test Suite (4/4)
                        </button>
                        <button
                          onClick={() => setTerminalTrayMode('custom_input')}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                            terminalTrayMode === 'custom_input' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Custom Test Input Runner
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">Judge0 Isolated Sandbox • Container ID #c8f902</span>
                    </div>

                    <div className="p-3">
                      {terminalTrayMode === 'suite' ? (
                        sandboxOutput ? (
                          <div className="flex items-center justify-between text-amber-400 font-bold">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-amber-400" /> {sandboxOutput.details}
                            </span>
                            <span className="text-[11px] text-slate-400 font-normal">Sandbox exit code: 0</span>
                          </div>
                        ) : (
                          <div className="text-slate-400 text-[11px]">
                            Click "Run Test Cases" to execute candidate code against 4 automated Judge0 test containers.
                          </div>
                        )
                      ) : (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400">Custom Input (stdin):</label>
                              <textarea
                                value={customInputText}
                                onChange={(e) => setCustomInputText(e.target.value)}
                                rows={2}
                                className="w-full bg-[#03050a] border border-white/[0.1] rounded-lg p-2 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400">Standard Output (stdout):</label>
                              <div className="w-full bg-[#03050a] border border-white/[0.1] rounded-lg p-2 text-xs text-amber-400 font-mono h-[54px] overflow-y-auto">
                                {customInputOutput || "Run container with custom input to view stdout..."}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                setCustomInputOutput(`Input Parsed: [${customInputText.replace(/\n/g, ', ')}]\nOutput: 85 (Target Match Found in 3ms)\nExecution Status: SUCCESS (Exit Code 0)`);
                              }}
                              className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px]"
                            >
                              Run Custom Input
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Specialized Engine 2: Commerce & Finance (Interactive LBO & DCF Simulator) */}
              {activeTest.stream === 'commerce_finance' && (
                <div className="p-6 overflow-y-auto space-y-5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold flex items-center gap-2">
                      Interactive LBO Debt Waterfall & IRR Modeler
                    </h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300">
                      Automated Mathematical Audit Engine
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080c16] border border-white/[0.08] space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-3 gap-2 font-bold text-slate-400 border-b border-white/[0.08] pb-2">
                      <div>Debt Tranche</div>
                      <div>Entry Leverage</div>
                      <div>Exit Amortization</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-1">
                      <div>Senior Term Loan A</div>
                      <div className="text-amber-300">3.50x EBITDA (₹525 Cr)</div>
                      <div className="text-amber-400">100% Repaid via Cash Sweep</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-1">
                      <div>Mezzanine Notes</div>
                      <div className="text-amber-300">2.00x EBITDA (₹300 Cr)</div>
                      <div className="text-amber-400">12% PIK Compounded</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/[0.08] text-sm">
                      <div className="font-bold text-white">Sponsor 5-Yr IRR:</div>
                      <div className="col-span-2 font-black text-amber-400">24.8% (2.85x MoIC)</div>
                    </div>
                  </div>

                  <button
                    onClick={handleExecuteSandbox}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                  >
                    Run Mathematical Model Audit
                  </button>
                </div>
              )}

              {/* Specialized Engine 3: UI/UX Design (Accessibility Canvas Auditor) */}
              {activeTest.stream === 'ui_ux' && (
                <div className="p-6 overflow-y-auto space-y-5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">Live WCAG 2.2 / 3.0 AAA Spatial & Contrast Auditor</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300">
                      DOM Accessibility Tree Parser
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#080c16] border border-white/[0.08]">
                      <div className="text-slate-400 text-[10px]">Contrast Ratio</div>
                      <div className="text-xl font-bold text-amber-400">8.2:1 (AAA)</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#080c16] border border-white/[0.08]">
                      <div className="text-slate-400 text-[10px]">Touch Target</div>
                      <div className="text-xl font-bold text-amber-400">48px × 48px</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#080c16] border border-white/[0.08]">
                      <div className="text-slate-400 text-[10px]">Aria-Expanded</div>
                      <div className="text-xl font-bold text-amber-400">Valid State</div>
                    </div>
                  </div>

                  <button
                    onClick={handleExecuteSandbox}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30"
                  >
                    Execute Automated Accessibility Audit
                  </button>
                </div>
              )}

              {/* Specialized Engine 4: Law & Governance (Statutory Clause Risk Parser) */}
              {activeTest.stream === 'law_governance' && (
                <div className="p-6 overflow-y-auto space-y-5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">Statutory Contract & NDA Clause Risk Parser</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300">
                      DPDP Act 2023 Statutory Rules
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-2 text-xs">
                    <div className="font-bold text-rose-400 uppercase text-[10px]">Section 8 Violation Flagged:</div>
                    <p className="text-slate-300 leading-relaxed font-mono">
                      "Vendor indemnification limited to ₹10,000 for statutory data fiduciary breaches involving Indian citizen biometrics."
                    </p>
                  </div>

                  <button
                    onClick={handleExecuteSandbox}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30"
                  >
                    Execute Statutory Clause Risk Evaluation
                  </button>
                </div>
              )}

              {/* Specialized Engine 5: Healthcare & Bio (Biostatistical Clinical Validator) */}
              {activeTest.stream === 'healthcare_bio' && (
                <div className="p-6 overflow-y-auto space-y-5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">Biostatistical Clinical Trial Validator</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300">
                      Kaplan-Meier Survival Curves
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#080c16] border border-white/[0.08] font-mono text-xs space-y-2">
                    <div className="text-slate-400">Clinical Cohort: Progression-Free Survival (N=420)</div>
                    <div className="text-amber-400 font-bold">Hazard Ratio (HR): 0.68 (95% CI: 0.52 - 0.89)</div>
                    <div className="text-amber-300 font-bold">Log-Rank Test p-value: 0.004 (Statistically Significant)</div>
                  </div>

                  <button
                    onClick={handleExecuteSandbox}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30"
                  >
                    Execute Statistical Validation
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Anti-Paste Modal Warning (Specification 4) */}
          {showPasteWarning && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="glass-panel-glow max-w-md w-full rounded-3xl p-6 border border-amber-500/50 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1.5">
                  <h4 className="text-base font-black text-white">Anti-Cheat Notice</h4>
                  <p className="text-xs text-amber-200 leading-relaxed">
                    External clipboard paste blocked by Proctoring Guard. Raw implementation is required.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    This attempt has been logged in your recruiter audit report (Flag #{antiCheatFlags}).
                  </p>
                </div>
                <button
                  onClick={() => setShowPasteWarning(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  I Understand & Acknowledge
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 5. POST-ASSESSMENT DIAGNOSTIC FEEDBACK & OUTCOME LEARNING LOOP MODAL (Specification 6) */}
      {diagnosticReportTest && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-7 border border-white/[0.15] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                  DIAGNOSTIC OUTCOME LOOP
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {diagnosticReportTest.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Issued by {diagnosticReportTest.benchmarkEntity.name}
                </p>
              </div>
              <button
                onClick={() => setDiagnosticReportTest(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Score & Percentile Ribbon */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Verified Evaluation Score</div>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {diagnosticReportTest.score}% • Cleared
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Benchmark Rank</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                  Top 2% Tier
                </div>
              </div>
            </div>

            {/* Detailed Diagnostic Breakdown: Strengths vs Deficits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Strengths Demonstrated */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Strengths Demonstrated</span>
                </div>
                <ul className="space-y-1.5">
                  {(diagnosticReportTest.strengthsDemonstrated || [
                    'Mastered core algorithms in O(N) optimal time',
                    'Zero memory leaks under stress containers'
                  ]).map((st, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deficits Detected */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Deficits Detected</span>
                </div>
                <ul className="space-y-1.5">
                  {(diagnosticReportTest.deficitsDetected || [
                    'Boundary condition timeout on disconnected graph components'
                  ]).map((df, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{df}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Instant Profile Vector Update Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Profile Vector Updated in pgvector • Recalculated Global Rank: Top 1.1%</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-600 text-white font-bold">
                Synchronized
              </span>
            </div>

            {/* Issue Verified Digital Badge */}
            {diagnosticReportTest.awardedBadge && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                    Sovereign Verifiable Credential Issued
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {diagnosticReportTest.awardedBadge}
                  </div>
                </div>
              </div>
            )}

            {/* Minimum Skill-Bridge Recommendation */}
            {diagnosticReportTest.skillBridgeRecommendation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Minimum Skill-Bridge Recommendation:
                  </span>
                  <span className="text-slate-500 font-mono">
                    {diagnosticReportTest.skillBridgeRecommendation.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {diagnosticReportTest.skillBridgeRecommendation.title} ({diagnosticReportTest.skillBridgeRecommendation.type})
                </p>
                <button
                  onClick={() => alert(`Launching ${diagnosticReportTest.skillBridgeRecommendation?.title} sandbox blueprint!`)}
                  className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline pt-1"
                >
                  Start High-Yield Bridge Lab <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => setDiagnosticReportTest(null)}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Sovereign Cryptographic Verifiable Credential Minting Modal */}
      {mintedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-md m3-surface-2 rounded-3xl p-6 border border-amber-500/40 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setMintedBadge(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Verifiable Credential Minted!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {mintedBadge.badgeName}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070b14] border border-white/[0.08] space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Assessment Title:</span>
                <span className="text-amber-300 font-bold truncate max-w-[180px]">{mintedBadge.testTitle}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Cryptographic Proof:</span>
                <span className="text-amber-400 font-bold">{mintedBadge.hash}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Timestamp:</span>
                <span className="text-slate-300">{mintedBadge.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Badge ${mintedBadge.badgeName} attached to Sovereign Living Resume!`);
                  setMintedBadge(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Attach to Living Resume
              </button>
              <button
                onClick={() => setMintedBadge(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
