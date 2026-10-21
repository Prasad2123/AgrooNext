import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMES_DATA } from '@/data/programmes';
import { ProgrammeDetailView } from '@/components/programmes/ProgrammeDetailView';

export const metadata: Metadata = {
  title: 'Mushroom Farming Training & Certification | AgrooNext',
  description:
    'Commercial edible and functional mycology: Oyster, Milky, Button mushroom substrate pasteurization, clean spawn inoculation, and climate-controlled fruiting.',
};

export default function MushroomFarmingPage() {
  const programme = PROGRAMMES_DATA.find((p) => p.slug === 'mushroom-farming');
  if (!programme) return notFound();

  return <ProgrammeDetailView programme={programme} />;
}
