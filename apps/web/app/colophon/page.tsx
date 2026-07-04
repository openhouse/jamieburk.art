import type { Metadata } from "next";

import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Colophon",
  description:
    "Accessibility, public-safety, build, privacy, and credits notes for Jamie Burkart's portfolio.",
  path: "/colophon"
});

const buildNotes = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "MDX-ready content files",
  "Tailwind CSS",
  "daisyUI",
  "pnpm workspaces",
  "Dockerfile-based Dokku deployment"
];

export default function ColophonPage() {
  return (
    <div>
      <header className="section">
        <div className="container copy">
          <SectionHeading eyebrow="Colophon" title="Build and care notes">
            <p>
              This site is designed to be readable, keyboard navigable,
              low-motion, and public-safe. It uses semantic HTML, visible focus
              states, responsive layout, and plain-language project summaries.
              If something is hard to read or access, please reach out.
            </p>
          </SectionHeading>
        </div>
      </header>
      <div className="container grid gap-8 pb-20">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="h3">Last updated</h2>
            <p className="mt-4 text-muted">July 2026</p>
          </div>
          <div className="card p-6">
            <h2 className="h3">Built with</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {buildNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>
        <PublicSafetyNote>
          <p>
            Some case studies use public-safe summaries, redacted examples, or
            recreated diagrams to protect collaborators, residents, artists,
            clients, and civic partners.
          </p>
        </PublicSafetyNote>
        <section className="card p-6">
          <h2 className="h3">Privacy</h2>
          <p className="mt-4 text-muted">
            No analytics are installed in V1. The site does not include private
            notes, client-sensitive material, raw coalition records, guest data,
            private transcripts, credentials, or unapproved photos.
          </p>
        </section>
        <section className="card p-6">
          <h2 className="h3">Credits</h2>
          <p className="mt-4 text-muted">
            Visual tokens use Broadway blue, Jamie’s oil-pastel palette, and a
            golden-ratio spacing sensibility. The interface relies on Karla when
            available and falls back to system sans-serif fonts.
          </p>
        </section>
      </div>
    </div>
  );
}
