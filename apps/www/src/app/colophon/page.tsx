import type { Metadata } from "next";
import { FieldPhoto } from "@/components/FieldPhoto";
import { portfolioPhotos } from "@/data/photography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe portfolio and living knowledge practice.",
  path: "/colophon"
});

const details = [
  ["System", "Static-first Next.js App Router site with local MDX content"],
  [
    "Evidence",
    "Public-safe artifacts, claim discipline, governed citations, and visible limits"
  ],
  [
    "Access",
    "Semantic HTML, keyboard focus, reduced motion, readable type, and responsive layouts"
  ],
  ["Type", "Karla for prose and interface; Oswald for compact labels and indexes"],
  ["Fonts", "No private or proprietary font files are committed or served"],
  [
    "Color",
    "Work-jacket blue, institutional green, graphite, red pencil, and calibrated white surfaces"
  ],
  ["Deployment", "Docker and Dokku, staging-first, with staging noindex by default"],
  ["Tracking", "No invasive analytics in V1"]
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="jb-section-label">Materials and methods</p>
          <h1 className="mt-3 text-5xl leading-none text-jb-ink sm:text-6xl">
            Colophon
          </h1>
        </div>
        <p className="max-w-3xl text-xl leading-8 text-jb-ink/76">
          This site is a small public proof surface projected from a deeper
          source-backed knowledge practice. Its design treats photography,
          captions, evidence, type, and code as working material. Staging is
          reviewable but not indexable; production photography still requires
          Jamie&apos;s final selection, caption, credit, rights, and consent review.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <FieldPhoto
          crop="aspect-[4/3] object-cover"
          photoId="photo.paper-trimming"
          placementId="placement.colophon.paper-trimming.layout-b"
          photo={portfolioPhotos.paperTrimming}
          priority
          route="/colophon"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <FieldPhoto
          crop="aspect-[4/3] object-cover"
          photoId="photo.printed-editions"
          placementId="placement.colophon.printed-editions.layout-b"
          photo={portfolioPhotos.printedEditions}
          priority
          route="/colophon"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="jb-section-label">Build register</p>
          <h2 className="mt-3 text-3xl text-jb-ink">
            A maintainable public surface
          </h2>
        </div>
        <dl className="border-t border-jb-ink/15">
          {details.map(([label, detail]) => (
            <div
              className="grid gap-2 border-b border-jb-ink/15 py-4 sm:grid-cols-[0.25fr_0.75fr]"
              key={label}
            >
              <dt className="font-label text-sm font-semibold uppercase text-jb-blue">
                {label}
              </dt>
              <dd className="leading-7 text-jb-ink/76">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
