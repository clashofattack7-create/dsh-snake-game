// Headless verification for dsh-client-ui-snake-game.
// Spawns a separate headless Edge (diagnostic-only; never touches the user's
// browser), drives it over CDP, and prints a PASS/FAIL report.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const APP = "http://127.0.0.1:3080/";
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let proc = null;
const exitCode = (code) => { try { if (proc) proc.kill(); } catch {} process.exit(code); };

if (!fs.existsSync(EDGE)) { console.log("EDGE MISSING:", EDGE); process.exit(2); }
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "snk-edge-"));
proc = spawn(EDGE, [
  "--headless=new",
  "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + profile,
  "--no-first-run", "--no-default-browser-check", "--disable-gpu",
  "--window-size=1280,900",
  "about:blank"
], { stdio: "ignore" });

let version;
for (let i = 0; i < 60; i++) {
  try { version = await (await fetch("http://127.0.0.1:" + PORT + "/json/version")).json(); break; } catch {}
  await sleep(500);
}
if (!version) { console.log("FAIL: CDP did not come up"); exitCode(2); }
console.log("CDP up:", version.Browser);

let target;
for (let i = 0; i < 20; i++) {
  try {
    const r = await fetch("http://127.0.0.1:" + PORT + "/json/new?" + encodeURIComponent(APP), { method: "PUT" });
    target = await r.json();
    break;
  } catch {}
  await sleep(300);
}
if (!target) { console.log("FAIL: could not create page target"); exitCode(2); }
console.log("target:", target.url);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let nextId = 1; const pending = new Map(); const events = [];
ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.id !== undefined && pending.has(data.id)) {
    const p = pending.get(data.id); pending.delete(data.id);
    data.error ? p.reject(new Error(JSON.stringify(data.error))) : p.resolve(data.result);
  } else if (data.method) events.push(data);
};
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++; pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) return "EVAL-ERR: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 400);
  return r.result?.value;
};

await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable"); await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });
await send("Page.navigate", { url: APP });

const q = (sel) => "document.querySelector(" + JSON.stringify(sel) + ")";

let checks = {};
for (let i = 0; i < 40; i++) {
  await sleep(500);
  const expr = "(() => JSON.stringify({" +
    "booted: !!window.__DSH_BOOT__," +
    "snakeInGraph: !!(window.__DSH_BOOT__ && window.__DSH_BOOT__.entries && window.__DSH_BOOT__.entries.some(e => e.id === 'dsh-client-ui-snake-game'))," +
    "snkBtn: !!" + q(".snk-fbtn") + "," +
    "snkBtnText: (" + q(".snk-fbtn") + "?.textContent || '').trim()" +
  "}))()";
  const raw = await evaluate(expr);
  try { checks = JSON.parse(raw); } catch {}
  if (checks && checks.snkBtn) break;
}
console.log("BOOT CHECKS:", JSON.stringify(checks));
const report = { boot: checks, steps: [] };
const step = (name, ok, detail) => { report.steps.push({ name, ok, detail: detail || "" }); console.log((ok ? "PASS " : "FAIL ") + name + (detail ? " :: " + detail : "")); };

step("boot graph contains snake plugin", !!checks.snakeInGraph);
step("sidebar Snake button rendered", !!checks.snkBtn, checks.snkBtnText);

await evaluate(q(".snk-fbtn") + ".click()");
await sleep(600);
const openExpr = "(() => JSON.stringify({" +
  "backdrop: !!" + q(".snk-backdrop") + "," +
  "modal: !!" + q(".snk-modal") + "," +
  "canvas: !!" + q(".snk-canvas") + "," +
  "msg: (" + q(".snk-msg-main") + "?.textContent || null)," +
  "score: (" + q(".snk-score") + "?.textContent?.trim() || null)" +
  "}))()";
const openCheck = JSON.parse(await evaluate(openExpr));
console.log("OPEN CHECKS:", JSON.stringify(openCheck));
step("overlay opens (backdrop+modal+canvas)", !!(openCheck.backdrop && openCheck.modal && openCheck.canvas));
step("ready message shown", openCheck.msg === "Snake", String(openCheck.msg));

