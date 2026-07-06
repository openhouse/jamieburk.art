import { SITE_URL } from "@/lib/site-url";

const cleanValue = (value: string | undefined) => value?.trim() || undefined;

const cleanEmail = (value: string | undefined) => {
  const candidate = cleanValue(value);
  if (!candidate) return undefined;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : undefined;
};

const cleanUrl = (value: string | undefined) => {
  const candidate = cleanValue(value);
  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
};

const contactEmail = cleanEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager who turns under-structured work into usable systems across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  role: "Technical Project Manager - Product Operations & Implementation",
  contact: {
    email: contactEmail,
    emailHref: contactEmail ? `mailto:${contactEmail}` : undefined,
    linkedInUrl: cleanUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    githubUrl: cleanUrl(process.env.NEXT_PUBLIC_GITHUB_URL)
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
