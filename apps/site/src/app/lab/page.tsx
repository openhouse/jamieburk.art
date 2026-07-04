import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Lab",
  description: "Small public-safe lab index for source-backed team memory and related practices.",
  pathname: "/lab"
});

export default function LabPage() {
  return (
    <section className="section">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Lab</p>
        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Current lab</h1>
        <p className="mt-5 text-lg leading-8 text-base-content/70">
          Small, public-safe proof-of-practice pages for knowledge systems, source-backed documentation, and
          human-reviewed AI workflows.
        </p>
      </div>
      <div className="mt-10 max-w-2xl rounded-lg border quiet-rule bg-base-100 p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Early local-first research prototype</p>
        <h2 className="mt-3 text-2xl font-black">Source-Backed Team Memory Lab</h2>
        <p className="mt-3 leading-7 text-base-content/70">
          Human-reviewed workflows for turning meetings, documents, decisions, open questions, useful ideas, and
          source materials into inspectable shared records.
        </p>
        <Link className="btn btn-primary mt-5 rounded-lg" href="/lab/source-backed-team-memory">
          Open lab page
        </Link>
      </div>
    </section>
  );
}
