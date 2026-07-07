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

type ContactRow = {
  label: string;
  value: string;
  href?: string;
};

export default function ContactPage() {
  const contactRowCandidates: Array<ContactRow | undefined> = [
    site.contact.email
      ? {
          label: "Public email",
          value: site.contact.email.label,
          href: site.contact.email.href
        }
      : undefined,
    {
      label: "Location",
      value: site.location
    },
    site.contact.linkedIn
      ? {
          label: "LinkedIn",
          value: site.contact.linkedIn.label,
          href: site.contact.linkedIn.href
        }
      : undefined,
    site.contact.github
      ? {
          label: "GitHub",
          value: site.contact.github.label,
          href: site.contact.github.href
        }
      : undefined
  ];
  const contactRows = contactRowCandidates.filter((row): row is ContactRow => Boolean(row));

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
                <dd className="mt-1 text-jb-ink/74">
                  {row.href ? (
                    <a
                      className="font-semibold text-jb-blue hover:text-jb-green"
                      href={row.href}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
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
