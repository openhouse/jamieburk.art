import { claimsById } from "@/data/knowledge-bank";
import { createCitationPlan } from "./knowledge-bank-runtime.mjs";

export function createCitationScope(claimIds: string[]) {
  return createCitationPlan(claimIds, claimsById);
}
