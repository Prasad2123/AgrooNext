import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Building, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export const InstitutionalHomeSection: React.FC = () => {
  return (
    <SectionContainer id="institutional" glowEffect="teal" wrapperClassName="py-12 sm:py-16">
      <div className="bg-gradient-to-br from-slate-900 via-[#0A1428] to-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00897B]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#4DD0E1]">
              <Building className="w-3.5 h-3.5" />
              <span>Turnkey On-Campus Delivery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Bring Modern Agricultural Technology{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#81C784] via-[#4DD0E1] to-white">
                Directly to Your Campus
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              AgrooNext provides complete full-day experiential technology workshops delivered at your school or college campus. Our mobile faculty brings portable hydroponic channels, aeroponic mist towers, mushroom incubation bags, and water chemistry apparatus directly to your students.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#4DD0E1]">Schools (Grades 8–12)</span>
                  <span className="text-sm font-extrabold text-white">₹15,000 / day</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  STEM-aligned experiential workshop with live plant biology and water conservation exercises.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#4DD0E1]">Colleges & Universities</span>
                  <span className="text-sm font-extrabold text-white">₹25,000 / day</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rigorous engineering, biofloc microbial management, EC/pH chemistry, and agritech career counseling.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/training-formats"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00796B] hover:from-[#2E7D32] hover:via-[#009688] hover:to-[#00897B] transition-all duration-200 text-sm shadow-md"
              >
                <span>Institutional Formats & Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-white/10 hover:bg-white/20 transition-colors text-sm"
              >
                <span>Book a Campus Date</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Guarantees */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold font-display text-white">
              What the Turnkey Package Includes
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                <span>Certified AgrooNext technical instructors and laboratory demonstrators</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                <span>Working demonstration hardware (hydroponics, aeroponics, biofloc probes)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                <span>All consumables: nutrient solutions, test reagents, seeds, and PPE</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                <span>Digital study dossiers and participant certificates for all attending students</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
              * Minimum two-week advance notice required for campus apparatus scheduling and instructor booking.
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
