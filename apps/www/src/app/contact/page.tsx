import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration.",
  path: "/contact"
});

type ContactRow = {
  label: string;
  value: ReactNode;
};

export default function ContactPage() {
  const contactRows: ContactRow[] = [];

  if (site.emailHref && site.emailLabel) {
    contactRows.push({
      label: "Public email",
      value: (
        <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.emailHref}>
          {site.emailLabel}
        </a>
      )
    });
  }

  if (site.linkedinUrl) {
    contactRows.push({
      label: "LinkedIn",
      value: (
        <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.linkedinUrl}>
          LinkedIn profile
        </a>
      )
    });
  }

  if (site.githubUrl) {
    contactRows.push({
      label: "GitHub",
      value: (
        <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.githubUrl}>
          GitHub profile
        </a>
      )
    });
  }

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">{row.value}</dd>
              </div>
            ))}
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
