'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  FileText,
  User,
  Shield,
  XCircle,
} from 'lucide-react';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params?.id as string;

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function loadApplication() {
      try {
        const res = await fetch(`/api/portal/applications/${applicationId}`);
        if (!res.ok) {
          throw new Error('Application not found or unauthorized.');
        }
        const data = await res.json();
        setApplication(data.application);
      } catch (err: any) {
        setError(err.message || 'Failed to load application.');
      } finally {
        setLoading(false);
      }
    }
    if (applicationId) {
      loadApplication();
    }
  }, [applicationId]);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this application?')) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/portal/applications/${applicationId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to cancel application.');
      }
      // Reload
      const reload = await fetch(`/api/portal/applications/${applicationId}`);
      const data = await reload.json();
      setApplication(data.application);
    } catch (err: any) {
      alert(err.message || 'Error cancelling application.');
    } finally {
      setCancelling(false);
    }
  };

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

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="w-8 h-8 border-3 border-[#00897B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold uppercase tracking-wider">Loading application details...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="bg-white dark:bg-[#0D1B2A] border border-rose-200 dark:border-rose-900/60 rounded-3xl p-8 text-center max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Unable to Load Application</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">{error || 'Record does not exist.'}</p>
        <Link
          href="/portal/applications"
          className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </Link>
      </div>
    );
  }

  const canCancel = ['DRAFT', 'SUBMITTED'].includes(application.currentStatus);
  const canPay = ['APPROVED', 'PAYMENT_PENDING'].includes(application.currentStatus);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/applications"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                {application.applicationNumber}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500">
                Created {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-xl font-extrabold font-display text-slate-900 dark:text-white mt-0.5">
              {application.batch?.course?.title}
            </h1>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${getStatusBadge(
            application.currentStatus
          )}`}
        >
          {application.currentStatus.replace('_', ' ')}
        </span>
      </div>

      {/* Course & Batch Details Grid */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Course & Batch Configuration
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Course Code
            </span>
            <span className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-1 block">
              {application.batch?.course?.courseCode}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Batch Code
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">
              {application.batch?.batchCode}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Training Dates
            </span>
            <span className="text-xs font-semibold text-slate-900 dark:text-white mt-1 block">
              {new Date(application.batch?.startDate).toLocaleDateString()} —{' '}
              {new Date(application.batch?.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Authoritative Fee
            </span>
            <span className="text-base font-extrabold text-[#00897B] dark:text-[#4DD0E1] mt-0.5 block">
              ₹{application.calculatedFeeInr.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14263C]/40 border border-slate-200/80 dark:border-white/5 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
          <MapPin className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              Venue Location: {application.batch?.venueType}
            </span>
            <p className="mt-0.5 text-slate-500">{application.batch?.venueAddress}</p>
          </div>
        </div>

        {/* Enrollment Confirmation if active */}
        {application.enrollment && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Officially Enrolled</span>
                <span className="font-mono text-[11px]">
                  Enrollment Number: {application.enrollment.enrollmentNumber}
                </span>
              </div>
            </div>
            <Link
              href="/portal/payments"
              className="py-1.5 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
            >
              View Receipt
            </Link>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {canPay && (
            <Link
              href="/portal/payments"
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md inline-flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Payment (₹{application.calculatedFeeInr.toLocaleString('en-IN')})</span>
            </Link>
          )}

          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors inline-flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>{cancelling ? 'Cancelling...' : 'Cancel Application'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 12-State FSM Status Timeline */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
          Admissions Audit Trail & State Timeline
        </h2>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
          {application.auditTrail?.map((trail: any, index: number) => (
            <div key={trail.id || index} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#00897B] ring-4 ring-white dark:ring-[#0D1B2A]" />

              <div className="bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5 rounded-2xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Status changed to <code className="text-[#00897B] dark:text-[#4DD0E1]">{trail.newStatus}</code>
                    </span>
                    {trail.previousStatus && (
                      <span className="text-slate-400">(from {trail.previousStatus})</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(trail.createdAt).toLocaleString()}
                  </span>
                </div>

                {trail.comments && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {trail.comments}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
