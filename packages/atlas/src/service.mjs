import {
  atlasRecordCollections,
  atlasRecordStore,
  findAtlasRecord,
} from "./records.mjs";

export function createAtlasService(
  compiled,
  records = atlasRecordStore.records
) {
  const pages = new Map(compiled.pages.map((page) => [page.id, page]));
  const sourceDossiers = new Map(compiled.sourceDossiers.map((dossier) => [dossier.id, dossier]));
  return Object.freeze({
    candidateFingerprint: compiled.candidateFingerprint,
    getPage(id) {
      return pages.get(id) ?? null;
    },
    neighbors(id) {
      const page = pages.get(id);
      if (!page) return [];
      return page.relations.map((relation) => ({
        predicate: relation.predicate,
        page: pages.get(relation.target)
      }));
    },
    query({ text, kind, tag, projectKey } = {}) {
      const needle = text?.toLowerCase();
      return [...pages.values()].filter((page) =>
        (!needle || [page.title, page.summary, ...page.aliases, ...page.tags]
          .join(" ").toLowerCase().includes(needle)) &&
        (!kind || page.kind === kind) &&
        (!tag || page.tags.includes(tag)) &&
        (!projectKey || page.canonical?.projectKey === projectKey)
      );
    },
    sourceDossiers() {
      return [...sourceDossiers.values()];
    },
    getSourceDossier(id) {
      return sourceDossiers.get(id) ?? null;
    },
    querySourceDossiers({ text, sourceId, artifactId, claimId } = {}) {
      const needle = text?.toLowerCase();
      return [...sourceDossiers.values()].filter((dossier) =>
        (!sourceId || dossier.source.id === sourceId) &&
        (!artifactId || dossier.artifact.id === artifactId) &&
        (!claimId || dossier.claims.some(({ id }) => id === claimId)) &&
        (!needle || JSON.stringify(dossier).toLowerCase().includes(needle))
      );
    },
    stakeholders() {
      return compiled.stakeholderCredits;
    },
    recordCollections() {
      return [...atlasRecordCollections];
    },
    records(collection) {
      if (!atlasRecordCollections.includes(collection)) throw new Error(`Unknown Atlas record collection ${collection}`);
      return records[collection];
    },
    getRecord(id) {
      return findAtlasRecord(id, { records });
    },
    queryRecords({ text, collection, project } = {}) {
      const needle = text?.toLowerCase();
      const collections = collection ? [collection] : atlasRecordCollections;
      return collections.flatMap((name) => {
        if (!atlasRecordCollections.includes(name)) throw new Error(`Unknown Atlas record collection ${name}`);
        return records[name]
          .filter((record) => (!project || record.project === project || record.projectKey === project))
          .filter((record) => !needle || JSON.stringify(record).toLowerCase().includes(needle))
          .map((record) => ({ collection: name, record }));
      });
    },
    explainProject(projectKey) {
      const page = [...pages.values()].find((candidate) => candidate.canonical?.projectKey === projectKey);
      if (!page) return null;
      return {
        page: { id: page.id, title: page.title, path: page.path },
        authority: page.authority,
        canonical: page.canonical,
        candidateFingerprint: compiled.candidateFingerprint
      };
    }
  });
}
