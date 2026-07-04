import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="source-map">
      <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow mb-4">{site.location} - Civic technology - Product operations</p>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.02] md:text-7xl">
            Jamie Burkart
          </h1>
          <p className="mt-5 text-2xl font-bold text-[color:var(--color-broadway-blue)] md:text-3xl">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-7 max-w-3xl text-2xl font-bold leading-snug md:text-4xl">
            I create operating structure for complex public-facing teams.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--color-muted)]">
            I help teams turn ambiguous, stakeholder-heavy work into usable systems:
            requirements, workflows, documentation, decision trails, public tools, launch support,
            onboarding, source maps, and durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/work">View selected systems</ButtonLink>
            <ButtonLink href="/resume" icon="download" variant="secondary">
              Download resume
            </ButtonLink>
            <ButtonLink href="/contact" icon="mail" variant="ghost">
              Contact Jamie
            </ButtonLink>
          </div>
        </div>
        <div className="surface p-5">
          <p className="eyebrow mb-4">Public-safe proof map</p>
          <div className="grid gap-3">
            {["Ambiguity", "Sources", "Workflows", "Launch", "Handoff"].map((label, index) => (
              <div className="flex items-center gap-3" key={label}>
                <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-black text-primary-content">
                  {index + 1}
                </span>
                <span className="font-bold">{label}</span>
                <span className="h-px flex-1 bg-[color:var(--color-line)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
