---
name: financial-ds
description: FinancialDS design system - build or mock web UI screens with its React components (Button, Input, Tag, DataItem, Table, ...). Use when a task asks to build a screen, page or prototype with FinancialDS components, or when screen code must follow the FinancialDS --ds-* token system.
---

# FinancialDS — build screens with these components

B2B financial design system, desktop-first, APCA contrast. Components are plain React with props; all colors, spacing and typography are `--ds-*` tokens. Catalog: 74 components (59 stable, 12 in-progress, 3 planned; {'manifest': 'component-manifest.json', 'manifest_updated_at': '2026-11-11'}).

## Hard rules (always, in any screen)

- **Colors** — never hardcode hex/rgb; every color is `var(--ds-*)`.
- **Spacing** — only `--ds-space-*` steps (1=4px, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32, 10=40, 12=48, 16=64, 24=96). A step not on the scale silently renders 0.
- **Text** — font-size and line-height come as a pair from `--ds-type-*` (`--ds-type-h3-size` + `--ds-type-h3-lh`); never pair a bare `--ds-text-*` size with a hand-written px line-height.
- **Headings** — semantic elements `<h1>`–`<h6>` styled with `--ds-type-hN-*` tokens, never bare spans for heading levels (landmarks matter for accessibility).
- **Surfaces** — states a pointer acts on use `--ds-pos-*` / fills; static indicators (status tile, legend swatch, dot, progress fill) use `--ds-surface-pos-accent` / `--ds-surface-neg-accent` / `--ds-surface-warn-accent` / `--ds-surface-neutral-*`.
- **Amounts** — exact decimals with separators, never abbreviated (`1.2k` is a violation), never silently rounded; format through `Intl.NumberFormat` from raw numbers, not string literals.
- **Statuses** — a text status is a **Tag**, never a Badge (Badge carries a number or a dot only). Status words verbatim from the dictionary — conventions.md, section "Status".
- **Errors** — always three parts: cause · next action · error code.
- **Irreversible actions** — require a confirmation step; the confirm button is `variant="solid" intent="negative"` labeled `<Verb> <Object>`.
- **Buttons** — main action of a screen/dialog is `solid` + `neutral` (black); brand red is the CTA only (at most one per screen, never inside a modal/form/table row); there is **no `warning` intent** on Button.

## Choosing components

- Full catalog with when / not-for / pairs-with / exact props: **catalog-prompt.md**. Scenario matches `when:`; a `not-for:` veto overrides the match; `pairs-with:` names the neighbors. Only `stable` components go into output.
- Full component APIs, theming (data-theme, theme-invert), locale dictionary: **conventions.md**.
- Machine-readable manifest (status, source paths): **components.json**.

## Output contract

A single TSX file: default export `Screen`, imports like `import { Button } from 'src/components/Button/Button';`, layout styled only through `--ds-*` tokens. Follow **example-snapshot.tsx** in this skill folder exactly — it is the required dialect.

This is a **static prototype**: no `useState`/`useReducer`/effects, no event-handler logic, no computed or conditional props — inline literal values only. If an interaction matters, describe it in an assumptions note, not in code.

Do not reference other screens (no navigation/transition targets) — screen-to-screen links are out of scope of this deliverable; a flow that needs another screen is an assumption to list.
