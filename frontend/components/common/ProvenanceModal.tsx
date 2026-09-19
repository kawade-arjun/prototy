'use client';

import React from 'react';
import { X, CheckCircle2, ShieldCheck, Code, Award, Calendar, Hash, ExternalLink } from 'lucide-react';
import { VerifiedSkill } from '@/lib/mockData';

interface ProvenanceModalProps {
  skill: VerifiedSkill | null;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const sourceIcon = {
    assessment: CheckCircle2,
    certificate: Award,
    project: Code,
  }[skill.provenance.sourceType] || CheckCircle2;

  const IconComp = sourceIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl p-6 text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-primary-400 bg-primary-950/70 border border-primary-800/50 px-2 py-0.5 rounded-md">
                Competency Provenance
              </span>
              <span className="text-xs text-neutral-400 font-mono">ID: {skill.id}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1.5 flex items-center gap-2.5">
              {skill.name}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                Score: {skill.score}/100
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 space-y-4">
          {/* Provenance Primary Source Card */}
          <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary-500/20 border border-primary-500/30 text-primary-300">
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase font-mono">Source Type</p>
                <p className="text-sm font-semibold text-white capitalize">
                  {skill.provenance.sourceType} Proof
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-200 font-medium mt-3">
              {skill.provenance.sourceTitle}
            </p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              {skill.provenance.details}
            </p>
          </div>

          {/* Forensic / Verification Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-neutral-800/40 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Verification Date</span>
              </div>
              <p className="text-neutral-200 font-medium">{skill.provenance.dateVerified}</p>
            </div>

            <div className="p-3 rounded-lg bg-neutral-800/40 border border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Validation Level</span>
              </div>
              <p className="text-emerald-300 font-medium">Authoritative (Tier-1 Evaluated)</p>
            </div>
          </div>

          {/* Cryptographic Hash Audit Strip */}
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-400 truncate">
              <Hash className="w-3.5 h-3.5 text-primary-400 shrink-0" />
              <span className="text-neutral-500">Hash:</span>
              <span className="text-neutral-300 truncate">{skill.provenance.verificationHash}</span>
            </div>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700 shrink-0 ml-2">
              Immutable
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition-colors"
          >
            Close Provenance
          </button>
        </div>
      </div>
    </div>
  );
};
