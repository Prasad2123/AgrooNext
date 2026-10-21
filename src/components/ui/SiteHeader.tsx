'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight, Sprout, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { ThemeToggle } from './ThemeToggle';
import { useEnquiryModal } from '../../context/ModalContext';

interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  role: string;
  fullName?: string;
}

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check auth session safely without blocking public rendering
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setUser(data.user || null);
          }
        }
      } catch {
        if (isMounted) setUser(null);
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programmes', href: '/programmes' },
    { name: 'Learning Approach', href: '/learning-approach' },
    { name: 'Contact', href: '/contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const dashboardUrl =
    user?.role === 'SYSTEM_ADMIN' || user?.role === 'STAFF_TRAINER'
      ? '/admin/dashboard'
      : '/portal/dashboard';

  const dashboardLabel =
    user?.role === 'SYSTEM_ADMIN' || user?.role === 'STAFF_TRAINER'
      ? 'Admin Console'
      : 'Learner Portal';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md shadow-sm border-slate-200/80 dark:border-white/10 py-3'
          : 'bg-white/90 dark:bg-[#070D1E]/90 backdrop-blur-md border-slate-200/40 dark:border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] rounded-xl p-1"
            aria-label="AgrooNext — Agro-Tech & Training Homepage"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-200/90 dark:border-[#00897B]/40 group-hover:border-[#00897B] transition-colors shadow-sm bg-white p-1 shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="AgrooNext Official Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-[#00897B] transition-colors">
                AgrooNext
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#00897B] dark:text-[#4DD0E1] tracking-[0.14em] uppercase mt-1">
                AGRO-TECH & TRAINING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-100/90 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                    active
                      ? 'bg-gradient-to-r from-[#1B5E20] to-[#00897B] text-white shadow-sm font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Authentication-Aware Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Authentication-Aware Navigation Controls */}
            {user ? (
              // Authenticated User State: Hide Sign In & Enquire Now; Show Dashboard & Sign Out
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href={dashboardUrl}
                  className="inline-flex items-center gap-1.5 py-2 px-3.5 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#00897B] to-[#00695C] hover:from-[#00796B] hover:to-[#004D40] rounded-xl shadow-sm transition-colors"
                  title={user.fullName || user.email || 'My Account'}
                >
                  {user.role === 'SYSTEM_ADMIN' ? (
                    <Shield className="w-3.5 h-3.5" />
                  ) : (
                    <LayoutDashboard className="w-3.5 h-3.5" />
                  )}
                  <span>{dashboardLabel}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Default Unauthenticated State: Show Sign In & Enquire Now immediately
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex py-2 px-3 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#00897B] dark:hover:text-[#4DD0E1] transition-colors"
                >
                  Sign In
                </Link>

                <PrimaryButton
                  onClick={() => openModal('general_enquiry')}
                  className="hidden sm:inline-flex py-2.5 px-4 text-xs lg:text-sm rounded-xl shadow-md"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Enquire Now
                </PrimaryButton>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 hover:border-[#00897B]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      active
                        ? 'bg-gradient-to-r from-[#1B5E20] to-[#00897B] text-white font-semibold shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#00897B]/20'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${active ? 'opacity-100' : 'opacity-50'}`} />
                  </Link>
                );
              })}

              {/* Mobile Auth-aware links */}
              <div className="pt-3 mt-1 border-t border-slate-200 dark:border-white/10 space-y-2">
                {user ? (
                  <>
                    <Link
                      href={dashboardUrl}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-[#00897B] to-[#00695C] hover:from-[#00796B] transition-colors block shadow-md"
                    >
                      Go to {dashboardLabel}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out ({user.fullName || user.email})</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors block"
                    >
                      Sign In to Learner Portal
                    </Link>
                    <PrimaryButton
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openModal('general_enquiry');
                      }}
                      className="w-full justify-center py-3"
                      icon={<Sprout className="w-4 h-4" />}
                    >
                      Enquire About Training
                    </PrimaryButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
