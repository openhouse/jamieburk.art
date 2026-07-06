import { IS_PRODUCTION } from "@/lib/site-url";

export function EnvironmentBanner() {
  if (IS_PRODUCTION) return null;

  return (
    <div className="border-b border-jb-ochre/45 bg-jb-lemon/55 px-4 py-2 text-center text-sm font-semibold text-jb-ink">
      Staging preview - not final publication.
    </div>
  );
}
