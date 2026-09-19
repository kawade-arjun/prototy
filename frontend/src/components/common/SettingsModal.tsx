import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  ShieldCheck, 
  Lock, 
  Bookmark, 
  CheckCircle2, 
  Building, 
  Calendar, 
  Trash2, 
  Bell, 
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  initialTab?: 'bookmarks' | 'privacy' | 'preferences';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  isLoggedIn = false,
  initialTab
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'privacy' | 'preferences'>(
    initialTab || (isLoggedIn ? 'bookmarks' : 'preferences')
  );
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [maskContactDetails, setMaskContactDetails] = useState(true);
  const [macroAnalyticsConsent, setMacroAnalyticsConsent] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Sync initial tab or reset to preferences if logged out
  React.useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    } else if (!isLoggedIn) {
      setActiveSubTab('preferences');
    }
  }, [initialTab, isLoggedIn, isOpen]);

  const [savedOpportunities, setSavedOpportunities] = useState([
    {
      id: 'JOB-MSFT-901',
      title: 'GenAI & Applied Research Engineer',
      company: 'Microsoft Research',
      deadline: 'In 6 days',
      status: 'Interview Scheduled',
      statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
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
      title: 'Quantitative Risk Analyst',
      company: 'Razorpay',
      deadline: 'In 9 days',
      status: 'Bookmarked for Review',
      statusColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
    }
  ]);

  if (!isOpen) return null;

  const handleRemoveBookmark = (id: string) => {
    setSavedOpportunities(prev => prev.filter(o => o.id !== id));
  };

  const currentTab = !isLoggedIn ? 'preferences' : activeSubTab;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c1220] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD3] dark:border-amber-500/20 flex items-center justify-between bg-amber-50/50 dark:bg-[#0a0e18]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white leading-tight">
                Settings & System Controls
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isLoggedIn ? 'Application tracker, DPDP Act 2023 privacy consents & preferences' : 'System preferences & application controls'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs - Material Design 3 Segmented Chips */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-200 dark:border-white/[0.06] m3-surface-1">
          {isLoggedIn && (
            <>
              <button
                onClick={() => setActiveSubTab('bookmarks')}
                className={`m3-chip ${currentTab === 'bookmarks' ? 'm3-chip-active' : 'm3-chip-inactive'}`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved & Tracker</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-600 text-white">
                  {savedOpportunities.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSubTab('privacy')}
                className={`m3-chip ${currentTab === 'privacy' ? 'm3-chip-active' : 'm3-chip-inactive'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DPDP Privacy</span>
              </button>
            </>
          )}

          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`m3-chip ${currentTab === 'preferences' ? 'm3-chip-active' : 'm3-chip-inactive'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>System Preferences</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {currentTab === 'bookmarks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Active Applications & Bookmarked Positions
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Auto-synced with Recruiter Funnel
                </span>
              </div>

              {savedOpportunities.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No saved opportunities yet. Browse jobs & internships to bookmark positions.
                </div>
              ) : (
                savedOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400">{opp.id}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                          <Building className="w-3 h-3 text-slate-400" /> {opp.company}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{opp.title}</h4>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Deadline: {opp.deadline}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${opp.statusColor}`}>
                        {opp.status}
                      </span>
                      <button
                        onClick={() => handleRemoveBookmark(opp.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {currentTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>India DPDP Act 2023 Statutory Protection Active</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your biometric and identity data is protected under zero-knowledge statutory privacy frameworks. No recruiters can access unmasked PII without explicit consent.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Mask Contact Details from Corporate Recruiters</div>
                    <div className="text-[11px] text-slate-500">Only share verified competency vector until candidate accepts interview</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={maskContactDetails}
                    onChange={(e) => setMaskContactDetails(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Anonymous Evaluation Profile Mode</div>
                    <div className="text-[11px] text-slate-500 font-normal">Hide name and institution during initial round 1 screening</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={anonymousMode}
                    onChange={(e) => setAnonymousMode(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">National Skill Gap Macro Telemetry Consent</div>
                    <div className="text-[11px] text-slate-500">Allow anonymized score aggregation for Ministry of Ayush & AICTE curriculum reforms</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={macroAnalyticsConsent}
                    onChange={(e) => setMacroAnalyticsConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === 'preferences' && (
            <div className="space-y-3">
              {/* Appearance & Theme Mode Switcher */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Appearance & Theme</div>
                    <div className="text-[11px] text-slate-500">Currently active: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Email Digest & Opportunity Alerts</div>
                    <div className="text-[11px] text-slate-500">Receive weekly matched internships & proctored drive invites</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> All changes auto-saved to local memory
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 active:scale-95 transition-all"
          >
            Done & Save
          </button>
        </div>
      </div>
    </div>
  );
};
