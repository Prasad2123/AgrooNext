import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  badgeColor?: 'teal' | 'rose' | 'amber' | 'emerald';
  title: string | React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeColor = 'teal',
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  const badgeStyles = {
    teal: 'bg-[#00897B]/10 dark:bg-[#00897B]/15 text-[#00695C] dark:text-[#00897B] border-[#00897B]/30',
    rose: 'bg-[#C2185B]/10 dark:bg-[#C2185B]/15 text-[#AD1457] dark:text-[#E91E63] border-[#C2185B]/30',
    amber: 'bg-[#FB8C00]/10 dark:bg-[#FB8C00]/15 text-[#E65100] dark:text-[#FFB74D] border-[#FB8C00]/30',
    emerald: 'bg-[#2E7D32]/10 dark:bg-[#2E7D32]/15 text-[#1B5E20] dark:text-[#81C784] border-[#2E7D32]/30',
  };

  return (
    <div className={`space-y-3.5 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm ${badgeStyles[badgeColor]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-display leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
