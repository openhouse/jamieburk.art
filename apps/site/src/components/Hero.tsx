import { site } from "@/lib/site";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="site-shell py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
        <div>
          <p className="eyebrow">{site.name}</p>
          <p className="mt-3 text-xl font-semibold text-[var(--color-muted)]">{site.role}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-[var(--color-ink)] sm:text-6xl">{site.headline}</h1>
          <p className="mt-6 max-w-3xl text-xl text-[var(--color-muted)]">
            I help teams turn ambiguous, stakeholder-heavy work into usable systems: requirements, workflows, documentation, decision trails, launch support, onboarding, public-facing tools, and durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/work">View selected work</CTAButton>
            <CTAButton href={site.resumePath} variant="secondary">Download resume</CTAButton>
            <CTAButton href="/contact" variant="secondary">Contact Jamie</CTAButton>
          </div>
        </div>
        <aside className="paper-panel p-6">
          <p className="eyebrow">Location and practice</p>
          <p className="mt-3 text-lg">{site.locationLine}</p>
        </aside>
      </div>
    </section>
  );
}
