import type { ComponentType } from "react";

export type ContentState = "strong stub" | "public-safe summary" | "approval required";
export type Visibility = "public" | "hidden";

export type SourceTrailItem = {
  label: string;
  detail: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  contentState: ContentState;
  visibility: Visibility;
  summary: string;
  whatWasUnclear: string;
  whatBecameUsable: string;
  domains: string[];
  tags: string[];
  metrics: string[];
  sourceTrail: SourceTrailItem[];
  relatedSlugs: string[];
  featured?: boolean;
};

export type WorkModule = {
  default: ComponentType;
  metadata: WorkItem;
};

export type Capability = {
  title: string;
  description: string;
  examples: string[];
};

export type ProofMetric = {
  value: string;
  label: string;
  note: string;
};
