import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for technical project management, product operations, implementation, documentation, and public-facing systems work.",
  path: "/contact"
});

const contactRows = [
  {
    label: "Email",
    value: site.emailLabel,
    href: site.emailHref
  },
  {
    label: "Phone",
    value: site.phoneLabel,
    href: site.phoneHref
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
].filter((row) => row.value);

function ContactValue({ href, value }: { href: string; value: string }) {
  if (!href) return <span>{value}</span>;

  return (
    <a className="font-semibold text-jb-blue hover:text-jb-green" href={href}>
      {value}
    </a>
  );
}

export default function ContactPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting conversations, or collaborations,
          email or call Jamie.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">
                  <ContactValue href={row.href} value={row.value} />
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
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-paper p-5">
          <h2 className="text-xl font-semibold text-jb-ink">Referral blurb</h2>
          <p className="mt-3 leading-7 text-jb-ink/76">
            Jamie Burkart is a Technical Project Manager - Product Operations &
            Implementation lead who creates operating structure for complex
            public-facing teams: requirements, workflows, documentation,
            decision trails, launch support, onboarding, and durable handoffs.
          </p>
        </div>
      </div>
    </div>
  );
}
