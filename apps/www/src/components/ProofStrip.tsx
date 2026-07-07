const proofItems = [
  "14+ years creating operating structure",
  "Contributed to online and e-commerce growth for a legacy business",
  "Structured shared civic campaign documentation",
  "Co-built community web systems for city-based arts and music communities",
  "Summary-only community continuity work for gatherings and artists"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-28 bg-jb-blue px-5 py-5 lg:min-h-32 lg:py-6" key={item}>
            <p className="font-display text-base font-semibold leading-6">{item}</p>
          </div>
        ))}
      </div>
      <p className="jb-frame py-3 text-xs leading-5 text-jb-paper/76">
        Claims are public-safe summaries. Protected source material, private
        records, and unapproved artifacts are intentionally omitted.
      </p>
    </section>
  );
}
