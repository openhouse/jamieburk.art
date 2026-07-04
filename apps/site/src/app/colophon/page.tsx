import type { Metadata } from "next";
import { ColorChip } from "@/components/color-chip";
import { PublicSafetyNote } from "@/components/public-safety-note";
import { oilPastels } from "@jamieburkart/design-tokens";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "Accessibility, public-safety, build notes, credits, and last-updated details for Jamie Burkart's portfolio.",
};

export default function ColophonPage() {
  return (
    <section className="container-reading section-pad">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        Colophon
      </p>
      <h1 className="mt-3 text-4xl font-bold md:text-6xl">Colophon</h1>
      <div className="reading-flow mt-8">
        <h2>Last updated</h2>
        <p>July 2026</p>
        <h2>Built with</h2>
        <p>
          Next.js App Router, React, TypeScript, MDX-ready content files,
          Tailwind CSS, daisyUI, Node 26, npm workspaces, Dockerfile, and Dokku.
        </p>
        <h2>Accessibility</h2>
        <p>
          This site is designed to be readable, keyboard navigable, low-motion,
          and public-safe. It uses semantic HTML, visible focus states,
          responsive layout, and plain-language project summaries.
        </p>
      </div>
      <div className="mt-8">
        <PublicSafetyNote />
      </div>
      <section className="mt-10 rounded-md border border-base-300 bg-base-100 p-5">
        <h2 className="text-2xl font-bold">Color notes</h2>
        <div className="mt-5 grid gap-3">
          <ColorChip name="Broadway blue" value="#0b5f81" />
          <ColorChip name="Yellow ochre" value={oilPastels.yellowOchre} />
          <ColorChip name="Pale blue" value={oilPastels.paleBlue} />
          <ColorChip name="Pale green" value={oilPastels.paleGreen} />
          <ColorChip name="Crimson lake" value={oilPastels.crimsonLake} />
        </div>
      </section>
      <section className="mt-10 rounded-md border border-base-300 bg-base-100 p-5">
        <h2 className="text-2xl font-bold">Feedback</h2>
        <p className="mt-3 leading-7 text-neutral">
          If something is hard to read or access, please reach out at
          jamie.burkart@gmail.com.
        </p>
      </section>
    </section>
  );
}
