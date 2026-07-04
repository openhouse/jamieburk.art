import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-title">{site.name}</p>
        <p>{site.role}</p>
      </div>
      <div className="footer-links">
        <Link href="/colophon">Colophon</Link>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
