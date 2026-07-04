import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting conversations, or collaborations.",
  pathname: "/contact"
});

export default function ContactPage() {
  return (
    <div className="plain-page">
      <p className="eyebrow">Contact</p>
      <h1>Contact Jamie</h1>
      <p>
        For roles, referrals, consulting conversations, or collaborations, email Jamie at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <section className="signature-pair">
        <div>
          <h2>Location</h2>
          <p>{site.location}</p>
        </div>
        <div>
          <h2>Links</h2>
          <p><a href={site.linkedin}>LinkedIn</a></p>
          <p><a href={site.github}>GitHub</a></p>
          <p><a href={site.resumePath}>Resume PDF</a></p>
        </div>
      </section>
    </div>
  );
}
