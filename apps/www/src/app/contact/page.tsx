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
  const hasApprovedContactLinks = site.approvedContactLinks.length > 0;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, warm referrals, consulting, or collaboration, start with
          the path that best matches the work.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {site.contactIntents.map((intent) => (
            <section
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5"
              key={intent.label}
            >
              <h2 className="text-xl font-semibold text-jb-ink">{intent.label}</h2>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">
                {intent.description}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {hasApprovedContactLinks
              ? site.approvedContactLinks.map((link) => (
                  <div key={link.label}>
                    <dt className="font-semibold text-jb-ink">{link.label}</dt>
                    <dd className="mt-1">
                      <a
                        className="font-semibold text-jb-blue hover:text-jb-green"
                        href={link.href}
                      >
                        {link.value}
                      </a>
                    </dd>
                  </div>
                ))
              : null}
            <div>
              <dt className="font-semibold text-jb-ink">Direct contact details</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  download
                  href={site.resumePath}
                >
                  Download resume PDF
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
