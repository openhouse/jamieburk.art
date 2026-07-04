import Link from "next/link";
import type { Metadata } from "next";

import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Jamie Burkart for roles, referrals, consulting conversations, or collaborations."
};

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-page golden-grid">
        <div className="measure-wide">
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Contact Jamie</h1>
          <p className="mt-6 text-xl leading-9 text-[color:var(--jamie-muted)]">
            For roles, referrals, consulting conversations, or collaborations, email Jamie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${site.email}`}>Email Jamie</a>
            <Link className="btn btn-outline" href="/resume">Resume</Link>
          </div>
        </div>
        <aside className="editorial-card p-5">
          <h2 className="text-xl font-black">Details</h2>
          <dl className="mt-5 grid gap-4">
            <div>
              <dt className="font-black">Email</dt>
              <dd className="mt-1 text-[color:var(--jamie-muted)]">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="font-black">Location</dt>
              <dd className="mt-1 text-[color:var(--jamie-muted)]">{site.location}</dd>
            </div>
            <div>
              <dt className="font-black">LinkedIn</dt>
              <dd className="mt-1 text-[color:var(--jamie-muted)]">URL to confirm before launch.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
