import type { ResolvedCitationPage } from "@/lib/knowledge-bank/resolve-page-citations";

export type CiteProps = {
  note: string;
  occurrence: string;
};

export type CitationPageProps = {
  page: ResolvedCitationPage;
};
