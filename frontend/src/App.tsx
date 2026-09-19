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
import { AuthPopupModal } from './components/auth/AuthPopupModal';
import { SettingsModal } from './components/common/SettingsModal';
import { StudentOnboardingModal } from './components/student/onboarding/StudentOnboardingModal';
import { useStudent } from './context/StudentContext';
import { ShieldCheck, Lock } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [authModal, setAuthModal] = useState<{ role: UserRole; mode: 'signin' | 'signup' } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'bookmarks' | 'privacy' | 'preferences'>('preferences');
  const { isOnboardingOpen, setIsOnboardingOpen } = useStudent();

  const handleOpenAuth = (role: UserRole = 'student', mode: 'signin' | 'signup' = 'signin') => {
    setAuthModal({ role, mode });
  };

  const handleGoHome = () => {
    setCurrentRole(null);
    setAuthModal(null);
  };

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
        onRoleChange={(role) => {
          setAuthModal(null);
          setCurrentRole(role);
        }}
        onGoHome={handleGoHome}
        onOpenAuthModal={() => handleOpenAuth(currentRole || 'student', 'signin')}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Workspace Viewport - Fluidly auto-adapts to laptop, tablet, or mobile devices */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-1 pb-4 sm:pb-6 transition-all">
        {currentRole === null && (
          <HomeScreen 
            onSelectRole={setCurrentRole} 
            onOpenAuth={handleOpenAuth}
          />
        )}
        {currentRole === 'student' && <StudentPortal />}
        {currentRole === 'college' && <CollegePortal />}
        {currentRole === 'recruiter' && <RecruiterPortal />}
        {currentRole === 'government' && <GovernmentPortal />}
      </main>

      {/* Dedicated Stakeholder Pop-up Auth Window (Only Sign In or Only Sign Up) */}
      {authModal && (
        <AuthPopupModal
          isOpen={true}
          onClose={() => setAuthModal(null)}
          role={authModal.role}
          mode={authModal.mode}
          onSwitchMode={(newMode) => setAuthModal({ ...authModal, mode: newMode })}
          onSuccess={(role) => {
            setAuthModal(null);
            setCurrentRole(role);
          }}
        />
      )}

      {/* Student Onboarding & Profile Builder Wizard */}
      <StudentOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
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
            <span className="uppercase tracking-widest text-[11px] font-mono">National Sovereign Talent & Placement Substrate</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/[0.06] pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              Career<span className="gradient-text-gold font-sans font-black ml-0.5">Optic</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 3-Tier Sovereign Verification Engine Active
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
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
