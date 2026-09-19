import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { LayoutWrapper } from '@/components/common/LayoutWrapper';

export const metadata: Metadata = {
  title: 'CareerLens | Sovereign AI Career Acceleration Platform',
  description: 'Six-stage student journey: Onboard, Skill Mapping, Proctored Assessment, Credential Verification, Match & Place, Learn & Grow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col font-sans antialiased">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
