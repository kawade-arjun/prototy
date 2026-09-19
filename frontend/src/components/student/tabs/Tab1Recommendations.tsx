import React, { useState } from 'react';
import { 
  INITIAL_ATS_RESULT, 
  EMERGING_SKILLS_PREDICTIONS, 
  MOCK_OPPORTUNITIES 
} from '../../../mock/mockData';
import { AtsDiagnosticResult, OpportunityListing } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Flame, 
  Check, 
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { useStudent } from '../../../context/StudentContext';
import { 
  getGeminiApiKey, 
  setGeminiApiKey, 
  analyzeResumeWithGemini, 
  analyzeSkillGapWithGemini,
  GeminiResumeAnalysis,
  GeminiSkillGapAnalysis
} from '../../../services/geminiService';
import { Key, AlertCircle } from 'lucide-react';

interface Tab1Props {
  onSelectOpportunity?: (opp: OpportunityListing) => void;
}

export const Tab1Recommendations: React.FC<Tab1Props> = () => {
  const { theme } = useTheme();
  const { activeStudent, selectedStream } = useStudent();
  const [atsResult, setAtsResult] = useState<AtsDiagnosticResult>(activeStudent.atsBreakdown);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [showAiResumeModal, setShowAiResumeModal] = useState(false);

  // Gemini API Key State
  const [geminiApiKey, setGeminiApiKeyInput] = useState<string>(getGeminiApiKey());
  const [showApiKeyDrawer, setShowApiKeyDrawer] = useState<boolean>(!getGeminiApiKey());
  const [geminiError, setGeminiError] = useState<string | null>(null);

  // Resume Text State for Analysis
  const [customResumeText, setCustomResumeText] = useState<string>(
    `${activeStudent.name}\n${activeStudent.degree} at ${activeStudent.institution}\nSkills: ${activeStudent.verifiedSkills.join(', ')}\nSummary: ${activeStudent.summary}`
  );

  // Skill Gap State
  const [gapMode, setGapMode] = useState<'jobId' | 'pasteJd'>('jobId');
  const [selectedJobId, setSelectedJobId] = useState('JOB-MSFT-901');
  const [pastedJd, setPastedJd] = useState('');
  const [isDiffing, setIsDiffing] = useState(false);
  const [diffComplete, setDiffComplete] = useState(true);

  // Gemini Live Results State
  const [geminiResumeResult, setGeminiResumeResult] = useState<GeminiResumeAnalysis | null>(null);
  const [geminiSkillGapResult, setGeminiSkillGapResult] = useState<GeminiSkillGapAnalysis | null>(null);

  // Recommendations Feed Filter
  const [feedType, setFeedType] = useState<'all' | 'gig' | 'internship' | 'job'>('all');
  const [selectedOpportunityForModal, setSelectedOpportunityForModal] = useState<OpportunityListing | null>(null);

  const handleSaveApiKey = () => {
    setGeminiApiKey(geminiApiKey);
    setShowApiKeyDrawer(false);
    setGeminiError(null);
  };

  // Sync with active student profile change
  React.useEffect(() => {
    setAtsResult(activeStudent.atsBreakdown);
    const streamOpps = MOCK_OPPORTUNITIES.filter(o => o.stream === selectedStream);
    if (streamOpps.length > 0) {
      setSelectedJobId(streamOpps[0].id);
    }
  }, [activeStudent, selectedStream]);

  const handleAnalyzeResume = async () => {
    setIsAnalyzingResume(true);
    setGeminiError(null);
    try {
      const result = await analyzeResumeWithGemini(customResumeText, activeStudent.streamName);
      setGeminiResumeResult(result);
      setAtsResult({
        overallScore: result.overallScore,
        quantifiedMetricsScore: result.quantifiedMetricsScore,
        keywordDensityScore: result.keywordDensityScore,
        formattingParsabilityScore: result.formattingBypassScore,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        actionableSuggestions: result.actionableRecommendations
      });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      setGeminiError(err.message || 'Failed to analyze resume with Gemini API.');
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const handleRunDiff = async () => {
    setIsDiffing(true);
    setGeminiError(null);
    try {
      const targetJdText = gapMode === 'pasteJd' 
        ? pastedJd 
        : MOCK_OPPORTUNITIES.find(o => o.id === selectedJobId)?.description || 'Senior Software Engineer Role';

      const result = await analyzeSkillGapWithGemini(customResumeText, targetJdText);
      setGeminiSkillGapResult(result);
      setDiffComplete(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      setGeminiError(err.message || 'Failed to run skill gap diff with Gemini API.');
    } finally {
      setIsDiffing(false);
    }
  };

  const filteredOpportunities = MOCK_OPPORTUNITIES
    .filter(o => o.stream === selectedStream)
    .filter(o => feedType === 'all' || o.type === feedType);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Resume AI Studio & Competency Radar Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">1. Resume AI Studio & Competency Radar</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quantified metrics breakdown, interactive suggestions & 6-axis radar matrix</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzingResume}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <Cpu className={`w-3.5 h-3.5 text-amber-200 ${isAnalyzingResume ? 'animate-spin' : ''}`} />
              <span>{isAnalyzingResume ? 'Scanning Tokens...' : 'Analyse Current Resume'}</span>
            </button>
            <button
              onClick={() => setShowAiResumeModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-[#121a2e] dark:hover:bg-[#18233e] dark:text-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Make New Resume using AI</span>
            </button>
          </div>
        </div>

        {/* ATS Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Main 0-100 Circular Gauge */}
          <div className="lg:col-span-1 glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden group">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overall ATS Score</div>
            <div className="relative flex items-center justify-center my-1">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke={theme === 'dark' ? '#172238' : '#e2e8f0'}
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="url(#atsGradient2)"
                  strokeWidth="10"
                  strokeDasharray={326}
                  strokeDashoffset={326 - (326 * atsResult.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="atsGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{atsResult.overallScore}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">Out of 100</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/25">
              <Check className="w-3 h-3" /> Industry Benchmark Ready
            </div>
          </div>

          {/* 3 Interactive Sub Score Cards with Live Suggestions */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Sub Score 1: Quantified Metrics */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Quantified Metrics</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs">{atsResult.quantifiedMetricsScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700 shadow-sm" 
                    style={{ width: `${atsResult.quantifiedMetricsScore}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                  Assesses measurable impact & numerical outcomes.
                </p>
              </div>

              {/* Dynamic Suggestions Buttons */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="text-[9px] font-bold uppercase text-slate-400">Actionable Suggestions:</div>
                <button
                  onClick={() => {
                    const newM = Math.min(atsResult.quantifiedMetricsScore + 5, 99);
                    const newOverall = Math.min(Math.round((newM * 0.35) + (atsResult.keywordDensityScore * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, quantifiedMetricsScore: newM, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Include % latency reduction (+5%)</span>
                </button>
                <button
                  onClick={() => {
                    const newM = Math.min(atsResult.quantifiedMetricsScore + 4, 99);
                    const newOverall = Math.min(Math.round((newM * 0.35) + (atsResult.keywordDensityScore * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, quantifiedMetricsScore: newM, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-amber-50/60 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Quantify project scale (+4%)</span>
                </button>
              </div>
            </div>

            {/* Sub Score 2: Keyword Saturation */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Keyword Saturation</span>
                  <span className="text-orange-600 dark:text-orange-400 font-mono text-xs">{atsResult.keywordDensityScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm" 
                    style={{ width: `${atsResult.keywordDensityScore}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                  Semantic mapping against high-demand tokens.
                </p>
              </div>

              {/* Dynamic Suggestions Buttons */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="text-[9px] font-bold uppercase text-slate-400">Actionable Suggestions:</div>
                <button
                  onClick={() => {
                    const newK = Math.min(atsResult.keywordDensityScore + 6, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (newK * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, keywordDensityScore: newK, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Inject vLLM & Docker tokens (+6%)</span>
                </button>
                <button
                  onClick={() => {
                    const newK = Math.min(atsResult.keywordDensityScore + 5, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (newK * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, keywordDensityScore: newK, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-amber-50/60 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Align 2026 taxonomy (+5%)</span>
                </button>
              </div>
            </div>

            {/* Sub Score 3: Formatting Parsability */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Formatting Parsability</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">{atsResult.formattingParsabilityScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-sm" 
                    style={{ width: `${atsResult.formattingParsabilityScore}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                  Single-column ATS parsable semantic hierarchy.
                </p>
              </div>

              {/* Dynamic Suggestions Buttons */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="text-[9px] font-bold uppercase text-slate-400">Actionable Suggestions:</div>
                <button
                  onClick={() => {
                    const newF = Math.min(atsResult.formattingParsabilityScore + 4, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (atsResult.keywordDensityScore * 0.35) + (newF * 0.30)), 99);
                    setAtsResult({ ...atsResult, formattingParsabilityScore: newF, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Use single-column format (+4%)</span>
                </button>
                <button
                  onClick={() => {
                    const newF = Math.min(atsResult.formattingParsabilityScore + 4, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (atsResult.keywordDensityScore * 0.35) + (newF * 0.30)), 99);
                    setAtsResult({ ...atsResult, formattingParsabilityScore: newF, overallScore: newOverall });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-emerald-50/60 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Normalize date tokens (+4%)</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Actionable Cards: Strengths, Weaknesses, Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Strengths Detected */}
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-3 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/10 dark:to-transparent">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Strengths Detected</span>
            </div>
            <ul className="space-y-2.5">
              {atsResult.strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Weaknesses Detected */}
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-500 space-y-3 bg-gradient-to-b from-rose-50/50 to-white dark:from-rose-950/10 dark:to-transparent">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Weaknesses Detected</span>
            </div>
            <ul className="space-y-2.5">
              {atsResult.weaknesses.map((wk, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Actionable Suggestions */}
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-3 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-transparent">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Actionable Suggestions</span>
            </div>
            <ul className="space-y-2.5">
              {atsResult.actionableSuggestions.map((sug, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 2. AI Skill Gap Analysis Studio */}
      <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">2. AI Skill Gap Analysis Studio</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dual Input Modes & Minimum Skill-Bridge Recommendations</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800/40">
            Vector Embedding Diff
          </span>
        </div>

        {/* Input Switcher & Diff Cockpit */}
        <div className="glass-panel p-6 rounded-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-[#0d1424] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => setGapMode('jobId')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  gapMode === 'jobId'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Search by Unique Job ID
              </button>
              <button
                onClick={() => setGapMode('pasteJd')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  gapMode === 'pasteJd'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Paste External Job Description (JD)
              </button>
            </div>

            <button
              onClick={handleRunDiff}
              disabled={isDiffing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-extrabold text-xs shadow-md shadow-amber-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Cpu className={`w-4 h-4 ${isDiffing ? 'animate-spin' : ''}`} />
              <span>{isDiffing ? 'Calculating Vector Diff...' : 'Run Differential Analysis'}</span>
            </button>
          </div>

          {/* Mode A: Job ID Selector (Filtered to active student's discipline) */}
          {gapMode === 'jobId' ? (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Select Target Opportunity in {activeStudent.streamName}:
              </label>
              <div className="flex flex-wrap gap-2">
                {MOCK_OPPORTUNITIES.filter(o => o.stream === selectedStream).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedJobId(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                      selectedJobId === item.id
                        ? 'bg-amber-600 text-white font-bold shadow-md'
                        : 'bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-amber-400'
                    }`}
                  >
                    <span>{item.id}</span>
                    <span className="text-[10px] opacity-80 font-sans font-normal truncate max-w-[140px]">({item.title})</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Paste External Job Description:
              </label>
              <textarea
                value={pastedJd}
                onChange={(e) => setPastedJd(e.target.value)}
                placeholder="Paste raw JD requirements here (e.g. from LinkedIn, AngelList, or employer portals)..."
                rows={3}
                className="w-full bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] rounded-xl p-3.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
              />
            </div>
          )}

          {/* Differential Analysis Output */}
          {diffComplete && (
            <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
              
              {/* Dynamic Multi-Axis Competency Radar Visualization (Matching uploaded reference image) */}
              {(() => {
                const getRadarAxesForStream = () => {
                  switch (selectedStream) {
                    case 'tech_ai':
                      return {
                        axes: ['Algorithms & DSA', 'Cloud Architecture', 'System Design', 'REST & Microservices', 'Docker & DevOps', 'Database & SQL'],
                        candValues: [0.90, 0.62, 0.84, 0.94, 0.52, 0.82],
                        targetValues: [0.82, 0.85, 0.88, 0.80, 0.78, 0.72]
                      };
                    case 'commerce_finance':
                      return {
                        axes: ['Financial Modeling', 'LBO & DCF Valuation', 'SEC Edgar Audit', 'Quant Risk Analysis', 'FinTech APIs', 'Excel & SQL'],
                        candValues: [0.92, 0.64, 0.86, 0.94, 0.54, 0.84],
                        targetValues: [0.84, 0.86, 0.90, 0.82, 0.80, 0.74]
                      };
                    case 'healthcare_bio':
                      return {
                        axes: ['Ayush Bio-Stats', 'ICD-11 Taxonomy', 'Clinical Protocols', 'Data Governance', 'Diagnostic Acc', 'Pharmacology'],
                        candValues: [0.88, 0.60, 0.82, 0.92, 0.50, 0.80],
                        targetValues: [0.80, 0.84, 0.86, 0.78, 0.76, 0.70]
                      };
                    case 'law_governance':
                      return {
                        axes: ['Constitutional Law', 'DPDP Compliance', 'Statutory Drafting', 'Case Analysis', 'Litigation Risk', 'Corporate Legal'],
                        candValues: [0.90, 0.62, 0.84, 0.93, 0.52, 0.82],
                        targetValues: [0.82, 0.85, 0.88, 0.80, 0.78, 0.72]
                      };
                    case 'ui_ux':
                    default:
                      return {
                        axes: ['UI/UX Research', 'Design Systems', 'WCAG 2.2 AA', 'User Testing', 'Figma Prototyping', 'Spatial Layout'],
                        candValues: [0.91, 0.63, 0.85, 0.94, 0.53, 0.83],
                        targetValues: [0.83, 0.85, 0.89, 0.81, 0.79, 0.73]
                      };
                  }
                };

                const rData = getRadarAxesForStream();
                const cx = 220;
                const cy = 170;
                const R = 105;

                // Compute Polygon 1 (Candidate Vector - Solid Teal)
                const candPoints = rData.candValues.map((val, i) => {
                  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                  const r = R * val;
                  return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                }).join(' ');

                // Compute Polygon 2 (Industry Target Benchmark Vector - Dashed Orange)
                const targetPoints = rData.targetValues.map((val, i) => {
                  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                  const r = R * val;
                  return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                }).join(' ');

                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-white/[0.08] shadow-lg flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
                    
                    {/* Header Title (Matching Reference Image) */}
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 text-center">
                      MULTI-AXIS COMPETENCY RADAR
                    </h4>

                    {/* Radar SVG Chart */}
                    <div className="relative w-full max-w-xl h-80 flex flex-col items-center justify-center p-1">
                      <svg viewBox="0 0 440 340" className="w-full h-full overflow-visible">
                        <defs>
                          <radialGradient id="tealGradNew" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#029983" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.12" />
                          </radialGradient>
                          <radialGradient id="amberGradNew" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
                          </radialGradient>
                        </defs>

                        {/* Concentric Hexagon Web Rings (3 rings as in reference image) */}
                        {[0.35, 0.70, 1.0].map((scale, idx) => {
                          const r = R * scale;
                          const points = [0, 1, 2, 3, 4, 5].map((i) => {
                            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                          }).join(' ');
                          return (
                            <polygon
                              key={idx}
                              points={points}
                              fill="none"
                              stroke={theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#e2e8f0'}
                              strokeWidth="1.2"
                            />
                          );
                        })}

                        {/* 6 Radial Axis Spokes from Center */}
                        {[0, 1, 2, 3, 4, 5].map((i) => {
                          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                          const x2 = cx + R * Math.cos(angle);
                          const y2 = cy + R * Math.sin(angle);
                          return (
                            <line
                              key={i}
                              x1={cx}
                              y1={cy}
                              x2={x2}
                              y2={y2}
                              stroke={theme === 'dark' ? 'rgba(255,255,255,0.14)' : '#e2e8f0'}
                              strokeWidth="1.2"
                            />
                          );
                        })}

                        {/* 1. Industry Target Benchmark Polygon (Dashed Orange Line & Amber Fill) */}
                        <polygon
                          points={targetPoints}
                          fill="url(#amberGradNew)"
                          stroke="#d97706"
                          strokeWidth="2.2"
                          strokeDasharray="4 3"
                          className="transition-all duration-700 ease-out"
                        />

                        {/* 2. Verified Candidate Score Polygon (Solid Teal Line & Soft Green Fill) */}
                        <polygon
                          points={candPoints}
                          fill="url(#tealGradNew)"
                          stroke="#029983"
                          strokeWidth="2.8"
                          className="transition-all duration-700 ease-out"
                        />

                        {/* Solid Teal Vertex Dots */}
                        {rData.candValues.map((val, i) => {
                          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                          const r = R * val;
                          const vx = cx + r * Math.cos(angle);
                          const vy = cy + r * Math.sin(angle);
                          return (
                            <circle
                              key={i}
                              cx={vx}
                              cy={vy}
                              r="4.5"
                              fill="#029983"
                              stroke="#ffffff"
                              strokeWidth="1.8"
                              className="transition-all duration-700 ease-out"
                            />
                          );
                        })}

                        {/* 6 Axis Text Labels (Exact placement matching reference image) */}
                        <text x="220" y="42" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[0]}</text>
                        <text x="342" y="121" textAnchor="start" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[1]}</text>
                        <text x="342" y="226" textAnchor="start" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[2]}</text>
                        <text x="220" y="302" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[3]}</text>
                        <text x="98" y="226" textAnchor="end" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[4]}</text>
                        <text x="98" y="121" textAnchor="end" className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200 tracking-tight">{rData.axes[5]}</text>

                      </svg>
                    </div>

                    {/* Bottom Legend Bar (Matching Reference Image) */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-4 border-t border-slate-100 dark:border-white/[0.06] w-full">
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded bg-[#029983] shadow-sm inline-block" />
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm">Verified Candidate Score</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded border-2 border-dashed border-[#d97706] bg-amber-500/20 shadow-sm inline-block" />
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm">Industry Target Benchmark</span>
                      </div>
                    </div>

                  </div>
                );
              })()}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Matched Competencies (Green) - Filtered to Active Student */}
                <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Matched Competencies in {activeStudent.streamName}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
                      {activeStudent.verifiedSkills.length} Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeStudent.verifiedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Competencies (Red) - Filtered to Active Student */}
                <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Target Deficit Gaps ({selectedJobId})
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold">
                      {activeStudent.missingSkills.length} High-Yield Gaps
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeStudent.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Gemini AI Generated Skill Gap Result Banner */}
              {geminiSkillGapResult && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-orange-950/40 to-slate-900 border border-amber-500/40 space-y-4 animate-fadeIn text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">Google Gemini Skill Gap Analysis Result</h4>
                        <p className="text-xs text-slate-300">{geminiSkillGapResult.summary}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Match: {geminiSkillGapResult.matchPercentage}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-[#070b14] border border-white/[0.08] space-y-2">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Matched Requirements:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {geminiSkillGapResult.matchedSkills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070b14] border border-white/[0.08] space-y-2">
                      <div className="text-rose-400 font-bold flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-400" /> High-Yield Deficits:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {geminiSkillGapResult.missingSkills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {geminiSkillGapResult.bridgePlan && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Gemini Recommended Skill-Bridge Action Plan:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {geminiSkillGapResult.bridgePlan.map((bp) => (
                          <div key={bp.step} className="p-3 rounded-xl bg-[#050810] border border-white/[0.08] space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                              <span>Step #{bp.step}: {bp.title}</span>
                              <span className="text-slate-400">{bp.duration}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 font-sans">{bp.action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Minimum Skill-Bridge Section (Discipline Specific) */}
              <div className="p-6 rounded-2xl glass-panel border border-amber-200 dark:border-amber-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                        Minimum Skill-Bridge ({activeStudent.streamName})
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tailored interventions designed to exceed cutoff thresholds for {activeStudent.targetRoles[0]}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/60">
                    +14% ATS Score Impact
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeStudent.skillBridgeInterventions.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.08] hover:border-amber-400 transition-all space-y-2 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                          <span>{item.type}</span>
                          <span className="text-slate-500 dark:text-slate-400 font-normal">{item.duration}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => {
                          alert(`Enrolled in ${item.title}!`);
                        }}
                        className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 pt-2 hover:underline"
                      >
                        {item.buttonText} <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* 3. Curated Recommendations Feed */}
      <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">3. Curated Recommendations Feed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Contextually matched opportunities with click-to-modal AI fit</p>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-[#0d1424] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08]">
            {[
              { id: 'all', label: 'All Opportunities' },
              { id: 'gig', label: 'Freelance Gigs' },
              { id: 'internship', label: 'Internships' },
              { id: 'job', label: 'Full-Time Jobs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFeedType(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  feedType === tab.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="glass-panel p-5 rounded-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                    {opp.id}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{opp.deadline}</span>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                    {opp.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opp.organization} • {opp.location}</p>
                </div>
                
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{opp.stipendOrSalary}</div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Cutoff: <span className="font-bold text-slate-900 dark:text-white">{opp.cutoffScore}%</span>
                  </div>
                  <button
                    onClick={() => setSelectedOpportunityForModal(opp)}
                    className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    AI Fit Analysis <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Future Market Scope & Predictions */}
      <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">4. Future Market Scope & Predictions (2026–2028)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Empirical growth radar tracking high-velocity emerging skills vs commoditizing skills
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGING_SKILLS_PREDICTIONS.map((pred, i) => {
            const isExploding = pred.trend === 'exploding';
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all duration-300 space-y-3 ${
                  isExploding 
                    ? 'bg-amber-50/50 border-amber-200 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-[#0d1424] dark:to-orange-950/20 dark:border-amber-500/30' 
                    : 'bg-rose-50/50 border-rose-200 dark:bg-gradient-to-br dark:from-rose-950/20 dark:to-[#0a0f1d] dark:border-rose-900/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${
                    isExploding ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                  }`}>
                    {pred.category}
                  </span>
                  <div className={`flex items-center gap-1 text-sm font-black ${
                    isExploding ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {isExploding ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{pred.growthRate}</span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-base">{pred.skill}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{pred.description}</p>

                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Impact Horizon</span>
                  <span className="font-extrabold text-amber-700 dark:text-amber-300">2026 - 2028 Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Fit Analysis Modal */}
      {selectedOpportunityForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-xl w-full rounded-3xl p-7 border space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {selectedOpportunityForModal.id}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">{selectedOpportunityForModal.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedOpportunityForModal.organization}</p>
              </div>
              <button
                onClick={() => setSelectedOpportunityForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Candidate Verified Sandbox Score</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">89%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Opportunity Cutoff Threshold</span>
                <span className="text-slate-900 dark:text-white text-sm font-black">{selectedOpportunityForModal.cutoffScore}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full" style={{ width: '89%' }} />
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <Check className="w-4 h-4" /> Candidate exceeds threshold by +{89 - selectedOpportunityForModal.cutoffScore}% points
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tailored Interview Tips:</h4>
              <ul className="space-y-2">
                {(selectedOpportunityForModal.interviewTips || [
                  'Expect direct technical sandbox challenge on algorithm complexity',
                  'Highlight your verified sovereign credentials'
                ]).map((tip, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-slate-50 dark:bg-[#090e1c]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => setSelectedOpportunityForModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Direct Fast-Track Application submitted for ${selectedOpportunityForModal.id} using pre-verified credentials!`);
                  setSelectedOpportunityForModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30"
              >
                Fast-Track Apply with Verified Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Resume Generator Modal */}
      {showAiResumeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-7 border space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Generate Verified ATS Resume using AI</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pulls verified platform achievements, test percentiles, and badges</p>
              </div>
              <button
                onClick={() => setShowAiResumeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-4 font-mono text-xs text-slate-800 dark:text-slate-300">
              <div className="border-b border-slate-200 dark:border-white/[0.08] pb-3">
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-sans">ARJUN KAWADE</div>
                <div className="text-amber-600 dark:text-amber-400 font-bold">GenAI & Distributed Systems Engineer</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">DigiLocker Sovereign Hash: 0x7e8f...872 • ATS Score: 91/100</div>
              </div>

              <div>
                <div className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">Verified Credentials & Badges:</div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 space-y-0.5">
                  • IIT Bombay Benchmark Sandbox: Top 98th Percentile (C++20 & Python 3.12)<br />
                  • Tier 1 XMP PKI Signature: Verified (National Informatics Centre)<br />
                  • Tier 2 OpenCV ELA Tamper Score: 1.84 (Pristine Original)
                </div>
              </div>

              <div>
                <div className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">High-Impact Quantified Projects:</div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 space-y-0.5">
                  • Distributed Inference Accelerator: Cut token latency by 42% via custom PagedAttention vLLM kernel.<br />
                  • DPDP Statutory Compliance Engine: Processed 100k+ records with 100% fiduciary audit conformance.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 100% ATS Compliant Single-Column Format
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAiResumeModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Generated ATS Compliant PDF exported with embedded digital sovereign cryptographic signature!');
                    setShowAiResumeModal(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30"
                >
                  <Download className="w-4 h-4" /> Export Signed PDF / DOCX
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
