import { JBButton } from "@/components/JBButton";

export function ContactCTA() {
  return (
    <section className="rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
      <h2 className="text-2xl font-semibold text-jb-ink">
        Looking for technical project management, product operations,
        implementation, or knowledge-systems support?
      </h2>
      <div className="mt-5 flex flex-wrap gap-3">
        <JBButton href="/work/technical-operations">
          Role-fit proof page
        </JBButton>
        <JBButton href="/resume" variant="secondary">
          Download resume
        </JBButton>
        <JBButton href="/contact" variant="ghost">
          Contact Jamie
        </JBButton>
      </div>
    </section>
  );
}
