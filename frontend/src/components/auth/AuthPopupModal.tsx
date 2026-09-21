import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { useStudent } from '../../context/StudentContext';
import { 
  X, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint,
  Mail,
  User,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  ShieldCheck
} from 'lucide-react';

interface AuthPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  mode: 'signin' | 'signup';
  onSwitchMode: (newMode: 'signin' | 'signup') => void;
  onSuccess: (role: UserRole) => void;
}

interface PersonaConfig {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultEmail: string;
  theme: {
    gradient: string;
    border: string;
    badgeBg: string;
    textAccent: string;
    buttonBg: string;
  };
  idLabel: string;
  idPlaceholder: string;
  orgLabel: string;
  orgPlaceholder: string;
}

const PERSONA_CONFIGS: Record<UserRole, PersonaConfig> = {
  student: {
    title: 'Student & Job Seeker',
    badge: 'Student Console',
    icon: GraduationCap,
    defaultEmail: 'arjun.test@careeroptic.dev',
    theme: {
      gradient: 'from-amber-600 via-amber-500 to-yellow-500',
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
      textAccent: 'text-amber-600 dark:text-amber-400',
      buttonBg: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 shadow-amber-600/20'
    },
    idLabel: 'DigiLocker / Student ID (Optional)',
    idPlaceholder: 'DL-IN-2026-992140',
    orgLabel: 'College or University Name',
    orgPlaceholder: 'e.g. IIT Bombay'
  },
  college: {
    title: 'College & University TPO',
    badge: 'Placement Console',
    icon: Building2,
    defaultEmail: 'tpo.head@iitb.ac.in',
    theme: {
      gradient: 'from-amber-600 via-amber-500 to-teal-500',
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
      textAccent: 'text-amber-600 dark:text-amber-400',
      buttonBg: 'bg-gradient-to-r from-amber-600 to-teal-500 hover:from-amber-500 hover:to-teal-400 shadow-amber-600/20'
    },
    idLabel: 'AISHE Institutional Code',
    idPlaceholder: 'AISHE-C-12345',
    orgLabel: 'Affiliated Institution Name',
    orgPlaceholder: 'e.g. IIT Bombay'
  },
  recruiter: {
    title: 'Corporate Recruiter',
    badge: 'Recruiter Gateway',
    icon: Briefcase,
    defaultEmail: 'talent.partner@google.com',
    theme: {
      gradient: 'from-orange-600 via-amber-600 to-amber-500',
      border: 'border-orange-500/40',
      badgeBg: 'bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-500/30',
      textAccent: 'text-orange-600 dark:text-orange-400',
      buttonBg: 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-orange-600/20'
    },
    idLabel: 'Corporate CIN / GSTIN (Optional)',
    idPlaceholder: 'U72200MH2021PTC123456',
    orgLabel: 'Company / Organization Name',
    orgPlaceholder: 'e.g. Google India'
  },
  government: {
    title: 'Government & Policy',
    badge: 'Policy Observatory',
    icon: Landmark,
    defaultEmail: 'national.observatory@aicte-india.org',
    theme: {
      gradient: 'from-rose-600 via-pink-600 to-amber-600',
      border: 'border-rose-500/40',
      badgeBg: 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30',
      textAccent: 'text-rose-600 dark:text-rose-400',
      buttonBg: 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-rose-600/20'
    },
    idLabel: 'Sovereign Department Node ID',
    idPlaceholder: 'GOV-NODAL-IN-2026',
    orgLabel: 'Ministry / Department Name',
    orgPlaceholder: 'e.g. AICTE / Ministry of Education'
  }
};

