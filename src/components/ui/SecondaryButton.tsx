import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
}

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'right',
  ariaLabel,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2.5 px-6 py-3.5 
    rounded-xl font-semibold text-sm tracking-wide
    bg-white hover:bg-slate-50 text-slate-800 border border-slate-300
    dark:bg-[#0F2C59]/40 dark:hover:bg-[#0F2C59]/80 dark:text-[#F8FAFC] dark:border-white/10 dark:hover:border-[#00897B]/50
    active:scale-[0.98] transition-all duration-200
    backdrop-blur-md shadow-sm hover:shadow-md hover:shadow-[#00897B]/10
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#070D1E]
    min-h-[44px] cursor-pointer select-none
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    if (href.startsWith('#')) {
      return (
        <a href={href} className={`group ${baseClasses}`} aria-label={ariaLabel} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`group ${baseClasses}`} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`group ${baseClasses}`} aria-label={ariaLabel}>
      {content}
    </button>
  );
};
