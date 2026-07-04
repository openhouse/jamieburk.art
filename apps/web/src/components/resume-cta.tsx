import { CTAButton } from "./cta-button";

export function ResumeCTA() {
  return (
    <div className="rounded border border-base-300 bg-base-200 p-5">
      <h2 className="text-2xl font-black">Resume</h2>
      <p className="mt-3 text-sm leading-6 text-base-content/75">
        Download the current public resume PDF for the Technical Project Manager - Product Operations
        & Implementation frame.
      </p>
      <div className="mt-5">
        <CTAButton href="/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf">
          Download PDF
        </CTAButton>
      </div>
    </div>
  );
}
