const proofItems = [
  "14+ years creating operating structure",
  "Contributed to a period of 2x revenue growth for a legacy e-commerce business",
  "30+ pages of civic campaign-memory infrastructure",
  "Roughly 35 city ecosystems reached through WOWList.org",
  "Hosted Sunday Dinner / 300+ documented gatherings"
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
