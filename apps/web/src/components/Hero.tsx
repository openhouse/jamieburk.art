import { site } from "@/data/site";
import { LinkButton } from "@/components/LinkButton";

export function Hero() {
  return (
    <section className="page-shell grid min-h-[calc(100svh-8rem)] items-center gap-10 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <div>
        <p className="small-caps text-[color:var(--color-primary)]">{site.name}</p>
        <p className="mt-3 text-lg font-semibold text-[color:var(--color-muted)]">{site.role}</p>
        <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.02] text-[color:var(--color-ink)] md:text-7xl">
          {site.headline}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-[color:var(--color-muted)]">
          I help teams turn ambiguous, stakeholder-heavy work into usable systems: requirements, workflows, documentation, decision trails, launch support, onboarding, and durable handoffs. My work spans civic technology, small-business digital transformation, public-facing web systems, coalition infrastructure, community platforms, and source-backed knowledge systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/work" variant="primary">
            View selected work
          </LinkButton>
          <LinkButton href="/resume">Download resume</LinkButton>
          <LinkButton href={`mailto:${site.email}`}>Contact Jamie</LinkButton>
        </div>
        <p className="mt-8 max-w-2xl text-sm font-semibold text-[color:var(--color-muted)]">
          Brooklyn, NY · Technical Operations · Product Operations · Civic Technology · Knowledge Systems · Public-Facing Tools
        </p>
      </div>
      <div aria-label="Operating structure diagram" className="surface p-5 shadow-sm">
        <div className="grid gap-3">
          {["Unclear situation", "Source discovery", "Workflow clarity", "Documentation", "Adoption support", "Durable handoff"].map((label, index) => (
            <div className="grid grid-cols-[2.5rem_1fr] items-center gap-3" key={label}>
              <span className="grid size-10 place-items-center rounded-[0.382rem] bg-[color:var(--color-highlight)] font-bold text-[color:var(--color-ink)]">
                {index + 1}
              </span>
              <span className="rounded-[0.382rem] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-3 font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
