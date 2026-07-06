import { IS_PRODUCTION } from "@/lib/site-url";

const clean = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const email = clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const linkedinUrl = clean(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const githubUrl = clean(process.env.NEXT_PUBLIC_GITHUB_URL);

export const contact = {
  email,
  emailHref: email ? `mailto:${email}` : null,
  linkedinUrl,
  githubUrl,
  showMissingTodos: !IS_PRODUCTION,
  approvalRequiredText: "TODO: Jamie approval required before launch.",
  optionalPublicLinkText: "TODO: Jamie approval required if public-ready."
} as const;
