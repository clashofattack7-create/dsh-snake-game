/* Snake — browser half. Generated from src/client.js by build.cjs (embeds styles.css.txt). */

window.__ModuleLoader__.load({
	id: "dsh-client-ui-snake-game",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const CSS = "/* ------------------------------------------------------------ launch */\n.snk-fbtn{display:inline-flex;align-items:center;gap:7px;width:100%;height:30px;padding:0 10px;border:none;border-radius:8px;\n  background:transparent;color:var(--dsw-alias-label-secondary,#9a9a9a);cursor:pointer;font-size:12.5px;\n  font-family:var(--dsw-font-family,inherit);text-align:left;white-space:nowrap}\n.snk-fbtn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12));color:var(--dsw-alias-label-primary,inherit)}\n.snk-fbtn.snk-rail{justify-content:center;padding:0;width:30px}\n/* ------------------------------------------------------------ overlay */\n.snk-backdrop{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;padding:18px;\n  background:var(--dsw-alias-bg-mask-1,rgba(0,0,0,.5));\n  backdrop-filter:blur(var(--dsw-mask-blur,2px));-webkit-backdrop-filter:blur(var(--dsw-mask-blur,2px))}\n.snk-modal{display:flex;flex-direction:column;gap:12px;width:min(520px,100%);max-height:min(760px,calc(100vh - 36px));\n  padding:16px;border-radius:16px;box-sizing:border-box;background:var(--dsw-alias-bg-base,#121212);\n  border:1px solid var(--dsw-alias-border-l2,rgba(127,127,127,.28));\n  box-shadow:var(--dsw-shadow-lv3,0 16px 48px rgba(0,0,0,.45));font-family:var(--dsw-font-family,inherit)}\n.snk-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.snk-title{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:650;color:var(--dsw-alias-label-primary,inherit)}\n.snk-score{display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 10px;border-radius:999px;font-size:11.5px;\n  font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary,inherit);\n  border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.16));background:var(--dsw-alias-bg-layer-2,rgba(127,127,127,.05))}\n.snk-score b{color:var(--dsw-alias-label-primary,inherit);font-weight:650;font-size:12.5px}\n.snk-score.snk-best b{color:var(--dsw-alias-state-success-primary,#4ade80)}\n.snk-spacer{flex:1 1 auto}\n.snk-icon{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:none;border-radius:8px;\n  background:transparent;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.8));cursor:pointer}\n.snk-icon:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12));color:var(--dsw-alias-label-primary,inherit)}\n.snk-board{position:relative;width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;\n  border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.18));background:var(--dsw-alias-bg-layer-1,rgba(127,127,127,.06))}\n.snk-canvas{display:block;width:100%;height:100%;touch-action:none;cursor:pointer}\n.snk-msg{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;\n  pointer-events:none;text-align:center;padding:14px;background:rgba(0,0,0,.16)}\n.snk-msg-main{font-size:22px;font-weight:700;letter-spacing:.5px;color:var(--dsw-alias-label-primary,#fff)}\n.snk-msg-sub{font-size:12.5px;color:var(--dsw-alias-label-secondary,rgba(255,255,255,.78))}\n.snk-footer{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.snk-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 13px;border-radius:8px;\n  font-size:12.5px;cursor:pointer;border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.2));background:transparent;\n  color:var(--dsw-alias-label-secondary,inherit);font-family:inherit;transition:background .15s,color .15s,border-color .15s;white-space:nowrap}\n.snk-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12));color:var(--dsw-alias-label-primary,inherit)}\n.snk-btn.snk-primary{background:var(--dsw-alias-brand-primary,#4d6bfe);color:var(--dsw-alias-label-primary-inverted,#fff);border-color:transparent}\n.snk-btn.snk-primary:hover{filter:brightness(1.1)}\n.snk-hint{display:inline-flex;align-items:center;gap:5px;margin-left:auto;font-size:11px;flex-wrap:wrap;\n  color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.75))}\n.snk-hint span{opacity:.9}\n.snk-hint kbd{font-family:var(--dsw-font-markdown-code,ui-monospace,Consolas,monospace);font-size:10px;padding:1px 5px;border-radius:5px;\n  border:1px solid var(--dsw-alias-border-l2,rgba(127,127,127,.25));background:var(--dsw-alias-bg-layer-2,rgba(127,127,127,.06));\n  color:var(--dsw-alias-label-secondary,inherit)}\n";

		const React = require("react");
		const ReactDOM = require("react-dom");
		const P = require("@deepseek-ai/dsh-client-ui-primitives");
		const h = React.createElement;
		const { useEffect, useRef, useState, useSyncExternalStore, useCallback } = React;

		/* ------------------------------------------------------------ constants */
		const COLS = 22, ROWS = 22, CELL = 20; /* logical board 440x440 */
		const BEST_KEY = "dsh.snake.best.v1";

		/* ---------------------------------------------------------- stylesheet */
		const CSS_TAG = "dsh-client-ui-snake-game/snake.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(CSS_TAG) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-client-ui-snake-game";
			tag.dataset.pluginCss = CSS_TAG;
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		/* -------------------------------------------------------- open/close bus */
		const bus = { open: false, listeners: new Set() };
		function subscribeGame(fn) { bus.listeners.add(fn); return function () { bus.listeners.delete(fn); }; }
		function getGameOpen() { return bus.open; }
		function emitBus() { const copy = Array.from(bus.listeners); for (const l of copy) l(); }
		function openGame() { if (!bus.open) { bus.open = true; emitBus(); } }
		function closeGame() { if (bus.open) { bus.open = false; emitBus(); } }

		function readBest() {
			try { const n = Number(window.localStorage.getItem(BEST_KEY)); return Number.isFinite(n) ? n : 0; } catch (e) { return 0; }
		}
		function writeBest(v) {
			try { window.localStorage.setItem(BEST_KEY, String(v)); } catch (e) {}
		}

		/* --------------------------------------------------------------- engine */
		function spawnFoodFrom(snake) {
			const taken = new Set();
			for (const c of snake) taken.add(c.x + "," + c.y);
			const free = [];
			for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!taken.has(x + "," + y)) free.push({ x: x, y: y });
			if (!free.length) return null;
			return free[Math.floor(Math.random() * free.length)];
		}
		function freshState() {
			const cx = Math.floor(COLS / 2) - 1, cy = Math.floor(ROWS / 2);
			const snake = [];
			for (let i = 0; i < 4; i++) snake.push({ x: cx - i, y: cy });
			return {
				snake: snake,
				dir: { x: 1, y: 0 },
				queue: [],
				food: spawnFoodFrom(snake),
				score: 0,
				best: readBest(),
				alive: true,
				win: false,
				tickMs: 150,
				acc: 0
			};
		}
		function enqueueDir(st, d) {
			const last = st.queue.length ? st.queue[st.queue.length - 1] : st.dir;
			if (d.x === -last.x && d.y === -last.y) return;
			if (d.x === last.x && d.y === last.y) return;
			if (st.queue.length >= 2) st.queue.shift();
			st.queue.push(d);
		}
		function applyStep(st) {
			if (!st.alive) return;
			while (st.queue.length) {
				const d = st.queue.shift();
				if (!(d.x === -st.dir.x && d.y === -st.dir.y) && !(d.x === st.dir.x && d.y === st.dir.y)) { st.dir = d; break; }
			}
			const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y };
			if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS) { st.alive = false; return; }
			const eating = st.food !== null && head.x === st.food.x && head.y === st.food.y;
			const body = eating ? st.snake : st.snake.slice(0, st.snake.length - 1);
			for (const c of body) if (c.x === head.x && c.y === head.y) { st.alive = false; return; }
			st.snake.unshift(head);
			if (eating) {
				st.score += 1;
				st.tickMs = Math.max(72, 150 - Math.floor(st.score / 3) * 8);
				st.food = spawnFoodFrom(st.snake);
				if (st.food === null) { st.win = true; st.alive = false; }
			} else {
				st.snake.pop();
			}
		}

		/* ---------------------------------------------------------------- draw */
		function cssVar(name, fb) {
			try {
				const v = getComputedStyle(document.body).getPropertyValue(name).trim();
				return v || fb;
			} catch (e) { return fb; }
		}
		function theme() {
			return {
				board: cssVar("--dsw-alias-bg-layer-1", "rgba(127,127,127,.07)"),
				grid: cssVar("--dsw-alias-border-l1", "rgba(127,127,127,.14)"),
				snake: cssVar("--dsw-alias-state-success-primary", "#2ecc71"),
				head: cssVar("--dsw-alias-state-success-primary", "#2ecc71"),
				food: cssVar("--dsw-alias-state-error-primary", "#ff5f56"),
				eye: cssVar("--dsw-alias-bg-base", "#0c0c0c")
			};
		}
		function rr(ctx, x, y, w, hh, r) {
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y);
			ctx.arcTo(x + w, y, x + w, y + r, r);
			ctx.lineTo(x + w, y + hh - r);
			ctx.arcTo(x + w, y + hh, x + w - r, y + hh, r);
			ctx.lineTo(x + r, y + hh);
			ctx.arcTo(x, y + hh, x, y + hh - r, r);
			ctx.lineTo(x, y + r);
			ctx.arcTo(x, y, x + r, y, r);
			ctx.closePath();
		}
		function draw(ctx, st) {
			const W = COLS * CELL, Hh = ROWS * CELL;
			const c = theme();
			ctx.clearRect(0, 0, W, Hh);
			ctx.fillStyle = c.board;
			ctx.fillRect(0, 0, W, Hh);
			ctx.strokeStyle = c.grid;
			ctx.lineWidth = 1;
			ctx.beginPath();
			for (let i = 1; i < COLS; i++) { const x = i * CELL + 0.5; ctx.moveTo(x, 0); ctx.lineTo(x, Hh); }
			for (let i = 1; i < ROWS; i++) { const y = i * CELL + 0.5; ctx.moveTo(0, y); ctx.lineTo(W, y); }
			ctx.stroke();
			if (st.food) {
				const fx = st.food.x * CELL + CELL / 2, fy = st.food.y * CELL + CELL / 2;
				const r = CELL * 0.3;
				ctx.globalAlpha = 0.26;
				ctx.fillStyle = c.food;
				ctx.beginPath();
				ctx.arc(fx, fy, r * 2.4, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalAlpha = 1;
				ctx.fillStyle = c.food;
				ctx.beginPath();
				ctx.arc(fx, fy, r, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalAlpha = 0.85;
				ctx.fillStyle = "#ffffff";
				ctx.beginPath();
				ctx.arc(fx - r * 0.32, fy - r * 0.34, r * 0.24, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalAlpha = 1;
			}
			const n = st.snake.length;
			for (let i = n - 1; i >= 1; i--) {
				const s = st.snake[i];
				const pad = 2.2;
				ctx.globalAlpha = Math.max(0.5, 1 - i * 0.045);
				ctx.fillStyle = c.snake;
				rr(ctx, s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 6);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
			if (n > 0) {
				const s0 = st.snake[0];
				ctx.fillStyle = c.head;
				rr(ctx, s0.x * CELL + 1.4, s0.y * CELL + 1.4, CELL - 2.8, CELL - 2.8, 8);
				ctx.fill();
				const d = st.dir;
				const px = -d.y, py = d.x;
				const cx = s0.x * CELL + CELL / 2 + d.x * 3.6;
				const cy = s0.y * CELL + CELL / 2 + d.y * 3.6;
				const off = 4.4;
				ctx.fillStyle = c.eye;
				ctx.beginPath();
				ctx.arc(cx + px * off, cy + py * off, 2.2, 0, Math.PI * 2);
				ctx.fill();
				ctx.beginPath();
				ctx.arc(cx - px * off, cy - py * off, 2.2, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		/* ------------------------------------------------------------ component */
		const DIRS = {
			ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
			w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 }
		};

		function SnakeGame() {
			const open = useSyncExternalStore(subscribeGame, getGameOpen);
			const canvasRef = useRef(null);
			const stateRef = useRef(null);
			if (stateRef.current === null) stateRef.current = freshState();
			const [phase, setPhase] = useState("ready");
			const phaseRef = useRef("ready");
			const [score, setScore] = useState(0);
			const scoreRef = useRef(0);
			const [best, setBest] = useState(readBest);
			const touchRef = useRef(null);
			phaseRef.current = phase;
			scoreRef.current = score;

			/* engine loop */
			useEffect(() => {
				if (!open) return;
				let raf = 0;
				let last = performance.now();
				const canvas = canvasRef.current;
				let ctx = null;
				if (canvas) {
					ctx = canvas.getContext("2d");
					if (ctx) {
						const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
						canvas.width = COLS * CELL * dpr;
						canvas.height = ROWS * CELL * dpr;
						ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
					}
				}
				const loop = (now) => {
					const st = stateRef.current;
					const dt = Math.min(now - last, 250);
					last = now;
					if (phaseRef.current === "playing" && st.alive) {
						st.acc += dt;
						let guard = 0;
						while (st.acc >= st.tickMs && guard++ < 6) {
							st.acc -= st.tickMs;
							applyStep(st);
							if (!st.alive || phaseRef.current !== "playing") break;
						}
						if (st.score !== scoreRef.current) {
							scoreRef.current = st.score;
							setScore(st.score);
						}
						if (!st.alive) {
							const b = Math.max(st.best, st.score);
							st.best = b;
							writeBest(b);
							setBest(b);
							setPhase(st.win ? "win" : "over");
						}
					}
					if (ctx) draw(ctx, st);
					raf = requestAnimationFrame(loop);
				};
				raf = requestAnimationFrame(loop);
				return () => cancelAnimationFrame(raf);
			}, [open]);

			/* controls */
			const start = useCallback(() => {
				const st = stateRef.current;
				st.acc = 0;
				setPhase("playing");
			}, []);
			const pauseToggle = useCallback(() => {
				const p = phaseRef.current;
				if (p === "ready") start();
				else if (p === "playing") setPhase("paused");
				else if (p === "paused") setPhase("playing");
			}, [start]);
			const restart = useCallback(() => {
				stateRef.current = freshState();
				scoreRef.current = 0;
				setScore(0);
				setPhase("ready");
			}, []);
			const playAgain = useCallback(() => {
				stateRef.current = freshState();
				scoreRef.current = 0;
				setScore(0);
				setPhase("playing");
			}, []);
			const steer = useCallback((d) => {
				if (phaseRef.current === "ready") { stateRef.current.acc = 0; setPhase("playing"); }
				if (phaseRef.current === "playing") enqueueDir(stateRef.current, d);
			}, []);
			const handleClose = useCallback(() => {
				if (phaseRef.current === "playing") setPhase("paused");
				closeGame();
			}, []);

			useEffect(() => {
				if (!open) return;
				const onKey = (e) => {
					const k = e.key;
					if (k === "Escape") { e.preventDefault(); handleClose(); return; }
					if (k === " " || k === "Spacebar") { e.preventDefault(); pauseToggle(); return; }
					if (k.toLowerCase() === "r") { e.preventDefault(); restart(); return; }
					const d = DIRS[k] || DIRS[k.toLowerCase()];
					if (d) { e.preventDefault(); steer(d); }
				};
				window.addEventListener("keydown", onKey);
				return () => window.removeEventListener("keydown", onKey);
			}, [open, pauseToggle, restart, steer, handleClose]);

			/* auto-pause when the tab is hidden */
			useEffect(() => {
				if (!open) return;
				const onVis = () => {
					if (document.hidden && phaseRef.current === "playing") setPhase("paused");
				};
				document.addEventListener("visibilitychange", onVis);
				return () => document.removeEventListener("visibilitychange", onVis);
			}, [open]);

			if (!open) return null;

			const onTouchStart = (e) => {
				const t = e.changedTouches && e.changedTouches[0];
				if (t) touchRef.current = { x: t.clientX, y: t.clientY };
			};
			const onTouchEnd = (e) => {
				const s = touchRef.current;
				touchRef.current = null;
				const t = e.changedTouches && e.changedTouches[0];
				if (!s || !t) return;
				const dx = t.clientX - s.x, dy = t.clientY - s.y;
				if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
				const d = Math.abs(dx) > Math.abs(dy) ? { x: dx > 0 ? 1 : -1, y: 0 } : { x: 0, y: dy > 0 ? 1 : -1 };
				if (phaseRef.current === "ready") { stateRef.current.acc = 0; setPhase("playing"); }
				if (phaseRef.current === "playing") enqueueDir(stateRef.current, d);
			};

			const over = phase === "over" || phase === "win";
			const primaryAction = over ? playAgain : pauseToggle;
			const primaryLabel = phase === "playing" ? "Pause" : phase === "paused" ? "Resume" : phase === "over" || phase === "win" ? "Play again" : "Start";
			const msgMain = phase === "ready" ? "Snake" : phase === "paused" ? "Paused" : phase === "win" ? "You win! 🎉" : "Game over";
			const msgSub = phase === "ready"
				? "Arrow keys or WASD to move · Space to start"
				: phase === "paused"
					? "Space to resume"
					: phase === "win"
						? "Perfect board — every cell eaten!"
						: "Score " + score + " — press R to try again";

			return ReactDOM.createPortal(
				h("div", { className: "snk-backdrop", onMouseDown: (e) => { if (e.target === e.currentTarget) handleClose(); } },
					h("div", { className: "snk-modal", role: "dialog", "aria-modal": "true", "aria-label": "Snake" },
						h("div", { className: "snk-head" },
							h("div", { className: "snk-title" }, "🐍", h("span", null, "Snake")),
							h("span", { className: "snk-score" }, "Score ", h("b", null, String(score))),
							h("span", { className: "snk-score snk-best" }, "Best ", h("b", null, String(best))),
							h("span", { className: "snk-spacer" }),
							h("button", { type: "button", className: "snk-icon", title: "Close (Esc)", "aria-label": "Close", onClick: handleClose },
								h(P.IconCloseOutline16, { size: 14 }))
						),
						h("div", { className: "snk-board" },
							h("canvas", {
								ref: canvasRef,
								className: "snk-canvas",
								width: COLS * CELL,
								height: ROWS * CELL,
								onTouchStart: onTouchStart,
								onTouchEnd: onTouchEnd
							}),
							phase === "playing" ? null : h("div", { className: "snk-msg" },
								h("div", { className: "snk-msg-main" }, msgMain),
								h("div", { className: "snk-msg-sub" }, msgSub))
						),
						h("div", { className: "snk-footer" },
							h("button", { type: "button", className: "snk-btn snk-primary", onClick: primaryAction }, primaryLabel),
							h("button", { type: "button", className: "snk-btn", onClick: restart }, "Restart"),
							h("span", { className: "snk-hint" },
								h("span", null, "Move"), h("kbd", null, "↑↓←→"), h("kbd", null, "WASD"),
								h("span", null, "Pause"), h("kbd", null, "Space"),
								h("span", null, "Restart"), h("kbd", null, "R"))
						)
					)
				),
				document.body
			);
		}

		/* ------------------------------------------------------- sidebar button */
		function SnakeAction(props) {
			const wide = props.wide !== false;
			return h("button", {
				type: "button",
				className: "snk-fbtn" + (wide ? "" : " snk-rail"),
				title: "Snake game",
				"aria-label": "Snake game",
				onClick: openGame
			},
				h(P.IconPlayOutline16, { size: wide ? 14 : 16 }),
				wide ? h("span", null, "Snake") : null);
		}

		/* ----------------------------------------------------------- plugin body */
		const inject = ["slots"];

		function apply(ctx) {
			ctx.slots.inject("sidebar.footer.action", function () {
				return ctx.slots.register({ name: "sidebar.footer.action", id: "snake-game", order: 3 }, SnakeAction);
			});
			ctx.slots.inject("shell.overlay", function () {
				return ctx.slots.register({ name: "shell.overlay", id: "snake-game", order: 1 }, SnakeGame);
			});
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
