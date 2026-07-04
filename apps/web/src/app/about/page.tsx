import type { Metadata } from 'next';
import { ContactCTA } from '@/components/ContactCTA';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Jamie Burkart, technical project manager and implementation lead.'
};

export default function AboutPage() {
  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Care, translated into structure.</h1>
        <p className="mt-6 text-xl leading-relaxed text-base-content/75">{site.referrer}</p>
      </header>
      <section className="golden-aside-layout mt-12">
        <p className="eyebrow">Working pattern</p>
        <div className="prose-body text-lg">
          <p>
            My work often begins where the system is real but not yet nameable: scattered context, unclear requirements, overlapping stakeholders,
            fragile documentation, and too much living only in people&apos;s heads.
          </p>
          <p>
            I build the structure that lets teams keep moving: requirements, decision trails, operating rhythms, public-safe summaries, source maps,
            handoff materials, and practical tools.
          </p>
          <p>A good handoff is a form of care: it lets someone else enter the work without panic, shame, or missing context.</p>
        </div>
      </section>
      <ContactCTA compact />
    </div>
  );
}

