import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const TODO_PREFIX = "TODO:";
const REQUIRED_APPROVAL = "Jamie approval required before launch.";
const OPTIONAL_APPROVAL = "Jamie approval required if public-ready.";

export const metadata: Metadata = createMetadata({
  title: "Contact - Jamie Burkart",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration.",
  path: "/contact"
});

export default function ContactPage() {
  const showPlaceholders = site.contact.showApprovalPlaceholders;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Contact</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          For roles, referrals, consulting, or collaboration:
        </p>
        <div className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
          <dl className="space-y-5">
            {site.contact.email && site.contact.emailHref ? (
              <div>
                <dt className="font-semibold text-jb-ink">Public email</dt>
                <dd className="mt-1">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.contact.emailHref}
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            ) : showPlaceholders ? (
              <div>
                <dt className="font-semibold text-jb-ink">Public email</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {TODO_PREFIX} {REQUIRED_APPROVAL}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1 text-jb-ink/74">{site.location}</dd>
            </div>
            {site.contact.linkedinUrl ? (
              <div>
                <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                <dd className="mt-1">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.contact.linkedinUrl}
                  >
                    LinkedIn profile
                  </a>
                </dd>
              </div>
            ) : showPlaceholders ? (
              <div>
                <dt className="font-semibold text-jb-ink">LinkedIn</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {TODO_PREFIX} {REQUIRED_APPROVAL}
                </dd>
              </div>
            ) : null}
            {site.contact.githubUrl ? (
              <div>
                <dt className="font-semibold text-jb-ink">GitHub</dt>
                <dd className="mt-1">
                  <a
                    className="font-semibold text-jb-blue hover:text-jb-green"
                    href={site.contact.githubUrl}
                  >
                    GitHub profile
                  </a>
                </dd>
              </div>
            ) : showPlaceholders ? (
              <div>
                <dt className="font-semibold text-jb-ink">GitHub</dt>
                <dd className="mt-1 text-jb-ink/74">
                  {TODO_PREFIX} {OPTIONAL_APPROVAL}
                </dd>
              </div>
            ) : null}
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
