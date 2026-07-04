import Link from 'next/link';
import type { Route } from 'next';
import { footerNav } from '@/data/navigation';
import { site } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-base-content/10 bg-base-200">
      <div className="golden-shell grid gap-8 py-10 md:grid-cols-[minmax(0,61.8034%)_minmax(15rem,38.1966%)]">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-base-content/70">{site.referrer}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {footerNav.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('http') || item.href.startsWith('mailto') ? (
                  <a className="btn btn-ghost btn-sm" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <Link className="btn btn-ghost btn-sm" href={item.href as Route}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
