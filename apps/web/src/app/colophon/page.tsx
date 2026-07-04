import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Colophon",
  description: "Build notes, accessibility, public-safety commitments, and design-system provenance for Jamie Burkart's portfolio.",
  path: "/colophon"
});

const sections = [
  {
    title: "Built with",
    body: "Built with Next.js, React, TypeScript, MDX, Tailwind CSS, daisyUI, and Node 26. Deployed to Dokku on a DigitalOcean droplet."
  },
  {
    title: "Accessibility",
    body: "This site is designed to be readable, keyboard navigable, low-motion, and public-safe. It uses semantic HTML, visible focus states, responsive layout, and plain-language project summaries."
  },
  {
    title: "Privacy / analytics",
    body: "No analytics are installed in V1. If analytics are added later, use privacy-preserving analytics only."
  },
  {
    title: "Design system",
    body: "The layout uses a golden-ratio-informed spacing system adapted from Jamie's print-layout ritual. The color system draws from Jamie's oil-pastel palette, with Broadway blue (#0b5f81) as the primary civic and interface accent."
  },
  {
    title: "Public-safety commitments",
    body: "Some case studies use public-safe summaries, redacted examples, or recreated diagrams to protect collaborators, residents, artists, clients, and civic partners."
  }
];

export default function ColophonPage() {
  return (
    <div className="page-shell py-14">
      <SectionHeading eyebrow="Colophon" title="Build notes and public-safety commitments" body={`Last updated: ${site.lastUpdated}.`} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <section className="surface p-5" key={section.title}>
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="mt-4 leading-7 text-[color:var(--color-muted)]">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
