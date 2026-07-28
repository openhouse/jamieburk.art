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
  "Karla for body text, Oswald for labels, and a system serif for display headings",
  "No private or proprietary font files are committed or served",
  "Human Index colors derived from Jamie's work jacket, civic documents, and material practice",
  "A small, metadata-stripped photographic layer selected from Jamie's archive",
  "Staging-first Docker / Dokku deployment with staging noindex by default",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">How this is made</p>
          <h1 className="mt-3 text-6xl leading-none text-jb-ink">Colophon</h1>
        </div>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface and future living
          notebook. It uses local MDX content, public-safe artifacts, and
          intentionally limited tracking. The design joins a work-jacket blue,
          institutional forms, and a quiet proportional grid with a small
          selection from Jamie&apos;s photo archive. Staging is reviewable but not
          indexable, and production should only become indexable after content,
          rights, and metadata review.
        </p>
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Working system</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Digital structure, material attention
          </h2>
        </div>
        <ol className="border-t border-jb-ink/20">
          {details.map((detail, index) => (
            <li
              className="grid gap-3 border-b border-jb-ink/20 py-4 sm:grid-cols-[3rem_1fr]"
              key={detail}
            >
              <span className="font-label text-sm text-jb-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-jb-ink/76">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
