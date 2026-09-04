import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import engagementPathway from "@/data/engagement-pathway.json";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work with Jamie - Jamie Burkart",
  description:
    "Contact Jamie Burkart about roles, focused working sessions, knowledge operations diagnostics, or implementation support.",
  path: "/contact"
});

export default function ContactPage() {
  const { employmentPath, scopedWork, contactAction } = engagementPathway;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Work with Jamie</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Bring a consequential decision, a complicated operating knot, or work
          that needs to become clear, usable, and maintainable.
        </p>
      </div>

      <section aria-labelledby="roles-and-embedded-leadership" className="mt-12 border-y border-jb-ink/18 py-8">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink" id="roles-and-embedded-leadership">
            {employmentPath.heading}
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">{employmentPath.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center rounded-md bg-jb-blue px-5 py-3 font-semibold text-white hover:bg-jb-green"
              href={employmentPath.resumeDestination as Route}
            >
              {employmentPath.resumeLabel}
            </Link>
            <a
              className="inline-flex min-h-11 items-center rounded-md border border-jb-blue px-5 py-3 font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
              href={site.emailHref}
            >
              {employmentPath.emailLabel}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="scoped-work" className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink" id="scoped-work">
            {scopedWork.heading}
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">{scopedWork.description}</p>
        </div>
        <ol className="mt-7 divide-y divide-jb-ink/14 border-y border-jb-ink/18">
          {engagementPathway.engagements.map((engagement, index) => (
            <li className="grid gap-5 py-8 lg:grid-cols-[0.32fr_0.68fr]" key={engagement.id}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-jb-green">
                  Option {index + 1}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-jb-ink">{engagement.label}</h3>
              </div>
              <dl className="grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-jb-ink">The question</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{engagement.buyerQuestion}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">A useful outcome</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{engagement.outcome}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">The boundary</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{engagement.boundary}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="discuss-a-working-session" className="mt-12 grid gap-7 rounded-lg bg-jb-blue p-7 text-white lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold" id="discuss-a-working-session">
            Start with a conversation
          </h2>
          <p className="mt-4 leading-7 text-white/84">{contactAction.prompt}</p>
          <p className="mt-3 text-sm leading-6 text-white/72">{engagementPathway.termsNote}</p>
        </div>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 py-3 font-semibold text-jb-blue hover:bg-jb-warm hover:text-jb-green"
          href={site.emailHref}
        >
          {contactAction.label}
        </a>
      </section>

      <section aria-labelledby="contact-details" className="mt-12">
        <div className="jb-reading">
          <h2 className="text-2xl font-semibold text-jb-ink" id="contact-details">Contact details</h2>
        </div>
        <div className="mt-5 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Email</dt>
              <dd className="mt-1 text-jb-ink/74">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.emailHref}
                >
                  {site.emailLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">LinkedIn</dt>
              <dd className="mt-1 text-jb-ink/74">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.linkedinHref}
                >
                  {site.linkedinLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">GitHub</dt>
              <dd className="mt-1 text-jb-ink/74">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.githubHref}
                >
                  {site.githubLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Resume</dt>
              <dd className="mt-1">
                <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.resumePath}>
                  Download resume PDF
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
