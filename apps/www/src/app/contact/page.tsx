import type { Metadata } from "next";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Best-fit conversations are roles, referrals, consulting, and
          collaborations where operating structure, implementation, documentation,
          or public-facing technical work matter.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Public email</dt>
              <dd className="mt-1 text-jb-ink/74">
                {site.publicEmail ? (
                  <a className="font-semibold text-jb-blue hover:text-jb-green" href={`mailto:${site.publicEmail}`}>
                    {site.publicEmail}
                  </a>
                ) : (
                  "Hidden until approved for public release."
                )}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {site.linkedInUrl ? (
              <div>
                <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                <dd className="mt-1 text-jb-ink/74">
                  <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.linkedInUrl}>
                    View LinkedIn
                  </a>
                </dd>
              </div>
            ) : null}
            {site.githubUrl ? (
              <div>
                <dt className="font-semibold text-jb-ink">GitHub</dt>
                <dd className="mt-1 text-jb-ink/74">
                  <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.githubUrl}>
                    View GitHub
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-jb-ink">Resume</dt>
              <dd className="mt-1">
                <a className="font-semibold text-jb-blue hover:text-jb-green" href="/resume">
                  View resume page
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
