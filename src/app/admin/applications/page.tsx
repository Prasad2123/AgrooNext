'use client';

import React, { useState, useEffect, useCallback } from 'react';

import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Clock,
  Shield,
  Eye,
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Transition Dialog state
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [targetStatus, setTargetStatus] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  const loadApplications = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const url =
      statusFilter === 'ALL'
        ? '/api/admin/applications'
        : `/api/admin/applications?status=${statusFilter}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setApplications(data.applications ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load applications. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [statusFilter]);

  useEffect(() => {
    return loadApplications();
  }, [loadApplications]);

  // Approved 12-state FSM Transition Mapping
  const getAllowedTransitions = (current: string): string[] => {
    switch (current) {
      case 'DRAFT':
        return ['SUBMITTED', 'CANCELLED'];
      case 'SUBMITTED':
        return ['UNDER_REVIEW', 'REJECTED', 'CANCELLED'];
      case 'UNDER_REVIEW':
        return ['APPROVED', 'WAITLISTED', 'REJECTED', 'CANCELLED'];
      case 'WAITLISTED':
        return ['APPROVED', 'CANCELLED'];
      case 'APPROVED':
        return ['PAYMENT_PENDING', 'CANCELLED'];
      case 'PAYMENT_PENDING':
        return ['PAYMENT_CONFIRMED', 'CANCELLED'];
      case 'PAYMENT_CONFIRMED':
        return ['ENROLLED'];
      case 'ENROLLED':
        return ['IN_TRAINING', 'CANCELLED'];
      case 'IN_TRAINING':
        return ['COMPLETED'];
      default:
        return [];
    }
  };

  const handleOpenTransitionModal = (app: any) => {
    setSelectedApp(app);
    setStatusError(null);
    setReviewNotes('');
    const allowed = getAllowedTransitions(app.currentStatus);
    setTargetStatus(allowed[0] || '');
  };

  const handleExecuteTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !targetStatus) return;

    setSubmitting(true);
    setStatusError(null);

    try {
      const res = await fetch(`/api/admin/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetStatus,
          comments: reviewNotes || `Admin transitioned application to ${targetStatus}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update application status.');
      }

      setSelectedApp(null);
      loadApplications();
    } catch (err: any) {
      setStatusError(err.message || 'Error updating status.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredApps = applications.filter((app) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = app.user?.profile?.fullName?.toLowerCase() || '';
    const email = app.user?.email?.toLowerCase() || '';
    const num = app.applicationNumber?.toLowerCase() || '';
    return name.includes(q) || email.includes(q) || num.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Applications Review Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review learner admissions and enforce strict state machine transitions with audit logs
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by student, email, #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="ALL">All Application States</option>
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
            <option value="APPROVED">APPROVED</option>
            <option value="WAITLISTED">WAITLISTED</option>
            <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
            <option value="PAYMENT_CONFIRMED">PAYMENT_CONFIRMED</option>
            <option value="ENROLLED">ENROLLED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button onClick={loadApplications} className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors">Retry</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Application #</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Course & Batch</th>
                  <th className="py-3 px-4">Fee (INR)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="py-3 px-4"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" /></td>
                      ))}
                    </tr>
                  ))
                ) : filteredApps.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center text-xs text-slate-500">No applications match your filter criteria.</td></tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {app.user?.profile?.fullName || 'Anonymous'}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{app.user?.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {app.batch?.course?.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Batch: {app.batch?.batchCode}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        ₹{app.calculatedFeeInr.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          {app.currentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenTransitionModal(app)}
                          className="py-1 px-3 rounded-lg text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors"
                        >
                          Review Status
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Transition Dialog Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold font-display text-slate-900 dark:text-white">
              Application Status Transition
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Enforcing PRD 12-state FSM state machine with mandatory audit comments
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5 text-xs mb-4 space-y-1">
              <div>
                <strong>Applicant:</strong> {selectedApp.user?.profile?.fullName || selectedApp.user?.email}
              </div>
              <div>
                <strong>Course:</strong> {selectedApp.batch?.course?.title}
              </div>
              <div>
                <strong>Current State:</strong>{' '}
                <span className="font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                  {selectedApp.currentStatus}
                </span>
              </div>
            </div>

            {statusError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{statusError}</span>
              </div>
            )}

            {getAllowedTransitions(selectedApp.currentStatus).length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 text-center">
                This application is in a terminal state (<code>{selectedApp.currentStatus}</code>). No further state transitions are permitted by the FSM engine.
              </div>
            ) : (
              <form onSubmit={handleExecuteTransition} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Permitted Target State *
                  </label>
                  <select
                    value={targetStatus}
                    onChange={(e) => setTargetStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  >
                    {getAllowedTransitions(selectedApp.currentStatus).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Administrative Review Notes (Audit Trail) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter reason or verification notes for this state transition..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !targetStatus}
                    className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {submitting ? 'Updating...' : `Confirm Transition to ${targetStatus}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
