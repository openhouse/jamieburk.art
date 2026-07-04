export function CapabilityGrid() {
  const capabilities = [
    {
      title: "Clarify",
      body: "Turn ambiguous needs, constraints, and stakeholders into a shared working shape."
    },
    {
      title: "Structure",
      body: "Create workflows, requirements, decision trails, and operating rhythms people can use."
    },
    {
      title: "Build",
      body: "Ship public-facing sites, guides, prototypes, documentation systems, and launch support."
    },
    {
      title: "Document",
      body: "Keep the source layer inspectable, corrected, and useful after the meeting ends."
    },
    {
      title: "Transfer",
      body: "Leave handoffs, onboarding paths, and public-safe summaries that future readers can trust."
    }
  ];

  return (
    <div className="proof-grid">
      {capabilities.map((capability) => (
        <article className="system-card p-5" key={capability.title}>
          <h3 className="text-xl font-semibold text-jamie-ink">{capability.title}</h3>
          <p className="mt-3 leading-7 text-jamie-muted">{capability.body}</p>
        </article>
      ))}
    </div>
  );
}
