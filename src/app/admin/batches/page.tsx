'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  CalendarDays,
  Plus,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    courseId: '',
    batchCode: '',
    startDate: '',
    endDate: '',
    venueType: 'TRAINING_CENTER',
    venueAddress: 'Pune Training Facility, Agriculture College Grounds, Shivajinagar, Pune 411005',
    minimumCapacity: 5,
    maximumCapacity: 30,
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    Promise.all([
      fetch('/api/admin/batches', { signal: controller.signal }),
      fetch('/api/admin/courses', { signal: controller.signal }),
    ])
      .then(async ([batchRes, courseRes]) => {
        if (batchRes.ok) {
          const d = await batchRes.json();
          setBatches(d.batches ?? []);
        }
        if (courseRes.ok) {
          const cd = await courseRes.json();
          setCourses(cd.courses ?? []);
          if (cd.courses?.length > 0) {
            setFormData((prev) => ({ ...prev, courseId: cd.courses[0].id }));
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load batch data. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadData();
  }, [loadData]);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/admin/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create batch.');
      }

      setShowModal(false);
      loadData();
    } catch (err: any) {
      setFormError(err.message || 'Error creating batch.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Batches &amp; Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage cohort schedules, venue allocations in Pune, and student capacity ceilings
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Batch</span>
        </button>
      </div>

      {/* Batches Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button onClick={loadData} className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors">Retry</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Batch Code</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Enrolled / Cap</th>
                  <th className="py-3 px-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="py-3 px-4"><div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" /></td>
                      ))}
                    </tr>
                  ))
                ) : batches.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-xs text-slate-500">No training batches scheduled yet.</td></tr>
                ) : (
                  batches.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">{b.batchCode}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{b.course?.title}</td>
                      <td className="py-3 px-4">
                        {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold">{b.venueType}</span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-xs">{b.venueAddress}</span>
                      </td>
                      <td className="py-3 px-4 font-mono">{b._count?.enrollments ?? 0} / {b.maximumCapacity}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          {b.batchStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Schedule Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold font-display text-slate-900 dark:text-white">
              Schedule Training Batch
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Create a new training batch tied to an active curriculum course
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Course *
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.courseCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Batch Code (Unique Identifier) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BATCH-2026-HYD-02"
                  value={formData.batchCode}
                  onChange={(e) => setFormData({ ...formData, batchCode: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Venue Type
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  >
                    <option value="TRAINING_CENTER">Training Center (Pune)</option>
                    <option value="ON_SITE_INSTITUTION">On-site Institution</option>
                    <option value="HYBRID_LAB">Hybrid Lab</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formData.maximumCapacity}
                    onChange={(e) => setFormData({ ...formData, maximumCapacity: parseInt(e.target.value, 10) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Venue Address (DEC-020)
                </label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Schedule Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
