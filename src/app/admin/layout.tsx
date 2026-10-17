'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck2,
  Banknote,
  CalendarDays,
  GraduationCap,
  MessageSquare,
  ShieldAlert,
  Users,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  profile?: {
    fullName: string;
  };
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data.user.role !== 'SYSTEM_ADMIN' && data.user.role !== 'STAFF_TRAINER') {
          router.push('/portal/dashboard');
          return;
        }
        setUser(data.user);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    checkAdminAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      router.push('/login');
    }
  };

  const navItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Applications Queue', href: '/admin/applications', icon: FileCheck2 },
    { name: 'Payment Reconciliation', href: '/admin/payments', icon: Banknote },
    { name: 'Batches & Scheduling', href: '/admin/batches', icon: CalendarDays },
    { name: 'Courses & Pricing', href: '/admin/courses', icon: GraduationCap },
    { name: 'Inquiries Inbox', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
    { name: 'User Management', href: '/admin/users', icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070D1E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#00897B] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Verifying Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070D1E] text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-[#0D1B2A] border-r border-slate-200 dark:border-white/10 flex-col justify-between p-4 shrink-0">
        <div className="space-y-6">
          {/* Logo & Lockup */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 shadow-sm border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="AgrooNext Official Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold font-display text-base tracking-tight text-slate-900 dark:text-white block leading-none">
                AgrooNext
              </span>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00897B] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User bar & Theme */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                {user?.profile?.fullName || user?.email}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                {user?.role}
              </span>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Topbar */}
        <header className="lg:hidden bg-white dark:bg-[#0D1B2A] border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-extrabold font-display text-base text-slate-900 dark:text-white">
              AgrooNext Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0D1B2A] border-b border-slate-200 dark:border-white/10 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-[#00897B] text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
