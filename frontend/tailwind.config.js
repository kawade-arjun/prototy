/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      colors: {
        // Core design system tokens
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#6366f1',
          700: '#4f46e5',
          800: '#4338ca',
          900: '#312e81',
          DEFAULT: '#4f46e5',
        },
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
          DEFAULT: '#0891b2',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          DEFAULT: '#f59e0b',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
          DEFAULT: '#0f172a',
        },
        // Certificate Verification Tier Tokens (Strict visual differentiation)
        tier1: {
          badge: '#059669',
          bg: '#ecfdf5',
          darkBg: '#064e3b',
          border: '#34d399',
          text: '#065f46',
          darkText: '#a7f3d0',
          DEFAULT: '#10b981',
        },
        tier2: {
          badge: '#2563eb',
          bg: '#eff6ff',
          darkBg: '#1e3a8a',
          border: '#60a5fa',
          text: '#1e40af',
          darkText: '#bfdbfe',
          DEFAULT: '#3b82f6',
        },
        tier3: {
          badge: '#d97706',
          bg: '#fffbeb',
          darkBg: '#78350f',
          border: '#fbbf24',
          text: '#92400e',
          darkText: '#fde68a',
          DEFAULT: '#f59e0b',
        },
      }
    },
  },
  plugins: [],
}
