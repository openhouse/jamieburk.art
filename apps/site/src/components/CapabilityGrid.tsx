const capabilities = [
  ["Technical Project Management", "I coordinate work across stakeholders, requirements, implementation plans, risk notes, status updates, and handoffs."],
  ["Product Operations", "I help teams create planning rhythms, decision logs, action trackers, launch support, feedback loops, and adoption materials."],
  ["Implementation", "I turn unclear needs into practical workflows, rollout materials, QA/UAT coordination, and handoffs people can actually use."],
  ["Knowledge Systems & Documentation", "I build documentation architecture, source maps, meeting synthesis, resource libraries, reusable templates, and reference systems."],
  ["Civic Technology & Open Data", "I translate public systems, policy context, and open data into usable public-facing tools, guidance, and workflows."],
  ["Web Systems & Public-Facing Tools", "I build and maintain public-facing sites, tools, campaign hubs, content systems, and low-cost infrastructure."]
];

export function CapabilityGrid() {
  return (
    <section className="site-shell py-16">
      <p className="eyebrow">Capabilities</p>
      <h2 className="mt-2 text-3xl font-semibold">Six ways the work usually shows up.</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(([title, copy]) => (
          <article className="paper-panel p-5" key={title}>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
