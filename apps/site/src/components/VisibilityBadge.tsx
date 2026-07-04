import type { Visibility } from "@/lib/types";

type VisibilityBadgeProps = {
  visibility: Visibility;
};

export function VisibilityBadge({ visibility }: VisibilityBadgeProps) {
  return <span className="badge badge-secondary rounded-sm capitalize">{visibility}</span>;
}
