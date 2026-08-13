import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ResumeCTA() {
  return (
    <section className="border border-jb-blue/25 bg-jb-blue p-6 text-jb-paper">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <p className="mt-3 leading-7 text-jb-paper/90">
        Senior product leadership, technical delivery, civic technology,
        implementation, documentation, and public-facing systems.
      </p>
      <div className="mt-5">
        <JBButton href={site.resumePath} variant="inverse" download>
          Download resume PDF
        </JBButton>
      </div>
    </section>
  );
}
