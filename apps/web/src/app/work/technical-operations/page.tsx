import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityGrid } from "@/components/capability-grid";
import { Section } from "@/components/section";
import { SourceLayer } from "@/components/source-layer";
import { capabilities } from "@/data/capabilities";
import { getFeaturedWork, getWorkHref } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations",
  description: "Role-specific proof page for technical operations, product operations, documentation, handoffs, and implementation.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  const proof = getFeaturedWork().slice(0, 4);

  return (
    <Section
      eyebrow="Role proof"
      title="Technical operations, product operations, documentation, and handoffs"
      intro="The through-line is turning ambiguous, stakeholder-heavy work into usable systems people can keep using."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <CapabilityGrid capabilities={capabilities} />
        </div>
        <SourceLayer
          items={[
            "Requirements and stakeholder context become shared operating notes.",
            "Decisions and risks become visible records instead of private memory.",
            "Launch and adoption work becomes checklists, QA notes, and handoffs.",
            "Public-facing systems stay bounded by privacy, consent, and source fidelity."
          ]}
        />
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-black">Representative proof</h2>
        <div className="mt-5 grid gap-3">
          {proof.map((entry) => (
            <Link
              className="rounded border border-base-300 bg-base-200 p-4 no-underline hover:border-primary/55"
              href={getWorkHref(entry)}
              key={entry.slug}
            >
              <span className="block font-black">{entry.title}</span>
              <span className="mt-1 block text-sm leading-6 text-base-content/75">{entry.whatBecameUsable}</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
