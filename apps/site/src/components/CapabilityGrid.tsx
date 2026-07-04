import { capabilities } from "@/data/capabilities";

export function CapabilityGrid() {
  return (
    <div className="capability-grid">
      {capabilities.map((capability) => (
        <article key={capability.title} className="capability-item">
          <h3>{capability.title}</h3>
          <p>{capability.description}</p>
          <ul>
            {capability.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
