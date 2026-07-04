import Link from "next/link";

import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t quiet-rule bg-base-200">
      <div className="main grid gap-6 py-10 md:grid-cols-[1.2fr_1fr]">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{site.name}</p>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            Static-first, content-led, and maintained in MDX. Public case studies use summaries rather than
            private records. Sensitive civic, client, and community materials are omitted or generalized.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-2 md:justify-end">
          {navigation.map((item) => (
            <Link className="btn btn-ghost btn-sm rounded-lg" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
