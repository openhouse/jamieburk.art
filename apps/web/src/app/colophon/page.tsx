import type { Metadata } from "next";
import { Section } from "@/components/section";
import { colorMemory } from "@/data/oil-pastels";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Colophon",
  description: "Accessibility, privacy, source, build, and public-safety note for jamieburk.art.",
  path: "/colophon"
});

export default function ColophonPage() {
  return (
    <Section
      eyebrow="Colophon"
      title="Build, source, accessibility, and public-safety notes"
      intro="This site is a static-first portfolio built with Next.js, React, TypeScript, MDX, Tailwind CSS, daisyUI, and a small custom design-token layer."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="prose-measure text-lg leading-8 text-base-content/75">
          <p>
            It is prepared for Dokku deployment on a DigitalOcean droplet and served at
            jamieburk.art.
          </p>
          <p className="mt-5">
            The design goal is simple: make the work legible without flattening it. The site favors
            readable typography, public-safe project summaries, source notes, selected artifacts,
            accessible HTML, and durable content files over a comprehensive archive.
          </p>
          <p className="mt-5">
            Some work is summarized rather than fully shown because it involves private collaborators,
            sensitive civic materials, internal strategy, or consent-dependent records.
          </p>
          <h2 className="mt-10 text-2xl font-black text-base-content">Accessibility commitments</h2>
          <ul className="mt-4 list-disc pl-5">
            <li>Semantic HTML</li>
            <li>Keyboard navigation</li>
            <li>Visible focus states</li>
            <li>Readable contrast</li>
            <li>Alt text for meaningful images</li>
            <li>Reduced-motion support</li>
            <li>No autoplay audio</li>
            <li>Public-facing content that can be understood without hidden context</li>
          </ul>
          <h2 className="mt-10 text-2xl font-black text-base-content">Privacy</h2>
          <p className="mt-4">No invasive tracking in V1.</p>
        </div>
        <aside className="rounded border border-base-300 bg-base-200 p-5">
          <h2 className="text-xl font-black">Oil-pastel color memory</h2>
          <div className="mt-5 grid gap-3">
            {colorMemory.map((color) => (
              <div className="flex items-center gap-3" key={color.name}>
                <span
                  aria-hidden="true"
                  className="h-8 w-8 rounded border border-base-300"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm font-bold">{color.name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
