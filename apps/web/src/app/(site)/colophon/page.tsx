import { oilPastels } from "@/data/palette";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Colophon",
  "Build, accessibility, visual-system, and public-safety notes for jamieburk.art."
);

export default function ColophonPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Colophon / Accessibility</p>
        <h1>Colophon</h1>
        <p className="lede">
          This site is designed to be readable, keyboard navigable, low-motion, and public-safe.
        </p>
      </section>

      <div className="case-main">
        <section className="case-section">
          <h2>Last updated</h2>
          <p>July 2026</p>
        </section>

        <section className="case-section">
          <h2>Built with</h2>
          <p>
            Next.js App Router, React, TypeScript, MDX-ready content, Tailwind CSS, daisyUI,
            Node 26, and Dockerfile-based Dokku deployment.
          </p>
        </section>

        <section className="case-section">
          <h2>Grid and color</h2>
          <p>
            The grid borrows from Jamie&apos;s long-running golden-ratio print-layout sketchpad. The
            color system draws from a 49-color oil-pastel palette Jamie created about a decade
            ago by matching oil pastels to hardware-store paint cards. The primary web accent is
            Broadway blue: #0b5f81.
          </p>
          <div className="palette-grid">
            {oilPastels.map((color) => (
              <div className="palette-chip" key={color.name}>
                <span
                  aria-hidden="true"
                  className="palette-swatch"
                  style={{ backgroundColor: color.value }}
                />
                <strong>{color.name}</strong>
                <code>{color.value}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section">
          <h2>Accessibility</h2>
          <p>
            The scaffold uses semantic HTML, one H1 per page, visible focus states, skip links,
            responsive layout, readable contrast, no autoplay media, and reduced-motion support.
          </p>
        </section>

        <section className="case-section">
          <h2>Public-safety commitments</h2>
          <p>
            The portfolio is a selected proof system. It does not publish private coalition
            notes, client-sensitive material, private contact lists, raw transcripts, therapy or
            health details, financial details, unapproved photos, credentials, or proprietary
            fonts.
          </p>
        </section>

        <section className="case-section">
          <h2>Credits and feedback</h2>
          <p>
            Proprietary fonts may be named as influences only when they are not shipped. Karla is
            the safe default web typeface. If something is hard to read or access, email Jamie.
          </p>
        </section>
      </div>
    </>
  );
}
