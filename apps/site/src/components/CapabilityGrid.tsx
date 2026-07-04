import { capabilities } from "@/data/capabilities";

type CapabilityGridProps = {
  compact?: boolean;
};

export function CapabilityGrid({ compact = false }: CapabilityGridProps) {
  return (
    <div className={compact ? "grid gap-3" : "balanced-grid"}>
      {capabilities.map((capability) => (
        <div className="surface p-5" key={capability.title}>
          <h3 className="font-black">{capability.title}</h3>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[color:var(--color-muted)]">
            {capability.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
