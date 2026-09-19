'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  FileText,
  ShieldAlert,
  Award,
  Briefcase,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/onboarding', stage: 'Stage 1', label: 'Onboard', icon: Compass },
  { href: '/profile/resume', stage: 'Stage 2', label: 'Resume & Skills', icon: FileText },
  { href: '/assessment/tech', stage: 'Stage 3', label: 'Proctored Assessment', icon: ShieldAlert },
  { href: '/profile/certificates', stage: 'Stage 4', label: 'Credentials', icon: Award },
  { href: '/opportunities', stage: 'Stage 5', label: 'Match & Place', icon: Briefcase },
  { href: '/learning-path', stage: 'Stage 6', label: 'Learn & Grow', icon: TrendingUp },
  { href: '/profile', stage: 'Profile', label: 'Digital Portfolio', icon: UserCheck },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide navigation on login page
  if (pathname === '/login') return null;

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <Link href="/profile" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-md">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm flex items-center gap-1.5">
            CareerLens
            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-300">
              Student
            </span>
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Vertical Navigation Bar to the Left */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950/95 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-200 ease-in-out backdrop-blur-xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Logo & Title */}
          <div className="p-5 border-b border-neutral-850 flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  CareerLens
                  <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-300 border border-primary-500/30">
                    Student
                  </span>
                </span>
                <p className="text-[10px] text-neutral-400 font-mono">Sovereign Career Engine</p>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Journey Stepper Subheading */}
          <div className="px-5 pt-4 pb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              6-Stage Student Journey
            </span>
          </div>

          {/* Vertical Navigation Items */}
          <nav className="flex-1 px-3 space-y-1.5 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/profile' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-300 border border-primary-500/40 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-500/20 text-primary-400'
                          : 'bg-neutral-900 text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-mono text-neutral-400">{item.stage}</span>
                      <span className="block text-xs leading-snug">{item.label}</span>
                    </div>
                  </div>

                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary-400 shrink-0" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer in Left Sidebar */}
        <div className="p-4 border-t border-neutral-850 space-y-3 bg-neutral-950/60">
          {/* DigiLocker Status Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-[11px]">DigiLocker Connected</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* User Account Strip */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary-600/30 text-primary-300 font-bold text-xs flex items-center justify-center border border-primary-500/30">
                AK
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-semibold text-white block">Arjun Kawade</span>
                <span className="text-[10px] text-neutral-400 font-mono">B.Tech (CS)</span>
              </div>
            </div>

            <Link
              href="/login"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors"
              title="Switch Account / Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