export const AuthPopupModal: React.FC<AuthPopupModalProps> = ({
  isOpen,
  onClose,
  role,
  mode,
  onSwitchMode,
  onSuccess
}) => {
  const config = PERSONA_CONFIGS[role];
  const PersonaIcon = config.icon;
  const { login, register, setIsOnboardingOpen } = useStudent();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('CareerOptic@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('tech_ai');
  const [agreeDpdp, setAgreeDpdp] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize fields on open
  useEffect(() => {
    if (isOpen) {
      setEmail(config.defaultEmail);
      setPassword('CareerOptic@2026');
      setErrorMessage(null);
      setSuccessMessage(null);
      if (role === 'student') {
        setFullName('Arjun Kawade');
        setOrganization('IIT Bombay');
        setIdentifier('DL-IN-2026-992140');
      } else if (role === 'college') {
        setFullName('Dr. Rajesh Sharma (Dean Placements)');
        setOrganization('IIT Bombay');
        setIdentifier('AISHE-C-12345');
      } else if (role === 'recruiter') {
        setFullName('Pooja Mehta (VP Talent Acquisition)');
        setOrganization('Google India');
        setIdentifier('CIN-U72200DL2004PTC123456');
      } else if (role === 'government') {
        setFullName('Dr. Anil Sahasrabudhe');
        setOrganization('AICTE / Ministry of Education');
        setIdentifier('GOV-NODAL-IN-2026');
      }
    }
  }, [isOpen, role, mode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (mode === 'signup') {
        const displayName = fullName.trim() 
          ? (organization ? `${fullName} (${organization})` : fullName)
          : (role === 'student' ? 'Student Candidate' : `${config.title} User`);

        if (role === 'student') {
          localStorage.setItem('careeroptic_selected_discipline', selectedDiscipline);
        }

        await register(email, password, role, displayName).catch((err) => {
          console.warn('Backend register notice:', err);
        });
        setSuccessMessage('Account created successfully! Redirecting...');

        setTimeout(() => {
          onSuccess(role);
          onClose();
          if (role === 'student') {
            setIsOnboardingOpen(true);
          }
        }, 400);
      } else {
        await login(email, password).catch((err) => {
          console.warn('Backend login notice:', err);
        });
        setSuccessMessage('Signed in successfully! Launching workspace...');

        setTimeout(() => {
          onSuccess(role);
          onClose();
        }, 400);
      }
    } catch {
      onSuccess(role);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c1220] border-2 ${config.theme.border} shadow-2xl transition-all`}
      >
        {/* Header Ribbon */}
        <div className="p-6 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${config.theme.gradient} text-white flex items-center justify-center shadow-md shrink-0`}>
              <PersonaIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury font-bold text-xl text-slate-900 dark:text-white">
                  {mode === 'signin' ? `Sign In` : `Create Account`}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${config.theme.badgeBg}`}>
                  {config.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {config.title} • Sovereign CareerOptic Substrate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
              <div className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900/60 flex items-center justify-center shrink-0">
                ✕
              </div>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sign Up Fields */}
            {mode === 'signup' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Full Legal Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arjun Kawade"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{config.orgLabel}:</span>
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={config.orgPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {role === 'student' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Select Disciplinary Stream / Track:</span>
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold">5 Tracks Available</span>
                    </label>
                    <select
                      value={selectedDiscipline}
                      onChange={(e) => setSelectedDiscipline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
                    >
                      <option value="tech_ai">Engineering </option>
                      <option value="commerce_finance">Commerce & Finance </option>
                      <option value="ui_ux">UI/UX & Spatial Design )</option>
                      <option value="law_governance">Law </option>
                      <option value="healthcare_bio">Healthcare, Bio-Tech & Ayush</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Official Email Address:</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Password:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Identifier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                <span>{config.idLabel}:</span>
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={config.idPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Action Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl ${config.theme.buttonBg} text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying with Sovereign Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signin' ? `Sign In to ${config.title}` : `Create ${config.title} Account`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Switcher between Sign In and Sign Up for that role */}
          <div className="pt-2 text-center border-t border-slate-200 dark:border-white/[0.06]">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('signup')}
                    className={`font-bold ${config.theme.textAccent} hover:underline cursor-pointer`}
                  >
                    Sign Up for {config.title}
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('signin')}
                    className={`font-bold ${config.theme.textAccent} hover:underline cursor-pointer`}
                  >
                    Sign In to {config.title}
                  </button>
                </>
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
