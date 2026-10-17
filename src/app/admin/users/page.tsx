'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  UserCheck,
  RefreshCw,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    const url = roleFilter === 'ALL'
      ? '/api/admin/users'
      : `/api/admin/users?role=${roleFilter}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => {
        setUsers(d.users || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load user accounts. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [roleFilter]);

  useEffect(() => {
    return loadUsers();
  }, [loadUsers]);

  const handleToggleActive = async (userId: string, currentActive: boolean) => {
    setActionLoading(userId);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: userId,
          isActive: !currentActive,
        }),
      });

      const d = await res.json();
      if (!res.ok) {
        throw new Error(d.error || 'Failed to update user status.');
      }

      setStatusMessage({
        type: 'success',
        text: `User account ${!currentActive ? 'activated' : 'deactivated'}.`,
      });
      loadUsers();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating user.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: userId,
          role: newRole,
        }),
      });

      const d = await res.json();
      if (!res.ok) {
        throw new Error(d.error || 'Failed to update user role.');
      }

      setStatusMessage({
        type: 'success',
        text: `User role updated to ${newRole}.`,
      });
      loadUsers();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error changing role.' });
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = u.profile?.fullName?.toLowerCase() || '';
    const email = u.email?.toLowerCase() || '';
    const phone = u.phone?.toLowerCase() || '';
    return name.includes(q) || email.includes(q) || phone.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          User Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Role-based access control, account status enforcement, and student profile verification
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
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT_LEARNER">STUDENT_LEARNER</option>
            <option value="STAFF_TRAINER">STAFF_TRAINER</option>
            <option value="SYSTEM_ADMIN">SYSTEM_ADMIN</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        {error ? (
          <div className="py-16 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
            <button
              onClick={loadUsers}
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
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">User Name & Contact</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">City / Inst</th>
                  <th className="py-3 px-4">Apps / Docs</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {u.profile?.fullName || 'No profile name'}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{u.email || u.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        disabled={actionLoading === u.id}
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                        className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white outline-none"
                      >
                        <option value="STUDENT_LEARNER">STUDENT_LEARNER</option>
                        <option value="STAFF_TRAINER">STAFF_TRAINER</option>
                        <option value="SYSTEM_ADMIN">SYSTEM_ADMIN</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {u.profile?.city || 'Pune'} {u.profile?.institutionName && `• ${u.profile.institutionName}`}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {u._count?.applications || 0} apps • {u._count?.documents || 0} docs
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.isActive
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}
                      >
                        {u.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        disabled={actionLoading === u.id}
                        onClick={() => handleToggleActive(u.id, u.isActive)}
                        className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                          u.isActive
                            ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                            : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                        }`}
                      >
                        {u.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
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
