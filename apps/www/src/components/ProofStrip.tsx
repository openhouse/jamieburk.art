const proofItems = [
  "Operating structure across public-facing teams",
  "Catalog, search, checkout, and analytics support for legacy e-commerce",
  "Helped build shared civic campaign-memory infrastructure",
  "Organizer publishing and event-discovery workflows",
  "Repeatable hosting and continuity systems"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item}>
            <p className="text-base font-semibold leading-6">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
