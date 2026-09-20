import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { 
  EMERGING_SKILLS_PREDICTIONS, 
  MOCK_OPPORTUNITIES 
} from '../../../mock/mockData';
import { AtsDiagnosticResult, OpportunityListing } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';
import { useStudent } from '../../../context/StudentContext';
import { 
  getGeminiApiKey, 
  setGeminiApiKey, 
  analyzeResumeWithGemini, 
  analyzeSkillGapWithGemini,
  extractJobInfoFromJobId,
  ExtractedJobInfo,
  GeminiResumeAnalysis,
  GeminiSkillGapAnalysis
} from '../../../services/geminiService';

interface Tab1Props {
  onSelectOpportunity?: (opp: OpportunityListing) => void;
}

export const Tab1Recommendations: React.FC<Tab1Props> = () => {
  const { theme } = useTheme();
  const { 
    activeStudent, 
    selectedStream, 
    uploadedResume, 
    cachedResumeAnalysis, 
    setCachedResumeAnalysis, 
    cachedSkillGapAnalysis, 
    setCachedSkillGapAnalysis 
  } = useStudent();

  const [atsResult, setAtsResult] = useState<AtsDiagnosticResult>({
    overallScore: 88,
    quantifiedMetricsScore: 85,
    keywordDensityScore: 88,
    formattingParsabilityScore: 92,
    strengths: [
      'Quantified Performance Scale: Contains clear technical metrics (latency, throughput, CGPA) recognized by ATS engines.',
      'Core Skill Stack Alignment: High keyword match density for verified domain frameworks.',
      'Formatting Parsability: Structured section headers and extractable text formatting.',
      'Academic Pedigree: Verified degree qualification and sovereign registry record.'
    ],
    weaknesses: [
      'Scope for Leadership Metrics: Include explicit team numbers and cross-functional leadership outcomes in experience bullets.',
      'Cloud Containerization Keywords: Explicitly tag container orchestration tools (Kubernetes/Helm/Docker) in technical section.',
      'Direct Project Evidence: Add explicit live demo or GitHub repository URLs for top projects.'
    ],
    actionableSuggestions: [
      'Add quantitative metrics to experience bullet points (e.g., "Improved response latency by 35%" or "Processed 10,000+ daily API requests").',
      'Include explicit cloud containerization terms like Docker, Kubernetes, and gRPC Protocol.',
      'Add direct links to deployed live demos or GitHub repositories in experience section.',
      'Ensure standard, consistent formatting across section headers for maximum ATS parser accuracy.'
    ]
  });
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [showAiResumeModal, setShowAiResumeModal] = useState(false);

  // Gemini API Key State
  const [geminiApiKey, setGeminiApiKeyInput] = useState<string>(getGeminiApiKey());
  const [showApiKeyDrawer, setShowApiKeyDrawer] = useState<boolean>(!getGeminiApiKey());
  const [geminiError, setGeminiError] = useState<string | null>(null);

  // Resume Text State for Analysis
  const [customResumeText, setCustomResumeText] = useState<string>(
    uploadedResume?.text || `${activeStudent.name}\n${activeStudent.degree} at ${activeStudent.institution}\nSkills: ${activeStudent.verifiedSkills.join(', ')}\nSummary: ${activeStudent.summary}`
  );

  // Gemini Live Results State
  const [geminiResumeResult, setGeminiResumeResult] = useState<GeminiResumeAnalysis | null>(cachedResumeAnalysis);
  const [geminiSkillGapResult, setGeminiSkillGapResult] = useState<GeminiSkillGapAnalysis | null>(cachedSkillGapAnalysis);

  // Sync uploaded resume from profile tab into AI Studio
  React.useEffect(() => {
    if (uploadedResume?.text) {
      setCustomResumeText(uploadedResume.text);
    }
  }, [uploadedResume]);

  // Reuse cached AI resume analysis across tab switches and page refreshes
  React.useEffect(() => {
    if (cachedResumeAnalysis) {
      setGeminiResumeResult(cachedResumeAnalysis);
      const strList = cachedResumeAnalysis.detailedStrengths 
        ? cachedResumeAnalysis.detailedStrengths.map((s: any) => `${s.title}: ${s.description || s.evidence}`)
        : (cachedResumeAnalysis.strengths || []);
      const wkList = cachedResumeAnalysis.detailedWeaknesses 
        ? cachedResumeAnalysis.detailedWeaknesses.map((w: any) => `${w.title}: ${w.description || w.impact}`)
        : (cachedResumeAnalysis.weaknesses || []);

      setAtsResult({
        overallScore: cachedResumeAnalysis.overallScore || 88,
        quantifiedMetricsScore: cachedResumeAnalysis.quantifiedMetricsScore || 85,
        keywordDensityScore: cachedResumeAnalysis.keywordDensityScore || 88,
        formattingParsabilityScore: cachedResumeAnalysis.formattingBypassScore || cachedResumeAnalysis.formattingParsabilityScore || 92,
        strengths: strList.length > 0 ? strList : [
          'Quantified Performance Scale: Explicit performance numbers recognized by ATS engines.',
          'Core Skill Stack Alignment: High keyword match for verified domain frameworks.'
        ],
        weaknesses: wkList.length > 0 ? wkList : [
          'Scope for Leadership Metrics: Add explicit team numbers in experience bullets.'
        ],
        actionableSuggestions: cachedResumeAnalysis.actionableRecommendations || [
          'Add quantitative metrics to experience bullet points.',
          'Include cloud containerization terms like Docker and Kubernetes.'
        ]
      });
    }
  }, [cachedResumeAnalysis]);

  // Skill Gap State
  const [gapMode, setGapMode] = useState<'jobId' | 'pasteJd'>('jobId');
  const [selectedJobId, setSelectedJobId] = useState('JOB-MSFT-901');
  const [customJobInput, setCustomJobInput] = useState('JOB-MSFT-901');
  const [pastedJd, setPastedJd] = useState('');
  const [extractedJobDetails, setExtractedJobDetails] = useState<ExtractedJobInfo | null>(null);
  const [isDiffing, setIsDiffing] = useState(false);
  const [diffComplete, setDiffComplete] = useState(true);

  // Recommendations Feed Filter
  const [feedType, setFeedType] = useState<'all' | 'gig' | 'internship' | 'job'>('all');
  const [selectedOpportunityForModal, setSelectedOpportunityForModal] = useState<OpportunityListing | null>(null);

  const handleSaveApiKey = () => {
    setGeminiApiKey(geminiApiKey);
    setShowApiKeyDrawer(false);
    setGeminiError(null);
  };

  // Sync selected job with stream change
  React.useEffect(() => {
    const streamOpps = MOCK_OPPORTUNITIES.filter(o => o.stream === selectedStream);
    if (streamOpps.length > 0) {
      setSelectedJobId(streamOpps[0].id);
      setCustomJobInput(streamOpps[0].id);
    }
  }, [selectedStream]);

  // Sync input text with selected job ID
  React.useEffect(() => {
    setCustomJobInput(selectedJobId);
  }, [selectedJobId]);

  // Auto-run skill differential comparison whenever selected job or pasted JD changes
  React.useEffect(() => {
    if (gapMode === 'pasteJd' && pastedJd.trim().length > 15) {
      const timer = setTimeout(() => {
        handleRunDiff();
      }, 500);
      return () => clearTimeout(timer);
    } else if (gapMode === 'jobId') {
      if (!cachedSkillGapAnalysis) {
        handleRunDiff();
      }
    }
  }, [gapMode, selectedJobId, pastedJd]);

  const handleAnalyzeResume = async () => {
    setIsAnalyzingResume(true);
    setGeminiError(null);
    try {
      const textToScan = uploadedResume?.text || customResumeText;
      const result = await analyzeResumeWithGemini(textToScan, activeStudent.streamName);
      
      const strList = result.detailedStrengths 
        ? result.detailedStrengths.map((s: any) => `${s.title}: ${s.description || s.evidence}`)
        : (result.strengths || []);
      const wkList = result.detailedWeaknesses 
        ? result.detailedWeaknesses.map((w: any) => `${w.title}: ${w.description || w.impact}`)
        : (result.weaknesses || []);

      result.strengths = strList;
      result.weaknesses = wkList;

      setGeminiResumeResult(result);
      setCachedResumeAnalysis(result);
      setAtsResult({
        overallScore: result.overallScore,
        quantifiedMetricsScore: result.quantifiedMetricsScore,
        keywordDensityScore: result.keywordDensityScore,
        formattingParsabilityScore: result.formattingBypassScore,
        strengths: strList,
        weaknesses: wkList,
        actionableSuggestions: result.actionableRecommendations
      });
    } catch (err: any) {
      setGeminiError(err.message || 'Failed to analyze resume with Gemini API.');
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const handleRunDiff = async (overrideJobId?: string) => {
    setIsDiffing(true);
    setGeminiError(null);
    try {
      const activeJobId = overrideJobId || selectedJobId.trim() || 'JOB-MSFT-901';
      const jobInfo = extractJobInfoFromJobId(activeJobId, MOCK_OPPORTUNITIES);
      setExtractedJobDetails(jobInfo);

      const targetJdText = gapMode === 'pasteJd' 
        ? pastedJd 
        : `${jobInfo.title} at ${jobInfo.organization}. Required Skills: ${jobInfo.requiredSkills.join(', ')}. Description: ${jobInfo.description}. Responsibilities: ${jobInfo.responsibilities.join('; ')}`;

      const result = await analyzeSkillGapWithGemini(customResumeText, targetJdText, activeStudent.streamName);
      setGeminiSkillGapResult(result);
      setCachedSkillGapAnalysis(result);
      setDiffComplete(true);
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
    <div className="space-y-8">
      {/* 1. Resume AI Studio & Competency Radar Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-1xl font-black shadow-sm">
              01
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"> Resume Analyse Studio</h3>
              {/* <p className="text-xs text-slate-500 dark:text-slate-400">Quantified metrics breakdown, interactive suggestions & 6-axis radar matrix</p> */}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzingResume}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <span>{isAnalyzingResume ? 'Scanning Tokens...' : 'Analyse Current Resume'}</span>
            </button>
            {/* <button
              onClick={() => setShowAiResumeModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-slate-300 dark:bg-[#121a2e] dark:hover:bg-[#18233e] dark:text-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>Make New Resume using AI</span>
            </button> */}
          </div>
        </div>

        {/* Active Uploaded Resume Sync Banner */}
        {uploadedResume && (
          <div className="p-4 rounded-2xl bg-amber-500/[0.08] border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                📄
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Active Resume Loaded: {uploadedResume.fileName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                    Uploaded from Profile
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Uploaded on {uploadedResume.timestamp} • {uploadedResume.text.length} characters active in AI Studio
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Title Header matching user screenshot */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] space-y-1">
          <div className="flex items-center justify-between">
            {/* <h2 className="text-[1.375rem] font-bold text-slate-900 dark:text-white tracking-tight">Resume Analysis</h2> */}
          </div>
          {/* <p className="text-xs text-slate-500 dark:text-slate-400">
            AI-powered insights for your resume <span className="font-mono text-amber-600 dark:text-amber-400 font-bold"></span>
          </p> */}
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl space-y-1 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424]">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{atsResult.overallScore}%</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">ATS Score</div>
            <div className="pt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                atsResult.overallScore >= 80 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300' 
                  : atsResult.overallScore >= 60 
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
              }`}>
                {atsResult.overallScore >= 80 ? 'Positive' : atsResult.overallScore >= 60 ? 'Good' : 'Needs Work'}
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424]">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{(geminiResumeResult?.extractedSkills || activeStudent.verifiedSkills || []).length || 8}</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Skills Found</div>
            <div className="pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-300">
                Detected
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424]">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{(geminiResumeResult?.detailedStrengths || atsResult.strengths || []).length || 4}</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Strengths</div>
            <div className="pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                Positive
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-1 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424]">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{(geminiResumeResult?.actionableRecommendations || atsResult.actionableSuggestions || []).length || 5}</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Suggestions</div>
            <div className="pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                Improve
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ATS Score Performance - Diagrammatic Semicircle Radial Gauge */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] flex flex-col justify-between space-y-4 relative overflow-hidden min-h-[250px]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                {/* <Sparkles className="w-4 h-4 text-amber-500" /> */}
                <span>ATS Score Performance Gauge</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                atsResult.overallScore >= 80 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : atsResult.overallScore >= 60 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
              }`}>
                {atsResult.overallScore >= 80 ? ' ATS Optimized' : atsResult.overallScore >= 60 ? ' Good Baseline' : ' Action Required'}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
              {/* Semicircle Gauge with Ticks & Needle */}
              <div className="relative flex flex-col items-center justify-center shrink-0">
                <svg className="w-60 h-32 overflow-visible">
                  <defs>
                    <linearGradient id="diagrammaticArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Outer Tick Marks */}
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
                    const angle = Math.PI + (tick / 100) * Math.PI;
                    const x1 = 120 + Math.cos(angle) * 88;
                    const y1 = 110 + Math.sin(angle) * 88;
                    const x2 = 120 + Math.cos(angle) * (tick % 50 === 0 ? 76 : 82);
                    const y2 = 110 + Math.sin(angle) * (tick % 50 === 0 ? 76 : 82);
                    return (
                      <line
                        key={tick}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={theme === 'dark' ? '#334155' : '#cbd5e1'}
                        strokeWidth={tick % 50 === 0 ? "2.5" : "1"}
                      />
                    );
                  })}

                  {/* Background Track Arc */}
                  <path
                    d="M 24 110 A 96 96 0 0 1 216 110"
                    fill="none"
                    stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
                    strokeWidth="16"
                    strokeLinecap="round"
                  />

                  {/* Active Value Gradient Arc */}
                  <path
                    d="M 24 110 A 96 96 0 0 1 216 110"
                    fill="none"
                    stroke="url(#diagrammaticArcGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={301.5}
                    strokeDashoffset={301.5 - (301.5 * atsResult.overallScore) / 100}
                    filter="url(#gaugeShadow)"
                    className="transition-all duration-1000 ease-out"
                  />

                  {/* Pivot Center Point */}
                  {/* <circle cx="120" cy="110" r="7" fill={theme === 'dark' ? '#f8fafc' : '#0f172a'} />
                  <circle cx="120" cy="110" r="3" fill="#f59e0b" /> */}

                  {/* Animated Pivot Needle Indicator */}
                  {/* {(() => {
                    const needleAngle = Math.PI + (atsResult.overallScore / 100) * Math.PI;
                    const nx = 120 + Math.cos(needleAngle) * 70;
                    const ny = 110 + Math.sin(needleAngle) * 70;
                    return (
                      <line
                        x1="120"
                        y1="110"
                        x2={nx}
                        y2={ny}
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    );
                  })()} */}
                </svg>

                {/* Score Center Value Display */}
                <div className="absolute bottom-0 flex flex-col items-center text-center">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {atsResult.overallScore}
                  </span>
                  <span className="text-[15px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    / 100
                  </span>
                </div>
              </div>

              {/* Sub-Metric Bar Breakdown Matrix */}
              <div className="w-full sm:w-1/2 space-y-2.5 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>Quantified Metrics</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{atsResult.quantifiedMetricsScore}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${atsResult.quantifiedMetricsScore}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>Keyword Density</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{atsResult.keywordDensityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${atsResult.keywordDensityScore}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>Formatting Parsability</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{atsResult.formattingParsabilityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full transition-all duration-700" style={{ width: `${atsResult.formattingParsabilityScore}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>Impact Action Verbs</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{geminiResumeResult?.impactActionVerbsScore || 86}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${geminiResumeResult?.impactActionVerbsScore || 86}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Distribution Bar Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] flex flex-col justify-between space-y-4 min-h-[220px]">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Skills Distribution
            </div>
            
            <div className="h-32 flex items-end justify-between gap-1.5 pt-4 pb-1 border-b border-slate-200 dark:border-white/[0.08] px-1">
              {(geminiResumeResult?.extractedSkills || activeStudent.verifiedSkills || []).slice(0, 8).map((sk, idx) => {
                const heightPercent = Math.max(30, 100 - (idx * 9));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {sk}
                    </div>
                    <div 
                      className="w-full bg-teal-500 hover:bg-teal-400 rounded-t transition-all duration-700"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[8px] font-bold text-slate-500 dark:text-slate-400 px-0.5">
              {(geminiResumeResult?.extractedSkills || activeStudent.verifiedSkills || []).slice(0, 8).map((sk, idx) => (
                <span key={idx} className="truncate max-w-[42px] text-center" title={sk}>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Strengths */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm border-b border-slate-100 dark:border-white/[0.06] pb-2">
              <span className="text-emerald-500 text-base">✓</span>
              <span>Strengths</span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {(geminiResumeResult?.detailedStrengths || (atsResult.strengths && atsResult.strengths.length > 0 ? atsResult.strengths : [])).map((str: any, idx) => {
                const title = typeof str === 'string' ? str.split(':')[0] : (str.title || '');
                const desc = typeof str === 'string' 
                  ? (str.includes(':') ? str.substring(str.indexOf(':') + 1) : '') 
                  : (str.description || str.evidence || '');
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
                      {desc && <span className="text-slate-600 dark:text-slate-400">{`. ${desc}`}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm border-b border-slate-100 dark:border-white/[0.06] pb-2">
              <span className="text-rose-500 text-base">✕</span>
              <span>Weaknesses</span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {(geminiResumeResult?.detailedWeaknesses || (atsResult.weaknesses && atsResult.weaknesses.length > 0 ? atsResult.weaknesses : [])).map((wk: any, idx) => {
                const title = typeof wk === 'string' ? wk.split(':')[0] : (wk.title || '');
                const desc = typeof wk === 'string' 
                  ? (wk.includes(':') ? wk.substring(wk.indexOf(':') + 1) : '') 
                  : (wk.description || wk.impact || '');
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
                      {desc && <span className="text-slate-600 dark:text-slate-400">{`: ${desc}`}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Suggestions */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-sm border-b border-slate-100 dark:border-white/[0.06] pb-2">
            <span className="text-base">💡</span>
            <span>Suggestions</span>
          </div>
          <div className="space-y-3.5">
            {(geminiResumeResult?.actionableRecommendations || (atsResult.actionableSuggestions && atsResult.actionableSuggestions.length > 0 ? atsResult.actionableSuggestions : [])).map((sug, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-extrabold text-[11px] flex items-center justify-center shrink-0 border border-sky-300 dark:border-sky-800">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{sug}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI Skill Gap Analysis Studio */}
      <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-1xl font-black shadow-sm">
              02
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"> Skill Gap Analysis Studio</h3>
              {/* <p className="text-xs text-slate-500 dark:text-slate-400">Dual Input Modes & Minimum Skill-Bridge Recommendations</p> */}
            </div>
          </div>
         
        </div>

        {/* Input Switcher & Diff Cockpit */}
        <div className="glass-panel p-6 rounded-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-[#0d1424] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={() => setGapMode('jobId')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  gapMode === 'jobId'
                    ? 'bg-amber-600 text-white shadow-md'
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
              onClick={() => handleRunDiff()}
              disabled={isDiffing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{isDiffing ? 'Calculating Vector Diff...' : 'Run skill gap Analysis'}</span>
            </button>
          </div>

          {/* Mode A: Job ID Selector & Search Cockpit */}
          {gapMode === 'jobId' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Enter Unique Job ID or Select Opportunity in {activeStudent.streamName}:
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <input
                    type="text"
                    value={customJobInput}
                    onChange={(e) => setCustomJobInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSelectedJobId(customJobInput);
                        handleRunDiff(customJobInput);
                      }
                    }}
                    placeholder="Type any Job ID (e.g. JOB-MSFT-901, INT-GS-201, JOB-RZP-402, JOB-META-888)..."
                    className="w-full bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 font-mono focus:outline-none focus:border-amber-500 shadow-sm"
                  />
                  <button
                    onClick={() => {
                      setSelectedJobId(customJobInput);
                      handleRunDiff(customJobInput);
                    }}
                    disabled={isDiffing}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shrink-0 shadow-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <span>{isDiffing ? 'Extracting...' : 'Extract & Analyze Job ID'}</span>
                  </button>
                </div>

                {/* Featured Job ID Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {MOCK_OPPORTUNITIES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedJobId(item.id);
                        setCustomJobInput(item.id);
                        handleRunDiff(item.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                        selectedJobId.toUpperCase() === item.id.toUpperCase()
                          ? 'bg-amber-600 text-white font-bold shadow-md'
                          : 'bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-amber-400'
                      }`}
                    >
                      <span>{item.id}</span>
                      <span className="text-[10px] opacity-80 font-sans font-normal truncate max-w-[130px]">({item.title})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extracted Job Details Summary Card */}
              {extractedJobDetails && (
                <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-600 text-white font-mono text-xs font-bold shadow-sm">
                        {extractedJobDetails.jobId}
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {extractedJobDetails.title}
                      </span>
                      <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                        @ {extractedJobDetails.organization}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                      Extracted Job Info
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {extractedJobDetails.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 mr-1">Extracted Required Skills:</span>
                    {extractedJobDetails.requiredSkills.map((sk, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-slate-200">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
              
              {/* Dynamic Multi-Axis Competency Radar Visualization */}
              {(() => {
                const getDynamicRadarData = () => {
                  const candSkillsList = (geminiResumeResult?.extractedSkills || activeStudent.verifiedSkills || []).map(s => s.toLowerCase());
                  const candTextLower = (customResumeText || '').toLowerCase();
                  const targetJdText = gapMode === 'pasteJd' 
                    ? pastedJd 
                    : `${extractedJobDetails?.title || selectedJobId} at ${extractedJobDetails?.organization || ''}. Skills: ${(extractedJobDetails?.requiredSkills || []).join(', ')}. ${extractedJobDetails?.description || ''}`;
                  const targetJdLower = targetJdText.toLowerCase();

                  let axes: string[] = ['Algorithms & DSA', 'Cloud Architecture', 'System Design', 'REST & Microservices', 'Docker & DevOps', 'Database & SQL'];
                  
                  if (selectedStream === 'commerce_finance') {
                    axes = ['Financial Modeling', 'DCF & LBO Valuation', 'SEC Edgar Audit', 'Quant Risk & VaR', 'FinTech APIs', 'Excel & SQL'];
                  } else if (selectedStream === 'healthcare_bio') {
                    axes = ['Ayush Bio-Stats', 'ICD-11 Taxonomy', 'Clinical Protocols', 'Data Governance', 'Diagnostic Acc', 'Pharmacology'];
                  } else if (selectedStream === 'law_governance') {
                    axes = ['Constitutional Law', 'DPDP Compliance', 'Statutory Drafting', 'Case Analysis', 'Litigation Risk', 'Corporate Legal'];
                  } else if (selectedStream === 'ui_ux') {
                    axes = ['UI/UX Research', 'Design Systems', 'WCAG 2.2 AA', 'User Testing', 'Figma Prototyping', 'Spatial Layout'];
                  }

                  const candValues = axes.map((axis) => {
                    const axisTokens = axis.toLowerCase().split(/[\s&/]+/);
                    let score = 0.55;
                    const hasSkillMatch = axisTokens.some(token => 
                      candSkillsList.some(cs => cs.includes(token)) || candTextLower.includes(token)
                    );
                    const isMatchedInDiff = geminiSkillGapResult?.matchedSkills.some(ms => 
                      axisTokens.some(token => ms.toLowerCase().includes(token))
                    );

                    if (hasSkillMatch || isMatchedInDiff) score += 0.32;
                    else score -= 0.12;

                    const atsScoreMult = (atsResult.overallScore || 80) / 100;
                    score = Math.max(0.25, Math.min(0.96, score * (0.65 + 0.35 * atsScoreMult)));

                    const seed = (selectedJobId + axis + candTextLower.length).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
                    const shift = ((seed % 14) - 7) / 100;
                    return Number(Math.max(0.25, Math.min(0.96, score + shift)).toFixed(2));
                  });

                  const targetValues = axes.map((axis) => {
                    const axisTokens = axis.toLowerCase().split(/[\s&/]+/);
                    let targetScore = 0.82;
                    const isMentionedInJd = axisTokens.some(token => targetJdLower.includes(token));
                    const isMissingInDiff = geminiSkillGapResult?.missingSkills.some(ms => 
                      axisTokens.some(token => ms.toLowerCase().includes(token))
                    );

                    if (isMentionedInJd || isMissingInDiff) targetScore += 0.10;

                    const seed = (selectedJobId + axis + 'target').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
                    const shift = ((seed % 12) - 6) / 100;
                    return Number(Math.max(0.60, Math.min(0.98, targetScore + shift)).toFixed(2));
                  });

                  return { axes, candValues, targetValues };
                };

                const rData = getDynamicRadarData();
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
                    
                    {/* Header Title with Dynamic Badge */}
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        MULTI-AXIS COMPETENCY RADAR
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Dynamic Candidate Skills vs Target Benchmark for <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{selectedJobId}</span>
                      </p>
                    </div>

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

                        {/* Concentric Hexagon Web Rings (3 rings) */}
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

                        {/* Solid Teal Vertex Dots & Dynamic Score Callouts */}
                        {rData.candValues.map((val, i) => {
                          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
                          const r = R * val;
                          const vx = cx + r * Math.cos(angle);
                          const vy = cy + r * Math.sin(angle);
                          return (
                            <g key={i}>
                              <circle
                                cx={vx}
                                cy={vy}
                                r="4.5"
                                fill="#029983"
                                stroke="#ffffff"
                                strokeWidth="1.8"
                                className="transition-all duration-700 ease-out"
                              />
                            </g>
                          );
                        })}

                        {/* 6 Axis Text Labels with Dynamic Numerical Scores */}
                        <text x="220" y="38" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[0]} <tspan fill="#029983">({Math.round(rData.candValues[0]*100)}%)</tspan>
                        </text>
                        <text x="345" y="121" textAnchor="start" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[1]} <tspan fill="#029983">({Math.round(rData.candValues[1]*100)}%)</tspan>
                        </text>
                        <text x="345" y="226" textAnchor="start" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[2]} <tspan fill="#029983">({Math.round(rData.candValues[2]*100)}%)</tspan>
                        </text>
                        <text x="220" y="306" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[3]} <tspan fill="#029983">({Math.round(rData.candValues[3]*100)}%)</tspan>
                        </text>
                        <text x="95" y="226" textAnchor="end" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[4]} <tspan fill="#029983">({Math.round(rData.candValues[4]*100)}%)</tspan>
                        </text>
                        <text x="95" y="121" textAnchor="end" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-100 tracking-tight">
                          {rData.axes[5]} <tspan fill="#029983">({Math.round(rData.candValues[5]*100)}%)</tspan>
                        </text>

                      </svg>
                    </div>

                    {/* Bottom Legend Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-4 border-t border-slate-100 dark:border-white/[0.06] w-full">
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded bg-[#029983] shadow-sm inline-block" />
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm">
                          Verified Candidate Score (Avg {Math.round(rData.candValues.reduce((a,b)=>a+b,0)/6*100)}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded border-2 border-dashed border-[#d97706] bg-amber-500/20 shadow-sm inline-block" />
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm">
                          Industry Target Benchmark (Avg {Math.round(rData.targetValues.reduce((a,b)=>a+b,0)/6*100)}%)
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* Dynamic Skill Differential Analysis Results */}
              <div className="space-y-5">
               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Matched Competencies (Green) */}
                  <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                         Matched Skills in Resume ({ (geminiSkillGapResult?.matchedSkills || activeStudent.verifiedSkills).length })
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                        Verified Match
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(geminiSkillGapResult?.matchedSkills || activeStudent.verifiedSkills).map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Competencies / Skill Deficits (Red/Amber) */}
                  <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
                         Missing Skills / Deficits ({ (geminiSkillGapResult?.missingSkills || activeStudent.missingSkills).length })
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold border border-rose-300 dark:border-rose-800">
                        Required in JD
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(geminiSkillGapResult?.missingSkills || activeStudent.missingSkills).map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          ✕ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Recommended Skill-Bridge Action Plan */}
                <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d1424] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-3">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                       Recommended Skill-Bridge Raodmap 
                    </h5>
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                      Targeted Milestones
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(geminiSkillGapResult?.bridgePlan || [
                      { step: 1, title: 'Container Microservices', action: 'Complete 15-minute isolated Docker sandbox test in evaluation portal', duration: '3 Days' },
                      { step: 2, title: 'Quant Vector Alignment', action: 'Review SEC Edgar & DCF valuation models in domain benchmark studio', duration: '1 Week' },
                      { step: 3, title: 'Portfolio Project Verification', action: 'Build and deploy open-source LLM inference API to Living Resume', duration: '2 Weeks' }
                    ]).map((bp: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#080d19] border border-slate-200 dark:border-white/[0.08] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                          <span>Step {bp.step || idx + 1}: {bp.title}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px]">{bp.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{bp.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Minimum Skill-Bridge Section (Discipline Specific) */}
              {/* <div className="p-6 rounded-2xl glass-panel border border-amber-200 dark:border-amber-500/30 space-y-4"> */}
                {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      
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
                    14% ATS Score Impact
                  </span>
                </div> */}
{/* 
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
                        {item.buttonText}
                      </button>
                    </div>
                  ))}
                </div> */}

              {/* </div> */}

            </div>
          )}

        </div>
      </div>

      {/* 3. Curated Recommendations Feed */}
      <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
              03
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opp.organization} - {opp.location}</p>
                </div>
                
                <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{opp.stipendOrSalary}</div>
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
                    AI Fit Analysis
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
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs font-black shadow-sm">
              04
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
                    ? 'bg-amber-50/50 border-amber-200 dark:bg-[#0d1424] dark:border-amber-500/30'
                    : 'bg-orange-50/50 border-orange-200 dark:bg-[#0a0f1d] dark:border-orange-900/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${
                    isExploding ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300'
                  }`}>
                    {pred.category}
                  </span>
                  <div className={`flex items-center gap-1 text-sm font-black ${
                    isExploding ? 'text-amber-700 dark:text-amber-300' : 'text-orange-700 dark:text-orange-300'
                  }`}>
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
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
                className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Candidate Verified Sandbox Score</span>
                <span className="text-amber-600 dark:text-amber-400 text-sm font-black">89%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Opportunity Cutoff Threshold</span>
                <span className="text-slate-900 dark:text-white text-sm font-black">{selectedOpportunityForModal.cutoffScore}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-[#172238] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '89%' }} />
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5 pt-1">
                Candidate exceeds threshold by {89 - selectedOpportunityForModal.cutoffScore}% points
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
                    <span className="w-1 h-5 rounded-full bg-amber-500 shrink-0" />
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-2xl w-full rounded-3xl p-7 border space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Generate Verified ATS Resume using AI</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pulls verified platform achievements, test percentiles, and badges</p>
              </div>
              <button
                onClick={() => setShowAiResumeModal(false)}
                className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-4 font-mono text-xs text-slate-800 dark:text-slate-300">
              <div className="border-b border-slate-200 dark:border-white/[0.08] pb-3">
                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-sans">{activeStudent.name.toUpperCase()}</div>
                <div className="text-amber-600 dark:text-amber-400 font-bold">{activeStudent.degree}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{activeStudent.institution} - ATS Score: {activeStudent.atsScore}/100</div>
              </div>

              <div>
                <div className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">Verified Skills & Credentials:</div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 space-y-0.5">
                  <div>{activeStudent.benchmarkBadge}: {activeStudent.verifiedSkills.slice(0, 4).join(', ')}</div>
                  <div>Tier 1 XMP PKI Signature: Verified ({activeStudent.digiLockerId})</div>
                  <div>Tier 2 OpenCV ELA Tamper Score: 1.84 (Pristine Original)</div>
                </div>
              </div>

              <div>
                <div className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">High-Impact Summary & Projects:</div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 space-y-0.5">
                  <div>{activeStudent.summary}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/[0.08]">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                100% ATS Compliant Single-Column Format
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
                  Export Signed PDF / DOCX
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
