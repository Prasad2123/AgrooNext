import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, Shield, ArrowUp, Compass, BookOpen, HelpCircle, Phone } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#050914] border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 relative overflow-hidden transition-colors duration-200">
      {/* Decorative gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00897B]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#00897B]/40 shadow-sm bg-white p-0.5 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="AgrooNext Official Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-[#00897B] transition-colors">
                  AgrooNext
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#00897B]">
                  AGRO-TECH & TRAINING
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Empowering learners, rural youth, women self-help groups, and aspiring agri-entrepreneurs through hands-on practical training in soilless cultivation, aeroponics, mushroom farming, and aquaculture.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00897B]/10 dark:bg-[#00897B]/15 border border-[#00897B]/30 text-[#00897B] text-xs font-semibold">
                Agro-Tech Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C2185B]/10 dark:bg-[#C2185B]/15 border border-[#C2185B]/30 text-[#C2185B] text-xs font-semibold">
                Social Outreach by Naree Foundation
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00897B]" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  About AgrooNext
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Programmes Overview
                </Link>
              </li>
              <li>
                <Link href="/learning-approach" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Learning Approach
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Course Catalogue
                </Link>
              </li>
              <li>
                <Link href="/training-formats" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Training Formats & Fees
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00897B] dark:hover:text-white transition-colors">
                  Contact & Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* 5 Core Programmes */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#2E7D32]" />
              Core Disciplines
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/programmes/hydroponics"
                  className="hover:text-[#00897B] dark:hover:text-white transition-colors"
                >
                  Hydroponics
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes/aeroponics"
                  className="hover:text-[#00897B] dark:hover:text-white transition-colors"
                >
                  Aeroponics
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes/mushroom-farming"
                  className="hover:text-[#00897B] dark:hover:text-white transition-colors"
                >
                  Mushroom Farming
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes/aquaculture"
                  className="hover:text-[#00897B] dark:hover:text-white transition-colors"
                >
                  Aquaculture & Biofloc
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes/women-empowerment"
                  className="hover:text-[#00897B] dark:hover:text-white transition-colors"
                >
                  Women in Agri-Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Integrity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FB8C00]" />
              Educational Mission
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Committed to scientific training integrity and authentic practical exposure. No curative medical claims or unapproved statutory degree claims are made.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#00897B] hover:text-[#00796B] dark:hover:text-white transition-colors font-semibold"
              >
                <span>Learner Portal Login →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mandatory Policy Disclaimers Banner */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 space-y-3">
          <p className="bg-slate-200/60 dark:bg-[#0F2C59]/40 p-4 rounded-xl border border-slate-300/60 dark:border-white/5 leading-relaxed text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-slate-100">Mandatory Educational & Health Notice:</strong> Training programmes and materials are educational in nature. Produce and agricultural systems are not medical treatments or disease cures. Educational materials describe nutrients, scientific research, and practical cultivation techniques; they do not establish that food replaces clinical medical treatment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-slate-500 dark:text-slate-500">
            <p>© {new Date().getFullYear()} AgrooNext — Agro-Tech & Training. Supported by Naree Foundation social outreach. All rights reserved.</p>
            <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Agro-Tech & Practical Modern Farming Training • Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
