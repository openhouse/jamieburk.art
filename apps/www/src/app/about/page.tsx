import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { Cite } from "@/components/citations/Cite";
import { References } from "@/components/citations/References";
import { getClaimProjection } from "@/data/knowledge-bank";
import { requireReadyOrCarefulProof } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const aiEvalsProof = requireReadyOrCarefulProof(
  "ai-evals-professional-development"
);
const openHouseThroughline = getClaimProjection(
  "CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE",
  "about",
  "/about"
);
const relationalSystemsThroughline = getClaimProjection(
  "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS",
  "about",
  "/about"
);
const recursiveMethodExamples = [
  {
    title: "Open House",
    href: "/about#sources-and-notes",
    projection: getClaimProjection(
      "CLM-OPEN-HOUSE-ITERATIVE-GOVERNANCE",
      "about",
      "/about"
    ),
    occurrenceId: "open-house-recursive-method"
  },
  {
    title: "CallNYC",
    href: "/work/callnyc",
    projection: getClaimProjection(
      "CLM-CALLNYC-RECURSIVE-METHOD",
      "about",
      "/about"
    ),
    occurrenceId: "callnyc-recursive-method"
  },
  {
    title: "NYC Artist Coalition",
    href: "/work/nyc-artist-coalition",
    projection: getClaimProjection(
      "CLM-NYCAC-RECURSIVE-METHOD",
      "about",
      "/about"
    ),
    occurrenceId: "nycac-recursive-method"
  }
] as const;

export const metadata: Metadata = createMetadata({
  title: "About - Jamie Burkart",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">About</h1>
        <div className="mt-8 space-y-6 text-xl leading-9 text-jb-ink/78">
          <p>
            I am Jamie Burkart, a technical project manager and implementation
            lead based in Brooklyn.
          </p>
          <p>
            My work sits where the stakes are human and the operating structure
            is still forming: civic technology, small-business operations,
            public-facing tools, cultural infrastructure, coalition work, and
            knowledge systems.
          </p>
          <p>
            Across projects, I tend to do the same kind of work: clarify
            ambiguous goals, translate between technical and nontechnical
            stakeholders, map workflows, build documentation, create usable
            interfaces, coordinate implementation, and leave behind handoffs
            people can use after the meeting or launch is over.
          </p>
          <section aria-labelledby="one-practice-many-forms" className="pt-4">
            <h2
              className="text-3xl font-bold text-jb-ink"
              id="one-practice-many-forms"
            >
              One practice, many forms
            </h2>
            <div className="mt-5 space-y-5">
              <p>
                {openHouseThroughline.text}
                <Cite pageId="about" occurrenceId="open-house-throughline" />
              </p>
              <p>
                {relationalSystemsThroughline.text}
                <Cite
                  pageId="about"
                  occurrenceId="relational-systems-throughline"
                />
              </p>
              <p>
                The medium changes across Open House, Sunday Dinner, {" "}
                <Link href="/work/wowlist">WOW List</Link>, {" "}
                <Link href="/work/callnyc">CallNYC</Link>, and {" "}
                <Link href="/work/nyc-artist-coalition">
                  NYC Artist Coalition
                </Link>
                . The recurring move is to create a structure people can enter,
                understand, alter, and carry together. That is also what I bring
                to technical project management.
              </p>
              <p>
                The details that matter are relational: who feels invited, how
                a place holds people, what atmosphere makes possible, how
                authorship is shared, and what careful attention reveals.
              </p>
              <section
                aria-labelledby="recursive-method-heading"
                className="mt-8 border-y border-jb-blue/20 py-7"
              >
                <h3
                  className="text-2xl font-bold text-jb-ink"
                  id="recursive-method-heading"
                >
                  A recursive method in practice
                </h3>
                <p className="mt-3 text-base leading-7 text-jb-ink/68">
                  Observe relationships, model them, build something people can
                  use, learn from the response, and revise.
                </p>
                <dl className="mt-6 divide-y divide-jb-blue/15">
                  {recursiveMethodExamples.map((example) => (
                    <div
                      className="grid gap-2 py-5 first:pt-0 last:pb-0 md:grid-cols-[10rem_1fr] md:gap-6"
                      key={example.title}
                    >
                      <dt className="text-base font-bold text-jb-ink">
                        <Link href={example.href}>{example.title}</Link>
                      </dt>
                      <dd className="text-base leading-7 text-jb-ink/72">
                        {example.projection.text}
                        <Cite
                          pageId="about"
                          occurrenceId={example.occurrenceId}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </section>
          <p>
            I am currently focused on technical project management, product
            operations, implementation, business analysis, civic/govtech
            delivery, and source-backed knowledge systems.
          </p>
          <p>{aiEvalsProof.publicWording}</p>
        </div>
        <div className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
        <References pageId="about" />
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
