'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  UserCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Building,
  MapPin,
  RefreshCw,
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'PREFER_NOT_TO_SAY',
    dateOfBirth: '',
    educationLevel: '',
    institutionName: '',
    guardianName: '',
    guardianContact: '',
    city: 'Pune',
    state: 'Maharashtra',
  });

  const loadProfile = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    fetch('/api/portal/profile', { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
        return res.ok ? res.json() : null;
      })
      .then((data) => {
        if (data?.profile) {
          setProfile(data.profile);
          setFormData({
            fullName: data.profile?.fullName || '',
            gender: data.profile?.gender || 'PREFER_NOT_TO_SAY',
            dateOfBirth: data.profile?.dateOfBirth ? data.profile.dateOfBirth.slice(0, 10) : '',
            educationLevel: data.profile?.educationLevel || '',
            institutionName: data.profile?.institutionName || '',
            guardianName: data.profile?.guardianName || '',
            guardianContact: data.profile?.guardianContact || '',
            city: data.profile?.city || 'Pune',
            state: data.profile?.state || 'Maharashtra',
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load profile details. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadProfile();
  }, [loadProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      setProfile(data.profile);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error saving profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <div className="py-20 text-center max-w-3xl mx-auto">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
        <button
          onClick={loadProfile}
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
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="h-8 w-48 bg-slate-200 dark:bg-white/10 rounded-xl animate-pulse" />
        <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
            <div className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
          </div>
          <div className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Learner Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal and academic details for certificate issuance and training records
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

      {/* Account Info Card */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Account Credentials
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Registered Email</span>
            <span className="font-semibold text-slate-900 dark:text-white">{profile?.user?.email || '—'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Registered Phone</span>
            <span className="font-semibold text-slate-900 dark:text-white">{profile?.user?.phone || '—'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Assigned Role</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{profile?.user?.role}</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Legal Name (as shown on Certificates) *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Education Level
              </label>
              <input
                type="text"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                placeholder="e.g. Undergraduate / B.Sc Agri"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Institution / College Name
              </label>
              <input
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="College or School name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Guardian / Emergency Contact Name
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Guardian Phone Number
              </label>
              <input
                type="text"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-[#00897B]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
