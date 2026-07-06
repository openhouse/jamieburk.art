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
  const contactRows: Array<{
    label: string;
    value: string;
    href?: string;
    external: boolean;
  }> = [
    {
      label: "Location",
      value: site.location,
      href: undefined,
      external: false
    }
  ];

  if (site.contact.emailHref && site.contact.emailLabel) {
    contactRows.unshift({
      label: "Public email",
      value: site.contact.emailLabel,
      href: site.contact.emailHref,
      external: false
    });
  }

  if (site.contact.linkedinUrl && site.contact.linkedinLabel) {
    contactRows.push({
      label: "LinkedIn",
      value: site.contact.linkedinLabel,
      href: site.contact.linkedinUrl,
      external: true
    });
  }

  if (site.contact.githubUrl && site.contact.githubLabel) {
    contactRows.push({
      label: "GitHub",
      value: site.contact.githubLabel,
      href: site.contact.githubUrl,
      external: true
    });
  }

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
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {row.href ? (
                    <a
                      className="break-words font-semibold text-jb-blue hover:text-jb-green"
                      href={row.href}
                      rel={row.external ? "noreferrer" : undefined}
                      target={row.external ? "_blank" : undefined}
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
        {!site.contact.hasApprovedContactPath ? (
          <p className="mt-5 text-sm leading-6 text-jb-ink/64">
            Public contact details are controlled by approved deployment
            variables. Production release is blocked until at least one approved
            contact path is set.
          </p>
        ) : null}
      </div>
    </div>
  );
}
