import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe portfolio and future living notebook.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla for body/UI text and League Spartan for display headings",
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
          This site is built as a small public proof surface and future living
          notebook. It uses local MDX content, public-safe artifacts, and
          intentionally limited tracking. The design uses Broadway blue, Jamie&apos;s
          oil-pastel palette, and a quiet proportional grid derived from his
          print-layout sketchpad. Staging is reviewable but not indexable, and
          production should only become indexable after content and metadata
          review.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {details.map((detail) => (
          <JBCard key={detail}>
            <p className="leading-7 text-jb-ink/76">{detail}</p>
          </JBCard>
        ))}
      </div>
      <section className="jb-reading mt-14">
        <h2 className="text-3xl font-semibold text-jb-ink">Citational care</h2>
        <p className="mt-4 leading-8 text-jb-ink/76">
          Exact dates, historical events, public records, press coverage, and
          externally verifiable outcomes use numbered references where
          practical. The knowledge bank records what each source supports, what
          it does not establish, and where a claim remains qualified or
          unresolved. Private material may inform Jamie&apos;s review without
          becoming a public source.
        </p>
      </section>
    </div>
  );
}
