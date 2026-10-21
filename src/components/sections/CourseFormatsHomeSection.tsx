import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Clock, CheckCircle2, ArrowRight, Sparkles, Building, Users } from 'lucide-react';
import { COURSES_DATA } from '@/data/courses';

export const CourseFormatsHomeSection: React.FC = () => {
  // Showcase four representative tracks from the approved course data
  const featuredTracks = [
    {
      title: '1-Day Foundation Crash Course',
      duration: '1 Day',
      fee: '₹250 (School) / ₹500 (College)',
      target: 'School & College Student Cohorts',
      description:
        'Fast-paced experiential overview covering all 5 modern disciplines with hands-on tabletop kit assembly and live chemistry diagnostics.',
      link: '/courses',
    },
    {
      title: '5-Day Topic Skill Certificate',
      duration: '5 Days (30 Hours)',
      fee: '₹5,000 per participant',
      target: 'Individual Learners, Farmers & SHGs',
      description:
        'In-depth practical mastery in an individual discipline (Hydroponics, Aeroponics, Mushroom, Aquaculture, or Women in Agri-Enterprise) with required capstone execution.',
      link: '/courses',
    },
    {
      title: '3-Week Complete Agro-Tech Package',
      duration: '3 Weeks (90 Hours)',
      fee: '₹22,000 (Save ₹3,000)',
      target: 'Aspiring Commercial Entrepreneurs',
      description:
        'Master all five modern disciplines through intensive laboratory rotations, commercial unit economics, and 12-month farm business incubation.',
      link: '/courses',
    },
    {
      title: 'Turnkey Institutional Campus Training',
      duration: '1-Day Campus Session',
      fee: '₹15,000 (School) / ₹25,000 (College)',
      target: 'Schools, Colleges & Universities',
      description:
        'Full-day experiential workshop delivered on-site at your campus by certified AgrooNext faculty with mobile live demonstration hardware.',
      link: '/training-formats',
    },
  ];

  return (
    <SectionContainer id="formats" glowEffect="teal">
      <div className="space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              badge="Standardized Delivery"
              badgeColor="teal"
              title={
                <>
                  Flexible Training Formats &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                    Transparent Fee Tiers
                  </span>
                </>
              }
              subtitle="Whether you are an individual learner seeking hands-on mastery or an educational institution planning campus-wide technology exposure, select the ideal track."
            />
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/training-formats"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#00796B] dark:hover:text-white transition-colors"
            >
              <span>Compare All Formats & Fees</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTracks.map((track, i) => (
            <div
              key={track.title}
              className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-[#00897B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{track.duration}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Track 0{i + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                  {track.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {track.description}
                </p>

                <div className="pt-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700 dark:text-slate-300 block">Target Group:</strong>
                  <span>{track.target}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {track.fee}
                </div>
                <Link
                  href={track.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00897B] hover:underline"
                >
                  <span>Track Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
