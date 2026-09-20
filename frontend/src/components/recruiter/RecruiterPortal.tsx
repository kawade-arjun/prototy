import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  Send, 
  Sliders, 
  AlertTriangle, 
  Calendar, 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Users, 
  BarChart3, 
  Binary, 
  Terminal, 
  Cpu, 
  Search, 
  Filter, 
  Lock, 
  ArrowRight, 
  Building2, 
  Check, 
  ChevronRight, 
  Plus, 
  Download, 
  Share2, 
  MessageSquare,
  ShieldAlert,
  Flame,
  Award,
  BookOpen,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { 
  RECRUITER_CANDIDATES, 
  RecruiterCandidate, 
  FUNNEL_STAGES, 
  FunnelStage,
  RECRUITER_OPENINGS, 
  RecruiterOpening,
  INITIAL_CUSTOM_ASSESSMENTS, 
  CustomAssessmentConfig,
  INITIAL_CHAT_THREADS, 
  RecruiterChatThread 
} from '../../mock/recruiterData';
import { ElaForensicViewerModal } from './ElaForensicViewerModal';
import { InterviewSchedulerModal } from './InterviewSchedulerModal';

export const RecruiterPortal: React.FC = () => {
  const { theme } = useTheme();

  // Top Sub-Tabs Navigation
  type ConsoleTab = 'pipeline' | 'openings_analytics' | 'assessment_studio' | 'messaging';
  const [activeConsoleTab, setActiveConsoleTab] = useState<ConsoleTab>('pipeline');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeConsoleTab]);

  // Candidate Data State
  const [candidates, setCandidates] = useState<RecruiterCandidate[]>(RECRUITER_CANDIDATES);
  const [activeStageFilter, setActiveStageFilter] = useState<FunnelStage | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 40-40-20 Dynamic Cutoff Slider (50% to 95%)
  const [dynamicCutoff, setDynamicCutoff] = useState<number>(85);

  // Gale-Shapley Matching Animation State
  const [isMatchingRunning, setIsMatchingRunning] = useState(false);
  const [matchingResultsSummary, setMatchingResultsSummary] = useState<string | null>(null);

  // Modals State
  const [elaInspectionCandidate, setElaInspectionCandidate] = useState<RecruiterCandidate | null>(null);
  const [schedulingCandidate, setSchedulingCandidate] = useState<RecruiterCandidate | null>(null);

  // Openings 8-Step Analytics State
  const [selectedOpeningId, setSelectedOpeningId] = useState<string>('JOB-MSFT-901');
  const [activeAnalyticsStep, setActiveAnalyticsStep] = useState<number>(1);
  const selectedOpening = RECRUITER_OPENINGS.find(o => o.id === selectedOpeningId) || RECRUITER_OPENINGS[0];

  // Custom Assessment Studio State
  const [assessments, setAssessments] = useState<CustomAssessmentConfig[]>(INITIAL_CUSTOM_ASSESSMENTS);
  const [newTestTitle, setNewTestTitle] = useState('Distributed Consensus & Raft Leader Election');
  const [newTestStream, setNewTestStream] = useState<'tech_ai' | 'commerce_finance' | 'ui_ux' | 'law_governance' | 'healthcare_bio'>('tech_ai');
  const [antiPasteEnabled, setAntiPasteEnabled] = useState(true);
  const [blurTrackerEnabled, setBlurTrackerEnabled] = useState(true);
  const [sessionLockEnabled, setSessionLockEnabled] = useState(true);
  const [assessmentDeploySuccess, setAssessmentDeploySuccess] = useState(false);

  // Messaging State
  const [chatThreads, setChatThreads] = useState<RecruiterChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('THREAD-TPO-IITB');
  const [chatInputText, setChatInputText] = useState('');
  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];
  const totalUnreadMessages = chatThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  // Run Gale-Shapley Matching Engine
  const handleRunGaleShapley = () => {
    setIsMatchingRunning(true);
    setMatchingResultsSummary(null);

    setTimeout(() => {
      setIsMatchingRunning(false);
      setMatchingResultsSummary('Gale-Shapley Stable Marriage Matcher Cleared! 9 Optimal Pairs created with 0 blocking pairs.');
    }, 1200);
  };

  // Quarantine Handler from ELA modal
  const handleQuarantineCandidate = (candId: string) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, interviewStatus: 'quarantined', fraudRisk: 'tamper_suspect' } : c));
  };

  // Alert TPO Handler from ELA modal
  const handleAlertTpo = (candId: string) => {
    // Add an alert message to the TPO chat thread
    setChatThreads(prev => prev.map(t => {
      if (t.id === 'THREAD-TPO-IITB') {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: `M-ALERT-${Date.now()}`,
              sender: 'recruiter',
              senderName: 'Corporate Talent Console (Audit Bot)',
              timestamp: 'Just now',
              text: `URGENT FRAUD AUDIT NOTICE: Candidate Vikramaditya Rao (${candId}) flagged with ELA Discrepancy Index 0.884 (altered CGPA 9.85). Academic credential verification ledger paused pending registrar review.`,
              isEncrypted: true
            }
          ]
        };
      }
      return t;
    }));
  };

  // Schedule Interview Handler
  const handleScheduleInterview = (candId: string, details: any) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candId) {
        return {
          ...c,
          stage: 'technical_round_1',
          interviewStatus: 'scheduled_r1',
          scheduledInterview: details
        };
      }
      return c;
    }));
  };

  // Send Chat Message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      sender: 'recruiter' as const,
      senderName: 'Corporate Talent Console',
      timestamp: 'Just now',
      text: chatInputText.trim(),
      isEncrypted: true
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessageTime: 'Just now',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setChatInputText('');
  };

  // Deploy New Custom Assessment
  const handleDeployAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAss: CustomAssessmentConfig = {
      id: `ASSESS-${Date.now()}`,
      title: newTestTitle,
      stream: newTestStream,
      targetOpeningId: selectedOpeningId,
      durationMinutes: 45,
      difficulty: 'Elite Benchmark',
      runtimeLimitSeconds: 2.0,
      memoryLimitMb: 16,
      proctoring: {
        antiPasteGuard: antiPasteEnabled,
        focusBlurTracker: blurTrackerEnabled,
        automatedSessionLock: sessionLockEnabled
      },
      starterCode: `# Custom Test Sandbox - ${newTestTitle}\n# Enforce runtime < 2.0s and memory < 16MB\ndef solution():\n    pass\n`,
      testCases: [
        { input: 'test_case_1', expected: 'expected_1', isHidden: false },
        { input: 'test_case_2_hidden', expected: 'expected_2', isHidden: true }
      ]
    };

    setAssessments(prev => [newAss, ...prev]);
    setAssessmentDeploySuccess(true);
    setTimeout(() => setAssessmentDeploySuccess(false), 3000);
  };

  // Partition candidates based on Dynamic Cutoff and Stage Filter
  const filteredCandidates = candidates.filter(c => {
    const matchesStage = activeStageFilter === 'all' ? true : c.stage === activeStageFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const passedCutoffCandidates = filteredCandidates.filter(c => c.scores.composite >= dynamicCutoff);
  const belowCutoffCandidates = filteredCandidates.filter(c => c.scores.composite < dynamicCutoff);

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      
      {/* 1. CORPORATE TALENT CONSOLE HERO BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xl space-y-4 border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5 align-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-black uppercase px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                CORPORATE TALENT CONSOLE
              </span>
              {/* <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 0% CREDENTIAL FRAUD GUARANTEE
              </span> */}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Pre-Verified Sovereign Talent Pipeline & Automated Shortlisting
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Replacing weeks of manual resume sorting         </p>
          </div>

          {/* Right Action: Gale-Shapley Matcher */}
          {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              onClick={handleRunGaleShapley}
              disabled={isMatchingRunning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-75"
            >
              <Cpu className={`w-4 h-4 text-slate-950 ${isMatchingRunning ? 'animate-spin' : ''}`} />
              <span>{isMatchingRunning ? 'Executing Stable Matching...' : 'Run Gale-Shapley Matcher'}</span>
            </button>
          </div> */}

        </div>

        {/* Hero KPI Summary Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hiring Speed Acceleration</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">75% Faster</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Waives manual keyword screening</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Screening Cost Reduction</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">30% Lower</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero 3rd-party testing vendor fees</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credential Tampering Rate</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">0.0% Fraud</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">OpenCV ELA + pyHanko verified</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#080d1a]/80 border border-slate-200/80 dark:border-white/[0.06] space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pre-Verified Sovereign Pool</div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">4,280 Candidates</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">100% Passed 3-Tier Pre-Flight Audit</div>
          </div>
        </div>

        {matchingResultsSummary && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-bold animate-fadeIn">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              {matchingResultsSummary}
            </span>
            <button onClick={() => setMatchingResultsSummary(null)} className="text-[10px] uppercase underline">Dismiss</button>
          </div>
        )}
      </div>

      {/* 2. CONSOLE NAVIGATION SUB-TABS */}
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
                  Recruiter Console Tab
                </span>
                <span className="text-xs font-extrabold truncate text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  {activeConsoleTab === 'pipeline' && <BarChart3 className="w-3.5 h-3.5" />}
                  {activeConsoleTab === 'openings_analytics' && <Layers className="w-3.5 h-3.5" />}
                  {activeConsoleTab === 'assessment_studio' && <Terminal className="w-3.5 h-3.5" />}
                  {activeConsoleTab === 'messaging' && <MessageSquare className="w-3.5 h-3.5" />}
                  {activeConsoleTab === 'pipeline' && 'Pipeline'}
                  {activeConsoleTab === 'openings_analytics' && 'Openings'}
                  {activeConsoleTab === 'assessment_studio' && 'Assessments'}
                  {activeConsoleTab === 'messaging' && 'Messages'}
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
                { id: 'pipeline', label: 'Pipeline', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'openings_analytics', label: 'Openings', icon: <Layers className="w-4 h-4" /> },
                { id: 'assessment_studio', label: 'Assessments', icon: <Terminal className="w-4 h-4" /> },
                { id: 'messaging', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> }
              ].map((tab) => {
                const isActive = activeConsoleTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveConsoleTab(tab.id as ConsoleTab);
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

        {/* Desktop View: Console Navigation Sub-Tabs (hidden md:flex) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveConsoleTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              activeConsoleTab === 'pipeline'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600 dark:border-amber-500'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Pipeline</span>
          </button>

          <button
            onClick={() => setActiveConsoleTab('openings_analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              activeConsoleTab === 'openings_analytics'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600 dark:border-amber-500'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Openings</span>
          </button>

          <button
            onClick={() => setActiveConsoleTab('assessment_studio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              activeConsoleTab === 'assessment_studio'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600 dark:border-amber-500'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Assessments</span>
          </button>

          <button
            onClick={() => setActiveConsoleTab('messaging')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
              activeConsoleTab === 'messaging'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border-amber-600 dark:border-amber-500'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
            {totalUnreadMessages > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black">{totalUnreadMessages}</span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE PIPELINE & 40-40-20 COMPOSITE AI SHORTLISTING */}
      {/* ========================================================================= */}
      {activeConsoleTab === 'pipeline' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* THE 8-STAGE RECRUITMENT FUNNEL RIBBON */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl space-y-3 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {/* <Flame className="w-4 h-4 text-amber-500" /> */}
                  <span>The 8-Stage Recruitment Funnel (Live Pipeline Ribbon)</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Click any stage to filter candidate pipeline or review conversion drop-offs.
                </p>
              </div>

              {activeStageFilter !== 'all' && (
                <button
                  onClick={() => setActiveStageFilter('all')}
                  className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Reset Stage Filter (Show All 48)</span>
                </button>
              )}
            </div>

            {/* Interactive 8-Stage Stepper Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {FUNNEL_STAGES.map((stage, idx) => {
                const isSelected = activeStageFilter === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageFilter(isSelected ? 'all' : stage.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/90 dark:bg-amber-950/60 shadow-md ring-2 ring-amber-500/20'
                        : 'border-slate-200 dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#080d1a]/70 hover:border-slate-300 dark:hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 truncate">
                      Stage {idx + 1}
                    </div>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {stage.shortLabel}
                      </span>
                      <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">
                        {stage.count}
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-400 flex items-center justify-between mt-1">
                      <span>Conv.</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{stage.conversionRate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* THE 40-40-20 COMPOSITE AI SCORING ENGINE & CUTOFF SLIDER */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl space-y-4 shadow-md border border-amber-500/20">
            
            {/* Header with Formula Explanation */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                    OBJECTIVE EVALUATION FORMULA
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    The 40-40-20 Composite AI Scoring Engine
                  </h3>
                </div>
                <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg inline-block">
                  Composite Score = 40% (Proctored Sandbox) + 40% (Verified Projects) + 20% (DigiLocker Academics)
                </div>
              </div> */}

              {/* Dynamic Cutoff Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 font-bold mr-1">Cutoff Presets:</span>
                {[
                  { label: '70% Broad', val: 70 },
                  { label: '80% Standard', val: 80 },
                  { label: '85% Elite', val: 85 },
                  { label: '92% AICTE Top Tier', val: 92 }
                ].map(p => (
                  <button
                    key={p.val}
                    onClick={() => setDynamicCutoff(p.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      dynamicCutoff === p.val
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Formula Component Chips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200/80 dark:border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span>40% Proctored Sandbox</span>
                  <span className="font-mono">Weight: 0.40</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Real-time Monaco IDE runs, Judge0 sub-16MB memory test suites, DCF modeling, and WCAG accessibility proofs.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200/80 dark:border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span>40% Verified Projects</span>
                  <span className="font-mono">Weight: 0.40</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Vector embeddings code uniqueness audit against plagiarism, verified GitHub contribution heatmaps & client ratings.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200/80 dark:border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
                  <span>20% DigiLocker Academics</span>
                  <span className="font-mono">Weight: 0.20</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Authentic marksheets and degrees fetched directly from university registries, eliminating self-reported GPA inflation.
                </p>
              </div>
            </div>

            {/* DYNAMIC CUTOFF SLIDER BAR */}
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-[#0c1322] border border-amber-200/60 dark:border-amber-900/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-slate-900 dark:text-white">
                    Dynamic Shortlisting Cutoff Threshold:
                  </span>
                  <span className="text-base font-black font-mono text-amber-600 dark:text-amber-400">
                    {dynamicCutoff}%
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{passedCutoffCandidates.length} Active (Passed)</span>
                  <span className="mx-1.5">•</span>
                  <span className="text-slate-400 font-medium">{belowCutoffCandidates.length} Muted (Below Cutoff)</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono font-bold text-slate-400">50% Lenient</span>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="1"
                  value={dynamicCutoff}
                  onChange={(e) => setDynamicCutoff(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-600 dark:accent-amber-400"
                />
                <span className="text-[10px] font-mono font-bold text-slate-400">95% Elite</span>
              </div>
            </div>

          </div>

          {/* CANDIDATE PIPELINE GRID (Active Passed vs Muted Below Cutoff) */}
          <div className="space-y-4">
            
            {/* Search and Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>Verified Candidate Pool</span>
                <span className="text-slate-400">({filteredCandidates.length} applicants displayed)</span>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by candidate, college, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 shadow-sm"
                />
              </div>
            </div>

            {/* PASSED CUTOFF CANDIDATES (ACTIVE) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Passed Cutoff ({dynamicCutoff}%+) • Qualified for Panels</span>
              </div>

              {passedCutoffCandidates.length === 0 ? (
                <div className="p-8 text-center glass-panel rounded-2xl text-xs text-slate-400">
                  No applicants met the {dynamicCutoff}% cutoff. Try lowering the dynamic slider above.
                </div>
              ) : (
                passedCutoffCandidates.map((cand) => {
                  const isTampered = cand.fraudRisk === 'tamper_suspect';
                  const isScheduled = cand.interviewStatus === 'scheduled_r1';

                  return (
                    <div
                      key={cand.id}
                      className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all shadow-sm hover:shadow-md"
                    >
                      {/* Candidate Profile Info */}
                      <div className="space-y-2 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xl">{cand.avatar}</span>
                          <span className="font-black text-slate-900 dark:text-white text-base">
                            {cand.name}
                          </span>
                          <span className="font-mono text-xs text-slate-400">({cand.id})</span>
                          
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 font-bold">
                            {cand.college} • {cand.streamLabel}
                          </span>

                          {/* Fraud Status Badge */}
                          {isTampered ? (
                            <button
                              onClick={() => setElaInspectionCandidate(cand)}
                              className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/40 font-bold flex items-center gap-1 animate-pulse hover:bg-rose-500/20"
                            >
                              <ShieldAlert className="w-3 h-3" />
                              <span>{cand.fraudBadgeText}</span>
                            </button>
                          ) : (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-amber-500" />
                              <span>{cand.fraudBadgeText}</span>
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Target Role: <strong className="text-amber-600 dark:text-amber-300 font-bold">{cand.targetRole}</strong>
                          <span className="mx-2">•</span>
                          <span className="text-slate-400 font-mono">Stage: {cand.stage.replace('_', ' ')}</span>
                          <span className="mx-2">•</span>
                          <span className="text-slate-500">Applied {cand.appliedDate}</span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {cand.badges.map((b) => (
                            <span
                              key={b}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 40-40-20 Micro Score Breakdown & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-end lg:self-center shrink-0">
                        
                        {/* The Composite Score Gauge */}
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200/80 dark:border-white/[0.06] space-y-1 min-w-[170px]">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-400 uppercase">Composite Score</span>
                            <span className="text-amber-600 dark:text-amber-400 font-mono text-sm font-black">
                              {cand.scores.composite}%
                            </span>
                          </div>

                          {/* 3-Section Weighted Bar */}
                          <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
                            <div className="h-full bg-amber-500" style={{ width: `${cand.scores.sandbox * 0.4}%` }} title="40% Sandbox" />
                            <div className="h-full bg-purple-500" style={{ width: `${cand.scores.projects * 0.4}%` }} title="40% Projects" />
                            <div className="h-full bg-stone-500" style={{ width: `${cand.scores.academics * 0.2}%` }} title="20% Academics" />
                          </div>

                          <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                            <span>SB: {cand.scores.sandbox}%</span>
                            <span>PR: {cand.scores.projects}%</span>
                            <span>AC: {cand.scores.academics}%</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          {isTampered ? (
                            <button
                              onClick={() => setElaInspectionCandidate(cand)}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm shadow-rose-600/20 active:scale-95 transition-all"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Launch OpenCV ELA Viewer</span>
                            </button>
                          ) : isScheduled ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Round 1 Scheduled</span>
                              </span>
                              <button
                                onClick={() => setSchedulingCandidate(cand)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                              >
                                Edit Slot
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSchedulingCandidate(cand)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 active:scale-95 transition-all"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Schedule Round 1</span>
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* BELOW CUTOFF CANDIDATES (MUTED) */}
            {belowCutoffCandidates.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Below Cutoff (&lt;{dynamicCutoff}%) • Auto-Muted ({belowCutoffCandidates.length} Applicants)</span>
                  </span>
                  <span className="text-[10px] font-normal normal-case">
                    Filtered out automatically from technical interview queues.
                  </span>
                </div>

                {belowCutoffCandidates.map((cand) => {
                  const isTampered = cand.fraudRisk === 'tamper_suspect';
                  return (
                    <div
                      key={cand.id}
                      className="glass-panel p-3.5 rounded-xl opacity-60 hover:opacity-100 transition-opacity flex flex-col lg:flex-row lg:items-center justify-between gap-3 border border-dashed border-slate-300 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{cand.avatar}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
                              {cand.name}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">({cand.college})</span>
                            <span className="text-[10px] px-2 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 font-mono">
                              Composite: {cand.scores.composite}%
                            </span>
                            {isTampered && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                                ELA High
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Target: {cand.targetRole}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end lg:self-center">
                        {isTampered && (
                          <button
                            onClick={() => setElaInspectionCandidate(cand)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-[10px] font-bold transition-all"
                          >
                            Inspect Forensic ELA
                          </button>
                        )}
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                          Auto-Muted (Deficit: {(dynamicCutoff - cand.scores.composite).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ACTIVE OPENINGS & 8-STEP ANALYTICS DRILL-DOWN */}
      {/* ========================================================================= */}
      {activeConsoleTab === 'openings_analytics' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Active Opening Selector Ribbon */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-slate-400">Selected Corporate Opening</div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" />
                <span>{selectedOpening.title}</span>
                <span className="text-xs font-mono text-slate-400">({selectedOpening.id})</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Switch Opening:</span>
              <select
                value={selectedOpeningId}
                onChange={(e) => setSelectedOpeningId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 shadow-sm"
              >
                {RECRUITER_OPENINGS.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.title} ({o.organization})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 8-Step Navigation Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { step: 1, label: '1. Overview' },
              { step: 2, label: '2. Applicant Stats' },
              { step: 3, label: '3. Resume Screen' },
              { step: 4, label: '4. Pipeline Matrix' },
              { step: 5, label: '5. Assessments' },
              { step: 6, label: '6. Candidate Matrix' },
              { step: 7, label: '7. Reports & Charts' },
              { step: 8, label: '8. Batch Actions' }
            ].map(s => (
              <button
                key={s.step}
                onClick={() => setActiveAnalyticsStep(s.step)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  activeAnalyticsStep === s.step
                    ? 'border-amber-500 bg-amber-600 text-white shadow-md font-black'
                    : 'border-slate-200 dark:border-white/[0.06] bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold'
                } text-xs`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step 1: Overview */}
          {activeAnalyticsStep === 1 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Role Overview & Requirements</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedOpening.overview.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Mandatory Technical Requirements</div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {selectedOpening.overview.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Compensation & Meta</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div>Salary / CTC: <strong className="text-amber-600 dark:text-amber-400">{selectedOpening.ctc}</strong></div>
                    <div>Location: <strong>{selectedOpening.location}</strong></div>
                    <div>Hiring Manager: <strong>{selectedOpening.hiringManager}</strong></div>
                    <div>Budget Head: <span className="font-mono">{selectedOpening.overview.budgetHead}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Applicant Statistics */}
          {activeAnalyticsStep === 2 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Applicant Status Distribution</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Applicants</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{selectedOpening.applicantStats.total}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">New Unreviewed</div>
                  <div className="text-2xl font-black text-amber-500">{selectedOpening.applicantStats.new}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Under Review</div>
                  <div className="text-2xl font-black text-amber-500">{selectedOpening.applicantStats.underReview}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">40-40-20 Shortlisted</div>
                  <div className="text-2xl font-black text-orange-500">{selectedOpening.applicantStats.shortlisted}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Screening Rejected</div>
                  <div className="text-2xl font-black text-rose-500">{selectedOpening.applicantStats.rejected}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Final Selected</div>
                  <div className="text-2xl font-black text-amber-500">{selectedOpening.applicantStats.selected}</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Resume Screening */}
          {activeAnalyticsStep === 3 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">AI Semantic Vector Match (pgvector Cosine Ranking)</h3>
                  <p className="text-xs text-slate-500">Average applicant vector similarity to Job Description: {selectedOpening.resumeScreening.avgVectorSimilarity}%</p>
                </div>
              </div>

              <div className="space-y-2">
                {selectedOpening.resumeScreening.topMatches.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white mr-2">{m.candidateName}</span>
                      <span className="text-slate-400">• Key Demonstrated Match: <strong className="text-amber-600 dark:text-amber-400">{m.keyStrength}</strong></span>
                    </div>
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
                      {m.similarity}% Match
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Pipeline Matrix */}
          {activeAnalyticsStep === 4 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Funnel Conversion Drop-Off Matrix</h3>
              <div className="space-y-2">
                {selectedOpening.pipelineMatrix.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{step.stageName}</span>
                    <div className="flex items-center gap-4 font-mono text-[11px]">
                      <span>Entered: {step.entered}</span>
                      <span>Passed: <strong>{step.passed}</strong></span>
                      <span className="text-rose-500 font-bold">Drop-off: {step.dropoffPercent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Assessment Integration */}
          {activeAnalyticsStep === 5 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Batch Assessment Performance Telemetry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Average Candidate Score</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{selectedOpening.assessmentStats.avgScore}%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Judge0 Pass Rate</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{selectedOpening.assessmentStats.passRate}%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">P95 Execution Latency</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{selectedOpening.assessmentStats.p95LatencyMs} ms</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Anti-Cheat Violations</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{selectedOpening.assessmentStats.antiCheatViolations}</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Candidate Progress Matrix */}
          {activeAnalyticsStep === 6 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Top Candidate Head-to-Head Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 uppercase font-mono">
                    <tr>
                      <th className="p-3 rounded-l-xl">Candidate</th>
                      <th className="p-3">College</th>
                      <th className="p-3">Sandbox (40%)</th>
                      <th className="p-3">Projects (40%)</th>
                      <th className="p-3">DigiLocker (20%)</th>
                      <th className="p-3">Composite</th>
                      <th className="p-3 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {candidates.slice(0, 4).map(c => (
                      <tr key={c.id}>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{c.name}</td>
                        <td className="p-3 text-slate-500">{c.college}</td>
                        <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">{c.scores.sandbox}%</td>
                        <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">{c.scores.projects}%</td>
                        <td className="p-3 font-mono font-bold text-stone-600 dark:text-stone-400">{c.scores.academics}%</td>
                        <td className="p-3 font-mono font-black text-slate-900 dark:text-white">{c.scores.composite}%</td>
                        <td className="p-3">
                          <button
                            onClick={() => setSchedulingCandidate(c)}
                            className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[10px]"
                          >
                            Schedule R1
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Step 7: Reports & Charts */}
          {activeAnalyticsStep === 7 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white">Executive Talent Analytics & Export</h3>
                <button
                  onClick={() => alert('Executive Talent Dossier (PDF/CSV) generated with cryptographic digital seal.')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Talent Report (PDF/CSV)</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Composite Score Bell Curve Distribution</div>
                <div className="h-24 flex items-end gap-2 pt-4">
                  {[20, 35, 55, 80, 95, 75, 45, 20].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-amber-600/70 hover:bg-amber-500 rounded-t transition-all" style={{ height: `${h}%` }} />
                      <span className="text-[9px] font-mono text-slate-400">{50 + i * 6}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Batch Actions */}
          {activeAnalyticsStep === 8 && (
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Automated Batch Operations & HRMS Sync</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => alert('Batch Announcement dispatched to all 48 candidates!')}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left hover:border-amber-500 transition-all"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Broadcast Announcement</div>
                  <div className="text-[11px] text-slate-500 mt-1">Send interview window guidelines to active batch.</div>
                </button>

                <button
                  onClick={() => alert('Verified Shortlist synced with Workday / Darwinbox via Sovereign API!')}
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left hover:border-amber-500 transition-all"
                >
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300">Sync to HRMS (Workday / Darwinbox)</div>
                  <div className="text-[11px] text-slate-500 mt-1">1-click automated API push with 0% data loss.</div>
                </button>

                <button
                  onClick={() => alert('Offer release deadline extended by 7 calendar days.')}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left hover:border-amber-500 transition-all"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Extend Offer Horizon</div>
                  <div className="text-[11px] text-slate-500 mt-1">Extend candidate acceptance window by 7 days.</div>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CUSTOM ASSESSMENT STUDIO (ANTI-CHEAT TELEMETRY) */}
      {/* ========================================================================= */}
      {activeConsoleTab === 'assessment_studio' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="glass-panel p-6 rounded-2xl space-y-5 shadow-md">
            <div>
              <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                NATIVE TESTING SUITE • ZERO THIRD-PARTY TOOLS
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                Custom Assessment Studio & Anti-Cheat Telemetry
              </h2>
              <p className="text-xs text-slate-500">
                Configure live sandboxes across all 5 streams with strict execution limits, memory bounds, and multi-layer anti-cheat proctoring.
              </p>
            </div>

            {/* Test Creation Form */}
            <form onSubmit={handleDeployAssessment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assessment Title</label>
                  <input
                    type="text"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Discipline Stream</label>
                  <select
                    value={newTestStream}
                    onChange={(e: any) => setNewTestStream(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="tech_ai">Engineering</option>
                    <option value="commerce_finance">Commerce & Quantitative Finance</option>
                    <option value="ui_ux">UI/UX Design & Spatial Systems</option>
                    <option value="law_governance">Law & Public Policy</option>
                    <option value="healthcare_bio">Bioinformatics & Healthcare</option>
                  </select>
                </div>
              </div>

              {/* Proctoring Toggles */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-400">Proctoring Guard Flags Configuration</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={antiPasteEnabled}
                      onChange={(e) => setAntiPasteEnabled(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Anti-Paste Guard (Blocks ChatGPT)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blurTrackerEnabled}
                      onChange={(e) => setBlurTrackerEnabled(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Focus & Tab Blur Tracker (0/3 Flags)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionLockEnabled}
                      onChange={(e) => setSessionLockEnabled(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Automated Countdown Session Lock</span>
                  </label>

                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500">
                  Execution Budget: <strong>&lt; 2.0s Runtime</strong> • <strong>&lt; 16MB Memory Bound</strong>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Deploy Assessment to Active Opening</span>
                </button>
              </div>
            </form>

            {assessmentDeploySuccess && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold animate-fadeIn">
                ✓ Assessment successfully compiled and deployed to {selectedOpening.title}!
              </div>
            )}
          </div>

          {/* Active Configured Assessments */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deployed Native Assessments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessments.map((a) => (
                <div key={a.id} className="glass-panel p-5 rounded-2xl space-y-3 border border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {a.stream.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{a.durationMinutes} Mins</span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{a.title}</h4>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Limit: {a.runtimeLimitSeconds}s</span>
                    <span>•</span>
                    <span>Memory: {a.memoryLimitMb}MB</span>
                    <span>•</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">Anti-Paste Guard Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DIRECT IN-APP MESSAGING & TPO CALENDAR */}
      {/* ========================================================================= */}
      {activeConsoleTab === 'messaging' && (
        <div className="glass-panel rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/[0.08] grid grid-cols-1 md:grid-cols-3 min-h-[550px] animate-fadeIn">
          
          {/* Threads List */}
          <div className="border-r border-slate-200 dark:border-white/[0.08] p-4 space-y-3 bg-slate-50/50 dark:bg-[#070b14]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Direct Sovereign Channels</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                E2EE Active
              </span>
            </div>

            <div className="space-y-2">
              {chatThreads.map((t) => {
                const isSelected = t.id === activeThreadId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveThreadId(t.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-white dark:bg-slate-900 shadow-sm'
                        : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-900/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{t.avatar}</span>
                      <div className="flex-1 truncate">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{t.recipientName}</span>
                          <span className="text-[10px] text-slate-400">{t.lastMessageTime}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{t.recipientOrg}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Pane */}
          <div className="col-span-2 flex flex-col justify-between bg-white dark:bg-[#080d19]">
            
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{activeThread.avatar}</span>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">{activeThread.recipientName}</div>
                  <div className="text-[10px] text-slate-400">{activeThread.recipientRole} • {activeThread.recipientOrg}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Encrypted Audit Channel
                </span>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[380px]">
              {activeThread.messages.map((m) => {
                const isMe = m.sender === 'recruiter';
                return (
                  <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-slate-400 mb-0.5">{m.senderName} • {m.timestamp}</span>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-amber-600 text-white rounded-br-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-2">
              <input
                type="text"
                placeholder="Type encrypted message to TPO or Candidate..."
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. OpenCV ELA Forensic Fraud Audit Viewer Modal */}
      {elaInspectionCandidate && (
        <ElaForensicViewerModal
          candidate={elaInspectionCandidate}
          onClose={() => setElaInspectionCandidate(null)}
          onQuarantine={handleQuarantineCandidate}
          onAlertTpo={handleAlertTpo}
        />
      )}

      {/* 2. Direct Interview Scheduler Modal */}
      {schedulingCandidate && (
        <InterviewSchedulerModal
          candidate={schedulingCandidate}
          onClose={() => setSchedulingCandidate(null)}
          onSchedule={handleScheduleInterview}
        />
      )}

    </div>
  );
};
