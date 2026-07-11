import { visit } from "unist-util-visit";
import {
  buildCitationNote,
  loadKnowledgeBank,
  publicSourcesForClaim,
  requirePublicClaim
} from "./knowledge-bank-runtime.mjs";

const { claimsById, sourcesById } = loadKnowledgeBank();

function noteChildren(claim) {
  const note = buildCitationNote(claim, sourcesById);
  const children = [{ type: "text", value: note.text }];

  if (note.links.length) {
    children.push({ type: "text", value: " " });
    note.links.forEach((link, index) => {
      if (index) children.push({ type: "text", value: " · " });
      children.push({
        type: "link",
        url: link.href,
        title: null,
        children: [{ type: "text", value: link.label }]
      });
    });
    children.push({ type: "text", value: "." });
  }

  if (note.qualifications.length) {
    children.push({ type: "text", value: ` ${note.qualifications.join(" ")}` });
  }

  return [{ type: "paragraph", children }];
}

export default function remarkKnowledgeBankCitations() {
  return (tree, file) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || typeof index !== "number" || !node.value.includes("[^")) return;
      const pattern = /\[\^([a-z0-9-]+)\]/g;
      const replacement = [];
      let cursor = 0;
      let match;

      while ((match = pattern.exec(node.value))) {
        if (parent.type === "heading") {
          file.fail(`Do not place citations in headings: ${match[1]}`, node);
        }
        if (match.index > cursor) replacement.push({ type: "text", value: node.value.slice(cursor, match.index) });
        replacement.push({ type: "footnoteReference", identifier: match[1], label: match[1] });
        cursor = match.index + match[0].length;
      }

      if (!replacement.length) return;
      if (cursor < node.value.length) replacement.push({ type: "text", value: node.value.slice(cursor) });
      parent.children.splice(index, 1, ...replacement);
      return index + replacement.length;
    });

    const manualDefinitions = new Set();
    visit(tree, "footnoteDefinition", (node) => manualDefinitions.add(node.identifier));

    const citedIds = [];
    visit(tree, "footnoteReference", (node) => {
      const id = node.identifier;
      if (manualDefinitions.has(id)) {
        file.fail(`Do not hand-author a definition for knowledge-bank citation: ${id}`, node);
      }

      const claim = requirePublicClaim(claimsById, id);
      const sources = publicSourcesForClaim(claim, sourcesById);
      if (!sources.length) file.fail(`Citation has no public evidence: ${id}`, node);

      for (const evidence of claim.evidence) {
        if (!sourcesById.has(evidence.sourceId)) {
          file.fail(`Citation ${id} references unknown source: ${evidence.sourceId}`, node);
        }
      }

      if (!citedIds.includes(id)) citedIds.push(id);
      node.data = {
        ...node.data,
        hProperties: {
          ...(node.data?.hProperties ?? {}),
          "data-knowledge-claim": id
        }
      };
    });

    for (const id of citedIds) {
      const claim = claimsById.get(id);
      tree.children.push({
        type: "footnoteDefinition",
        identifier: id,
        label: id,
        children: noteChildren(claim),
        data: { generatedBy: "knowledge-bank" }
      });
    }
  };
}
