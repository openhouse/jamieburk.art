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

const contactRows = [
  site.contact.email && site.contact.emailHref
    ? {
        label: "Public email",
        value: site.contact.email,
        href: site.contact.emailHref
      }
    : null,
  {
    label: "Location",
    value: site.location,
    href: undefined
  },
  site.contact.linkedInUrl
    ? {
        label: "LinkedIn",
        value: "LinkedIn profile",
        href: site.contact.linkedInUrl
      }
    : null,
  site.contact.githubUrl
    ? {
        label: "GitHub",
        value: "GitHub profile",
        href: site.contact.githubUrl
      }
    : null
].filter((row) => row !== null);

export default function ContactPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting conversations, or collaborations.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="jb-meta-label text-jb-ink">{row.label}</dt>
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
              <dt className="jb-meta-label text-jb-ink">Resume</dt>
              <dd className="mt-1">
                <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/resume">
                  View resume page
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-6 text-lg leading-8 text-jb-ink/76">
          Best-fit conversations: technical project management, product
          operations, implementation, documentation systems, civic technology,
          knowledge systems, and public-facing tools.
        </p>
      </div>
    </div>
  );
}
