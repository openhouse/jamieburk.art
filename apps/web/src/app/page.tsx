import { CapabilityGrid } from "@/components/capability-grid";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ProofStrip } from "@/components/proof-strip";
import { Section } from "@/components/section";
import { capabilities, methodSteps, proofPoints, unclearToUsable } from "@/data/capabilities";
import { getFeaturedWork } from "@/lib/content";
import { currentFocus } from "@/lib/site";

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <Hero />
      <Section
        eyebrow="Current focus"
        title="Operating structure for public-facing work"
        intro="I am focused on technical operations, product operations, implementation, civic/public-interest technology, documentation, source-backed knowledge systems, and public-facing tools."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <p className="prose-measure text-lg leading-8 text-base-content/75">
            I am especially interested in teams that need clearer requirements, decision records,
            onboarding context, launch support, public-safe documentation, and durable handoffs.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {currentFocus.map((focus) => (
              <li className="rounded border border-base-300 bg-base-200 px-4 py-3 text-sm font-bold" key={focus}>
                {focus}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section title="Proof strip">
        <ProofStrip points={proofPoints} />
      </Section>
      <Section
        eyebrow="Selected systems"
        title="Selected systems"
        intro="A small public-safe surface for the work most relevant to referrals, hiring conversations, and implementation roles."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredWork.map((entry) => (
            <ProjectCard entry={entry} key={entry.slug} />
          ))}
        </div>
      </Section>
      <Section title="What was unclear -> what became usable">
        <div className="grid gap-3">
          {unclearToUsable.map((line) => {
            const [unclear, usable] = line.split(" -> ");
            return (
              <div className="grid gap-3 rounded border border-base-300 bg-base-200 p-4 md:grid-cols-[1fr_auto_1fr] md:items-center" key={line}>
                <p className="font-bold">{unclear}</p>
                <span aria-hidden="true" className="hidden text-primary md:block">
                  {"->"}
                </span>
                <p className="font-bold text-primary">{usable}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Capabilities">
        <CapabilityGrid capabilities={capabilities} />
      </Section>
      <Section
        title="Clarify -> Structure -> Build -> Document -> Transfer"
        intro="I usually enter when the work is important but under-structured. I listen across stakeholders, map what is known and unknown, create the workflows or documentation the team needs, support launch or adoption, and leave behind materials that make the work easier to maintain."
      >
        <ol className="grid gap-3 md:grid-cols-5">
          {methodSteps.map((step, index) => (
            <li className="rounded border border-base-300 bg-base-200 p-5" key={step}>
              <span className="text-sm font-black text-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-xl font-black">{step}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
