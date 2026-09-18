import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { 
  Flame, 
  Award, 
  Sparkles,
  Sun,
  Moon,
  Settings,
  User,
  Bookmark,
  ShieldCheck,
  Bell,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  X
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | null;
  onRoleChange: (role: UserRole | null) => void;
  onOpenAuthModal?: () => void;
  onOpenSettings?: (tab?: 'bookmarks' | 'privacy' | 'preferences') => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentRole, 
  onRoleChange, 
  onOpenAuthModal,
  onOpenSettings,
  onGoHome
}) => {
  const { theme, toggleTheme } = useTheme();
  const { activeStudent } = useStudent();
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onRoleChange(null);
    }
  };

  const handleSelectSettingsOption = (tab?: 'bookmarks' | 'privacy' | 'preferences') => {
    setIsSettingsMenuOpen(false);
    if (onOpenSettings) {
      onOpenSettings(tab);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full m3-surface-1 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 py-2.5">
        
        {/* Brand Logo - Click returns to Home Screen */}
        <button 
          onClick={handleHomeClick}
          className="flex items-center gap-2 sm:gap-3.5 group cursor-pointer text-left focus:outline-none shrink-0"
          title="Return to CareerLens Home Screen"
        >
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white p-0.5 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif-luxury font-extrabold text-lg sm:text-2xl tracking-tight text-slate-900 dark:text-white flex items-center">
                Career<span className="gradient-text-gold font-sans font-black ml-0.5">Lens</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Prestige Substrate
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              National Verified Competency & Regulatory Infrastructure
            </p>
          </div>
        </button>

        {/* Right Controls: Level XP, Streak, Current Session Profile, Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Level 6 XP Badge & Streak Badge - Only inside active user portal */}
          {currentRole !== null && (
            <>
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300/60 dark:bg-amber-500/20 dark:text-amber-200 dark:border-amber-500/30 text-xs font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">Lvl 6 • 2,450 XP</span>
              </div>

              <div 
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs font-black shadow-xs"
                title="8-Day Active Streak"
              >
                <span>8</span>
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            </>
          )}

          {/* 1. User Avatar Profile Button (Position Exchanged - Now First) */}
          <button 
            onClick={onOpenAuthModal}
            className="relative group cursor-pointer focus:outline-none"
            title="Current Session Profile"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#0E131F] rounded-full flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                {currentRole === 'student' ? activeStudent.avatarInitials : currentRole === 'college' ? 'TPO' : currentRole === 'recruiter' ? 'HR' : currentRole === 'government' ? 'GOV' : <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#0B0E14]" />
          </button>

          {/* 2. Top-Right Settings Gear Button with Mobile Phone Style Options Dropdown (Now Second) */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                isSettingsMenuOpen
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-400 dark:ring-amber-500'
                  : 'bg-[#EAE4D8] dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-700'
              }`}
              title="Settings & System Preferences"
            >
              <Settings className={`w-4 h-4 transition-transform duration-300 ${isSettingsMenuOpen ? 'rotate-90' : ''}`} />
            </button>

            {/* Native Phone Style Settings Dropdown List */}
            {isSettingsMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-72 sm:w-80 glass-panel rounded-2xl shadow-2xl border border-slate-200 dark:border-white/[0.12] bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-xl p-3 z-50 animate-fadeIn space-y-2">
                
                {/* Header */}
                <div className="px-2.5 py-2 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Settings className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">Settings</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {currentRole !== null ? 'Session Active • Preferences' : 'Guest Mode • System Settings'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSettingsMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Settings Options List - Phone Menu Style */}
                <div className="space-y-1">
                  
                  {/* Option: Saved & Trackers (Only displayed when logged in) */}
                  {currentRole !== null && (
                    <button
                      onClick={() => handleSelectSettingsOption('bookmarks')}
                      className="w-full p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                          <Bookmark className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Saved Jobs & Trackers
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            3 Active Applications Bookmarked
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Option: DPDP Privacy Settings (Only displayed when logged in) */}
                  {currentRole !== null && (
                    <button
                      onClick={() => handleSelectSettingsOption('privacy')}
                      className="w-full p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            DPDP Act 2023 Privacy
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Statutory Zero-Knowledge Masking
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Option: Appearance & Theme Switcher */}
                  <div className="w-full p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                        {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Appearance & Theme
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {theme === 'dark' ? 'Dark Mode Enabled' : 'Light Mode Enabled'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[10px] shadow-sm hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
                    >
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  </div>

                  {/* Option: Notification Alerts Toggle */}
                  <div className="w-full p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Digest & Alerts
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {emailAlerts ? 'Weekly Digests Active' : 'Alerts Muted'}
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Footer: Open Full Settings Modal Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                  <button
                    onClick={() => handleSelectSettingsOption()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Open Full Settings Controls</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

