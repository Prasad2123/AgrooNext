import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, Phone, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-xl w-full text-center space-y-8 bg-white dark:bg-[#0A1428] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-[#00897B]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Brand Lockup */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center mb-4 shadow-sm">
            <Image
              src="/logo.png"
              alt="AgrooNext Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] tracking-widest uppercase">
            Error 404
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            The page you are looking for does not exist, has been relocated, or is temporarily unavailable. Please check the URL or use the navigation options below.
          </p>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00796B] hover:from-[#2E7D32] hover:via-[#009688] hover:to-[#00897B] shadow-md shadow-[#1B5E20]/20 transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/programmes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 transition-all text-sm"
          >
            <Compass className="w-4 h-4 text-[#00897B]" />
            <span>Explore Programmes</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <Link href="/courses" className="text-[#00897B] hover:underline">
              Course Catalogue
            </Link>
            <span>•</span>
            <Link href="/training-formats" className="text-[#00897B] hover:underline">
              Training Formats & Fees
            </Link>
            <span>•</span>
            <Link href="/faq" className="text-[#00897B] hover:underline">
              FAQs
            </Link>
            <span>•</span>
            <Link href="/contact" className="text-[#00897B] hover:underline">
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
