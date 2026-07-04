import Link from "next/link";
import type { Route } from "next";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-shell navbar px-0">
        <div className="navbar-start">
          <Link className="brand-mark" href="/">
            <span>{site.name}</span>
            <small>{site.title}</small>
          </Link>
        </div>
        <nav aria-label="Primary navigation" className="navbar-end">
          <ul className="nav-list">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href as Route}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
