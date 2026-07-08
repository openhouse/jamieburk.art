import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

const publicStatusLabel: Record<WorkStatus, string> = {
  "Full case study": "Case study",
  "Short proof page": "Brief case",
  "Lab / research": "Lab note",
  "Archived prototype": "Archived prototype",
  "Public-safe summary only": "Bounded summary",
  Draft: "In progress"
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  const visibilityLabel = visibility === "summary-only" ? "Summary" : null;

  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold">
      {status ? (
        <span className="rounded-full bg-jb-green px-3 py-1 text-jb-paper">
          {publicStatusLabel[status]}
        </span>
      ) : null}
      {visibilityLabel ? (
        <span className="rounded-full border border-jb-blue/35 bg-jb-paper px-3 py-1 text-jb-blue">
          {visibilityLabel}
        </span>
      ) : null}
    </div>
  );
}
