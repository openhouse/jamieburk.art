const trimToUndefined = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const contactConfig = {
  email: trimToUndefined(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  linkedInUrl: trimToUndefined(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  githubUrl: trimToUndefined(process.env.NEXT_PUBLIC_GITHUB_URL)
} as const;

export const contactLinks = {
  emailHref: contactConfig.email ? `mailto:${contactConfig.email}` : undefined
} as const;
