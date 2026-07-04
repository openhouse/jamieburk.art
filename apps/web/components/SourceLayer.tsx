type SourceLayerProps = {
  proof: string[];
};

export function SourceLayer({ proof }: SourceLayerProps) {
  return (
    <section className="rounded-md border border-primary/25 bg-primary/8 p-5">
      <h2 className="text-xl font-black">Primary proof</h2>
      <ul className="mt-4 grid gap-3 text-sm text-base-content md:grid-cols-3">
        {proof.map((item) => (
          <li className="rounded-md bg-base-100 p-4 font-bold" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
