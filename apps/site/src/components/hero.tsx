import { ArrowRight, Download, Mail } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="container-page section-pad">
      <div className="golden-split items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {site.name}
          </p>
          <p className="mt-3 text-xl font-semibold text-neutral">
            {site.title}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] md:text-7xl">
            {site.claim}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-neutral">
            {site.support} My work spans civic technology, small-business
            digital transformation, public-facing web systems, coalition
            infrastructure, community platforms, and source-backed knowledge
            systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/work">
              <ArrowRight aria-hidden size={18} />
              View selected work
            </LinkButton>
            <LinkButton href={site.resumePath} variant="secondary">
              <Download aria-hidden size={18} />
              Download resume
            </LinkButton>
            <LinkButton href={`mailto:${site.email}`} variant="ghost">
              <Mail aria-hidden size={18} />
              Contact Jamie
            </LinkButton>
          </div>
        </div>
        <aside className="rounded-md border border-base-300 bg-base-100 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Brooklyn, NY
          </p>
          <ul className="mt-4 grid gap-3 text-sm text-neutral">
            <li>Technical Operations</li>
            <li>Product Operations</li>
            <li>Civic Technology</li>
            <li>Knowledge Systems</li>
            <li>Public-Facing Tools</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
