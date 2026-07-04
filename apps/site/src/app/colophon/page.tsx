import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Colophon",
  description: "Build notes, public-safety posture, accessibility notes, and privacy notes for jamieburk.art.",
  path: "/colophon"
});

export default function ColophonPage() {
  return (
    <section className="section-pad">
      <div className="container-page golden-frame">
        <p className="eyebrow mb-3">Colophon</p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">
          Built as a public-safe proof system.
        </h1>
        <div className="mt-8 grid gap-6 text-lg leading-8 text-[color:var(--color-muted)]">
          <p>
            This site is built as a static-first Next.js portfolio using TypeScript, MDX, daisyUI,
            and a small design-token system.
          </p>
          <p>It is intentionally text-forward, public-safe, and low-JavaScript.</p>
          <p>
            Sensitive civic, community, client, residency, and source-backed materials are
            summarized only when they can be shared responsibly.
          </p>
          <p>
            Private notes, raw transcripts, legal-review materials, contact lists, and unapproved
            photos are intentionally omitted.
          </p>
          <p>This V1 does not use invasive tracking.</p>
        </div>
      </div>
    </section>
  );
}
