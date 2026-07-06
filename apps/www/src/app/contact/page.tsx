import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { contactConfig, contactLinks } from "@/lib/contact";
import { createMetadata } from "@/lib/metadata";
import { JAMIE_APPROVAL_TODO, JAMIE_PUBLIC_READY_TODO } from "@/lib/public-safety";
import { IS_PRODUCTION } from "@/lib/site-url";

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

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="font-semibold text-jb-blue hover:text-jb-green" href={href}>
      {children}
    </a>
  );
}

export default function ContactPage() {
  const showApprovalTodos = !IS_PRODUCTION;
  const rows = ([
    contactConfig.email
      ? {
          label: "Public email",
          value: (
            <ContactLink href={contactLinks.emailHref ?? "/contact"}>
              {contactConfig.email}
            </ContactLink>
          )
        }
      : showApprovalTodos
        ? { label: "Public email", value: JAMIE_APPROVAL_TODO }
        : null,
    { label: "Location", value: site.location },
    contactConfig.linkedInUrl
      ? {
          label: "LinkedIn",
          value: (
            <ContactLink href={contactConfig.linkedInUrl}>
              {contactConfig.linkedInUrl}
            </ContactLink>
          )
        }
      : showApprovalTodos
        ? { label: "LinkedIn", value: JAMIE_APPROVAL_TODO }
        : null,
    contactConfig.githubUrl
      ? {
          label: "GitHub",
          value: (
            <ContactLink href={contactConfig.githubUrl}>
              {contactConfig.githubUrl}
            </ContactLink>
          )
        }
      : showApprovalTodos
        ? { label: "GitHub", value: JAMIE_PUBLIC_READY_TODO }
        : null
  ] as Array<ContactRow | null>).filter((row): row is ContactRow => row !== null);

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">{row.value}</dd>
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
