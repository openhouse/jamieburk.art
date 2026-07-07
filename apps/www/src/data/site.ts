import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || "https://github.com/openhouse";

function labelForUrl(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager helping teams surface the structure inside emerging work and turn it into usable systems across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contact: {
    email: contactEmail
      ? {
          label: contactEmail,
          href: `mailto:${contactEmail}`
        }
      : undefined,
    linkedIn: linkedInUrl
      ? {
          label: labelForUrl(linkedInUrl),
          href: linkedInUrl
        }
      : undefined,
    github: githubUrl
      ? {
          label: labelForUrl(githubUrl),
          href: githubUrl
        }
      : undefined
  },
  location: "Brooklyn, NY"
} as const;
