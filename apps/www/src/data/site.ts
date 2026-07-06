import { IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

const readEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const externalLabel = (href: string) => {
  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");
  } catch {
    return href;
  }
};

const contactEmail = readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const linkedInHref = readEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const githubHref = readEnv(process.env.NEXT_PUBLIC_GITHUB_URL);

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  isProduction: IS_PRODUCTION,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contactEmail,
  emailLabel: contactEmail ?? "Public email pending confirmation",
  emailHref: contactEmail ? `mailto:${contactEmail}` : "/contact",
  linkedInHref,
  linkedInLabel: linkedInHref ? externalLabel(linkedInHref) : undefined,
  githubHref,
  githubLabel: githubHref ? externalLabel(githubHref) : undefined,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
