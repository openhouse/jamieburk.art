export function createAtlasService(compiled) {
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
