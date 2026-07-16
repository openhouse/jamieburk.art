import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

const publicStatusLabels: Record<WorkStatus, string> = {
  "Full case study": "Case study",
  "Short proof page": "Project brief",
  "Lab / research": "Research lab",
  "Archived prototype": "Archived project",
  "Public-safe summary only": "Project summary",
  Draft: "Draft",
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase">
      {status ? (
        <span className="rounded-full bg-jb-green px-3 py-1 text-jb-paper">
          {publicStatusLabels[status]}
        </span>
      ) : null}
      {visibility ? (
        <span className="rounded-full border border-jb-blue/35 bg-jb-paper px-3 py-1 text-jb-blue">
          {visibility}
        </span>
      ) : null}
    </div>
  );
}
