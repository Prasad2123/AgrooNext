'use client';

import React from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useEnquiryModal } from '../../context/ModalContext';

export const CallToActionSection: React.FC = () => {
  const { openModal } = useEnquiryModal();

  return (
    <SectionContainer glowEffect="teal" wrapperClassName="py-16 sm:py-20 lg:py-28">
      <div className="relative bg-white dark:bg-[#0A1428] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden text-center max-w-5xl mx-auto">
        {/* Decorative background radial flares */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00897B]/10 dark:bg-[#00897B]/15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FB8C00]/10 dark:bg-[#C2185B]/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00897B]/10 dark:bg-[#00897B]/15 border border-[#00897B]/30 text-[#00897B] dark:text-[#4DD0E1] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Agro-Technology Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            Ready to Connect Modern Science with Sustainable Livelihoods?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of students, farmers, community leaders, and women entrepreneurs who are building real practical capability in hydroponics, aeroponics, mushroom farming, and aquaculture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <PrimaryButton
              href="#programmes"
              className="w-full sm:w-auto px-8 py-4 text-base"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Explore Training Programmes
            </PrimaryButton>
            <SecondaryButton
              onClick={() => openModal('institutional_workshop')}
              className="w-full sm:w-auto px-8 py-4 text-base"
              icon={<BookOpen className="w-5 h-5" />}
            >
              Enquire for Your Institution
            </SecondaryButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
