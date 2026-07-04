import Link from "next/link";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-mark" href="/" aria-label="Jamie Burkart home">
        <span>{site.name}</span>
      </Link>
      <nav aria-label="Primary navigation" className="site-nav">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
