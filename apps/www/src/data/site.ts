import { homeIdentity } from "@/data/home-identity";
import { SITE_URL } from "@/lib/site-url";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "jamie.burkart@gmail.com";
const linkedInUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ??
  "https://linkedin.com/in/jamie-burkart";
const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "https://github.com/openhouse";

export const site = {
  name: homeIdentity.name,
  role: homeIdentity.role,
  url: SITE_URL,
  title: `${homeIdentity.name} - Technical Project Manager | Product Operations & Implementation`,
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
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
