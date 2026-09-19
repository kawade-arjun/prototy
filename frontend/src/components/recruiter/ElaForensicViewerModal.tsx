import React, { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  AlertTriangle, 
  Eye, 
  Layers, 
  FileText, 
  Binary, 
  Cpu, 
  Send, 
  CheckCircle2, 
  Ban,
  Lock
} from 'lucide-react';
import { RecruiterCandidate } from '../../mock/recruiterData';

interface ElaForensicViewerModalProps {
  candidate: RecruiterCandidate;
  onClose: () => void;
  onQuarantine: (candidateId: string) => void;
  onAlertTpo: (candidateId: string) => void;
}

export const ElaForensicViewerModal: React.FC<ElaForensicViewerModalProps> = ({
  candidate,
  onClose,
  onQuarantine,
  onAlertTpo
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'original' | 'ela'>('split');
  const [isQuarantined, setIsQuarantined] = useState(candidate.interviewStatus === 'quarantined');
  const [isTpoAlerted, setIsTpoAlerted] = useState(false);

  const ela = candidate.elaTelemetry;
  if (!ela) return null;

  const handleQuarantine = () => {
    setIsQuarantined(true);
    onQuarantine(candidate.id);
  };

  const handleAlertTpo = () => {
    setIsTpoAlerted(true);
    onAlertTpo(candidate.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-rose-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-rose-200 dark:border-rose-900/40 bg-rose-50/80 dark:bg-rose-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                  OPENCV ELA FORENSIC ENGINE • ZERO-FRAUD AUDIT
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  ID: {candidate.id}
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Forensic Tamper Detection: {candidate.name} ({candidate.college})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setActiveViewMode('split')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeViewMode === 'split' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Side-by-Side ELA
              </button>
              <button
                onClick={() => setActiveViewMode('original')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeViewMode === 'original' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                Original Document
              </button>
              <button
                onClick={() => setActiveViewMode('ela')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeViewMode === 'ela' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                ELA Heatmap Only
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Forensic Alert Banner */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-sm font-extrabold text-rose-700 dark:text-rose-300">
                Critical Compression Error Variance Detected (ELA Index: {ela.deviationIndex} - CRITICAL)
              </div>
              <p className="text-xs text-rose-600 dark:text-rose-300 leading-relaxed">
                {ela.tamperedField} Notice how the edited CGPA and registrar stamp fluoresce with bright yellow/white pixel variance, indicating post-generation digital tampering in external imaging software.
              </p>
            </div>
          </div>

          {/* Side-by-Side Visual Inspection Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Left: Original Document */}
            {(activeViewMode === 'split' || activeViewMode === 'original') && (
              <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      Original Attached Marksheet / Degree
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    RGB (Visual Layer)
                  </span>
                </div>

                {/* Simulated Certificate with Tampered Overlay Highlight */}
                <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-inner min-h-[300px] flex flex-col justify-between font-serif text-slate-900 dark:text-slate-100">
                  <div className="text-center space-y-1 border-b pb-3 border-slate-100 dark:border-slate-800">
                    <div className="text-xs tracking-widest uppercase font-mono font-bold text-slate-400">
                      Visvesvaraya Technological University
                    </div>
                    <div className="text-sm font-bold tracking-tight">
                      OFFICIAL CONSOLIDATED GRADE CARD (2026)
                    </div>
                  </div>

                  <div className="py-4 space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Candidate Name:</span>
                      <strong className="font-bold">{candidate.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">University Seat No:</span>
                      <strong className="font-mono">1VT22CS089</strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/40 relative">
                      <span className="text-slate-500">Declared Cumulative GPA:</span>
                      <span className="text-base font-mono font-black text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <span>9.85</span>
                        <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-rose-500 text-white font-bold uppercase">
                          Tampered
                        </span>
                      </span>
                      {/* Bounding Box Accent */}
                      <div className="absolute -inset-1 border-2 border-dashed border-rose-500 rounded-lg pointer-events-none animate-pulse" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Degree Classification:</span>
                      <strong>First Class with Distinction</strong>
                    </div>
                  </div>

                  <div className="border-t pt-3 border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-400">Registry Stamp: Spliced</span>
                    <span className="text-rose-600 font-bold">[SUSPECT REGISTRAR SEAL]</span>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Error Level Analysis Heatmap */}
            {(activeViewMode === 'split' || activeViewMode === 'ela') && (
              <div className="rounded-2xl border border-rose-300 dark:border-rose-900/40 bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Binary className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-extrabold text-amber-300">
                      OpenCV cv2.absdiff() Error Level Analysis (ELA)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    Q-Factor: 95% Re-save
                  </span>
                </div>

                {/* Simulated ELA Discrepancy Heatmap */}
                <div className="relative rounded-xl border border-slate-800 bg-[#060810] p-5 shadow-inner min-h-[300px] flex flex-col justify-between font-mono text-amber-400 overflow-hidden">
                  
                  {/* Glowing noise grid representing baseline uniform compression */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-30 pointer-events-none" />

                  <div className="text-center space-y-1 border-b pb-3 border-slate-800">
                    <div className="text-[10px] tracking-widest uppercase text-slate-500">
                      SPECTRAL ERROR FREQUENCY MATRIX
                    </div>
                    <div className="text-xs text-slate-400">
                      UNIFORM COMPRESSION BASELINE: 12-16 dB
                    </div>
                  </div>

                  <div className="py-6 space-y-4 text-xs relative z-10">
                    <div className="p-3 rounded-lg border-2 border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-500/20 space-y-1 animate-pulse">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-300 font-bold text-xs uppercase tracking-wider">
                          HIGH-LEVEL RESAVE DISCREPANCY (CGPA REGION)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-yellow-500 text-slate-950 font-black text-[10px]">
                          FLUORESCENCE +280%
                        </span>
                      </div>
                      <div className="text-[11px] text-yellow-100 font-mono">
                        Target Pixels: [X: 320, Y: 145] • Delta: 42.8 vs Baseline 3.1
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-rose-400 bg-rose-500/20 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-rose-300 font-bold text-[11px] uppercase">
                          SPLICED STAMP INCONSISTENT DCT COEFFICIENTS
                        </span>
                        <span className="text-[10px] font-mono text-rose-300">
                          SEAL INJECTION
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3 border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Baseline Error: Normal</span>
                    <span className="text-yellow-400 font-bold">BRIGHT REGIONS = PHOTOSHOP ARTIFACTS</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Forensic Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">ELA Discrepancy Index</div>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400">
                {ela.deviationIndex}
              </div>
              <div className="text-[10px] text-rose-600 font-semibold">Threshold &gt; 0.35 is Flagged</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">JPEG Recompression</div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                {ela.resaveCount} Cycles
              </div>
              <div className="text-[10px] text-slate-500">Multi-generation save trace</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">EXIF Software Marker</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {ela.softwareMarker}
              </div>
              <div className="text-[10px] text-rose-500 font-semibold">Desktop Photo Editor Detected</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">DigiLocker SHA-256 Checksum</div>
              <div className="text-xs font-mono font-bold text-rose-600 truncate">
                MISMATCH (0x4f82...)
              </div>
              <div className="text-[10px] text-slate-500">Registry hash differs from file</div>
            </div>

          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Guaranteed 0% Credential Fraud under CareerOptic Sovereign Audit Protocol</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAlertTpo}
              disabled={isTpoAlerted}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isTpoAlerted
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-default'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20 active:scale-95'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTpoAlerted ? 'College TPO Alerted ✓' : 'Alert College Placement Cell (TPO)'}</span>
            </button>

            <button
              onClick={handleQuarantine}
              disabled={isQuarantined}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isQuarantined
                  ? 'bg-rose-900 text-rose-200 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 active:scale-95'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{isQuarantined ? 'Profile Quarantined' : 'Quarantine Profile'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
