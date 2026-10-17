import React from 'react';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  glowEffect?: 'teal' | 'rose' | 'none';
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className = '',
  wrapperClassName = '',
  glowEffect = 'none',
}) => {
  return (
    <section id={id} className={`relative py-20 sm:py-28 lg:py-36 overflow-hidden ${wrapperClassName}`}>
      {glowEffect === 'teal' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00897B]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      )}
      {glowEffect === 'rose' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C2185B]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      )}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${className}`}>
        {children}
      </div>
    </section>
  );
};
