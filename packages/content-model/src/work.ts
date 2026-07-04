export const contentStates = [
  "Full case study",
  "Short proof page",
  "Lab note",
  "Archived prototype",
  "Public-safe summary",
  "Draft / private"
] as const;

export const practiceBodies = [
  "Business / operations",
  "Civic and public-facing systems",
  "Community and cultural infrastructure",
  "Knowledge systems / AI lab",
  "Archived prototypes and older platforms"
] as const;

export type ContentState = (typeof contentStates)[number];
export type PracticeBody = (typeof practiceBodies)[number];

export type WorkMeta = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  dates: string;
  format?: string;
  contentState: ContentState;
  practiceBody: PracticeBody;
  featured: boolean;
  priority: number;
  privacyLevel: "public" | "public-safe" | "redacted" | "archived" | "lab" | "private";
  underlyingSystem?: string;
  tags: string[];
  skills: string[];
  proof?: string[];
  unclear?: string;
  usable?: string;
  links?: { label: string; url: string }[];
  caveat?: string;
  heroImage?: string;
  lastUpdated?: string;
};
