import { ButtonLink } from "@/components/ButtonLink";
import { CapabilityBand } from "@/components/CapabilityBand";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { SelectedSystems } from "@/components/SelectedSystems";
import { StartHere } from "@/components/StartHere";
import { TagList } from "@/components/TagList";
import { site } from "@/lib/site";

const roleTags = [
  "Technical Project Manager",
  "Technical Operations Manager",
  "Product Operations Manager",
  "Implementation Lead",
  "Business Analyst",
  "Knowledge Systems / Documentation Lead",
  "Civic Technology Program Manager",
  "Govtech / Digital Service Delivery",
  "AI Product Readiness"
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <StartHere />
      <ProofStrip />
      <CapabilityBand />
      <SelectedSystems />
      <section className="section rule-top">
        <div className="container golden-split items-start">
          <div>
            <p className="eyebrow mb-3">Operating backbone</p>
            <h2 className="h2">
              Operating backbone for under-structured work
            </h2>
          </div>
          <div>
            <p className="lead">
              Across client, civic, cultural, and public-facing projects, I
              build the practices that help teams stay oriented: planning
              systems, decision logs, action trackers, source maps, onboarding
              materials, stakeholder updates, public guidance, runbooks, and
              handoff documentation.
            </p>
            <div className="mt-6">
              <ButtonLink href="/work/technical-operations" variant="secondary">
                View Technical Operations proof
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="section rule-top bg-base-200/60">
        <div className="container">
          <p className="eyebrow mb-3">Roles this work supports</p>
          <TagList tags={roleTags} tone="warm" />
        </div>
      </section>
      <section className="section rule-top">
        <div className="container copy">
          <h2 className="h2">
            Looking for someone who can bring structure, documentation, and
            implementation discipline to ambiguous work?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink download href={site.resumePath}>
              Download résumé
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              Email Jamie
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              View selected work
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
