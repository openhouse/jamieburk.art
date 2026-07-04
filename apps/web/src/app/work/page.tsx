import type { Metadata } from "next";
import { workGroupOrder } from "@jamie/site-content/work";
import { Section } from "@/components/sections";
import { WorkCard } from "@/components/work";
import { getWorkGroups } from "@/lib/work";

export const metadata: Metadata = {
  title: "Selected Systems",
  description:
    "Selected portfolio systems showing technical project management, product operations, implementation, civic technology, documentation, and durable handoffs."
};

export default function WorkPage() {
  const groups = getWorkGroups();

  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">Work</p>
            <h1>Selected systems</h1>
            <p className="lead">
              These case studies show a recurring pattern: under-structured situations becoming
              usable systems, public-facing tools, documentation, decision trails, and durable
              handoffs.
            </p>
          </div>
        </div>
      </section>

      {workGroupOrder.map((group) => {
        const items = groups[group] ?? [];
        if (items.length === 0) {
          return null;
        }

        return (
          <Section key={group} title={group}>
            <div className="grid grid-2">
              {items.map((work) => (
                <WorkCard key={work.slug} work={work} />
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
