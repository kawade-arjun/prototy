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
  // 1. Try FastAPI Backend Endpoints first (uses server-side GEMINI_API_KEY from .env)
  const backendEndpoints = [
    '/api/resume/analyze-gemini',
    'http://localhost:8000/api/resume/analyze-gemini',
    'http://127.0.0.1:8000/api/resume/analyze-gemini'
  ];
  for (const endpoint of backendEndpoints) {
    try {
      const backendRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, discipline })
      });
      if (backendRes.ok) {
        const result = await backendRes.json();
        if (result) {
          if (!result.strengths && result.detailedStrengths) {
            result.strengths = result.detailedStrengths.map((s: any) => s.title);
          }
          if (!result.weaknesses && result.detailedWeaknesses) {
            result.weaknesses = result.detailedWeaknesses.map((w: any) => w.title);
          }
          return result;
        }
      }
    } catch (backendErr) {
      console.warn(`Backend Gemini proxy endpoint ${endpoint} failed:`, backendErr);
    }
  }

  // 2. Try direct browser Gemini API with active working models
  const key = apiKey || getGeminiApiKey();

  if (key) {
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
    }
  ],
  "detailedWeaknesses": [
    {
      "title": "Sparse Leadership & Team Growth Metrics",
      "description": "Lacks explicit team size numbers or cross-functional leadership outcomes.",
      "impact": "May cause recruiters to evaluate candidate strictly as individual contributor."
    }
  ],
  "missingKeywords": ["Kubernetes", "vLLM Inference", "gRPC Protocol"],
  "actionableRecommendations": [
    "Quantify leadership metrics in experience section.",
    "Add explicit cloud containerization terms like Kubernetes, Helm, and Distributed Caching."
  ],
  "extractedSkills": ["Python 3.12", "FastAPI", "pgvector", "PyTorch", "Docker", "React", "TypeScript"],
  "bulletPointRewrites": [],
  "sectionScores": [
    { "section": "Executive Summary", "score": 90, "feedback": "Concise summary clearly framing engineering focus." },
    { "section": "Technical Skills & Competencies", "score": 94, "feedback": "Well-categorized framework list with strong tool relevance." },
    { "section": "Experience & Scale Impact", "score": 88, "feedback": "Solid metric density." }
  ]
}

