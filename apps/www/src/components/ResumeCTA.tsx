import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ResumeCTA() {
  return (
    <section className="rounded-lg border border-jb-blue/25 bg-jb-blue p-6 text-jb-paper">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <p className="mt-3 leading-7 text-jb-paper/82">
        Technical project management, product operations, implementation,
        documentation systems, civic technology, and public-facing tools.
      </p>
      <div className="mt-5">
        {site.environment !== "production" ? (
          <JBButton href={site.resumePath} variant="secondary" download>
            Download resume PDF
          </JBButton>
        ) : (
          <JBButton href="/resume" variant="secondary">
            View resume
          </JBButton>
        )}
      </div>
    </section>
  );
}
