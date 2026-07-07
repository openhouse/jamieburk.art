import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const highlights = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Led Harry J. Epstein web, e-commerce, marketing, analytics, and operations improvements contributing to 2x revenue growth",
  "Built and stewarded 30+ pages of Commercial Rent Stabilization campaign-memory and coordination infrastructure",
  "Co-built WOWList, adopted by DIY arts and music organizers across roughly 35 city ecosystems",
  "Documented 300+ gatherings and supported 20+ resident artists through Sunday Dinner / 196 systems"
];

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I build the operating backbone teams need to stay focused,
            unblocked, documented, and shipping, turning ambiguous work into
            requirements, workflows, documentation, decision trails, launch
            support, onboarding materials, and durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-4 text-sm text-jb-ink/62">
            Current public resume PDF with selectable text. Last updated June
            11, 2026.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {highlights.map((highlight) => (
              <li className="flex gap-3" key={highlight}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
