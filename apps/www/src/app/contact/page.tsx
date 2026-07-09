import type { Metadata } from "next";
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
          email Jamie at{" "}
          <a
            className="font-semibold text-jb-blue hover:text-jb-green"
            href={site.emailHref}
          >
            {site.emailLabel}
          </a>
          .
        </p>
        <p className="mt-4 leading-8 text-jb-ink/76">
          Best-fit conversations: technical operations, product operations,
          implementation, business analysis, civic technology, documentation
          systems, knowledge systems, public-facing tools, and source-backed
          team memory.
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Email</dt>
              <dd className="mt-1 text-jb-ink/74">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.emailHref}
                >
                  {site.emailLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {site.linkedinHref ? (
              <div>
                <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                <dd className="mt-1 text-jb-ink/74">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.linkedinHref}
                  >
                    {site.linkedinLabel}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-jb-ink">GitHub</dt>
              <dd className="mt-1 text-jb-ink/74">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.githubHref}
                >
                  {site.githubLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Résumé</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  download
                  href={site.resumePath}
                >
                  Download résumé PDF
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
