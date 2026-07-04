export type ContentState =
  | 'Full case study'
  | 'Short proof page'
  | 'Lab note'
  | 'Archived prototype'
  | 'Public-safe summary'
  | 'Draft / private';

export type Visibility = 'public' | 'public-safe' | 'redacted' | 'summary-only' | 'private';

export type WorkMeta = {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  role: string;
  years: string;
  contentState: ContentState;
  visibility: Visibility;
  featured: boolean;
  priority: number;
  tags: string[];
  capabilities: string[];
  proof: string[];
  whatWasUnclear: string;
  whatBecameUsable: string;
  underlyingSystem?: string;
  links?: Array<{ label: string; url: string }>;
  publicSafety?: { note: string };
  knownOpenProtected?: {
    known: string[];
    open: string[];
    protected: string[];
  };
};

export type WorkEntry = WorkMeta & {
  body: string;
};

export type NavItem = {
  label: string;
  href: string;
};

