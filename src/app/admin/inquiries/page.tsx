'use client';

import React, { useState, useEffect, useCallback } from 'react';

import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadInquiries = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const url =
      statusFilter === 'ALL'
        ? '/api/admin/inquiries'
        : `/api/admin/inquiries?status=${statusFilter}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => {
        setInquiries(d.inquiries ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load inquiries. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [statusFilter]);

  useEffect(() => {
    return loadInquiries();
  }, [loadInquiries]);

  const handleUpdateStatus = async (inquiryId: string, newStatus: string) => {
    setUpdatingId(inquiryId);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId, status: newStatus }),
      });
      if (res.ok) {
        loadInquiries();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = inq.fullName?.toLowerCase() || '';
    const email = inq.email?.toLowerCase() || '';
    const inst = inq.institutionName?.toLowerCase() || '';
    return name.includes(q) || email.includes(q) || inst.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Inquiries Inbox
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review authentic inquiries submitted by visitors, students, and institutions via public forms
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search name, email, institution..."
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
            <option value="ALL">All Inquiry Statuses</option>
            <option value="NEW">NEW</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {error ? (
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button onClick={loadInquiries} className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors">Retry</button>
          </div>
        ) : loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center text-xs text-slate-500">
            No inquiries match your query.
          </div>
        ) : (
          filtered.map((inq) => (
            <div
              key={inq.id}
              className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {inq.fullName}
                    </span>
                    {inq.institutionName && (
                      <span className="text-xs text-slate-500">
                        ({inq.institutionName})
                      </span>
                    )}
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {inq.inquiryType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{inq.email}</span>
                    </span>
                    {inq.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{inq.phone}</span>
                      </span>
                    )}
                    <span className="text-slate-400">
                      {new Date(inq.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-semibold text-slate-400">Status:</span>
                  <select
                    disabled={updatingId === inq.id}
                    value={inq.status}
                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#14263C]/40 p-3 rounded-xl border border-slate-200/60 dark:border-white/5">
                {inq.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
