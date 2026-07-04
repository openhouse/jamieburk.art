import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getAllWork } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Selected Work",
  description: "Selected public-safe proof pages for Jamie Burkart's technical operations, civic technology, documentation, and implementation work.",
  path: "/work"
});

const groupOrder = [
  "Operating systems for teams",
  "Civic and public-facing systems",
  "Community and cultural infrastructure",
  "Source-backed memory / AI lab",
  "Archived prototypes and older platforms"
];

export default function WorkPage() {
  const work = getAllWork();

  return (
    <Section
      eyebrow="Selected work"
      title="Proof pages and public-safe summaries"
      intro="Each card answers what was unclear, what became usable, what is public, and what is protected."
    >
      <div className="grid gap-10">
        {groupOrder.map((group) => {
          const entries = work.filter((entry) => entry.practiceGroup === group);

          if (!entries.length) {
            return null;
          }

          return (
            <section key={group}>
              <h2 className="border-b border-base-300 pb-3 text-2xl font-black">{group}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                  <ProjectCard entry={entry} key={entry.slug} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
