# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173
npm run dev -- --host  # expose on LAN (for testing on a phone)
npm run build        # type-check (tsc) + production build to dist/
npm run typecheck    # type-check only (tsc --noEmit)
npm run preview      # serve the production build locally
```

There are no tests or linting configured.

## Releases & deploy

Hosted on Vercel, connected to the GitHub repo (`joaorsouza/botw-tracker`). The Vercel **Production Branch is `release`**, not `main`: pushes to `main` only create preview deployments — production only changes on release. The `release` branch is machine-managed (never check it out or commit to it); it is fast-forwarded to `main`'s state by the release scripts via `git push origin main:release`. To cut a release:

```bash
npm run release        # minor bump (new feature): version+tag+push+promote to production
npm run release:patch  # patch bump (fix)
```

(`npm run build` runs `tsc` first, so type errors block any deploy.) The header version updates automatically from package.json (`__APP_VERSION__`). `SAVE_VERSION` (localStorage schema) is independent of the app version — bump it only on breaking save-format changes (see Persistence below).

## What this is

A 100% progress tracker for Zelda: Breath of the Wild — React 18 + TypeScript (strict) + Vite + Tailwind CSS 3, with `lucide-react` for icons. All user-facing text is in **Brazilian Portuguese**; keep new UI text in Portuguese too.

## Architecture

No routing, no backend, no state library. [src/App.tsx](src/App.tsx) holds all state, persistence, and derived totals; presentational components live in [src/components/](src/components/) (`Section`, `CheckRow`, `SubHeading`, `KorokCounter`, `ProgressBar`, `RegionSection`); game data lives in [src/data/](src/data/) (`gameData.ts` for the 15 main quests/DLC and the `TOTALS` denominators, `regions/` for the 10 region files, Great Plateau included). Shared types (`Region`, `ChecklistItem`, `BoolMap`, `RegionCounts`, `RegionsState`) live in [src/types.ts](src/types.ts).

- **Region data files**: one file per map region (`plateau.ts`, `hateno.ts`, `faron.ts`, `lanayru.ts`, `eldin.ts`, `akkala.ts`, `hebra.ts`, `tabantha.ts`, `gerudo.ts`, `central.ts`), aggregated by `index.ts`. Each exports a `Region`: `{ key, id, name, description, koroksTotal, mapPos?, quests?, towers, shrines, sidequests, extras }` (`mapPos` = game coordinates + zoom used to deep-link the region's koroks on objmap.zeldamods.org), where each list item is a `ChecklistItem` `{ id, name, sub?, detail? }` (detail = walkthrough text in pt-BR; `quests` exists only on the Plateau). `key` is the region's display name AND a localStorage key for korok counters — never rename it. Shrine/side-quest membership follows the game's tower regions; the counts are load-bearing: shrines sum to 120 and side quests to exactly 76 across all files — adding/removing entries breaks the derived totals against the hardcoded denominators.
- **Korok dataset**: [src/data/koroks.ts](src/data/koroks.ts) is GENERATED (do not hand-edit) from objmap.zeldamods.org's datamined `static.json` — all 900 koroks with official community IDs (e.g. `P01`; the letter is the zone), game coordinates, and `map`/`hash` refs used for per-korok objmap deep links (`#/map/z6,x,z?id=MainField,{map},{hash}`). Zone letters map to tracker regions in the generator (P→plateau, D+N→hateno, F+L→faron, Z→lanayru, E→eldin, A→akkala, H→hebra, R+T→tabantha, G+W→gerudo, C+X+K→central).
- **Chest dataset**: [src/data/chests.ts](src/data/chests.ts) is GENERATED (do not hand-edit) from the radar.zeldamods.org API — the 1193 normal-mode overworld chests (`TBox_*` actors, excluding Master-Mode-only and One-Hit-Obliterator chests), keyed by `hash_id`, with translated contents, chest kind, and per-chest objmap deep links. Chests do NOT feed the overall % (they don't count toward the in-game 100%). `CHEST_QUERY_BY_REGION` holds the objmap search that lists a region's chests.
- **State shape**: `mainQuests`, `dlc` — flat `id → bool` maps (legacy `beasts` and pre-rework `mainQuests` ids are migrated into the 15 real main quests on load via `MAIN_QUEST_MIGRATION`/`BEAST_MIGRATION` in gameData.ts); `regions` — `regionId → (itemId → bool)`; `koroks` — `regionId → (korokId → bool)` (the korok checklist, state var `korokChecks`); `chests` — `regionId → (chestHash → bool)` (state var `chestChecks`); `regionCounts` — `regionKey → { koroks }` (manual korok counters, kept as fallback). Checklist item `id`s are the persistence keys — renaming an id silently drops a user's saved progress for that item.
- **Derived totals**: shrine and side-quest totals are computed from checked boxes. Korok count per region is "checklist wins": if any korok is checked in the region's checklist, that count is used; otherwise the manually typed number counts (`effectiveKoroks` in App). `koroksTotal` per region is approximate and superseded by the exact per-region dataset counts shown in the UI.
- **Persistence**: the whole state is serialized to `localStorage` under the key `botw-progress` on every change (guarded by a `loaded` flag so the initial empty state doesn't clobber saved data). Any new state that should persist must be added to both the load and save `useEffect`s. The payload carries `version` (`SAVE_VERSION` in gameData.ts; v1 saves have no version field). Rule for changes: **additive** changes (new state slice, new checklist items) need NO migration — the `|| {}` fallback in the load effect covers them; **breaking** changes (renaming ids, moving/restructuring persisted data) require bumping `SAVE_VERSION` and adding a one-time migration gated on `data.version` in the load effect, translating old keys and deleting them (see `MAIN_QUEST_MIGRATION`/`BEAST_MIGRATION` for the v1→v2 example). Never let a migration run on every load — untranslated legacy keys would re-apply and undo user unchecks.
- **App version in UI**: the header shows `__APP_VERSION__`, injected at build time from package.json via `define` in vite.config.ts (declared in src/vite-env.d.ts). Bump package.json `version` when releasing.
- **Overall % formula**: weighted — shrines 25%, koroks 40%, side quests 15%, main quests 15%, DLC 5% (hardcoded totals: 120 shrines, 900 koroks, 76 side quests).
- **Reusable pieces**: `Section` (collapsible panel), `CheckRow` (checkbox row with optional sub-label and expandable detail text), `RegionSection` (renders one region data file), `KorokCounter` (manual counter input; switches to a read-only checklist-derived count when any korok is checked), `KorokChecklist` (per-region grid of the 900 datamined koroks with objmap deep links), `ChestChecklist` (per-region chest list grouped by map quadrant, with contents and objmap deep links).
