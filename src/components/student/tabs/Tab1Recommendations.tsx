import React, { useState } from 'react';
import { 
  INITIAL_ATS_RESULT, 
  EMERGING_SKILLS_PREDICTIONS, 
  MOCK_OPPORTUNITIES 
} from '../../../mock/mockData';
import { AtsDiagnosticResult, OpportunityListing } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Compass, 
  Briefcase, 
  Flame, 
  Check, 
  Zap, 
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { useStudent } from '../../../context/StudentContext';

interface Tab1Props {
  onSelectOpportunity?: (opp: OpportunityListing) => void;
}

export const Tab1Recommendations: React.FC<Tab1Props> = () => {
  const { theme } = useTheme();
  const { activeStudent, selectedStream } = useStudent();
  const [atsResult, setAtsResult] = useState<AtsDiagnosticResult>(activeStudent.atsBreakdown);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [showAiResumeModal, setShowAiResumeModal] = useState(false);

  // Skill Gap State
  const [gapMode, setGapMode] = useState<'jobId' | 'pasteJd'>('jobId');
  const [selectedJobId, setSelectedJobId] = useState('JOB-MSFT-901');
  const [pastedJd, setPastedJd] = useState('');
  const [isDiffing, setIsDiffing] = useState(false);
  const [diffComplete, setDiffComplete] = useState(true);

  // Sync with active student profile change
  React.useEffect(() => {
    setAtsResult(activeStudent.atsBreakdown);
    const streamOpps = MOCK_OPPORTUNITIES.filter(o => o.stream === selectedStream);
    if (streamOpps.length > 0) {
      setSelectedJobId(streamOpps[0].id);
    }
  }, [activeStudent, selectedStream]);

  // Curated Feed Filter - Filtered to active discipline
  const [feedType, setFeedType] = useState<'all' | 'gig' | 'internship' | 'job'>('all');
  const [selectedOpportunityForModal, setSelectedOpportunityForModal] = useState<OpportunityListing | null>(null);

  const handleAnalyzeResume = () => {
    setIsAnalyzingResume(true);
    setTimeout(() => {
      setIsAnalyzingResume(false);
      setAtsResult({
        ...activeStudent.atsBreakdown,
        overallScore: Math.min(activeStudent.atsBreakdown.overallScore + 3, 98),
        quantifiedMetricsScore: Math.min(activeStudent.atsBreakdown.quantifiedMetricsScore + 2, 99),
        keywordDensityScore: Math.min(activeStudent.atsBreakdown.keywordDensityScore + 3, 98),
        strengths: [
          ...activeStudent.atsBreakdown.strengths,
          `Verified ${activeStudent.streamName} Sandbox badge boosted computational score by +3%`
        ]
      });
      confetti({ particleCount: 50, spread: 60 });
    }, 1000);
  };

  const handleRunDiff = () => {
    setIsDiffing(true);
    setTimeout(() => {
      setIsDiffing(false);
      setDiffComplete(true);
      confetti({ particleCount: 40 });
    }, 800);
  };

  // Only show opportunities matching the student's disciplinary field
  const filteredOpportunities = MOCK_OPPORTUNITIES
    .filter(o => o.stream === selectedStream)
    .filter(o => feedType === 'all' ? true : o.type === feedType);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/80 dark:from-indigo-950/40 dark:via-[#0d1424] dark:to-cyan-950/30 transition-colors">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>TAB 1 • RECOMMENDATIONS STUDIO</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              ATS Diagnostics & AI Skill Gap Engine
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Synthesizing 0–100 quantified applicant tracking scores, automated differential vector gap analysis, and 2026–2028 market growth horizons.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzingResume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 text-cyan-300 ${isAnalyzingResume ? 'animate-spin' : ''}`} />
              <span>{isAnalyzingResume ? 'Scanning Tokens...' : 'Analyse Current Resume'}</span>
            </button>
            <button
              onClick={() => setShowAiResumeModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-[#121a2e] dark:hover:bg-[#18233e] dark:text-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Download className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>Make New Resume using AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Resume AI Studio & Competency Radar Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">1. Resume AI Studio & Competency Radar</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quantified metrics breakdown, interactive suggestions & 6-axis radar matrix</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800/40">
            Interactive Diagnostics
          </span>
        </div>

        {/* ATS Overview & Spider Web Graph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          
          {/* Main 0-100 Circular Gauge */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-6 relative overflow-hidden group">
            {/* Circular Gauge */}
            <div className="flex flex-col items-center text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Overall ATS Score</div>
              <div className="relative flex items-center justify-center my-2">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke={theme === 'dark' ? '#172238' : '#e2e8f0'}
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="url(#atsGradient2)"
                    strokeWidth="9"
                    strokeDasharray={289}
                    strokeDashoffset={289 - (289 * atsResult.overallScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="atsGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#06b6d4" />
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

            {/* 6-Axis SVG Spider Web (Radar) Graph */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
                Competency Radar Matrix
              </div>
              
              {/* Spider Web Chart SVG */}
              <div className="relative w-52 h-48 flex items-center justify-center">
                <svg viewBox="0 0 240 220" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                    </radialGradient>
                  </defs>

                  {/* Concentric Hexagon Web Rings (20%, 40%, 60%, 80%, 100%) */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, idx) => {
                    const cx = 120, cy = 110, r = 75 * scale;
                    const points = [0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                    }).join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={points}
                        fill="none"
                        stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
                        strokeWidth="1"
                        strokeDasharray={scale === 1.0 ? '0' : '2 2'}
                      />
                    );
                  })}

                  {/* Axis Spokes from Center */}
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                    const x2 = 120 + 75 * Math.cos(angle);
                    const y2 = 110 + 75 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="120"
                        y1="110"
                        x2={x2}
                        y2={y2}
                        stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Dynamic Candidate Data Polygon */}
                  {(() => {
                    const values = [
                      atsResult.quantifiedMetricsScore / 100,
                      atsResult.keywordDensityScore / 100,
                      atsResult.formattingParsabilityScore / 100,
                      Math.min(activeStudent.compositeScore / 100, 0.98),
                      Math.min((atsResult.overallScore + 4) / 100, 0.96),
                      Math.min((atsResult.quantifiedMetricsScore + 6) / 100, 0.98)
                    ];
                    const polyPoints = values.map((val, i) => {
                      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                      const r = 75 * val;
                      return `${120 + r * Math.cos(angle)},${110 + r * Math.sin(angle)}`;
                    }).join(' ');

                    return (
                      <>
                        <polygon
                          points={polyPoints}
                          fill="url(#radarGrad)"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                          className="transition-all duration-700 ease-out"
                        />
                        {/* Dots on Vertices */}
                        {values.map((val, i) => {
                          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                          const r = 75 * val;
                          const cx = 120 + r * Math.cos(angle);
                          const cy = 110 + r * Math.sin(angle);
                          return (
                            <circle
                              key={i}
                              cx={cx}
                              cy={cy}
                              r="3.5"
                              fill="#06b6d4"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              className="transition-all duration-700 ease-out"
                            />
                          );
                        })}
                      </>
                    );
                  })()}

                  {/* Axis Text Labels */}
                  <text x="120" y="24" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-300">Metrics</text>
                  <text x="200" y="70" textAnchor="start" className="text-[8px] font-bold fill-cyan-600 dark:fill-cyan-300">Keywords</text>
                  <text x="200" y="155" textAnchor="start" className="text-[8px] font-bold fill-emerald-600 dark:fill-emerald-300">Parsability</text>
                  <text x="120" y="198" textAnchor="middle" className="text-[8px] font-bold fill-amber-600 dark:fill-amber-300">Sandbox</text>
                  <text x="40" y="155" textAnchor="end" className="text-[8px] font-bold fill-purple-600 dark:fill-purple-300">Problem Solving</text>
                  <text x="40" y="70" textAnchor="end" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-300">Architecture</text>
                </svg>
              </div>
            </div>
          </div>

          {/* 3 Interactive Sub Score Cards with Live Suggestions */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Sub Score 1: Quantified Metrics */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Quantified Metrics</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs">{atsResult.quantifiedMetricsScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700 shadow-sm" 
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
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Include % latency reduction (+5%)</span>
                  <Zap className="w-3 h-3 text-indigo-500 shrink-0" />
                </button>
                <button
                  onClick={() => {
                    const newM = Math.min(atsResult.quantifiedMetricsScore + 4, 99);
                    const newOverall = Math.min(Math.round((newM * 0.35) + (atsResult.keywordDensityScore * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, quantifiedMetricsScore: newM, overallScore: newOverall });
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-indigo-50/60 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Quantify project scale (+4%)</span>
                  <Zap className="w-3 h-3 text-indigo-500 shrink-0" />
                </button>
              </div>
            </div>

            {/* Sub Score 2: Keyword Saturation */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Keyword Saturation</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs">{atsResult.keywordDensityScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm" 
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
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Inject vLLM & Docker tokens (+6%)</span>
                  <Zap className="w-3 h-3 text-cyan-500 shrink-0" />
                </button>
                <button
                  onClick={() => {
                    const newK = Math.min(atsResult.keywordDensityScore + 5, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (newK * 0.35) + (atsResult.formattingParsabilityScore * 0.30)), 99);
                    setAtsResult({ ...atsResult, keywordDensityScore: newK, overallScore: newOverall });
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-cyan-50/60 hover:bg-cyan-100 dark:bg-cyan-950/30 dark:hover:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200/70 dark:border-cyan-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Align 2026 taxonomy (+5%)</span>
                  <Zap className="w-3 h-3 text-cyan-500 shrink-0" />
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
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/25 text-[10px] font-bold transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Use single-column format (+4%)</span>
                  <Zap className="w-3 h-3 text-emerald-500 shrink-0" />
                </button>
                <button
                  onClick={() => {
                    const newF = Math.min(atsResult.formattingParsabilityScore + 4, 99);
                    const newOverall = Math.min(Math.round((atsResult.quantifiedMetricsScore * 0.35) + (atsResult.keywordDensityScore * 0.35) + (newF * 0.30)), 99);
                    setAtsResult({ ...atsResult, formattingParsabilityScore: newF, overallScore: newOverall });
                    confetti({ particleCount: 20, spread: 40 });
                  }}
                  className="w-full text-left p-1.5 rounded-lg bg-emerald-50/60 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-500/20 text-[10px] font-medium transition-all flex items-center justify-between gap-1"
                >
                  <span>+ Normalize date tokens (+4%)</span>
                  <Zap className="w-3 h-3 text-emerald-500 shrink-0" />
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
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-indigo-500 space-y-3 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/10 dark:to-transparent">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Actionable Suggestions</span>
            </div>
            <ul className="space-y-2.5">
              {atsResult.actionableSuggestions.map((sug, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
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
              <Compass className="w-5 h-5" />
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
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Paste External Job Description (JD)
              </button>
            </div>

            <button
              onClick={handleRunDiff}
              disabled={isDiffing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition-all active:scale-95 disabled:opacity-50"
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
                        ? 'bg-indigo-600 text-white font-bold shadow-md'
                        : 'bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-indigo-400'
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
                className="w-full bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] rounded-xl p-3.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
              />
            </div>
          )}

          {/* Differential Analysis Output */}
          {diffComplete && (
            <div className="space-y-5 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
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

              {/* Minimum Skill-Bridge Section (Discipline Specific) */}
              <div className="p-6 rounded-2xl glass-panel border border-indigo-200 dark:border-cyan-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-cyan-500/20 text-indigo-700 dark:text-cyan-300">
                      <Zap className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
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
                  <span className="text-xs font-bold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-cyan-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-cyan-800/60">
                    +14% ATS Score Impact
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeStudent.skillBridgeInterventions.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.08] hover:border-indigo-400 transition-all space-y-2 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                          <span>{item.type}</span>
                          <span className="text-slate-500 dark:text-slate-400 font-normal">{item.duration}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => {
                          confetti({ particleCount: 40 });
                          alert(`Enrolled in ${item.title}!`);
                        }}
                        className="text-xs text-indigo-600 dark:text-cyan-400 font-bold flex items-center gap-1 pt-2 hover:underline"
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
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
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
                    ? 'bg-indigo-600 text-white shadow-sm'
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
              className="glass-panel p-5 rounded-2xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800/60">
                    {opp.id}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{opp.deadline}</span>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
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
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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
                    ? 'bg-indigo-50/50 border-indigo-200 dark:bg-gradient-to-br dark:from-indigo-950/30 dark:via-[#0d1424] dark:to-purple-950/20 dark:border-indigo-500/30' 
                    : 'bg-rose-50/50 border-rose-200 dark:bg-gradient-to-br dark:from-rose-950/20 dark:to-[#0a0f1d] dark:border-rose-900/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${
                    isExploding ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
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
                  <span className="font-extrabold text-indigo-700 dark:text-cyan-300">2026 - 2028 Verified</span>
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
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800">
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
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: '89%' }} />
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
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
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
                  confetti({ particleCount: 60 });
                  alert(`Direct Fast-Track Application submitted for ${selectedOpportunityForModal.id} using pre-verified credentials!`);
                  setSelectedOpportunityForModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
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
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
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
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">GenAI & Distributed Systems Engineer</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">DigiLocker Sovereign Hash: 0x7e8f...872 • ATS Score: 91/100</div>
              </div>

              <div>
                <div className="text-indigo-600 dark:text-cyan-400 font-bold uppercase text-[11px]">Verified Credentials & Badges:</div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 space-y-0.5">
                  • IIT Bombay Benchmark Sandbox: Top 98th Percentile (C++20 & Python 3.12)<br />
                  • Tier 1 XMP PKI Signature: Verified (National Informatics Centre)<br />
                  • Tier 2 OpenCV ELA Tamper Score: 1.84 (Pristine Original)
                </div>
              </div>

              <div>
                <div className="text-indigo-600 dark:text-cyan-400 font-bold uppercase text-[11px]">High-Impact Quantified Projects:</div>
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
                    confetti({ particleCount: 60 });
                    alert('Generated ATS Compliant PDF exported with embedded digital sovereign cryptographic signature!');
                    setShowAiResumeModal(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
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
