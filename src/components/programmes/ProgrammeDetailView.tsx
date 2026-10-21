'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProgrammeData } from '@/data/programmes';
import { COURSES_DATA } from '@/data/courses';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useEnquiryModal } from '@/context/ModalContext';
import {
  CheckCircle2,
  Wrench,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Shield,
  Layers,
  Tag,
  Users,
} from 'lucide-react';

interface ProgrammeDetailViewProps {
  programme: ProgrammeData;
}

export const ProgrammeDetailView: React.FC<ProgrammeDetailViewProps> = ({ programme }) => {
  const { openModal } = useEnquiryModal();

  // Find related courses from the central source of truth
  const relevantCourses = COURSES_DATA.filter((c) =>
    programme.relatedCourseCodes.includes(c.courseCode)
  );

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Programmes', href: '/programmes' },
            { label: programme.name },
          ]}
        />

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00897B]/10 dark:bg-[#00897B]/15 border border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{programme.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                {programme.name}
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#00897B] dark:text-[#4DD0E1]">
              {programme.tagline}
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {programme.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PrimaryButton
                onClick={() => openModal(programme.id)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire About {programme.name}
              </PrimaryButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#00897B]" />
                <span>Contact Admissions</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-[#FB8C00] shrink-0" />
              <span>Formats Available: {programme.deliveryLevels}</span>
            </div>
          </div>

          {/* Topic-specific authentic photograph */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden border-[5px] border-[#1B5E20] shadow-2xl bg-white max-w-lg w-full">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={programme.heroImage}
                  alt={programme.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 bg-white dark:bg-[#0A1428] border-t border-slate-200 dark:border-white/10 text-center">
                <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] uppercase tracking-wider block">
                  AgrooNext Technical Training Discipline
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Hands-on laboratory hardware and live cultivation environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Technique & Scientific Principles */}
        <div className="bg-slate-50 dark:bg-[#0A1428]/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
              Technological Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Understanding the Cultivation Methodology
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {programme.technologyDescription}
          </p>
        </div>

        {/* Learning Areas (Curriculum Modules) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Key Technical Syllabus Areas
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Structured modules delivered through classroom exposition and supervised practical execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programme.learningAreas.map((area, index) => (
              <div
                key={area.title}
                className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00897B]/10 text-[#00897B] flex items-center justify-center font-bold text-xs">
                    0{index + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {area.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Learning & Laboratory Apparatus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hands-on Laboratory Exercises */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0A1428] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00897B]/10 text-[#00897B] flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Supervised Practical Laboratory Exercises
                </h3>
                <span className="text-xs text-slate-500">Documented hands-on competencies</span>
              </div>
            </div>

            <div className="space-y-3">
              {programme.practicalLabs.map((lab, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                  <span>{lab}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment & Apparatus Used */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#070D1E] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FB8C00]/10 text-[#FB8C00] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Training Hardware & Apparatus
                </h3>
                <span className="text-xs text-slate-500">Commercial equipment handled</span>
              </div>
            </div>

            <ul className="space-y-2.5">
              {programme.equipmentUsed.map((equip, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00897B] shrink-0" />
                  <span>{equip}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#00897B]" />
                Recommended For:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {programme.suitableFor.map((aud, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Practical Capstone Requirement Showcase */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:to-transparent rounded-3xl p-8 sm:p-12 border border-amber-500/30 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Capstone Requirement</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Independent Practical Execution Before Certification
          </h3>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl">
            To satisfy the AgrooNext and Naree Foundation Four-Pillar assessment rubric, each trainee must complete the verified capstone assignment:
          </p>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1428] border border-amber-500/30 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm">
            “{programme.capstone}”
          </div>
        </div>

        {/* Relevant Course Options & Fees (Reused from central source of truth) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
              Course Schedule & Fees
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Enrollment Pathways Featuring {programme.name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clear fees based on approved database pricing tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantCourses.map((course) => (
              <div
                key={course.courseCode}
                className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#00897B] uppercase tracking-wider block">
                    {course.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-[#FB8C00]" />
                    <span>{course.standardDuration}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {course.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">Fee Structure:</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {course.formattedFee}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {course.eligibilityNotes}
                  </div>
                  <PrimaryButton
                    onClick={() => openModal(programme.id)}
                    className="w-full justify-center text-xs py-2.5"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Enquire for this Course
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Programmes Navigation */}
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-white/10">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Related Agricultural Disciplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programme.relatedProgrammes.map((rel) => (
              <Link
                key={rel.slug}
                href={`/programmes/${rel.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 hover:border-[#00897B]/40 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#00897B] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {rel.tagline}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00897B] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Start Your Practical Training in {programme.name}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect with our admissions desk to register for the upcoming batch in Pune or arrange a turnkey campus training workshop.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PrimaryButton
              onClick={() => openModal(programme.id)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Training Enquiry
            </PrimaryButton>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <span>Browse All Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
