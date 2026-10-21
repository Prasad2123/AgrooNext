'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { COURSES_DATA, CourseOffering } from '@/data/courses';
import { useEnquiryModal } from '@/context/ModalContext';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  Building,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
} from 'lucide-react';

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const { openModal } = useEnquiryModal();

  const filterTabs = [
    { id: 'ALL', label: 'All Courses' },
    { id: 'CRASH_COURSE', label: '1-Day Crash Courses' },
    { id: 'TOPIC_CERTIFICATE', label: '5-Day Topic Certificates' },
    { id: 'COMPLETE_PACKAGE', label: '3-Week Complete Package' },
    { id: 'INSTITUTIONAL_WORKSHOP', label: 'Institutional Workshops' },
  ];

  const filteredCourses = COURSES_DATA.filter((c) => {
    if (activeFilter === 'ALL') return true;
    return c.offeringType === activeFilter;
  });

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Course Catalogue' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Official Curricular Tracks"
            badgeColor="teal"
            title="Course Catalogue & Offering Schedule"
            subtitle="Explore our certified course portfolio. All programmes incorporate structured laboratory practicals, transparent fee schedules, and verified competency evaluations."
          />
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Fees are strictly distinguished between individual learner rates and turnkey institutional session rates.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-1.5 bg-slate-100 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00897B] text-white shadow-md shadow-[#00897B]/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isInstitutional = course.pricingModel === 'PER_INSTITUTION_SESSION';
            return (
              <div
                key={course.courseCode}
                className="bg-white dark:bg-[#0A1428] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Accent Top Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isInstitutional
                      ? 'bg-gradient-to-r from-[#1E88E5] to-[#00897B]'
                      : course.offeringType === 'COMPLETE_PACKAGE'
                      ? 'bg-gradient-to-r from-[#FB8C00] to-[#C2185B]'
                      : 'bg-[#00897B]'
                  }`}
                />

                <div className="space-y-4">
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold tracking-wider text-[#00897B] uppercase bg-[#00897B]/10 px-2.5 py-1 rounded-md">
                      {course.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#FB8C00]" />
                      <span>{course.standardDuration}</span>
                    </div>
                  </div>

                  {/* Title & Code */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                      {course.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                      Code: {course.courseCode}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Prerequisites */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <strong className="text-slate-900 dark:text-slate-200 font-semibold block">
                      Eligibility & Prerequisites:
                    </strong>
                    <p>{course.prerequisites}</p>
                  </div>

                  {/* Key Topics List */}
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Syllabus Modules:
                    </h4>
                    <ul className="space-y-1.5">
                      {course.topicsCovered.slice(0, 3).map((topic, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00897B] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Programme Slugs Links */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                      Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.associatedProgrammeSlugs.map((slug) => (
                        <Link
                          key={slug}
                          href={`/programmes/${slug}`}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 hover:bg-[#00897B]/10 hover:text-[#00897B] text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          {slug.replace('-', ' ')}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and CTA Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        {isInstitutional ? 'Institutional Rate' : 'Individual Student Fee'}
                      </span>
                      <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {course.formattedFee}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 text-right max-w-[140px]">
                      {course.eligibilityNotes.split('.')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <PrimaryButton
                      onClick={() => openModal('general_enquiry')}
                      className="w-full justify-center text-xs py-2.5"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Enquire for Admission
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Training Turnkey Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2C59] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4DD0E1]">
              On-Campus Delivery for Schools & Colleges
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Looking for Turnkey Institutional Workshops?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our mobile faculty and live demonstration hardware travel directly to your school or university campus. Flat-rate institutional sessions for schools (₹15,000) and colleges (₹25,000).
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <Link
              href="/training-formats"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors text-sm shadow-md"
            >
              Compare Training Formats & Fees
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              Contact Institutional Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
