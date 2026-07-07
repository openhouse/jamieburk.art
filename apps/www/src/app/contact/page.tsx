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

type ProfileRow = {
  label: string;
  value: string;
  href: string;
};

const profileRows = [
  site.contact.linkedInUrl
    ? {
        label: "LinkedIn",
        value: "linkedin.com/in/jamie-burkart",
        href: site.contact.linkedInUrl
      }
    : null,
  site.contact.githubUrl
    ? {
        label: "GitHub",
        value: "github.com/openhouse",
        href: site.contact.githubUrl
      }
    : null
].filter((row): row is ProfileRow => Boolean(row));

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
            {site.contact.email && site.contact.emailHref ? (
              <div>
                <dt className="font-semibold text-jb-ink">Public email</dt>
                <dd className="mt-1">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.contact.emailHref}
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {profileRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={row.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {row.value}
                  </a>
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
        {!site.contact.email ? (
          <p className="mt-4 text-sm leading-6 text-jb-ink/62">
            Public contact details are configured on reviewed deployments.
          </p>
        ) : null}
      </div>
    </div>
  );
}
