'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Calendar,
  Key,
  Info,
} from 'lucide-react';
import { initialCertificates, CertificateItem } from '@/lib/mockData';
import { TierBadge } from '@/components/common/TierBadge';
import { api } from '@/lib/api';
import { LoadingState } from '@/components/common/LoadingState';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(initialCertificates);
  const [uploading, setUploading] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Calls the 3-tier certificate verification pipeline in the backend
      const result = await api.verifyCertificate(file);

      const newCert: CertificateItem = {
        id: `cert-${Date.now()}`,
        title: result.courseName,
        issuer: result.issuer,
        issueDate: result.issueDate,
        tier: result.verificationTier,
        tierLabel: result.tierLabel,
        certificateId: result.certificateId,
        skillsExtracted: ['Cloud Architecture', 'Container Orchestration', 'Microservices'],
      };

      setCertificates([newCert, ...certificates]);
    } catch (err) {
      console.error('Upload verification error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            Stage 4 of 6 • Credential Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Verified Academic & Industry Credentials
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Each credential is differentiated into three rigorous verification tiers: National DigiLocker PKI, Issuer Portal API, or Heuristic Pattern Inspection.
          </p>
        </div>

        <button
          onClick={() => setInfoModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 border border-neutral-700 flex items-center gap-1.5 transition-colors"
        >
          <Info className="w-4 h-4 text-primary-400" />
          <span>About 3 Tiers</span>
        </button>
      </div>

      {/* Upload Box */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-bold text-white mb-2">Upload Certificate for Multi-Tier Verification</h2>
        <p className="text-xs text-neutral-400 mb-4">
          Upload PDF or scanned image. Digital PDFs are verified via PKI/Issuer APIs; scanned certificates automatically trigger the Donut OCR pipeline.
        </p>

        <label className="border-2 border-dashed border-neutral-700 hover:border-primary-500/80 bg-neutral-950/60 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleCertificateUpload}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform mb-2">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-neutral-200">
            Click to upload certificate or marksheet
          </span>
          <span className="text-[11px] text-neutral-500 mt-1">
            Supported: PDF, PNG, JPG (Auto-routes to 3-tier inspection)
          </span>
        </label>

        {uploading && (
          <div className="mt-4">
            <LoadingState
              message="Verifying credential across inspection tiers..."
              subMessage="Running text-layer checks, Donut OCR heuristic parsing, and issuer registry lookup."
              isAsyncJob={true}
            />
          </div>
        )}
      </div>

      {/* Certificates List: Strict 3-Tier Visual Distinction */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
          Issued & Verified Credentials ({certificates.length})
        </h2>

        {certificates.map((cert) => {
          // Border styling strictly differentiated per tier
          const tierBorderColor = {
            tier1: 'border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-500/60',
            tier2: 'border-blue-500/40 bg-blue-950/10 hover:border-blue-500/60',
            tier3: 'border-amber-500/40 bg-amber-950/10 hover:border-amber-500/60',
          }[cert.tier];

          return (
            <div
              key={cert.id}
              className={`p-5 rounded-2xl border transition-all ${tierBorderColor}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white shrink-0 mt-0.5">
                    <Award className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cert.title}</h3>
                    <p className="text-xs text-neutral-300 mt-0.5">{cert.issuer}</p>

                    {/* Metadata strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 mt-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Key className="w-3.5 h-3.5 text-neutral-500" />
                        ID: {cert.certificateId}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        Issued: {cert.issueDate}
                      </span>
                    </div>

                    {/* Extracted skills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cert.skillsExtracted.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strict Tier Badge with Distinct Colors & Icons (NEVER generic checkmark) */}
                <div className="shrink-0 self-start sm:self-auto">
                  <TierBadge tier={cert.tier} size="md" showExplainer={true} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3-Tier Explainer Modal */}
      {infoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-lg w-full text-neutral-200">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary-400" />
              The 3-Tier Verification Architecture
            </h3>
            <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
              CareerLens never displays all credentials with a generic checkmark. Credentials are mathematically and administratively ranked into three strict tiers:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Tier 1: Verified (DigiLocker / Cryptographic)
                </span>
                <p className="text-neutral-300 mt-1">
                  Validated against the Government of India National Academic Depository via PKI digital signatures. Irrefutable legal proof.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/40">
                <span className="font-bold text-blue-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Tier 2: Verified (Issuer Portal)
                </span>
                <p className="text-neutral-300 mt-1">
                  Direct automated API lookup into vendor registries (Coursera, AWS, Google, NPTEL, Microsoft). Confirmed against live credential ID.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Tier 3: Unverified — pattern check only
                </span>
                <p className="text-neutral-300 mt-1">
                  Extracted via the Donut OCR transformer model. Visual certificates have matching layout and structure, but lack automated API confirmation.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Close Explainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
