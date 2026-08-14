import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase">
      {status ? (
        <span className="border-l-2 border-jb-green pl-2 text-jb-green">{status}</span>
      ) : null}
      {visibility ? (
        <span className="border-l-2 border-jb-blue pl-2 text-jb-blue">
          {visibility}
        </span>
      ) : null}
    </div>
  );
}
