import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

type ContactRow = {
  label: string;
  value: ReactNode;
};

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration.",
  path: "/contact"
});

export default function ContactPage() {
  const contactRows: ContactRow[] = [
    {
      label: "Public email",
      value: site.contact.emailHref ? (
        <a
          className="font-semibold text-jb-blue hover:text-jb-green"
          href={site.contact.emailHref}
        >
          {site.contact.emailLabel}
        </a>
      ) : (
        <span>{site.contact.emailLabel}</span>
      )
    },
    { label: "Location", value: <span>{site.location}</span> },
    {
      label: "Resume",
      value: (
        <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/resume">
          View resume page
        </Link>
      )
    }
  ];

  if (site.contact.linkedInUrl) {
    contactRows.splice(2, 0, {
      label: "LinkedIn",
      value: (
        <a
          className="font-semibold text-jb-blue hover:text-jb-green"
          href={site.contact.linkedInUrl}
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn profile
        </a>
      )
    });
  }

  if (site.contact.githubUrl) {
    contactRows.splice(site.contact.linkedInUrl ? 3 : 2, 0, {
      label: "GitHub",
      value: (
        <a
          className="font-semibold text-jb-blue hover:text-jb-green"
          href={site.contact.githubUrl}
          rel="noreferrer"
          target="_blank"
        >
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
          </dl>
        </div>
      </div>
    </div>
  );
}
