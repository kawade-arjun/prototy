import React from 'react';
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
  User
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | null;
  onRoleChange: (role: UserRole | null) => void;
  onOpenAuthModal?: () => void;
  onOpenSettings?: () => void;
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

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onRoleChange(null);
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
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-600 text-white p-0.5 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                Career<span className="gradient-text-indigo">Lens</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              National Verified Competency & Regulatory Infrastructure
            </p>
          </div>
        </button>

        {/* Right Controls: Level XP, Streak, Theme Switcher, Settings, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Level 6 XP Badge & Streak Badge - Only inside active user portal */}
          {currentRole !== null && (
            <>
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="whitespace-nowrap">Lvl 6 • 2,450 XP</span>
              </div>

              <div 
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-black"
                title="8-Day Active Streak"
              >
                <span>8</span>
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            </>
          )}

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-all active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Top-Right Settings Button */}
          <button
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-all active:scale-95"
            title="Open Settings & Privacy Controls"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Avatar Profile Button */}
          <button 
            onClick={onOpenAuthModal}
            className="relative group cursor-pointer focus:outline-none"
            title="Current Session Profile"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#151B28] rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-white">
                {currentRole === 'student' ? activeStudent.avatarInitials : currentRole === 'college' ? 'TPO' : currentRole === 'recruiter' ? 'HR' : currentRole === 'government' ? 'GOV' : <User className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#0B0E14]" />
          </button>
        </div>

      </div>
    </header>
  );
};
