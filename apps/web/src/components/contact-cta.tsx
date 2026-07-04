import { site } from "@/lib/site";
import { CTAButton } from "./cta-button";

export function ContactCTA() {
  return (
    <div className="rounded border border-base-300 bg-base-200 p-5">
      <h2 className="text-2xl font-black">Contact</h2>
      <p className="mt-3 text-sm leading-6 text-base-content/75">
        For roles, referrals, civic/public-interest work, and implementation conversations.
      </p>
      <div className="mt-5">
        <CTAButton href={`mailto:${site.email}`}>Email Jamie</CTAButton>
      </div>
    </div>
  );
}
