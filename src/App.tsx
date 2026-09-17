import React, { useState } from 'react';
import { UserRole } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import { Navbar } from './components/layout/Navbar';
import { StudentPortal } from './components/student/StudentPortal';
import { CollegePortal } from './components/college/CollegePortal';
import { RecruiterPortal } from './components/recruiter/RecruiterPortal';
import { GovernmentPortal } from './components/government/GovernmentPortal';
import { AuthModal } from './components/auth/AuthModal';
import { ShieldCheck, Lock } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col ambient-bg text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Global Navigation Bar */}
      <Navbar 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-[#070a11]/70 backdrop-blur-md py-6 mt-12 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-500">
            <span>IITB / SRCC / NID / NLSIU / AIIMS Benchmarks</span>
            <span>AICTE Regulatory Synchronized</span>
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
