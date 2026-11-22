# FinancialDS — building with these components

FinancialDS is a B2B financial design system (desktop-first, APCA-contrast). Components are plain React: **no context provider or root wrapper is required** to render them — they style themselves from imported CSS and global `--ds-*` custom properties.

## Setup
- **Interface language.** Components speak Russian by default; all their built-in texts — close buttons, «Загрузка», clear buttons, calendar weekdays and presets, pagination, upload statuses — come from one dictionary. For an English interface wrap the screen in `<DsLocaleProvider locale="en">…</DsLocaleProvider>`; nothing else changes. A text you pass as a prop always wins over the dictionary. Status words for the chosen language are in `STRINGS.<locale>.status` — the same words as the table below.
- **Use the components directly — do not add import lines.** No other provider is needed, and, in this delivered package, no module import: the components are already in scope as globals — `_ds_bundle.js` defines `window.FinancialDS`, and each shim under `components/…` binds the bare name, so write `<Button …>` directly. There is no npm package to import from: this design system is not published, so `import … from 'design-system'` will not resolve. (The source repository does use normal ES imports internally; that is its build, not your contract.)
- **Theme** is selected by attribute on any ancestor (default = light). Set on `<html>` or a section to theme its subtree:
  - `data-theme="light"` / `data-theme="dark"` — light / dark
  - add class `theme-invert` (composes with `data-theme`) for inverted surfaces
- **Never hardcode hex** — every color is a `--ds-*` token, already defined globally in `styles.css`.

## Styling idiom — token system, not utility classes
Style via component **props** (below), and use `var(--ds-*)` for your own layout glue. There are **no** Tailwind/utility classes. Real token families in `styles.css`:
- geometry/size: `--ds-btn-*`, `--ds-bdg-*`
- spacing `--ds-space-*`: **the number in the name counts 4 px steps — it is not pixels.** The whole scale is `--ds-space-1` 4 px · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 · `-6` 24 · `-8` 32 · `-10` 40 · `-12` 48 · `-16` 64 · `-24` 96, and no other step exists — no step is numbered above 24. A step that is not on this list has no fallback: the browser drops the whole declaration, so a `padding` that names one such step renders as 0 on every side, not only on that one. For the space between text and blocks use the vertical-rhythm ladder below.
- palette: `--ds-brand-*`, `--ds-pos-*`, `--ds-neg-*`, `--ds-warn-*`, `--ds-info-*`; neutral `--ds-nb-*` (opaque) / `--ds-nba-*` (alpha)
- type: named text styles `--ds-type-*`, each split into suffixes `-size`, `-lh`, `-weight` (some also `-tracking`) — e.g. `--ds-type-h3-size`
- text colour `--ds-text-*` · surface `--ds-surface-*` · motion `--ds-dur-*` / `--ds-ease` · focus `--ds-focus-ring`

**Font-size and line-height come as a pair, and the pair lives in `--ds-type-*`.** `styles.css` defines **25 named text styles** — `h1`…`h6`, `display-0`, `display-1`, `body-1`, `body-2` (+ their `…c` compact twins), `label-l0`…`label-l3`, `caption`, `meta`, `sub2`, and three `specimen-*` used only by our own type specimen page. Each style is a set, not a single value: `--ds-type-h3-size`, `--ds-type-h3-lh`, `--ds-type-h3-weight`. 22 of the 25 carry that full size/line-height/weight set, and 12 add `-tracking` — `h1`…`h6`, both `display-*`, plus `label-l3`, `meta` and two `specimen-*`, so do not assume tracking follows from "is a heading"; the remaining three (`label-l1c`, `label-l2c`, `label-l3c`) are compact line-height overrides for the matching label styles and carry `-lh` only.

The trap is `--ds-text-*`, because that one prefix holds two unrelated things: **9 colour roles** (`--ds-text-primary`, `-secondary`, `-tertiary`, `-invert`, `-on-solid`, …) and **13 bare font-size steps** (`--ds-text-3xs` 10px … `--ds-text-base` 14px … `--ds-text-6xl` 80px). The size steps have **no line-height partner** — `--ds-text-*-lh` does not exist, measured 0 occurrences in `styles.css` — so text sized from them leaves you writing `line-height` in raw px — and a raw px line-height is the one value that stops tracking the responsive overrides the package already ships: `--ds-type-*` sizes and line heights change with the viewport (a smooth ramp from 360 to 768 px, and on to 1024 for `display-*`), and from 1024 px wide `[data-density="compact"]` re-declares 14 more (8 of them `-lh`; narrower, the attribute does nothing). Theme is not the axis here — line-height does not change with light/dark; viewport and density do. That is not hypothetical: on the first screen built against an earlier version of this file, all **176** font-sizes came from `--ds-text-*` and **44** line-heights were written as hardcoded px. Set text from `--ds-type-*`; reach for a bare `--ds-text-*` step only where there is no line box to govern (an icon box, a `1em` square), and never pair it with a hand-written line-height.

