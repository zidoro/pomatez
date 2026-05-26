# Pomatez — Patch Notes

## Active Patch: fix/esc-key-global-shortcut-leak

**Upstream PR**: https://github.com/zidoro/pomatez/pull/752  
**Status**: Open — pending upstream merge  
**Branch**: `fix/esc-key-global-shortcut-leak`

### Problem

`activateFullScreenShortcuts` registers `Esc` as a `globalShortcut` with a no-op
callback during mandatory breaks. This intercepts Esc **system-wide**, starving
every other application (terminals, editors, browsers) of the key while a break
is active. Same root cause as upstream issue #49 (Ctrl-R blocked, now closed).

### Fix

Replaced `globalShortcut` for Esc with `webContents.on('before-input-event')` on
the break window. Fires only when Pomatez has focus — which is always true during a
mandatory fullscreen break (`alwaysOnTop + fullScreen`). `CommandOrControl+W` retains
a `globalShortcut` because it is an OS-level close binding on macOS that bypasses
webContents input.

**Files changed:**
- `app/electron/src/helpers/globalShortcuts.ts`
- `app/electron/src/lifecycleEventHandlers/fullScreenBreak.ts`
- `app/electron/src/lifecycleEventHandlers/__tests__/fullScreenBreak.test.ts`

---

## How to Vend This Patch Locally

### Option A — asar hot-patch (instant, fragile)

Patches the installed app in-place. **Breaks on `brew upgrade pomatez`** — re-run after
every upgrade until upstream merges.

```bash
# 1. Extract the installed asar
cd /tmp
npx asar extract /Applications/Pomatez.app/Contents/Resources/app.asar pomatez-patched

# 2. Apply the fix to globalShortcuts.js
cat > pomatez-patched/build/helpers/globalShortcuts.js << 'EOF'
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateFullScreenShortcuts = exports.activateFullScreenShortcuts = exports.activateGlobalShortcuts = void 0;
var electron_1 = require("electron");
var EXIT_SHORTCUTS = { QUIT: "CommandOrControl+W" };
function activateGlobalShortcuts(shortcuts) {
    shortcuts.map(function (_a) {
        var key = _a.key, callback = _a.callback;
        electron_1.globalShortcut.register(key, callback);
    });
}
exports.activateGlobalShortcuts = activateGlobalShortcuts;
function activateFullScreenShortcuts(win, exitFullScreenCallback) {
    win.webContents.on("before-input-event", handleBreakInput);
    electron_1.globalShortcut.register(EXIT_SHORTCUTS.QUIT, exitFullScreenCallback);
}
exports.activateFullScreenShortcuts = activateFullScreenShortcuts;
function deactivateFullScreenShortcuts(win) {
    win.webContents.removeListener("before-input-event", handleBreakInput);
    electron_1.globalShortcut.unregister(EXIT_SHORTCUTS.QUIT);
}
exports.deactivateFullScreenShortcuts = deactivateFullScreenShortcuts;
function handleBreakInput(event, input) {
    if (input.type === "keyDown" && input.key === "Escape") {
        event.preventDefault();
    }
}
EOF

# 3. Repack and replace
npx asar pack pomatez-patched /tmp/app-patched.asar
sudo cp /Applications/Pomatez.app/Contents/Resources/app.asar \
        /Applications/Pomatez.app/Contents/Resources/app.asar.bak
sudo cp /tmp/app-patched.asar /Applications/Pomatez.app/Contents/Resources/app.asar

# 4. Restart Pomatez
pkill -x Pomatez || true
open /Applications/Pomatez.app
```

### Option B — Homebrew tap (durable, recommended)

Builds from this fork and installs via a custom cask. Survives system restarts.
Pin until upstream PR #752 merges, then revert to the official cask.

```bash
# 1. Build deps (requires node + yarn)
cd "${WS_DIR:-$HOME/ws}/git/src/extern/pomatez"
yarn install

# 2. Build macOS DMG
yarn build:mwl
# DMG produced at: app/electron/dist/Pomatez-*.dmg

# 3. Create GitHub release on fork
DMG=$(ls app/electron/dist/Pomatez-*-mac-arm64.dmg 2>/dev/null || \
      ls app/electron/dist/Pomatez-*.dmg | head -1)
SHA=$(shasum -a 256 "$DMG" | awk '{print $1}')
gh release create v1.11.0-esc-fix \
  --repo richtong/pomatez \
  --title "v1.11.0-esc-fix: block Esc via webContents" \
  --notes "Patch for upstream PR #752 — Esc no longer intercepted system-wide during breaks." \
  "$DMG"
RELEASE_URL=$(gh release view v1.11.0-esc-fix --repo richtong/pomatez --json assets \
  --jq '.assets[0].browserDownloadUrl')

# 4. Create/update homebrew tap
# Assumes richtong/homebrew-tap exists; create with:
#   gh repo create richtong/homebrew-tap --public
BREW_TAP_DIR="${WS_DIR:-$HOME/ws}/git/src/extern/homebrew-tap"
mkdir -p "$BREW_TAP_DIR/Casks"
cat > "$BREW_TAP_DIR/Casks/pomatez.rb" << CASK
cask "pomatez" do
  version "1.11.0-esc-fix"
  # Update sha256 after building:
  sha256 "${SHA}"
  url "${RELEASE_URL}"
  name "Pomatez"
  desc "Pomodoro timer (patched: ESC key fix — upstream PR #752)"
  homepage "https://zidoro.github.io/pomatez"
  app "Pomatez.app"
  zap trash: [
    "~/Library/Application Support/pomatez",
    "~/Library/Preferences/com.roldanjr.pomatez.plist",
  ]
end
CASK

# 5. Install from tap
brew tap richtong/tap "$BREW_TAP_DIR"
brew install --cask richtong/tap/pomatez
```

### Reverting to upstream (after PR #752 merges)

```bash
brew uninstall --cask richtong/tap/pomatez
brew untap richtong/tap
brew install --cask pomatez
# Then remove this submodule:
#   git submodule deinit extern/pomatez
#   git rm extern/pomatez
```

---

## Tracking

| Field | Value |
|---|---|
| Upstream repo | https://github.com/zidoro/pomatez |
| Our fork | https://github.com/richtong/pomatez |
| Upstream PR | https://github.com/zidoro/pomatez/pull/752 |
| Patch status | `pr_open` |
| Pinned version | `1.11.0-esc-fix` |
| Viability TTL | 90 days — re-evaluate if upstream PR stalls |
| Related issue | upstream #49 (same root, closed, Linux) |
