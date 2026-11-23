# financial-ds-skill

Consumer skill for the **FinancialDS** design system — lets AI coding agents build
UI screens from FinancialDS React components and `--ds-*` tokens.

Install with the skills CLI:

```
npx skills add afkon1974-eng/financial-ds-skill
```

`SKILL.md` carries the hard rules (token-only colors, `--ds-space-*` scale, `--ds-type-*`
text pairs, amounts, status dictionary, error trio, irreversible confirmations, button
intents) and the output contract (a single static-prototype TSX file — see
`example-snapshot.tsx`). `INSTRUCTIONS.md` is a short always-on layer to paste into an
agent's own AGENTS.md / CLAUDE.md / Cursor rules. The sibling files hold the full
conventions, the component catalog (when / not-for / pairs-with / props) and the
machine-readable manifest.

This repository is a **generated mirror** — do not edit: every content file is
overwritten on sync from the source Design-System repository
(`tools/publish-consumer-skill.py`). MIT licensed.
