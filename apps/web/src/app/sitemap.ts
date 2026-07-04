import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { getPublicWorkEntries } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/work', '/work/technical-operations', '/about', '/resume', '/contact', '/colophon'];
  const workRoutes = getPublicWorkEntries().map((entry) => `/work/${entry.slug}`);

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7
  }));
}

