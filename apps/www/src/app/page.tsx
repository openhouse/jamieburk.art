import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

const productMoves = [
  {
    title: "Discover",
    text: "Frame the real problem with users, partners, operators, and the people carrying the constraints.",
    proof: "Participatory research, public meetings, source maps, field observation"
  },
  {
    title: "Deliver",
    text: "Turn complexity into a bounded release: priorities, requirements, workflows, implementation, and a clear launch path.",
    proof: "Working products, civic interfaces, campaign tools, operating systems"
  },
  {
    title: "Sustain",
    text: "Build adoption, measurement, documentation, and ownership into the product so it survives the handoff.",
    proof: "Onboarding, communications, instrumentation, maintenance, durable memory"
  }
];

const supportingPhotos = [
  portfolioPhotos.collectiveSynthesis,
  portfolioPhotos.civicInterface,
  portfolioPhotos.publicInformationMaterials,
  portfolioPhotos.maintenanceInPractice,
  portfolioPhotos.bicycleCanoeSystem,
  portfolioPhotos.eastRiver
];

const selectedCases = [
  {
    href: "/work/wowlist",
    title: "WOW List",
    role: "Co-builder and product steward with Richard Caceres",
    summary:
      "A working multi-user community-calendar platform shaped through participatory discovery, organizer support, communications, instrumentation, and long-term stewardship.",
    proof: "End-to-end product practice",
    tone: "blue"
  },
  {
    href: "/work/harry-j-epstein",
    title: "Harry J. Epstein Company",
    role: "Technical Project Manager and Web Systems Lead",
    summary:
      "Long-running e-commerce, content, analytics, marketing, and operational modernization for an 80+ year-old business.",
    proof: "Implementation and operations",
    tone: "green"
  },
  {
    href: "/work/fair-rent-nyc",
    title: "NYC Artist Coalition / Fair Rent NYC",
    role: "Co-founder, civic systems, coalition operations, policy communications",
    summary:
      "Public-facing tools, source maps, campaign memory, participation systems, and policy communications built across a collective advocacy effort.",
    proof: "Public-interest delivery",
    tone: "ochre"
  }
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="jb-product-proof" id="product-proof">
        <div className="jb-frame">
          <div className="jb-product-proof-heading">
            <h2>A product leader for the difficult middle.</h2>
            <p>
              My strongest work happens between a public need and a durable
              service—where research, delivery, policy, operations, and trust
              have to become one coherent product practice.
            </p>
          </div>
          <ol className="jb-product-moves">
            {productMoves.map((move) => (
              <li key={move.title}>
                <h3>{move.title}</h3>
                <p>{move.text}</p>
                <span>{move.proof}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="jb-product-casefile">
        <div className="jb-frame">
          <div className="jb-product-casefile-intro">
            <h2>Three cases make the argument.</h2>
            <p>
              Product, implementation, and civic delivery are not separate
              stories here. They are the same recurring capability under
              different conditions.
            </p>
          </div>
          <div className="jb-product-case-list">
            {selectedCases.map((item, index) => (
              <Link
                className={`jb-product-case jb-product-case-${item.tone}`}
                href={item.href}
                key={item.href}
              >
                <span className="jb-product-case-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="jb-product-case-role">{item.role}</p>
                  <p className="jb-product-case-summary">{item.summary}</p>
                </div>
                <span className="jb-product-case-proof">{item.proof}</span>
                <span className="jb-product-case-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="jb-product-field" aria-labelledby="field-record-title">
        <div className="jb-frame">
          <div className="jb-product-field-intro">
            <h2 id="field-record-title">The work leaves a field record.</h2>
            <p>
              These seven photographs—the terminal six from a recursive career
              edit plus the retained East River canary—show product practice in
              material form: synthesis, interface, communication, maintenance,
              invention, direct exchange, and public context.
            </p>
          </div>
          <div className="jb-product-filmstrip">
            {supportingPhotos.map((photo) => (
              <figure key={photo.id}>
                <div className="jb-product-filmstrip-frame">
                  <Image
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 42vw, 26vw"
                    src={photo.src}
                  />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="jb-product-close">
        <div className="jb-frame jb-product-close-grid">
          <div>
            <h2>I can help a public-facing team move.</h2>
            <p className="jb-product-close-copy">
              Bring me the consequential product that still has too many
              languages, owners, constraints, or unknowns. I will help make the
              next decision clear and the resulting system usable.
            </p>
          </div>
          <div className="jb-product-contact">
            <p className="jb-product-contact-label">Next conversation</p>
            <p className="jb-product-contact-copy">
              For Senior Product Manager roles in civic technology,
              public-interest delivery, or complex implementation.
            </p>
            <div className="jb-product-actions">
              <a className="jb-product-primary" href={site.emailHref}>
                Email Jamie
              </a>
              <Link className="jb-product-secondary" href="/resume">
                View resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
