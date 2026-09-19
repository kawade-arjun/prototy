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
  LayoutDashboard, 
  Bookmark,
  Menu,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

import { useStudent } from '../../context/StudentContext';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('recommendations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeStudent, customProfile, setIsOnboardingOpen } = useStudent();

  const tabs: { id: StudentTab; label: string; icon: React.ReactNode }[] = [
    { id: 'recommendations', label: 'Recommendations', icon: <Target className="w-4 h-4" /> },
    { id: 'sandbox', label: 'Assessments', icon: <Terminal className="w-4 h-4" /> },
    { id: 'jobs', label: 'Jobs', icon: <Search className="w-4 h-4" /> },
    { id: 'internships', label: 'Internships', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'freelance', label: 'Freelance', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'organisations', label: 'Organisations', icon: <Building2 className="w-4 h-4" /> },
    { id: 'profile', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'settings', label: 'Bookmarks & Settings', icon: <Bookmark className="w-4 h-4" /> }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];


  return (
    <div className="space-y-6">
      
      {/* Student Profile Header Ribbon */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-600 p-0.5 shadow-sm shrink-0">
            <div className="w-full h-full bg-white dark:bg-[#0d1322] rounded-[14px] flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 text-xs">
              {activeStudent.avatarInitials}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-base sm:lg text-slate-900 dark:text-white flex items-center gap-1.5">
              {activeStudent.name}
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1D9BF0] text-white shrink-0 shadow-sm" title="Meta Verified">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            </span>
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
                className="h-full bg-amber-600 rounded-full"
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
        <aside className="w-full lg:w-56 xl:w-64 shrink-0 lg:sticky lg:top-20 z-20 space-y-3">
          
          {/* Mobile Collapsible Header (lg:hidden) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full m3-surface-2 rounded-2xl p-3 border border-slate-200/80 dark:border-white/[0.08] shadow-md flex items-center justify-between gap-3 text-slate-900 dark:text-white font-bold text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Menu className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 truncate">
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
          <div className={`m3-surface-2 rounded-2xl p-2 border border-slate-200/80 dark:border-white/[0.08] shadow-sm flex-col gap-1 transition-all ${
            isMobileMenuOpen ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Menu
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
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 group text-left ${
                      isActive
                        ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50/70 dark:hover:bg-slate-800/80 hover:text-amber-800 dark:hover:text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'
                      }`}>
                        {tab.icon}
                      </span>
                      <span className="truncate text-left text-xs font-semibold">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
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
