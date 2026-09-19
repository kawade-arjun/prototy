import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Key, 
  FileText, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  TrendingUp,
  FileCheck,
  Code,
  ShieldCheck,
  BookOpen,
  Info
} from 'lucide-react';
import { 
  getGeminiApiKey, 
  setGeminiApiKey, 
  analyzeResumeWithGemini, 
  analyzeSkillGapWithGemini,
  GeminiResumeAnalysis,
  GeminiSkillGapAnalysis
} from '../../../services/geminiService';

const SAMPLE_RESUME = `ARJUN KAWADE
Bengaluru, India | arjun@careeroptic.dev | github.com/arjunkawade

SUMMARY
Final-year Computer Science Scholar at National Institute of Technology specializing in High-Performance Microservices, Asynchronous Python (FastAPI), and pgvector similarity search.

EDUCATION
National Institute of Technology — B.Tech Computer Science & Engineering (Class of 2026) | CGPA: 9.1/10.0

SKILLS & COMPETENCIES
- Languages & Frameworks: Python 3.12, FastAPI, PyTorch, React, Next.js, TypeScript, SQL
- Infrastructure & Vector DBs: Docker, PostgreSQL, pgvector, Hugging Face Inference API, Redis
- Engineering Protocols: RESTful APIs, Asynchronous I/O, Error Level Analysis (ELA), pyHanko XMP

EXPERIENCE & PROJECTS
CareerLens Backend Microservices Engine | Lead Architect (2025 – Present)
- Engineered 384-dimensional skill vector embedding pipeline using sentence-transformers/all-MiniLM-L6-v2 via Hugging Face Inference API.
- Optimized pgvector cosine distance search achieving sub-45ms latency across 100,000+ candidate vectors.
- Built multi-tier certificate verification system integrating DigiLocker PKI, vendor API registries, and Donut OCR transformer model.
`;

const SAMPLE_JOB_DESC = `Senior / Junior AI Platform Engineer — NeuralPulse India

Requirements:
- Proven experience building asynchronous microservices in Python with FastAPI and PostgreSQL.
- Competency in vector similarity search (pgvector / Qdrant) and dense embedding models.
- Containerization experience with Docker, Kubernetes, and vLLM inference acceleration.
- Knowledge of India DPDP Act 2023 compliance and zero-knowledge privacy standards.
- Strong analytical skills, quantified problem-solving, and clean architectural design.
`;

