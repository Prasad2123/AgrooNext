import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMES_DATA } from '@/data/programmes';
import { ProgrammeDetailView } from '@/components/programmes/ProgrammeDetailView';

export const metadata: Metadata = {
  title: 'Aquaculture & Biofloc Training | AgrooNext',
  description:
    'Intensive Recirculating Aquaculture Systems (RAS) and Biofloc technology: water chemistry, dissolved oxygen, C:N ratios, and fish nutrition.',
};

export default function AquaculturePage() {
  const programme = PROGRAMMES_DATA.find((p) => p.slug === 'aquaculture');
  if (!programme) return notFound();

  return <ProgrammeDetailView programme={programme} />;
}
