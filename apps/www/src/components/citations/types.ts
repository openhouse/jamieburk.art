export type CitationRefProps = {
  id: string;
  pageKey: string;
  citationIds?: readonly string[];
  instance?: string;
};

export type CitationNotesProps = {
  pageKey: string;
  citationIds?: readonly string[];
  heading?: string;
};
