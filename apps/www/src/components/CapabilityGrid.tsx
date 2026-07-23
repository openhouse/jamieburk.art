const capabilities = [
  {
    title: "Technical project management",
    text: "Requirements, workflows, status rhythms, risk notes, implementation plans, quality assurance, user acceptance testing, and handoffs."
  },
  {
    title: "Product operations",
    text: "Planning systems, decision logs, feedback loops, launch support, adoption materials, and operating memory."
  },
  {
    title: "Knowledge systems & documentation",
    text: "Source maps, meeting synthesis, public guidance, resource libraries, templates, and reusable reference systems."
  },
  {
    title: "Civic technology & open data",
    text: "Public-facing tools, data translation, policy explainers, campaign hubs, and resident/community guidance."
  },
  {
    title: "Web systems & public-facing tools",
    text: "Maintainable websites, e-commerce workflows, community platforms, and low-cost public infrastructure."
  },
  {
    title: "Community systems",
    text: "Onboarding, facilitation, hospitality, artist support, recurring gatherings, and continuity systems."
  }
];

export function CapabilityGrid() {
  return (
    <section className="jb-frame py-16">
      <div className="jb-reading">
        <p className="jb-eyebrow text-jb-blue">Capabilities</p>
        <h2 className="mt-3 text-3xl font-bold text-jb-ink">What becomes usable</h2>
      </div>
      <div className="mt-8 border-y border-jb-ink/18">
        {capabilities.map((capability, index) => (
          <article
            className="grid gap-3 border-b border-jb-ink/12 py-5 last:border-b-0 md:grid-cols-[4rem_0.42fr_0.58fr] md:items-baseline"
            key={capability.title}
          >
            <p aria-hidden="true" className="font-label text-sm text-jb-blue">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-semibold text-jb-ink">{capability.title}</h3>
            <p className="leading-7 text-jb-ink/74">{capability.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
