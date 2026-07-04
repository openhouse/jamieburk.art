import type { WorkStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: WorkStatus }) {
  return <span className="badge border-[var(--color-line)] bg-[var(--color-warm-note)] text-[var(--color-ink)]">{status}</span>;
}
