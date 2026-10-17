'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';
import { useEnquiryModal } from '../../context/ModalContext';
import heroSectionImage from '../../../assets/images/hero-section-image.jpg';

export const HeroSection: React.FC = () => {
  const { openModal } = useEnquiryModal();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 sm:pt-28 lg:pt-28 lg:pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#070D1E] dark:via-[#09142E] dark:to-[#070D1E] transition-colors duration-300"
    >
      {/* Background Ambience & Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00897B]/10 dark:bg-[#0F2C59]/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#FB8C00]/10 dark:bg-[#00897B]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand, Narrative & CTAs */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#0F2C59]/80 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00897B]" />
                AgrooNext Agro-Tech
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#00897B]/15 dark:bg-[#00897B]/20 border border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1]">
                Empowering Farmers • Building Sustainable Futures
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display leading-[1.1] sm:leading-[1.12]">
              Cultivating Modern <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00897B] via-[#00ACC1] to-[#2E7D32]">
                Agricultural Technology
              </span>{' '}
              & Enterprise Skills
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Introducing young growers, educational institutions, community groups, and women agri-entrepreneurs to practical hydroponics, aeroponics, mushroom farming, and aquaculture through verified laboratory demonstrations and unit economics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <PrimaryButton
                href="#programmes"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Programmes
              </PrimaryButton>
              <SecondaryButton
                onClick={() => openModal('general_enquiry')}
                className="w-full sm:w-auto"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Enquire About Training
              </SecondaryButton>
            </div>

            {/* Trust and Rigour Indicators */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00897B]" />
                <span>5 Core Technical Disciplines</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Supervised Practical Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FB8C00]" />
                <span>Enterprise Unit Economics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photograph with 5px Deep-Green Border */}
          <div className="lg:col-span-6 w-full flex items-center lg:items-start justify-center lg:justify-end lg:pt-1">
            <div className="hero-image-frame">
              <Image
                src={heroSectionImage}
                alt="AgrooNext agricultural technology trainee monitoring greenhouse hydroponic crops with a tablet"
                width={520}
                height={520}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 sm:pt-16 flex flex-col items-center justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] rounded-lg p-2"
            aria-label="Scroll to Foundation Overview"
          >
            <span className="text-[11px] font-medium">Discover Training Mission</span>
            <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/15 group-hover:border-[#00897B] flex items-center justify-center transition-colors">
              <ArrowDown className="w-4 h-4 text-[#00897B] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
