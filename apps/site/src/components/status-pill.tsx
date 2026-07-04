type StatusPillProps = {
  status: string;
};

export function StatusPill({ status }: StatusPillProps) {
  return <span className="badge badge-outline border-primary/40 text-primary">{status}</span>;
}
