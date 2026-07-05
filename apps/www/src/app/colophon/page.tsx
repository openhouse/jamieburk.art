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
  "Static-first Next.js App Router site with React, TypeScript, local MDX content, Tailwind CSS, and daisyUI",
  "Node 26 with npm workspaces, Docker, and Dokku deployment to staging before production",
  "Typography uses Karla for body text and League Spartan for display emphasis",
  "Proprietary and private typefaces from older design practice are references only and are not shipped",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Designed with Broadway blue, Jamie's oil-pastel palette, and a quiet proportional grid",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="jb-display text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface and future living
          notebook. It uses local MDX content, public-safe artifacts, and
          intentionally limited tracking. The design uses Broadway blue, Jamie&apos;s
          oil-pastel palette, and a quiet proportional grid derived from his
          print-layout sketchpad.
        </p>
        <p className="mt-5 leading-8 text-jb-ink/76">
          Typography uses Karla for readable body text and League Spartan for
          display emphasis. Both are loaded as safe web fonts. Proprietary and
          private typefaces from Jamie&apos;s older design practice are treated as
          references only and are not shipped in the public repo.
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
