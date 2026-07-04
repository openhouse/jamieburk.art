import type { ContentState } from "@/lib/types";

type StatusBadgeProps = {
  state: ContentState;
};

export function StatusBadge({ state }: StatusBadgeProps) {
  const label = state === "approval required" ? "Approval required" : state;

  return <span className="badge badge-outline rounded-sm capitalize">{label}</span>;
}
