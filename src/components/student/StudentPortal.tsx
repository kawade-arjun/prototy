import React, { useState } from 'react';
import { StudentTab } from '../../types';
import { Tab1Recommendations } from './tabs/Tab1Recommendations';
import { Tab2ProctoredSandbox } from './tabs/Tab2ProctoredSandbox';
import { Tab3FreelanceMarketplace } from './tabs/Tab3FreelanceMarketplace';
import { Tab4and5Opportunities } from './tabs/Tab4and5Opportunities';
import { Tab6Organisations } from './tabs/Tab6Organisations';
import { Tab7LivingResume } from './tabs/Tab7LivingResume';
import { 
  Sparkles, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Search, 
  Building2, 
  UserCheck, 
  ShieldCheck,
  Lock,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { useStudent } from '../../context/StudentContext';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('recommendations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeStudent } = useStudent();

  const tabs: { id: StudentTab; label: string; num: string; icon: React.ReactNode; category: string }[] = [
    { id: 'recommendations', label: 'Recommendations Studio', num: '1', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'Diagnostics' },
    { id: 'sandbox', label: 'Tests & Skill Verification', num: '2', icon: <Terminal className="w-3.5 h-3.5" />, category: 'Evaluation' },
    { id: 'freelance', label: 'Freelance Marketplace', num: '3', icon: <Briefcase className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'internships', label: 'Internships Hub', num: '4', icon: <GraduationCap className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'jobs', label: 'Jobs Hub', num: '5', icon: <Search className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'organisations', label: 'Organisations Directory', num: '6', icon: <Building2 className="w-3.5 h-3.5" />, category: 'Discovery' },
    { id: 'profile', label: 'Comprehensive Profile', num: '7', icon: <UserCheck className="w-3.5 h-3.5" />, category: 'Sovereign ID' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      
      {/* Student Quick-HUD Status Ribbon */}
      <div className="glass-panel rounded-3xl p-5 space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-white dark:bg-[#0d1322] rounded-[14px] flex items-center justify-center font-bold text-indigo-600 dark:text-white text-xs">
                  {activeStudent.avatarInitials}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900 dark:text-white">{activeStudent.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20">
                    {activeStudent.streamName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{activeStudent.degree}</span>
                  <span>•</span>
                  <span>{activeStudent.digiLockerId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time telemetry badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.06] text-xs">
              <span className="text-slate-500 dark:text-slate-400">ATS Score:</span>
              <span className="font-black text-indigo-600 dark:text-cyan-400">{activeStudent.atsScore}/100</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>DigiLocker Verified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>DPDP Masked</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Tab Command Navigation Dock */}
      <div className="relative z-30">
        
        {/* Mobile View: 3 Horizontal Lines (Hamburger Menu) Toggle (md:hidden) */}
        <div className="md:hidden space-y-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full m3-surface-2 rounded-2xl p-3.5 border border-slate-200/80 dark:border-white/[0.08] shadow-md flex items-center justify-between gap-3 text-slate-900 dark:text-white font-bold text-xs"
          >
            <div className="flex items-center gap-3 truncate">
              {/* 3 Horizontal Lines Hamburger Icon */}
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Menu className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left truncate">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                  Tab {currentTabObj.num} of 7
                </span>
                <span className="text-xs font-extrabold truncate flex items-center gap-1.5 text-indigo-600 dark:text-cyan-400">
                  {currentTabObj.icon}
                  {currentTabObj.label}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400 shrink-0">
              {isMobileMenuOpen ? (
                <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </button>

          {/* Expanded Mobile Vertical Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="m3-surface-2 rounded-2xl p-2 border border-slate-200 dark:border-white/[0.1] shadow-2xl space-y-1.5 animate-fadeIn">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className={`text-[10px] font-mono font-bold w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {tab.num}
                      </span>
                      <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.label}</span>
                    </div>
                    
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono shrink-0 ${
                      isActive ? 'bg-indigo-700/80 text-white' : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop View: Segmented Command Dock (hidden md:block) */}
        <div className="hidden md:block m3-surface-2 rounded-full p-2 border border-slate-200/80 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-slate-300/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {tab.num}
                  </span>
                  
                  <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400 transition-colors'}>
                    {tab.icon}
                  </span>
                  
                  <span className="truncate tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Tab Viewport */}
      <div className="transition-opacity duration-300">
        {activeTab === 'recommendations' && <Tab1Recommendations />}
        {activeTab === 'sandbox' && <Tab2ProctoredSandbox />}
        {activeTab === 'freelance' && <Tab3FreelanceMarketplace />}
        {activeTab === 'internships' && <Tab4and5Opportunities mode="internships" />}
        {activeTab === 'jobs' && <Tab4and5Opportunities mode="jobs" />}
        {activeTab === 'organisations' && <Tab6Organisations />}
        {activeTab === 'profile' && <Tab7LivingResume />}
      </div>

    </div>
  );
};
