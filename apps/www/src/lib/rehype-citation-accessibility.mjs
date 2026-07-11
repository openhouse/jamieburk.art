import { visit } from "unist-util-visit";
import { buildCitationNote, loadKnowledgeBank } from "./knowledge-bank-runtime.mjs";

const { claimsById, sourcesById } = loadKnowledgeBank();

function textContent(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textContent).join("");
}

function claimIdFromHref(href = "") {
  const marker = "citation-fn-";
  const index = href.indexOf(marker);
  return index === -1 ? undefined : decodeURIComponent(href.slice(index + marker.length));
}

export default function rehypeCitationAccessibility() {
  return (tree) => {
    visit(tree, "element", (node) => {
      const properties = node.properties ?? {};
      const isReference = properties.dataFootnoteRef !== undefined || properties["data-footnote-ref"] !== undefined;
      const isBackReference = properties.dataFootnoteBackref !== undefined || properties["data-footnote-backref"] !== undefined;

      if (node.tagName === "a" && isReference) {
        const id = properties.dataKnowledgeClaim ?? properties["data-knowledge-claim"] ?? claimIdFromHref(String(properties.href ?? ""));
        const claim = claimsById.get(String(id));
        if (!claim) return;
        const number = textContent(node).trim();
        const note = buildCitationNote(claim, sourcesById);
        node.properties = {
          ...properties,
          ariaLabel: `Citation ${number}: ${note.accessibleLabel.replace(/^Citation:\s*/, "")}`,
          dataCitationClaim: claim.id,
          dataCitationNumber: number
        };
      }

      if (node.tagName === "a" && isBackReference) {
        node.properties = { ...properties, dataCitationBacklink: "" };
      }

      if (node.tagName === "li" && String(properties.id ?? "").startsWith("citation-fn-")) {
        node.properties = {
          ...properties,
          dataCitationClaim: String(properties.id).slice("citation-fn-".length)
        };
      }

      const isFootnoteSection = node.tagName === "section" &&
        (properties.dataFootnotes !== undefined || properties["data-footnotes"] !== undefined);
      if (isFootnoteSection) {
        node.properties = { ...properties, ariaLabel: "References", dataCitations: "" };
        const heading = (node.children ?? []).find((child) => child.type === "element" && /^h[1-6]$/.test(child.tagName));
        if (heading) {
          const classes = Array.isArray(heading.properties?.className)
            ? heading.properties.className
            : String(heading.properties?.className ?? "").split(/\s+/);
          heading.properties = {
            ...(heading.properties ?? {}),
            className: classes.filter((className) => className && className !== "sr-only")
          };
          heading.children = [{ type: "text", value: "References" }];
        }
      }
    });
  };
}
