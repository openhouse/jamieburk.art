import { capabilities } from "@/data/capabilities";

export function CapabilityBand() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((capability) => (
        <article
          className="rounded-md border border-base-300 bg-base-100 p-5"
          key={capability.title}
        >
          <h3 className="text-lg font-bold">{capability.title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral">
            {capability.body}
          </p>
        </article>
      ))}
    </div>
  );
}
