import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="border-b border-base-300 bg-base-100/90">
      <div className="container-page navbar px-0">
        <div className="navbar-start">
          <Link className="flex flex-col leading-tight" href="/">
            <span className="font-bold">{site.name}</span>
            <span className="text-xs text-neutral">{site.title}</span>
          </Link>
        </div>
        <nav className="navbar-end hidden gap-1 md:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              className="btn btn-ghost btn-sm rounded-md"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="navbar-end md:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost btn-sm rounded-md">Menu</summary>
            <ul className="menu dropdown-content z-10 mt-3 w-64 rounded-md border border-base-300 bg-base-100 p-2 shadow-sm">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
