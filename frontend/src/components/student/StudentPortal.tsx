import React, { useState } from 'react';
import { StudentTab } from '../../types';
import { Tab1Recommendations } from './tabs/Tab1Recommendations';
import { Tab2ProctoredSandbox } from './tabs/Tab2ProctoredSandbox';
import { Tab3FreelanceMarketplace } from './tabs/Tab3FreelanceMarketplace';
import { Tab4and5Opportunities } from './tabs/Tab4and5Opportunities';
import { Tab6Organisations } from './tabs/Tab6Organisations';
import { Tab7LivingResume } from './tabs/Tab7LivingResume';
import { 
  Target, 
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
import { MetaVerifiedBadge } from '../common/MetaVerifiedBadge';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTab>('recommendations');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeStudent, customProfile, setIsOnboardingOpen } = useStudent();

  const tabs: { id: StudentTab; label: string; num: string; icon: React.ReactNode; category: string }[] = [
    { id: 'recommendations', label: 'Recommendations Studio', num: '1', icon: <Target className="w-3.5 h-3.5" />, category: 'Diagnostics' },
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
            <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">{activeStudent.name}</span>
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

      {/* 7-Tab Command Navigation Dock (Sticky at top below Navbar) */}
      <div className="sticky top-16 z-30 bg-slate-50/90 dark:bg-[#070a11]/90 backdrop-blur-md py-2 border-b border-slate-200/60 dark:border-white/[0.08] shadow-sm transition-all">
        
        {/* Mobile View: 3 Horizontal Lines Toggle with Centered Tab Name (md:hidden) */}
        <div className="md:hidden space-y-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full m3-surface-2 rounded-2xl p-3 border border-slate-200/80 dark:border-white/[0.08] shadow-md flex items-center justify-between gap-3 text-slate-900 dark:text-white font-bold text-xs"
          >
            {/* Left 3 Horizontal Lines Icon */}
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Menu className="w-4 h-4" />
            </div>

            {/* Centered Active Tab Name */}
            <div className="flex-1 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 truncate">
              {currentTabObj.icon}
              <span className="truncate">{currentTabObj.label}</span>
            </div>
            
            {/* Right Chevron Indicator */}
            <div className="flex items-center gap-1 text-slate-400 shrink-0">
              {isMobileMenuOpen ? (
                <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
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
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className={`text-[10px] font-mono font-bold w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-amber-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {tab.num}
                      </span>
                      <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.label}</span>
                    </div>
                    
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono shrink-0 ${
                      isActive ? 'bg-amber-700/80 text-white' : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400'
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
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-slate-300/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {tab.num}
                  </span>
                  
                  <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-amber-600 dark:text-slate-400 dark:group-hover:text-amber-400 transition-colors'}>
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
