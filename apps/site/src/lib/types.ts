export type WorkStatus =
  | "Full case study"
  | "Short proof page"
  | "Lab / research"
  | "Archived prototype"
  | "Public-safe summary only"
  | "Draft";

export type Visibility = "public" | "public-safe" | "redacted" | "summary-only" | "private";

export type ArtifactType =
  | "website"
  | "workflow"
  | "analytics summary"
  | "public-safe screenshot"
  | "source map"
  | "decision record"
  | "onboarding notes"
  | "runbook"
  | "diagram"
  | "public guidance"
  | "campaign memory"
  | "prototype";

export type PublicSafety = {
  note: string;
};

export type KnownOpenProtected = {
  known: string;
  open: string;
  protected: string;
};

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
  visibility: Visibility;
  systemType: string;
  whatWasUnclear: string;
  whatBecameUsable: string;
  artifactTypes: ArtifactType[];
  tags: string[];
  capabilities: string[];
  publicSafety: PublicSafety;
  sourceLayer: string;
  knownOpenProtected: KnownOpenProtected;
  outcome: string;
};

export type WorkEntry = WorkMeta & {
  body: string;
};
