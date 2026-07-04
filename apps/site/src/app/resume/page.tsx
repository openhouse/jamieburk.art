import type { Metadata } from "next";

import { ContactCta } from "@/components/contact-cta";
import { ResumeCta } from "@/components/resume-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Web resume for Jamie Burkart.",
  pathname: "/resume"
});

export default function ResumePage() {
  return (
    <section className="section">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="prose-jamie">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Resume</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Technical Project Manager - Product Operations & Implementation
          </h1>
          <p>
            Jamie Burkart turns under-structured civic, cultural, small-business, public-interest, and technical
            work into usable workflows, documentation, decision trails, tools, and durable handoffs.
          </p>
          <h2>Core strengths</h2>
          <ul className="list-disc pl-5">
            <li>Requirements clarification and workflow mapping.</li>
            <li>Implementation planning, launch support, and handoff documentation.</li>
            <li>Source-backed records, public-safe summaries, and institutional memory.</li>
            <li>Public-facing web systems and civic information tools.</li>
          </ul>
          <h2>Selected proof</h2>
          <p>
            Harry J. Epstein Company, Fair Rent NYC / NYC Artist Coalition, CallNYC.org, WOWList.org, 196 Artists
            Residency / Sunday Dinner, and Source-Backed Team Memory.
          </p>
        </div>
        <aside className="grid gap-4 self-start">
          <ResumeCta />
          <ContactCta />
        </aside>
      </div>
    </section>
  );
}
