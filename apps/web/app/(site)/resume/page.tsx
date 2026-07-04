import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Web resume for Jamie Burkart, technical project manager focused on product operations, implementation, documentation, and public-facing systems."
};

export default function ResumePage() {
  const sections = [
    {
      title: "Role",
      items: [
        "Technical Project Manager - Product Operations & Implementation",
        "Implementation lead for under-structured public-facing technical work",
        "Documentation, workflow, launch support, onboarding, and handoff systems"
      ]
    },
    {
      title: "Selected proof",
      items: [
        "Harry J. Epstein Company - e-commerce and operations modernization",
        "Fair Rent NYC / NYC Artist Coalition - coalition memory and civic documentation systems",
        "CallNYC.org - archived civic-data prototype for resident-facing guidance"
      ]
    },
    {
      title: "Capabilities",
      items: [
        "Requirements and workflow mapping",
        "Documentation systems and source-backed memory",
        "Public-facing web systems",
        "Launch support and durable handoffs"
      ]
    }
  ];

  return (
    <>
      <section className="section border-b hairline bg-base-100/80">
        <div className="main-field measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Resume
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-jamie-ink">
            Jamie Burkart - Technical Project Manager
          </h1>
          <p className="mt-5 text-lg leading-8 text-jamie-muted">
            Product operations, implementation, documentation, civic technology, web systems, and
            knowledge systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href="/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
            >
              Download PDF
            </a>
            <Link className="btn btn-outline" href="/contact">
              Contact Jamie
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="main-field proof-grid">
          {sections.map((section) => (
            <article className="system-card p-5" key={section.title}>
              <h2 className="text-2xl font-semibold text-jamie-ink">{section.title}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-jamie-muted">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
