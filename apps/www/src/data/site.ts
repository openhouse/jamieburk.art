import { IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();

if (IS_PRODUCTION && !contactEmail) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL is required for production builds.");
}

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Jamie helps teams surface the structure inside emerging work and turn it into usable systems for public-facing teams.",
  contact: {
    email: contactEmail,
    emailHref: contactEmail ? `mailto:${contactEmail}` : undefined,
    linkedinUrl,
    githubUrl
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