const key = (k) => "window.dispatchEvent(new KeyboardEvent('keydown', { key: " + JSON.stringify(k) + ", bubbles: true, cancelable: true }))";
await evaluate(key("ArrowRight"));
await sleep(250);
const playing = await evaluate("!" + q(".snk-msg"));
step("ArrowRight starts the game (message hides)", playing === true);

const snap1 = await evaluate(q(".snk-canvas") + ".toDataURL()");
await sleep(650);
const snap2 = await evaluate(q(".snk-canvas") + ".toDataURL()");
step("canvas animates (snake moves)", snap1 !== snap2, snap1.length + " vs " + snap2.length + " bytes");

await sleep(2400);
const overMsg = await evaluate("(" + q(".snk-msg-main") + "?.textContent || null)");
step("wall collision ends the game", overMsg === "Game over", String(overMsg));

await evaluate(key("r"));
await sleep(200);
const readyMsg = await evaluate("(" + q(".snk-msg-main") + "?.textContent || null)");
step("R restarts (back to ready)", readyMsg === "Snake", String(readyMsg));

await evaluate(q(".snk-footer .snk-primary") + ".click()");
await sleep(200);
const again = await evaluate("!" + q(".snk-msg"));
step("Play again starts a run", again === true);

await evaluate(key(" "));
await sleep(150);
const pausedMsg = await evaluate("(" + q(".snk-msg-main") + "?.textContent || null)");
step("Space pauses (Paused shown)", pausedMsg === "Paused", String(pausedMsg));

await evaluate(key(" "));
await sleep(150);
await evaluate(key("ArrowUp"));
await sleep(700);
const msgAfter = await evaluate("(" + q(".snk-msg-main") + "?.textContent || null)");
step("resume + ArrowUp keeps run alive", msgAfter === null, String(msgAfter));

await evaluate(key("Escape"));
await sleep(300);
const closed = await evaluate("!" + q(".snk-backdrop"));
step("Escape closes the overlay", closed === true);

await evaluate(q(".snk-fbtn") + ".click()");
await sleep(400);
const reopened = await evaluate("!!" + q(".snk-backdrop"));
step("reopen works (state preserved)", reopened === true);
await evaluate(q(".snk-modal .snk-icon") + ".click()");
await sleep(300);
const closed2 = await evaluate("!" + q(".snk-backdrop"));
step("close button closes", closed2 === true);

await evaluate(q(".snk-fbtn") + ".click()");
await sleep(500);
await evaluate(key("ArrowDown"));
await sleep(800);
const shot = await send("Page.captureScreenshot", { format: "png" });
if (shot && shot.data) {
  fs.writeFileSync(path.join(import.meta.dirname, "verify-shot.png"), Buffer.from(shot.data, "base64"));
  console.log("saved verify-shot.png");
}
await evaluate(key("Escape"));

const errs = events.filter(e =>
  (e.method === "Runtime.exceptionThrown") ||
  (e.method === "Log.entryAdded" && e.params.entry.level === "error") ||
  (e.method === "Runtime.consoleAPICalled" && e.params.type === "error")
).map(e => {
  if (e.method === "Runtime.exceptionThrown") return "EXC: " + (e.params.exceptionDetails.exception?.description || e.params.exceptionDetails.text || "").slice(0, 300);
  if (e.method === "Log.entryAdded") return "LOG: " + (e.params.entry.text || "").slice(0, 300);
  return "CONSOLE: " + (e.params.args || []).map(a => a.value ?? a.description ?? "").join(" ").slice(0, 300);
});
const snkErrs = errs.filter(e => /snake|snk|dsh-client-ui-snake/i.test(e));
step("no snake-related page errors", snkErrs.length === 0, snkErrs.join(" | "));
if (errs.length) console.log("ALL ERRORS (context):", JSON.stringify(errs.slice(0, 12), null, 1));

const failed = report.steps.filter(s => !s.ok);
console.log(failed.length === 0 ? "ALL CHECKS PASSED (" + report.steps.length + ")" : failed.length + " FAILURES");
exitCode(failed.length === 0 ? 0 : 1);
