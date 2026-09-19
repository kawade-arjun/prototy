'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Mail,
  ArrowRight,
  Info,
  Lock,
  CheckCircle,
  Compass
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<'digilocker' | 'sso' | 'email'>('digilocker');
  const [email, setEmail] = useState('');
  const [collegeRoll, setCollegeRoll] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDigiLockerConsent = () => {
    setLoading(true);
    // Simulate OAuth2 consent redirect / callback flow
    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding');
    }, 900);
  };

  const handleSsoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding');
    }, 700);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow ambient accent */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-500 shadow-xl shadow-primary-500/25 mb-4">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome to CareerLens</h1>
          <p className="text-xs text-neutral-400 mt-1.5">
            Sovereign Student Career Acceleration & Verified Portfolio
          </p>
        </div>

        {/* Primary Auth Option: Continue with DigiLocker */}
        <div className="space-y-4">
          <button
            onClick={handleDigiLockerConsent}
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-2xl transition-all" />
            <div className="relative px-5 py-4 bg-neutral-950 rounded-2xl flex items-center justify-between group-hover:bg-neutral-900/90 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white block">Continue with DigiLocker</span>
                  <span className="text-[11px] text-emerald-400/90 font-medium">Recommended for 100% Verified Profile</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Honest Transparent DigiLocker Disclosure Box */}
          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-neutral-200">What does DigiLocker access grant?</span>
              <p className="mt-0.5">
                Only academic verification status and digital credentials (degrees, marksheets).
                CareerLens <span className="text-neutral-200 font-medium">never stores</span> raw government identity documents, biometric data, or your Aadhaar number.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <span className="relative px-3 bg-neutral-900 text-[11px] uppercase tracking-wider text-neutral-500 font-mono">
            Or Use Institutional Login
          </span>
        </div>

        {/* Fallback SSO / Email Tabs */}
        <div className="flex rounded-xl bg-neutral-950 p-1 mb-4 border border-neutral-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setAuthMethod('sso')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'sso'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>College SSO</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'email'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Login</span>
          </button>
        </div>

        {/* SSO / Email Form */}
        <form onSubmit={handleSsoLogin} className="space-y-3">
          {authMethod === 'sso' ? (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Institution Name / University
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. IIT Bombay, NIT Trichy, Delhi University"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Student Roll / PRN / Institutional ID
                </label>
                <input
                  type="text"
                  required
                  value={collegeRoll}
                  onChange={(e) => setCollegeRoll(e.target.value)}
                  placeholder="e.g. 21CS049"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Student Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In with Institutional ID'}
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-around text-[10px] text-neutral-500 font-mono">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" /> AES-256 Encrypted
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-primary-400" /> DPDP Compliant
          </span>
        </div>
      </div>
    </div>
  );
}
