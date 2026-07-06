const required = {
  APP_ENV: "production",
  SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "index"
};

const failures = Object.entries(required)
  .filter(([key, expected]) => process.env[key] !== expected)
  .map(([key, expected]) => {
    const actual = process.env[key] ?? "(missing)";
    return `${key} expected ${expected}, received ${actual}`;
  });

if (failures.length > 0) {
  console.error("Production config check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Production config check passed.");
