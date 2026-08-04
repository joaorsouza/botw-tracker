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

## What this is

A 100% progress tracker for Zelda: Breath of the Wild — React 18 + TypeScript (strict) + Vite + Tailwind CSS 3, with `lucide-react` for icons. All user-facing text is in **Brazilian Portuguese**; keep new UI text in Portuguese too.

## Architecture

No routing, no backend, no state library. [src/App.tsx](src/App.tsx) holds all state, persistence, and derived totals; presentational components live in [src/components/](src/components/) (`Section`, `CheckRow`, `SubHeading`, `KorokCounter`, `ProgressBar`, `RegionSection`); game data lives in [src/data/](src/data/) (`gameData.ts` for main quests/beasts/DLC and the `TOTALS` denominators, `regions/` for the 10 region files, Great Plateau included). Shared types (`Region`, `ChecklistItem`, `BoolMap`, `RegionCounts`, `RegionsState`) live in [src/types.ts](src/types.ts).

- **Region data files**: one file per map region (`plateau.ts`, `hateno.ts`, `faron.ts`, `lanayru.ts`, `eldin.ts`, `akkala.ts`, `hebra.ts`, `tabantha.ts`, `gerudo.ts`, `central.ts`), aggregated by `index.ts`. Each exports a `Region`: `{ key, id, name, description, koroksTotal, quests?, towers, shrines, sidequests, extras }`, where each list item is a `ChecklistItem` `{ id, name, sub?, detail? }` (detail = walkthrough text in pt-BR; `quests` exists only on the Plateau). `key` is the region's display name AND a localStorage key for korok counters — never rename it. Shrine/side-quest membership follows the game's tower regions; the counts are load-bearing: shrines sum to 120 and side quests to exactly 76 across all files — adding/removing entries breaks the derived totals against the hardcoded denominators.
- **State shape**: `mainQuests`, `beasts`, `dlc` — flat `id → bool` maps; `regions` — `regionId → (itemId → bool)`; `regionCounts` — `regionKey → { koroks }` (manual korok counters; koroks are the only manually-counted collectible). Checklist item `id`s are the persistence keys — renaming an id silently drops a user's saved progress for that item.
- **Derived totals**: shrine and side-quest totals are computed from checked boxes; korok total sums the manual counters. `koroksTotal` per region is approximate (sources disagree), so inputs cap at 900, not at the region figure.
- **Persistence**: the whole state is serialized to `localStorage` under the key `botw-progress` on every change (guarded by a `loaded` flag so the initial empty state doesn't clobber saved data). Any new state that should persist must be added to both the load and save `useEffect`s.
- **Overall % formula**: weighted — shrines 25%, koroks 40%, side quests 15%, main quests 15%, DLC 5% (hardcoded totals: 120 shrines, 900 koroks, 76 side quests).
- **Reusable pieces**: `Section` (collapsible panel), `CheckRow` (checkbox row with optional sub-label and expandable detail text), `RegionSection` (renders one region data file), `KorokCounter` (manual counter input).