**Each colour family holds two roles, and choosing by lightness picks the wrong one.** `--ds-pos-default` / `-hover` / `-pressed` are the rest, hover and pressed states of something a pointer acts on. Anything a pointer does *not* change — a status tile, a legend swatch, an indicator, a dot, a progress fill — takes a **static surface** instead: `--ds-surface-pos-accent`, `--ds-surface-neg-accent`, `--ds-surface-warn-accent`, or the neutral ladder `--ds-surface-neutral-*`. One question decides it: *does a pointer change this element?* No → static surface. The two ladders sit close in lightness and far apart in contrast, so the eye is no guide: white text on the interactive fill `--ds-warn-fill` (#F4A800) measures **APCA Lc 43** — under the Lc 45 a UI label needs — while the static `--ds-surface-warn-accent` (#DD8420) gives **Lc 59**. Both numbers are measured, not estimated. (`--ds-warn-default` is a third thing again: the validation *border*, not a fill — it shares the light hex and diverges in dark.)

## Components (exact APIs)

**Button** — `<Button variant intent size width>Label</Button>`
- `variant`: `solid` | `outline` | `ghost` | `soft` (default `solid`)
- `intent`: `brand` | `neutral` | `info` | `positive` | `negative` (default `neutral` — **there is no `warning` intent for Button**)
- `size`: `sm` | `md` | `lg` | `xl` (default `md`)
- `width`: `hug` | `fill` (default `hug`)
- Destructive actions: label as `<Verb> <Object>` ("Delete transfer"), never "OK"/"Confirm".
- **Which intent — always pass it, never rely on the default.** The default is `neutral` (black), the main button; red `brand` is **not** our main button:
  - **The main action of a screen or a dialog is black:** `variant="solid" intent="neutral"`, or `variant="soft" intent="neutral"` where a strong accent is not wanted. This covers Save, Apply, Continue, Submit, Create — in pages, forms, dialogs and table rows alike.
  - **Brand red is the CTA only** — a promotional block, or one of the few top-level key operations of the product. At most one per screen, and **never inside a Modal, a form, a table row or a card action**. If you are unsure whether something is a CTA, it is not: use neutral.
  - **Confirming an irreversible action** (delete, close without saving, cancel a transfer) is `variant="solid" intent="negative"`, labelled `<Verb> <Object>`.
  - Secondary actions are `outline` `neutral`; tertiary and repeated ones `ghost` `neutral`.

**Badge** — a **number or a dot, nothing else**: an unread count, a quantity, a "new" marker. A Badge still carries status, but only in these two forms: the **semantic color of a count** (a notifications count turns `negative` when one of them is critical, `positive` for accepted requests) and the **presence dot** (user active / inactive / available / unavailable). **Never put words in a Badge** — a text status such as "Processing" or "Active" is a **Tag** (below). Non-interactive; for a clickable pill use Tag/Chip.
- `variant`: `dot` | `solid` | `soft`
- `semantic`: `neutral` | `brand` | `info` | `positive` | `warning` | `negative`
- `size`: `sm` | `md`

**Tag** — a text label, including a status label: `<Tag variant semantic size interactive={false}>Processing</Tag>` in an English interface, `…>В обработке</Tag>` in a Russian one — the word comes from the status dictionary below, in the language of the interface.
- `variant`: `fill` | `soft` | `outline`
- `semantic`: `neutral` | `brand` | `info` | `positive` | `warning` | `negative`
- `size`: `sm` | `md`
- `interactive={false}` for a label that does nothing when clicked — no button inside, no tab stop.

**Skeleton** — a loading placeholder: `<Skeleton variant width lines />`, `variant`: `text` | `rect` | `circle`.
- **Inside a `TableCell` — and any container that shrinks to its content — `width` must be an absolute grid length, `calc(var(--ds-comp-unit) * N)`.** A percentage there resolves to 0 and the placeholder disappears. Percentages only where the container has a defined width (a block, a stretched flex item, a grid cell).
- Table recipe: one `<Skeleton width=… />` per cell, widths cycling `N = 20 15 18 14 17` units so a column does not read as a solid bar.

## Where the truth lives
Read `styles.css` (and its `@import` closure — `_ds_bundle.css` + token defs) before styling. Each component ships `<Name>.d.ts` (props) and `<Name>.prompt.md` (usage examples).

**Three things the `.d.ts` does not tell you, stated here so you don't read its silence as a rule.**

1. **Some prop types are named but not declared.** A contract may reference a type it does not define — `NotificationAction`, `SelectOption`, `MultiSelectOption`, `TabItem`, `StepItem`, `CalendarView`, `DayData`, `BreadcrumbItem`, `PasswordCondition` among them. The name tells you the shape is structured rather than a primitive. Where the shape itself is written out, it is in that component's `.prompt.md` — but do not count on it: for several of these names the `.prompt.md` only repeats the name in the props list and shows no worked example. When that happens, read the usage examples in the same file and take the shape from the code there; if it is still unclear, ask rather than guess. Treat the name as a label, not as an import you can resolve.
2. **Inherited markup attributes are absent from the contract, and that is not a ban.** Every component root forwards the standard attributes of the element it renders — `onClick`, `disabled`, `type`, `placeholder`, `name`, `autoComplete`, `aria-*`, `data-*` and the rest. They do not appear in the `.d.ts` because the generator lists only props declared in the package's own files; React's own typings are outside it. So: if an attribute is valid on the underlying HTML element, it is valid here. The two component-level rules that override this still hold — do not combine `error` with `disabled` or `readOnly`, and do not hand a static Tag or a read-only link a click handler.
3. **`id` goes to the component's own focusable control, not to its wrapper.** Fields (`Input`, `TextArea`, `DatePicker`, `SelectField`, `MultiSelect` and the rest), `Checkbox`, `Radiobutton`, `Switcher`, `UploadBox`, and the inner button of `Tag` and `Chip` all put the `id` you pass on the element that takes focus — so `<label htmlFor={id}>` written outside the component reaches the field, and a click on it lands there. Where there is no single such control — a group (`RadioGroup`, `ToggleGroupButton`, `SelectControl`, `Upload`), a container or a dialog — `id` stays on the root. Two exceptions: `TableCell` keeps `id` on the cell, because a table addresses cells through `headers`; `Collapse` keeps it on its root wrapper (`<div class="ds-collapse">`), because the id names the whole collapsible block as a link target — its toggle button already carries its own id, which the panel points to through `aria-labelledby`. Group roots are not labellable through `<label for>` either: name a group with its own `label` prop where it has one, or with `aria-labelledby`. One limit of HTML, not of ours: in `SelectField` the control is a `<div role="combobox">`, and `<label for>` cannot reach a `div` — label it from outside with `aria-labelledby`. (`MultiSelect` is not affected: its combobox is an `<input>`.)

## Example
```tsx
// No import line. Button, Badge and Tag are already in scope — the bundle put them there.

<div style={{ display: 'flex', gap: 'var(--ds-space-2)', alignItems: 'center' }}>
  <Tag variant="soft" semantic="positive" size="sm" interactive={false}>Active</Tag>
  <Badge variant="solid" semantic="neutral" size="sm">3</Badge>
  <Button variant="solid" intent="neutral" size="sm">Save changes</Button>
</div>
```

## Assembling a page

**The components available to you are exactly the ones delivered in this package** — the catalog that ships alongside this document, one folder and one `.d.ts` per component. That catalog is the only list; this document deliberately does not repeat it, because a second list written in prose goes stale and then argues with the real one.

**Where a component's boundaries are written down.** `guidelines/handoff/consumer/catalog.md` carries, per
delivered component, what it is *for*, what it must *not* be used for, and what it is
normally composed with. That file is generated from the design system's own manifest, so
it is the half of this package a machine wrote — check a component against it before you
place it, the same way you check its props against its `.d.ts`. It is not repeated here
for the reason given above.

*Available here is not the same as exists in the design system.* The system holds more than any single delivery carries. So `MISSING:` from you means "not in what I was given"; whether the piece already exists and merely needs shipping, or has to be designed and built first, is ours to decide. Mark it and move on — do not guess which of the two it is, and do not substitute a hand-built stand-in either way.

- **If a screen needs a control that is not on that list — do not draw it.** An input, a select, a modal, a tooltip, pagination: write `MISSING: <what you needed>` where it would go and say so in your reply. Do not improvise a stand-in; an improvised control looks right and is wrong, because none of its states, themes or tokens are governed by this system.
- **Three things are *not* missing components, and you are expected to build them yourself:**
  - **The table container.** The container is yours — column widths, sorting and scrolling belong to the application, not to this system — but **every cell in it is `TableCell`**, header cells included (`header`). Nothing else stands in for a cell: not `DataItem`, and not a cell element of your own with our components dropped inside. Other components go *into* a `TableCell` through its slots (`icon`, `actions`, `caption`, `suffix`; anything else through `variant="swap"`). **Build the container as a CSS grid, never as `<table>`/`<tr>`.** In this template every imported component arrives wrapped in an element of its own, and the browser moves anything that is not a native cell out of a table row — in the editor the table renders empty and the cells pile up above it. A grid has no such rule, and `TableCell` renders in it exactly as in a table:
    ```html
    <div role="table" aria-label="Turnover by market" style="display:grid;grid-template-columns:240px 160px">
      <div role="row" style="display:contents">
        <x-import component-from-global-scope="FinancialDS.TableCell" header="{{ true }}">Market</x-import>
        <x-import component-from-global-scope="FinancialDS.TableCell" header="{{ true }}" align="end">Volume, ₽ m</x-import>
      </div>
      <!-- one <div role="row" style="display:contents"> per data row, one TableCell per column -->
    </div>
    ```
    Column widths live in the container's `grid-template-columns` and nowhere else; each row is `display:contents`, so its cells become the grid's own items. Keep `role="table"` on the container and `role="row"` on each row — that is what makes it read as a table. Do not mark a table `MISSING:`.
  - **Section and page headings.** These are typography, not components: a heading uses the text tokens (`--ds-text-*` sizes and colours) next to a Button in a flex row. Build it.
  - **Empty and loading states.** Also compositions, not components. An empty result explains the cause, offers the way out, and stays neutral in tone — it is not an error, the data exists and the selection is empty; give it a short line of text plus a Button such as "Clear all". Loading: a spinner belongs to buttons and pinpoint actions only; for a region that holds layout, keep the container's height rather than collapsing it.
- **Vertical rhythm is not optional, and it comes from a fixed ladder of steps — not from a component's own height.** Our components carry their *inner* spacing only; the space *between* them is yours to set, and a screen that leaves it unset reads as a wall. Never rely on a control's `min-height` to create separation — the moment a value wraps to two lines the gap collapses to nothing. The steps never shrink from tight to wide, so a section heading sits closer to its first block (16) than to the section above it (24). One limit: a group heading inside a card has 16 above it and 16 from it (together with its description, if it has one — the description itself sits 8 below the heading) to the group's first block — distance alone does not tie it to its group. One component carries outer space itself: `Divider` (`<Divider padding={0 | 2 | 4} />`; 0 is the default and adds none). An avatar group also uses `margin`, but that is the overlap inside the group, not space around it.

  Each step is **one token that already changes with the viewport**: the mobile value at 360 px, the desktop value from 768 px up (tablet = desktop), and a smooth 2 px-step ramp in between. Do not write your own media query for the rhythm.

  | What you are separating | Token | from 768 px | at 360 px |
  |---|---|---|---|
  | a heading and its own description (card, panel, section title) | `--ds-layout-gap-heading` | 8 | 6 |
  | rows of data inside one block (stacked `DataItem`, list rows) | `--ds-layout-gap-rows` | 8 | 8 |
  | groups inside a card; a section heading and the first block under it | `--ds-layout-gap-group` | 16 | 16 |
  | cards and sections from each other | `--ds-layout-gap-section` | 24 | 20 |
  | major zones of the page | `--ds-layout-gap-zone` | 32 | 24 |
  | a card's padding, top and bottom | `--ds-layout-pad-card-y` | 24 | 20 |
  | a card's padding, left and right | `--ds-layout-pad-card-x` | 24 | 16 |
  | the page's side padding | `--ds-layout-pad-page-x` | 24 | 16 |

  Set it as `gap` / `row-gap` on the container, not as `margin` on children. **A grid gets both axes**: `column-gap` alone leaves rows touching, which is the single most common way this goes wrong.

  - **On desktop and tablet the first two rows are both 8 but mean different things:** `--ds-layout-gap-heading` is spacing inside a text group, `--ds-layout-gap-rows` is a layout step between blocks. `--ds-grid-gap-*` stay the grid's own steps (columns, rows of cards) and do not change with the viewport.
  - **The step does not depend on the heading's size.** A 20 px and a 24 px heading both get 8 to their description — do not scale the gap with the type. This is the rule for application screens; long-form text has its own ladder, below.
  - **Paragraphs of one text are separated by one line height of their style — use the line-height token itself as the gap:** Body 1 — `var(--ds-type-body-1-lh)` (24 from 768, 20 at 360), Body 2 — `var(--ds-type-body-2-lh)` (20 and 16); the compact twins `var(--ds-type-body-1c-lh)` / `var(--ds-type-body-2c-lh)`. It follows the viewport and `[data-density="compact"]` on its own. This is spacing inside one text, not between blocks.
  - **Several paragraphs inside a card: separate the groups with a `<Divider />`.** The paragraph gap (16–24 on desktop, 16–20 on mobile; the one exception is the mobile Body 2c at 14) is not narrower than the gap between groups (16), so without a separator paragraphs of different groups sit no farther apart than paragraphs of one. Put a horizontal `Divider` between the groups when both hold: at least one group has more than one paragraph **and** every group has its own heading. If the groups have no headings, give them headings or merge them into one text — a line must not be the only thing that marks a group. Use the component, not a `border` on the block. Its `padding` is a `margin-block`, so it adds to the container's `gap`. Measured in a card with `gap` 16: paragraphs 24 / 20 / 20 / 16 (Body 1 / Body 2 at standard density, Body 1 / Body 2 in compact), groups 16 without a separator in all four cases, 33 / 37 / 41 with a `Divider` at `padding` 0 / 2 / 4, the 1 px line included (all three measured in Chromium). Raising the gap to 24 is not a general fix: for Body 1 it is 24 against 24, and 24 is already the step between cards. The heading carries the meaning; the line only restores the separation.
  - **A grid of cards:** `--ds-layout-gap-section` between rows (24, 20 at 360), the grid gutter between columns (16; our layout notes name 24 from 1440, but the code has no responsive gutter, so keep 16 at every width). Set `row-gap: var(--ds-layout-gap-section); column-gap: var(--ds-grid-gap-md);` — one value on both axes pulls the columns off the gutter.
  - **Components that own their rhythm keep it** — Modal, Alert, form fields; their gaps are set in their own CSS. Do not override their inner gaps; the ladder is for what you assemble out of components.
  - **Tablet uses the desktop values** — from 768 px every rhythm token is at its desktop value; the grid gutter between columns is 16 (`--ds-grid-gap-md`) at every width.
  - **Between 360 and 768 the tokens ramp on their own** — type, line heights and gaps together, so a paragraph gap tied to the line height never drifts from it. There is nothing to switch. The `Divider` rule for several groups of paragraphs still applies, except for the compact Body 2c near 360: its paragraph gap of 14 is narrower than the group gap of 16, so the groups read without a line. A card grid becomes one column below 640 (the `.ds-grid--cols-*` classes do it). This changes the rhythm only: component sizes stay desktop, so it does not make a screen mobile-ready.
  - **Long-form text (article, help page, news)** has its own ladder — space around a heading grows with its level, more above than below: eyebrow → title `--ds-article-gap-eyebrow` (12) · title → lead `--ds-article-gap-title-lead` (24 / 16 at 360) · lead → author and date `--ds-article-gap-lead-meta` (32 / 24) · article header → text `--ds-article-gap-head-body` (48 / 32) · text → H2 / H2 → text `--ds-article-gap-h2-above` / `-h2-below` (40 / 20; 32 / 16) · text → H3 / H3 → text `-h3-above` / `-h3-below` (32 / 12; 24 / 12) · text → H4 / H4 → text `-h4-above` / `-h4-below` (24 / 8; 20 / 8) · paragraph heading → paragraph `--ds-article-gap-para-head` (4) · paragraph → paragraph `--ds-article-gap-para` (16 / 14 — the type size, not the line height, so a paragraph never equals the space above an H4) · list item → item `--ds-article-gap-list-item` (8) · figure → caption `--ds-article-gap-caption` (12 / 8). Do not use the application ladder for long-form text, and do not use this one on a working screen.
  - **Promo surfaces** (only those in `acquisition-surfaces.json`) use larger empty space: section → section `--ds-promo-gap-section` (96 / 64 at 360) · section header → content `--ds-promo-gap-head-content` (64 / 48) · block → block `--ds-promo-gap-blocks` (32) · eyebrow → title `--ds-promo-gap-eyebrow` (12) · title → subtitle `--ds-promo-gap-title-sub` (20 / 16) · block title → description `--ds-promo-gap-card-title-desc` (8) · side padding `--ds-promo-pad-x` (32 / 16). The `display-*` sizes on these surfaces keep growing after 768: Display 0 is 56 · 64 · 80 at 360 · 768 · 1024.

- **Breakpoints are ours, and there are four of them** — `--ds-bp-sm` 640, `--ds-bp-md` 1024, `--ds-bp-lg` 1280 (page container max width; B2B starts at 1024), `--ds-bp-xl` 1920. Reflow only at those. Do not invent thresholds (`minmax(248px, 1fr)`, `max-width: 1320px`) — an invented threshold looks reasonable and puts your screen out of step with every other one in the product. For a centred page container use `--ds-bp-lg` as the max width; if you need a value that has no token, stop and say so rather than picking a number.

- **Dialog footer: pass a `ButtonsGroup` with `align="right"` as the Modal `footer`** — `<ButtonsGroup align="right" size="sm"><Button variant="outline" intent="neutral" size="sm">Cancel</Button><Button variant="solid" intent="neutral" size="sm">Save</Button></ButtonsGroup>`. It wraps to a second line when labels are long; a flex row of your own does not, and the last button ends up outside the dialog.
- **Component size on operational screens: `size="sm"` by default, `md` only for the main form of a page.** Operational screens are dense, and `md` everywhere makes a dialog or a toolbar look oversized. Use `sm` (controls 32 px high) for buttons, fields, selects, tabs, tags and chips in tables, filters, toolbars, side panels, card actions and **every dialog** — its fields and footer buttons included. Use `md` (40 px) only where one form *is* the page: creating a transfer, filling in an application. Keep one size inside one block; never mix `sm` and `md` in a dialog or a toolbar. `lg` and `xl` are not for operational screens.
  - **Pass `size` explicitly** — components default to `md`, so leaving it out gives you the large size.
  - `ButtonsGroup` `size` sets only the gap between buttons; give each `Button` its own `size="sm"` as well.
  - `Modal` `size` is the dialog *width*, not density — it has nothing to do with this rule.
  - On a dense screen use fields with the label **outside** (`Input`, `SelectField`, … with `label`). Fields with the label inside (`InputLabelIn`) are 48 px high in both `sm` and `md`, so they do not get smaller.
  - Acquisition surfaces are exempt: there `md` and larger are fine.
  - **Table rows are the exception — size them by what the user does on the screen** (`TableCell` `size`): `lg` for overview and decision screens (a summary, an object card, a statement, a register up to roughly 50 rows), `md` for mass processing (a register of hundreds of rows, line-by-line reconciliation), `sm` only when explicitly asked. Judge by the task, not by the row count — 50 is a guide, not a limit. Controls inside the table stay `sm`.
- **Never `!important`, and never restyle a component's internals** (no `.ds-btn__label { … }`). Compose from the outside; if the component cannot do what you need, that is a `MISSING:`, not a workaround.
- **Never hand-build something that already exists as a component** — a status pill, a separator, an avatar stack. Inline copies re-invent the states and themes the real component already solves, and they drift the moment a token changes.

### States you must not combine or fake
- **A field is never both `error` and `disabled`/`readOnly`.** An error says "fix this"; disabled and read-only say "there is nothing to fix here". Pick one.
- **Error is never signalled by colour alone** — always colour *plus* text or icon.
- **Disabled is never `opacity: .5`** — components carry their own disabled tokens; dimming breaks contrast and hides which element is actually inert.

### Focus, targets, theme
- **Never remove the focus outline.** Keyboard users navigate these screens all day. Draw the ring from the focus tokens only: by default `box-shadow: var(--ds-focus-ring)`; where a component needs another shape, from its parts — `outline: var(--ds-focus-width) solid var(--ds-focus-ring-color)` (as on Radio and Checkbox) or `box-shadow: inset 0 0 0 var(--ds-focus-width) var(--ds-focus-ring-color)` (as inside a TableCell). `--ds-focus-ring` itself is a complete two-ring shadow — a gap in the surface colour, then the ring colour — **not a colour**: in the `outline` shorthand it removes the outline altogether, and as `outline-color` or `border-color` it falls back to the text colour, so the ring you meant is never drawn.
- **Interactive targets are at least 24×24 px** (desktop web minimum).
- **Do not write your own dark styles.** Every `--ds-*` colour already flips with the theme. If you truly must scope something, write both `[data-theme="dark"] .sel { … }` and `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .sel { … } }` — a bare media query overrides an explicit light choice and breaks the toggle.

### Layout
- **Numeric columns use `font-variant-numeric: tabular-nums`** — amounts must align digit-to-digit down a column.
- **No cards inside cards**, and **one primary action per screen** — black (`solid` `neutral`); everything else is outline, ghost or soft. Brand red is a separate thing, the CTA — see Button above.
- **Radius and shadow come from the token scales only.** If the value you need is not in them, stop and say so; do not invent one.
- **Borrowing from a product you admire: name the technique you are translating** ("the spacing between field groups, and one accent per screen"). Never carry over its palette, radii, shadows, type or micro-copy — those are its identity, not a pattern.

## Non-negotiables — every design, every mode

This DS serves two audiences. **Operational is the default**: B2B financial power users, desktop 1280–1920, compact controls, 200+ row tables (row size by the screen's task — see «Component size on operational screens»), no hero. Acquisition (retail onboarding — whitespace, hero, illustrations) applies **only** to surfaces on an explicit allowlist. If nobody told you the surface is acquisition, it is operational.

Everything below holds in **both** modes. Simplifying a screen never relaxes it.

### Data integrity
- **Amounts: exact decimal, never silent rounding.** Render `1234.50` — never `1.2k`, never `1235`. Truncating a monetary value is a correctness bug, not a style choice.
- **Group the digits of every amount, and take the separator from the platform — never build it yourself.** Format with `Intl.NumberFormat(<UI locale>)`, and the locale is the one the interface is in, not a single global one. Russian renders `1 234 567,50`; English renders `1,234,567.50`. In Russian the group separator is a **non-breaking space (U+00A0)**, never an ordinary one — an ordinary space lets the number wrap and an amount splits in half at a column edge. The decimal mark is a **comma** in Russian and a **period** in English; never swap them, because `1,234` reads as one-point-two-three-four to a Russian user and as one thousand two hundred thirty-four to an English one. Assembling the separators by hand is forbidden: a hand-rolled table drifts away from the platform on the first new locale.
- **Status words are verbatim legal terms.** The six states of **processing** — of an operation, an application or a document — take their word from this dictionary, **in the language of the interface**:

  | English UI | Russian UI | Means | Not to be confused with |
  |---|---|---|---|
  | `Processing` | `В обработке` | sent, being executed or reviewed — including when the bank's response was lost (timeout): the outcome is unknown, so offer *check status*, never a new attempt (owner decision 2026-10-13) | ≠ `Pending` |
  | `Pending` | `Ожидает` | queued, awaiting start | ≠ `Processing` |
  | `Completed` | `Завершено` | finished successfully | — |
  | `Failed` | `Сбой` | system error with a **known** outcome — the operation did not reach the bank, or the bank returned an execution error; a timeout is **not** `Failed` | ≠ `Rejected` |
  | `Rejected` | `Отклонено` | declined by the bank or compliance | ≠ `Failed` |
  | `Cancelled` | `Отменено` | aborted — **only where cancellation is actually possible**; never offer it for a flow that has no cancel window | — |

  Take the word for the interface's language from this table — never paraphrase, shorten, invent a synonym, or translate a term yourself ("In progress", "Done", "Error", «В процессе», «Обработано», «Ошибка» are all wrong). A Russian word keeps the form written here, whatever noun it labels: «Отклонено», never «Отклонена». Do not put an English term into a Russian interface. These carry compliance meaning.

  **Colour of the status Tag for the two in-flight states** (owner decision 2026-09-25): `Pending` / `Ожидает` → `semantic="neutral"`, `Processing` / `В обработке` → `semantic="info"`. Two reasons. The states are legally different, so they must not share a colour — the word alone should not be the only thing telling them apart. And neither is a warning: an operation in the queue or in progress is the normal course of things, and amber on half the rows of a 200-row table stops being noticed exactly when a real warning appears. If in your product `Pending` means *waiting for the user's action* (a signature, a confirmation), that is a call to act and `warning` is justified — say so in your reply. The colours of the other four states are not fixed by this decision.

  **Where the dictionary ends.** It covers the progress of processing only. The lifecycle of anything else — a certificate's validity («Действует», «Отозван»), an account being open or closed, the steps a bank itself assigns to a payment order — is written in that domain's own words, **verbatim from the data**. Never force such a state onto the six words, and never invent one: if the data does not give you the word, say so in your reply.
- **Errors have three parts:** plain cause + next action + code — `Transfer declined by bank. Check account balance and retry. (code: TRF-403)`. None is optional: the code is what support correlates on, the action is what makes the message useful. **In a Russian interface the word before the code is «код»** (owner decision 2026-10-16) — `Перевод отклонён банком. Проверьте остаток и повторите. (код: TRF-403)`; the code itself stays as is, since support searches by it.
- **Irreversible actions need a confirmation step** — submit, wire transfer, delete document, close account, bulk delete. These get **at most 100–200 ms** of visual feedback — that is a ceiling, not a target. Reversible ones (filter, sort, collapse, preview) are **instant — 0 ms**: no dialog, no transition. A power user must not wait for the interface.

### Rendering
- **Contrast is APCA, not WCAG.** Lc ≥ 60 body text · Lc ≥ 45 UI labels · Lc ≥ 30 decorative. Do not apply 4.5:1 ratios — this palette was built against APCA and the two disagree.
- **Tokens only.** No hardcoded hex, no `rgba()`, no raw numbers for color, spacing, size or duration — take every one of them from `var(--ds-…)`. If the value you need has no token, stop and say so; do not invent one. **One named exception:** the column widths and the `min-width` of a table container are the application's layout, not this system's (see *The table container* above) — plain numbers are expected there, in `grid-template-columns` and nowhere else.
  **A 1 px line has no general-purpose token** (a few components carry their own, for their own use): write its width as `calc(var(--ds-comp-unit) * 0.25)` rather than a bare `1px`. `--ds-comp-unit` is the 4 px grid unit; the multiplier is grid arithmetic, not a raw size, and a quarter of the unit is 1 px on the grid. Example, a separator in your own layout: `border-top: calc(var(--ds-comp-unit) * 0.25) solid var(--ds-stroke-low)` — `--ds-stroke-low` is the design's static border colour (Static/Border/Neutral-Blue/Low), for separators and the outer frame of your own containers, such as a table frame; a component's own border is never yours to restyle. Do not use `--ds-border` for this: it is an older showcase token whose values match the design in only one theme of the four (checked against the design 2026-10-16). Our stylesheets are not all there yet: the one shipped to you still writes a bare `1px` in 9 border declarations against 14 in the unit form — drift we convert when we touch those rules, not a pattern to copy. One exemption: the spread of a `box-shadow` (an inset `0 0 0 1px` ring) takes no layout space and may stay literal.
- **Never animate layout properties** — `width`, `height` and their `min-`/`max-`, `top`/`left`/`right`/`bottom`/`inset`, `margin`, `padding`, `gap`, `font-size`, `line-height`, `flex-basis`, `border-width`: every frame recomputes layout, and these tables run 200+ rows. Move, scale and reveal with `transform` and `opacity`; `color`, `background`, `border-color` and `box-shadow` may transition — they only repaint. An element out of flow (`position: absolute` inside a container of constant height) moves no neighbours. Never `transition: all` — list the properties. Durations are real tokens, not a wildcard: `--ds-dur-1` (120 ms) and `--ds-dur-2` (150 ms) for component transitions; `--ds-dur-3` (240 ms) moves the Tabs indicator (overlays — Toast, ActionToast, Notification — use `--ds-dur-2`), `--ds-dur-4` (320 ms) for page-level sequences. Easing is `--ds-ease`. Always pair motion with `@media (prefers-reduced-motion: reduce)` that disables it outright.

### Taste
- **No converged generic identity** — banned in *both* modes: rounded cards everywhere + soft shadows everywhere + symmetric uniform grids + decorative gradients or glass. Use restraint and semantic weight; brand red is reserved for the CTA (see Button) — never decoration, and not the ordinary main action. "Friendly" never means "generic".
- **On operational surfaces, no marketing skeleton** — navbar → centered hero + CTA → KPI widget row → 3-up feature grid → pricing tiers. Lead with information, scan top-left, keep density compact. Whitespace-by-default is an acquisition device, not an operational one.
