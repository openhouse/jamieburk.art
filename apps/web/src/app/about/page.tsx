import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  pathname: "/about"
});

export default function AboutPage() {
  return (
    <div className="plain-page">
      <p className="eyebrow">About</p>
      <h1>Jamie Burkart</h1>
      <p>
        I am a technical project manager and implementation lead based in Brooklyn.
      </p>
      <p>
        For 14+ years, I have worked across web systems, e-commerce, civic technology, public-facing guidance, small-business operations, cultural infrastructure, community systems, and source-backed knowledge practices.
      </p>
      <p>
        My work is strongest in under-structured environments: places where the need is real, but the requirements, workflows, documentation, ownership, and handoffs are not yet clear. I help translate that ambiguity into usable systems.
      </p>
      <section className="signature-pair">
        <div>
          <h2>Roles</h2>
          <p>Technical Project Manager / Product Operations / Civic Technologist / Documentation Architect / Systems Steward / Community Infrastructure Builder</p>
        </div>
        <div>
          <h2>Verbs</h2>
          <p>Clarify / Coordinate / Document / Build / Onboard / Transfer / Maintain</p>
        </div>
      </section>
      <p>
        I am interested in the strange, practical work of helping people know what happened, what matters, and what to do next.
      </p>
    </div>
  );
}
