import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { IntroSection } from '../components/sections/IntroSection';
import { ProgrammesSection } from '../components/sections/ProgrammesSection';
import { LearningApproachSection } from '../components/sections/LearningApproachSection';
import { CallToActionSection } from '../components/sections/CallToActionSection';
import { ContactSection } from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic 3D Hero Experience */}
      <HeroSection />

      {/* 2. Section A: Foundation Introduction & 4 Pillars */}
      <IntroSection />

      {/* 3. Section B: Five Core Programme Disciplines */}
      <ProgrammesSection />

      {/* 4. Section C: 4-Pillar Learning Approach & Assessment Rubric */}
      <LearningApproachSection />

      {/* 5. Section D: Inspiring Call to Action */}
      <CallToActionSection />

      {/* 6. Section E: Contact & Training Inquiry Destination */}
      <ContactSection />
    </>
  );
}
