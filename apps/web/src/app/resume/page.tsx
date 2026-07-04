import type { Metadata } from 'next';
import { ResumeDownload } from '@/components/ResumeDownload';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Download Jamie Burkart resume for technical project management, product operations, and implementation roles.'
};

const focusAreas = [
  'Technical Project Manager',
  'Product Operations Manager',
  'Implementation Lead',
  'Business / Systems Analyst',
  'Civic Technology Program Manager',
  'Documentation and Knowledge Systems Lead'
];

export default function ResumePage() {
  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">Resume</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Technical Project Manager - Product Operations & Implementation</h1>
        <p className="mt-6 text-xl leading-relaxed text-base-content/75">
          A resume for roles that need implementation discipline, technical translation, documentation, stakeholder coordination, and durable handoffs.
        </p>
      </header>
      <section className="golden-aside-layout mt-12">
        <ResumeDownload />
        <div>
          <h2 className="section-kicker">Role fit</h2>
          <ul className="mt-5 grid gap-3">
            {focusAreas.map((area) => (
              <li key={area} className="border border-base-content/10 bg-base-200 p-4 font-semibold">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

