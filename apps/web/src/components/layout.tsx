import Link from "next/link";
import { siteConfig } from "@jamie/site-content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" href="/">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation" className="nav">
          {siteConfig.nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{siteConfig.name} - {siteConfig.role}</p>
        <nav aria-label="Footer navigation" className="nav">
          <Link href="/colophon">Colophon</Link>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
