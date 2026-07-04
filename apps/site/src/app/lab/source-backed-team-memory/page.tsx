import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentBody } from "@/components/content-body";
import { getLabPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Source-Backed Team Memory Lab",
  description:
    "Human-reviewed workflows for turning source materials into inspectable shared records.",
  pathname: "/lab/source-backed-team-memory"
});

export default async function SourceBackedTeamMemoryPage() {
  const labPage = await getLabPage("source-backed-team-memory");

  if (!labPage) {
    notFound();
  }

  return (
    <section className="section">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">{labPage.meta.status}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{labPage.meta.title}</h1>
        <p className="mt-5 text-xl leading-8 text-base-content/70">{labPage.meta.subtitle}</p>
      </div>
      <div className="mt-10">
        <ContentBody body={labPage.body} />
      </div>
    </section>
  );
}
