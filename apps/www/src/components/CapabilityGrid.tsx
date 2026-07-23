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
    text: "Public-facing tools, data translation, policy explainers, campaign hubs, and resident and community guidance."
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
    <section className="border-y border-jb-ink/15 bg-jb-warm py-16">
      <div className="jb-frame grid gap-10 lg:grid-cols-[0.3fr_0.7fr]">
        <div className="jb-reading">
          <p className="jb-section-index">Capabilities</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            What becomes usable
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/72">
            The form changes with the material. The operating practice remains
            legible across technical, civic, and community work.
          </p>
        </div>
        <ol className="grid gap-x-8 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <li className="jb-editorial-rule py-5" key={capability.title}>
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="jb-meta-label text-xs text-jb-red">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-jb-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-2 leading-7 text-jb-ink/74">
                    {capability.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
