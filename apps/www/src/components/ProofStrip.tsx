const proofItems = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Contributed to 2x revenue growth while helping a legacy e-commerce business modernize",
  "Structured shared civic campaign memory, source maps, decision records, and follow-up systems",
  "Co-built community web systems used across roughly 35 city scenes/ecosystems",
  "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems"
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
