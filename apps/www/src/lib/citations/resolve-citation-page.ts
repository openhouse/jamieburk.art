import type {
  ClaimRecord,
  PageManifest,
  ResearchRunRecord,
  SourceRecord
} from "@/data/knowledge-bank/schema";
import type { CitationReference, ResolvedCitationPage } from "./types";

type CitationSource = {
  id: string;
  title: string;
  sourceType: string;
  citationLabel: string;
  href?: string;
  publiclyLinkable: boolean;
  publicUseStatus: string;
  guardrail: string;
};

type CitationRegistry = {
  claims: ClaimRecord[];
  researchRuns: ResearchRunRecord[];
  sources: SourceRecord[];
};

function getCitationSource(sourceId: string, registry: CitationRegistry): CitationSource {
  const source = registry.sources.find((item) => item.id === sourceId);
  if (source) {
    return {
      id: source.id,
      title: source.title,
      sourceType: source.sourceType,
      citationLabel: source.citationLabel,
      href: source.archiveUrl ?? source.publicUrl,
      publiclyLinkable: source.publiclyLinkable,
      publicUseStatus: source.publicUseStatus,
      guardrail: source.guardrail
    };
  }

  const researchRun = registry.researchRuns.find((item) => item.id === sourceId);
  if (researchRun) {
    return {
      id: researchRun.id,
      title: researchRun.title,
      sourceType: "research_run",
      citationLabel: researchRun.title,
      publiclyLinkable: false,
      publicUseStatus: researchRun.publicUseStatus,
      guardrail: researchRun.guardrail
    };
  }

  throw new Error(`Unknown citation source: ${sourceId}`);
}

export function resolveCitationPage(
  manifest: PageManifest,
  registry: CitationRegistry
): ResolvedCitationPage {
  const citationsByClaim: Record<string, number[]> = {};
  const references: CitationReference[] = [];
  const referenceKeys = new Map<string, number>();

  for (const claimId of manifest.claimOrder) {
    const claim = registry.claims.find((item) => item.id === claimId);
    if (!claim) throw new Error(`Unknown citation claim: ${claimId}`);
    if (!claim.allowedSurfaces.includes(manifest.surface)) {
      throw new Error(`Claim ${claimId} is not allowed on ${manifest.surface}`);
    }

    const publicSupports = claim.support.filter((support) => support.includeInPublicCitation);
    citationsByClaim[claimId] = [];

    for (const support of publicSupports) {
      const citationSource = getCitationSource(support.sourceId, registry);
      const key = [citationSource.id, support.locator ?? "", support.note].join("::");

      let number = referenceKeys.get(key);
      if (!number) {
        number = references.length + 1;
        referenceKeys.set(key, number);
        references.push({
          number,
          sourceTitle: citationSource.title,
          citationLabel: citationSource.citationLabel,
          sourceType: citationSource.sourceType,
          note: support.note,
          locator: support.locator,
          href: citationSource.publiclyLinkable ? citationSource.href : undefined,
          publiclyLinkable: citationSource.publiclyLinkable,
          publicUseStatus: citationSource.publicUseStatus,
          guardrail: citationSource.guardrail
        });
      }

      citationsByClaim[claimId].push(number);
    }
  }

  return {
    id: manifest.id,
    path: manifest.path,
    title: manifest.title,
    surface: manifest.surface,
    referenceHeading: manifest.referenceHeading,
    publicBoundary: manifest.publicBoundary,
    citationsByClaim,
    references
  };
}
