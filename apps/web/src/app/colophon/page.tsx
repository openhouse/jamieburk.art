import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'Site stack, publishing rules, accessibility commitments, and hosting notes.'
};

export default function ColophonPage() {
  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">Colophon</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Built small, readable, and public-safe.</h1>
      </header>
      <section className="prose-body mt-10 text-lg">
        <p>
          This site is built as a small, content-driven Next.js site and deployed to Dokku on a DigitalOcean droplet. It is designed to be readable,
          keyboard navigable, low-motion, public-safe, and easy to maintain.
        </p>
        <p>
          Some case studies use public-safe summaries, redacted examples, or recreated diagrams to protect collaborators, residents, artists, clients,
          and civic partners.
        </p>
        <p>Last updated: July 2026.</p>
      </section>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {['Next.js / React / TypeScript / MDX', 'Tailwind CSS / daisyUI / accessible HTML', 'Node 26 / Dockerfile / Dokku'].map((item) => (
          <div key={item} className="border border-base-content/10 bg-base-200 p-5 text-sm font-semibold">
            {item}
          </div>
        ))}
      </section>
    </div>
  );
}

