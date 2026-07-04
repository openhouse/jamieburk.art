import { ButtonLink } from "@/components/ButtonLink";

const startLinks = [
  { label: "Technical Operations & Implementation", href: "/work/technical-operations" },
  { label: "Harry J. Epstein Company", href: "/work/harry-j-epstein" },
  {
    label: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fairrentnyc-commercial-rent-stabilization"
  },
  { label: "CallNYC.org", href: "/work/callnyc" },
  { label: "Resume", href: "/resume" }
];

export function StartHere() {
  return (
    <section aria-labelledby="start-here" className="section-block start-here">
      <div>
        <p className="eyebrow">Start here</p>
        <h2 id="start-here">New to my work?</h2>
        <p>These pages give the quickest path through the portfolio.</p>
      </div>
      <div className="start-links">
        {startLinks.map((link) => (
          <ButtonLink href={link.href} key={link.href} variant="secondary">
            {link.label}
          </ButtonLink>
        ))}
      </div>
    </section>
  );
}
