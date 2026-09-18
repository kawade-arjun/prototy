import React, { useState, useEffect } from 'react';
import { UserRole, AcademicStream } from '../../types';
import { useStudent } from '../../context/StudentContext';
import { 
  ArrowLeft,
  GraduationCap, 
  Building2, 
  Briefcase, 
  Landmark, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Fingerprint,
  Mail,
  User,
  Compass,
  Cpu,
  TrendingUp,
  Activity,
  Scale,
  Palette,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoleAuthPageProps {
  role: UserRole;
  initialMode: 'signin' | 'signup';
  onBack: () => void;
  onSuccess: (role: UserRole) => void;
}

interface PersonaConfig {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultEmail: string;
  theme: {
    gradient: string;
    gradientBorder: string;
    badgeBg: string;
    textAccent: string;
    glow: string;
    buttonBg: string;
    buttonHover: string;
  };
  highlights: string[];
  idPlaceholder: string;
  idLabel: string;
  orgLabel: string;
  orgPlaceholder: string;
}

const PERSONA_CONFIGS: Record<UserRole, PersonaConfig> = {
  student: {
    title: 'Student & Job Seeker',
    badge: 'National Sovereign Talent Gateway',
    tagline: 'Verified Competency, Proctored Sandboxes & DigiLocker Resume',
    description: 'Enter your unified career acceleration workspace. Connect your living verified credential ledger to 1,200+ premier enterprise hiring partners.',
    icon: GraduationCap,
    defaultEmail: 'arjun.test@careeroptic.dev',
    theme: {
      gradient: 'from-amber-600 via-amber-500 to-yellow-500',
      gradientBorder: 'border-amber-500/40 hover:border-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
      textAccent: 'text-amber-600 dark:text-amber-400',
      glow: 'shadow-amber-500/20',
      buttonBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500',
      buttonHover: 'hover:from-amber-500 hover:to-yellow-400'
    },
    highlights: [
      '0–100 Competency Index with real-time sandbox benchmarks',
      'DigiLocker Living Resume stamped with cryptographic hash',
      'AI Resume ATS Diagnostics with targeted skill bridge interventions',
      'Zero-fee sovereign freelance marketplace and placement routing'
    ],
    idLabel: 'DigiLocker / Student ID (Optional)',
    idPlaceholder: 'DL-IN-2026-992140',
    orgLabel: 'College or University Name',
    orgPlaceholder: 'e.g. IIT Bombay / Anna University'
  },
  college: {
    title: 'College & University TPO',
    badge: 'Institutional Placement Command',
    tagline: 'AISHE Institutional Audits, Batch Readiness & Proctored Drives',
    description: 'Access your university placement command center. Monitor cohort readiness, host automated proctored hiring drives, and export statutory NIRF reports.',
    icon: Building2,
    defaultEmail: 'tpo.head@iitb.ac.in',
    theme: {
      gradient: 'from-emerald-600 via-emerald-500 to-teal-500',
      gradientBorder: 'border-emerald-500/40 hover:border-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
      textAccent: 'text-emerald-600 dark:text-emerald-400',
      glow: 'shadow-emerald-500/20',
      buttonBg: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500',
      buttonHover: 'hover:from-emerald-500 hover:to-teal-400'
    },
    highlights: [
      'Comprehensive AISHE & NAAC institutional placement analytics',
      '1-Click automated campus drive scheduler & corporate matchmaking',
      'Proctored cohort testing results with tamper-proof audit trails',
      'Statutory placement disclosures compliant with national regulators'
    ],
    idLabel: 'AISHE Institutional Code',
    idPlaceholder: 'AISHE-C-12345',
    orgLabel: 'Affiliated Institution / University Name',
    orgPlaceholder: 'e.g. Indian Institute of Technology Bombay'
  },
  recruiter: {
    title: 'Corporate Recruiter & Enterprise Partner',
    badge: 'Corporate Talent Gateway',
    tagline: 'Pre-Vetted Sovereign Talent with Judge0 Execution Proofs',
    description: 'Direct access to 4.2M pre-assessed candidates. Evaluate verifiable Judge0 code benchmarks, review ATS-ready credentials, and schedule interviews instantly.',
    icon: Briefcase,
    defaultEmail: 'talent.partner@google.com',
    theme: {
      gradient: 'from-indigo-600 via-indigo-500 to-cyan-500',
      gradientBorder: 'border-indigo-500/40 hover:border-indigo-500',
      badgeBg: 'bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30',
      textAccent: 'text-indigo-600 dark:text-indigo-400',
      glow: 'shadow-indigo-500/20',
      buttonBg: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500',
      buttonHover: 'hover:from-indigo-500 hover:to-cyan-400'
    },
    highlights: [
      'Judge0 proctored sandboxes with memory and latency execution metrics',
      'Direct interview booking with auto-verified skill credentials',
      'AI Candidate matching with zero keyword manipulation loopholes',
      'Enterprise ATS integration with sovereign credential verification'
    ],
    idLabel: 'Corporate CIN / GSTIN Code (Optional)',
    idPlaceholder: 'U72200MH2021PTC123456',
    orgLabel: 'Enterprise Company / Organization',
    orgPlaceholder: 'e.g. Google India / TCS / Infosys'
  },
  government: {
    title: 'Government & Policy Observatory',
    badge: 'Sovereign Policy Observatory',
    tagline: 'Real-Time Macro Talent Telemetry & National Skill Demand',
    description: 'Macro talent telemetry and sovereign grant oversight. Map regional skill surpluses, monitor public sector hiring drives, and audit compliance under India DPDP Act 2023.',
    icon: Landmark,
    defaultEmail: 'national.observatory@aicte-india.org',
    theme: {
      gradient: 'from-rose-600 via-pink-600 to-amber-600',
      gradientBorder: 'border-rose-500/40 hover:border-rose-500',
      badgeBg: 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30',
      textAccent: 'text-rose-600 dark:text-rose-400',
      glow: 'shadow-rose-500/20',
      buttonBg: 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600',
      buttonHover: 'hover:from-rose-500 hover:to-amber-500'
    },
    highlights: [
      'National & State-level skill demand vs curriculum supply telemetry',
      '₹120Cr Sovereign Innovation Grant tracking & disbursal engine',
      'Statutory compliance oversight under India DPDP Act 2023',
      'Inter-agency AICTE, UGC, NCVET & MeitY verified data sync'
    ],
    idLabel: 'Sovereign Department / Node ID',
    idPlaceholder: 'GOV-NODAL-IN-2026',
    orgLabel: 'Ministry / Nodal Department',
    orgPlaceholder: 'e.g. Ministry of Education / AICTE India'
  }
};

const STREAM_OPTIONS: { id: AcademicStream; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'tech_ai', name: 'Engineering', icon: Cpu },
  { id: 'commerce_finance', name: 'Commerce & Finance', icon: TrendingUp },
  { id: 'healthcare_bio', name: 'Healthcare & Bio-Sciences', icon: Activity },
  { id: 'law_governance', name: 'Law & Governance', icon: Scale },
  { id: 'ui_ux', name: 'UI/UX & Spatial HCI', icon: Palette }
];

