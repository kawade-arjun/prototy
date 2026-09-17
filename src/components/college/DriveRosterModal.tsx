import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  X, 
  Download, 
  ShieldCheck, 
  Check, 
  Lock, 
  Sliders, 
  AlertCircle,
  Building2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VISITING_CAMPUS_DRIVES, VisitingDrive } from '../../mock/collegeData';

interface DriveRosterModalProps {
  onClose: () => void;
}

export const DriveRosterModal: React.FC<DriveRosterModalProps> = ({ onClose }) => {
  const [selectedDriveId, setSelectedDriveId] = useState<string>('DRIVE-MSFT-2026');
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [minSandboxScore, setMinSandboxScore] = useState<number>(80);
  const [maxBacklogs, setMaxBacklogs] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

  const selectedDrive = VISITING_CAMPUS_DRIVES.find(d => d.id === selectedDriveId) || VISITING_CAMPUS_DRIVES[0];

  const handleExport = () => {
    setIsExporting(true);
    confetti({ particleCount: 70, spread: 80 });
    setTimeout(() => {
      setIsExporting(false);
      alert(`✅ 100% Verified Drive Roster for ${selectedDrive.companyName} exported! Stamped with DigiLocker PKI hash seals. Zero Ghost Resumes guaranteed.`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-indigo-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30">
                  ZERO GHOST RESUME GUARANTEE • DIGILOCKER PKI SEALED
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Export 100% Verified Drive Roster
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
        <div className="p-6 space-y-5 overflow-y-auto max-h-[78vh]">
          
          {/* Zero Ghost Guarantee Alert */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              <strong>Zero Ghost Resume Guarantee:</strong> Pre-audits students to ensure no exaggerated GPA, fake certificates, or inflated claims reach recruiters. Protects institutional NIRF reputation and eliminates risk of corporate blacklisting.
            </div>
          </div>

          {/* Target Visiting Drive Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Select Visiting Campus Employer
            </label>
            <select
              value={selectedDriveId}
              onChange={(e) => setSelectedDriveId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            >
              {VISITING_CAMPUS_DRIVES.map(d => (
                <option key={d.id} value={d.id}>
                  {d.companyName} — {d.roleTitle} ({d.packageOffered})
                </option>
              ))}
            </select>
          </div>

          {/* Employer Criteria Configurator */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Employer Shortlist Criteria Filter</span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-cyan-400 font-bold">
                {selectedDrive.eligibleCount} Eligible Verified Students
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Minimum CGPA (DigiLocker)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="6.0"
                    max="9.5"
                    step="0.1"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="font-mono font-bold text-xs">{minCgpa}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Min Proctored Sandbox Score</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="60"
                    max="95"
                    step="1"
                    value={minSandboxScore}
                    onChange={(e) => setMinSandboxScore(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="font-mono font-bold text-xs">{minSandboxScore}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Maximum Active Backlogs</label>
                <select
                  value={maxBacklogs}
                  onChange={(e) => setMaxBacklogs(Number(e.target.value))}
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  <option value={0}>0 Active Backlogs (Strict)</option>
                  <option value={1}>Max 1 Backlog</option>
                  <option value={2}>Max 2 Backlogs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample Verified Candidates Roster Preview */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Verified Candidate Roster Preview (First 3 of {selectedDrive.eligibleCount})
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5">Roll No</th>
                    <th className="p-2.5">Student Name</th>
                    <th className="p-2.5">Verified CGPA</th>
                    <th className="p-2.5">Sandbox Score</th>
                    <th className="p-2.5">Backlogs</th>
                    <th className="p-2.5">DigiLocker Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                  <tr>
                    <td className="p-2.5 text-slate-400">1VT22CS042</td>
                    <td className="p-2.5 font-bold font-sans text-slate-900 dark:text-white">Arjun Kawade</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">8.92</td>
                    <td className="p-2.5 text-indigo-600 dark:text-cyan-400 font-bold">98%</td>
                    <td className="p-2.5">0</td>
                    <td className="p-2.5 text-slate-400 truncate max-w-[120px]">0x9a12c8...</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">1VT22CF018</td>
                    <td className="p-2.5 font-bold font-sans text-slate-900 dark:text-white">Priya Sharma</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">9.15</td>
                    <td className="p-2.5 text-indigo-600 dark:text-cyan-400 font-bold">94%</td>
                    <td className="p-2.5">0</td>
                    <td className="p-2.5 text-slate-400 truncate max-w-[120px]">0x7e33d2...</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">1VT22CS091</td>
                    <td className="p-2.5 font-bold font-sans text-slate-900 dark:text-white">Devansh Gupta</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">8.45</td>
                    <td className="p-2.5 text-indigo-600 dark:text-cyan-400 font-bold">86%</td>
                    <td className="p-2.5">0</td>
                    <td className="p-2.5 text-slate-400 truncate max-w-[120px]">0x4b719a...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Format: CSV + Cryptographic PKI Manifest (.json)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating Signed Roster...' : 'Export 100% Verified Drive Roster'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
