'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { ScrollProgress } from './ScrollProgress';
import { EnquiryModal } from './EnquiryModal';

/**
 * ConditionalPublicLayout
 *
 * Wraps the public-facing SiteHeader, SiteFooter, ScrollProgress, and
 * EnquiryModal. These components are ONLY rendered for public marketing
 * routes (i.e. routes that are not under /admin, /portal, /login, or
 * /register).
 *
 * This keeps the root layout.tsx from injecting public chrome into
 * authenticated / app-shell pages that manage their own navigation.
 */
const PRIVATE_ROUTE_PREFIXES = ['/admin', '/portal', '/login', '/register'];

export function ConditionalPublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute = !PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isPublicRoute) {
    // Auth / app-shell pages render without public chrome
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content" className="relative min-h-screen">
        {children}
      </main>
      <SiteFooter />
      <EnquiryModal />
    </>
  );
}
