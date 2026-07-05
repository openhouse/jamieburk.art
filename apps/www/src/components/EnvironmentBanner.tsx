export function EnvironmentBanner() {
  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === "production") return null;

  return (
    <div className="bg-warning px-4 py-2 text-center text-sm font-semibold text-warning-content">
      Staging preview - not final publication.
    </div>
  );
}
