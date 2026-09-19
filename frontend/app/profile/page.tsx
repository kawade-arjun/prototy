'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Award,
  Code,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Briefcase,
  History,
  GraduationCap,
  Check
} from 'lucide-react';
import { initialSkills, initialCertificates, VerifiedSkill } from '@/lib/mockData';
import { ProvenanceModal } from '@/components/common/ProvenanceModal';
import { TierBadge } from '@/components/common/TierBadge';

export default function ProfilePage() {
  const [skills] = useState<VerifiedSkill[]>(initialSkills);
  const [selectedSkillForProvenance, setSelectedSkillForProvenance] = useState<VerifiedSkill | null>(null);

  // Proficiency pill style
  const getProficiencyBadge = (proficiency: string) => {
    switch (proficiency) {
      case 'Mastery':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Advanced':
        return 'bg-primary-500/20 text-primary-300 border-primary-500/30';
      case 'Intermediate':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Student Profile Header Card */}
      <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 via-indigo-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/20 shrink-0">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Arjun Kawade</h1>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1D9BF0] text-white shrink-0 shadow-sm" title="Meta Verified">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Scholar
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-neutral-500" />
              National Institute of Technology • B.Tech Computer Science (Class of 2026)
            </p>
          </div>
        </div>

        {/* Global Competency Metrics */}
        <div className="flex items-center gap-4 bg-neutral-950/80 p-3 rounded-2xl border border-neutral-800 self-stretch md:self-auto justify-around">
          <div className="text-center px-3">
            <span className="text-[11px] text-neutral-400 block font-mono uppercase">Readiness</span>
            <span className="text-lg font-bold text-amber-400">94%</span>
          </div>
          <div className="h-8 w-px bg-neutral-800" />
          <div className="text-center px-3">
            <span className="text-[11px] text-neutral-400 block font-mono uppercase">Track Rank</span>
            <span className="text-lg font-bold text-accent-400">Top 4%</span>
          </div>
          <div className="h-8 w-px bg-neutral-800" />
          <div className="text-center px-3">
            <span className="text-[11px] text-neutral-400 block font-mono uppercase">Verified Skills</span>
            <span className="text-lg font-bold text-primary-400">{skills.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Verified Competencies & Provenance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Verified Skills (Clickable for Provenance) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-400" />
                Verified Competency Graph
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Click any skill below to inspect its <strong className="text-primary-300">Competency Provenance</strong> (assessment logs, repo commits, and credential hashes).
              </p>
            </div>
            <Link
              href="/profile/resume"
              className="text-xs text-primary-400 hover:text-primary-300 font-semibold"
            >
              + Update Skills
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {skills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkillForProvenance(skill)}
                className="cursor-pointer group p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-primary-500/70 hover:bg-neutral-850 transition-all shadow-sm hover:shadow-lg hover:shadow-primary-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getProficiencyBadge(skill.proficiency)}`}>
                      {skill.proficiency}
                    </span>
                  </div>

                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1 text-primary-400 font-medium">
                    <History className="w-3.5 h-3.5" />
                    Inspect Provenance
                  </span>
                  <span className="font-mono text-neutral-500">{skill.score}/100</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Projects Showcase */}
          <div className="pt-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary-400" />
              Verified Project Artifacts
            </h2>
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">CareerLens-Backend (FastAPI & pgvector)</span>
                <span className="text-xs text-emerald-400 font-medium">Auto-Evaluated</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Production-grade microservices repository implementing Hugging Face feature-extraction, vector similarity search, and automated test coverage.
              </p>
              <div className="pt-2 flex gap-2 text-xs text-neutral-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">FastAPI</span>
                <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">PyTorch</span>
                <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">pgvector</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Verified Credentials & Quick Links */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-400" />
              Credentials ({initialCertificates.length})
            </h2>
            <Link
              href="/profile/certificates"
              className="text-xs text-primary-400 hover:text-primary-300 font-semibold"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {initialCertificates.map((cert) => (
              <div key={cert.id} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white leading-snug">{cert.title}</h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-mono truncate max-w-[140px]">{cert.issuer}</span>
                  <TierBadge tier={cert.tier} size="sm" showExplainer={false} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Continue Your Journey</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Matched with 3 high-affinity AI roles and 1 active skill gap roadmap.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/opportunities"
                className="w-full py-2 px-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold text-center transition-colors"
              >
                Browse Matched Opportunities (96% Match)
              </Link>
              <Link
                href="/learning-path"
                className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold text-center border border-neutral-700 transition-colors"
              >
                View Skill Gap Roadmap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Provenance Modal */}
      <ProvenanceModal
        skill={selectedSkillForProvenance}
        onClose={() => setSelectedSkillForProvenance(null)}
      />
    </div>
  );
}
