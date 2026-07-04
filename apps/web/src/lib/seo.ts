import { site } from '@/data/site';

export function absoluteUrl(path = '/') {
  const base = site.url.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${site.name}` : site.name;
}

