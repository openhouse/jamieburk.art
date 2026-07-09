import type { Metadata } from "next";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const contactRows = [
  {
    label: "Email",
    value: site.emailLabel,
    href: site.emailHref
  },
  {
    label: "Location",
    value: site.location
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
];

const bestFitConversations = [
  "Technical operations roles",
  "Product operations / implementation roles",
  "Civic technology and public-service delivery",
  "Documentation and knowledge systems",
  "Bounded source-backed team-memory sprint"
];

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
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
        <section className="rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">Direct links</h2>
          <dl className="mt-5 space-y-5">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="font-semibold text-jb-ink">{row.label}</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {row.href ? (
                    <a
                      className="font-semibold text-jb-blue hover:text-jb-green"
                      href={row.href}
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
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.resumePath}
                >
                  Download resume PDF
                </a>
              </dd>
            </div>
          </dl>
        </section>
        <section className="rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">
            Best-fit conversations
          </h2>
          <ul className="mt-5 space-y-3 text-jb-ink/76">
            {bestFitConversations.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
