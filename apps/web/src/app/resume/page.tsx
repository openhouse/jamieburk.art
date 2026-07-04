import type { Metadata } from "next";
import { ResumeDownload } from "../../components";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Jamie Burkart's public Technical Project Manager resume."
};

export default function ResumePage() {
  return (
    <section className="section-band">
      <div className="section-inner grid-2">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="page-title">Download.</h1>
          <p className="lead">
            Public resume for Technical Project Manager -- Product Operations & Implementation
            roles.
          </p>
          <p>
            The PDF in this scaffold is a safe placeholder and should be replaced with Jamie&apos;s
            approved current resume before launch.
          </p>
        </div>
        <ResumeDownload />
      </div>
    </section>
  );
}
