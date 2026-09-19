import React, { useState } from 'react';
import { 
  Landmark, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ShieldCheck, 
  Lock,
  DollarSign,
  Building2,
  Send
} from 'lucide-react';
import { STATE_TELEMETRY_DATA, StateTelemetry } from '../../mock/governmentData';

interface SovereignGrantModalProps {
  initialStateCode?: string;
  onClose: () => void;
  onGrantAllocated?: (stateName: string, amount: string) => void;
}

export const SovereignGrantModal: React.FC<SovereignGrantModalProps> = ({
  initialStateCode = 'KA',
  onClose,
  onGrantAllocated
}) => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>(initialStateCode);
  const [grantAmountCr, setGrantAmountCr] = useState<number>(18.0);
  const [grantHead, setGrantHead] = useState('Pharmacovigilance & Clinical Data Lab Infrastructure');
  const [targetCollegesCount, setTargetCollegesCount] = useState<number>(24);
  const [isAllocating, setIsAllocating] = useState(false);

  const selectedState = STATE_TELEMETRY_DATA.find(s => s.stateCode === selectedStateCode) || STATE_TELEMETRY_DATA[0];

  const handleConfirmGrant = () => {
    setIsAllocating(true);
    setTimeout(() => {
      setIsAllocating(false);
      alert(`Sovereign Skilling Grant of ₹${grantAmountCr} Cr successfully sanctioned for ${selectedState.stateName}! Official Ministry Sanction Order No. AYUSH-AICTE-FY26-089 generated.`);
      if (onGrantAllocated) {
        onGrantAllocated(selectedState.stateName, `₹${grantAmountCr} Cr`);
      }
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-rose-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-600/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400">
                CENTRAL MINISTRY BUDGET ALLOCATION OBSERVER
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Targeted Sovereign Skilling Grant Sanction
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* Target State Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Select Deficit State / Jurisdiction
            </label>
            <select
              value={selectedStateCode}
              onChange={(e) => {
                setSelectedStateCode(e.target.value);
                const s = STATE_TELEMETRY_DATA.find(st => st.stateCode === e.target.value);
                if (s) {
                  setGrantHead(s.identifiedDeficit);
                }
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            >
              {STATE_TELEMETRY_DATA.map(st => (
                <option key={st.stateCode} value={st.stateCode}>
                  {st.stateName} — {st.deficitSeverity} ({st.gapPercent}%)
                </option>
              ))}
            </select>
          </div>

          {/* Telemetry Summary Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400 uppercase">Identified State Deficit</span>
              <span className="text-rose-600 font-mono font-black">{selectedState.gapPercent}% Shortage</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {selectedState.identifiedDeficit}
            </div>
            <div className="text-[11px] text-slate-500">
              Active Institutions: <strong>{selectedState.institutionCount}</strong> • Verified Scholars: <strong>{selectedState.verifiedScholarsCount.toLocaleString()}</strong>
            </div>
          </div>

          {/* Grant Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sanction Amount (₹ Crores)</label>
              <input
                type="number"
                step="0.5"
                value={grantAmountCr}
                onChange={(e) => setGrantAmountCr(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recipient Higher Ed Colleges</label>
              <input
                type="number"
                value={targetCollegesCount}
                onChange={(e) => setTargetCollegesCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sovereign Budget Head / Purpose</label>
            <input
              type="text"
              value={grantHead}
              onChange={(e) => setGrantHead(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Ministry Public Financial Management System (PFMS) Sync</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmGrant}
              disabled={isAllocating}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAllocating ? 'Sanctioning...' : `Sanction ₹${grantAmountCr} Cr Grant`}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
