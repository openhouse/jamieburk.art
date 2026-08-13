import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-jb-gray">
      {status ? (
        <span>{status}</span>
      ) : null}
      {status && visibility ? <span aria-hidden="true">/</span> : null}
      {visibility ? <span>{visibility}</span> : null}
    </div>
  );
}
