const defaultIgnorables = /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0]/g;
const forwardSlashVariants = /[\u2044\u2215\u29F8\uFF0F]/g;
const reverseSlashVariants = /[\u2216\u29F5\uFF3C]/g;
const trackingParameter = /^(?:utm_.+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid)$/i;
const maxDecodePasses = 64;

function normalizeCharacters(value) {
  return value
    .normalize("NFKC")
    .replace(defaultIgnorables, "")
    .replace(forwardSlashVariants, "/")
    .replace(reverseSlashVariants, "\\");
}

export function normalizeSecurityText(value) {
  let normalized = normalizeCharacters(JSON.stringify(value));

  for (let attempt = 0; attempt < maxDecodePasses; attempt += 1) {
    let decoded;
    try {
      decoded = decodeURIComponent(normalized);
    } catch {
      break;
    }
    if (decoded === normalized) break;
    normalized = normalizeCharacters(decoded);
    if (attempt === maxDecodePasses - 1) throw new Error("security normalization exceeded the recursive decode limit");
  }

  return normalized.replaceAll("\\", "/");
}

export function containsPrivatePath(value) {
  try {
    const normalized = normalizeSecurityText(value);
    return /(?:^|["'\s:])(?:~\/|\/+Users\/|\/+Volumes\/|\/+private\/(?:tmp|var)\/|\/+tmp\/|\/+var\/folders\/|[A-Za-z]:\/+Users\/|file:\/+)/i.test(normalized);
  } catch {
    return true;
  }
}

function decodeUrlInput(value) {
  let normalized = String(value).normalize("NFKC").replace(defaultIgnorables, "").trim();
  for (let attempt = 0; attempt < maxDecodePasses; attempt += 1) {
    try {
      return new URL(normalized);
    } catch {
      try {
        const decoded = decodeURIComponent(normalized);
        if (decoded === normalized) break;
        normalized = decoded;
      } catch {
        break;
      }
    }
  }
  return new URL(normalized);
}

export function canonicalizePublicUrl(value, { stripHash = true } = {}) {
  if (!value) return undefined;
  const url = decodeUrlInput(value);
  if (stripHash) url.hash = "";
  url.hostname = url.hostname.toLocaleLowerCase();
  for (const key of [...url.searchParams.keys()]) {
    if (trackingParameter.test(key)) url.searchParams.delete(key);
  }
  url.searchParams.sort();
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}
