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

const referrerSentence =
  "Jamie Burkart is a technical project manager and implementation lead who helps civic, cultural, small-business, public-facing, and technical teams turn under-structured work into usable systems, documentation, workflows, public tools, and handoffs.";

export default function ContactPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <p className="mt-4 leading-8 text-jb-ink/76">
          Best fits: technical project management, product operations,
          implementation, civic/govtech delivery, documentation systems, and
          source-backed knowledge work.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Public email</dt>
              <dd className="mt-1">
                <Link
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.emailHref}
                >
                  {site.emailLabel}
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
        <section
          aria-labelledby="referrer-sentence"
          className="mt-8 border-t border-jb-ink/12 pt-6"
        >
          <h2 className="text-2xl font-semibold text-jb-ink" id="referrer-sentence">
            Referrer sentence
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">{referrerSentence}</p>
        </section>
      </div>
    </div>
  );
}
