import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useStudent } from '../../context/StudentContext';
import { DeviceRatio } from '../common/DeviceFrame';
import { 
  Flame, 
  Award, 
  Sparkles,
  Sun,
  Moon,
  Settings,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Maximize2,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | null;
  onRoleChange: (role: UserRole | null) => void;
  onOpenAuthModal?: () => void;
  onOpenSettings?: () => void;
  onGoHome?: () => void;
  deviceRatio?: DeviceRatio;
  onDeviceChange?: (ratio: DeviceRatio) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentRole, 
  onRoleChange, 
  onOpenAuthModal,
  onOpenSettings,
  onGoHome,
  deviceRatio = 'responsive',
  onDeviceChange
}) => {
  const { theme, toggleTheme } = useTheme();
  const { activeStudent } = useStudent();
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onRoleChange(null);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDeviceMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRatioLabel = (r: DeviceRatio) => {
    switch(r) {
      case 'mobile': return 'Mobile (375p)';
      case 'mobile_plus': return 'Mobile+ (414p)';
      case 'tablet': return 'Tablet (768p)';
      case 'laptop': return 'Laptop (1024p)';
      case 'desktop': return 'Desktop (1280p)';
      default: return 'Fluid Full';
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
              <span className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-500/30">
                Material 3
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
              National Verified Competency & Regulatory Infrastructure
            </p>
          </div>
        </button>

        {/* Right Controls: Device Ratio Selector, XP, Streak, Theme, Settings, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Device Aspect Ratio Selector Dropdown */}
          {onDeviceChange && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
                className="m3-chip m3-chip-inactive"
                title="Change Screen Aspect Ratio / Mobile View"
              >
                {deviceRatio === 'mobile' || deviceRatio === 'mobile_plus' ? (
                  <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                ) : deviceRatio === 'tablet' ? (
                  <Tablet className="w-3.5 h-3.5 text-cyan-500" />
                ) : deviceRatio === 'laptop' ? (
                  <Laptop className="w-3.5 h-3.5 text-purple-500" />
                ) : deviceRatio === 'desktop' ? (
                  <Monitor className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                )}
                <span className="hidden sm:inline text-xs font-bold">{getRatioLabel(deviceRatio)}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isDeviceMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Ratio Selection Menu */}
              {isDeviceMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-3xl m3-surface-3 border border-slate-200/80 dark:border-white/[0.1] shadow-2xl py-2 z-50 text-xs font-medium space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Select Viewport Ratio
                  </div>
                  
                  <button
                    onClick={() => { onDeviceChange('responsive'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'responsive' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Maximize2 className="w-3.5 h-3.5" /> Fluid Responsive</span>
                    <span className="text-[10px] text-slate-400">Auto</span>
                  </button>

                  <button
                    onClick={() => { onDeviceChange('mobile'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'mobile' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5 text-amber-500" /> Mobile (iPhone)</span>
                    <span className="text-[10px] text-slate-400">375px</span>
                  </button>

                  <button
                    onClick={() => { onDeviceChange('mobile_plus'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'mobile_plus' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5 text-emerald-500" /> Mobile Max</span>
                    <span className="text-[10px] text-slate-400">414px</span>
                  </button>

                  <button
                    onClick={() => { onDeviceChange('tablet'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'tablet' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Tablet className="w-3.5 h-3.5 text-cyan-500" /> Tablet (iPad)</span>
                    <span className="text-[10px] text-slate-400">768px</span>
                  </button>

                  <button
                    onClick={() => { onDeviceChange('laptop'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'laptop' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Laptop className="w-3.5 h-3.5 text-purple-500" /> Laptop</span>
                    <span className="text-[10px] text-slate-400">1024px</span>
                  </button>

                  <button
                    onClick={() => { onDeviceChange('desktop'); setIsDeviceMenuOpen(false); }}
                    className={`w-full px-4 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${deviceRatio === 'desktop' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><Monitor className="w-3.5 h-3.5 text-rose-500" /> Desktop Widescreen</span>
                    <span className="text-[10px] text-slate-400">1280px</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Level 6 XP Badge */}
          <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="whitespace-nowrap">Lvl 6 • 2,450 XP</span>
          </div>

          {/* Streak Badge: 8 with Flame icon */}
          <div 
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-black"
            title="8-Day Active Streak"
          >
            <span>8</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>

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
                {currentRole === 'student' ? activeStudent.avatarInitials : currentRole === 'college' ? 'TPO' : currentRole === 'recruiter' ? 'HR' : currentRole === 'government' ? 'GOV' : 'CL'}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#0B0E14]" />
          </button>
        </div>

      </div>
    </header>
  );
};
