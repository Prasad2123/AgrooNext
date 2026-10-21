import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { COURSES_DATA } from '@/data/courses';
import {
  Clock,
  CheckCircle2,
  Building,
  GraduationCap,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Training Formats & Fees | AgrooNext',
  description:
    'Transparent overview of individual student course fees and turnkey institutional workshop pricing based on approved AgrooNext database tiers.',
};

export default function TrainingFormatsPage() {
  const individualCourses = COURSES_DATA.filter(
    (c) => c.pricingModel === 'PER_STUDENT'
  );
  const institutionalCourses = COURSES_DATA.filter(
    (c) => c.pricingModel === 'PER_INSTITUTION_SESSION'
  );

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Training Formats & Fees' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Pricing Transparency"
            badgeColor="teal"
            title="Training Formats, Duration & Approved Fee Structure"
            subtitle="AgrooNext maintains transparent fee schedules with a strict distinction between individual student enrollments and turnkey institutional campus delivery."
          />
        </div>

        {/* Individual Student Offerings Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00897B]/10 text-xs font-bold text-[#00897B] uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Category A: Individual Learner Enrollments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Per-Student Training Formats
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Conducted at AgrooNext demonstration facilities in Pune District, Maharashtra. Fees are billed per participant.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white dark:bg-[#0A1428] rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
                  <th className="py-4 px-4 sm:px-6 font-bold">Course Offering</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Target Cohort</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Standard Duration</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Base Fee (INR)</th>
                  <th className="py-4 px-4 sm:px-6 font-bold">Key Inclusions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                {individualCourses.map((c) => (
                  <tr key={c.courseCode} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <strong className="text-slate-900 dark:text-white block font-semibold">
                        {c.title}
                      </strong>
                      <span className="text-[11px] font-mono text-slate-400">{c.courseCode}</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">{c.targetGroup}</td>
                    <td className="py-4 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-100">
                      {c.standardDuration}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#00897B] dark:text-[#4DD0E1] text-base">
                      {c.formattedFee}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400">
                      {c.eligibilityNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Institutional Turnkey Offerings Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E88E5]/10 text-xs font-bold text-[#1E88E5] uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Category B: Institutional Turnkey Workshops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Per-Institution Turnkey Session Formats
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Delivered directly on-site at your school, college, or university campus with our mobile demonstration hardware and certified faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutionalCourses.map((c) => (
              <div
                key={c.courseCode}
                className="bg-white dark:bg-[#0A1428] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-lg space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5] bg-[#1E88E5]/10 px-3 py-1 rounded-full">
                      {c.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{c.courseCode}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {c.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {c.summary}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <strong className="text-slate-900 dark:text-white">{c.standardDuration}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Venue:</span>
                      <strong className="text-slate-900 dark:text-white">Client Campus (On-site)</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Cohort Agreement:</span>
                      <strong className="text-slate-900 dark:text-white">Mutually agreed capacity</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Workshop Components:
                    </h4>
                    <ul className="space-y-1.5">
                      {c.topicsCovered.map((topic, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00897B] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 uppercase font-semibold">
                      Flat Institutional Fee:
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {c.formattedFee}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    {c.eligibilityNotes}
                  </p>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors text-sm shadow-sm"
                  >
                    <span>Request Institutional Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Policy & Capacity Notice */}
        <div className="bg-slate-50 dark:bg-[#0A1428]/60 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Info className="w-4 h-4 text-[#FB8C00]" />
            <span>Institutional Capacity & Faculty Ratio Policy</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            As documented in our governance rules: <em>“AgrooNext will accommodate the maximum number of students mutually agreed with the institution, subject to available trainers, training infrastructure, safety requirements, and practical equipment.”</em> Institutional bookings must be confirmed at least two weeks in advance to ensure apparatus dispatch and trainer scheduling.
          </p>
        </div>

        {/* CTA Bar */}
        <div className="text-center py-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Need Guidance on the Best Course Format?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Our admissions coordinators can assist you in selecting individual courses or tailoring an institutional schedule for your students.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PrimaryButton href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
              Submit Admissions Enquiry
            </PrimaryButton>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0A1428] hover:bg-slate-50 border border-slate-200 dark:border-white/10 shadow-sm text-sm"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
