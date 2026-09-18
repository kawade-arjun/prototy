import React, { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  AlertTriangle, 
  FileText, 
  Binary, 
  CheckCircle2, 
  Ban, 
  Eye, 
  RefreshCw,
  Search,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STUDENT_DOC_INSPECTIONS, StudentUploadInspection } from '../../mock/collegeData';

interface CollegeElaInspectorModalProps {
  onClose: () => void;
}

export const CollegeElaInspectorModal: React.FC<CollegeElaInspectorModalProps> = ({ onClose }) => {
  const [inspections, setInspections] = useState<StudentUploadInspection[]>(STUDENT_DOC_INSPECTIONS);
  const [selectedInspectionId, setSelectedInspectionId] = useState<string>('DOC-901');
  const [viewMode, setViewMode] = useState<'split' | 'original' | 'ela'>('split');
  const [isScanning, setIsScanning] = useState(false);

  const activeDoc = inspections.find(d => d.id === selectedInspectionId) || inspections[0];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      confetti({ particleCount: 50 });
      alert('OpenCV Error Level Analysis Complete: Scan confirmed ELA Anomaly Index: 0.884 in candidate document.');
    }, 900);
  };

  const handleApproveDoc = (id: string) => {
    setInspections(prev => prev.map(d => d.id === id ? { ...d, auditStatus: 'passed', elaIndex: 0.05, details: 'Manually verified by Placement Officer after registrar cross-check.' } : d));
    confetti({ particleCount: 40 });
  };

  const handleFlagDoc = (id: string) => {
    setInspections(prev => prev.map(d => d.id === id ? { ...d, auditStatus: 'tampered', details: 'Quarantined by TPO: Falsified academic credential. Blocked from campus drive rosters.' } : d));
    alert('Candidate profile quarantined. Notification dispatched to student to re-upload authentic DigiLocker credentials.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-rose-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-200 dark:border-rose-900/40 bg-rose-50/80 dark:bg-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-600/20">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                  INTERNAL PLACEMENT CELL ELA AUDIT SUITE
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Zero Ghost Resumes Guarantee
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                In-House OpenCV ELA Forensic Inspector
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Running ELA...' : 'Re-Run ELA Scan'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Document Selector Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Select Upload:</span>
            {inspections.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedInspectionId(doc.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedInspectionId === doc.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{doc.studentName}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                  doc.auditStatus === 'tampered' ? 'bg-rose-500 text-white font-bold' : 'bg-emerald-500 text-white font-bold'
                }`}>
                  {doc.auditStatus === 'tampered' ? 'ELA High' : 'Verified'}
                </span>
              </button>
            ))}
          </div>

          {/* Audit Details Banner */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
            activeDoc.auditStatus === 'tampered'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
          }`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-extrabold text-sm">
                {activeDoc.auditStatus === 'tampered' ? 'Critical Pixel Discrepancy Detected' : 'Clean Compression Signature Verified'}
                <span className="font-mono text-xs ml-2">(ELA Index: {activeDoc.elaIndex})</span>
              </div>
              <p className="leading-relaxed">{activeDoc.details}</p>
            </div>
          </div>

          {/* Side-by-Side Visual Inspection Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Left: Original Marksheet */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Original Attached Document: {activeDoc.docTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Roll: {activeDoc.rollNumber}</span>
              </div>

              <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 min-h-[260px] flex flex-col justify-between text-xs font-serif text-slate-900 dark:text-slate-100">
                <div className="text-center border-b pb-2 border-slate-100 dark:border-slate-800">
                  <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">Official Transcript Assessment</div>
                  <div className="font-bold text-sm">{activeDoc.studentName} — {activeDoc.department}</div>
                </div>

                <div className="py-3 space-y-2 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verification Ledger Hash:</span>
                    <span className="font-mono text-[10px]">{activeDoc.sha256}</span>
                  </div>
                  {activeDoc.auditStatus === 'tampered' ? (
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/40 relative">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">Transcript CGPA:</span>
                        <span className="font-mono text-rose-600 dark:text-rose-400 text-sm">9.85 (Altered from 7.20)</span>
                      </div>
                      <div className="absolute -inset-1 border-2 border-dashed border-rose-500 rounded-lg pointer-events-none animate-pulse" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex justify-between font-bold">
                      <span className="text-slate-500">Verified Grade Metric:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">8.92 (Pristine)</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-2 border-slate-100 dark:border-slate-800 text-[10px] font-mono flex justify-between text-slate-400">
                  <span>Uploaded on: {activeDoc.uploadDate}</span>
                  <span>Status: {activeDoc.auditStatus.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Right: ELA Pixel Discrepancy Heatmap */}
            <div className="rounded-2xl border border-rose-300 dark:border-rose-900/40 bg-slate-950 p-4 space-y-3 text-cyan-400">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Binary className="w-4 h-4" />
                  <span>OpenCV cv2.absdiff() ELA Heatmap</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300">
                  Anomaly Index: {activeDoc.elaIndex}
                </span>
              </div>

              <div className="relative rounded-xl border border-slate-800 bg-[#060810] p-5 min-h-[260px] flex flex-col justify-between font-mono text-xs overflow-hidden">
                <div className="text-center border-b pb-2 border-slate-800 text-[10px] text-slate-500">
                  RESAVE FREQUENCY ERROR LEVEL ANALYSIS
                </div>

                {activeDoc.auditStatus === 'tampered' ? (
                  <div className="my-auto p-3 rounded-lg border-2 border-yellow-400 bg-yellow-400/20 shadow-lg space-y-1 animate-pulse">
                    <div className="flex justify-between text-yellow-300 font-bold text-xs uppercase">
                      <span>BRIGHT HIGH-ERROR REGION DETECTED</span>
                      <span>DELTA +280%</span>
                    </div>
                    <div className="text-[10px] text-yellow-100">
                      Modified CGPA pixels exhibit distinct compression variance from background parchment.
                    </div>
                  </div>
                ) : (
                  <div className="my-auto p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 space-y-1 text-center">
                    <div className="font-bold text-xs">UNIFORM BASELINE COMPRESSION</div>
                    <div className="text-[10px] opacity-80">Zero localized error bursts. Document is genuine.</div>
                  </div>
                )}

                <div className="border-t pt-2 border-slate-800 text-[10px] flex justify-between text-slate-500">
                  <span>Baseline: 12-16 dB</span>
                  <span className="text-yellow-400 font-bold">Bright Spots = Pixel Modifications</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Internal TPO verification tool to prevent corporate blacklisting.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFlagDoc(activeDoc.id)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
            >
              Flag & Quarantine Student Record
            </button>
            <button
              onClick={() => handleApproveDoc(activeDoc.id)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
            >
              Approve for Campus Drives
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
