import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ title, action, children }: SectionProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

export function ProofStrip({
  items
}: {
  items: Array<{ value: string; label: string }>;
}) {
  return (
    <div aria-label="Selected proof points" className="proof-strip">
      {items.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CapabilityGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-3">
      {items.map((item, index) => (
        <div className="card" key={item}>
          <span className="status">0{index + 1}</span>
          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
}

export function SystemDiagram() {
  const nodes = [
    "Ambiguous inputs",
    "Shared requirements",
    "Decision trails",
    "Launch support",
    "Durable handoff"
  ];

  return (
    <aside aria-label="Operating structure diagram" className="diagram">
      <div className="diagram-grid">
        {nodes.map((node) => (
          <div className="diagram-node" key={node}>
            {node}
          </div>
        ))}
      </div>
    </aside>
  );
}
