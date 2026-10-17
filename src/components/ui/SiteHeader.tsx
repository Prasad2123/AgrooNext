'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Sprout } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { ThemeToggle } from './ThemeToggle';
import { useEnquiryModal } from '../../context/ModalContext';

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Programmes', href: '#programmes' },
    { name: 'Learning Approach', href: '#approach' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#070D1E]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-md py-3'
          : 'bg-gradient-to-b from-white/95 dark:from-[#070D1E]/95 to-transparent py-4 sm:py-5'
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
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-200/90 dark:border-[#00897B]/40 group-hover:border-[#00897B] transition-colors shadow-sm bg-white p-0.5 shrink-0 flex items-center justify-center">
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
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-100/90 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Enquiry Modal Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Portal Login Link */}
            <Link
              href="/login"
              className="hidden sm:inline-flex py-2 px-3 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#00897B] dark:hover:text-[#4DD0E1] transition-colors"
            >
              Sign In
            </Link>

            {/* Desktop Enquiry Button */}
            <PrimaryButton
              onClick={() => openModal('general_enquiry')}
              className="hidden sm:inline-flex py-2.5 px-4 text-xs lg:text-sm rounded-xl shadow-md"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Enquire Now
            </PrimaryButton>

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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#00897B]/20 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-200 dark:border-white/10 space-y-2">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
