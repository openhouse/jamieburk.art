import type { Metadata } from "next";

import { WorkCard } from "@/components/work-card";
import { getWorkItems } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Selected Work",
  description: "Selected public-safe systems and case studies from Jamie Burkart.",
  pathname: "/work"
});

export default async function WorkPage() {
  const workItems = await getWorkItems();

  return (
    <section className="section">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Selected work</p>
        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Selected systems</h1>
        <p className="mt-5 text-lg leading-8 text-base-content/70">
          Public-safe evidence of technical project management, product operations, civic technology,
          documentation, implementation, and durable handoff work.
        </p>
      </div>
      <div className="case-grid mt-10">
        {workItems.map((item) => (
          <WorkCard key={item.meta.slug} work={item.meta} />
        ))}
      </div>
    </section>
  );
}
