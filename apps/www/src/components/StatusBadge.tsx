import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase">
      {status ? (
        <span className="rounded bg-jb-green px-3 py-1 text-jb-paper">{status}</span>
      ) : null}
      {visibility ? (
        <span className="rounded border border-jb-blue/35 bg-jb-paper px-3 py-1 text-jb-blue">
          {visibility}
        </span>
      ) : null}
    </div>
  );
}
