const proofItems = [
  "Long-running operating-structure work",
  "Contributed to 2x revenue growth for a legacy e-commerce business",
  "Shared civic campaign-memory infrastructure",
  "WOWList.org reached roughly 35 city ecosystems",
  "Hosted gathering systems and resident-artist support"
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
