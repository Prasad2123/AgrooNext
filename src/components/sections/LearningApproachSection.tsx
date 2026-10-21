import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { BookOpen, Wrench, Eye, TrendingUp, CheckCircle, Shield, ArrowRight } from 'lucide-react';

export const LearningApproachSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Scientific Foundations',
      description: 'Understanding plant biology, photoperiodism, root aeration, water chemistry (pH/EC/DO), and microbial ecosystems.',
      icon: <BookOpen className="w-6 h-6 text-[#00897B]" />,
    },
    {
      step: '02',
      title: 'Supervised Lab Practical',
      description: 'Assembling actual physical cultivation hardware, mixing nutrient reservoirs, pasteurizing substrates, and calibrating high-pressure mist nozzles.',
      icon: <Wrench className="w-6 h-6 text-[#C2185B]" />,
    },
    {
      step: '03',
      title: 'Field Exposure & Troubleshooting',
      description: 'Diagnosing common system failures: pump clogs, electrical failures, nutrient lockout, root rot, and pest prevention without chemical toxicity.',
      icon: <Eye className="w-6 h-6 text-[#FB8C00]" />,
    },
    {
      step: '04',
      title: 'Enterprise Economics',
      description: 'Calculating unit economics, capital equipment amortization, electricity costs, packaging, and building a 12-month commercial action plan.',
      icon: <TrendingUp className="w-6 h-6 text-[#2E7D32]" />,
    },
  ];

  return (
    <SectionContainer id="approach-overview" glowEffect="teal">
      <div className="space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              badge="Rigorous Pedagogy"
              badgeColor="teal"
              title={
                <>
                  The 4-Pillar{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                    Learning Methodology
                  </span>
                </>
              }
              subtitle="Every AgrooNext training course balances foundational theory with direct, supervised laboratory exercises and unit economic models."
            />
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/learning-approach"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#00796B] dark:hover:text-white transition-colors"
            >
              <span>Explore Complete Pedagogy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Steps Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <Link
              key={item.step}
              href="/learning-approach"
              className="bg-white dark:bg-[#0F2C59]/20 hover:bg-slate-50 dark:hover:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 hover:border-[#00897B]/40 rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#0F2C59]/60 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-display font-extrabold text-2xl text-slate-300 dark:text-slate-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#00897B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Competency Verified</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Four-Pillar Assessment Rubric Notice */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00897B]/15 border border-[#00897B]/30 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#00897B]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Standardized Four-Pillar Competency Evaluation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Certification eligibility requires verified completion of Knowledge Check, Skill Checklist, Capstone Project, and Attendance.
              </p>
            </div>
          </div>
          <Link
            href="/learning-approach"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#00897B] bg-[#00897B]/10 hover:bg-[#00897B]/20 transition-colors shrink-0"
          >
            View Full Rubric →
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
};
