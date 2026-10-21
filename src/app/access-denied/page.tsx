import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-[#070D1E] text-slate-900 dark:text-slate-100">
      <div className="max-w-md w-full bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            HTTP 403 • Access Forbidden
          </span>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Permission Required
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Your current account credentials do not grant access to this administrative or protected route. If you believe this is in error, please contact your training coordinator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/portal/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors text-sm"
          >
            <span>Learner Portal</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
