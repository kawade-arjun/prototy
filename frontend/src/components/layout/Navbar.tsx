import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { 
  Flame, 
  Award, 
  Compass,
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
  LogOut,
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
  const { activeStudent, currentUser, logout } = useStudent();
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const settingsRef = useRef<HTMLDivElement>(null);

  // 60fps/120fps GPU-accelerated scroll listener directly tied to scroll position
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Seamless Handover Opacity: Starts fading in only after scrollY > 50px (when hero title has faded out)
  const navOpacity = Math.min(1, Math.max(0, (scrollY - 50) / 40));

  return (
    <header className="sticky top-0 z-50 w-full py-2.5 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
        
        {/* Compact Sticky Brand Title - Handover animation (Zero overlap with Hero Title) */}
        <div 
          className="transition-all duration-200 transform-gpu flex items-center justify-center text-center px-5 py-1.5 rounded-full bg-white/90 dark:bg-[#080B10]/90 backdrop-blur-md border border-amber-500/30 shadow-lg shadow-amber-500/10"
          style={{
            opacity: navOpacity,
            transform: `scale(${0.9 + navOpacity * 0.1}) translateY(${(1 - navOpacity) * -6}px)`,
            pointerEvents: navOpacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <button 
            onClick={handleHomeClick}
            className="flex items-center justify-center group cursor-pointer focus:outline-none"
            title="Return to CareerOptic Home Screen"
          >
            <span className="font-serif-luxury font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-slate-900 dark:text-white flex items-center whitespace-nowrap">
              Career<span className="gradient-text-gold font-sans font-black ml-0.5">Optic</span>
            </span>
          </button>
        </div>

        {/* Right Controls: Current Session Profile, Settings */}
        <div className="pointer-events-auto absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2.5">

          {/* 1. User Avatar Profile Button */}
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

          {/* 2. Top-Right Settings Gear Button */}
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

                  {/* Sign Out Option */}
                  {currentRole !== null && (
                    <button
                      onClick={() => {
                        logout();
                        onRoleChange(null);
                        setIsSettingsMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl flex items-center justify-between text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <LogOut className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">Sign Out</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {currentUser?.email || 'End active session'}
                          </div>
                        </div>
                      </div>
                      <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
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

