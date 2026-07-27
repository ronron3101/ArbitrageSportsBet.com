import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const origin = 'https://arbitragesportsbet.com';
const siteBase = '';
const files = [];

function walk(dir) {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.html')) files.push(path);
  }
}

walk(root);
const bad = [];

for (const path of files) {
  const html = readFileSync(path, 'utf8');

  // Search-engine ownership verification files have a fixed one-line format.
  if (/\/google[0-9a-f]+\.html$/.test(path)) {
    const name = path.split('/').pop();
    if (html.trim() !== `google-site-verification: ${name}`) {
      bad.push(`${path}: unexpected google verification content`);
    }
    continue;
  }

  // Vendor verification files are intentionally minimal and should not be
  // forced through editorial page checks.
  if (path.endsWith('/affiliate_verification.html')) {
    if (html.trim() !== '<body> verification: "BetBurger" </body>') {
      bad.push(`${path}: unexpected affiliate verification content`);
    }
    continue;
  }

  if (!html.includes('<title>')) bad.push(`${path}: missing title`);
  if (!html.includes('Affiliate disclosure')) bad.push(`${path}: missing affiliate disclosure`);

  // Every editorial page declares its own canonical URL, matching its location
  // on disk. Catches copy-paste pages that inherit another page's canonical.
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) {
    bad.push(`${path}: missing canonical`);
  } else {
    const expected = origin + '/' + path.slice(root.length + 1).replace(/index\.html$/, '');
    if (canonical[1] !== expected) {
      bad.push(`${path}: canonical is ${canonical[1]}, expected ${expected}`);
    }
  }

  // Structured data must be present and parseable; malformed JSON-LD is worse
  // than none, because Google reports it as an error against the page.
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) {
    bad.push(`${path}: missing JSON-LD structured data`);
  } else {
    try {
      const graph = JSON.parse(ld[1])['@graph'];
      if (!Array.isArray(graph) || graph.length === 0) {
        bad.push(`${path}: JSON-LD has no @graph nodes`);
      }
    } catch (error) {
      bad.push(`${path}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"#]+)"/g)) {
    let href = match[1];
    if (href.startsWith(`${siteBase}/`)) href = href.slice(siteBase.length);
    const originalHref = match[1];
    let target = join(root, href);
    const looksLikeFile = /\.[a-z0-9]+$/i.test(href);
    if (!looksLikeFile && !target.endsWith('/')) target += '/';
    const checkPath = looksLikeFile ? target : join(target, 'index.html');
    try {
      statSync(checkPath);
    } catch {
      bad.push(`${path}: broken internal link ${originalHref}`);
    }
  }
}

if (bad.length) {
  console.error(bad.join('\n'));
  process.exit(1);
}

console.log(`Checked ${files.length} HTML files; titles, disclosures, canonicals, JSON-LD and internal links all OK.`);
