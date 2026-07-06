import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration.",
  path: "/contact"
});

export default function ContactPage() {
  const hasDirectContact =
    site.contact.email || site.contact.linkedInUrl || site.contact.githubUrl;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          {hasDirectContact ? (
            <dl className="space-y-5">
              {site.contact.email ? (
                <div>
                  <dt className="font-semibold text-jb-ink">Public email</dt>
                  <dd className="mt-1 text-jb-ink/74">
                    <a
                      className="font-semibold text-jb-blue hover:text-jb-green"
                      href={`mailto:${site.contact.email}`}
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {site.contact.linkedInUrl ? (
                <div>
                  <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                  <dd className="mt-1 text-jb-ink/74">
                    <a
                      className="font-semibold text-jb-blue hover:text-jb-green"
                      href={site.contact.linkedInUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      LinkedIn profile
                    </a>
                  </dd>
                </div>
              ) : null}
              {site.contact.githubUrl ? (
                <div>
                  <dt className="font-semibold text-jb-ink">GitHub</dt>
                  <dd className="mt-1 text-jb-ink/74">
                    <a
                      className="font-semibold text-jb-blue hover:text-jb-green"
                      href={site.contact.githubUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      GitHub profile
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="leading-8 text-jb-ink/76">
              For now, please contact Jamie through the resume/application
              channel where this site was shared.
            </p>
          )}
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Resume</dt>
              <dd className="mt-1">
                <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/resume">
                  View resume page
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
