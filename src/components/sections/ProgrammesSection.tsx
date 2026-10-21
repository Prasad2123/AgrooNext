'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { useEnquiryModal } from '../../context/ModalContext';
import { 
  Droplet, 
  Wind, 
  CircleDot, 
  Fish, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface Programme {
  id: string;
  slug: string;
  name: string;
  icon: React.ReactNode;
  accentColor: string;
  badge: string;
  tagline: string;
  description: string;
  keyTopics: string[];
  capstone: string;
  deliveryLevels: string;
}

export const ProgrammesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hydroponics');
  const { openModal } = useEnquiryModal();

  const programmes: Programme[] = [
    {
      id: 'hydroponics',
      slug: 'hydroponics',
      name: 'Hydroponics',
      icon: <Droplet className="w-5 h-5 text-[#00897B]" />,
      accentColor: '#00897B',
      badge: 'Core Technology 01',
      tagline: 'Precision Soilless Crop Production',
      description: 'Comprehensive immersion into modern protected cultivation. Master NFT, deep water culture (DWC), media beds, and vertical towers with computerized pH and electrical conductivity (EC) dosing.',
      keyTopics: [
        'NFT, DWC, Drip & Vertical Tower Systems',
        'Water Chemistry, pH & Electrical Conductivity (EC)',
        'Nutrient Formulation & Deficiency Diagnostics',
        'Nursery Propagation & Microgreen Management',
      ],
      capstone: 'Assemble an operational desktop hydroponic unit and calculate nutrient dosing for a complete crop cycle.',
      deliveryLevels: 'Level 1 (1-2 Days) • Level 2 (5 Days) • Level 3 (3 Weeks)',
    },
    {
      id: 'aeroponics',
      slug: 'aeroponics',
      name: 'Aeroponics',
      icon: <Wind className="w-5 h-5 text-[#00ACC1]" />,
      accentColor: '#00ACC1',
      badge: 'Core Technology 02',
      tagline: 'High-Pressure Mist & Root-Zone Aeration',
      description: 'The pinnacle of water and space conservation. Learn how roots suspended in air absorb ultra-fine pressurized nutrient mist, accelerating growth rates while using up to 95% less water than soil.',
      keyTopics: [
        'Misting Intervals, High-Pressure Pumps & Nozzle Sizing',
        'Root Oxygenation & Pathogen Prevention',
        'Automated Timers, Reservoirs & Filtration',
        'Troubleshooting Clogging & Emergency Power Prototypes',
      ],
      capstone: 'Design and calibrate a pressurized mist chamber with automated cyclic timer controls.',
      deliveryLevels: 'Level 1 (1-2 Days) • Level 2 (5 Days) • Level 3 (3 Weeks)',
    },
    {
      id: 'mushroom_farming',
      slug: 'mushroom-farming',
      name: 'Mushroom Farming',
      icon: <CircleDot className="w-5 h-5 text-[#FB8C00]" />,
      accentColor: '#FB8C00',
      badge: 'Core Technology 03',
      tagline: 'Commercial Edible & Functional Mycology',
      description: 'Turn agricultural waste into high-value protein and income. Master substrate pasteurization, sterile spawn inoculation, and automated humidity/temperature climate control for domestic and commercial species.',
      keyTopics: [
        'Species Selection: Oyster, Milky, Button & Paddy Straw',
        'Substrate Pasteurization, Sterilization & Hygiene Protocols',
        'Spawn Inoculation & Dark Incubation Chambers',
        'Fruiting Climate Control, Harvesting & Shelf-Life Packaging',
      ],
      capstone: 'Prepare 5 sterile substrate bags, inoculate with mother spawn, and establish a fruiting climate log.',
      deliveryLevels: 'Level 1 (1-2 Days) • Level 2 (5 Days) • Level 3 (3 Weeks)',
    },
    {
      id: 'aquaculture',
      slug: 'aquaculture',
      name: 'Aquaculture',
      icon: <Fish className="w-5 h-5 text-[#1E88E5]" />,
      accentColor: '#1E88E5',
      badge: 'Core Technology 04',
      tagline: 'Intensive Biofloc & Recirculating Aquaculture',
      description: 'Sustainable inland fish farming utilizing scientific water quality monitoring. Learn high-density tank management, microbial floc balancing, dissolved oxygen management, and integrated aquaponics.',
      keyTopics: [
        'Tank & Pond Preparation, Nursery & Grow-out Stages',
        'Water Chemistry: DO, Total Ammonia Nitrogen (TAN) & pH',
        'Microbial Biofloc Maintenance & Carbon-to-Nitrogen Ratios',
        'Feed Conversion Ratios (FCR) & Farm Biosecurity Protocols',
      ],
      capstone: 'Conduct comprehensive chemical water tests, calculate feeding charts, and draft a tank biofloc layout.',
      deliveryLevels: 'Level 1 (1-2 Days) • Level 2 (5 Days) • Level 3 (3 Weeks)',
    },
    {
      id: 'women_agri_enterprise',
      slug: 'women-empowerment',
      name: 'Women in Agri-Enterprise',
      icon: <Briefcase className="w-5 h-5 text-[#C2185B]" />,
      accentColor: '#C2185B',
      badge: 'Core Technology 05',
      tagline: 'Rural Livelihoods, SHGs & Business Planning',
      description: 'Equipping women leaders and Self-Help Groups (SHGs) with enterprise skills to convert agricultural knowledge into profitable micro-enterprises. Covers unit economics, branding, and formal credit readiness.',
      keyTopics: [
        'Value-Added Agro-Products & Collective SHG Models',
        'Unit Costing, Pricing, Profit Margins & Cash-Flow Budgets',
        'Digital Record Keeping, Packaging, Labeling & Local Branding',
        'Institutional Finance Awareness & 12-Month Launch Action Plan',
      ],
      capstone: 'Develop a verified 12-month micro-enterprise business canvas with operating expense budgets and customer channel plans.',
      deliveryLevels: 'Level 1 (1-2 Days) • Level 2 (5 Days) • Level 3 (3 Weeks)',
    },
  ];

  const currentProgramme = programmes.find((p) => p.id === activeTab) || programmes[0];

  return (
    <SectionContainer id="programmes-showcase" glowEffect="teal">
      <div className="space-y-12 lg:space-y-16">
        {/* Section Header */}
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
        </div>

        {/* Programme Selection Nav Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-1.5 bg-slate-100 dark:bg-[#0F2C59]/40 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md">
          {programmes.map((p) => {
            const isActive = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00796B] text-white shadow-md shadow-[#1B5E20]/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Programme Detailed Showcase Card */}
        <div className="bg-white dark:bg-[#0A1428] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all duration-300">
          {/* Subtle Accent Glow */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ backgroundColor: currentProgramme.accentColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Programme Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00897B]">
                  {currentProgramme.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                  {currentProgramme.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#00897B] dark:text-[#4DD0E1]">
                  {currentProgramme.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentProgramme.description}
              </p>

              {/* Key Topics List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Technical Modules:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentProgramme.keyTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Levels */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FB8C00]" />
                  <span>Formats: {currentProgramme.deliveryLevels}</span>
                </div>
                <Link
                  href={`/programmes/${currentProgramme.slug}`}
                  className="font-bold text-[#00897B] dark:text-[#4DD0E1] hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Full {currentProgramme.name} Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Capstone Project & CTA */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-[#070D1E]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FB8C00]/15 border border-[#FB8C00]/30 text-[#E65100] dark:text-[#FB8C00] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Practical Capstone Requirement</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Hands-on Execution</h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0F2C59]/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                  “{currentProgramme.capstone}”
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Designed for schools, colleges, individual learners, and community groups.
                </p>
                <div className="space-y-2">
                  <PrimaryButton
                    onClick={() => openModal(currentProgramme.id)}
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enquire About {currentProgramme.name}
                  </PrimaryButton>
                  <Link
                    href={`/programmes/${currentProgramme.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 hover:bg-slate-100 border border-slate-200 dark:border-white/10 transition-colors block"
                  >
                    View Curriculum & Lab Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Programmes Full Link */}
        <div className="text-center pt-2">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#0A1428] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm text-sm font-semibold text-slate-800 dark:text-slate-100 transition-all hover:scale-[1.01]"
          >
            <span>Explore All 5 Dedicated Programme Pages</span>
            <ArrowRight className="w-4 h-4 text-[#00897B]" />
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
};
