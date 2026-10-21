'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { FAQ_DATA, FAQ_CATEGORIES } from '@/data/faq';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Phone,
  ShieldAlert,
} from 'lucide-react';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-01': true,
    'faq-05': true,
  });

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        {/* Page Header */}
        <div className="text-center space-y-4">
          <SectionHeading
            centered
            badge="Knowledge Base"
            badgeColor="teal"
            title="Frequently Asked Questions"
            subtitle="Clear, documented answers regarding our training methodology, admission eligibility, course fees, laboratory safety, and certification standards."
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All responses reflect approved project documentation and educational governance policies.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00897B] text-white shadow-sm scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            const contentId = `faq-content-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#0A1428] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-200"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-display leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#00897B]/10 text-[#00897B]' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 space-y-3 animate-fade-in"
                  >
                    <p>{faq.answer}</p>
                    {faq.sourceRef && (
                      <span className="inline-block text-[10px] uppercase font-mono text-slate-400">
                        Reference: {faq.sourceRef}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have More Questions Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2C59] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Have a Specific Question Not Listed Here?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Our admissions staff and training faculty in Pune are ready to assist with individual batch dates or institutional requirements.
          </p>
          <div className="pt-2">
            <PrimaryButton href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Contact Admissions Desk
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
