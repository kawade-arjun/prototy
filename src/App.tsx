import React, { useState } from 'react';
import { UserRole } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import { Navbar } from './components/layout/Navbar';
import { StudentPortal } from './components/student/StudentPortal';
import { CollegePortal } from './components/college/CollegePortal';
import { RecruiterPortal } from './components/recruiter/RecruiterPortal';
import { GovernmentPortal } from './components/government/GovernmentPortal';
import { HomeScreen } from './components/home/HomeScreen';
import { AuthModal } from './components/auth/AuthModal';
import { SettingsModal } from './components/common/SettingsModal';
import { ShieldCheck, Lock, Compass } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'bookmarks' | 'privacy' | 'preferences'>('preferences');

  const handleOpenSettings = (tab?: 'bookmarks' | 'privacy' | 'preferences') => {
    if (tab) {
      setSettingsTab(tab);
    } else {
      setSettingsTab(currentRole !== null ? 'bookmarks' : 'preferences');
    }
    setIsSettingsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col ambient-bg text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Global Navigation Bar - Automatically responsive for mobile & desktop */}
      <Navbar 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
        onGoHome={() => setCurrentRole(null)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Workspace Viewport - Fluidly auto-adapts to laptop, tablet, or mobile devices */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 transition-all">
        {currentRole === null && <HomeScreen onSelectRole={setCurrentRole} />}
        {currentRole === 'student' && <StudentPortal />}
        {currentRole === 'college' && <CollegePortal />}
        {currentRole === 'recruiter' && <RecruiterPortal />}
        {currentRole === 'government' && <GovernmentPortal />}
      </main>

      {/* Login & Sign-Up Modal Gateway */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      {/* Global Settings & Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isLoggedIn={currentRole !== null}
        initialTab={settingsTab}
      />

      {/* Global Footer & Sovereign Substrate Banner at Bottom */}
      <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-[#070a11]/70 backdrop-blur-md py-6 mt-12 text-xs text-slate-500 dark:text-slate-400 transition-colors space-y-4">
        {/* National Sovereign Tag (Moved to bottom of page) */}
        <div className="flex justify-center pb-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-extrabold shadow-sm transition-transform hover:scale-105">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="uppercase tracking-widest text-[11px] font-mono">National Sovereign Talent & Placement Substrate</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/[0.06] pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              Career<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 3-Tier Sovereign Verification Engine Active
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
              <Lock className="w-3.5 h-3.5" /> India DPDP Act 2023 Statutory Conformance
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </ThemeProvider>
  );
};

export default App;
