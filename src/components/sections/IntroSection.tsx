import React from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Cpu, Users, Award, Leaf, Layers, ArrowUpRight } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-[#00897B]" />,
      title: 'Advanced Cultivation Systems',
      description: 'Bridging modern botanical science with soilless hydroponics, high-pressure aeroponics, controlled mushroom fruiting rooms, and intensive recirculating aquaculture.',
      tag: 'Technology',
    },
    {
      icon: <Layers className="w-6 h-6 text-[#C2185B]" />,
      title: 'Hands-On Practical Rigour',
      description: 'Moving beyond theoretical lectures. Every learner assembles physical units, tests pH/EC nutrient solutions, inoculates spawn, and tracks live water chemistry.',
      tag: 'Pedagogy',
    },
    {
      icon: <Users className="w-6 h-6 text-[#FB8C00]" />,
      title: 'Women Agri-Entrepreneurship',
      description: 'Fostering collective self-help groups (SHGs) and rural women leaders through enterprise canvas planning, costing, branding, and sustainable market linkage.',
      tag: 'Empowerment',
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#2E7D32]" />,
      title: 'Resource Stewardship',
      description: 'Promoting closed-loop water recirculation, zero toxic pesticide dependence, reduced land footprints, and climate-resilient agricultural livelihoods.',
      tag: 'Sustainability',
    },
  ];

  return (
    <SectionContainer id="about" glowEffect="teal">
      <div className="space-y-16 lg:space-y-24">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              badge="About AgrooNext"
              badgeColor="teal"
              title="Transforming Modern Agriculture into Practical Knowledge & Enterprise"
              subtitle="AgrooNext is dedicated to empowering students, young adults, community groups, and aspiring women entrepreneurs through structured agro-technology training."
            />
          </div>
          <div className="lg:col-span-5 bg-white/80 dark:bg-[#0F2C59]/30 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00897B] mb-2">
              <Award className="w-4 h-4" />
              <span>Institutional Purpose & Heritage</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              In association with the Naree Foundation’s skill development mission, we connect foundational biology and engineering concepts with direct physical practice, instilling enterprise confidence and career awareness without unapproved commercial or medical promises.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative bg-white dark:bg-[#0F2C59]/20 hover:bg-slate-50 dark:hover:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 hover:border-[#00897B]/40 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#0F2C59]/60 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display group-hover:text-[#00897B] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#00897B] transition-colors">
                <span>Pillar 0{idx + 1}</span>
                <ArrowUpRight className="w-4 h-4 text-[#00897B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
