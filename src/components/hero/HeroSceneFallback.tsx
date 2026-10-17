'use client';

import React from 'react';
import Image from 'next/image';

export const HeroSceneFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-slate-100 via-white to-slate-200/60 dark:from-[#071329] dark:via-[#0A1A38] dark:to-[#040915] shadow-2xl transition-colors duration-300">
      {/* Radial ambient glow */}
      <div className="absolute w-[360px] h-[360px] bg-[#00897B]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] bg-[#FB8C00]/10 rounded-full blur-[80px] pointer-events-none translate-y-8" />

      {/* Modern Hydroponic Channel Grid Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] rounded-full border border-[#00897B]/25 border-dashed animate-spin [animation-duration:60s]" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-slate-300 dark:border-white/10 animate-spin [animation-duration:40s] [animation-direction:reverse]" />
        <div className="absolute w-[160px] h-[160px] rounded-full border border-[#2E7D32]/30" />
      </div>

      {/* Central AgrooNext Botanical Emblem */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white dark:bg-[#08152B] border border-slate-200 dark:border-white/15 p-4 flex items-center justify-center shadow-2xl backdrop-blur-md">
          {/* Inner pulsating glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-[#00897B]/20 via-transparent to-[#FB8C00]/15 animate-pulse" />
          
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AgrooNext Official Logo"
              width={112}
              height={112}
              className="object-contain filter drop-shadow-[0_0_12px_rgba(0,137,123,0.35)]"
              priority
            />
          </div>
        </div>

        {/* Botanical Stem Line */}
        <div className="w-0.5 h-14 bg-gradient-to-b from-[#00897B] to-transparent mt-4 opacity-70" />
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-2">
          AgrooNext Cultivation Science
        </span>
      </div>
    </div>
  );
};
