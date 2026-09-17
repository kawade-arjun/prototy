import React, { useState } from 'react';
import { 
  FileCheck, 
  X, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  Lock,
  Printer,
  FileSpreadsheet,
  Cpu,
  TrendingUp,
  Activity,
  Scale,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEPARTMENT_COHORTS } from '../../mock/collegeData';

const getDeptIcon = (deptId: string, className = "w-3.5 h-3.5") => {
  switch (deptId) {
    case 'DEPT-CSE':
      return <Cpu className={className} />;
    case 'DEPT-COMM':
      return <TrendingUp className={className} />;
    case 'DEPT-BIO':
      return <Activity className={className} />;
    case 'DEPT-LAW':
      return <Scale className={className} />;
    case 'DEPT-DES':
      return <Palette className={className} />;
    default:
      return <Building2 className={className} />;
  }
};

interface NirfNaacModalProps {
  onClose: () => void;
}

export const NirfNaacModal: React.FC<NirfNaacModalProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState<'NIRF' | 'NAAC_521'>('NIRF');
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    confetti({ particleCount: 70, spread: 80 });
    setTimeout(() => {
      setIsExporting(false);
      alert(`Official ${reportType} Institutional Accreditation Ledger downloaded. Digitally signed with SHA-256 sovereign hash seal.`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-glow w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-emerald-500/30 bg-white dark:bg-[#090e1a]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/80 dark:bg-emerald-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  STATUTORY AUDIT ENGINE • NAAC / NIRF COMPLIANT
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">85% Audit Reduction</span>
              </div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                1-Click NIRF & NAAC Accreditation Report Generator
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
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Switcher Buttons */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setReportType('NIRF')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                reportType === 'NIRF'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              NIRF Metric (GPH - Graduating Outcome)
            </button>
            <button
              onClick={() => setReportType('NAAC_521')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                reportType === 'NAAC_521'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              NAAC Criterion 5.2.1 (Student Progression to Placement)
            </button>
          </div>

          {/* Cryptographic Verifiable Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>
                <strong>Cryptographically Verifiable Audit Trails:</strong> Every placed student record links to a DigiLocker verified degree hash and digital offer letter, ensuring zero audit queries from inspection committees.
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold shrink-0 ml-2">
              0% Audit Deficit
            </span>
          </div>

          {/* Executive Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Overall Placement Rate</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">89.2%</div>
              <div className="text-[10px] text-slate-500">652 / 730 Placement-Ready</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Verified Median CTC</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-cyan-400">₹14.20 LPA</div>
              <div className="text-[10px] text-slate-500">DigiLocker verified offer letters</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Average CTC Package</div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">₹15.85 LPA</div>
              <div className="text-[10px] text-slate-500">+18% YoY growth</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.08] space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Top Corporate Package</div>
              <div className="text-2xl font-black text-amber-500">₹44.0 LPA</div>
              <div className="text-[10px] text-slate-500">Microsoft Research IDC</div>
            </div>
          </div>

          {/* Departmental Breakdown Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Department-Wise Verified Placements & Salary Metrics
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 uppercase font-mono">
                  <tr>
                    <th className="p-2.5">Academic Branch</th>
                    <th className="p-2.5">Graduating Cohort</th>
                    <th className="p-2.5">Placed Count</th>
                    <th className="p-2.5">Placement %</th>
                    <th className="p-2.5">Median CTC</th>
                    <th className="p-2.5">Statutory Seal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                  {DEPARTMENT_COHORTS.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                          {getDeptIcon(c.id, "w-3.5 h-3.5")}
                        </span>
                        <span>{c.name}</span>
                      </td>
                      <td className="p-2.5 font-mono">{c.totalStudents}</td>
                      <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{c.readyStudents}</td>
                      <td className="p-2.5 font-bold">{c.placementPercent}%</td>
                      <td className="p-2.5 font-mono font-bold">{c.medianCtc}</td>
                      <td className="p-2.5">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                          DigiLocker ✓
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recruiter Categorization Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Recruiter Categorization (NAAC / AICTE Classification)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 dark:text-cyan-400">Fortune 500 Enterprises</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">28 Companies</div>
                <div className="text-[10px] text-slate-500">Microsoft, Google, Goldman Sachs</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">Tier-1 Product & FinTech</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">42 Companies</div>
                <div className="text-[10px] text-slate-500">Razorpay, Cred, Zerodha</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-teal-600 dark:text-teal-400">Ayush & Healthcare Research</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">16 Institutions</div>
                <div className="text-[10px] text-slate-500">Patanjali Research, Biocon</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-purple-600 dark:text-purple-400">High-Growth Startups</div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">35 Companies</div>
                <div className="text-[10px] text-slate-500">GenAI & DeepTech Ventures</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer with 1-Click Export */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Digital PKI Signature: SHA-256 [0x789b...3fa]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Compiling Certified Ledger...' : `Export Certified ${reportType} PDF & CSV`}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
