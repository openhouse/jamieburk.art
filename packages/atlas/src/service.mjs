import { defaultRepoRoot } from "./corpus.mjs";
import {
  loadFeatureEvalKnowledge,
  readFeatureEvalArtifact
} from "./integration.mjs";
import {
  atlasRecordCollections,
  atlasRecordStore,
  findAtlasRecord,
} from "./records.mjs";

export function createAtlasService(
  compiled,
  sourceKnowledge = loadFeatureEvalKnowledge(defaultRepoRoot),
  records = atlasRecordStore.records,
  repoRoot = defaultRepoRoot
) {
  const pages = new Map(compiled.pages.map((page) => [page.id, page]));
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
    queryKnowledge({ text, id, kind, branch } = {}) {
      const needle = text?.toLowerCase();
      return sourceKnowledge.recordVariants.filter((record) =>
        (!id || record.id === id) &&
        (!kind || record.id.startsWith(`${kind}-`)) &&
        (!branch || record.branches.includes(branch)) &&
        (!needle || JSON.stringify(record.fields).toLowerCase().includes(needle))
      );
    },
    sourceLineage(id) {
      return sourceKnowledge.semanticRecords.find((record) => record.id === id) ?? null;
    },
    stakeholders() {
      return compiled.stakeholderCredits;
    },
    sourceStakeholders() {
      return sourceKnowledge.stakeholders;
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
    sourceArtifacts({ branch, kind, path: artifactPath } = {}) {
      return sourceKnowledge.artifacts.filter((artifact) =>
        (!branch || artifact.branch === branch) &&
        (!kind || artifact.kind === kind) &&
        (!artifactPath || artifact.path === artifactPath)
      );
    },
    readSourceArtifact(branch, artifactPath, encoding = null) {
      return readFeatureEvalArtifact({ repoRoot, catalog: sourceKnowledge, branch, artifactPath, encoding });
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
