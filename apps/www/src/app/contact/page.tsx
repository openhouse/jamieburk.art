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
  const emailLink =
    site.contact.email && site.contact.emailHref
      ? { href: site.contact.emailHref, label: site.contact.email }
      : null;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Public email</dt>
              <dd className="mt-1 text-jb-ink/74">
                {emailLink ? (
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={emailLink.href}
                  >
                    {emailLink.label}
                  </a>
                ) : (
                  "Email will appear here after launch approval."
                )}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {site.contact.linkedinUrl ? (
              <div>
                <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                <dd className="mt-1 text-jb-ink/74">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.contact.linkedinUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn
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
                    GitHub
                  </a>
                </dd>
              </div>
            ) : null}
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