export const RoleAuthPage: React.FC<RoleAuthPageProps> = ({
  role,
  initialMode,
  onBack,
  onSuccess
}) => {
  const config = PERSONA_CONFIGS[role];
  const PersonaIcon = config.icon;
  const { login, register, setIsOnboardingOpen, selectedStream, setStudentStream } = useStudent();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('CareerOptic@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [studentStreamChoice, setStudentStreamChoice] = useState<AcademicStream>(selectedStream);
  const [agreeDpdp, setAgreeDpdp] = useState(true);

  // Status & Feedback States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize defaults on role/mode change
  useEffect(() => {
    setMode(initialMode);
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
  }, [role, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }
    if (!agreeDpdp) {
      setErrorMessage('Please accept the India DPDP Act 2023 statutory consent.');
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
          setStudentStream(studentStreamChoice);
        }

        await register(email, password, role, displayName);
        setSuccessMessage('Account registered successfully! Redirecting...');
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

        setTimeout(() => {
          onSuccess(role);
          if (role === 'student') {
            setIsOnboardingOpen(true);
          }
        }, 800);
      } else {
        // Sign in
        const res = await login(email, password);
        setSuccessMessage('Signed in successfully! Launching workspace...');
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

        setTimeout(() => {
          onSuccess(role);
          if (role === 'student' && (!res.profile || res.profile.completion_percentage < 80)) {
            setIsOnboardingOpen(true);
          }
        }, 600);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials or ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-6 sm:py-10 animate-fadeIn">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal Selection</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${config.theme.badgeBg}`}>
            {config.badge}
          </span>
        </div>
      </div>

      {/* Main Auth Container */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Persona Branding & Institutional Value Substrate */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Persona Hero Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-slate-200/80 dark:border-white/[0.08] relative overflow-hidden shadow-xl bg-white/70 dark:bg-[#0c1220]/70 backdrop-blur-xl space-y-5">
              
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${config.theme.gradient} text-white flex items-center justify-center shadow-lg ${config.theme.glow}`}>
                  <PersonaIcon className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                    {config.title}
                  </h1>
                  <span className={`text-xs font-bold ${config.theme.textAccent}`}>
                    {config.tagline}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {config.description}
              </p>

              {/* Feature Verification Checklist */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/[0.08]">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                  Verified Platform Pillars
                </span>
                <ul className="space-y-2.5">
                  {config.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${config.theme.textAccent}`} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sovereign Ledger Stamp */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-center gap-3">
                <Fingerprint className={`w-5 h-5 shrink-0 ${config.theme.textAccent}`} />
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block">Sovereign Proof of Work</span>
                  End-to-end encrypted cryptographic ledger under India DPDP Act 2023.
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Dedicated Sign In / Sign Up Form */}
          <div className="lg:col-span-7">
            <div className={`glass-panel p-6 sm:p-8 rounded-3xl border-2 ${config.theme.gradientBorder} shadow-2xl bg-white/90 dark:bg-[#0c1220]/90 backdrop-blur-2xl space-y-6 transition-all`}>
              
              {/* Form Header with Mode Switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {mode === 'signin' ? `Sign In to ${config.title}` : `Create ${config.title} Account`}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {mode === 'signin' ? 'Enter your credentials to access your live portal' : 'Register your profile on the national talent network'}
                    </p>
                  </div>
                </div>

                {/* Mode Switcher Tabs */}
                <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#080d18] border border-slate-200 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMessage(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      mode === 'signin'
                        ? `bg-white dark:bg-[#141d33] text-slate-900 dark:text-white shadow-md`
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMessage(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      mode === 'signup'
                        ? `bg-white dark:bg-[#141d33] text-slate-900 dark:text-white shadow-md`
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Create Account (Sign Up)
                  </button>
                </div>
              </div>

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
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form Elements */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Sign Up Fields: Full Name & Organization */}
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Student-specific Academic Stream Selector */}
                    {role === 'student' && (
                      <div className="space-y-2 pt-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                          <span>Choose Academic Discipline:</span>
                          <span className={`text-[10px] font-bold ${config.theme.textAccent}`}>
                            Customized Sandbox Track
                          </span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {STREAM_OPTIONS.map((opt) => {
                            const isChosen = studentStreamChoice === opt.id;
                            const StreamIcon = opt.icon;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setStudentStreamChoice(opt.id)}
                                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                                  isChosen
                                    ? `border-amber-500 bg-amber-500/15 text-slate-950 dark:text-white font-bold shadow-sm`
                                    : `border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#080d18] text-slate-600 dark:text-slate-400 hover:border-slate-300`
                                }`}
                              >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  isChosen ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                }`}>
                                  <StreamIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-semibold truncate">{opt.name}</span>
                                {isChosen && <Check className="w-3.5 h-3.5 text-amber-500 ml-auto shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Password Input with Visibility Toggle */}
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
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all pr-10"
                    />
                  </div>
                </div>

                {/* Optional Identifier (DigiLocker / AISHE / CIN / Node ID) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                      <span>{config.idLabel}:</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Institutional Sovereign Tag</span>
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={config.idPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#080d18] text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Statutory DPDP Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeDpdp}
                      onChange={(e) => setAgreeDpdp(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      I agree to the <span className="font-semibold text-slate-700 dark:text-slate-200">India DPDP Act 2023</span> statutory disclosures, sovereign zero-knowledge cryptographic credential ledger storage, and verified audit protocols.
                    </span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 px-4 rounded-xl ${config.theme.buttonBg} ${config.theme.buttonHover} text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg ${config.theme.glow} active:scale-[0.99] transition-all cursor-pointer ${
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
                        <span>{mode === 'signin' ? `Sign In to ${config.title}` : `Complete ${config.title} Registration`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Bottom Switcher Note */}
              <div className="pt-2 text-center border-t border-slate-200 dark:border-white/[0.06]">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {mode === 'signin' ? (
                    <>
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('signup'); setErrorMessage(null); }}
                        className={`font-bold ${config.theme.textAccent} hover:underline cursor-pointer`}
                      >
                        Create {config.title} Account
                      </button>
                    </>
                  ) : (
                    <>
                      Already registered on CareerOptic?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('signin'); setErrorMessage(null); }}
                        className={`font-bold ${config.theme.textAccent} hover:underline cursor-pointer`}
                      >
                        Sign In to Console
                      </button>
                    </>
                  )}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
