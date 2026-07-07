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
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting conversations, or collaboration,
          use the approved resume PDF for current contact details.
        </p>
        <p className="mt-4 leading-8 text-jb-ink/76">
          Best-fit conversations: technical project management, product
          operations, implementation, civic/govtech delivery, documentation
          systems, source-backed knowledge work, and public-facing tools.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Contact details</dt>
              <dd className="mt-1">
                <Link className="font-semibold text-jb-blue hover:text-jb-green" href={site.contactHref}>
                  {site.contactLabel}
                </Link>
              </dd>
            </div>
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
        <section className="mt-6 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
          <h2 className="text-xl font-semibold text-jb-ink">
            Copyable referrer sentence
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">
            Jamie Burkart is a Technical Project Manager - Product Operations
            & Implementation lead who turns under-structured work into usable
            systems for complex public-facing teams.
          </p>
        </section>
      </div>
    </div>
  );
}
