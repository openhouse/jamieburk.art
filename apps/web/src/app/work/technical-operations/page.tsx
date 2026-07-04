import type { Metadata } from 'next';
import { ContactCTA } from '@/components/ContactCTA';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Technical Operations & Implementation',
  description: 'Operating backbone for civic, cultural, small-business, and public-facing technical environments.'
};

const sections = [
  {
    title: 'Operating systems built',
    items: [
      'THICK ARTS / Harry J. Epstein implementation and handoff systems',
      'FairRentNYC / NYC Artist Coalition campaign-memory infrastructure',
      '196 / Sunday Dinner onboarding and continuity systems'
    ]
  },
  {
    title: 'Delivery and launch',
    items: ['CallNYC.org', 'WOWList.org', 'Harry J. Epstein e-commerce']
  },
  {
    title: 'Documentation and working memory',
    items: ['Source maps', 'Public guidance', 'Resource libraries', 'Handbooks and templates', 'Meeting synthesis', 'Decision records', 'Action trackers']
  },
  {
    title: 'Tools and technical environments',
    items: [
      'JavaScript / TypeScript',
      'Node.js',
      'React / Next.js',
      'Ember.js',
      'Python / Django',
      'SQL',
      'Git / GitHub',
      'Docker / Dokku',
      'QGIS',
      'Open-data workflows',
      'Markdown / MDX',
      'Source-backed documentation'
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">Proof sheet</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Technical Operations & Implementation</h1>
        <p className="mt-6 text-xl leading-relaxed text-base-content/75">
          Across civic, cultural, small-business, and public-facing technical environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials, documentation systems, launch support, and durable handoffs.
        </p>
      </header>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded-lg border border-base-content/10 bg-base-200 p-6">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <ul className="mt-5 space-y-2 text-base-content/78">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-12 border-y border-base-content/10 py-10">
        <h2 className="section-kicker">Method sentence</h2>
        <p className="mt-4 max-w-3xl text-2xl leading-relaxed">{site.method}</p>
        <a className="btn btn-primary mt-6" href={site.resumePath}>
          Download resume
        </a>
      </section>

      <ContactCTA compact />
    </div>
  );
}
