export type PrivacyLevel =
  | "public"
  | "public-safe"
  | "redacted"
  | "archived"
  | "lab"
  | "private";

export type WorkStatus =
  | "Full case study"
  | "Short proof page"
  | "Archived prototype"
  | "Client work"
  | "Civic campaign infrastructure"
  | "Community platform"
  | "Residency / participation system"
  | "Lab / research"
  | "Public-safe summary only";

export type WorkMeta = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  dates: string;
  format?: string;
  status: WorkStatus;
  featured?: boolean;
  priority?: number;
  privacyLevel: PrivacyLevel;
  underlyingSystem?: string;
  tags: string[];
  skills?: string[];
  links?: { label: string; url: string }[];
  caveat?: string;
  heroImage?: string;
};

export type KnownOpenProtected = {
  known: string[];
  open: string[];
  protected: string[];
};

export type WorkItem = WorkMeta & {
  category: "Business / operations" | "Civic / public-facing systems" | "Community / cultural infrastructure" | "Knowledge systems / AI lab";
  cardResult: string;
  primaryProof: string;
  whatWasUnclear: string;
  whatIDid: string[];
  whatBecameUsable: string;
  selectedArtifacts: string[];
  toolsAndSystems: string[];
  outcomes: string[];
  whatThisProves: string[];
  knownOpenProtected: KnownOpenProtected;
  publicSafetyNote?: string;
  shortPage?: boolean;
};
