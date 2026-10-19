// Minimal static server for this folder. Node built-ins only, nothing to install.
//
// This exists because glass.html loads an ES module, and browsers refuse to load
// a module from a file:// path — that is a security restriction and no markup
// change can bypass it. Run `node serve.mjs`, then open the URL it prints.
//
// A convenience for viewing the study locally. Not part of the site; nothing in
// src/ references this folder.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const ROOT_PREFIX = ROOT.endsWith(sep) ? ROOT : ROOT + sep;
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let rel = decodeURIComponent(url.pathname);
  if (rel === "/") rel = "/glass.html";

  // Contain the served path to this folder. A request line still comes from the
  // network, so a raw path is never joined without this check.
  const target = join(ROOT, normalize(rel));
  if (!target.startsWith(ROOT_PREFIX)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const body = await readFile(target);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(target)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Not found: ${rel}`);
  }
}).listen(PORT, () => {
  console.log(`glass study running at http://localhost:${PORT}`);
});