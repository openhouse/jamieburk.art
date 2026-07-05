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
  "Built with Next.js App Router, React, TypeScript, MDX, Tailwind CSS, and daisyUI",
  "Deployed via Dockerfile and Dokku, with staging first at staging.jamieburk.art",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "No invasive tracking in V1",
  "Designed with Broadway blue #0b5f81, Jamie's oil-pastel palette, and golden-ratio layout tendencies",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type"
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
          print-layout sketchpad.
        </p>
        <p className="mt-5 leading-8 text-jb-ink/76">
          This site uses Karla for body and interface text and Archivo Black for
          selected display moments. League Gothic is reserved for small label
          moments. Other typefaces from Jamie&apos;s older design practice - Trade
          Gothic, Verlag, Gotham Rounded, Risque, and a private Maria handwriting
          font - are treated as influences only unless licensed and explicitly
          approved for web use.
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
