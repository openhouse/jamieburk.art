import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Résumé - Jamie Burkart",
  description:
    "Résumé page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const highlights = [
  "Long-running work across civic, cultural, small-business, and technical environments",
  "Legacy e-commerce modernization and operating workflow support",
  "Civic campaign-memory infrastructure and public-safe documentation",
  "Community web systems for arts, music, and local-interest organizers",
  "Repeatable hosting, onboarding, facilitation, and continuity systems"
];

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Résumé</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I build operating structure for ambiguous public-facing technical
            work, turning stakeholder-heavy situations into requirements,
            workflows, documentation, decision trails, launch support,
            onboarding materials, and durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download résumé PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-4 text-sm text-jb-ink/62">
            TODO: Jamie approval required before launch. Replace the placeholder
            PDF with the current approved résumé.
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
