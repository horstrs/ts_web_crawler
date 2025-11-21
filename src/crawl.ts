export function normalizeURL(urlToNormalize: string): string {
  const url = new URL(urlToNormalize);
  const pathname = url.pathname.at(-1) !== "/" ? url.pathname : url.pathname.slice(0, -1)
  const normalizedUrl = url.host + pathname + url.search;
  return normalizedUrl;
}