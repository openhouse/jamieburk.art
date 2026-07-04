import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Colophon",
  description:
    "Stack, accessibility, privacy, public-safety, and design notes for jamieburk.art.",
  pathname: "/colophon"
});

export default function ColophonPage() {
  return (
    <div className="plain-page">
      <p className="eyebrow">Colophon</p>
      <h1>How this site is built</h1>
      <p>
        This site is designed to be readable, keyboard navigable, low-motion, and public-safe. It uses semantic HTML, visible focus states, responsive layout, and plain-language project summaries.
      </p>
      <section className="plain-stack">
        <h2>Built with</h2>
        <p>Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, npm workspaces, Node 26, Docker, and Dokku.</p>
      </section>
      <section className="plain-stack">
        <h2>Accessibility</h2>
        <p>Semantic HTML, one H1 per page, skip-to-content link, visible focus states, responsive layout down to small screens, no autoplay media, and reduced-motion support.</p>
      </section>
      <section className="plain-stack">
        <h2>Privacy and public safety</h2>
        <p>Some case studies use public-safe summaries, redacted examples, or recreated diagrams to protect collaborators, clients, artists, civic partners, and community members.</p>
      </section>
      <section className="plain-stack">
        <h2>Design grammar</h2>
        <p>Golden-ratio spacing, Broadway blue, a restrained oil-pastel palette, calm typographic hierarchy, and print-derived layout discipline.</p>
      </section>
      <section className="plain-stack">
        <h2>Last updated</h2>
        <p>2026-07-03</p>
      </section>
    </div>
  );
}