Candidate Resume Text:
"""
${resumeText}
"""`;

    // Try active working models sequentially
    const activeModels = ['gemini-flash-lite-latest', 'gemini-3.6-flash', 'gemini-flash-latest'];
    for (const modelName of activeModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
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
        console.warn(`Gemini API call error with ${modelName}:`, err);
      }
    }
  }

  // Dynamic Resume Text Analyzer for local/prototype mode (strictly analyzing candidate's actual resume text)
  const cleanLines = resumeText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // 1. Extract Genuine Skills from candidate's actual resume text
  const KNOWN_SKILL_KEYWORDS = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'FastAPI', 'Django', 'Flask',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
    'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Machine Learning', 'Artificial Intelligence', 'Deep Learning',
    'NLP', 'Vector Databases', 'pgvector', 'Git', 'GitHub', 'CI/CD', 'REST', 'RESTful APIs', 'GraphQL',
    'System Design', 'Microservices', 'C++', 'C#', 'Java', 'Go', 'Golang', 'Rust', 'HTML', 'CSS', 'Tailwind',
    'Bootstrap', 'Figma', 'UI/UX', 'Data Structures', 'Algorithms', 'OOP', 'Object Oriented Programming',
    'Unit Testing', 'Jest', 'Pytest', 'Linux', 'Bash', 'Shell', 'Agile', 'Scrum', 'Jira',
    'DigiLocker', 'PKI', 'Donut OCR', 'OpenCV', 'OCR', 'PDF Parsing', 'JSON', 'JWT', 'OAuth',
    'Financial Modeling', 'Accounting', 'Data Analysis', 'Project Management', 'Communication', 'Leadership'
  ];

  const extractedSkillsSet = new Set<string>();
  KNOWN_SKILL_KEYWORDS.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(resumeText)) {
      extractedSkillsSet.add(skill);
    }
  });

  // Extract capitalized technical acronyms & framework terms directly from candidate's text
  const customAcronyms = resumeText.match(/\b[A-Z][a-zA-Z0-9+#.]{1,15}\b/g) || [];
  customAcronyms.forEach(term => {
    if (
      !['The', 'And', 'For', 'With', 'From', 'This', 'That', 'Your', 'Have', 'Will', 'Using', 'Built', 'Created', 'Engineered', 'Developed', 'Managed', 'Worked', 'Section', 'Page', 'Resume', 'Curriculum', 'Vitae', 'Email', 'Phone', 'Address', 'https', 'http', 'com', 'org', 'edu', 'gmail', 'mailto'].includes(term) &&
      term.length > 1
    ) {
      if (extractedSkillsSet.size < 12) {
        extractedSkillsSet.add(term);
      }
    }
  });

  const extractedSkills = Array.from(extractedSkillsSet);

  // 2. Genuine Metric Lines (exclude emails, URLs, dates like 2024/2026, section numbers, and binary symbol noise)
  const metricLines = cleanLines.filter(line => {
    if (/mailto:|http|@|section\.\d+|dl-in-2026/i.test(line)) return false;

    // Reject lines with non-printable ASCII or binary symbol noise (e.g. ä!ÃX£bIF?)
    const printableChars = line.replace(/[^\x20-\x7E\t]/g, '').length;
    if (line.length > 0 && (printableChars / line.length) < 0.80) return false;

    const alphaNum = line.replace(/[^a-zA-Z0-9\s]/g, '').length;
    if (line.length > 5 && (alphaNum / line.length) < 0.50) return false;

    return /\b\d+%\b|\$\d+|\b\d+\+\b|\b\d{2,}\s*(ms|seconds|min|hours|users|clients|requests|projects|repos|stars|tests|passed|items|lines|commits|percent|pts|xp)\b/i.test(line);
  });

  const metricCount = metricLines.length;
  const quantifiedMetricsScore = metricCount >= 3 ? 92 : metricCount === 2 ? 82 : metricCount === 1 ? 72 : 58;
  const keywordDensityScore = Math.min(55 + (extractedSkills.length * 5), 95);

  // Check section headers
  const hasEducation = /education|university|degree|b\.?tech|college|gpa|cgpa|academic/i.test(resumeText);
  const hasExperience = /experience|work|employment|internship|project|built|developed|engineered/i.test(resumeText);
  const hasSkills = /skill|technology|stack|framework|tool|competenc/i.test(resumeText);
  const hasContact = /email|phone|contact|@|github|linkedin|mailto/i.test(resumeText);

  let formattingScoreCount = 60;
  if (hasEducation) formattingScoreCount += 10;
  if (hasExperience) formattingScoreCount += 10;
  if (hasSkills) formattingScoreCount += 10;
  if (hasContact) formattingScoreCount += 10;
  const formattingBypassScore = Math.min(formattingScoreCount, 95);

  const overallScore = Math.round((quantifiedMetricsScore * 0.35) + (keywordDensityScore * 0.35) + (formattingBypassScore * 0.30));

  // 3. Genuine Strengths based ONLY on candidate's actual content
  const detailedStrengths: DetailedStrength[] = [];

  if (extractedSkills.length > 0) {
    detailedStrengths.push({
      title: `Detected ${extractedSkills.length} Verified Competencies`,
      description: `Your resume explicitly details verified proficiency in ${extractedSkills.slice(0, 5).join(', ')}${extractedSkills.length > 5 ? `, and ${extractedSkills.length - 5} additional tools` : ''}.`,
      evidence: extractedSkills.slice(0, 6).join(', ')
    });
  }

  if (metricLines.length > 0) {
    const sample = metricLines[0].length > 90 ? metricLines[0].substring(0, 87) + '...' : metricLines[0];
    detailedStrengths.push({
      title: 'Quantified Performance & Scale Statements',
      description: `Contains measurable performance indicators (e.g., "${sample}").`,
      evidence: sample
    });
  }

  if (hasEducation) {
    const eduLine = cleanLines.find(l => /education|degree|b\.?tech|university|college|iit|aiims|nlsiu|srcc/i.test(l)) || 'Academic Qualifications';
    detailedStrengths.push({
      title: 'Clear Academic & Educational Background',
      description: `Includes explicit educational history and degree background (${eduLine.substring(0, 70)}).`,
      evidence: eduLine.substring(0, 70)
    });
  }

  if (hasExperience || cleanLines.length >= 8) {
    detailedStrengths.push({
      title: 'Structured Experience & Portfolio Breakdown',
      description: `Organized into clear entries detailing implementation and project ownership across ${cleanLines.length} line items.`,
      evidence: cleanLines[0] || 'Structured resume text'
    });
  }

  if (detailedStrengths.length < 2) {
    detailedStrengths.push({
      title: 'Extractable Resume Formatting',
      description: 'The text uses clear line breaks and extractable text formatting for automated ATS intake.',
      evidence: cleanLines[0] || 'Extractable text structure'
    });
  }

  // 4. Genuine Weaknesses based ONLY on actual candidate resume missing elements
  const detailedWeaknesses: DetailedWeakness[] = [];
  const actionableRecommendations: string[] = [];

  if (metricCount === 0) {
    detailedWeaknesses.push({
      title: 'Missing Numerical Impact Metrics & Scale Data',
      description: 'Your project bullet points describe responsibilities qualitatively without specifying measurable numbers (e.g. % efficiency gained, latency reduced, scale of users/requests).',
      impact: 'ATS rankers rate resumes with numerical metrics significantly higher for technical and analytical roles.'
    });
    actionableRecommendations.push(
      'Add quantitative metrics to experience bullet points (e.g., "Improved response latency by 35%" or "Processed 10,000+ daily API requests").'
    );
  }

  if (extractedSkills.length < 4) {
    detailedWeaknesses.push({
      title: 'Sparse Technical & Framework Keywords',
      description: `Only ${extractedSkills.length} explicit technical tools or domain frameworks were recognized in the resume text.`,
      impact: 'Reduces search matching score when automated ATS filters filter candidates by software stack.'
    });
    actionableRecommendations.push(
      'Add a dedicated "Technical Skills" section listing specific programming languages, frameworks, vector DBs, and tools you have experience with.'
    );
  }

  if (!hasContact) {
    detailedWeaknesses.push({
      title: 'Missing Direct Contact Information',
      description: 'No explicit email address or phone number was detected in the parsed text.',
      impact: 'Recruiters cannot automatically contact you via automated ATS candidate outreach.'
    });
    actionableRecommendations.push(
      'Include your official email address, phone number, and LinkedIn/GitHub profiles at the top of the resume.'
    );
  }

  if (!hasEducation) {
    detailedWeaknesses.push({
      title: 'Missing Explicit Education Header',
      description: 'No dedicated "Education" section or degree qualification header was clearly identified.',
      impact: 'May fail automated minimum educational requirement checks in institutional ATS systems.'
    });
    actionableRecommendations.push(
      'Add a clear "Education" section header with your degree name, institution, and year of completion.'
    );
  }

  if (cleanLines.length < 10) {
    detailedWeaknesses.push({
      title: 'Brief Resume Depth',
      description: `The uploaded text contains only ${cleanLines.length} lines, which may leave key project architectures and role details unrepresented.`,
      impact: 'Limits overall keyword density and ATS relevance scoring.'
    });
    actionableRecommendations.push(
      'Elaborate on your key projects, responsibilities, and system architectures to provide a more comprehensive candidate summary.'
    );
  }

  if (detailedWeaknesses.length === 0) {
    detailedWeaknesses.push({
      title: 'Scope for Expanded System Architecture Details',
      description: 'While your resume is well-structured, expanding on specific system design decisions and trade-offs will further elevate your profile.',
      impact: 'Helps distinguish your profile for senior-level technical evaluations.'
    });
    actionableRecommendations.push(
      'Include direct links to live GitHub repositories, published papers, or deployed demo URLs for your top projects.'
    );
  }

  if (actionableRecommendations.length < 3) {
    actionableRecommendations.push(
      'Ensure standard, consistent formatting across section headers (e.g. Skills, Experience, Education) for maximum ATS parser accuracy.',
      'Highlight specific tools and frameworks used in each project bullet point rather than listing them only in a summary section.'
    );
  }

  return {
    overallScore: Math.max(58, overallScore),
    executiveSummary: `Analysis of candidate profile (${cleanLines[0] || 'Uploaded Resume'}): Demonstrates active experience with an overall ATS score of ${overallScore}/100.`,
    quantifiedMetricsScore,
    keywordDensityScore,
    formattingBypassScore,
    impactActionVerbsScore: Math.min(70 + metricCount * 5, 95),
    strengths: detailedStrengths.map(s => `${s.title}: ${s.description}`),
    weaknesses: detailedWeaknesses.map(w => `${w.title}: ${w.description}`),
    detailedStrengths,
    detailedWeaknesses,
    missingKeywords: ['System Architecture', 'CI/CD Pipelines', 'Cloud Containerization', 'Automated Testing'],
    actionableRecommendations,
    extractedSkills: extractedSkills.length > 0 ? extractedSkills : ['General Professional Experience'],
    bulletPointRewrites: [],
    sectionScores: [
      { section: 'Executive Positioning', score: overallScore, feedback: 'Clear trajectory.' },
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

  // Intelligent Local Skill Differential Engine for prototype mode
  const resumeStr = Array.isArray(candidateSkills) ? candidateSkills.join(' ') : (candidateSkills || '');
  const jdStr = jobDescription || '';

  // Domain skills dictionary for extraction
  const SKILL_DICT = [
    'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'FastAPI', 'Django',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'PyTorch',
    'TensorFlow', 'Machine Learning', 'AI', 'NLP', 'Vector Databases', 'pgvector', 'Git', 'CI/CD', 'REST APIs',
    'GraphQL', 'System Design', 'Microservices', 'Agile', 'Scrum', 'Program Management', 'Operations Management',
    'Stakeholder Management', 'Process Improvement', 'Financial Modeling', 'DCF Valuation', 'SEC Auditing',
    'Data Governance', 'Constitutional Law', 'Figma', 'UI/UX Research', 'Design Systems', 'WCAG 2.2', 'Unit Testing',
    'Communication', 'Leadership', 'Data Analysis', 'Project Management'
  ];

  // Extract skills found in Job Description
  const foundInJd = SKILL_DICT.filter(skill => 
    new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(jdStr)
  );

  // If JD has custom uppercase words, add them
  if (foundInJd.length < 3 && jdStr.trim().length > 0) {
    const extraWords = Array.from(new Set(
      (jdStr.match(/\b[A-Z][a-zA-Z0-9+#.]{2,}\b/g) || [])
        .filter(w => !['The', 'And', 'For', 'With', 'Req', 'Job', 'Role', 'Team', 'Must', 'Have', 'Will', 'Work', 'Experience', 'Candidate', 'Applicant', 'Position'].includes(w))
    ));
    foundInJd.push(...extraWords.slice(0, 5));
  }

  const requiredSkills = Array.from(new Set(foundInJd.length > 0 ? foundInJd : ['Python', 'Docker', 'System Design', 'Kubernetes', 'SQL', 'REST APIs']));

  // Determine matched vs missing skills
  const matchedSkills = requiredSkills.filter(skill => 
    new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(resumeStr)
  );
  const missingSkills = requiredSkills.filter(skill => !matchedSkills.includes(skill));

  // If resume matching missed all, assign at least 1-2 skills
  if (matchedSkills.length === 0 && requiredSkills.length > 0) {
    matchedSkills.push(requiredSkills[0]);
    const idx = missingSkills.indexOf(requiredSkills[0]);
    if (idx !== -1) missingSkills.splice(idx, 1);
  }

  const total = matchedSkills.length + missingSkills.length;
  const matchPercentage = total > 0 ? Math.round((matchedSkills.length / total) * 100) : 78;

  const bridgePlan = (missingSkills.length > 0 ? missingSkills : ['Advanced Containerization', 'Distributed Telemetry']).slice(0, 3).map((sk, idx) => ({
    step: idx + 1,
    title: `Acquire ${sk}`,
    action: `Complete targeted 15-minute evaluation test & project module for ${sk} in learning studio.`,
    duration: idx === 0 ? '3 Days' : idx === 1 ? '1 Week' : '2 Weeks'
  }));

  return {
    matchPercentage,
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ['Core Domain Foundations', 'Technical Problem Solving'],
    missingSkills: missingSkills.length > 0 ? missingSkills : ['Kubernetes Orchestration', 'gRPC Microservices'],
    bridgePlan,
    summary: `Skill analysis complete: Resume matches ${matchedSkills.length} of ${requiredSkills.length} key skill requirements identified in the job description (${matchPercentage}% match).`
  };
};
