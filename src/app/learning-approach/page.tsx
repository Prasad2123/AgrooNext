import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import {
  BookOpen,
  Wrench,
  Eye,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Layers,
  Droplets,
  Wind,
  Sprout,
  Fish,
  Users,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Approach & Pedagogy | AgrooNext — Agro-Tech & Training',
  description:
    'Discover AgrooNext’s four-stage learning framework: Foundational Knowledge, Supervised Practical Learning, Operational Understanding, and Enterprise Economics across our five modern agricultural disciplines.',
};

export default function LearningApproachPage() {
  const fourStages = [
    {
      step: '01',
      stage: 'Foundational Knowledge',
      subheading: 'Concepts & Scientific Principles',
      icon: <BookOpen className="w-6 h-6 text-[#00897B]" />,
      badgeColor: 'border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] bg-[#00897B]/10',
      description:
        'Before handling equipment or preparing solutions, learners build a solid comprehension of the biological, physical, and chemical mechanisms governing soil-free and controlled-environment agricultural systems.',
      elements: [
        'Plant biology, root respiration dynamics, and photosynthetic kinetics',
        'Water chemistry fundamentals: electrical conductivity (EC), pH equilibrium, and ionic antagonism',
        'Microbial cycles: beneficial nitrifying bacteria in aquatic systems and sterile mycology biology',
        'Environmental factors: relative humidity, photosynthetically active radiation (PAR), and vapor pressure deficit (VPD)',
      ],
      outcome: 'Conceptual fluency in agricultural science principles before physical lab work.',
    },
    {
      step: '02',
      stage: 'Supervised Practical Learning',
      subheading: 'Demonstrations & Hands-On Exposure',
      icon: <Wrench className="w-6 h-6 text-[#1B5E20] dark:text-[#81C784]" />,
      badgeColor: 'border-[#1B5E20]/30 text-[#1B5E20] dark:text-[#81C784] bg-[#1B5E20]/10',
      description:
        'Lectures alone cannot teach cultivation. Under the direct supervision of experienced trainers, participants assemble, plumb, calibrate, and test physical hardware inside laboratory and greenhouse training facilities.',
      elements: [
        'Physical fabrication: nutrient film technique (NFT) gullies, reservoir sumps, and circulation plumbing',
        'Precision misting: assembling high-pressure aeroponic delivery manifolds, mist nozzles, and cycle timers',
        'Mycology lab work: substrate steam pasteurization, sterile work practices, and laminar-flow spawn inoculation',
        'Digital water diagnostics: calibrating EC/pH pens and photometric testing for dissolved oxygen and ammonia',
      ],
      outcome: 'Verified physical competence in equipment assembly and daily operational handling.',
    },
    {
      step: '03',
      stage: 'Operational Understanding',
      subheading: 'Observation, Maintenance & Troubleshooting',
      icon: <Eye className="w-6 h-6 text-[#FB8C00]" />,
      badgeColor: 'border-[#FB8C00]/30 text-[#FB8C00] bg-[#FB8C00]/10',
      description:
        'Real agricultural units encounter mechanical wear, microbial variations, power interruptions, and environmental fluctuations. Trainees master daily checklists, preventative maintenance, and prompt root-cause diagnostics.',
      elements: [
        'Visual diagnostics: identifying nutrient deficiencies (chlorosis, tip burn) and pest signs early',
        'Preventative maintenance: pump impeller cleaning, filter backwashing, mist nozzle de-scaling, and tank sanitization',
        'Emergency contingencies: handling sudden power outages with gravity failovers and emergency aeration',
        'Integrated crop stewardship: physical barriers, sticky traps, companion planting, and zero toxic chemical pesticides',
      ],
      outcome: 'Proactive troubleshooting and equipment resilience in operational conditions.',
    },
    {
      step: '04',
      stage: 'Enterprise and Commercial Thinking',
      subheading: 'Production Costs, Pricing & Business Planning',
      icon: <TrendingUp className="w-6 h-6 text-[#00897B]" />,
      badgeColor: 'border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] bg-[#00897B]/10',
      description:
        'Technical knowledge must be economically viable to sustain livelihoods. The curriculum culminates in studying input costs, operational expenses, capital recovery, harvest economics, and realistic commercial roadmaps.',
      elements: [
        'Itemized capital expense (CAPEX) and recurring operational expense (OPEX) calculations',
        'Yield estimations and staggered cycle planning for continuous commercial supply',
        'Post-harvest preservation: food-safe handling, compliant packaging, and shelf-life management',
        'Commercial action planning: crafting a 12-month business framework and preparing bankable credit proposals',
      ],
      outcome: 'Realistic understanding of unit economics, production budgets, and market planning.',
    },
  ];

  const programmeConnections = [
    {
      title: 'Hydroponics',
      icon: <Droplets className="w-5 h-5 text-[#00897B]" />,
      badge: 'Recirculating Water',
      description:
        'Learners study closed-loop nutrient recirculation, reservoir aeration, automated dosing, and vertical NFT channel spacing for leafy greens and culinary herbs.',
      practicalFocus: 'Nutrient solution compounding (Stock A & B), EC/pH tracking, and plumbing assembly.',
    },
    {
      title: 'Aeroponics',
      icon: <Wind className="w-5 h-5 text-[#00ACC1]" />,
      badge: 'High-Pressure Mist',
      description:
        'Focuses on root-zone atomization physics, high-pressure diaphragm pumps, digital interval timers, and maximizing root oxygenation for accelerated vegetative growth.',
      practicalFocus: 'Nozzle droplet calibration (30–80 microns), cycle automation, and mist manifold assembly.',
    },
    {
      title: 'Mushroom Farming',
      icon: <Sprout className="w-5 h-5 text-[#FB8C00]" />,
      badge: 'Controlled Mycology',
      description:
        'Covers agricultural byproduct substrate formulation, atmospheric steam pasteurization, sterile grain spawn inoculation, and fruiting chamber microclimate regulation.',
      practicalFocus: 'Substrate moisture testing, sterile chamber protocols, and harvest flush management.',
    },
    {
      title: 'Aquaculture',
      icon: <Fish className="w-5 h-5 text-[#1A3F75] dark:text-[#4DD0E1]" />,
      badge: 'Biofloc & RAS',
      description:
        'Examines closed-loop aquatic ecology, heterotrophic bacterial conversion of nitrogenous fish waste, dissolved oxygen saturation, and feed conversion ratios (FCR).',
      practicalFocus: 'Imhoff cone floc volume testing, DO titration, blower maintenance, and water quality balancing.',
    },
    {
      title: 'Women Agri-Enterprise',
      icon: <Users className="w-5 h-5 text-[#C2185B]" />,
      badge: 'Micro-Enterprise Incubation',
      description:
        'Structured in partnership with Naree Foundation to equip women self-help groups and rural founders with collective enterprise tools, processing skills, and local marketing channels.',
      practicalFocus: 'Enterprise canvas modeling, cost-per-pack economics, compliant food labeling, and local market distribution.',
    },
  ];

  const assessmentRubric = [
    {
      title: 'Theoretical Knowledge Review',
      weight: '25%',
      description:
        'Written and verbal assessments evaluating understanding of plant biology, water chemistry, microclimate dynamics, and system physics.',
    },
    {
      title: 'Supervised Practical Checklist',
      weight: '35%',
      description:
        'Direct physical observation of tool handling, meter calibration, plumbing layout, spawn handling, and sanitary protocol adherence.',
    },
    {
      title: 'Capstone Action Plan / Canvas',
      weight: '25%',
      description:
        'Completion of a verified capstone assignment, such as a tabletop system build or a comprehensive 12-month commercial budget.',
    },
    {
      title: 'Participation & Lab Safety',
      weight: '15%',
      description:
        'Punctual laboratory attendance, adherence to biosecurity practices, personal protective equipment usage, and collaborative workshop engagement.',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Learning Approach' }]} />

        {/* Hero Section — Centered, Wide, Balanced Container */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00897B]/10 dark:bg-[#00897B]/15 border border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] text-xs font-semibold uppercase tracking-wider mx-auto">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Pedagogical Framework & Training Philosophy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            Learning Approach:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
              Science, Practice & Enterprise
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            At AgrooNext, agricultural education is grounded in the conviction that modern farming technologies cannot be mastered through classroom lectures alone, nor through unguided trial and error. Our curriculum bridges the distance between botanical science and daily farm management through a structured, four-stage experiential learning progression.
          </p>
        </div>

        {/* Philosophy Highlights: 3 Foundational Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00897B]/10 text-[#00897B] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Scientific Grounding First
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every practical procedure is rooted in scientific principles—from osmotic pressure and ion balance to microbial nitrogen cycling. Understanding the mechanism prevents guesswork.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/10 text-[#1B5E20] dark:text-[#81C784] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Supervised Physical Assembly
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Learners personally cut pipes, wire interval timers, calibrate digital sensors, and steam-pasteurize substrates. Physical confidence develops through direct handling.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FB8C00]/10 text-[#FB8C00] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Commercial Reality & Stewardship
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Training links technical capability directly with unit economics, energy conservation, closed-loop water stewardship, and realistic enterprise budgets.
            </p>
          </div>
        </div>

        {/* The 4-Stage Learning Framework */}
        <div className="space-y-12">
          <SectionHeading
            badge="Structured Progression"
            badgeColor="teal"
            title={
              <>
                The Four-Stage{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                  Learning Framework
                </span>
              </>
            }
            subtitle="Every learner progresses through four sequential stages across each agricultural technology programme."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fourStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-white dark:bg-[#0A1428] rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-white/10 shadow-lg space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${stage.badgeColor}`}
                    >
                      Stage {stage.step}
                    </span>
                    <span className="font-display font-extrabold text-3xl text-slate-300 dark:text-slate-700">
                      {stage.step}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2.5">
                      {stage.stage}
                    </h3>
                    <p className="text-xs font-semibold text-[#00897B] dark:text-[#4DD0E1] uppercase tracking-wider">
                      {stage.subheading}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Core Topics & Laboratory Work:
                    </h4>
                    <ul className="space-y-2">
                      {stage.elements.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#00897B] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-[#00897B] dark:text-[#4DD0E1]">Target Milestone:</span>{' '}
                  {stage.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Application Across Our 5 Programme Areas */}
        <div className="space-y-10">
          <SectionHeading
            badge="Curricular Application"
            badgeColor="teal"
            title={
              <>
                Applying the Framework Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                  Five Programmes
                </span>
              </>
            }
            subtitle="How our structured four-stage methodology is tailored to the distinct technical demands of each agricultural discipline."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmeConnections.map((prog) => (
              <div
                key={prog.title}
                className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#00897B]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      {prog.icon}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
                    Hands-On Practical Lab:
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {prog.practicalFocus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competency Evaluation Rubric */}
        <div className="bg-slate-50 dark:bg-[#0A1428]/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
              Evaluation Criteria
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              The Four-Pillar Assessment Rubric
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Certificates of skill completion reflect verified multidimensional capability—not passive session attendance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessmentRubric.map((rubric) => (
              <div
                key={rubric.title}
                className="bg-white dark:bg-[#070D1E] rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00897B] uppercase">Component</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md">
                    {rubric.weight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {rubric.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rubric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Safety & Realistic Scope Notice */}
        <div className="bg-slate-100 dark:bg-[#0F2C59]/30 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#FB8C00]" />
            <span>Laboratory Safety, Governance & Non-Accreditation Notice</span>
          </div>
          <p className="leading-relaxed">
            All physical demonstrations adhere strictly to biosafety protocols, including mandatory personal protective equipment (PPE) during nutrient handling and substrate sterilization. AgrooNext programmes are structured vocational skills training modules. Certificates acknowledge individual technical completion and laboratory participation; they do not represent statutory university degrees or government diplomas, nor do they guarantee commercial business turnover.
          </p>
        </div>

        {/* Final CTA Bar — Leading to Programmes or Contact */}
        <div className="text-center py-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Explore Practical Agricultural Training
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Review detailed course syllabi, scheduled batches, and curriculum breakdown across all five training disciplines.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PrimaryButton href="/programmes" icon={<ArrowRight className="w-4 h-4" />}>
              Explore All 5 Programmes
            </PrimaryButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0A1428] hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm text-sm transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

