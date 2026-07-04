const capabilities = [
  {
    title: "Clarify ambiguous work",
    copy:
      "Requirements, workflows, stakeholder needs, source material, open questions, and decision paths."
  },
  {
    title: "Build usable systems",
    copy:
      "Public-facing tools, documentation architecture, source maps, knowledge bases, templates, and shared records."
  },
  {
    title: "Coordinate implementation",
    copy:
      "Delivery tracking, launch planning, QA / UAT support, adoption materials, stakeholder updates, and rollout support."
  },
  {
    title: "Leave durable handoffs",
    copy:
      "Runbooks, onboarding guides, decision records, maintenance workflows, and materials teams can keep using."
  }
];

export function CapabilityBand() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow mb-3">What I do</p>
        <div className="grid gap-4 md:grid-cols-4">
          {capabilities.map((capability) => (
            <article className="card p-5" key={capability.title}>
              <h3 className="text-xl font-black leading-tight">
                {capability.title}
              </h3>
              <p className="mt-4 text-sm text-muted">{capability.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
