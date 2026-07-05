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
  "Karla for body/UI copy and Archivo Narrow for display headings and proof labels",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Designed with Broadway blue, restrained oil-pastel accents, and a quiet golden-ratio layout sensibility",
  "Prepared for staging-first Docker / Dokku review before production release",
  "No analytics or invasive tracking in V1",
  "No private or proprietary font files are shipped"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface and future living
          notebook. It uses local MDX content, public-safe artifacts, and
          no analytics in V1. The design uses Karla, Archivo Narrow, Broadway
          blue, Jamie&apos;s oil-pastel palette, and a quiet golden-ratio layout
          sensibility derived from his print-layout sketchpad. Staging is reviewed
          before production, and private or proprietary fonts are not shipped.
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
