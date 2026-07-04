import type { Metadata } from "next";
import { ArtifactList, CapabilityGrid, ContactCTA } from "../../../components";

export const metadata: Metadata = {
  title: "Technical Operations",
  description:
    "Role-specific proof page for Jamie Burkart's technical operations, implementation, documentation, and handoff work."
};

const capabilities = [
  "Requirements and decision trails",
  "Workflow and runbook design",
  "Launch support and adoption",
  "Public-facing tools",
  "Source-backed team memory",
  "Durable handoffs"
];

export default function TechnicalOperationsPage() {
  return (
    <section className="section-band">
      <div className="section-inner">
        <p className="eyebrow">Role-specific proof</p>
        <h1 className="page-title">Technical operations.</h1>
        <p className="lead">
          Jamie is a technical project manager and implementation lead who turns complex civic,
          cultural, small-business, public-facing, and technical work into usable workflows,
          documentation, tools, adoption materials, and handoffs.
        </p>

        <div className="section-band">
          <h2 className="compact-heading">What becomes usable</h2>
          <CapabilityGrid items={capabilities} />
        </div>

        <div className="section-band">
          <h2 className="compact-heading">Artifacts Jamie leaves behind</h2>
          <ArtifactList
            items={[
              {
                title: "Requirements and source maps",
                description:
                  "A shared record of what is known, what is assumed, where evidence lives, and what still needs a decision."
              },
              {
                title: "Decision and action trackers",
                description:
                  "Clear next steps, owners, unresolved questions, and public-safe memory after meetings."
              },
              {
                title: "Runbooks and launch support",
                description:
                  "Repeatable workflows that help people use a system after the original builder steps away."
              },
              {
                title: "Public guidance and handoffs",
                description:
                  "Plain-language materials that make complex work easier to enter, remember, and repair."
              }
            ]}
          />
        </div>

        <ContactCTA />
      </div>
    </section>
  );
}
