import { site } from "@/lib/site";

export function ResumeDownload() {
  return (
    <div className="paper-panel mt-8 p-6">
      <h2 className="text-2xl font-semibold">Download resume</h2>
      <p className="mt-3 text-[var(--color-muted)]">
        Public-safe resume PDF for technical project management, product operations, and implementation roles. Confirm the final PDF before production launch.
      </p>
      <a className="btn mt-5 bg-[var(--color-accent)] text-white hover:bg-[#08445d]" href={site.resumePath} download>
        Download Jamie Burkart resume
      </a>
    </div>
  );
}
