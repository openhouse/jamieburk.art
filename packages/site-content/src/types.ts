export type Visibility =
  | "public"
  | "public-safe"
  | "redacted"
  | "summary-only"
  | "private";

export type WorkStatus =
  | "Full case study"
  | "Short proof page"
  | "Lab / research"
  | "Archived prototype"
  | "Public-safe summary only"
  | "Draft";

export type ArtifactType =
  | "website"
  | "workflow"
  | "source map"
  | "decision record"
  | "public handout"
  | "meeting memory"
  | "guide"
  | "prototype"
  | "photo sequence"
  | "diagram"
  | "download"
  | "analytics summary"
  | "public-safe screenshot"
  | "template"
  | "script"
  | "map"
  | "press"
  | "platform";

export type WorkGroup =
  | "Business / operations"
  | "Civic / public-facing systems"
  | "Community / cultural infrastructure"
  | "Source-backed memory / lab";

export type WorkMeta = {
  title: string;
  slug: string;
  series: string;
  subtitle: string;
  summary: string;
  role: string;
  years: string;
  status: WorkStatus;
  featured: boolean;
  priority: number;
  group: WorkGroup;
  visibility: Visibility;
  whatWasUnclear: string;
  whatBecameUsable: string;
  systemProduced: string;
  artifactTypes: ArtifactType[];
  tags: string[];
  capabilities: string[];
  links: Array<{ label: string; url: string }>;
  careNote?: string;
  sourceLayer?: string;
  credits: string[];
  known: string[];
  openQuestions: string[];
  protected: string[];
  publicSafety: { note: string };
};

export type WorkItem = WorkMeta & {
  body: string;
  readingMinutes: number;
};
