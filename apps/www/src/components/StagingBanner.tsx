import { site } from "@/data/site";

export function StagingBanner() {
  if (site.env !== "staging") return null;

  return (
    <div className="border-b border-jb-ochre/40 bg-jb-lemon/45 px-4 py-2 text-center text-sm font-semibold text-jb-ink">
      Staging preview - public review surface, not final launch.
    </div>
  );
}
