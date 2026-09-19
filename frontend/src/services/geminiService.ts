const GEMINI_KEY_STORAGE = 'careeroptic_gemini_api_key';

export const getGeminiApiKey = (): string => {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
};

export const setGeminiApiKey = (key: string): void => {
  localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
};

export interface GeminiResumeAnalysis {
  overallScore: number;
  quantifiedMetricsScore: number;
  keywordDensityScore: number;
  formattingBypassScore: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  actionableRecommendations: string[];
  extractedSkills: string[];
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
  discipline: string,
  apiKey?: string
): Promise<GeminiResumeAnalysis> => {
  const key = apiKey || getGeminiApiKey();
  if (!key) {
    throw new Error('Gemini API Key is missing. Please enter your Gemini API Key in the AI Settings banner.');
  }

  const prompt = `You are an expert AI Resume Evaluator and ATS Diagnostic Engine for high-performance careers in ${discipline}.
Analyze the following candidate resume text and return a VALID JSON object (and ONLY JSON, no markdown codeblocks or extra text) with this exact schema:
{
  "overallScore": 88,
  "quantifiedMetricsScore": 85,
  "keywordDensityScore": 90,
  "formattingBypassScore": 92,
  "strengths": ["string1", "string2"],
  "weaknesses": ["string1", "string2"],
  "missingKeywords": ["string1", "string2"],
  "actionableRecommendations": ["string1", "string2"],
  "extractedSkills": ["skill1", "skill2"]
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
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API returned status ${res.status}`);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed: GeminiResumeAnalysis = JSON.parse(cleanJson);
  return parsed;
};

export const analyzeSkillGapWithGemini = async (
  candidateSkills: string[],
  jobDescription: string,
  discipline: string,
  apiKey?: string
): Promise<GeminiSkillGapAnalysis> => {
  const key = apiKey || getGeminiApiKey();
  if (!key) {
    throw new Error('Gemini API Key is missing. Please enter your Gemini API Key in the AI Settings banner.');
  }

  const prompt = `You are an AI Skill Gap & Career Differential Analysis Engine for ${discipline}.
Compare the candidate's verified skills against the target Job Description and output a VALID JSON object (and ONLY JSON, no markdown codeblocks or extra text) with this exact schema:
{
  "matchPercentage": 82,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["missing1", "missing2"],
  "bridgePlan": [
    { "step": 1, "title": "short title", "action": "learning action", "duration": "1 Week" },
    { "step": 2, "title": "short title", "action": "learning action", "duration": "2 Weeks" },
    { "step": 3, "title": "short title", "action": "learning action", "duration": "1 Month" }
  ],
  "summary": "Executive summary string."
}

Candidate Verified Skills: ${candidateSkills.join(', ')}

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
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API returned status ${res.status}`);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed: GeminiSkillGapAnalysis = JSON.parse(cleanJson);
  return parsed;
};
