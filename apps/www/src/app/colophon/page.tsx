import Link from "next/link";
import type { Metadata } from "next";
import { Claim, References } from "@/components/citations";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "How Jamie Burkart's public-safe portfolio is composed from a federated Knowledge Wiki Graph practice.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "Semantic, evidence, and source-custody responsibilities kept distinct across locally authoritative project repositories",
  "Audience-specific outputs composed through citations, evaluations, correction paths, and human review",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla for body text, Oswald for labels, and a system serif for display headings",
  "No private or proprietary font files are committed or served",
  "Human Index colors derived from Jamie's work jacket, civic documents, and material practice",
  "A small, metadata-stripped photographic layer selected from Jamie's archive",
  "Staging-first Docker / Dokku deployment with staging noindex by default",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">How this is made</p>
          <h1 className="mt-3 text-6xl leading-none text-jb-ink">Colophon</h1>
        </div>
        <div className="mt-6 space-y-5 text-xl leading-8 text-jb-ink/76">
          <p>
            This site is a selective public proof surface, not a mirror of the
            underlying archives. Public-safe artifacts, source-linked claims,
            evaluations, correction paths, and human review shape what appears
            here.
          </p>
          <p>
            <Claim
              claimId="CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
              projection="case-study"
              surface="/colophon"
              pageId="colophon"
              occurrenceId="knowledge-wiki-graph-method"
            />{" "}
            <Link
              className="font-semibold text-jb-blue hover:text-jb-green"
              href="/lab/source-backed-team-memory"
            >
              Read the evolving method.
            </Link>
          </p>
          <p>
            The design joins a work-jacket blue, institutional forms, a quiet
            proportional grid, and a small selection from Jamie&apos;s photo archive.
            Staging is reviewable but not indexable; production publication still
            requires content, rights, and metadata review.
          </p>
        </div>
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Working system</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Digital structure, material attention
          </h2>
        </div>
        <ol className="border-t border-jb-ink/20">
          {details.map((detail, index) => (
            <li
              className="grid gap-3 border-b border-jb-ink/20 py-4 sm:grid-cols-[3rem_1fr]"
              key={detail}
            >
              <span className="font-label text-sm text-jb-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-jb-ink/76">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-12 max-w-3xl">
        <References pageId="colophon" />
      </div>
    </div>
  );
}
