import type { Metadata } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { Section } from "@/components/Section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations",
  description:
    "A proof page for Jamie Burkart's technical operations, implementation, documentation, and handoff work.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <>
      <Section
        eyebrow="Proof page"
        title="Technical operations"
        intro="A compact view of the operating pattern across the portfolio: clarify the work, build the structure, and leave a handoff people can use."
      >
        <CapabilityGrid />
      </Section>
      <Section title="Known / Open / Protected">
        <KnownOpenProtected
          known={[
            "Jamie works across civic, cultural, small-business, public-facing, and technical contexts.",
            "The recurring output is structure: requirements, workflows, documentation, decision trails, and launch support.",
            "V1 favors public-safe summaries over private operational detail."
          ]}
          open={[
            "Exact metrics and screenshots need approval project by project.",
            "Some older projects may need reconstructed diagrams instead of raw artifacts.",
            "Lab work should stay concise until a public-safe framing is approved."
          ]}
          protectedItems={[
            "Private correspondence, contact lists, attendance data, and raw coalition notes.",
            "Legal-review materials, internal strategy documents, and unapproved names or photos.",
            "Health, financial, residential, and family details."
          ]}
        />
      </Section>
      <Section>
        <PublicSafetyNote>
          The technical-operations page is a synthesis layer. It is meant to help hiring managers and referrers see the
          work pattern without exposing sensitive source material.
        </PublicSafetyNote>
      </Section>
    </>
  );
}
