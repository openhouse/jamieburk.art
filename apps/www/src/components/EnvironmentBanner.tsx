import { IS_PRODUCTION } from "@/lib/site-url";

export function EnvironmentBanner() {
  if (IS_PRODUCTION) {
    return null;
  }

  return (
    <div className="border-b border-jb-blue/20 bg-jb-blue text-jb-paper">
      <div className="jb-frame flex min-h-9 flex-wrap items-center justify-between gap-2 py-2 text-sm font-semibold">
        <span className="font-display">Staging review - not indexed</span>
        <span className="text-jb-paper/82">Public approvals pending</span>
      </div>
    </div>
  );
}
