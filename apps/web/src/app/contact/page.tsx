import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Jamie Burkart about technical project management, implementation, documentation, and public-facing systems work.'
};

export default function ContactPage() {
  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">A clear next step is welcome.</h1>
        <p className="mt-6 text-xl leading-relaxed text-base-content/75">
          Best fits include technical project management, product operations, implementation, civic technology, documentation systems, and public-facing
          tools.
        </p>
      </header>
      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <a className="rounded-lg border border-base-content/10 bg-base-200 p-6 hover:border-primary" href={`mailto:${site.email}`}>
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="mt-3 text-base-content/75">{site.email}</p>
        </a>
        <a className="rounded-lg border border-base-content/10 bg-base-200 p-6 hover:border-primary" href={site.linkedInUrl}>
          <h2 className="text-2xl font-semibold">LinkedIn</h2>
          <p className="mt-3 text-base-content/75">Professional profile</p>
        </a>
        <Link className="rounded-lg border border-base-content/10 bg-base-200 p-6 hover:border-primary" href="/work">
          <h2 className="text-2xl font-semibold">Selected work</h2>
          <p className="mt-3 text-base-content/75">Case studies and proof pages</p>
        </Link>
      </section>
    </div>
  );
}

