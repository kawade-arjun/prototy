import React, { useState } from 'react';
import { MOCK_CREDENTIAL_AUDIT } from '../../../mock/mockData';
import { useTheme } from '../../../context/ThemeContext';
import { 
  ShieldCheck, 
  Calendar, 
  Scan, 
  Fingerprint, 
  QrCode, 
  Copy, 
  Check,
  CheckCircle2
} from 'lucide-react';

import { useStudent } from '../../../context/StudentContext';

export const Tab7LivingResume: React.FC = () => {
  const { theme } = useTheme();
  const { activeStudent } = useStudent();
  const [activeVerifierTier, setActiveVerifierTier] = useState<1 | 2 | 3>(2);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditData, setAuditData] = useState(MOCK_CREDENTIAL_AUDIT);
  const [hoveredDay, setHoveredDay] = useState<{ id: number; commits: number; date: string } | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Generate 52-week activity heatmap (52 weeks x 7 days = 364 days)
  const generateHeatmapDays = () => {
    const days = [];
    const seed = [0, 1, 2, 4, 1, 0, 3, 2, 4, 3, 1, 0, 2, 4, 4, 1, 2, 3, 0, 2];
    for (let i = 0; i < 364; i++) {
      const intensity = seed[(i * 7 + 13) % seed.length];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const approxMonth = monthNames[Math.floor((i / 364) * 12)];
      days.push({
        id: i,
        intensity,
        commits: intensity * 3 + (intensity > 0 ? 1 : 0),
        date: `${approxMonth} ${((i % 28) + 1)}`
      });
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();

  const handleReAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setIsRunningAudit(false);
      alert('3-Tier Credential Audit re-executed! All certificates cryptographically pristine.');
    }, 1200);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(auditData.tier3_sovereignPKI.ledgerHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const intensityColors = theme === 'dark' ? [
    'bg-[#12192a]',
    'bg-emerald-950/60 border border-emerald-800/40',
    'bg-emerald-700/60',
    'bg-emerald-500',
    'bg-emerald-400 shadow-sm shadow-emerald-400/50'
  ] : [
    'bg-slate-200',
    'bg-emerald-100 border border-emerald-300',
    'bg-emerald-400',
    'bg-emerald-500',
    'bg-emerald-600 shadow-sm shadow-emerald-500/30'
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-amber-50/30 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TAB 7 • THE LIVING RESUME ({activeStudent.streamName.toUpperCase()} VERIFIABLE DOSSIER)</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {activeStudent.name} • Living Credential Ledger
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStudent.summary}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{activeStudent.institution}</span>
              <span>•</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">{activeStudent.digiLockerId}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-bold text-[10px]">
                {activeStudent.benchmarkBadge}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 font-bold text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                DigiLocker Verified
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleReAudit}
              disabled={isRunningAudit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 dark:bg-[#121a2e] dark:hover:bg-[#18233e] dark:text-slate-200 dark:border-white/[0.1] text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <Scan className={`w-4 h-4 text-amber-600 dark:text-amber-400 ${isRunningAudit ? 'animate-spin' : ''}`} />
              <span>{isRunningAudit ? 'Auditing Forensic Signatures...' : 'Re-Run 3-Tier Audit'}</span>
            </button>
            <button
              onClick={() => {
                alert(`Verifiable Credential QR Card for ${activeStudent.name} (${activeStudent.streamName}) exported!`);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Export QR Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 52-Week GitHub / LeetCode-style Activity Heatmap */}
      <div className="glass-panel p-6 rounded-3xl space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              52-Week Verified Problem Solving & Sandbox Commit Heatmap
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">1,248 verified sandbox submissions in the last 12 months</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Less</span>
            {intensityColors.map((color, idx) => (
              <span key={idx} className={`w-3.5 h-3.5 rounded-sm ${color}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid (52 columns of 7 rows) */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[760px]">
            {heatmapDays.map((d) => (
              <div
                key={d.id}
                onMouseEnter={() => setHoveredDay(d)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3 h-3 rounded-sm ${intensityColors[d.intensity]} transition-all duration-150 hover:scale-150 cursor-pointer`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-4">
            <span>Continuous Streak: <strong className="text-amber-600 dark:text-amber-300 font-bold">8 Days Active</strong></span>
            <span>Longest Streak: <strong className="text-slate-900 dark:text-white font-bold">42 Days</strong></span>
            <span>Integrity: <strong className="text-amber-600 dark:text-amber-400 font-bold">100% Zero Flags</strong></span>
          </div>

          {hoveredDay && (
            <div className="text-amber-600 dark:text-amber-400 font-mono font-bold">
              {hoveredDay.commits} verified tests on {hoveredDay.date}
            </div>
          )}
        </div>
      </div>

      {/* 3-Tier Pre-Flight Credential Verifier Studio */}
      <div className="glass-panel p-7 rounded-3xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">3-Tier Pre-Flight Credential Verifier</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Guarantees 0% credential fraud via multi-modal forensic inspection</p>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-[#070b14] p-1 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
            <button
              onClick={() => setActiveVerifierTier(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 1 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 1: pyHanko XMP
            </button>
            <button
              onClick={() => setActiveVerifierTier(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 2 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 2: OpenCV ELA Forensics
            </button>
            <button
              onClick={() => setActiveVerifierTier(3)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeVerifierTier === 3 ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tier 3: DigiLocker Verification
            </button>
          </div>
        </div>

        {/* Tier Details Content Box */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#080d1a] border border-slate-200 dark:border-white/[0.08] space-y-5">
          {activeVerifierTier === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 1: PDF XMP Digital Timestamp & PKI Signature Audit
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier1_xmpTimestamp.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Audited using <code className="text-amber-600 dark:text-amber-400 font-mono font-bold">pyHanko</code> cryptographic engine. Validates the PDF ByteRange signature and Sub-CA trust chain.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5 shadow-sm">
                <div>Engine: <span className="text-amber-600 dark:text-amber-400">{auditData.tier1_xmpTimestamp.engine}</span></div>
                <div>Timestamp: <span className="text-slate-900 dark:text-white">{auditData.tier1_xmpTimestamp.timestamp}</span></div>
                <div>Certificate Authority: <span className="text-amber-600 dark:text-amber-400">{auditData.tier1_xmpTimestamp.certAuthority}</span></div>
              </div>
            </div>
          )}

          {activeVerifierTier === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 2: OpenCV Error Level Analysis (ELA) Pixel-Level Forensics
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier2_opencvELA.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Detects pixel-level document alterations, resaved JPEG artifacts, and photoshopped grade sheets by calculating compression error variance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] space-y-2 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Forensic Error Level Score:</div>
                  <div className="text-4xl font-black text-amber-600 dark:text-amber-400">{auditData.tier2_opencvELA.errorLevelScore}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Threshold: &lt; 4.5 is pristine original. Score &gt; 12.0 flags photoshopped pixels.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] space-y-2 shadow-sm">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Altered Pixels Detected:</div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">0 Pixels</div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    ✓ Clean certificate image integrity confirmed
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeVerifierTier === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tier 3: Verification via DigiLocker / Credly
                </span>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                  {auditData.tier3_sovereignPKI.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct statutory API synchronization with Ministry of Electronics and IT (MeitY) DigiLocker repository.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2 shadow-sm">
                <div>DigiLocker Record ID: <span className="text-amber-600 dark:text-amber-400">{auditData.tier3_sovereignPKI.digiLockerId}</span></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate">Public PKI Hash: <span className="text-amber-600 dark:text-amber-400">{auditData.tier3_sovereignPKI.ledgerHash}</span></div>
                  <button
                    onClick={handleCopyHash}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0"
                    title="Copy Ledger Hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>Revocation Status: <span className="text-slate-900 dark:text-white font-bold">Active (Non-Revoked)</span></div>
              </div>
            </div>
          )}

        </div>

        {/* Verified Sovereign Badges Display */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verified Credentials:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">IITB Benchmark Certified</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">98th Percentile Judge0 Sandbox</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">DigiLocker Verified Record</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">B.Tech Honors Academic Record</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">ELA Forensic Pristine</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero Document Alterations</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
