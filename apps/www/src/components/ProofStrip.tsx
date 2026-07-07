const proofItems = [
  "14+ years creating operating structure across civic, cultural, small-business, and technical environments",
  "Helped a legacy tool business translate catalog knowledge into e-commerce workflows",
  "Helped build 30+ pages of shared Commercial Rent Stabilization campaign memory",
  "Co-built multi-city community web systems for arts and music organizers",
  "Created repeatable gathering and resident-artist participation infrastructure"
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
