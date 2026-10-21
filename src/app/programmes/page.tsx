import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { PROGRAMMES_DATA } from '@/data/programmes';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Droplet,
  Wind,
  CircleDot,
  Fish,
  Briefcase,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programmes Overview | AgrooNext — Agro-Tech & Training',
  description:
    'Explore our five core agricultural training disciplines: Hydroponics, Aeroponics, Mushroom Cultivation, Aquaculture, and Women in Agri-Enterprise.',
};

const getProgrammeIcon = (id: string) => {
  switch (id) {
    case 'hydroponics':
      return <Droplet className="w-5 h-5 text-[#00897B]" />;
    case 'aeroponics':
      return <Wind className="w-5 h-5 text-[#00ACC1]" />;
    case 'mushroom_farming':
      return <CircleDot className="w-5 h-5 text-[#FB8C00]" />;
    case 'aquaculture':
      return <Fish className="w-5 h-5 text-[#1E88E5]" />;
    case 'women_empowerment':
      return <Briefcase className="w-5 h-5 text-[#C2185B]" />;
    default:
      return <Layers className="w-5 h-5 text-[#00897B]" />;
  }
};

export default function ProgrammesPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Programmes Overview' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Curricular Portfolio"
            badgeColor="teal"
            title={
              <>
                Five Disciplines of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                  Practical Modern Agro-Technology
                </span>
              </>
            }
            subtitle="Explore our structured training programmes engineered to deliver verifiable technical competency, laboratory rigor, and enterprise readiness."
          />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Available across single-day crash courses, 5-day deep-dive topic certificates, the 3-week complete package, and turnkey institutional campus workshops.
          </p>
        </div>

        {/* 5 Programmes Grid Showcase */}
        <div className="space-y-12">
          {PROGRAMMES_DATA.map((prog, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={prog.id}
                className="bg-white dark:bg-[#0A1428] rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Photo Column */}
                  <div
                    className={`lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden ${
                      isEven ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={prog.heroImage}
                      alt={prog.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#070D1E]/95 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white shadow-md">
                        {getProgrammeIcon(prog.id)}
                        <span>{prog.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                      isEven ? 'lg:order-1' : ''
                    }`}
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
                          {prog.tagline}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                          {prog.name}
                        </h2>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {prog.fullDescription}
                      </p>

                      {/* Key Learning Modules List */}
                      <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Core Technical Syllabus Areas:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {prog.learningAreas.slice(0, 4).map((area) => (
                            <div
                              key={area.title}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{area.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Capstone Preview */}
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
                        <strong className="text-amber-800 dark:text-amber-300 font-semibold block mb-0.5">
                          Practical Capstone Requirement:
                        </strong>
                        <p className="italic">“{prog.capstone}”</p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4 text-[#FB8C00] shrink-0" />
                        <span>{prog.deliveryLevels}</span>
                      </div>

                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <Link
                          href={`/programmes/${prog.slug}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00897B] hover:bg-[#00796B] shadow-sm transition-all"
                        >
                          <span>Explore {prog.name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Catalogue Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#4DD0E1]" />
            <span>Structured Multi-Tier Offerings</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Compare All Course Formats, Durations & Fees
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you want a 1-day crash course, a 5-day skill certification, the comprehensive 3-week diploma package, or an on-campus institutional workshop, view our complete transparent schedule.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PrimaryButton href="/courses" icon={<ArrowRight className="w-4 h-4" />}>
              Open Course Catalogue
            </PrimaryButton>
            <Link
              href="/training-formats"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <span>View Training Formats & Fees</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
