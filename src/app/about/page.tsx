import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import {
  Sprout,
  Shield,
  Award,
  Layers,
  Users,
  Cpu,
  Leaf,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AgrooNext | Modern Agricultural Education & Training',
  description:
    'Discover AgrooNext’s educational mission, hands-on training philosophy, 4 core pillars, and social outreach partnership with Naree Foundation.',
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-[#00897B]" />,
      title: 'Advanced Cultivation Systems',
      description:
        'Bridging modern plant science with soil-free hydroponics, high-pressure aeroponics, controlled mushroom fruiting chambers, and biofloc aquaculture.',
      tag: 'Technology',
    },
    {
      icon: <Layers className="w-6 h-6 text-[#C2185B]" />,
      title: 'Hands-On Practical Rigour',
      description:
        'Moving past pure classroom theory. Every trainee directly handles real hardware, prepares nutrient formulations, inoculates spawn, and tracks live water chemistry.',
      tag: 'Pedagogy',
    },
    {
      icon: <Users className="w-6 h-6 text-[#FB8C00]" />,
      title: 'Women Agri-Entrepreneurship',
      description:
        'Fostering self-help groups (SHGs) and women rural leaders through enterprise canvas planning, unit costing, compliant packaging, and sustainable local markets.',
      tag: 'Empowerment',
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#2E7D32]" />,
      title: 'Resource Stewardship',
      description:
        'Championing closed-loop water recirculation, zero toxic pesticide dependence, reduced spatial footprints, and climate-resilient livelihoods.',
      tag: 'Sustainability',
    },
  ];

  const targetAudiences = [
    {
      title: 'School Students (Grades 8–12)',
      description:
        'Experiential STEM awareness workshops that make plant biology, environmental science, and water conservation tangible through physical tabletop farm models.',
      focus: 'Foundational Curiosity & Science Inquiry',
    },
    {
      title: 'College & University Students',
      description:
        'Technical immersion into agricultural engineering, computerized dosing, water chemistry diagnostics, and vocational entrepreneurship.',
      focus: 'Technical Competency & Career Orientation',
    },
    {
      title: 'Individual Growers & Agri-Entrepreneurs',
      description:
        'Intensive multi-day certificate courses designed for growers and founders establishing commercial hydroponic, mushroom, or biofloc production units.',
      focus: 'Commercial Viability & Unit Economics',
    },
    {
      title: 'Women Leaders & Self-Help Groups (SHGs)',
      description:
        'Structured micro-enterprise incubation that translates technical cultivation knowledge into profitable collective processing, packaging, and marketing ventures.',
      focus: 'Collective Livelihoods & Enterprise Sustainability',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'About AgrooNext' }]} />

        {/* Hero Section of About Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="min-w-0 lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00897B]/10 dark:bg-[#00897B]/15 border border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              <span>Educational Mission & Training Philosophy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
              Bridging Modern Agricultural Science with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">Practical Capability</span>
            </h1>

            <div className="space-y-4 max-w-xl text-slate-600 dark:text-slate-300">
              <p className="text-base sm:text-lg leading-relaxed font-normal">
                AgrooNext was created to address a critical gap in agricultural education: the distance between theoretical textbook concepts and the physical, economic, and operational reality of modern farming technologies.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                In association with Naree Foundation’s skill development and social outreach mission (“Empower • Educate • Elevate”), we deliver structured, laboratory-tested training across five core modern disciplines: Hydroponics, Aeroponics, Mushroom Cultivation, Aquaculture, and Women in Agri-Enterprise.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PrimaryButton href="/programmes" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Our Programmes
              </PrimaryButton>
              <Link
                href="/learning-approach"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#00897B]" />
                <span>Our Learning Approach</span>
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5 flex justify-center w-full">
            <div className="relative rounded-3xl overflow-hidden border-[5px] border-[#1B5E20] shadow-2xl bg-white dark:bg-[#0A1428] max-w-md w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/images/programmes/hydroponics.jpg"
                  alt="AgrooNext agricultural training facility with hydroponic cultivation channels"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 sm:p-5 bg-white dark:bg-[#0A1428] border-t border-slate-200 dark:border-white/10 space-y-1 text-center">
                <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] uppercase tracking-wider block">
                  Demonstration Facility • Pune District
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Practical laboratory facilities designed for hands-on participant learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Section */}
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <SectionHeading
              badge="Our Foundation"
              badgeColor="teal"
              title={
                <>
                  The Four Core Pillars of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                    AgrooNext
                  </span>
                </>
              }
              subtitle="Every curriculum, demonstration module, and workshop session is anchored on four fundamental principles."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-white dark:bg-[#0A1428] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Pillar 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-semibold text-[#00897B]">
                  {pillar.tag} Focus
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audiences Section */}
        <div className="bg-slate-50 dark:bg-[#0A1428]/60 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] tracking-wider uppercase">
              Inclusive Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Who We Serve
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our pedagogical formats are engineered specifically to match the educational needs, technical background, and objectives of diverse learner cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetAudiences.map((aud) => (
              <div
                key={aud.title}
                className="bg-white dark:bg-[#070D1E] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {aud.title}
                  </h3>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#00897B]/10 text-[#00897B] shrink-0">
                    {aud.focus}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Naree Foundation Partnership & Social Outreach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#0A1428] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-lg">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C2185B]/10 border border-[#C2185B]/30 text-[#C2185B] text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Social Outreach & Community Commitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              The Naree Foundation Association
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              AgrooNext’s training programmes are conducted under the social skill-development mandate of Naree Foundation. Rooted in the institutional motto <em>“Empower • Educate • Elevate”</em>, this partnership ensures subsidized community access, structured focus on women self-help groups, and authentic rural livelihood enablement across Maharashtra.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#070D1E] rounded-2xl border border-slate-200 dark:border-white/10 text-center space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Institutional Creed
            </span>
            <div className="text-xl font-bold font-display text-[#C2185B]">
              Empower • Educate • Elevate
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Community enablement through verifiable technical competence.
            </p>
          </div>
        </div>

        {/* Mandatory Governance & Disclaimers Notice */}
        <div className="bg-slate-100 dark:bg-[#0F2C59]/30 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-[#FB8C00]" />
            <span>Governance, Integrity & Non-Accreditation Notice</span>
          </div>
          <p className="leading-relaxed">
            AgrooNext is an educational training provider. Certificates issued reflect skill competency and laboratory participation in vocational training modules. They do not constitute formal university degrees, government diplomas, or statutory academic credentials. Furthermore, all produce and systems discussed are agricultural in nature; no curative health claims, therapeutic medical promises, or medicinal disease cures are made.
          </p>
        </div>

        {/* Call to Action Bar */}
        <div className="text-center py-6 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
            Interested in Learning with AgrooNext?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Discover our scheduled course offerings, or submit an enquiry to organize a turnkey workshop at your campus.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PrimaryButton href="/courses" icon={<ArrowRight className="w-4 h-4" />}>
              View Course Catalogue
            </PrimaryButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0A1428] hover:bg-slate-50 border border-slate-200 dark:border-white/10 shadow-sm text-sm"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
