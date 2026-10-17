'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Banknote,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  RefreshCw,
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadPayments = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    const url =
      statusFilter === 'ALL'
        ? '/api/admin/payments'
        : `/api/admin/payments?status=${statusFilter}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) throw new Error('Access denied: Administrator privileges required.');
          throw new Error(`Server error (HTTP ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setPayments(data.payments ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load payment records. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [statusFilter]);

  useEffect(() => {
    return loadPayments();
  }, [loadPayments]);

  const handleReconcile = async (paymentId: string, action: 'CONFIRM' | 'REJECT') => {
    if (!confirm(`Are you sure you want to ${action.toLowerCase()} this payment transaction?`)) return;

    setActionLoading(paymentId);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, action }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reconcile payment.');
      }

      setStatusMessage({
        type: 'success',
        text: `Payment ${action === 'CONFIRM' ? 'confirmed & reconciled' : 'rejected'}. ${
          action === 'CONFIRM' ? `Official receipt ${data.payment.receiptNumber} issued & learner enrolled.` : ''
        }`,
      });
      loadPayments();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error reconciling payment.' });
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = payments.filter((p) => p.paymentStatus === 'PENDING').length;

  // Table skeleton rows
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Payment Reconciliation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review submitted bank UTR references, verify fee clearances, and issue official sequential receipts
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="ALL">All Payments</option>
            <option value="PENDING">PENDING (Awaiting Review)</option>
            <option value="CONFIRMED">CONFIRMED (Reconciled)</option>
            <option value="FAILED">FAILED / REJECTED</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          {!loading && (
            <span className="text-xs text-slate-400">
              <strong>{pendingCount}</strong> pending reconciliation
            </span>
          )}
          <button
            onClick={loadPayments}
            disabled={loading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-12 text-center">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button
              onClick={loadPayments}
              className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Receipt #</th>
                  <th className="py-3 px-4">Learner / Application</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">UTR Reference</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-xs text-slate-500">
                      No payments found for this filter. Payments will appear here once learners submit UTR references.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                        {p.receiptNumber ?? '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {p.application?.user?.profile?.fullName || 'Enrolled Student'}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          App #{p.application?.applicationNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {p.application?.batch?.course?.title || 'Course'}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        ₹{(p.amountInr ?? 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        {p.paymentMethod?.replace('OFFLINE_', '').replace('_', ' ') ?? '—'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {p.transactionReference || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.paymentStatus === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : p.paymentStatus === 'PENDING'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}
                        >
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {p.paymentStatus === 'PENDING' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              disabled={actionLoading === p.id}
                              onClick={() => handleReconcile(p.id, 'CONFIRM')}
                              className="py-1 px-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors inline-flex items-center gap-1 shadow-sm disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Confirm</span>
                            </button>
                            <button
                              type="button"
                              disabled={actionLoading === p.id}
                              onClick={() => handleReconcile(p.id, 'REJECT')}
                              className="py-1 px-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            {p.reconciledAt
                              ? `Reconciled ${new Date(p.reconciledAt).toLocaleDateString()}`
                              : 'Processed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
