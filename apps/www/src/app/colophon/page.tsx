import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe portfolio and selected proof site.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe artifacts, claim discipline, and visible content-status notes",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Designed with Broadway blue, Jamie's oil-pastel palette, and a quiet proportional grid",
  "Prepared for Docker / Dokku deployment on a DigitalOcean droplet",
  "Staging-first launch flow with noindex safeguards outside production",
  "No invasive tracking in V1",
  "No private emails, raw transcripts, private coalition notes, legal-review materials, unapproved photos, credentials, private fonts, or sensitive client/community records are published"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface. It uses local MDX
          content, public-safe artifacts, and intentionally limited tracking. The
          design uses Broadway blue, Jamie&apos;s
          oil-pastel palette, and a quiet proportional grid derived from his
          print-layout sketchpad.
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
