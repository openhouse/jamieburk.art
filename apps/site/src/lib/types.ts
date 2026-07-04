export type Visibility = "public" | "public-safe" | "redacted" | "summary-only" | "private";

export type WorkStatus = "full-case-study" | "short-proof-page" | "lab" | "archived" | "draft";

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

export type WorkMeta = {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  role: string;
  years: string;
  status: WorkStatus;
  featured: boolean;
  priority: number;
  visibility: Visibility;
  whatWasUnclear: string;
  whatBecameUsable: string;
  selectedProof: string;
  artifactTypes: ArtifactType[];
  tags: string[];
  capabilities: string[];
  links?: Array<{ label: string; url: string }>;
  careNote?: string;
  sourceLayer?: string;
  credits?: string[];
  publicSafety?: { note: string };
  knownOpenProtected?: {
    known: string[];
    open: string[];
    protected: string[];
  };
};

export type MdxBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export type MdxSection = {
  title: string;
  blocks: MdxBlock[];
};

export type WorkContent = {
  meta: WorkMeta;
  sections: MdxSection[];
  rawBody: string;
};
