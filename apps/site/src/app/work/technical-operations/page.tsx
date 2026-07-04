import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { ResumeCta } from "@/components/resume-cta";
import { getFeaturedWorkItems } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Technical Operations",
  description:
    "Role-specific proof for technical project management, implementation, product operations, and knowledge systems.",
  pathname: "/work/technical-operations"
});

export default async function TechnicalOperationsPage() {
  const workItems = await getFeaturedWorkItems();

  return (
    <section className="section">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Role proof</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            Technical project management, product operations, and implementation
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-base-content/70">
            Jamie has a strong role fit where requirements, systems, people, records, and launch paths meet.
            The proof is not one platform. It is the repeated pattern of turning unclear work into something a
            team can use and maintain.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Requirements and workflow clarification",
              "Stakeholder coordination and decision trails",
              "Public-facing tool and documentation launches",
              "Source-backed memory and handoff systems"
            ].map((item) => (
              <div className="rounded-lg border quiet-rule bg-base-100 p-5" key={item}>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-12 text-2xl font-black">Representative proof</h2>
          <div className="mt-5 grid gap-4">
            {workItems.slice(0, 4).map((item) => (
              <Link
                className="rounded-lg border quiet-rule bg-base-100 p-5 no-underline transition hover:border-primary"
                href={`/work/${item.meta.slug}` as Route}
                key={item.meta.slug}
              >
                <p className="text-lg font-bold">{item.meta.title}</p>
                <p className="mt-2 text-sm leading-6 text-base-content/70">{item.meta.whatBecameUsable}</p>
              </Link>
            ))}
          </div>
        </div>
        <aside className="grid gap-4 self-start">
          <ResumeCta />
          <ContactCta />
        </aside>
      </div>
    </section>
  );
}
