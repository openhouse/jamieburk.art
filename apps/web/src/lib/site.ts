export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamieburk.art",
  description:
    "Jamie Burkart creates operating structure for complex public-facing teams: requirements, workflows, documentation, launch support, onboarding, and durable handoffs.",
  location: "Brooklyn, NY",
  email: "contact@jamieburk.art"
} as const;

export const currentFocus = [
  "Technical operations",
  "Product operations",
  "Implementation",
  "Civic and public-interest technology",
  "Documentation",
  "Source-backed knowledge systems",
  "Public-facing tools"
];
