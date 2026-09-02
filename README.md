# dsh-client-ui-snake-game

A playable Snake game for the DeepSeek Harness Web UI.

- A **Snake** button lands in the sidebar footer actions (beside Settings/Skills).
- It opens a full-screen overlay with a canvas board: arrow keys / WASD to move,
  Space to pause-resume, R to restart, Esc to close; touch swipes work too.
- Score + best score (localStorage `dsh.snake.best.v1`), speed ramps up as you eat.
- Colors follow the DSH theme tokens (`--dsw-alias-*`), so it matches light/dark.

## Files

- `src/client.js` — browser half source (hand-written, no JSX).
- `styles.css.txt` — the stylesheet, kept readable and stamped into the bundle.
- `build.cjs` — `node build.cjs` emits `lib/client.js` (single self-contained bundle).
- `lib/index.js` — host-side half so the Loader scans the `dsh.client` declaration.

## Install

The package is junctioned into the profile's node_modules:

```powershell
New-Item -ItemType Junction -Path "C:\Users\PC\.dsh\profiles\node_modules\dsh-client-ui-snake-game" -Target "D:\dsh\DSH\dsh-snake-game"
```

and mounted in `C:\Users\PC\.dsh\profiles\web\cordis.patch.yml`:

```yaml
- insert:
    - id: ui-snake-game
      name: dsh-client-ui-snake-game
```

The profile boot watches that patch file, so a page reload picks the new row up.
