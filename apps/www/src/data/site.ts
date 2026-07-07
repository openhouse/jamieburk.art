import { SITE_URL } from "@/lib/site-url";

type ContactIntent = {
  label: string;
  description: string;
};

type ApprovedContactLink = {
  label: string;
  value: string;
  href: string;
};

const contactIntents: ContactIntent[] = [
  {
    label: "W2 roles",
    description:
      "Technical operations, product operations, implementation, and public-sector delivery coordination."
  },
  {
    label: "Warm referrals",
    description:
      "Context from people who can point hiring teams toward the right proof page or resume detail."
  },
  {
    label: "Consulting",
    description:
      "Documentation systems, operating memory, source-backed handoffs, and implementation support."
  },
  {
    label: "Collaboration",
    description:
      "Civic, cultural, small-business, and public-facing systems that need careful structure."
  }
];

const approvedContactLinks: ApprovedContactLink[] = [];

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager turning emerging work into usable systems for complex public-facing teams.",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY",
  contactIntents,
  approvedContactLinks
} as const;
