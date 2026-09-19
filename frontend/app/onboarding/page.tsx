'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code,
  Palette,
  Scale,
  Stethoscope,
  Coins,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

interface CareerTrack {
  id: string;
  name: string;
  code: string;
  description: string;
  assessmentBattery: string;
  icon: any;
  color: string;
  badge: string;
}

const tracks: CareerTrack[] = [
  {
    id: 'tech',
    name: 'Tech & AI Systems',
    code: 'tech',
    description: 'Software engineering, machine learning, systems architecture, cloud infrastructure.',
    assessmentBattery: 'Monaco Live Coding, Algorithms, Async APIs & System Design',
    icon: Code,
    color: 'from-blue-600 to-indigo-600',
    badge: 'High Demand',
  },
  {
    id: 'design',
    name: 'Design & Creative',
    code: 'design',
    description: 'Product UX/UI, human-computer interaction, visual systems, user research.',
    assessmentBattery: 'Design Heuristics, Component Architectures & Case Studies',
    icon: Palette,
    color: 'from-fuchsia-600 to-pink-600',
    badge: 'Portfolio Centric',
  },
  {
    id: 'law',
    name: 'Law & Compliance',
    code: 'law',
    description: 'Corporate law, DPDP data governance, intellectual property, regulatory compliance.',
    assessmentBattery: 'Statutory Interpretation, Case Precedent & Compliance Analysis',
    icon: Scale,
    color: 'from-amber-600 to-orange-600',
    badge: 'Regulatory',
  },
  {
    id: 'bio',
    name: 'Bio/Ayush Healthcare',
    code: 'bio',
    description: 'Biotechnology, clinical data systems, pharmaceutical compliance, integrative health.',
    assessmentBattery: 'Bioinformatics, Clinical Reasoning & Medical Ethics Rubrics',
    icon: Stethoscope,
    color: 'from-emerald-600 to-teal-600',
    badge: 'Healthcare',
  },
  {
    id: 'finance',
    name: 'Finance & Commerce',
    code: 'finance',
    description: 'Financial engineering, quantitative modeling, fintech risk analysis, investment strategy.',
    assessmentBattery: 'Quantitative Reasoning, Risk Analytics & Financial Forecasting',
    icon: Coins,
    color: 'from-violet-600 to-purple-600',
    badge: 'Fintech',
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  // Selected track (soft preference)
  const [selectedTrack, setSelectedTrack] = useState<string>('tech');

  // Pre-filled fields from DigiLocker/SSO
  const [fullName, setFullName] = useState('Arjun Kawade');
  const [institution, setInstitution] = useState('National Institute of Technology');
  const [program, setProgram] = useState('B.Tech in Computer Science');
  const [gradYear, setGradYear] = useState('2026');
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push('/profile/resume');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            Stage 1 of 6 • Onboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Choose Your Career Track & Verify Profile
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>DigiLocker Pre-filled</span>
        </div>
      </div>

      <form onSubmit={handleContinue} className="space-y-8">
        {/* Track Selection Card Grid */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-semibold text-white">Select Primary Career Track</h2>
            <span className="text-xs text-primary-400 font-medium">
              * Soft preference — sets your initial assessment battery, not a locked-in filter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => {
              const IconComp = track.icon;
              const isSelected = selectedTrack === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`cursor-pointer relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-primary-500 shadow-lg shadow-primary-500/15 scale-[1.02]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${track.color} flex items-center justify-center text-white shadow-md`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {track.badge}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{track.name}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {track.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-500">
                    <span className="text-neutral-400 font-medium">Assessment: </span>
                    {track.assessmentBattery}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Basic Profile Details (Pre-filled from DigiLocker/SSO) */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
            Profile Credentials
            <span className="text-xs font-normal text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Synced from Sovereign Auth
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            These fields were retrieved from your verified session. You may modify them if needed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Institution / University
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Degree / Program
              </label>
              <input
                type="text"
                required
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Graduation Year
              </label>
              <input
                type="text"
                required
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Submit & Proceed Button */}
        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/25 flex items-center gap-2.5 transition-all hover:scale-[1.01]"
          >
            <span>{submitting ? 'Saving...' : 'Proceed to Resume & Skill Mapping'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
