export function ProofStrip() {
  const items = [
    "Requirements",
    "Workflows",
    "Documentation",
    "Decision trails",
    "Launch support",
    "Durable handoffs"
  ];

  return (
    <section className="border-b hairline bg-base-200/80 py-5">
      <div className="main-field">
        <ul className="flex flex-wrap gap-2" aria-label="Proof areas">
          {items.map((item) => (
            <li
              className="rounded bg-base-100 px-3 py-2 text-sm font-medium text-jamie-ink"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
