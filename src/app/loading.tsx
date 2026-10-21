import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="space-y-4 max-w-2xl">
        <div className="h-6 w-32 bg-slate-200 dark:bg-white/10 rounded-full" />
        <div className="h-10 sm:h-12 w-3/4 bg-slate-200 dark:bg-white/10 rounded-2xl" />
        <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded-lg" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-white/5 rounded-lg" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#0A1428]/60 p-6 space-y-4"
          >
            <div className="h-44 w-full bg-slate-200 dark:bg-white/5 rounded-2xl" />
            <div className="h-6 w-1/2 bg-slate-200 dark:bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded-md" />
            <div className="h-4 w-4/5 bg-slate-200 dark:bg-white/5 rounded-md" />
            <div className="h-10 w-full bg-slate-200 dark:bg-white/10 rounded-xl pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
