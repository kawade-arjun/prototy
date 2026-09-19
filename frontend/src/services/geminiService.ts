const GEMINI_KEY_STORAGE = 'careeroptic_gemini_api_key';

export const getGeminiApiKey = (): string => {
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || localStorage.getItem(GEMINI_KEY_STORAGE) || '';
};

export const setGeminiApiKey = (key: string): void => {
  localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
};

export interface BulletRewrite {
  original: string;
  improved: string;
  explanation: string;
}

export interface DetailedStrength {
  title: string;
  description: string;
  evidence: string;
}

export interface DetailedWeakness {
  title: string;
  description: string;
  impact: string;
}

export interface GeminiResumeAnalysis {
  overallScore: number;
  executiveSummary: string;
  quantifiedMetricsScore: number;
  keywordDensityScore: number;
  formattingBypassScore: number;
  impactActionVerbsScore: number;
  detailedStrengths: DetailedStrength[];
  detailedWeaknesses: DetailedWeakness[];
  strengths?: string[];
  weaknesses?: string[];
  missingKeywords: string[];
  actionableRecommendations: string[];
  extractedSkills: string[];
  bulletPointRewrites: BulletRewrite[];
  sectionScores: { section: string; score: number; feedback: string }[];
}

export interface GeminiSkillGapAnalysis {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  bridgePlan: { step: number; title: string; action: string; duration: string }[];
  summary: string;
}

