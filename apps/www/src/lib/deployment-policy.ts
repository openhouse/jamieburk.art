export const PRODUCTION_SITE_URL = "https://jamieburk.art";

type IndexabilityInput = {
  appEnv: string;
  siteUrl: string;
  robotsPolicy?: string;
};

export function isIndexableDeployment({
  appEnv,
  siteUrl,
  robotsPolicy
}: IndexabilityInput) {
  return (
    appEnv === "production" &&
    siteUrl === PRODUCTION_SITE_URL &&
    robotsPolicy === "index"
  );
}
