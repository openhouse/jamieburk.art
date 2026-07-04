import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { SourceToMemoryLoop } from "@/components/SourceToMemoryLoop";
import { getWorkItem } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Source-Backed Team Memory",
  description: "A lab and method page for source-backed team memory: AI drafts, humans review, and the shared record remains inspectable.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const item = getWorkItem("source-backed-team-memory");

  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_20rem]">
        <div>
          <p className="eyebrow mb-3">Lab / method</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Source-Backed Team Memory
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[color:var(--color-muted)]">
            {item?.meta.summary ??
              "A source-backed team-memory practice for turning meetings, documents, transcripts, and decisions into human-reviewed organizational memory."}
          </p>
          <p className="mt-6 text-2xl font-black text-[color:var(--color-broadway-blue)]">
            AI drafts. Humans review. The shared record remains inspectable and correctable.
          </p>
          <div className="mt-10">
            <SourceToMemoryLoop />
          </div>
        </div>
        <ContactCTA />
      </div>
    </section>
  );
}
