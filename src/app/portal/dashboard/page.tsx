'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
  CreditCard,
  FolderLock,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  MapPin,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

export default function PortalDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    Promise.all([
      fetch('/api/portal/profile', { signal: controller.signal }),
      fetch('/api/portal/applications', { signal: controller.signal }),
      fetch('/api/portal/payments', { signal: controller.signal }),
    ])
      .then(async ([profRes, appRes, payRes]) => {
        if (!profRes.ok && profRes.status !== 404) throw new Error('Failed to load profile');
        const profData = profRes.ok ? await profRes.json() : null;
        const appData = appRes.ok ? await appRes.json() : { applications: [] };
        const payData = payRes.ok ? await payRes.json() : { payments: [] };

        setProfile(profData?.profile || null);
        setApplications(appData.applications || []);
        setPayments(payData.payments || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load learner overview. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadData();
  }, [loadData]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ENROLLED':
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'APPROVED':
      case 'PAYMENT_CONFIRMED':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300';
      case 'UNDER_REVIEW':
      case 'SUBMITTED':
      case 'WAITLISTED':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'PAYMENT_PENDING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'REJECTED':
      case 'CANCELLED':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  if (error) {
    return (
      <div className="py-20 text-center">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00897B] text-white text-xs font-semibold hover:bg-[#007367] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Loading
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-44 bg-slate-200 dark:bg-white/5 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-28 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-28 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const activeApp = applications[0];
  const confirmedPayments = payments.filter((p) => p.paymentStatus === 'CONFIRMED');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#00897B] to-[#0F2C59] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white inline-block mb-3">
            AgrooNext Training Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
            Welcome back, {profile?.fullName || 'Learner'}!
          </h1>
          <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Track your course admissions, scheduled batches in Pune, official fee receipts, and certificate eligibility.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/portal/applications?action=new"
              className="py-2.5 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Apply for a Course</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00897B]" />
            </Link>
            <Link
              href="/portal/documents"
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors backdrop-blur-sm inline-flex items-center gap-1.5"
            >
              <span>Manage Documents</span>
            </Link>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Applications
          </span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">
            {applications.length}
          </span>
        </div>
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Enrollments
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {applications.filter((a) => a.currentStatus === 'ENROLLED' || a.currentStatus === 'COMPLETED').length}
          </span>
        </div>
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Receipts
          </span>
          <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1 block">
            {confirmedPayments.length}
          </span>
        </div>
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            ID Verification
          </span>
          <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] mt-2 block">
            {profile?.idProofStatus || 'NOT_SUBMITTED'}
          </span>
        </div>
      </div>

      {/* Active Application Card */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#00897B]" />
              <span>Current Course Application</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live admissions status and scheduled training batch
            </p>
          </div>
          {activeApp && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                activeApp.currentStatus
              )}`}
            >
              {activeApp.currentStatus.replace('_', ' ')}
            </span>
          )}
        </div>

        {activeApp ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#14263C]/50 border border-slate-200/80 dark:border-white/5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Course
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
                  {activeApp.batch?.course?.title}
                </span>
                <span className="text-xs text-slate-500">
                  Code: {activeApp.batch?.course?.courseCode}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Batch & Dates
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00897B]" />
                  <span>
                    {new Date(activeApp.batch?.startDate).toLocaleDateString()} —{' '}
                    {new Date(activeApp.batch?.endDate).toLocaleDateString()}
                  </span>
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeApp.batch?.venueType} (Pune)</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Authoritative Course Fee
                </span>
                <span className="text-lg font-extrabold text-[#00897B] dark:text-[#4DD0E1] mt-1 block">
                  ₹{activeApp.calculatedFeeInr.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">
                  {activeApp.pricingTier?.targetGroup} • Model: {activeApp.pricingTier?.pricingModel}
                </span>
              </div>
            </div>

            {/* Quick action buttons depending on state */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/portal/applications/${activeApp.id}`}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>View Full Timeline & Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {(activeApp.currentStatus === 'APPROVED' || activeApp.currentStatus === 'PAYMENT_PENDING') && (
                <Link
                  href="/portal/payments"
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-colors inline-flex items-center gap-1.5 shadow-sm animate-pulse"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Fee / Submit UTR Reference</span>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500 mb-4">
              You haven&apos;t submitted a course application yet.
            </p>
            <Link
              href="/portal/applications?action=new"
              className="py-3 px-6 rounded-xl bg-[#00897B] text-white font-bold text-xs hover:bg-[#00796B] transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Courses & Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Policy & Governance Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#14263C]/60 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p>
          <strong>Admissions Policy:</strong> Under governance decision <code>DEC-019</code>, student ID proof upload is optional and does not prevent application review.
        </p>
        <p>
          <strong>Payment Governance:</strong> Under decision <code>DEC-015</code>, online payments operate in sandbox development mode pending formal commercial gateway KYC. Offline bank payments (NEFT/UPI) can be submitted with transaction reference (UTR) for authorized admin reconciliation.
        </p>
      </div>
    </div>
  );
}
