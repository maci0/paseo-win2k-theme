# Provenance

Append only. A reversal is a new entry.

## 2026-11-09: initial Windows 2000 theme (0.1.0)

- **What:** `index.client.ts` registers one light theme, `windows-2000`, with eight colors from the Windows 2000 "Windows Standard" scheme. Manifest, overview, README, and two screenshots added.
- **Who asked:** Marcel W. Wysocki asked for a Windows 2000 theme for the Paseo themes category, based on his win2k.css, and for it to be published.
- **Color source:** `--sys-*` values in [maci0/zine `src/gui/win2k.css` L106-L148](https://github.com/maci0/zine/blob/a17c2d1e9f056876f2bef186dfc03aca25a74cd6/src/gui/win2k.css#L106-L148), annotated there as the `HKCU\Control Panel\Colors` defaults. [maci0/clanker `themes/win2k.json`](https://github.com/maci0/clanker/blob/main/themes/win2k.json) carries the same values.
- **Token mapping:** chosen from how Paseo expands a light plugin theme in [getpaseo/paseo `packages/app/src/plugins/themes/index.ts`](https://github.com/getpaseo/paseo/blob/1fff127f45b11c1c9c573fbbd12791673004c912/packages/app/src/plugins/themes/index.ts) (`buildLightPluginTheme`): `background` also colors popovers, the terminal, and text on the accent; `control` colors inputs and the sidebar; `border` colors the user message bubble and sidebar hover (`packages/app/src/components/message.tsx:316`); `ring` colors sidebar selection, placeholders, and extra-muted text.
- **Decisions:**
  - ButtonFace as `background` with Window white for `control` and `raised`, over the inverse (white background, ButtonFace sidebar and cards). Both were registered and rendered side by side; the chosen one reads as a Windows 2000 dialog with white list wells, the other as a gray-tinted modern light theme.
  - `mutedForeground` is ButtonDkShadow `#404040`, not GrayText `#808080`: on `#d4d0c8` the contrast is 6.7:1 against 2.6:1 (WCAG relative luminance).
  - `ring` is GrayText `#808080`: it must work both as text on ButtonFace and as a background under black text, and `#808080` is the Windows 2000 color that does both.
- **Verification:** `bun run typecheck` passes. Installed as a directory plugin with `@getpaseo/cli@0.15.3`; `plugin ls` reports `running` on the local daemon and on an isolated daemon with its own home. In the bundled 0.15.3 web UI, computed styles on the Appearance screen show exactly `rgb(212, 208, 200)`, `rgb(255, 255, 255)`, `rgb(128, 128, 128)`, `rgb(64, 64, 64)`, and `rgb(0, 0, 0)`. Screenshots taken from the isolated daemon with a sample project.
