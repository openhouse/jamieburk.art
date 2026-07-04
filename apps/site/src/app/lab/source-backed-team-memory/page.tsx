import type { Metadata } from "next";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { Section } from "@/components/Section";
import Content, { metadata as labMetadata } from "@/content/lab/source-backed-team-memory.mdx";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory",
  description: "A concise lab note on source-backed team memory, public-safe documentation, and durable handoffs.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  return (
    <>
      <Section eyebrow="Lab" title={String(labMetadata.title)} intro={String(labMetadata.summary)}>
        <PublicSafetyNote>
          This lab note describes a method, not a private archive. Raw notes, transcripts, and unapproved stakeholder
          details are intentionally omitted.
        </PublicSafetyNote>
      </Section>
      <Section>
        <div className="case-content">
          <Content />
        </div>
      </Section>
      <Section title="Known / Open / Protected">
        <KnownOpenProtected
          known={["Source-backed memory helps teams find decisions, context, and next actions.", "Public-safe summaries can preserve usefulness without publishing raw material."]}
          open={["Exact tooling can change by team, risk level, and consent requirements.", "Future examples need redaction and approval."]}
          protectedItems={["Raw transcripts", "private notes", "unapproved names", "sensitive strategy"]}
        />
      </Section>
    </>
  );
}
