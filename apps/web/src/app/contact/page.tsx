import type { Metadata } from "next";
import { ContactCTA } from "../../components";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jamie Burkart about technical operations, implementation, documentation, launch support, and source-backed team memory."
};

export default function ContactPage() {
  return (
    <section className="section-band">
      <div className="section-inner grid-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">Aligned work.</h1>
          <p className="lead">
            Jamie is especially interested in teams that need clearer requirements, decision
            records, onboarding context, public-facing tools, launch support, and durable handoffs.
          </p>
          <p>
            Phone is omitted from the public site by default. Add LinkedIn or another contact route
            only after Jamie approves the exact public URL.
          </p>
        </div>
        <ContactCTA />
      </div>
    </section>
  );
}
