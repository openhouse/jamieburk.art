type ProofStripProps = {
  items: readonly string[];
};

export function ProofStrip({ items }: ProofStripProps) {
  return (
    <section className="proof-strip" aria-label="Proof points">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </section>
  );
}
