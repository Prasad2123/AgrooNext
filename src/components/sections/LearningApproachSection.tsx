import React from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { BookOpen, Wrench, Eye, TrendingUp, CheckCircle, Shield } from 'lucide-react';

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
    <SectionContainer id="approach" glowEffect="teal">
      <div className="space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Rigorous Pedagogy"
            badgeColor="teal"
            title="The 4-Pillar Learning Methodology"
            subtitle="Every AgrooNext training course balances foundational theory with direct, supervised laboratory exercises and unit economic models."
          />
        </div>

        {/* 4 Steps Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
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

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-xs font-semibold text-[#00897B]">
                <CheckCircle className="w-4 h-4" />
                <span>Competency Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Four-Pillar Assessment Rubric Notice */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#00897B]/15 border border-[#00897B]/30 flex items-center justify-center shrink-0">
            <Shield className="w-7 h-7 text-[#00897B]" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Standardized Four-Pillar Competency Evaluation
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Certification eligibility requires verified completion of: (1) Knowledge Check, (2) Practical Skill Checklist, (3) Mini-Project / Enterprise Canvas, and (4) Attendance and Participation in accordance with AgrooNext and Naree Foundation governance.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
