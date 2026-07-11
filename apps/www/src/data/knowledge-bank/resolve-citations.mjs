function duplicateIds(records) {
  const ids = records.map((record) => record.id);
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
}

export function resolveCitationPage(page, registry) {
  const duplicateOccurrences = duplicateIds(page.occurrences);
  if (duplicateOccurrences.length) {
    throw new Error(`Duplicate citation occurrence IDs on ${page.route}: ${duplicateOccurrences.join(", ")}`);
  }

  const numberByNoteId = new Map();
  const occurrences = page.occurrences.map((occurrence) => {
    const note = registry.notesById.get(occurrence.noteId);
    if (!note) throw new Error(`Unknown citation note on ${page.route}: ${occurrence.noteId}`);
    if (note.status !== "ready") {
      throw new Error(`Citation note is not public-ready on ${page.route}: ${note.id}`);
    }

    let number = numberByNoteId.get(note.id);
    if (!number) {
      number = numberByNoteId.size + 1;
      numberByNoteId.set(note.id, number);
    }

    return {
      ...occurrence,
      note,
      number,
      citationId: `cite-${page.slug}-${occurrence.id}`,
      referenceId: `reference-${page.slug}-${number}`
    };
  });

  const references = [...numberByNoteId.entries()].map(([noteId, number]) => {
    const note = registry.notesById.get(noteId);
    const claims = note.claimIds.map((claimId) => {
      const claim = registry.claimsById.get(claimId);
      if (!claim) throw new Error(`Citation note ${note.id} references unknown claim ${claimId}`);
      if (claim.status !== "defensible") {
        throw new Error(`Citation note ${note.id} uses non-public claim ${claimId}`);
      }
      if (!claim.allowedSurfaces.includes(page.route)) {
        throw new Error(`Claim ${claimId} is not allowed on ${page.route}`);
      }
      return claim;
    });

    const evidence = note.evidenceIds.map((evidenceId) => {
      const relationship = registry.evidenceById.get(evidenceId);
      if (!relationship) throw new Error(`Citation note ${note.id} references unknown evidence ${evidenceId}`);
      if (!relationship.publicCitation) {
        throw new Error(`Citation note ${note.id} uses non-public evidence ${evidenceId}`);
      }
      if (!note.claimIds.includes(relationship.claimId)) {
        throw new Error(`Evidence ${evidenceId} does not support a claim in note ${note.id}`);
      }
      return relationship;
    });

    const sources = [];
    const seenSourceIds = new Set();
    for (const relationship of evidence) {
      const source = registry.sourcesById.get(relationship.sourceId);
      if (!source) throw new Error(`Evidence ${relationship.id} references unknown source ${relationship.sourceId}`);
      if (source.visibility !== "public") {
        throw new Error(`Citation note ${note.id} attempts to render non-public source ${source.id}`);
      }
      if (!seenSourceIds.has(source.id)) {
        sources.push(source);
        seenSourceIds.add(source.id);
      }
    }

    return {
      note,
      claims,
      evidence,
      sources,
      number,
      referenceId: `reference-${page.slug}-${number}`,
      backlinks: occurrences
        .filter((occurrence) => occurrence.noteId === noteId)
        .map((occurrence) => ({
          occurrenceId: occurrence.id,
          citationId: occurrence.citationId
        }))
    };
  });

  return {
    ...page,
    occurrences,
    references,
    occurrenceById: new Map(occurrences.map((occurrence) => [occurrence.id, occurrence]))
  };
}

export function assertNoDuplicateDomIds(resolvedPage) {
  const ids = [
    ...resolvedPage.occurrences.map((occurrence) => occurrence.citationId),
    ...resolvedPage.references.map((reference) => reference.referenceId)
  ];
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) throw new Error(`Duplicate citation DOM IDs: ${[...new Set(duplicates)].join(", ")}`);
  return true;
}
