import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <p className="footer-name">{site.name}</p>
          <p>{site.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={site.links.linkedin}>LinkedIn</a>
          <a href={site.links.github}>GitHub</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
