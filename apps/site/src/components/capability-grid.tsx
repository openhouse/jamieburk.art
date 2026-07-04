import { capabilities } from "@/data/capabilities";

export function CapabilityGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability) => (
        <article className="rounded-lg border quiet-rule bg-base-100 p-5" key={capability.title}>
          <h3 className="text-lg font-bold leading-tight">{capability.title}</h3>
          <p className="mt-3 text-sm leading-6 text-base-content/70">{capability.summary}</p>
        </article>
      ))}
    </div>
  );
}
