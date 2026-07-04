import { routes } from '@/lib/routes';
import type { NavItem } from '@/lib/types';

export const primaryNav: NavItem[] = [
  { label: 'Work', href: routes.work },
  { label: 'Technical Operations', href: routes.technicalOperations },
  { label: 'About', href: routes.about },
  { label: 'Resume', href: routes.resume },
  { label: 'Contact', href: routes.contact }
];

export const footerNav: NavItem[] = [
  { label: 'Email', href: `mailto:${'jamie.burkart@gmail.com'}` },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jamieburkart/' },
  { label: 'GitHub', href: 'https://github.com/openhouse' },
  { label: 'Resume', href: routes.resume },
  { label: 'Colophon', href: routes.colophon }
];