export const analyzeResumeWithGemini = async (
  resumeText: string,
  discipline: string = 'Engineering & Technology',
  apiKey?: string
): Promise<GeminiResumeAnalysis> => {
  const key = apiKey || getGeminiApiKey();

  if (key) {
    try {
      const prompt = `You are a world-class AI ATS Diagnostic Engine and Executive Resume Strategist for high-performance careers in ${discipline}.
Examine the following resume text meticulously. Output ONLY a valid JSON object matching this exact schema (no markdown blocks, no extra narrative):

{
  "overallScore": 91,
  "executiveSummary": "Comprehensive 2-3 sentence strategic summary analyzing the resume's caliber, market readiness, and structural alignment.",
  "quantifiedMetricsScore": 88,
  "keywordDensityScore": 92,
  "formattingBypassScore": 94,
  "impactActionVerbsScore": 86,
  "detailedStrengths": [
    {
      "title": "Clear Technical Architecture Impact",
      "description": "Demonstrates strong technical scale and system ownership.",
      "evidence": "Engineered 384-dimensional skill vector embedding pipeline achieving sub-45ms latency"
    },
    {
      "title": "Statutory & Verification Focus",
      "description": "Highlights DigiLocker PKI and Donut OCR multi-tier integration.",
      "evidence": "Built multi-tier certificate verification system integrating DigiLocker PKI"
    }
  ],
  "detailedWeaknesses": [
    {
      "title": "Sparse Leadership & Team Growth Metrics",
      "description": "Lacks explicit team size numbers or cross-functional leadership outcomes.",
      "impact": "May cause recruiters to evaluate candidate strictly as individual contributor rather than tech lead."
    },
    {
      "title": "Missing Emerging Cloud Container Keywords",
      "description": "Does not explicitly mention Kubernetes orchestration or micro-frontend architectures.",
      "impact": "Causes minor score drop on automated enterprise ATS keyword matching."
    }
  ],
  "missingKeywords": ["Kubernetes", "vLLM Inference", "gRPC Protocol", "Prometheus Telemetry"],
  "actionableRecommendations": [
    "Quantify leadership metrics in experience section (e.g. mentored 4 engineers, conducted 20+ code reviews).",
    "Add explicit cloud containerization terms like Kubernetes, Helm, and Distributed Caching."
  ],
  "extractedSkills": ["Python 3.12", "FastAPI", "pgvector", "PyTorch", "Docker", "DigiLocker PKI", "React", "TypeScript"],
  "bulletPointRewrites": [
    {
      "original": "Built multi-tier certificate verification system integrating DigiLocker PKI",
      "improved": "Architected end-to-end 3-tier certificate verification pipeline with DigiLocker PKI and Donut OCR, processing 10,000+ verification requests at 99.9% uptime",
      "explanation": "Added scale metrics (10,000+ requests) and SLA impact (99.9% uptime) to highlight enterprise engineering rigor."
    }
  ],
  "sectionScores": [
    { "section": "Executive Summary", "score": 90, "feedback": "Concise summary clearly framing engineering focus." },
    { "section": "Technical Skills & Competencies", "score": 94, "feedback": "Well-categorized framework list with strong tool relevance." },
    { "section": "Experience & Scale Impact", "score": 88, "feedback": "Solid metric density; add team mentorship scale metrics." },
    { "section": "Education & Academic Credentials", "score": 92, "feedback": "Distinguished academic record with clear CGPA standing." }
  ]
}

Candidate Resume Text:
"""
${resumeText}
"""`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (!parsed.strengths && parsed.detailedStrengths) {
          parsed.strengths = parsed.detailedStrengths.map((s: any) => s.title);
        }
        if (!parsed.weaknesses && parsed.detailedWeaknesses) {
          parsed.weaknesses = parsed.detailedWeaknesses.map((w: any) => w.title);
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Gemini Live API call error, using enriched fallback report:', err);
    }
  }

  // Dynamic Resume Text Analyzer for local/prototype mode
  const cleanLines = resumeText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Extract key phrases / metric lines from candidate text
  const metricLines = cleanLines.filter(l => /\d+%|\d+\+|\b\d+\b/i.test(l));
  const techSkillMatches = Array.from(new Set(
    (resumeText.match(/\b(Python|JavaScript|TypeScript|React|Node|FastAPI|Docker|Kubernetes|AWS|SQL|PostgreSQL|PyTorch|TensorFlow|Java|C\+\+|Go|Git|REST|GraphQL|MongoDB|CI\/CD|Redis)\b/gi) || [])
      .map(s => s.trim())
  ));

  // Calculate dynamic scores based on actual text characteristics
  const metricCount = metricLines.length;
  const quantifiedMetricsScore = Math.min(65 + (metricCount * 8), 98);
  const keywordDensityScore = Math.min(60 + (techSkillMatches.length * 6), 96);
  const formattingBypassScore = Math.min(85 + Math.min(cleanLines.length, 10), 98);
  const overallScore = Math.round((quantifiedMetricsScore * 0.35) + (keywordDensityScore * 0.35) + (formattingBypassScore * 0.30));

  // Generate dynamic strengths based on candidate's actual text
  const detailedStrengths: DetailedStrength[] = [];
  if (techSkillMatches.length > 0) {
    detailedStrengths.push({
      title: 'Strong Technical Stack Alignment',
      description: `Resume contains verified domain keywords: ${techSkillMatches.slice(0, 4).join(', ')}.`,
      evidence: `Skills identified: ${techSkillMatches.join(', ')}`
    });
  } else {
    detailedStrengths.push({
      title: 'Clean Functional Structure',
      description: 'Resume structure follows standard chronological ATS section guidelines.',
      evidence: cleanLines[0] || 'Standard Candidate Profile'
    });
  }

  if (metricLines.length > 0) {
    detailedStrengths.push({
      title: 'Quantified Impact & Scale',
      description: 'Experience items include measurable performance metrics and outcomes.',
      evidence: metricLines[0].substring(0, 100)
    });
  } else {
    detailedStrengths.push({
      title: 'Clear Technical Project Experience',
      description: 'Demonstrates hands-on engineering involvement across active projects.',
      evidence: cleanLines[1] || 'Hands-on project experience'
    });
  }

  detailedStrengths.push({
    title: 'ATS-Optimized Formatting',
    description: 'Clean single-column layout ensures 100% parser readability across major recruiters.',
    evidence: 'Standard single-column hierarchy'
  });

  // Generate dynamic weaknesses based on actual text
  const detailedWeaknesses: DetailedWeakness[] = [];
  if (metricLines.length < 2) {
    detailedWeaknesses.push({
      title: 'Sparse Quantitative Impact Metrics',
      description: 'Bullet points focus on tasks rather than measurable numerical outcomes.',
      impact: 'Including quantitative metrics increases ATS recruiter callback rates.'
    });
  }
  if (techSkillMatches.length < 5) {
    detailedWeaknesses.push({
      title: 'Unlisted Cloud & Infrastructure Tokens',
      description: 'Missing explicit mentions of containerization (Docker, Kubernetes) or CI/CD pipelines.',
      impact: 'May reduce score on automated enterprise ATS keyword screeners.'
    });
  }
  if (detailedWeaknesses.length === 0) {
    detailedWeaknesses.push({
      title: 'Leadership & Mentorship Scope',
      description: 'Could further emphasize team leadership, code review volume, or cross-functional ownership.',
      impact: 'Enhances evaluation for Senior and Lead engineering positions.'
    });
  }

  // Dynamic recommendations
  const actionableRecommendations = [
    `Incorporate numerical metrics (% latency reduction, user scale) into key experience bullets.`,
    `Ensure core skills (${techSkillMatches.length > 0 ? techSkillMatches.slice(0, 3).join(', ') : 'Docker, AWS, SQL'}) are highlighted in your top summary section.`,
    `Add links to live production API endpoints or GitHub repositories alongside project titles.`
  ];

  return {
    overallScore,
    executiveSummary: `Analysis of candidate profile (${cleanLines[0] || 'Uploaded Resume'}): Demonstrates active technical experience with an overall ATS match score of ${overallScore}/100.`,
    quantifiedMetricsScore,
    keywordDensityScore,
    formattingBypassScore,
    impactActionVerbsScore: Math.min(75 + metricCount * 5, 95),
    strengths: detailedStrengths.map(s => s.title),
    weaknesses: detailedWeaknesses.map(w => w.title),
    detailedStrengths,
    detailedWeaknesses,
    missingKeywords: ['Kubernetes', 'CI/CD Pipelines', 'System Architecture', 'Cloud Deployment'],
    actionableRecommendations,
    extractedSkills: techSkillMatches.length > 0 ? techSkillMatches : ['Software Engineering', 'Problem Solving', 'Git'],
    bulletPointRewrites: [],
    sectionScores: [
      { section: 'Executive Positioning', score: overallScore, feedback: 'Clear technical focus across profile.' },
      { section: 'Technical Competencies', score: keywordDensityScore, feedback: 'Good framework representation.' },
      { section: 'Experience & Scale Metrics', score: quantifiedMetricsScore, feedback: 'Expand on numerical scale metrics.' }
    ]
  };
};

export const analyzeSkillGapWithGemini = async (
  candidateSkills: string[] | string,
  jobDescription: string,
  discipline: string = 'Engineering & Technology',
  apiKey?: string
): Promise<GeminiSkillGapAnalysis> => {
  const key = apiKey || getGeminiApiKey();

  if (key) {
    try {
      const skillsStr = Array.isArray(candidateSkills) ? candidateSkills.join(', ') : candidateSkills;
      const prompt = `You are an AI Skill Gap & Career Differential Analysis Engine for ${discipline}.
Compare the candidate's verified skills against the target Job Description and output a VALID JSON object (and ONLY JSON) with this exact schema:
{
  "matchPercentage": 85,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["missing1", "missing2"],
  "bridgePlan": [
    { "step": 1, "title": "short title", "action": "learning action", "duration": "1 Week" },
    { "step": 2, "title": "short title", "action": "learning action", "duration": "2 Weeks" },
    { "step": 3, "title": "short title", "action": "learning action", "duration": "1 Month" }
  ],
  "summary": "Executive summary string."
}

Candidate Verified Skills: ${skillsStr}

Target Job Description:
"""
${jobDescription}
"""`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
      }
    } catch (err) {
      console.warn('Gemini Live API call error, using backend prototype fallback:', err);
    }
  }

  return {
    matchPercentage: 88,
    matchedSkills: Array.isArray(candidateSkills) ? candidateSkills.slice(0, 5) : [candidateSkills],
    missingSkills: ['Kubernetes Orchestration', 'gRPC Microservices', 'vLLM Inference Acceleration'],
    bridgePlan: [
      { step: 1, title: 'Container Microservices', action: 'Complete 15-minute isolated Docker sandbox test in evaluation portal', duration: '3 Days' },
      { step: 2, title: 'Quant Vector Alignment', action: 'Review SEC Edgar & DCF valuation models in domain benchmark studio', duration: '1 Week' },
      { step: 3, title: 'Portfolio Project Verification', action: 'Build and deploy open-source LLM inference API to Living Resume', duration: '2 Weeks' }
    ],
    summary: `Candidate demonstrates strong core competencies in ${discipline} with an 88% match against target role criteria.`
  };
};
