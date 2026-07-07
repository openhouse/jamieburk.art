import { SITE_URL } from "@/lib/site-url";

const readEnv = (value: string | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const publicEmail = readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const linkedInUrl = readEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const githubUrl = readEnv(process.env.NEXT_PUBLIC_GITHUB_URL);

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  role: "Technical Project Manager — Product Operations & Implementation",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager building the operating backbone public-facing teams need to plan, document, decide, onboard, report, and ship.",
  contact: {
    email: publicEmail,
    emailHref: publicEmail ? `mailto:${publicEmail}` : undefined,
    linkedInUrl,
    githubUrl
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
