import Link from 'next/link';
import type { Route } from 'next';
import { primaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { ThemeController } from './ThemeController';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-content/10 bg-base-100/95 backdrop-blur">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="golden-shell navbar min-h-16 px-0" aria-label="Primary navigation">
        <div className="navbar-start">
          <Link className="text-base font-semibold text-base-content hover:text-primary" href="/">
            {site.name}
          </Link>
        </div>
        <div className="navbar-end hidden gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} className="btn btn-ghost btn-sm" href={item.href as Route}>
              {item.label}
            </Link>
          ))}
          <ThemeController />
        </div>
        <div className="navbar-end lg:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost btn-sm">Menu</summary>
            <ul className="menu dropdown-content z-50 mt-3 w-64 rounded-lg border border-base-content/10 bg-base-200 p-2 shadow">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href as Route}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
