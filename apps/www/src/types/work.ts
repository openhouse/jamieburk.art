export type Visibility =
  | "public"
  | "public-safe"
  | "lab"
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

export type ApprovalStatus =
  | "approved"
  | "needs-review"
  | "staging-only"
  | "do-not-publish";

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
  | "press";

export type KnownOpenProtected = {
  known: string;
  open: string;
  protected: string;
};

export type Artifact = {
  title: string;
  description: string;
  type: ArtifactType;
};

export type WorkMeta = {
  title: string;
  slug: string;
  series: string;
  subtitle: string;
  summary: string;
  result: string;
  role: string;
  years: string;
  status: WorkStatus;
  approval: ApprovalStatus;
  featured: boolean;
  priority: number;
  visibility: Visibility;
  whatWasUnclear: string;
  whatBecameUsable: string;
  towardWhatEnd: string;
  artifactTypes: ArtifactType[];
  artifacts: Artifact[];
  tags: string[];
  capabilities: string[];
  links?: Array<{ label: string; url: string }>;
  careNote?: string;
  sourceLayer?: string;
  credits?: string[];
  publicSafety?: { note: string };
  currentStatus: string;
  group:
    | "Operating systems for teams"
    | "Civic and public-facing systems"
    | "Community and cultural infrastructure"
    | "Source-backed memory / AI lab"
    | "Archived prototypes and older platforms";
  roleFit: string;
  evidence: string[];
  knownOpenProtected: KnownOpenProtected;
};
