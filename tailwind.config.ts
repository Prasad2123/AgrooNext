import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#C2185B',
          'rose-hover': '#AD1457',
          'rose-light': '#FCE4EC',
          navy: '#0F2C59',
          'navy-dark': '#071830',
          'navy-light': '#1A3F75',
          emerald: '#2E7D32',
          'emerald-light': '#E8F5E9',
          amber: '#FB8C00',
          'amber-light': '#FFF3E0',
          teal: '#00897B',
          'teal-light': '#E0F2F1',
        },
        surface: {
          dark: '#070D1E',
          'dark-elevated': '#0D1733',
          'card-dark': 'rgba(15, 23, 42, 0.75)',
          'card-border': 'rgba(255, 255, 255, 0.08)',
          light: '#F8FAFC',
          'light-card': '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'subtle-glow': '0 0 30px -5px rgba(0, 137, 123, 0.15)',
        'rose-glow': '0 0 30px -5px rgba(194, 24, 91, 0.25)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
