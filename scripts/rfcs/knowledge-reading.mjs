// RFC 0017 reference prototype. Synthetic packets only; no provider IO or writes.
const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
const text = value => typeof value === "string" && value.trim().length > 0;
const list = value => Array.isArray(value) ? value : [];

export function reviewReturn(packet, inventory) {
  const reasons = new Set();
  const fail = reason => reasons.add(reason);
  const p = object(packet) ? packet : {};
  if (p.schema_version !== 1) fail("schema-version");
  if (p.visibility !== "synthetic") fail("synthetic-only");
  if (!text(p.title)) fail("title");
  if (p.publication_authorized !== false || p.adoption_claimed !== false) fail("authority");
  if (!object(inventory) || !/^[a-f0-9]{40}$/.test(inventory.revision ?? "") || !Array.isArray(inventory.disagreements)) fail("prior-inventory");
  const refs = new Map();
  if (!Array.isArray(p.references) || !p.references.length) fail("reference-shape");
  for (const ref of list(p.references)) {
    if (!object(ref)) { fail("reference-shape"); continue; }
    if (!text(ref.id) || refs.has(ref.id)) fail("reference-id");
    if (typeof ref.revision !== "string" || !/^[a-f0-9]{40}$/.test(ref.revision)) fail("reference-edition");
    if (![ref.repository, ref.path, ref.semantic_id, ref.scope, ref.assertion].every(text)) fail("reference-identity");
    if (!/^example\/[a-z0-9-]+$/.test(ref.repository ?? "")) fail("synthetic-reference");
    if (!text(ref.path) || ref.path.startsWith("/") || ref.path.includes(":") || ref.path.includes("\\") || ref.path.split("/").some(part => !part || part === "." || part === "..")) fail("reference-path");
    refs.set(ref.id, ref);
  }
  const reading = object(p.reading) ? p.reading : {};
  if (!object(p.reading)) fail("reading-shape");
  if (!["authored-interpretation", "automated-scaffold"].includes(reading.kind)) fail("reading-kind");
  if (![reading.before, reading.after, reading.uncertainty].every(text)) fail("reading-content");
  if (reading.kind === "authored-interpretation" && !text(reading.interpretation)) fail("reading-content");
  if (!Array.isArray(reading.source_ids) || !reading.source_ids.length || reading.source_ids.some(id => !refs.has(id))) fail("reading-source");
  if (!object(reading.context) || !["previous", "turn", "next", "addressee"].every(key => text(reading.context[key]))) fail("dialogue-context");
  if (!Array.isArray(reading.scaffolds) || !reading.scaffolds.every(text)) fail("scaffold-shape");
  if (reading.human_reviewed !== false) fail(reading.kind === "automated-scaffold" ? "scaffold-promotion" : "human-review-outside-prototype");

  const disputeIds = new Set();
  if (!Array.isArray(p.disagreements)) fail("disagreement-shape");
  for (const dispute of list(p.disagreements)) {
    if (!object(dispute)) { fail("disagreement-shape"); continue; }
    if (!text(dispute.id) || disputeIds.has(dispute.id)) fail("disagreement-id");
    disputeIds.add(dispute.id);
    const alternatives = list(dispute.alternatives);
    if (alternatives.length < 2 || !alternatives.every(text) || new Set(alternatives).size !== alternatives.length) fail("disagreement-alternatives");
    if (!["unresolved", "resolved"].includes(dispute.disposition)) fail("disagreement-disposition");
    if (dispute.disposition === "unresolved" && dispute.resolution !== null) fail("resolution-evidence");
    if (dispute.disposition === "resolved") {
      const resolution = dispute.resolution;
      if (!object(resolution) || !refs.has(resolution.reference) || !text(resolution.reason)) fail("resolution-evidence");
      else {
        const ref = refs.get(resolution.reference);
        if (ref.scope !== dispute.id || ref.assertion !== resolution.alternative || !alternatives.includes(resolution.alternative)) fail("resolution-scope");
      }
    }
  }
  for (const prior of list(inventory?.disagreements)) {
    if (!object(prior) || !text(prior.id) || !Array.isArray(prior.alternatives) || prior.alternatives.length < 2 || !prior.alternatives.every(text)) { fail("prior-inventory"); continue; }
    const retained = list(p.disagreements).find(item => item?.id === prior.id);
    if (!retained) fail("disagreement-omitted");
    else if (prior.alternatives.some(alternative => !list(retained.alternatives).includes(alternative))) fail("disagreement-rewritten");
  }
  const transition = p.transition;
  if (transition !== null) {
    if (!object(transition) || ![transition.scope, transition.from, transition.to].every(text)) fail("transition-shape");
    else {
      const evidence = refs.get(transition.evidence);
      if (!evidence || evidence.scope !== transition.scope || evidence.assertion !== transition.to) fail("transition-evidence");
    }
  }
  if (!Array.isArray(p.drafts) || p.drafts.some(draft => !object(draft) || ![draft.id, draft.scope, draft.target_state].every(text))) fail("draft-shape");
  if (!["reference", "waiting-for", "next-action", "held", "closed"].includes(p.disposition)) fail("disposition");
  if (p.disposition === "reference" && p.action !== null) fail("reference-action");
  if (p.disposition === "next-action" && !text(p.action)) fail("next-action");
  const feedback = p.feedback;
  if (feedback !== null) {
    if (!object(feedback) || ![feedback.id, feedback.text].every(text)) fail("feedback-shape");
    else {
      if (!["open", "incorporated", "declined"].includes(feedback.state)) fail("feedback-state");
      if (feedback.state === "incorporated" && (!text(feedback.next_version) || !text(feedback.response))) fail("feedback-return");
      if (feedback.state === "declined" && !text(feedback.response)) fail("feedback-return");
      if (feedback.state === "open" && (feedback.next_version !== null || feedback.response !== null)) fail("feedback-return");
    }
  }
  if (reasons.size) return { decision: "hold", reasons: [...reasons].sort(), card: null };
  const card = {
    title: p.title,
    change: { before: reading.before, after: reading.after },
    interpretation: reading.kind === "authored-interpretation" ? { text: reading.interpretation, status: "unreviewed-candidate" } : null,
    evidence: reading.source_ids.map(id => {
      const ref = refs.get(id);
      return { id, repository: ref.repository, revision: ref.revision, path: ref.path, semantic_id: ref.semantic_id };
    }),
    uncertainty: reading.uncertainty,
    disposition: { state: p.disposition, action: p.action },
    context: reading.context,
    disagreements: p.disagreements,
    feedback,
    retired_drafts: p.drafts.filter(draft => transition && draft.scope === transition.scope && draft.target_state === transition.to).map(draft => draft.id),
    scaffolds: { expanded: false, status: "automated-scaffold", observations: reading.scaffolds }
  };
  return { decision: "review-candidate", reasons: [], card: structuredClone(card) };
}
