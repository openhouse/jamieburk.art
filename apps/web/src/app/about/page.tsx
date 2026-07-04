import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactCTA } from "../../components";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jamie Burkart, a technical project manager and implementation lead for public-facing systems."
};

export default function AboutPage() {
  return (
    <section className="section-band">
      <div className="section-inner grid-2">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="page-title">Usable systems.</h1>
          <p className="lead">
            Jamie Burkart is a technical project manager and implementation lead who turns
            ambiguous, stakeholder-heavy work into clear requirements, workflows, documentation,
            decision trails, launch support, onboarding materials, public-facing tools,
            source-backed memory, and durable handoffs.
          </p>
          <p>
            The work is often civic, cultural, small-business, community, or public-facing. The
            through-line is structure: what is known, what remains open, what needs protection, and
            what someone can use next.
          </p>
        </div>
        <div className="artifact-board">
          <div className="artifact-note" style={{ "--note-color": "#0b5f81" } as CSSProperties}>
            <strong>Current state</strong>
            Ambiguous work with too much context trapped in people, meetings, or scattered files.
          </div>
          <div className="artifact-note" style={{ "--note-color": "#568e62" } as CSSProperties}>
            <strong>Desired state</strong>
            A system people can understand, maintain, adopt, and responsibly hand off.
          </div>
          <div className="artifact-note" style={{ "--note-color": "#d04667" } as CSSProperties}>
            <strong>Protected</strong>
            Private notes, unapproved images, personal details, and sensitive stakeholder context.
          </div>
        </div>
        <ContactCTA />
      </div>
    </section>
  );
}
