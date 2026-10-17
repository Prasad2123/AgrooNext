'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Banknote,
  Users,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = React.useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    fetch('/api/admin/overview', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load admin overview. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadOverview();
  }, [loadOverview]);

  // API returns { metrics, recentApplications, recentInquiries }
  const stats = data?.metrics || {};
  const recentApps = data?.recentApplications || [];
  const recentInquiries = data?.recentInquiries || [];

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
        <button
          onClick={loadOverview}
          className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Skeleton while loading (keeps layout visible)
  const StatSkeleton = () => (
    <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Operations Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Truthful database-backed admissions metrics, payment reconciliation, and batch status
        </p>
      </div>

      {/* Primary KPI Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Applications
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {stats.totalApplications ?? 0}
            </span>
          </div>

          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
              Pending Review
            </span>
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 block">
              {stats.pendingReviewCount ?? 0}
            </span>
          </div>

          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">
              Enrolled Learners
            </span>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {stats.enrolledApps ?? 0}
            </span>
          </div>

          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider block">
              Reconciled Fees
            </span>
            <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1 block">
              ₹{(stats.confirmedRevenueInr ?? 0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
              Scheduled Batches
            </span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
              {stats.totalBatches ?? 0}
            </span>
          </div>

          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
              New Inquiries
            </span>
            <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 block">
              {stats.newInquiriesCount ?? 0}
            </span>
          </div>
        </div>
      )}

      {/* Integration Status Badges (PRD Governance Clarity) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-900 dark:text-white">Payment Gateway</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              SANDBOX (DEC-015)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Live charging disabled pending KYC and merchant account.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-900 dark:text-white">Document Vault</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              SECURE LOCAL FS
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Isolated `./private_uploads` with stream authorization.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-900 dark:text-white">Email Service</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              DEV SIMULATION
            </span>
          </div>
          <p className="text-[11px] text-slate-500">In-app notifications live; SMTP pending credentials.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-slate-900 dark:text-white">Certificates</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              DEFERRED (DEC-017)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Option B active: No fake QR or attendance rubrics.</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications Queue */}
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Applications
              </h2>
              <span className="text-[11px] text-slate-500">Awaiting administrative FSM review</span>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentApps.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">No applications received yet.</div>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app: any) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#14263C]/50 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#00897B]">{app.applicationNumber}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {app.user?.profile?.fullName || app.user?.email}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {app.batch?.course?.title} • ₹{app.calculatedFeeInr}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {app.currentStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Website Inquiries
              </h2>
              <span className="text-[11px] text-slate-500">From public enquiry modal and contact page</span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">No inquiries received yet.</div>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq: any) => (
                <div
                  key={inq.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#14263C]/50 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {inq.fullName} {inq.institutionName && `(${inq.institutionName})`}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate max-w-xs block">
                      {inq.inquiryType.replace('_', ' ')} • {inq.message}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 shrink-0">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
