import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label={`${site.name} home`}>
        <span>{site.name}</span>
        <small>{site.title}</small>
      </Link>
      <nav aria-label="Primary navigation">
        <ul>
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
