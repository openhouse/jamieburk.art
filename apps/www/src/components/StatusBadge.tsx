import type { Visibility, WorkStatus } from "@/types/work";

type StatusBadgeProps = {
  status?: WorkStatus;
  visibility?: Visibility;
};

export function StatusBadge({ status, visibility }: StatusBadgeProps) {
  const scopeLabel = visibility
    ? {
        public: "Public work",
        "public-safe": "Selected proof",
        redacted: "Redacted proof",
        "summary-only": "Summary proof",
        private: "Private"
      }[visibility]
    : null;

  return (
    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase">
      {status ? (
        <span className="rounded-full bg-jb-green px-3 py-1 text-jb-paper">{status}</span>
      ) : null}
      {scopeLabel ? (
        <span className="rounded-full border border-jb-blue/35 bg-jb-paper px-3 py-1 text-jb-blue">
          {scopeLabel}
        </span>
      ) : null}
    </div>
  );
}
