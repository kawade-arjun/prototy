import React from 'react';
import { UserRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { 
  ShieldCheck, 
  Flame, 
  Award, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Landmark, 
  Sparkles,
  Sun,
  Moon,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange, onOpenAuthModal }) => {
  const { theme, toggleTheme } = useTheme();
  const { activeStudent } = useStudent();

  const roleConfig: Record<UserRole, { label: string; shortLabel: string; icon: React.ReactNode; color: string; activeColor: string; desc: string }> = {
    student: {
      label: 'Student & Job Seeker',
      shortLabel: 'Student',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'text-indigo-600 dark:text-indigo-400',
      activeColor: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-600/30 dark:text-indigo-200 dark:border-indigo-500/40',
      desc: 'Skill mapping, ATS diagnostics, proctored sandboxes'
    },
    college: {
      label: 'College & Placement Cell',
      shortLabel: 'College',
      icon: <Building2 className="w-4 h-4" />,
      color: 'text-emerald-600 dark:text-emerald-400',
      activeColor: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-emerald-600/30 dark:text-emerald-200 dark:border-emerald-500/40',
      desc: 'Cohort analytics, NIRF/NAAC reports'
    },
    recruiter: {
      label: 'Corporate Recruiter',
      shortLabel: 'Recruiter',
      icon: <Briefcase className="w-4 h-4" />,
      color: 'text-amber-600 dark:text-amber-400',
      activeColor: 'bg-amber-600 text-white shadow-md shadow-amber-600/20 dark:bg-amber-600/30 dark:text-amber-200 dark:border-amber-500/40',
      desc: '0% fraud talent pool, Gale-Shapley matching'
    },
    government: {
      label: 'Government & AICTE',
      shortLabel: 'Regulator',
      icon: <Landmark className="w-4 h-4" />,
      color: 'text-rose-600 dark:text-rose-400',
      activeColor: 'bg-rose-600 text-white shadow-md shadow-rose-600/20 dark:bg-rose-600/30 dark:text-rose-200 dark:border-rose-500/40',
      desc: 'Regional skill heatmaps, curriculum deficits'
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#060911]/80 backdrop-blur-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
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
        </div>

        {/* Global Persona Selector Segmented Pill Bar */}
        <div className="flex items-center bg-slate-100/90 dark:bg-[#0d1322]/90 border border-slate-200 dark:border-white/[0.08] rounded-2xl p-1 shadow-inner backdrop-blur-md">
          {(Object.keys(roleConfig) as UserRole[]).map((role) => {
            const config = roleConfig[role];
            const isActive = currentRole === role;
            return (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                  isActive 
                    ? `${config.activeColor} font-bold` 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-white/[0.04]'
                }`}
                title={config.desc}
              >
                <span className={isActive ? 'text-white' : config.color}>{config.icon}</span>
                <span className="hidden lg:inline">{config.label}</span>
                <span className="lg:hidden">{config.shortLabel}</span>
              </button>
            );
          })}
        </div>

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

          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/25 dark:text-amber-300 text-xs font-bold shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
            <span>8-Day Streak</span>
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
            title="Open Login / Sign-up or Switch Disciplinary Profile"
          >
            <LogIn className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Login / Switch</span>
          </button>

          {/* User Avatar with Profile Modal Trigger */}
          <button 
            onClick={onOpenAuthModal}
            className="relative group cursor-pointer focus:outline-none"
            title="Current Session Profile"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#0a0f1d] rounded-[10px] flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-white">
                {currentRole === 'student' ? activeStudent.avatarInitials : currentRole === 'college' ? 'TPO' : currentRole === 'recruiter' ? 'HR' : 'GOV'}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#060911]" />
          </button>
        </div>

      </div>
    </header>
  );
};
