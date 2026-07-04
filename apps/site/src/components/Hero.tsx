import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero-band">
      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{site.location} · Civic technology · Product operations · Knowledge systems</p>
          <h1>{site.name}</h1>
          <p className="role-line">{site.title}</p>
          <p className="hero-statement">{site.tagline}</p>
          <p className="hero-support">
            I help teams turn ambiguous, stakeholder-heavy work into clear workflows, documentation, decision trails,
            launch support, onboarding materials, public-facing tools, and durable handoffs.
          </p>
          <div className="button-row">
            <ButtonLink href="/work">View selected systems</ButtonLink>
            <ButtonLink href={site.links.resume} variant="secondary">
              Download resume
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact Jamie
            </ButtonLink>
          </div>
        </div>
        <div className="hero-map" aria-label="Portfolio focus map">
          <span className="map-node map-node-primary">usable systems</span>
          <span className="map-node">requirements</span>
          <span className="map-node">workflows</span>
          <span className="map-node">source trails</span>
          <span className="map-node">handoffs</span>
          <span className="map-node">public tools</span>
        </div>
      </div>
    </section>
  );
}
