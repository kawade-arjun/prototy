import React, { useState } from 'react';
import { 
  Bookmark, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  Building 
} from 'lucide-react';

export const Tab8SettingsBookmarks: React.FC = () => {
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [maskContactDetails, setMaskContactDetails] = useState(true);
  const [macroAnalyticsConsent, setMacroAnalyticsConsent] = useState(true);

  const [savedOpportunities, setSavedOpportunities] = useState([
    {
      id: 'JOB-MSFT-901',
      title: 'GenAI & Applied Research Engineer',
      company: 'Microsoft Research',
      deadline: 'In 6 days',
      status: 'Interview Scheduled (Round 1 Bypassed)',
      statusColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
    },
    {
      id: 'INT-MSFT-101',
      title: 'AI Platform Systems Intern',
      company: 'Microsoft',
      deadline: 'In 3 days',
      status: 'Application Under Review',
      statusColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
    },
    {
      id: 'JOB-RZP-402',
      title: 'Quantitative Risk & Treasury Analyst',
      company: 'Razorpay',
      deadline: 'In 9 days',
      status: 'Bookmarked for Review',
      statusColor: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30'
    }
  ]);

  const handleRemoveBookmark = (id: string) => {
    setSavedOpportunities(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 text-xs font-bold">
            <Bookmark className="w-3.5 h-3.5" />
            <span>TAB 8 • SETTINGS HUB</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Application Tracker & DPDP Act 2023 Privacy Controls
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Manage your active recruitment pipelines and configure statutory digital personal data protection consents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Opportunity Tracker */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Opportunity Tracker & Active Pipelines
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {savedOpportunities.length} Active Records
            </span>
          </div>

          <div className="space-y-3">
            {savedOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{opp.id}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {opp.company}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{opp.title}</h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Deadline: {opp.deadline}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-lg border ${opp.statusColor}`}>
                    {opp.status}
                  </span>
                  <button
                    onClick={() => handleRemoveBookmark(opp.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 dark:bg-slate-900 dark:border dark:border-slate-800 dark:hover:text-rose-400 transition-colors"
                    title="Remove from tracker"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: DPDP Act 2023 Statutory Privacy Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">DPDP Act 2023 Controls</h3>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              In accordance with India’s <strong>Digital Personal Data Protection Act 2023</strong>, you retain complete sovereignty over your identifiers and assessment telemetry.
            </div>

            {/* Toggle 1: Anonymous Profile Visibility */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {anonymousMode ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  Anonymous Profile Mode
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Hides name and institution until invitation is accepted.</div>
              </div>
              <button
                onClick={() => setAnonymousMode(!anonymousMode)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  anonymousMode ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    anonymousMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Mask Phone & Email */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Mask Contact Coordinates
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Phone & email masked with proxy tokens until interview.</div>
              </div>
              <button
                onClick={() => setMaskContactDetails(!maskContactDetails)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  maskContactDetails ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    maskContactDetails ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Macro Analytics Consent */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  AICTE Macro Heatmap Consent
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Anonymized skill vectors contribute to national policy.</div>
              </div>
              <button
                onClick={() => setMacroAnalyticsConsent(!macroAnalyticsConsent)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  macroAnalyticsConsent ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    macroAnalyticsConsent ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => alert('DPDP statutory data preferences updated & recorded to local cryptographic ledger!')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
              >
                Save Statutory Preferences
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
