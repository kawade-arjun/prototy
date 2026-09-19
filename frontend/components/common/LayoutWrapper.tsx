'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <main className="flex-1 w-full flex items-center justify-center p-4">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 lg:pl-72 w-full transition-all duration-200">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </>
  );
};
