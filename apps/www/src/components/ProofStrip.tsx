const proofItems = [
  "14+ years creating operating structure",
  "Contributed to a period of 2x revenue growth for a legacy e-commerce business",
  "30+ pages of civic campaign-memory infrastructure",
  "Roughly 35 city ecosystems reached through WOWList.org",
  "300+ gatherings / 20+ resident artists supported"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div
            className="min-h-24 bg-jb-blue px-5 py-5 sm:min-h-28 lg:min-h-32 lg:py-6"
            key={item}
          >
            <p className="font-display text-sm font-semibold leading-6 sm:text-base">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
