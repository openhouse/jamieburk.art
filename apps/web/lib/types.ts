import type {
  PrivacyLevel,
  WorkStatus
} from "@jamie-burkart/content-schema";

export type WorkGroup =
  | "Business / operations"
  | "Civic / public-facing systems"
  | "Community / cultural infrastructure"
  | "Knowledge systems / AI lab";

export type KnownOpenProtected = {
  known: string[];
  open: string[];
  protected: string[];
};

export type WorkItem = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  dates: string;
  format: string;
  status: WorkStatus;
  featured: boolean;
  priority: number;
  privacyLevel: PrivacyLevel;
  underlyingSystem: string;
  group: WorkGroup;
  tags: string[];
  skills: string[];
  proof: string[];
  unclear: string;
  usable: string;
  body: {
    context: string;
    did: string[];
    artifacts: string[];
    tools: string[];
    outcomes: string[];
    proves: string;
  };
  knownOpenProtected: KnownOpenProtected;
  caveat: string;
  links?: { label: string; url: string }[];
};
