'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR / hydration, default to theme class or dark without layout shift
  const isDark = mounted ? theme === 'dark' : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0F2C59]/50 dark:hover:bg-[#0F2C59]/80 border border-slate-300/80 dark:border-white/10 hover:border-[#00897B]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] shadow-sm select-none"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#FB8C00] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F2C59] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
