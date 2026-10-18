import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { recentDeliveryContracts } from "../apps/www/src/data/knowledge-bank/recent-delivery-2026-10.ts";
import { validateRecentDelivery } from "./lib/recent-delivery.mjs";

const result = validateRecentDelivery({ contracts: recentDeliveryContracts, ...knowledgeBank });
if (!result.pass) {
  for (const error of result.errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Recent-delivery projection checks passed for ${recentDeliveryContracts.length} source-bound text summaries.`);
}
