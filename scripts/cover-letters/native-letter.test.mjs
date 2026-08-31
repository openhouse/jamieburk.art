import assert from 'node:assert/strict';
import test from 'node:test';
import { letterProjection, replacementRequests, styleRequests } from './native-letter.mjs';

const markdown = '# Jamie Burkart\n\nBrooklyn, NY\n[Portfolio](https://example.org/)\n\n**Re: Example, Job ID 123**\n\nDear Hiring Team,\n\nWork with evidence.\n\nWarmly,\n\nJamie Burkart\n';
test('plain projection keeps every authored word and intentional link', () => {
  const p = letterProjection(markdown);
  assert.equal(p.prefix + p.suffix, 'Jamie Burkart\nBrooklyn, NY\nPortfolio\nRe: Example, Job ID 123\nDear Hiring Team,\nWork with evidence.\nWarmly,\n\nJamie Burkart');
  assert.equal(p.links.length, 1);
  assert.equal(p.prefix.slice(p.links[0].startIndex - 1, p.links[0].endIndex - 1), 'Portfolio');
});
test('link range does not accidentally match earlier unlinked text with the same label', () => {
  const p = letterProjection(markdown.replace('[Portfolio]', 'Portfolio: [Portfolio]'));
  assert.equal(p.links[0].startIndex - 1, p.prefix.indexOf('Portfolio: ') + 'Portfolio: '.length);
});
test('native-copy replacement retains the actual inline image and final newline', () => {
  const requests = replacementRequests(markdown, { tabId: 't.0', imageIndex: 100, endIndex: 150 });
  assert.deepEqual(requests[0].deleteContentRange.range, { tabId: 't.0', startIndex: 101, endIndex: 149 });
  assert.deepEqual(requests[1].deleteContentRange.range, { tabId: 't.0', startIndex: 1, endIndex: 100 });
  assert.ok(requests.every(r => !r.insertInlineImage));
  assert.ok(requests.every(r => Object.keys(r).length === 1));
});
test('missing or ambiguous signature anchors fail closed', () => {
  for (const imageIndex of [0, null, 150, 1.5]) assert.throws(() => replacementRequests(markdown, { tabId: 't.0', imageIndex, endIndex: 150 }));
});
test('closing contract rejects missing signoff or typed name', () => {
  assert.throws(() => letterProjection(markdown.replace('Warmly,', '')));
  assert.throws(() => letterProjection(markdown.replace(/Jamie Burkart\n$/, 'Someone Else\n')));
});
test('historical warning remains in the projection', () => {
  assert.match(letterProjection('# Historical benchmark — do not submit\n\n' + markdown).prefix, /^Historical benchmark — do not submit/);
});
test('native styling preserves the house fonts and explicitly restores link appearance', () => {
  const requests = styleRequests(markdown, 't.0');
  const fonts = requests.map(r => r.updateTextStyle?.textStyle.weightedFontFamily?.fontFamily).filter(Boolean);
  assert.deepEqual(new Set(fonts), new Set(['Karla', 'Palatino Linotype', 'Oswald']));
  const link = requests.find(r => r.updateTextStyle?.textStyle.link);
  assert.equal(link.updateTextStyle.textStyle.link.url, 'https://example.org/');
  assert.equal(link.updateTextStyle.textStyle.underline, false);
});
