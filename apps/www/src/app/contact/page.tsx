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
        <h1 className="font-display text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            <div>
              <dt className="font-condensed font-semibold tracking-wide text-jb-ink">
                Public email
              </dt>
              <dd className="mt-1 text-jb-ink/74">
                TODO: Jamie approval required before launch.
              </dd>
            </div>
            <div>
              <dt className="font-condensed font-semibold tracking-wide text-jb-ink">
                Location
              </dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            <div>
              <dt className="font-condensed font-semibold tracking-wide text-jb-ink">
                LinkedIn
              </dt>
              <dd className="mt-1 text-jb-ink/74">
                TODO: Jamie approval required before launch.
              </dd>
            </div>
            <div>
              <dt className="font-condensed font-semibold tracking-wide text-jb-ink">
                GitHub
              </dt>
              <dd className="mt-1 text-jb-ink/74">
                TODO: Jamie approval required if public-ready.
              </dd>
            </div>
            <div>
              <dt className="font-condensed font-semibold tracking-wide text-jb-ink">
                Resume
              </dt>
              <dd className="mt-1">
                <Link
                  className="font-condensed font-semibold tracking-wide text-jb-blue hover:text-jb-green"
                  href="/resume"
                >
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
