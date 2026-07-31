# muja-ui — rules for AI agents

## Git workflow — NEVER push to `main`

- **Direct pushes to `main` are forbidden**, even if your credentials can bypass
  branch protection. Bypassing it breaks the required CI gate and the
  changesets release flow.
- Always: create a feature branch → commit → push the branch → open a pull
  request into `main`.
- The PR must pass the required status check **"Lint, typecheck, test, build"**
  before merging.
- Verify locally first: `pnpm turbo build typecheck test lint`.

## Releases (changesets)

- Never bump package versions or edit `CHANGELOG.md` by hand — add a changeset
  (`.changeset/*.md`) in your PR instead.
- Publishing happens only by merging the bot's **"Version Packages"** PR. Do
  not merge it unless the user explicitly asks for a release.

## Component conventions

- `DESIGN_SYSTEM_BLUEPRINT.md` is the source of truth for architecture and
  roadmap; follow the existing component idiom in `packages/web` (semantic
  HTML, `mj-*` classes + `data-*` selectors in `src/styles.css`, colors only
  via semantic `--mj-*` tokens, a vitest + Testing Library test per component).
- Stateful components ship from the separate `@muja-ui/web/client` entry so the
  main entry stays RSC-safe.
