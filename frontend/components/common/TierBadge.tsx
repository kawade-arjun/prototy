'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export type VerificationTier = 'tier1' | 'tier2' | 'tier3';

interface TierBadgeProps {
  tier: VerificationTier;
  size?: 'sm' | 'md' | 'lg';
  showExplainer?: boolean;
}

const tierConfig = {
  tier1: {
    label: 'Verified (DigiLocker)',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    icon: ShieldCheck,
    iconColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    shortDesc: 'Cryptographically anchored & verified via National Academic Depository (DigiLocker PKI).',
    legalStanding: 'Full Sovereign Legal Validity under IT Act 2000.',
  },
  tier2: {
    label: 'Verified (Issuer Portal)',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    icon: CheckCircle2,
    iconColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
    shortDesc: 'Direct automated API lookup against issuer registry (e.g. AWS, Coursera, Google, NPTEL).',
    legalStanding: 'Industry Accredited Credential Status.',
  },
  tier3: {
    label: 'Unverified — pattern check only',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    icon: AlertCircle,
    iconColor: 'text-amber-400',
    dotColor: 'bg-amber-400',
    shortDesc: 'Extracted via Donut OCR heuristics. Visual pattern detected, but not verified by issuing authority.',
    legalStanding: 'Provisional Status: Requires manual institutional audit.',
  },
};

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  size = 'md',
  showExplainer = true,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const config = tierConfig[tier] || tierConfig.tier3;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-semibold',
  }[size];

  return (
    <div className="relative inline-flex items-center">
      <span
        className={`inline-flex items-center rounded-full border shadow-sm transition-all ${config.badgeBg} ${sizeClasses}`}
        title={config.label}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
        <IconComponent className={`w-3.5 h-3.5 ${config.iconColor}`} />
        <span>{config.label}</span>

        {showExplainer && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTooltipOpen(!tooltipOpen);
            }}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            className="ml-1 opacity-70 hover:opacity-100 hover:text-white transition-opacity focus:outline-none"
            aria-label="Explain verification tier"
          >
            <Info className="w-3 h-3" />
          </button>
        )}
      </span>

      {/* Plain-language explainer tooltip */}
      {tooltipOpen && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start gap-2 mb-1.5">
            <IconComponent className={`w-4 h-4 mt-0.5 shrink-0 ${config.iconColor}`} />
            <div>
              <p className="font-semibold text-white">{config.label}</p>
              <p className="text-neutral-300 mt-1 leading-relaxed">{config.shortDesc}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
            <span className="text-neutral-200 font-medium">Standard: </span>
            {config.legalStanding}
          </div>
        </div>
      )}
    </div>
  );
};
