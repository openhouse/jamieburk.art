import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@jamie/site-content/site";
import { Section } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting, or collaboration."
};

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">Contact</p>
            <h1>For roles, referrals, consulting, or collaboration</h1>
            <p className="lead">
              Best-fit conversations: technical project management, product operations,
              implementation, documentation systems, civic technology, govtech, knowledge
              systems, and public-facing tools.
            </p>
          </div>
        </div>
      </section>

      <Section title="Reach Jamie">
        <div className="grid grid-2">
          <div className="card">
            <h2>Email</h2>
            <p>
              <a className="subtle-link" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          </div>
          <div className="card">
            <h2>Location</h2>
            <p>{siteConfig.location}</p>
          </div>
          <div className="card">
            <h2>GitHub</h2>
            <p>
              <a className="subtle-link" href={siteConfig.social.github}>
                github.com/openhouse
              </a>
            </p>
          </div>
          <div className="card">
            <h2>Resume</h2>
            <p>
              <Link className="subtle-link" href={siteConfig.resumePath}>
                Download resume PDF
              </Link>
            </p>
          </div>
        </div>
        <p className="copy">
          TODO: Jamie approval required before publishing a LinkedIn URL or phone number.
        </p>
      </Section>
    </>
  );
}
