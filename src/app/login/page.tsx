'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowLeft, Shield, AlertCircle, CheckCircle2, User, KeyRound } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      // Role-based redirect
      if (data.user.role === 'SYSTEM_ADMIN' || data.user.role === 'STAFF_TRAINER') {
        router.push('/admin/dashboard');
      } else {
        router.push('/portal/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (role: 'admin' | 'learner') => {
    if (role === 'admin') {
      setIdentifier('admin@agroonext.org');
      setPassword('AgrooNext@2026');
    } else {
      setIdentifier('learner@example.com');
      setPassword('AgrooNext@2026');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070D1E] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      {/* Header bar */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00897B] dark:hover:text-[#4DD0E1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AgrooNext</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-md w-full bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00897B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Lockup */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md border border-slate-200 dark:border-white/10 flex items-center justify-center mb-3">
              <Image
                src="/logo.png"
                alt="AgrooNext Official Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              AgrooNext Portal Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Access your admissions, course progress, documents, and payments
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address or Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or 9876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm transition-all outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm transition-all outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00897B] to-[#00695C] hover:from-[#00796B] hover:to-[#004D40] shadow-md shadow-[#00897B]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Test Accounts (Non-production Helper) */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center mb-2.5">
              Development Test Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('learner')}
                className="py-2 px-3 text-xs font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#14263C] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors text-center"
              >
                Learner Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="py-2 px-3 text-xs font-medium rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#14263C] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors text-center"
              >
                Admin Account
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have an AgrooNext account?{' '}
            <Link
              href="/register"
              className="font-semibold text-[#00897B] dark:text-[#4DD0E1] hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-4 py-4 text-center text-xs text-slate-400 dark:text-slate-600">
        AgrooNext — Empower • Educate • Elevate • Pune, Maharashtra
      </footer>
    </div>
  );
}
