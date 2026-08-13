import { SITE_URL } from "@/lib/site-url";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "jamie.burkart@gmail.com";
const linkedInUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ??
  "https://linkedin.com/in/jamie-burkart";
const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "https://github.com/openhouse";

export const site = {
  name: "Jamie Burkart",
  role: "Product and Technical Delivery Leader",
  url: SITE_URL,
  title:
    "Jamie Burkart - Product Leadership for Public-Facing Systems",
  description:
    "Brooklyn-based product and technical delivery leader turning ambiguous public problems into usable services from discovery through launch, measurement, and handoff.",
  emailLabel: contactEmail,
  emailHref: `mailto:${contactEmail}`,
  hasPublicEmail: true,
  linkedinLabel: "linkedin.com/in/jamie-burkart",
  linkedinHref: linkedInUrl,
  githubLabel: "github.com/openhouse",
  githubHref: githubUrl,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
