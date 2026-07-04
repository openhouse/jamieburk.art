import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon",
  description: "Accessibility, privacy, public-safety, and build notes for the Jamie Burkart portfolio."
};

const commitments = [
  "Semantic HTML and one clear H1 per page.",
  "Visible focus states and keyboard-accessible navigation.",
  "Responsive layouts down to small mobile widths.",
  "No analytics installed in V1.",
  "No private coalition, client, residency, health, financial, or contact-list material.",
  "Public-safe summaries and visible caveats where context matters."
];

export default function ColophonPage() {
  return (
    <section className="section-pad">
      <div className="container-page content-flow measure-wide">
        <p className="eyebrow">Colophon</p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">Colophon</h1>
        <p>
          This site is designed to be readable, keyboard navigable, low-motion, and public-safe.
          It uses semantic HTML, visible focus states, responsive layout, and plain-language project
          summaries.
        </p>
        <h2>Last updated</h2>
        <p>July 2026.</p>
        <h2>Built with</h2>
        <p>Next.js, React, TypeScript, MDX content files, Tailwind CSS, daisyUI, Node 26, Docker, and Dokku.</p>
        <h2>Accessibility and privacy</h2>
        <ul>
          {commitments.map((commitment) => (
            <li key={commitment}>{commitment}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
