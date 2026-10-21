import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { IntroSection } from '../components/sections/IntroSection';
import { ProgrammesSection } from '../components/sections/ProgrammesSection';
import { LearningApproachSection } from '../components/sections/LearningApproachSection';
import { CourseFormatsHomeSection } from '../components/sections/CourseFormatsHomeSection';
import { InstitutionalHomeSection } from '../components/sections/InstitutionalHomeSection';
import { CallToActionSection } from '../components/sections/CallToActionSection';
import { ContactSection } from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section with 5px Green Border & Visual Branding */}
      <HeroSection />

      {/* 2. Concise Foundation Introduction & 4 Pillars linking to /about */}
      <IntroSection />

      {/* 3. Featured Programmes Showcase linking to 5 individual programme pages & /programmes */}
      <ProgrammesSection />

      {/* 4. 4-Pillar Pedagogical Learning Methodology linking to /learning-approach */}
      <LearningApproachSection />

      {/* 5. Course Formats & Approved Fee Tiers Overview linking to /courses & /training-formats */}
      <CourseFormatsHomeSection />

      {/* 6. Turnkey Institutional Training for Schools & Colleges linking to /training-formats */}
      <InstitutionalHomeSection />

      {/* 7. Clear Inspiring Call to Action */}
      <CallToActionSection />

      {/* 8. Contact & Admissions Destination submitting to /api/inquiries */}
      <ContactSection />
    </>
  );
}
