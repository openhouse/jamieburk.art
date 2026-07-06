import { SITE_URL } from "@/lib/site-url";

const optionalPublicValue = (value: string | undefined) => value?.trim() || null;

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contact: {
    email: optionalPublicValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    linkedInUrl: optionalPublicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    githubUrl: optionalPublicValue(process.env.NEXT_PUBLIC_GITHUB_URL)
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
