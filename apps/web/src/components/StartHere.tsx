import Link from 'next/link';
import type { Route } from 'next';
import { routes } from '@/lib/routes';

const links = [
  { label: 'Technical Operations & Implementation', href: routes.technicalOperations },
  { label: 'Harry J. Epstein Company', href: '/work/harry-j-epstein' },
  { label: 'FairRentNYC / NYC Artist Coalition', href: '/work/fairrentnyc-commercial-rent-stabilization' },
  { label: 'CallNYC.org', href: '/work/callnyc' },
  { label: 'Resume', href: routes.resume }
];

export function StartHere() {
  return (
    <section className="golden-shell py-12">
      <div className="border border-base-content/10 bg-base-200 p-6">
        <h2 className="text-2xl font-semibold">Start here</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.href}
              className="border border-base-content/10 bg-base-100 p-4 text-sm font-semibold hover:border-primary hover:text-primary"
              href={link.href as Route}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
