// Pure request composition. No Google API client, private specimen text, IDs,
// image bytes, or write execution belongs in this module. A connector operator
// must copy and inspect the authorized native specimen before using its anchors.
export function letterProjection(markdown) {
  const links = [];
  let removedMarkup = 0;
  const text = markdown.trim().replace(/^#+ /gm, '').replace(/\*\*/g, '')
    .replace(/\n{2,}/g, '\n').replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url, offset) => {
      const startIndex = offset - removedMarkup + 1;
      removedMarkup += match.length - label.length;
      links.push({ label, url, startIndex, endIndex: startIndex + label.length }); return label;
    });
  if (!text.endsWith('Warmly,\nJamie Burkart')) throw new Error('unsupported-letter-closing');
  const prefix = text.slice(0, -'Jamie Burkart'.length);
  for (const link of links) {
    if (link.endIndex > prefix.length + 1 || !/^(https:\/\/|mailto:)/.test(link.url)) throw new Error('unsupported-letter-link');
  }
  return { prefix, suffix: '\nJamie Burkart', links };
}

export function replacementRequests(markdown, { tabId, imageIndex, endIndex }) {
  if (!tabId || !Number.isInteger(imageIndex) || imageIndex < 1 || !Number.isInteger(endIndex) || imageIndex >= endIndex - 1) throw new Error('invalid-signature-anchor');
  const p = letterProjection(markdown);
  const range = (startIndex, endIndex) => ({ tabId, startIndex, endIndex });
  return [
    ...(imageIndex + 1 < endIndex - 1 ? [{ deleteContentRange: { range: range(imageIndex + 1, endIndex - 1) } }] : []),
    ...(imageIndex > 1 ? [{ deleteContentRange: { range: range(1, imageIndex) } }] : []),
    { insertText: { location: { tabId, index: 1 }, text: p.prefix } },
    { insertText: { location: { tabId, index: p.prefix.length + 2 }, text: p.suffix } },
  ];
}

export function styleRequests(markdown, tabId) {
  const p = letterProjection(markdown);
  const endIndex = p.prefix.length + p.suffix.length + 2;
  const range = (startIndex = 1, end = endIndex) => ({ tabId, startIndex, endIndex: end });
  const black = { color: { rgbColor: { red: 17 / 255, green: 17 / 255, blue: 17 / 255 } } };
  const accent = { color: { rgbColor: { red: 69 / 255, green: 142 / 255, blue: 139 / 255 } } };
  const body = { weightedFontFamily: { fontFamily: 'Karla' }, fontSize: { magnitude: 10, unit: 'PT' }, foregroundColor: black, bold: false, italic: false, underline: false, strikethrough: false };
  const requests = [
    { deleteParagraphBullets: { range: range() } },
    { updateParagraphStyle: { range: range(), paragraphStyle: { namedStyleType: 'NORMAL_TEXT', lineSpacing: 105, spaceAbove: { magnitude: 0, unit: 'PT' }, spaceBelow: { magnitude: 8, unit: 'PT' }, indentStart: { magnitude: 0, unit: 'PT' }, indentEnd: { magnitude: 0, unit: 'PT' }, indentFirstLine: { magnitude: 0, unit: 'PT' }, keepWithNext: false, keepLinesTogether: true, pageBreakBefore: false }, fields: 'namedStyleType,lineSpacing,spaceAbove,spaceBelow,indentStart,indentEnd,indentFirstLine,keepWithNext,keepLinesTogether,pageBreakBefore' } },
    { updateTextStyle: { range: range(), textStyle: body, fields: Object.keys(body).concat('link').join(',') } },
  ];
  let index = 1;
  let beforeSalutation = true;
  for (const line of p.prefix.trimEnd().split('\n')) {
    const r = range(index, index + line.length);
    if (line.startsWith('Dear ')) beforeSalutation = false;
    if (beforeSalutation || line === 'Warmly,') requests.push({ updateParagraphStyle: { range: r, paragraphStyle: { spaceBelow: { magnitude: 2, unit: 'PT' }, keepWithNext: true }, fields: 'spaceBelow,keepWithNext' } });
    if (line === 'Jamie Burkart') requests.push({ updateTextStyle: { range: r, textStyle: { weightedFontFamily: { fontFamily: 'Palatino Linotype' }, fontSize: { magnitude: 21, unit: 'PT' } }, fields: 'weightedFontFamily,fontSize' } });
    else if (line.startsWith('Re:')) {
      requests.push({ updateTextStyle: { range: r, textStyle: { weightedFontFamily: { fontFamily: 'Oswald' }, fontSize: { magnitude: 11.5, unit: 'PT' }, foregroundColor: accent }, fields: 'weightedFontFamily,fontSize,foregroundColor' } });
      requests.push({ updateParagraphStyle: { range: r, paragraphStyle: { spaceAbove: { magnitude: 12, unit: 'PT' }, spaceBelow: { magnitude: 8, unit: 'PT' } }, fields: 'spaceAbove,spaceBelow' } });
    } else if (beforeSalutation) requests.push({ updateTextStyle: { range: r, textStyle: { fontSize: { magnitude: 8.5, unit: 'PT' } }, fields: 'fontSize' } });
    index += line.length + 1;
  }
  for (const link of p.links) requests.push({ updateTextStyle: { range: range(link.startIndex, link.endIndex), textStyle: { link: { url: link.url }, foregroundColor: black, underline: false, fontSize: { magnitude: 8.5, unit: 'PT' }, weightedFontFamily: { fontFamily: 'Karla' } }, fields: 'link,foregroundColor,underline,fontSize,weightedFontFamily' } });
  requests.push({ updateParagraphStyle: { range: range(p.prefix.length + 1, p.prefix.length + 2), paragraphStyle: { keepWithNext: true, spaceBelow: { magnitude: 2, unit: 'PT' } }, fields: 'keepWithNext,spaceBelow' } });
  requests.push({ updateTextStyle: { range: range(p.prefix.length + 3), textStyle: { bold: true }, fields: 'bold' } });
  return requests;
}
