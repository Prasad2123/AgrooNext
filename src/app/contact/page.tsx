import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactSection } from '@/components/sections/ContactSection';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Admissions | AgrooNext — Agro-Tech & Training',
  description:
    'Submit an enquiry for upcoming AgrooNext training batches or request an institutional turnkey agro-technology workshop in Maharashtra.',
};

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Contact & Admissions' }]} />

        {/* Reused Contact Section Form */}
        <ContactSection isStandalonePage={true} />

        {/* Direct Contact Context Cards */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#00897B]/10 text-[#00897B] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Demonstration Facility
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AgrooNext Training & Research Labs, Pune District, Maharashtra, India.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1E88E5]/10 text-[#1E88E5] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Admissions Desk Hours
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monday through Saturday: 9:00 AM – 6:00 PM IST. Enquiries reviewed within 24 business hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#FB8C00]/10 text-[#FB8C00] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Admissions Integrity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No registration fees or seat reservations are collected without authorized batch confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
