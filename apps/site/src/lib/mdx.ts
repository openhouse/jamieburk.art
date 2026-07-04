import type { MdxBlock, MdxSection } from "@/lib/types";

export function parseMdxSections(body: string): MdxSection[] {
  const sections: MdxSection[] = [];
  let current: MdxSection | null = null;
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (current && paragraph.length) {
      current.blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (current && list.length) {
      current.blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  const ensureCurrent = () => {
    if (!current) {
      current = { title: "Overview", blocks: [] };
      sections.push(current);
    }
    return current;
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      current = { title: line.replace(/^##\s+/, ""), blocks: [] };
      sections.push(current);
      continue;
    }

    ensureCurrent();

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^-\s+/, ""));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return sections.filter((section) => section.blocks.length > 0);
}

export function renderBlockKey(section: MdxSection, block: MdxBlock, index: number) {
  return `${section.title}-${block.type}-${index}`;
}
