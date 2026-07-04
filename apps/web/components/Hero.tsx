import { ButtonLink } from "./ButtonLink";

import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="section">
      <div className="container golden-split items-center">
        <div>
          <p className="eyebrow mb-4">{site.name}</p>
          <p className="mb-5 max-w-2xl text-lg font-black text-primary">
            {site.role}
          </p>
          <h1 className="h1 max-w-5xl">{site.headline}</h1>
          <p className="lead mt-7 max-w-3xl">
            I help teams turn ambiguous, stakeholder-heavy work into usable
            systems: requirements, workflows, documentation, decision trails,
            launch support, onboarding, and durable handoffs. My work spans
            civic technology, small-business digital transformation,
            public-facing web systems, coalition infrastructure, community
            platforms, and source-backed knowledge systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/work">View selected work</ButtonLink>
            <ButtonLink download href={site.resumePath} variant="secondary">
              Download résumé
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="ghost">
              Contact Jamie
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-3xl text-sm font-bold text-muted">
            Brooklyn, NY · Technical Operations · Product Operations · Civic
            Technology · Knowledge Systems · Public-Facing Tools
          </p>
        </div>
        <div className="artifact-preview" aria-hidden="true" />
      </div>
    </section>
  );
}
