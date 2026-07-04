import type { Visibility } from "@/lib/types";

export function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  return <span className="badge border-[var(--color-line)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">{visibility}</span>;
}
