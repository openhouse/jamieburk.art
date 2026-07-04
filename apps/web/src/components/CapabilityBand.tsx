type Capability = {
  title: string;
  body: string;
};

type CapabilityBandProps = {
  items: readonly Capability[];
};

export function CapabilityBand({ items }: CapabilityBandProps) {
  return (
    <div className="capability-grid">
      {items.map((item) => (
        <article className="quiet-card" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
