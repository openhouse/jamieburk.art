import { referrerSentence } from "@/data/site";

export function ReferrerBlock() {
  return (
    <aside className="referrer-block">
      <p className="eyebrow">For referrers</p>
      <blockquote>{referrerSentence}</blockquote>
    </aside>
  );
}
