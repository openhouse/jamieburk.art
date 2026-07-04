type ProofStripProps = {
  points: string[];
};

export function ProofStrip({ points }: ProofStripProps) {
  return (
    <dl className="grid gap-px overflow-hidden rounded border border-base-300 bg-base-300 md:grid-cols-5">
      {points.map((point) => {
        const [measure, ...labelParts] = point.split(" ");
        return (
          <div className="bg-base-200 p-5" key={point}>
            <dt className="text-2xl font-black text-primary">{measure}</dt>
            <dd className="mt-1 text-sm font-semibold leading-5 text-base-content/75">
              {labelParts.join(" ")}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
