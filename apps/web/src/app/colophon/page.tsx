import type { Metadata } from "next";
import { ColophonSection, SwatchStrip } from "../../components";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "Stack, accessibility, privacy, color, typography, and source-fidelity notes for jamieburk.art."
};

const stack = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "MDX",
  "Tailwind CSS",
  "daisyUI",
  "Node 26",
  "Dockerfile deployment",
  "Dokku",
  "DigitalOcean"
];

export default function ColophonPage() {
  return (
    <section className="section-band">
      <div className="section-inner">
        <p className="eyebrow">Colophon</p>
        <h1 className="page-title">How this is built.</h1>
        <p className="lead">
          A public operating document with a calm civic notebook underneath it: stack, accessibility,
          privacy, color, type, and source-fidelity rules in one place.
        </p>

        <div className="grid-2" style={{ marginTop: "2rem" }}>
          <ColophonSection title="Stack">
            <ul>
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ColophonSection>

          <ColophonSection title="Accessibility">
            <ul>
              <li>Semantic HTML and one H1 per page.</li>
              <li>Skip link, keyboard navigation, and visible focus states.</li>
              <li>WCAG AA-oriented contrast and reduced-motion support.</li>
              <li>Meaningful images require alt text; decorative images stay empty.</li>
            </ul>
          </ColophonSection>

          <ColophonSection title="Privacy">
            <ul>
              <li>No private coalition notes, private email, or stakeholder lists.</li>
              <li>No private guest, residency, health, or financial details.</li>
              <li>No unapproved photos, quotes, proprietary fonts, or credentials.</li>
              <li>Known/Open/Protected panels separate public facts from unresolved and private context.</li>
            </ul>
          </ColophonSection>

          <ColophonSection title="Typography policy">
            <ul>
              <li>Karla is the primary open web-font direction when loaded.</li>
              <li>Trade Gothic Bold, Verlag Black, and Gotham Rounded are references unless licensed.</li>
              <li>Maria&apos;s handwriting font is not distributed publicly without explicit consent.</li>
            </ul>
          </ColophonSection>
        </div>

        <div className="section-band">
          <ColophonSection title="Oil-pastel palette">
            <p>
              The site uses paper, ink, Broadway blue, and restrained oil-pastel accents as its
              native visual operating system.
            </p>
            <SwatchStrip />
          </ColophonSection>
        </div>

        <div className="section-band">
          <ColophonSection title="Golden-ratio guides">
            <p>
              Layout decisions use guide constants at 0%, 19.0983005625%, 38.196601125%,
              50%, 61.803398875%, 80.9016994375%, and 100%. Production pages use the structure
              without showing the guides unless a design-system demo needs them.
            </p>
          </ColophonSection>
        </div>
      </div>
    </section>
  );
}
