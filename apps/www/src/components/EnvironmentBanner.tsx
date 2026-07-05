import { site } from "@/data/site";

export function EnvironmentBanner() {
  if (site.deployEnv === "production") return null;

  return (
    <div className="border-b border-warning-content/15 bg-warning px-4 py-2 text-center text-sm font-semibold text-warning-content">
      Staging preview - not final publication.
    </div>
  );
}
