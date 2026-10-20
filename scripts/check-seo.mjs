// Run against a built local server or production. Only performs public GET requests.
// npm run check:seo -- http://127.0.0.1:3003 https://centex-website-omce.vercel.app
import assert from "node:assert/strict";

const origin = new URL(process.argv[2] || "http://127.0.0.1:3003").origin;
const canonicalOrigin = new URL(process.argv[3] || "https://centex-website-omce.vercel.app").origin;
const decode = value => value.replaceAll("&amp;", "&");
async function read(path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${path}: X-Robots-Tag blocks indexing`);
  return response.text();
}
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(match => {
  const attributes = {};
  for (const attribute of match[0].matchAll(/([\w:-]+)="([^"]*)"/g)) attributes[attribute[1]] = decode(attribute[2]);
  return attributes;
});
const sitemap = await read("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
assert(urls.length > 0, "Sitemap is empty");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const seenTitles = new Set();
const imageUrls = new Set();
for (const url of urls) {
  assert.equal(new URL(url).origin, canonicalOrigin, "Sitemap uses an unexpected host");
  const path = new URL(url).pathname;
  const html = await read(path);
  const links = tags(html, "link").filter(link => link.rel === "canonical");
  assert.equal(links.length, 1, `${path}: expected one canonical`);
  assert.equal(links[0].href, url, `${path}: wrong canonical`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title?.trim(), `${path}: missing title`);
  assert(!seenTitles.has(title), `${path}: duplicate title`);
  seenTitles.add(title);
  const meta = tags(html, "meta");
  assert(meta.some(m => m.name === "description" && m.content?.trim()), `${path}: missing description`);
  assert(!meta.some(m => m.name === "robots" && /noindex/.test(m.content || "")), `${path}: noindex`);
  assert.equal(meta.find(m => m.property === "og:url")?.content, url, `${path}: wrong Open Graph URL`);
  const socialImage = meta.find(m => m.property === "og:image")?.content;
  assert(socialImage, `${path}: missing sharing image`);
  imageUrls.add(socialImage);
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    JSON.parse(script[1]);
  }
  if (path === "/") assert(html.includes('"@type":"InsuranceAgency"'), "Missing agency structured data");
  if (path.startsWith("/insurance/")) assert(html.includes('"@type":"Service"'), `${path}: missing service structured data`);
  console.log(`PASS ${path}`);
}
for (const url of imageUrls) {
  const response = await fetch(new URL(new URL(url).pathname, origin), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `Missing social image: ${url}`);
  assert(response.headers.get("content-type")?.startsWith("image/"), `Not an image: ${url}`);
  await response.arrayBuffer();
}
const quoteHtml = await read("/quote/?coverage=commercial");
assert.equal(tags(quoteHtml, "link").find(link => link.rel === "canonical")?.href, `${canonicalOrigin}/quote/`, "Quote variants should canonicalize to /quote/");
const robots = await read("/robots.txt");
assert(robots.includes(`${canonicalOrigin}/sitemap.xml`), "robots.txt must advertise the canonical sitemap");
assert(!/^Disallow:\s*\/\s*$/m.test(robots), "robots.txt blocks the whole site");
console.log(`SEO checks passed for ${urls.length} pages and ${imageUrls.size} sharing images.`);
