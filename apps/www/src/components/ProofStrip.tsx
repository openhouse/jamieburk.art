const proofItems = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Contributed to online growth for a legacy e-commerce business",
  "Helped structure shared civic campaign documentation",
  "Co-built multi-city community web systems",
  "Supported long-running gathering and resident-artist infrastructure"
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
