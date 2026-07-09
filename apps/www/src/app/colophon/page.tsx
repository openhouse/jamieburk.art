import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe professional proof site.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, claim discipline, and intentionally limited public surfaces",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Font-file-free CSS stacks with Karla / Archivo Narrow preferences and system fallbacks",
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
          This site is a small public proof surface for selected professional
          work. It uses local MDX content, public-safe artifacts, claim
          discipline, and intentionally limited tracking. The design uses
          Broadway blue, Jamie&apos;s oil-pastel palette, and a quiet proportional
          grid. Staging is reviewable but not indexable; production becomes
          indexable only after content, metadata, accessibility, and
          public-safety review.
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
