/**
 * Build lib/client.js from src/client.js + styles.css.txt.
 * The browser bundle must be one self-contained file, so the stylesheet is
 * kept readable in styles.css.txt and stamped in by this script.
 *
 *   node build.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const here = __dirname;
const srcPath = path.join(here, "src", "client.js");
const cssPath = path.join(here, "styles.css.txt");
const outPath = path.join(here, "lib", "client.js");

const src = fs.readFileSync(srcPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
if ((src.match(/__SNK_CSS__/g) || []).length !== 1) {
  throw new Error("build: src/client.js must contain __SNK_CSS__ exactly once");
}
const out = src.replace("__SNK_CSS__", JSON.stringify(css));
fs.mkdirSync(path.join(here, "lib"), { recursive: true });
fs.writeFileSync(outPath, out);
console.log("build: wrote lib/client.js (" + out.length + " bytes, css " + css.length + ")");
