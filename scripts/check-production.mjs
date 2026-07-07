import { spawnSync } from "node:child_process";

const required = {
  APP_ENV: "production",
  SITE_ENV: "production",
  NEXT_PUBLIC_DEPLOY_ENV: "production",
  SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "index"
};

const missingOrWrong = [];

for (const [key, value] of Object.entries(required)) {
  if (process.env[key] !== value) {
    missingOrWrong.push(`${key} must be ${value}`);
  }
}

if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
  missingOrWrong.push("NEXT_PUBLIC_CONTACT_EMAIL must be set for production");
}

if (missingOrWrong.length > 0) {
  console.error("Production check failed before build:");
  for (const issue of missingOrWrong) console.error(`- ${issue}`);
  process.exit(1);
}

const commands = [
  ["node", ["scripts/check-public-safety.mjs", "--production"]],
  ["node", ["scripts/check-routes.mjs"]],
  ["npm", ["run", "build", "-w", "@jamie-burkart/www"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("Production check passed.");
