import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public proof surface for technical operations, product operations, implementation, and source-backed team memory.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, claim discipline, and no raw private source material",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "A preferred Karla + Archivo Narrow stack with system sans-serif fallbacks",
  "No private or proprietary font files are committed or served",
  "Designed with Broadway blue, Jamie's oil-pastel palette, and a quiet proportional grid",
  "Staging-first Docker / Dokku deployment with staging noindex and production indexing by explicit opt-in",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface. It uses local MDX
          content, public-safe artifacts, no analytics in V1, accessible semantic
          markup, and staging-first deployment. The design uses Broadway blue,
          restrained oil-pastel accents, and a quiet proportional-grid
          sensibility.
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
