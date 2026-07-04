const capabilities = [
  {
    title: "Clarify ambiguous work",
    body:
      "Requirements, workflows, stakeholder needs, source material, open questions, and decision paths."
  },
  {
    title: "Build usable systems",
    body:
      "Public-facing tools, documentation architecture, source maps, knowledge bases, templates, and shared records."
  },
  {
    title: "Coordinate implementation",
    body:
      "Delivery tracking, launch planning, QA / UAT support, adoption materials, stakeholder updates, and rollout support."
  },
  {
    title: "Leave durable handoffs",
    body:
      "Runbooks, onboarding guides, decision records, maintenance workflows, and materials teams can keep using."
  }
];

export function CapabilityGrid() {
  return (
    <section aria-labelledby="what-i-do" className="section-block">
      <p className="eyebrow">What I do</p>
      <h2 id="what-i-do">Operating structure for ambiguous work</h2>
      <div className="capability-grid">
        {capabilities.map((capability) => (
          <article className="capability-card" key={capability.title}>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
