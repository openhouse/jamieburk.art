import type { Metadata } from "next";
import {
  CapabilityGrid,
  ContactCTA,
  Hero,
  ProjectCard,
  ProofStrip,
  ResumeDownload
} from "../components";
import { featuredWork } from "../lib/work";

export const metadata: Metadata = {
  title: "Jamie Burkart | Technical Project Manager",
  description:
    "Jamie Burkart turns ambiguous, stakeholder-heavy work into requirements, workflows, documentation, decision trails, launch support, onboarding, public-facing tools, source-backed memory, and durable handoffs."
};

const proofItems = [
  { value: "14+", label: "years building operating structure" },
  { value: "2x", label: "revenue growth contribution for legacy e-commerce" },
  { value: "30+", label: "pages of civic campaign-memory infrastructure" },
  { value: "35", label: "city ecosystems reached through WOWList" },
  { value: "300+", label: "gatherings supported through hosting systems" }
];

const capabilities = [
  "Clarify",
  "Structure",
  "Build",
  "Document",
  "Transfer"
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section-band">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Current focus</p>
            <h2>Technical operations with public memory.</h2>
            <p>
              Jamie is currently focused on technical operations, product operations,
              implementation, civic/public-interest technology, documentation, and source-backed
              knowledge systems.
            </p>
          </div>
          <ProofStrip items={proofItems} />
        </div>
      </section>

      <section className="section-band">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Selected systems</p>
            <h2>Clear professional room, living archive behind it.</h2>
            <p>
              The site starts with selected proof: public-safe work that shows what was unclear,
              what became usable, and what was protected.
            </p>
          </div>
          <div className="grid-3">
            {featuredWork.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-inner grid-2">
          <div>
            <p className="eyebrow">Method</p>
            <h2 className="compact-heading">
              Clarify {"->"} Structure {"->"} Build {"->"} Document {"->"} Transfer
            </h2>
            <p>
              The work often leaves behind reusable structures: source maps, decision records,
              action trackers, call scripts, public guidance, onboarding notes, requirements,
              runbooks, diagrams, and handoff documents.
            </p>
          </div>
          <CapabilityGrid items={capabilities} />
        </div>
      </section>

      <section className="section-band">
        <div className="section-inner grid-2">
          <ResumeDownload />
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
