type Capability = {
  title: string;
  body: string;
};

type CapabilityGridProps = {
  capabilities: Capability[];
};

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability) => (
        <article className="rounded border border-base-300 bg-base-200 p-5" key={capability.title}>
          <h3 className="text-lg font-black">{capability.title}</h3>
          <p className="mt-3 text-sm leading-6 text-base-content/75">{capability.body}</p>
        </article>
      ))}
    </div>
  );
}
