import Link from "next/link";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldPhoto } from "@/components/FieldPhoto";
import { Hero } from "@/components/Hero";
import { portfolioPhotos } from "@/data/photography";

const productLanes = [
  {
    number: "01",
    title: "Find the real problem",
    body: "Listen across residents, operators, subject-matter experts, and decision-makers; frame needs, risks, and the smallest useful release."
  },
  {
    number: "02",
    title: "Make the path testable",
    body: "Turn complex policy, data, and operating context into flows, prototypes, requirements, decision records, and launch plans."
  },
  {
    number: "03",
    title: "Ship what can last",
    body: "Coordinate delivery, learn from use, surface failure honestly, and leave documentation, ownership, and metrics behind."
  }
];

const cases = [
  {
    name: "WOW List",
    href: "/work/wowlist",
    title: "A community platform built around how culture actually travels.",
    body: "I co-built the product model and platform that let people follow local arts and music through keywords, places, and trusted community signals.",
    proof: "Product model · platform delivery · community adoption",
    className: "jb-case-wow"
  },
  {
    name: "CallNYC",
    href: "/work/callnyc",
    title: "Public data translated into a resident-facing route.",
    body: "I designed an independent civic prototype that turned government records into issue- and place-based next steps people could understand and act on.",
    proof: "Problem framing · information architecture · working prototype",
    className: "jb-case-callnyc"
  },
  {
    name: "Fair Rent NYC",
    href: "/work/fair-rent-nyc",
    title: "Policy work made legible, coordinated, and public.",
    body: "As an organizer working collectively, I have built campaign websites, coalition memory, source maps, public materials, and current report-review and speaking contributions.",
    proof: "Public launch · stakeholder translation · governed evidence",
    className: "jb-case-fairrent"
  }
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="jb-frame jb-product-lanes" aria-labelledby="what-i-lead">
        <div className="jb-product-section-intro">
          <h2 id="what-i-lead">What I lead</h2>
          <p>
            The whole path from a consequential, loosely defined need to a public
            service with a team, an operating rhythm, and an accountable next step.
          </p>
        </div>
        <ol>
          {productLanes.map((lane) => (
            <li key={lane.number}>
              <span>{lane.number}</span>
              <h3>{lane.title}</h3>
              <p>{lane.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="jb-casebook" aria-labelledby="selected-product-work">
        <div className="jb-frame">
          <div className="jb-casebook-heading">
            <h2 id="selected-product-work">Three products. One operating instinct.</h2>
            <p>
              Make complexity navigable without flattening the people, evidence,
              policy, or maintenance work inside it.
            </p>
          </div>

          <article className="jb-case-feature jb-case-wow">
            <div className="jb-case-copy">
              <h3><span>{cases[0].name}:</span> {cases[0].title}</h3>
              <div className="jb-case-evidence-field" aria-hidden="true">
                <span>NEEDS</span><span>OFFERS</span><span>PLACES</span><span>NEXT MOVES</span>
              </div>
              <p className="jb-case-body">{cases[0].body}</p>
              <p className="jb-case-proof">{cases[0].proof}</p>
              <Link href={cases[0].href as Route}>Read the WOW List case <span aria-hidden="true">→</span></Link>
            </div>
            <FieldPhoto
              imageClassName="aspect-[3/2]"
              photo={portfolioPhotos.collectiveSynthesis}
              sizes="(max-width: 1023px) 100vw, 52vw"
            />
          </article>

          <div className="jb-case-pair">
            <article className="jb-case-feature jb-case-callnyc">
              <FieldPhoto
                imageClassName="aspect-[1.55/1] object-[center_42%]"
                photo={portfolioPhotos.callNycInterface}
                sizes="(max-width: 1023px) 100vw, 48vw"
              />
              <div className="jb-case-copy">
                <h3><span>{cases[1].name}:</span> {cases[1].title}</h3>
                <p className="jb-case-body">{cases[1].body}</p>
                <p className="jb-case-proof">{cases[1].proof}</p>
                <Link href={cases[1].href as Route}>Read the CallNYC case <span aria-hidden="true">→</span></Link>
              </div>
            </article>
            <article className="jb-case-feature jb-case-fairrent">
              <FieldPhoto
                imageClassName="aspect-[1.55/1] object-[center_58%]"
                photo={portfolioPhotos.fairRentMaterials}
                sizes="(max-width: 1023px) 100vw, 48vw"
              />
              <div className="jb-case-copy">
                <h3><span>{cases[2].name}:</span> {cases[2].title}</h3>
                <p className="jb-case-body">{cases[2].body}</p>
                <p className="jb-case-proof">{cases[2].proof}</p>
                <Link href={cases[2].href as Route}>Read the Fair Rent case <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="jb-frame jb-method-field" aria-labelledby="built-for-reality">
        <div className="jb-method-copy">
          <h2 id="built-for-reality">Built for reality, including what happens after launch.</h2>
          <p>
            I bring a product manager’s sequencing, a technical lead’s fluency,
            and an operator’s respect for maintenance. Documentation is not the
            residue of delivery; it is part of how ownership moves.
          </p>
          <Link className="jb-text-link" href="/work/technical-operations">
            Explore the full delivery practice <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="jb-method-photos">
          <FieldPhoto
            imageClassName="aspect-[4/3]"
            photo={portfolioPhotos.materialRepair}
            sizes="(max-width: 1023px) 100vw, 36vw"
          />
          <FieldPhoto
            imageClassName="aspect-[3/4]"
            photo={portfolioPhotos.inventiveLogistics}
            sizes="(max-width: 1023px) 70vw, 23vw"
          />
        </div>
      </section>

      <section className="jb-next-move">
        <div className="jb-frame grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2>Need someone who can enter complexity and leave a usable system?</h2>
          <div>
            <p>
              I am looking for senior product and technical delivery roles in
              public service, civic technology, and mission-driven organizations.
            </p>
            <div className="mt-6"><ContactCTA compact /></div>
          </div>
        </div>
      </section>
    </>
  );
}
