'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: 'Pune',
    state: 'Maharashtra',
    educationLevel: 'Undergraduate',
    institutionName: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          city: formData.city,
          state: formData.state,
          educationLevel: formData.educationLevel,
          institutionName: formData.institutionName || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please check your details.');
      }

      // Auto-redirect to portal dashboard
      router.push('/portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
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
        <div className="max-w-xl w-full bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-1.5 shadow-md border border-slate-200/90 dark:border-white/10 flex items-center justify-center mb-3">
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
              Create Learner Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Join AgrooNext to apply for specialized agro-tech certifications
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Education Level
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white text-sm outline-none"
                >
                  <option value="School Student">School Student (Grade 9-12)</option>
                  <option value="Undergraduate">College / Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Agri Entrepreneur">Agri Entrepreneur / Farmer</option>
                  <option value="Other">Other / Self-Employed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Institution / College (Optional)
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="e.g. Pune University / School"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
                />
              </div>
            </div>

            {/* DPDP Act Data Minimization Badge */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#14263C]/80 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
              <span>
                <strong>Data Privacy Assurance:</strong> Under the DPDP Act, your data is processed strictly for enrollment, batch coordination, and official training certification.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00897B] to-[#00695C] hover:from-[#00796B] hover:to-[#004D40] shadow-md shadow-[#00897B]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Learner Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-[#00897B] dark:text-[#4DD0E1] hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl w-full mx-auto px-4 py-4 text-center text-xs text-slate-400 dark:text-slate-600">
        AgrooNext — Empower • Educate • Elevate • Pune, Maharashtra
      </footer>
    </div>
  );
}
