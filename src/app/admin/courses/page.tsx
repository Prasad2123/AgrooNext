'use client';

import React, { useState, useEffect, useCallback } from 'react';

import {
  GraduationCap,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Shield,
  Layers,
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit fee modal
  const [editTier, setEditTier] = useState<any | null>(null);
  const [newFee, setNewFee] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadCourses = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    fetch('/api/admin/courses', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => {
        setCourses(d.courses ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load courses. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadCourses();
  }, [loadCourses]);

  const handleOpenEdit = (tier: any, courseTitle: string) => {
    setEditTier({ ...tier, courseTitle });
    setNewFee(tier.baseFeeInr);
    setStatusMessage(null);
  };

  const handleSaveFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTier) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pricingTierId: editTier.id,
          baseFeeInr: newFee,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update pricing tier.');
      }

      setStatusMessage({
        type: 'success',
        text: `Fee for ${editTier.courseTitle} updated to ₹${newFee.toLocaleString('en-IN')}. Change logged in audit trail.`,
      });
      setEditTier(null);
      loadCourses();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating fee.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Courses & Centralized Pricing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Authoritative fee repository and curriculum management. Every fee update is recorded in immutable audit logs.
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

      {/* Course List */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400 mb-4">{error}</p>
            <button onClick={loadCourses} className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors">Retry</button>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#14263C]/40 border border-slate-200/80 dark:border-white/5 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">No courses in database.</div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#14263C]/40 border border-slate-200/80 dark:border-white/5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#00897B] dark:text-[#4DD0E1]">
                        {course.courseCode}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-500 font-semibold">{course.offeringType}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {course.title}
                    </h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 self-start sm:self-auto">
                    Duration: {course.standardDuration}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {course.summary}
                </p>

                {/* Pricing Tiers Table */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Authoritative Pricing Tiers
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.pricingTiers?.map((tier: any) => (
                      <div
                        key={tier.id}
                        className="p-3 rounded-xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {tier.targetGroup}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Model: {tier.pricingModel}
                          </span>
                          <span className="text-sm font-extrabold text-[#00897B] dark:text-[#4DD0E1] block mt-1">
                            ₹{tier.baseFeeInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenEdit(tier, course.title)}
                          className="p-2 rounded-lg text-slate-400 hover:text-[#00897B] hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                          title="Edit Pricing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Fee Modal */}
      {editTier && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setEditTier(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold font-display text-slate-900 dark:text-white">
              Edit Authoritative Fee
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {editTier.courseTitle} ({editTier.targetGroup})
            </p>

            <form onSubmit={handleSaveFee} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Base Fee in INR *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newFee}
                  onChange={(e) => setNewFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300">
                <strong>Audit Requirement:</strong> This change updates the single source of truth for course pricing. All existing pending or new applications will reference this authoritative fee.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditTier(null)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Confirm Fee Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
