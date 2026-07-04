import { StatusBadge } from "@/components/StatusBadge";
import { VisibilityBadge } from "@/components/VisibilityBadge";
import type { WorkItem } from "@/lib/types";

type AtAGlanceProps = {
  item: WorkItem;
};

export function AtAGlance({ item }: AtAGlanceProps) {
  return (
    <aside className="at-a-glance">
      <h2>At a glance</h2>
      <dl>
        <div>
          <dt>Role</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{item.year}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <StatusBadge state={item.contentState} />
          </dd>
        </div>
        <div>
          <dt>Visibility</dt>
          <dd>
            <VisibilityBadge visibility={item.visibility} />
          </dd>
        </div>
      </dl>
    </aside>
  );
}
