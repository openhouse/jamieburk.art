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
    <section className="border-y border-jb-ink/12 bg-jb-warm py-16">
      <div className="jb-frame grid gap-10 lg:grid-cols-[0.3fr_0.7fr]">
        <div className="jb-reading">
          <p className="jb-section-label">Capabilities</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            What becomes usable
          </h2>
        </div>
        <ol className="border-t border-jb-ink/16">
          {capabilities.map((capability, index) => (
            <li
              className="grid gap-3 border-b border-jb-ink/16 py-5 sm:grid-cols-[3rem_0.38fr_0.62fr]"
              key={capability.title}
            >
              <span className="font-label text-sm text-jb-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold text-jb-ink">
                {capability.title}
              </h3>
              <p className="leading-7 text-jb-ink/74">{capability.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
