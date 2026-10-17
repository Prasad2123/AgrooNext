import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { ModalProvider } from '../context/ModalContext';
import { ConditionalPublicLayout } from '../components/ui/ConditionalPublicLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AgrooNext | Agro-Tech & Training',
  description:
    'Hands-on modern agricultural education and practical training in Hydroponics, Aeroponics, Mushroom Cultivation, Aquaculture, and Women Agri-Entrepreneurship. Supported by Naree Foundation.',
  keywords: [
    'AgrooNext',
    'Agro-Tech Training',
    'Hydroponics Course',
    'Aeroponics Workshop',
    'Mushroom Cultivation Training',
    'Aquaculture Training',
    'Women Agri-Entrepreneurship',
    'Modern Agriculture Education',
  ],
  authors: [{ name: 'AgrooNext' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/agroonext_icon_192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/agroonext_icon_192.png',
  },
  openGraph: {
    title: 'AgrooNext | Agro-Tech & Training',
    description:
      'Experiential, hands-on training in Hydroponics, Aeroponics, Mushroom Farming, Aquaculture, and Women in Agri-Entrepreneurship.',
    siteName: 'AgrooNext — Agro-Tech & Training',
    images: [
      {
        url: '/images/agroonext_logo.png',
        width: 1200,
        height: 630,
        alt: 'AgrooNext — Agro-Tech & Training',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#070d1e' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('agroonext-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#070D1E] text-slate-800 dark:text-slate-100 antialiased selection:bg-[#00897B] selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <ModalProvider>
            <ConditionalPublicLayout>
              {children}
            </ConditionalPublicLayout>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

