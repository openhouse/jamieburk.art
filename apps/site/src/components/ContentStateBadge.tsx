import type { ContentState } from "@jamie/content-schema/work";

type ContentStateBadgeProps = {
  state: ContentState;
};

export function ContentStateBadge({ state }: ContentStateBadgeProps) {
  return <span className="badge badge-outline">{state}</span>;
}
