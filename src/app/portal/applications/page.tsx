'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Plus,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  RefreshCw,
} from 'lucide-react';

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Form states for new application
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadApplications = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    fetch('/api/portal/applications', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setApplications(data.applications || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load applications. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const loadBatches = useCallback(() => {
    fetch('/api/admin/batches')
      .then((res) => {
        if (res.ok) return res.json();
        return { batches: [] };
      })
      .then((data) => {
        setBatches(data.batches || []);
        if (data.batches?.length > 0) {
          setSelectedBatchId(data.batches[0].id);
        }
      })
      .catch((err) => console.error('Failed to load batches', err));
  }, []);

  useEffect(() => {
    loadBatches();
    if (searchParams.get('action') === 'new') {
      setShowNewModal(true);
    }
  }, [searchParams, loadBatches]);

  useEffect(() => {
    return loadApplications();
  }, [loadApplications]);

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      const selectedBatch = batches.find((b) => b.id === selectedBatchId);
      if (!selectedBatch || !selectedBatch.course?.pricingTiers?.[0]?.id) {
        throw new Error('Please select a valid scheduled batch with active pricing.');
      }

      const pricingTierId = selectedBatch.course.pricingTiers[0].id;

      const res = await fetch('/api/portal/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: selectedBatchId,
          pricingTierId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setShowNewModal(false);
      loadApplications();
    } catch (err: any) {
      setFormError(err.message || 'Error submitting application.');
    } finally {
      setSubmitting(false);
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

  const selectedBatchObj = batches.find((b) => b.id === selectedBatchId);
  const authoritativeFee = selectedBatchObj?.course?.pricingTiers?.[0]?.baseFeeInr || 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            My Course Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your admissions lifecycle through the 12-state FSM verification workflow
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Applications List */}
      {error ? (
        <div className="bg-white dark:bg-[#0D1B2A] border border-rose-200 dark:border-rose-900/60 rounded-3xl p-12 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-4">{error}</p>
          <button
            onClick={loadApplications}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00897B] text-white text-xs font-semibold hover:bg-[#007367] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Loading
          </button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No course applications found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            You haven&apos;t applied to any AgrooNext training programmes yet.
          </p>
          <button
            onClick={() => setShowNewModal(true)}
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your First Application</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-[#00897B]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                      {app.applicationNumber}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-slate-500">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {app.batch?.course?.title}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${getStatusBadge(
                    app.currentStatus
                  )}`}
                >
                  {app.currentStatus.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00897B]" />
                  <span>
                    Batch: {app.batch?.batchCode} ({new Date(app.batch?.startDate).toLocaleDateString()})
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{app.batch?.venueType} (Pune)</span>
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Fee: ₹{app.calculatedFeeInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {app.auditTrail?.length || 1} audit event(s) recorded
                </span>
                <Link
                  href={`/portal/applications/${app.id}`}
                  className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] hover:underline inline-flex items-center gap-1"
                >
                  <span>View Full Timeline & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Application Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowNewModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white mb-1">
              Apply for Course
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Choose a scheduled training batch in Pune and submit for verification
            </p>

            {formError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Scheduled Batch *
                </label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.course?.title} — Batch {b.batchCode} ({new Date(b.startDate).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Authoritative pricing preview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Course Code:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedBatchObj?.course?.courseCode || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedBatchObj?.course?.standardDuration || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Authoritative Fee:</span>
                  <span className="font-extrabold text-base text-[#00897B] dark:text-[#4DD0E1]">
                    ₹{authoritativeFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-white/5">
                  * Fee calculated from authoritative pricing tiers. Tax treatment: Inclusive or exempt pending formal tax advisor approval.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
