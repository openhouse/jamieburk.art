import Link from 'next/link';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="golden-shell grid min-h-[70svh] items-center gap-10 py-16 md:grid-cols-[minmax(0,61.8034%)_minmax(17rem,38.1966%)]">
      <div>
        <p className="eyebrow">{site.name}</p>
        <p className="mt-3 text-lg font-semibold text-primary">{site.role}</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">{site.headline}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-base-content/75">{site.description}</p>
        <p className="mt-6 max-w-3xl font-mono text-sm text-base-content/60">{site.locationLine}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/work">
            View selected work
          </Link>
          <a className="btn btn-outline" href={site.resumePath}>
            Download resume
          </a>
          <Link className="btn btn-ghost" href="/contact">
            Contact Jamie
          </Link>
        </div>
      </div>
      <div className="system-map" aria-label="Workflow pattern: ambiguous need to durable handoff">
        <div className="system-map__node system-map__node--start">Ambiguous need</div>
        <div className="system-map__line" />
        <div className="system-map__node">Discovery</div>
        <div className="system-map__node">Requirements</div>
        <div className="system-map__node">Documentation</div>
        <div className="system-map__node">Launch support</div>
        <div className="system-map__line" />
        <div className="system-map__node system-map__node--end">Durable handoff</div>
      </div>
    </section>
  );
}
