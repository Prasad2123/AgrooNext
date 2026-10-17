'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Code,
  User,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionFilter, setActionFilter] = useState('ALL');

  const loadLogs = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    const url = `/api/admin/audit-logs?page=${page}&limit=25${actionFilter !== 'ALL' ? `&action=${actionFilter}` : ''}`;
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => {
        setLogs(d.logs || []);
        setTotalPages(d.pagination?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load audit logs. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [page, actionFilter]);

  useEffect(() => {
    return loadLogs();
  }, [loadLogs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Immutable Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cryptographically referenced audit trail recording every state change, fee update, payment reconciliation, and administrative mutation
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Action Filter:</span>
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="ALL">All Actions</option>
            <option value="STATUS_CHANGED">STATUS_CHANGED</option>
            <option value="PAYMENT_CONFIRMED">PAYMENT_CONFIRMED</option>
            <option value="PRICING_UPDATED">PRICING_UPDATED</option>
            <option value="DOCUMENT_UPLOADED">DOCUMENT_UPLOADED</option>
            <option value="INQUIRY_STATUS_UPDATED">INQUIRY_STATUS_UPDATED</option>
            <option value="USER_UPDATED">USER_UPDATED</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="py-1 px-3 rounded-lg border border-slate-200 dark:border-white/10 disabled:opacity-40"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="py-1 px-3 rounded-lg border border-slate-200 dark:border-white/10 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-16 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
            <button
              onClick={loadLogs}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00897B] text-white text-xs font-semibold hover:bg-[#007367] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Loading
            </button>
          </div>
        ) : loading ? (
          <div className="py-8 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">No audit logs found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Mutation Details</th>
                  <th className="py-3 px-4 rounded-r-xl">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-sans text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {log.user?.profile?.fullName || log.user?.email || 'System'}
                      </span>
                      <span className="text-[10px] text-slate-400">{log.user?.role || 'SYSTEM'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00897B]/10 text-[#00897B] dark:text-[#4DD0E1]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-900 dark:text-white font-semibold">
                        {log.entityName}
                      </span>
                      {log.entityId && (
                        <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                          {log.entityId}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-sans text-xs max-w-xs">
                      {log.newState ? (
                        <span className="truncate block text-slate-600 dark:text-slate-400">
                          {log.newState}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
