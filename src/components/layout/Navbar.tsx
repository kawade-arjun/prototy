import React from 'react';
import { UserRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { 
  ShieldCheck, 
  Flame, 
  Award, 
  Sparkles,
  Sun,
  Moon,
  LogIn,
  Home,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | null;
  onRoleChange: (role: UserRole | null) => void;
  onOpenAuthModal?: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentRole, 
  onRoleChange, 
  onOpenAuthModal,
  onGoHome 
}) => {
  const { theme, toggleTheme } = useTheme();
  const { activeStudent } = useStudent();

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onRoleChange(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#060911]/80 backdrop-blur-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        
        {/* Brand Logo - Click returns to Home Screen */}
        <button 
          onClick={handleHomeClick}
          className="flex items-center gap-3.5 group cursor-pointer text-left focus:outline-none"
          title="Return to CareerLens Home Screen"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-30 dark:opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />
            <div className="relative w-10 h-10 rounded-xl bg-indigo-50 dark:bg-gradient-to-b dark:from-[#161f36] dark:to-[#0d1322] border border-indigo-200 dark:border-indigo-500/30 p-0.5 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                Career<span className="gradient-text-indigo">Lens</span>
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/25">
                Enterprise v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              National Verified Competency & Regulatory Infrastructure
            </p>
          </div>
        </button>

        {/* Center Portal Context Ribbon (When inside a portal, allows returning to Home Screen) */}
        {currentRole ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0e1628] dark:hover:bg-[#152038] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-bold transition-all shadow-sm active:scale-95 group"
              title="Return to Home Screen to select another persona"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
              <Home className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Switch Role</span>
            </button>

            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-sm ${
              currentRole === 'student'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-300'
                : currentRole === 'college'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300'
                : currentRole === 'recruiter'
                ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-300'
                : 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-300'
            }`}>
              <span>
                {currentRole === 'student' && `Student Workspace: ${activeStudent.streamName}`}
                {currentRole === 'college' && 'Institutional TPO Command Center'}
                {currentRole === 'recruiter' && 'Corporate Talent Console'}
                {currentRole === 'government' && 'National Policy Observatory'}
              </span>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#0c1222]/80 border border-slate-200 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Select a user type below to enter workspace</span>
          </div>
        )}

        {/* Right Status Badges, Theme Switcher & Profile HUD */}
        <div className="flex items-center gap-2.5">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#0e1628] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Streak Badge: 8 with Flame icon */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-300 text-xs font-black shadow-sm"
            title="8-Day Active Streak"
          >
            <span>8</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
          </div>

          {/* Level / XP */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/25 dark:text-indigo-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Lvl 6 • 2,450 XP</span>
          </div>

          {/* DigiLocker Sovereign Status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">DigiLocker Verified</span>
          </div>

          {/* Login / Switch Profile Gateway Button */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-600/20 dark:hover:bg-indigo-600/30 dark:border-indigo-500/30 dark:text-indigo-200 text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Open Login / Sign-up Gateway"
          >
            <LogIn className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Login</span>
          </button>

          {/* User Avatar with Profile Modal Trigger */}
          <button 
            onClick={onOpenAuthModal}
            className="relative group cursor-pointer focus:outline-none"
            title="Current Session Profile"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#0a0f1d] rounded-[10px] flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-white">
                {currentRole === 'student' ? activeStudent.avatarInitials : currentRole === 'college' ? 'TPO' : currentRole === 'recruiter' ? 'HR' : currentRole === 'government' ? 'GOV' : 'CL'}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#060911]" />
          </button>
        </div>

      </div>
    </header>
  );
};
