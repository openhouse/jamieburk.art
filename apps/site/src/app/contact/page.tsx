import type { Metadata } from "next";

import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Jamie Burkart about technical project management and implementation work.",
  pathname: "/contact"
});

export default function ContactPage() {
  return (
    <section className="section">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Contact</p>
        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Work that needs structure</h1>
        <p className="mt-5 text-lg leading-8 text-base-content/70">
          Reach out about technical project management, product operations, implementation, civic technology,
          knowledge systems, public-facing tools, or source-backed documentation.
        </p>
        <div className="mt-8 rounded-lg border quiet-rule bg-base-100 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Email</p>
          <a className="mt-2 block text-2xl font-black text-base-content" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
