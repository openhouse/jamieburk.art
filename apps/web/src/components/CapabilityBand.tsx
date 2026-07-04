import { capabilities } from "@/data/capabilities";

export function CapabilityBand() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((item) => (
        <article className="surface p-5" key={item.title}>
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-3 leading-7 text-[color:var(--color-muted)]">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
