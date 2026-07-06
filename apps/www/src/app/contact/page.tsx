import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const contactRows = [
  {
    label: "Public email",
    value: site.emailLabel,
    href: site.emailHref
  },
  {
    label: "Location",
    value: site.location,
    href: ""
  },
  {
    label: "LinkedIn",
    value: site.linkedinLabel,
    href: site.linkedinHref
  },
  {
    label: "GitHub",
    value: site.githubLabel,
    href: site.githubHref
  }
] as const;

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
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {row.href ? (
                    <Link className="font-semibold text-jb-blue hover:text-jb-green" href={row.href}>
                      {row.value}
                    </Link>
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
