import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move public
          work from uncertainty to launch: requirements, planning cycles, risk
          surfacing, decision records, onboarding materials, handoffs, and
          operating documentation people actually use.
        </p>
      </div>
      <div className="mt-10 divide-y divide-jb-ink/12 border-y border-jb-ink/12">
        {technicalOperationsProofRows.map((row) => (
          <section
            className="grid gap-5 py-7 lg:grid-cols-[0.34fr_0.66fr]"
            key={row.capability}
          >
            <div>
              <h2 className="text-2xl font-semibold text-jb-ink">{row.capability}</h2>
              <p className="mt-3 text-sm leading-6 text-jb-ink/74">{row.toward}</p>
            </div>
            <ul className="grid gap-3 text-jb-ink/78 md:grid-cols-2">
              {row.proofs.map((proof) => (
                <li className="flex gap-3" key={proof.id}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jb-ochre"
                  />
                  <span>{proof.shortWording ?? proof.publicWording}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
