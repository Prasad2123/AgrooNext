import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMES_DATA } from '@/data/programmes';
import { ProgrammeDetailView } from '@/components/programmes/ProgrammeDetailView';

export const metadata: Metadata = {
  title: 'Hydroponics Training & Certification | AgrooNext',
  description:
    'Hands-on practical training in NFT channels, DWC, vertical towers, computerized EC/pH dosing, and protected cultivation in Pune, Maharashtra.',
};

export default function HydroponicsPage() {
  const programme = PROGRAMMES_DATA.find((p) => p.slug === 'hydroponics');
  if (!programme) return notFound();

  return <ProgrammeDetailView programme={programme} />;
}
