import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ResumeCTA({ compact = false }: { compact?: boolean } = {}) {
  if (compact) {
    return (
      <section className="border-y border-jb-ink/20 py-7">
        <p className="jb-section-label">Resume</p>
        <p className="mt-3 leading-7 text-jb-ink/74">
          Technical project management, product operations, and implementation.
        </p>
        <div className="mt-5">
          <JBButton href={site.resumePath} variant="secondary" download>
            Download resume PDF
          </JBButton>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-jb-blue/25 bg-jb-blue p-6 text-jb-paper">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <p className="mt-3 leading-7 text-jb-paper/90">
        Technical project management, product operations, implementation,
        documentation systems, civic technology, and public-facing tools.
      </p>
      <div className="mt-5">
        <JBButton href={site.resumePath} variant="secondary" download>
          Download resume PDF
        </JBButton>
      </div>
    </section>
  );
}
