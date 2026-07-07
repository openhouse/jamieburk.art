import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe selected proof site.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Website copy projected from a public-safe proofs bank in the repo",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla carries readable prose and interface text; Archivo Narrow carries compact headings, proof labels, metadata, and civic-notice moments",
  "No private or proprietary font files are committed or served",
  "Designed with Broadway blue, Jamie's oil-pastel palette, and a quiet proportional grid",
  "Staging-first Docker / Dokku deployment with staging noindex by default",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public-safe selected proof system. It
          uses local MDX content, public-safe artifacts, and intentionally
          limited tracking. The repo now keeps a public-safe proofs bank; the
          website is the edited projection of that bank for hiring readers,
          collaborators, and civic/technical audiences. Karla carries readable
          prose and interface text. Archivo Narrow carries compact headings,
          proof labels, metadata, and civic-notice moments. No private or
          proprietary font files are committed or served. The design uses
          Broadway blue, Jamie&apos;s oil-pastel palette, and a quiet proportional
          grid. Staging is reviewable but not indexable, and production should
          only become indexable after content and metadata review.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {details.map((detail) => (
          <JBCard key={detail}>
            <p className="leading-7 text-jb-ink/76">{detail}</p>
          </JBCard>
        ))}
      </div>
    </div>
  );
}
