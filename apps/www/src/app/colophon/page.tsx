import type { Metadata } from "next";
import { PhotoFigure } from "@/components/PhotoFigure";
import { photos } from "@/data/photography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe portfolio and working knowledge system.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "A governed Knowledge Wiki behind a selective public portfolio projection",
  "Source-backed claims, collective credit, protected absences, and visible limits",
  "Semantic HTML, keyboard focus states, readable type, responsive images, and reduced-motion support",
  "Karla for body and display text; Oswald for compact labels and metadata",
  "No private or proprietary font files committed or served",
  "A material palette led by work-jacket blue, graphite, institutional green, and correction red",
  "Staging-first Docker and Dokku deployment with staging noindex by default",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <>
      <header className="border-b border-jb-ink/15 bg-jb-warm py-12">
        <div className="jb-frame grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <div className="jb-reading">
            <p className="jb-section-index">Colophon</p>
            <h1 className="mt-3 text-5xl font-bold text-jb-ink">How this was made</h1>
            <p className="mt-6 text-xl leading-8 text-jb-ink/76">
              This site is a small public proof surface backed by a much deeper
              knowledge system. Research, claims, sources, protected context,
              photography, and editorial decisions can mature without requiring
              every piece of the archive to appear on the public page.
            </p>
          </div>
          <PhotoFigure
            imageClassName="aspect-[3/2]"
            photo={photos.mirrorCamera}
            priority
            sizes="(min-width: 1100px) 42vw, 100vw"
          />
        </div>
      </header>
      <section className="jb-frame grid gap-10 py-16 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-index">System notes</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Designed for revision without amnesia
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/72">
            The interface is intentionally quiet enough for evidence and
            photographs to carry different kinds of meaning.
          </p>
        </div>
        <ol className="border-b border-jb-ink/20">
          {details.map((detail, index) => (
            <li
              className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-jb-ink/20 py-4 leading-7 text-jb-ink/76"
              key={detail}
            >
              <span className="jb-meta-label text-xs text-jb-red">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
