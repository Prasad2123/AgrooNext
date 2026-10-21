import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMES_DATA } from '@/data/programmes';
import { ProgrammeDetailView } from '@/components/programmes/ProgrammeDetailView';

export const metadata: Metadata = {
  title: 'Aeroponics Training & Certification | AgrooNext',
  description:
    'Master high-pressure mist systems, root-zone oxygenation, automated cyclic timing, and vertical farming at AgrooNext training labs.',
};

export default function AeroponicsPage() {
  const programme = PROGRAMMES_DATA.find((p) => p.slug === 'aeroponics');
  if (!programme) return notFound();

  return <ProgrammeDetailView programme={programme} />;
}
