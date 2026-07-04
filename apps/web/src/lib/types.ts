export type WorkGroup =
  | "Business / operations"
  | "Civic / public-facing systems"
  | "Community / cultural infrastructure"
  | "Knowledge systems / AI lab";

export type CaseStudyLevel = "full" | "stub" | "lab";

export type AtAGlanceItem = {
  label: string;
  value: string;
};

export type KnownOpenProtected = {
  known: string[];
  open: string[];
  protected: string[];
};

export type WorkContent = {
  role: string[];
  context: string[];
  did: string[];
  artifacts: string[];
  tools: string[];
  outcomes: string[];
  proves: string[];
  publicSafety?: string;
  caveat?: string;
  sourceLayer?: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  shortTitle: string;
  route: string;
  group: WorkGroup;
  level: CaseStudyLevel;
  summary: string;
  result: string;
  tags: string[];
  role: string;
  years: string;
  format: string;
  status: string;
  primaryProof: string;
  unclear: string;
  becameUsable: string;
  ctaLabel: string;
  glance: AtAGlanceItem[];
  content: WorkContent;
  knownOpenProtected: KnownOpenProtected;
};
