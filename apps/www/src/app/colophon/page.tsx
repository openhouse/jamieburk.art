import type { Metadata } from "next";
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
  "Karla for body and interface text, with a restrained book face for display headings",
  "No private or proprietary font files are committed or served",
  "The Human Index palette begins with the blue of Jamie's work jacket and distinguishes work, stewardship, correction, and corroboration",
  "Photographs are selected from Jamie's archive, stripped of embedded metadata, and published with contextual captions and project-level credit",
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
          notebook. It uses local MDX content, public-safe artifacts, photographs
          selected from Jamie&apos;s archive, and intentionally limited tracking.
          Images are treated as situated records: captions identify context and
          collective work instead of allowing a photograph to imply sole
          authorship. Staging is reviewable but not indexable, and production
          should only become indexable after content, credit, rights, crop, and
          metadata review.
        </p>
      </div>
      <div className="mt-10 border-t border-jb-ink/18">
        {details.map((detail, index) => (
          <div className="grid gap-2 border-b border-jb-ink/14 py-4 sm:grid-cols-[4rem_1fr]" key={detail}>
            <span className="jb-eyebrow text-jb-blue">{String(index + 1).padStart(2, "0")}</span>
            <p className="leading-7 text-jb-ink/76">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
