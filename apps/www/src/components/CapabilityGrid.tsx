import { JBCard } from "@/components/JBCard";

const capabilities = [
  {
    title: "Technical project management",
    text: "I turn ambiguous goals into requirements, workflows, status rhythms, risk notes, implementation plans, quality-assurance support, and handoffs."
  },
  {
    title: "Product operations",
    text: "I create planning systems, decision logs, feedback loops, launch support, adoption materials, and operating memory so teams can keep moving."
  },
  {
    title: "Knowledge systems & documentation",
    text: "I build source maps, meeting synthesis, public guidance, resource libraries, templates, and reusable reference systems people can maintain."
  },
  {
    title: "Civic technology & open data",
    text: "I translate civic open data, policy context, and campaign materials into public-facing tools, explainers, and resident or community guidance."
  },
  {
    title: "Web systems & public-facing tools",
    text: "I maintain websites, e-commerce workflows, community platforms, and low-cost public infrastructure that nontechnical collaborators can use."
  },
  {
    title: "Community systems",
    text: "I create onboarding, facilitation, hospitality, artist-support, recurring-gathering, and continuity systems for complex human environments."
  }
];

export function CapabilityGrid() {
  return (
    <section className="jb-frame py-16">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Capabilities
        </p>
        <h2 className="mt-3 text-3xl font-bold text-jb-ink">What becomes usable</h2>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => (
          <JBCard key={capability.title}>
            <h3 className="text-xl font-semibold text-jb-ink">{capability.title}</h3>
            <p className="mt-3 leading-7 text-jb-ink/74">{capability.text}</p>
          </JBCard>
        ))}
      </div>
    </section>
  );
}
