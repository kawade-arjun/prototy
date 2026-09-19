'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  FileText,
  Github,
  Globe,
  Sparkles,
  Check,
  X,
  Plus,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { api } from '@/lib/api';
import { LoadingState } from '@/components/common/LoadingState';

export default function ResumePage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/arjunkawade');
  const [portfolioUrl, setPortfolioUrl] = useState('https://careeroptic.dev/portfolio');

  // Loading & Extracted Skills State
  const [analyzing, setAnalyzing] = useState(false);
  const [skills, setSkills] = useState<string[]>([
    'Python',
    'FastAPI Microservices',
    'PostgreSQL',
    'Machine Learning',
    'PyTorch',
    'Docker',
    'React',
    'Problem Solving',
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [hasUploaded, setHasUploaded] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setAnalyzing(true);

    try {
      // Calls the backend's skill extraction endpoint (which internally runs NER pre-filter + LLM extraction)
      const res = await api.extractResumeSkills(uploadedFile);
      setSkills(res.skills);
      setHasUploaded(true);
    } catch (err) {
      console.error('Error analyzing resume:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleConfirmAndProceed = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push('/assessment/tech');
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            Stage 2 of 6 • Resume & Skill Mapping
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Map Your Verified Skills & Projects
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium">
          <Cpu className="w-4 h-4" />
          <span>AI Parser Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upload Dropzone & Links */}
        <div className="lg:col-span-1 space-y-5">
          {/* File Upload Box */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-white mb-2">Upload Resume</h2>
            <p className="text-xs text-neutral-400 mb-4">
              Supported formats: PDF, DOCX (Max 15MB).
            </p>

            <label className="border-2 border-dashed border-neutral-700 hover:border-primary-500/80 bg-neutral-950/60 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform mb-2">
                <UploadCloud className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-neutral-200">
                {file ? file.name : 'Click to browse or drop file'}
              </span>
              <span className="text-[11px] text-neutral-500 mt-1">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Auto-extracts skills in real-time'}
              </span>
            </label>
          </div>

          {/* Optional Portfolio / GitHub Links */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Repository & Portfolio Links</h3>
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5" /> GitHub Profile
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Portfolio / Live Site
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.dev"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editable Skill Chips & Confirmation */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    Extracted Competencies
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300">
                      {skills.length} skills identified
                    </span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Review and edit terms extracted from your resume. Remove inaccurate skills or add missing ones.
                  </p>
                </div>
              </div>

              {/* Explicit Single Loading State: Analyzing resume... */}
              {analyzing ? (
                <LoadingState
                  message="Analyzing resume..."
                  subMessage="Extracting candidate skill entities and structural competencies via AI parser."
                  isAsyncJob={true}
                />
              ) : (
                <>
                  {/* Editable Skill Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 text-xs font-medium text-neutral-200 transition-all"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-neutral-400 hover:text-red-400 rounded-full p-0.5 hover:bg-neutral-700 transition-colors"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Custom Skill Form */}
                  <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      placeholder="Add another skill (e.g. Next.js, Kubernetes, NLP)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </form>
                </>
              )}

              {/* Student Review Guarantee Notice */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p>
                  <span className="text-neutral-200 font-semibold">Student Review Guarantee: </span>
                  Extracted terms are never auto-locked without your explicit review. These skills will inform your upcoming Proctored Assessment battery.
                </p>
              </div>
            </div>

            {/* Confirmation & Continue Button */}
            <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Skills confirmed here will generate your baseline assessment battery.
              </span>
              <button
                type="button"
                onClick={handleConfirmAndProceed}
                disabled={analyzing || saving || skills.length === 0}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white text-xs font-bold shadow-lg shadow-primary-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{saving ? 'Locking Skills...' : 'Confirm Skills & Take Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
