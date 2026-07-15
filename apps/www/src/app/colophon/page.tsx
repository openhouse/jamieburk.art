import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description: "Colophon for Jamie Burkart's public-safe portfolio.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, bounded claims, source notes, and a correction path",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla for body and headings, with Oswald for labels and metadata",
  "No private or proprietary font files are committed or served",
  "Designed with Broadway blue, Jamie's oil-pastel palette, and a quiet proportional grid",
  "Privacy-respecting infrastructure without advertising or invasive tracking"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This is a focused public portfolio built with local MDX content,
          public-safe artifacts, and source notes for consequential claims. The
          design uses Broadway blue, Jamie&apos;s oil-pastel palette, and a quiet
          proportional grid derived from his print-layout sketchpad. The site
          favors readable semantics, fast pages, accessible interaction, and
          privacy-respecting infrastructure.
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
