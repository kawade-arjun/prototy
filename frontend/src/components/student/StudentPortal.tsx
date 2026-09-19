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
  Target, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Search, 
  Building2, 
  UserCheck, 
  Bookmark,
  ShieldCheck,
  Lock,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { useStudent } from '../../context/StudentContext';
import { MetaVerifiedBadge } from '../common/MetaVerifiedBadge';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('recommendations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeStudent, customProfile, setIsOnboardingOpen } = useStudent();

  const tabs: { id: StudentTab; label: string; num: string; icon: React.ReactNode; category: string }[] = [
    { id: 'recommendations', label: 'Recommendations Studio', num: '1', icon: <Target className="w-4 h-4" />, category: 'Diagnostics' },
    { id: 'sandbox', label: 'Tests & Skill Verification', num: '2', icon: <Terminal className="w-4 h-4" />, category: 'Evaluation' },
    { id: 'freelance', label: 'Freelance Marketplace', num: '3', icon: <Briefcase className="w-4 h-4" />, category: 'Freelance' },
    { id: 'internships', label: 'Internships Hub', num: '4', icon: <GraduationCap className="w-4 h-4" />, category: 'Internships' },
    { id: 'jobs', label: 'Jobs Hub', num: '5', icon: <Search className="w-4 h-4" />, category: 'Full-Time' },
    { id: 'organisations', label: 'Organisations Directory', num: '6', icon: <Building2 className="w-4 h-4" />, category: 'Discovery' },
    { id: 'profile', label: 'Competency / Living Resume', num: '7', icon: <UserCheck className="w-4 h-4" />, category: 'Sovereign ID' },
    { id: 'settings', label: 'Bookmarks & Settings', num: '8', icon: <Bookmark className="w-4 h-4" />, category: 'Preferences' }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      
      {/* Student Profile Header Ribbon */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-white dark:bg-[#0d1322] rounded-[14px] flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 text-xs">
              {activeStudent.avatarInitials}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Meta Verified Blue Tick Badge in front of the name */}
            <MetaVerifiedBadge className="w-5 h-5" />
            <span className="font-extrabold text-base sm:lg text-slate-900 dark:text-white">{activeStudent.name}</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">
              {customProfile?.stream || activeStudent.streamName}
            </span>
          </div>
        </div>

        {/* Profile Completion & Onboarding Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Profile {customProfile?.completion_percentage || 85}% Complete</span>
            </div>
            <div className="w-28 sm:w-32 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mt-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full"
                style={{ width: `${customProfile?.completion_percentage || 85}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {customProfile?.completion_percentage && customProfile.completion_percentage >= 100 ? 'Update Profile' : 'Complete Builder'}
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout: Left Vertical Navigation Bar + Right Content Viewport */}
      <div className="flex flex-col lg:flex-row items-start gap-6">

        {/* Left Vertical Navigation Bar */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-20 z-20 space-y-3">
          
          {/* Mobile Collapsible Header (lg:hidden) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full m3-surface-2 rounded-2xl p-3 border border-slate-200/80 dark:border-white/[0.08] shadow-md flex items-center justify-between gap-3 text-slate-900 dark:text-white font-bold text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Menu className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 truncate">
                <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-mono flex items-center justify-center">
                  {currentTabObj.num}
                </span>
                {currentTabObj.icon}
                <span className="truncate">{currentTabObj.label}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 shrink-0">
                {isMobileMenuOpen ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>
          </div>

          {/* Vertical Tabs Sidebar (Always visible on lg+, expandable on mobile) */}
          <div className={`m3-surface-2 rounded-2xl p-2.5 border border-slate-200/80 dark:border-white/[0.08] shadow-sm flex-col gap-1 transition-all ${
            isMobileMenuOpen ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Portal Navigation
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {tabs.length} Modules
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 group text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-md shadow-amber-600/20 font-extrabold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50/70 dark:hover:bg-slate-800/80 hover:text-amber-800 dark:hover:text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-amber-700/70 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 group-hover:text-amber-700 dark:group-hover:text-amber-300'
                      }`}>
                        {tab.num}
                      </span>
                      <span className={`shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'
                      }`}>
                        {tab.icon}
                      </span>
                      <span className="truncate text-left text-xs font-semibold">{tab.label}</span>
                    </div>

                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0 ml-1.5 hidden xl:inline-block ${
                      isActive
                        ? 'bg-amber-700/60 text-amber-100'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-700 dark:group-hover:text-amber-300'
                    }`}>
                      {tab.category}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Status Pill at bottom of sidebar */}
            <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] px-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate text-[10px] font-medium">DigiLocker Verified</span>
              </div>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">Live</span>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div className="flex-1 min-w-0 w-full transition-opacity duration-300">
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

    </div>
  );
};
