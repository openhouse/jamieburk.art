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

const bestFitConversations = [
  "Technical Operations / Product Operations roles",
  "Public-sector or civic-technology implementation",
  "Documentation systems and operating memory",
  "Onboarding, runbooks, and team handoffs",
  "Scoped knowledge-systems or source-backed team-memory sprints"
];

const referrerSentence =
  "Jamie Burkart is a technical project manager and implementation lead who helps public-facing, civic, small-business, cultural, and technical teams turn ambiguous work into requirements, workflows, documentation, onboarding, launch support, and durable handoffs.";

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
          For technical operations roles, referrals, public-sector
          implementation, documentation systems, or scoped bridge-work
          conversations.
        </p>
        <section className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">
            Best-fit conversations
          </h2>
          <ul className="mt-5 space-y-3 text-jb-ink/76">
            {bestFitConversations.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-5 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">
            Referrer sentence
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/78">{referrerSentence}</p>
        </section>
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
        {!site.contact.email ? (
          <p className="mt-5 text-sm leading-6 text-jb-ink/64">
            Public contact details are controlled by approved deployment
            variables. Production release is blocked until an approved public
            email is set.
          </p>
        ) : null}
      </div>
    </div>
  );
}