export const Tab9AIStudio: React.FC = () => {
  const [apiKey, setApiKeyInput] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESC);
  const [discipline, setDiscipline] = useState('Engineering & Technology');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<GeminiResumeAnalysis | null>(null);
  const [gapResult, setGapResult] = useState<GeminiSkillGapAnalysis | null>(null);
  const [activeStudioTab, setActiveStudioTab] = useState<'ats' | 'gap'>('ats');

  useEffect(() => {
    const saved = getGeminiApiKey();
    if (saved) {
      setApiKeyInput(saved);
      setIsKeySaved(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKey);
    setIsKeySaved(Boolean(apiKey.trim()));
    alert(apiKey.trim() ? 'Gemini API Key saved to local storage! API calls will run live on Gemini 1.5 Flash.' : 'Gemini API Key cleared. System will use prototype fallback diagnostic mode.');
  };

  const handleRunAtsDiagnostics = async () => {
    setIsAnalyzing(true);
    try {
      const [atsData, gapData] = await Promise.all([
        analyzeResumeWithGemini(resumeText, discipline, apiKey),
        analyzeSkillGapWithGemini(['Python', 'FastAPI', 'pgvector', 'PyTorch', 'Docker'], jobDescription, discipline, apiKey)
      ]);
      setAnalysisResult(atsData);
      setGapResult(gapData);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 bg-amber-50/30 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GEMINI AI RESUME ATS DIAGNOSTIC STUDIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              AI Resume ATS & Scale Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Diagnostic engineering studio providing automated Workday/Greenhouse ATS compatibility scores, line-by-line bullet rewrites, and Gemini LLM career gap roadmaps.
            </p>
          </div>

          {/* Gemini API Key Input Configuration Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.08] space-y-2 shadow-sm min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Gemini API Key Space
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                isKeySaved ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {isKeySaved ? '✓ Key Active' : 'Prototype Fallback'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="GEMINI_API_KEY=AIzaSy..."
                className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#151c2e] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0 transition-all cursor-pointer"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Also stored in <code className="text-amber-600 dark:text-amber-400 font-mono">.env</code> as <code className="font-mono">GEMINI_API_KEY=</code>
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-1">
        <button
          onClick={() => setActiveStudioTab('ats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeStudioTab === 'ats' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume ATS Diagnostic Report</span>
        </button>

        <button
          onClick={() => setActiveStudioTab('gap')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeStudioTab === 'gap' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Target Job Skill Differential</span>
        </button>
      </div>

      {/* TAB 1: ATS DIAGNOSTIC REPORT */}
      {activeStudioTab === 'ats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Input Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Candidate Resume Source Text
                </h3>
                <button
                  onClick={() => setResumeText(SAMPLE_RESUME)}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                >
                  Load Sample Resume
                </button>
              </div>

              <textarea
                rows={8}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your raw resume text here..."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Discipline Track
                  </label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option>Engineering & Technology</option>
                    <option>Design & User Experience</option>
                    <option>Legal & Statutory Compliance</option>
                    <option>Ayush & Bio-Health Sciences</option>
                    <option>Finance & Commerce</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleRunAtsDiagnostics}
                    disabled={isAnalyzing || !resumeText.trim()}
                    className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold text-xs shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    <Zap className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>{isAnalyzing ? 'Running Gemini AI Analysis...' : 'Analyze Resume with Gemini'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive Diagnostic Results */}
            {analysisResult && (
              <div className="glass-panel p-6 rounded-3xl space-y-6 animate-in fade-in">
                {/* Executive Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Detailed Strategic Executive Summary
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      ATS Market Compatibility Score
                    </h3>
                  </div>
                  <div className="text-center px-5 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 shrink-0">
                    <span className="text-3xl font-black text-amber-600 dark:text-amber-400">{analysisResult.overallScore}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">/100</span>
                  </div>
                </div>

                {/* Executive Narrative Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px] block font-mono">
                    AI Diagnostic Evaluation:
                  </span>
                  <p>{analysisResult.executiveSummary}</p>
                </div>

                {/* 4 Metric Sub-Scores */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Quantified Metrics</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{analysisResult.quantifiedMetricsScore}%</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Keyword Match</span>
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{analysisResult.keywordDensityScore}%</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">ATS Formatting</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{analysisResult.formattingBypassScore}%</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Action Verbs</span>
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{analysisResult.impactActionVerbsScore || 88}%</span>
                  </div>
                </div>

                {/* Section Scores Breakdown */}
                {analysisResult.sectionScores && analysisResult.sectionScores.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      Section-by-Section ATS Audit:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {analysisResult.sectionScores.map((sec, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-900 dark:text-white">{sec.section}</span>
                            <span className="text-amber-600 dark:text-amber-400 font-mono">{sec.score}%</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{sec.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Strengths & Evidence */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Detailed Key Strengths & Resume Evidence:
                  </h4>
                  <div className="space-y-3">
                    {analysisResult.detailedStrengths.map((str, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                          {str.title}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{str.description}</p>
                        {str.evidence && (
                          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200 font-mono">
                            <span className="font-bold">Resume Evidence: </span>&quot;{str.evidence}&quot;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Weaknesses & Impact */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Identified Weaknesses & ATS Impact:
                  </h4>
                  <div className="space-y-3">
                    {analysisResult.detailedWeaknesses.map((weak, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                          {weak.title}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{weak.description}</p>
                        {weak.impact && (
                          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#121827] border border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="font-bold text-slate-900 dark:text-slate-200">ATS / Recruiter Impact: </span>{weak.impact}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line-by-Line Bullet Point Rewrites (Before & After) */}
                {analysisResult.bulletPointRewrites && analysisResult.bulletPointRewrites.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Line-by-Line AI Bullet Point Rewrites (Before vs. After):
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.bulletPointRewrites.map((rewrite, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Original Bullet:</span>
                            <p className="text-slate-500 line-through mt-0.5">{rewrite.original}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold block">Gemini AI Optimized Rewrite:</span>
                            <p className="text-slate-900 dark:text-white font-semibold mt-0.5">{rewrite.improved}</p>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                            <strong className="text-slate-700 dark:text-slate-300">Rationale: </strong>{rewrite.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords Chips */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-amber-500" />
                    Missing ATS Keyword Tokens:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-xs font-mono font-medium flex items-center gap-1"
                      >
                        <span>+ {kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Right Col: Target Job Description */}
          <div className="space-y-5">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Target Role Description
                </h3>
                <button
                  onClick={() => setJobDescription(SAMPLE_JOB_DESC)}
                  className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                >
                  Load Sample Job
                </button>
              </div>

              <textarea
                rows={12}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Target Role Description..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SKILL GAP DIFFERENTIAL STUDIO */}
      {activeStudioTab === 'gap' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Gemini AI Career Differential Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Synthesizes candidate skill vector against target role criteria</p>
            </div>
            <button
              onClick={handleRunAtsDiagnostics}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
            >
              Synthesize Gap Plan
            </button>
          </div>

          {gapResult ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">Candidate Alignment Score</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{gapResult.summary}</p>
                </div>
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{gapResult.matchPercentage}%</span>
              </div>

              {/* Step-by-step Bridge Plan */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">AI Skill Bridge Roadmap:</h4>
                {gapResult.bridgePlan.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090d18] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{step.action}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-500/30 shrink-0">
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-500">
              Click &quot;Synthesize Gap Plan&quot; to run Gemini LLM differential skill alignment.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
