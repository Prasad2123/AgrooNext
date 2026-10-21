import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://agroonext.org';
  const now = new Date();

  const routes = [
    '',
    '/about',
    '/programmes',
    '/programmes/hydroponics',
    '/programmes/aeroponics',
    '/programmes/mushroom-farming',
    '/programmes/aquaculture',
    '/programmes/women-empowerment',
    '/learning-approach',
    '/courses',
    '/training-formats',
    '/faq',
    '/contact',
    '/login',
    '/register',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/programmes') ? 0.9 : 0.8,
  }));
}
