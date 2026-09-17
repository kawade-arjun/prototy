import React, { useState } from 'react';
import { StudentTab } from '../../types';
import { Tab1Recommendations } from './tabs/Tab1Recommendations';
import { Tab2ProctoredSandbox } from './tabs/Tab2ProctoredSandbox';
import { Tab3FreelanceMarketplace } from './tabs/Tab3FreelanceMarketplace';
import { Tab4and5Opportunities } from './tabs/Tab4and5Opportunities';
import { Tab6Organisations } from './tabs/Tab6Organisations';
import { Tab7LivingResume } from './tabs/Tab7LivingResume';
import { Tab8SettingsBookmarks } from './tabs/Tab8SettingsBookmarks';
import { 
  Sparkles, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Search, 
  Building2, 
  UserCheck, 
  Settings,
  ShieldCheck,
  Lock
} from 'lucide-react';

import { useStudent } from '../../context/StudentContext';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('recommendations');
  const { activeStudent } = useStudent();

  const tabs: { id: StudentTab; label: string; num: string; icon: React.ReactNode; category: string }[] = [
    { id: 'recommendations', label: 'Recommendations Studio', num: '1', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'Diagnostics' },
    { id: 'sandbox', label: 'Tests & Skill Verification', num: '2', icon: <Terminal className="w-3.5 h-3.5" />, category: 'Evaluation' },
    { id: 'freelance', label: 'Freelance Marketplace', num: '3', icon: <Briefcase className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'internships', label: 'Internships Hub', num: '4', icon: <GraduationCap className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'jobs', label: 'Jobs Hub', num: '5', icon: <Search className="w-3.5 h-3.5" />, category: 'Opportunities' },
    { id: 'organisations', label: 'Organisations Directory', num: '6', icon: <Building2 className="w-3.5 h-3.5" />, category: 'Discovery' },
    { id: 'profile', label: 'Comprehensive Profile', num: '7', icon: <UserCheck className="w-3.5 h-3.5" />, category: 'Sovereign ID' },
    { id: 'settings', label: 'Settings & Bookmarks', num: '8', icon: <Settings className="w-3.5 h-3.5" />, category: 'Compliance' },
  ];

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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.06] text-xs">
              <span className="text-slate-500 dark:text-slate-400">National Percentile:</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">{activeStudent.nationalPercentile}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>0% Discrepancy</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>DPDP Masked</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Tab Modern Segmented Command Dock (Diagram 1 Specification) */}
      <div className="relative">
        <div className="glass-panel rounded-2xl p-1.5 shadow-xl backdrop-blur-xl overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-[920px]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-black w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:text-slate-400 group-hover:bg-slate-300'
                  }`}>
                    {tab.num}
                  </span>
                  
                  <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400 transition-colors'}>
                    {tab.icon}
                  </span>
                  
                  <span className="truncate tracking-tight">{tab.label}</span>

                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                  )}
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
        {activeTab === 'settings' && <Tab8SettingsBookmarks />}
      </div>

    </div>
  );
};
