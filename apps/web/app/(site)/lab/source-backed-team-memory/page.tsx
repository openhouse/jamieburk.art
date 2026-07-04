import type { Metadata } from "next";
import { ArticleBody } from "@/components/ArticleBody";
import { ContactCTA } from "@/components/ContactCTA";
import { getLabPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Source-Backed Team Memory Lab",
  description:
    "Human-reviewed workflows for turning meetings, documents, decisions, open questions, useful ideas, and source materials into inspectable shared records."
};

export default function SourceBackedTeamMemoryPage() {
  const lab = getLabPage("source-backed-team-memory");

  return (
    <>
      <section className="section border-b hairline bg-base-100/80">
        <div className="main-field measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Research / consulting method / early prototype practice
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-jamie-ink">
            Source-Backed Team Memory Lab
          </h1>
          <p className="mt-5 text-xl leading-8 text-jamie-muted">
            Human-reviewed workflows for turning meetings, documents, decisions, open questions,
            useful ideas, and source materials into inspectable shared records.
          </p>
          <p className="mt-5 rounded border border-civic-teal/30 bg-base-200 p-4 font-semibold text-jamie-ink">
            AI drafts. Humans review. The shared record remains inspectable and correctable.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="main-field">
          {lab ? (
            <ArticleBody body={lab.body} />
          ) : (
            <p className="leading-7 text-jamie-muted">Lab content is being prepared.</p>
          )}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
