import Link from "next/link";
import type { Route } from "next";
import { footerNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <p className="eyebrow">Selected proof system</p>
          <p className="footer-summary">
            Jamie creates operating structure for complex public-facing teams.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            {footerNavigation.map((item) => {
              const isExternal = item.href.startsWith("http");
              return (
                <li key={item.href}>
                  {isExternal ? (
                    <a href={item.href}>{item.label}</a>
                  ) : (
                    <Link href={item.href as Route}>{item.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="footer-note">
          Static, fast, and intentionally public-safe. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </footer>
  );
}
