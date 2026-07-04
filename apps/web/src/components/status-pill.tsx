import type { WorkStatus } from "@/lib/types";

type StatusPillProps = {
  status: WorkStatus | string;
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className="badge badge-outline rounded border-primary/35 bg-primary/5 text-xs font-bold text-primary">
      {status}
    </span>
  );
}
