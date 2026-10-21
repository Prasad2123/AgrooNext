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
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'right',
  ariaLabel,
  disabled = false,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2.5 px-6 py-3.5 
    rounded-xl font-semibold text-sm text-white tracking-wide
    bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00796B]
    hover:from-[#2E7D32] hover:via-[#009688] hover:to-[#00897B]
    active:scale-[0.98] transition-all duration-200
    shadow-lg shadow-[#1B5E20]/20 hover:shadow-[#00897B]/35
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#070D1E]
    min-h-[44px] cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed
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
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${baseClasses}`} aria-label={ariaLabel}>
      {content}
    </button>
  );
};
