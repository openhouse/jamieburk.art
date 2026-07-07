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

const goodFitConversations = [
  "Technical Operations Manager / Product Operations / Implementation roles",
  "Civic or public-interest technology teams",
  "Documentation, onboarding, runbook, and decision-record cleanup",
  "Bounded source-backed team-memory sprints",
  "Public-facing tool or knowledge-system implementation"
];

export default function ContactPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Good-fit conversations include technical operations roles, product
          operations / implementation roles, civic or public-interest technology
          work, and bounded source-backed team-memory sprints for teams that
          need better decision records, onboarding context, and human-reviewed
          documentation.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">
            Good-fit conversations
          </h2>
          <ul className="mt-5 space-y-3 text-jb-ink/74">
            {goodFitConversations.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
          <h2 className="text-2xl font-semibold text-jb-ink">Contact paths</h2>
          {site.contactLinks.length ? (
            <ul className="mt-5 space-y-4 text-jb-ink/74">
              {site.contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 leading-7 text-jb-ink/74">
              Public contact links are intentionally withheld on this review
              build until Jamie approves the exact email and profile URLs.
            </p>
          )}
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
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
