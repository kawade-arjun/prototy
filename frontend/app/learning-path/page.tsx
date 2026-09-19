'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { initialLearningPath, LearningPathItem } from '@/lib/mockData';

export default function LearningPathPage() {
  const [learningPath, setLearningPath] = useState<LearningPathItem[]>(initialLearningPath);

  const handleToggleComplete = (id: string) => {
    setLearningPath((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const completedCount = learningPath.filter((i) => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / learningPath.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            Stage 6 of 6 • Learn & Grow
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Target Role Skill Gap & Learning Path
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Personalized LLM-generated roadmap targeting Junior AI Engineer (NeuralPulse India).
          </p>
        </div>

        {/* Target role badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-medium self-start sm:self-auto">
          <Target className="w-4 h-4 text-accent-400" />
          <span>Target Gap: 14% to 100% Match</span>
        </div>
      </div>

      {/* Skill Gap Diagnostic Card */}
      <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-400" />
              Progress Towards Target Role Closure
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {completedCount} of {learningPath.length} milestone modules completed.
            </p>
          </div>
          <span className="text-2xl font-extrabold text-primary-400 font-mono">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Ordered Learning Path List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-400" />
          LLM-Synthesized Step-by-Step Curriculum
        </h2>

        {learningPath.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.isCompleted
                ? 'bg-neutral-900/50 border-neutral-800/80 opacity-80'
                : 'bg-neutral-900/90 border-neutral-800 hover:border-primary-500/60 shadow-lg shadow-black/20'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                {/* Checkbox toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleComplete(item.id)}
                  className="mt-0.5 text-neutral-400 hover:text-emerald-400 transition-colors shrink-0"
                  aria-label={item.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-neutral-600 hover:text-neutral-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                      Step {item.stepNumber}
                    </span>
                    <span className="text-xs text-primary-400 font-medium">{item.category}</span>
                    <span className="text-xs text-neutral-500">• {item.duration}</span>
                  </div>

                  <h3
                    className={`text-base font-bold transition-colors ${
                      item.isCompleted ? 'text-neutral-400 line-through' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Explicit Requirement: Short one-line "why this is recommended" justification */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs text-neutral-300">
                    <strong className="text-accent-400 font-semibold">Why recommended: </strong>
                    <span className="leading-relaxed">{item.whyRecommended}</span>
                  </div>
                </div>
              </div>

              {/* Resource action link */}
              <a
                href={item.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 border border-neutral-700 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <span>{item.resourceType}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
