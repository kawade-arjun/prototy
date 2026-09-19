'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Filter,
  DollarSign
} from 'lucide-react';
import { initialOpportunities, OpportunityItem } from '@/lib/mockData';

const stepperStages = ['Matched', 'Interested', 'Shortlisted', 'Interview', 'Offer'] as const;

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);

  const handleToggleInterested = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nextStatus = opp.status === 'Matched' ? 'Interested' : 'Matched';
          const updated = {
            ...opp,
            status: nextStatus as any,
            appliedDate: nextStatus === 'Interested' ? 'Today' : undefined,
          };
          if (selectedOpportunity && selectedOpportunity.id === id) {
            setSelectedOpportunity(updated);
          }
          return updated;
        }
        return opp;
      })
    );
  };

  const getStageIndex = (status: string) => {
    const idx = stepperStages.indexOf(status as any);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            Stage 5 of 6 • Match & Place
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Ranked Opportunities & Placements
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Matched via pgvector cosine distance against your verified 384-dimensional skill vector.
          </p>
        </div>

        {/* Mutual-interest gate notice */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Mutual-Interest Gate:</strong> You must click &quot;Interested&quot; to apply. No auto-apply without consent.
          </span>
        </div>
      </div>

      {/* Main Opportunities Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Feed */}
        <div className="lg:col-span-2 space-y-4">
          {opportunities.map((opp) => {
            const isInterested = opp.status !== 'Matched';
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(opp)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                  selectedOpportunity?.id === opp.id
                    ? 'bg-neutral-900 border-primary-500 shadow-lg shadow-primary-500/10'
                    : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        {opp.matchPercentage}% Match
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">{opp.companyName}</span>
                    </div>
                    <h3 className="text-base font-bold text-white hover:text-primary-300 transition-colors">
                      {opp.roleTitle}
                    </h3>
                  </div>

                  {/* Mutual-Interest Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleInterested(opp.id);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isInterested
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    }`}
                  >
                    {isInterested ? '✓ Interested' : 'I am Interested'}
                  </button>
                </div>

                <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed line-clamp-2">
                  {opp.roleRequirementsSummary}
                </p>

                {/* Metadata & tags */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {opp.location}
                    </span>
                    <span className="text-neutral-300 font-medium">{opp.stipendOrSalary}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {opp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Application Detail & Horizontal Status Stepper */}
        <div className="lg:col-span-1">
          {selectedOpportunity ? (
            <div className="sticky top-20 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-400">
                  Application Tracker
                </span>
                <h3 className="text-base font-bold text-white mt-1">{selectedOpportunity.roleTitle}</h3>
                <p className="text-xs text-neutral-400">{selectedOpportunity.companyName}</p>
              </div>

              {/* Horizontal Stepper */}
              <div className="py-2">
                <p className="text-xs font-semibold text-neutral-300 mb-3">Recruitment Pipeline Status:</p>
                <div className="space-y-3">
                  {stepperStages.map((stage, idx) => {
                    const currentIdx = getStageIndex(selectedOpportunity.status);
                    const isPassed = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={stage} className="flex items-center gap-3 text-xs">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isPassed
                              ? 'bg-emerald-500 text-neutral-950'
                              : isCurrent
                              ? 'bg-primary-500 text-white ring-2 ring-primary-500/40'
                              : 'bg-neutral-800 text-neutral-500'
                          }`}
                        >
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <span
                          className={`font-medium ${
                            isCurrent
                              ? 'text-white font-bold'
                              : isPassed
                              ? 'text-emerald-400'
                              : 'text-neutral-500'
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-xs text-neutral-400 space-y-2">
                <p>
                  <strong>Role Compensation:</strong> {selectedOpportunity.stipendOrSalary}
                </p>
                <p>
                  <strong>Location:</strong> {selectedOpportunity.location}
                </p>
              </div>

              <button
                onClick={() => handleToggleInterested(selectedOpportunity.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedOpportunity.status !== 'Matched'
                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                }`}
              >
                {selectedOpportunity.status !== 'Matched' ? 'Withdraw Interest' : 'Signal Interest (1-Click)'}
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center text-xs text-neutral-500">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
              Select an opportunity to inspect application status tracking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
