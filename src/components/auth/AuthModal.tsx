import React, { useState } from 'react';
import { UserRole, AcademicStream } from '../../types';
import { useStudent } from '../../context/StudentContext';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  X, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole | null;
  onRoleChange: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange
}) => {
  const { allStudents, selectedStream, setStudentStream } = useStudent();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('arjun.kawade@iitb.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('');
  const [signupStream, setSignupStream] = useState<AcademicStream>('tech_ai');
  const [digiLockerInput, setDigiLockerInput] = useState('DL-IN-2026-XXXXXX');
  const [agreeDpdp, setAgreeDpdp] = useState(true);

  if (!isOpen) return null;

  const roleDetails: Record<UserRole, { title: string; defaultEmail: string; icon: React.ReactNode; color: string; bg: string; border: string }> = {
    student: {
      title: 'Student & Scholar',
      defaultEmail: 'arjun.kawade@iitb.ac.in',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-500/30'
    },
    college: {
      title: 'College TPO',
      defaultEmail: 'tpo.head@iitb.ac.in',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-500/30'
    },
    recruiter: {
      title: 'Corporate Recruiter',
      defaultEmail: 'talent.partner@google.com',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-500/30'
    },
    government: {
      title: 'Government / AICTE',
      defaultEmail: 'national.observatory@aicte-india.org',
      icon: <Landmark className="w-5 h-5" />,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-500/30'
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleDetails[role].defaultEmail);
  };

  const handleDisciplineSelect = (stream: AcademicStream) => {
    setStudentStream(stream);
    const emails: Record<AcademicStream, string> = {
      tech_ai: 'arjun.kawade@iitb.ac.in',
      commerce_finance: 'priya.venkatesh@srcc.du.ac.in',
      healthcare_bio: 'rohan.vaidya@nia.nic.in',
      law_governance: 'ananya.deshmukh@nls.ac.in',
      ui_ux: 'kabir.mehta@nid.edu'
    };
    setEmail(emails[stream]);
  };

  const handleCompleteAuth = (instantMode = false) => {
    onRoleChange(selectedRole);
    if (selectedRole === 'student' && authMode === 'signup') {
      setStudentStream(signupStream);
    }
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  const handleDigiLockerLogin = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    onRoleChange(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-white/[0.09] shadow-2xl transition-all">
        
        {/* Top Header Glow Ribbon */}
        <div className="p-6 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                  Career<span className="text-indigo-600 dark:text-indigo-400">Lens</span> Gateway
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> DigiLocker PKI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                National Sovereign Talent & Verified Credentials Infrastructure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Toggle Bar */}
        <div className="px-6 pt-5">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/[0.06]">
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-[#162035] text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Sign In (Access Console)
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-[#162035] text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Create Account (New Registration)
            </button>
          </div>
        </div>

        {/* Main Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Persona Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Stakeholder Role:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(roleDetails) as UserRole[]).map((role) => {
                const isSelected = selectedRole === role;
                const info = roleDetails[role];
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-600/20 dark:border-indigo-500 dark:text-white font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.12]'
                    }`}
                  >
                    <span className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                      {info.icon}
                    </span>
                    <span className="text-[11px] font-semibold text-center leading-tight">
                      {info.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* If Student Role Selected: Show Disciplinary Profile Dropdown */}
          {selectedRole === 'student' && authMode === 'signin' && (
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 space-y-2">
              <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Select Academic Field Persona:
                </span>
                <span className="text-[10px] text-slate-500 font-mono font-normal">
                  {allStudents.length} Verified Personas
                </span>
              </label>
              <select
                value={selectedStream}
                onChange={(e) => handleDisciplineSelect(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {allStudents.map((stu) => (
                  <option key={stu.id} value={stu.streamId}>
                    {stu.streamName} • {stu.name} ({stu.compositeScore}/100) — {stu.institution.split('(')[0]}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / Official Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Rohan Vaidya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {authMode === 'signup' && selectedRole === 'student' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Disciplinary Field
                </label>
                <select
                  value={signupStream}
                  onChange={(e) => setSignupStream(e.target.value as AcademicStream)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="tech_ai">Tech & AI (Computer Science & Engineering)</option>
                  <option value="commerce_finance">Commerce & Finance (Financial Engineering)</option>
                  <option value="healthcare_bio">Healthcare & Bio-Sciences (Integrative Medicine)</option>
                  <option value="law_governance">Law & Governance (Corporate & Tech Law)</option>
                  <option value="ui_ux">UI/UX Design (Human-Computer Interaction)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.ac.in"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password / Security Token
                </label>
                {authMode === 'signin' && (
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {selectedRole === 'student'
                    ? 'DigiLocker / APAAR Student ID (Optional)'
                    : selectedRole === 'college'
                    ? 'Institutional AISHE Code (Optional)'
                    : selectedRole === 'recruiter'
                    ? 'Corporate GSTIN / CIN (Optional)'
                    : 'National Cadre / Designation ID (Optional)'}
                </label>
                <input
                  type="text"
                  value={digiLockerInput}
                  onChange={(e) => setDigiLockerInput(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'DL-IN-2026-992140' : 'REG-IN-2026-X88'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="dpdpConsent"
                checked={agreeDpdp}
                onChange={(e) => setAgreeDpdp(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <label htmlFor="dpdpConsent" className="text-[11px] text-slate-500 dark:text-slate-400 cursor-pointer">
                India DPDP Act 2023 Consent & Sovereign Zero-Knowledge Audit Active
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => handleCompleteAuth(false)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <span>{authMode === 'signin' ? 'Sign In to Console' : 'Create Sovereign Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* DigiLocker National SSO Fast Login */}
            <button
              onClick={handleDigiLockerLogin}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Fingerprint className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Sign in with DigiLocker / MeriPehchaan (National SSO)</span>
            </button>

            {/* Fast Demo Bypass */}
            <button
              onClick={() => handleCompleteAuth(true)}
              className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Demo Access (Skip Authentication)</span>
            </button>
          </div>

        </div>

        {/* Footer Security Note */}
        <div className="p-4 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-[#080d17]/50 rounded-b-3xl flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-indigo-500" /> AES-256 GCM Encrypted Session
          </span>
          <span>MeitY Empaneled Sovereign Cloud</span>
        </div>

      </div>
    </div>
  );
};
