import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMES_DATA } from '@/data/programmes';
import { ProgrammeDetailView } from '@/components/programmes/ProgrammeDetailView';

export const metadata: Metadata = {
  title: 'Women Empowerment & Agri-Entrepreneurship | AgrooNext',
  description:
    'Livelihood skills, Self-Help Group (SHG) collective production, unit costing, packaging, digital bookkeeping, and enterprise canvas planning.',
};

export default function WomenEmpowermentPage() {
  const programme = PROGRAMMES_DATA.find((p) => p.slug === 'women-empowerment');
  if (!programme) return notFound();

  return <ProgrammeDetailView programme={programme} />;
}
