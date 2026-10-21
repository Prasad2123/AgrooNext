'use client';

import React, { useEffect } from 'react';
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
 * routes (i.e. routes that are not under /admin, /portal, /login, /register, or /access-denied).
 *
 * Keeps authenticated shells completely isolated.
 */
const PRIVATE_ROUTE_PREFIXES = ['/admin', '/portal', '/login', '/register', '/access-denied'];

export function ConditionalPublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  const isPublicRoute = !PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isPublicRoute) {
    // Auth / app-shell pages render without public chrome
    return <>{children}</>;
  }

  const isHomepage = pathname === '/';

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content" className={`relative min-h-screen ${isHomepage ? '' : 'pt-20 sm:pt-24'}`}>
        {children}
      </main>
      <SiteFooter />
      <EnquiryModal />
    </>
  );
}
