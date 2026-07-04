import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow">{site.location} / Technical Operations / Civic Technology</p>
        <h1>{site.name}</h1>
        <p className="role-line">{site.role}</p>
        <p className="claim-line">{site.claim}</p>
        <p>{site.expandedClaim} My work spans civic technology, small-business digital transformation, public-facing web systems, coalition infrastructure, community platforms, and source-backed knowledge systems.</p>
        <div className="hero-actions" aria-label="Primary actions">
          <ButtonLink href="/work">View selected work</ButtonLink>
          <ButtonLink href={site.resumePath} variant="secondary">Download resume</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">Contact Jamie</ButtonLink>
        </div>
      </div>
      <div className="hero-visual" aria-label="Abstract source-map visual">
        <Image
          src="/images/work/source-map-broadway.png"
          alt="Abstract case-file map with Broadway blue lines and oil-pastel color markers."
          width={1200}
          height={900}
          priority
        />
      </div>
    </section>
  );
}
