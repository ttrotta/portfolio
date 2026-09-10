# Spec 001 — Lightbulb & Environment Load Optimization

Status: Proposed
Date: 2026-09-10
Scope: `src/components/ui/Background.tsx`, `src/components/lights/Lightbulb.tsx`, `public/models/`, `src/components/ui/Preloader.tsx`

## 1. Problem Statement

When the home page loads, the preloader switch only becomes clickable after a long
wait dominated by assets that are not the 3D model itself. The perceived load time
of the lightbulb experience is unacceptable.

## 2. Measured Evidence

| Asset | Source | Size | Measured timing |
|---|---|---:|---|
| `lightbulb.glb` | `public/models/` (self-hosted) | 0.29 MB | Fast, local origin |
| `dikhololo_night_1k.hdr` | `raw.githubusercontent.com` (external CDN) | 1.7 MB | TTFB 1.57 s, total 1.74 s |
| Duplicated HDR fetches | Playwright profile | 3x per journey | Re-fetched on navigation |

- The GLB contains 8 meshes, 8 materials, no heavy textures, and no animation clips.
  The "heavy model" hypothesis is disproved; the model is NOT the bottleneck.
- `Environment preset="night"` resolves to an external CDN URL. Latency to
  `raw.githubusercontent.com` is high and unstable in the target region (LATAM).
- The preloader enables the switch at `useProgress() === 100`, which includes the
  external HDR. The HDR is ~6x the size of the entire bulb model.
- `Lightbulb` (`useGLTF`, suspends) and `Environment` (HDR loader, suspends) render
  inside the Canvas without a `<Suspense>` boundary, blocking sibling scene content
  (e.g. `Particles`) while loading.

## 3. Root Cause

The long wait is caused by an external, uncached, duplicated HDR download that
blocks both the preloader completion and the whole R3F scene tree — not by the
GLB weight.

## 4. Current Load Flow

```
Page load
  → Preloader mounts, useProgress() tracks DefaultLoadingManager
  → R3F Canvas mounts (Background)
      → Environment preset="night" → fetch HDR from raw.githubusercontent.com   ← SLOW
      → Lightbulb → useGLTF fetch /models/lightbulb.glb                          ← fast
      → Particles blocked until siblings finish (no Suspense boundary)
  → useProgress() === 100 only after CDN HDR arrives
  → User clicks switch → reveal animation
```

## 5. Proposed Changes

### 001.1 — Self-host the environment HDR (high impact, zero visual risk)

Download `dikhololo_night_1k.hdr` into `public/models/` and replace the preset:

```tsx
<Environment files={["/models/dikhololo_night_1k.hdr"]} />
```

- Removes the external CDN latency entirely.
- Served from same origin with immutable caching.
- Eliminates the githack/githubusercontent double-source fetch.
- License: Poly Haven HDRI (CC0), redistribution permitted.

### 001.2 — Add Suspense boundaries inside the Canvas (perceived perf)

Wrap suspending scene subtrees so non-blocking content renders immediately:

```tsx
<Canvas ...>
  <ambientLight />
  <directionalLight />
  <Particles count={quality.particles} />
  <Suspense fallback={null}>
    <Environment files={["/models/dikhololo_night_1k.hdr"]} />
  </Suspense>
  {quality.renderBulb && (
    <Suspense fallback={null}>
      <Lightbulb />
    </Suspense>
  )}
</Canvas>
```

- Particles appear before the bulb/HDR finish.
- Scene no longer blocks as a single unit.

### 001.3 — Preload assets before the switch click (perceived perf)

Start `useGLTF.preload("/models/lightbulb.glb")` and the HDR fetch early (module
scope or on preloader mount, gated by `getRuntimeQuality().preloadBulb`), so both
are warm in cache when `useProgress()` needs them.

- The preloader progress fills from already-in-flight requests.
- No behavior change if assets are already cached.

### 001.4 — (Optional, stage 2) HDR compression or procedural environment

Options, only if 001.1–001.3 do not meet targets:

| Option | Tradeoff |
|---|---|
| Re-encode HDR at lower resolution | Smaller file, slightly duller reflections |
| KTX2/DDS compressed environment | Smaller, needs decoder setup |
| `<Environment>` with `Lightformer`s (procedural) | Zero network bytes, subtle visual change, needs visual review |

## 6. Verification Plan

1. Playwright profile (`pnpm run profile`) before/after:
   - No requests to `raw.githubusercontent.com` or `raw.githack.com`.
   - HDR served once from same origin; cached on repeat navigation.
   - Cold `/en` navigation and long-task metrics compared against baseline.
2. `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` pass.
3. Manual visual check: bulb, glow, particles, and reflections unchanged.
4. Manual check: preloader switch becomes clickable noticeably earlier.

## 7. Out of Scope

- GLB mesh simplification or Draco compression (model is already 0.29 MB).
- Carousel and project-route optimizations (covered by prior work).
- Reduced-motion / constrained-device fallbacks (covered by runtime quality tiers).

## 8. References

- `src/components/ui/Background.tsx` — Environment usage and scene composition.
- `src/components/ui/Preloader.tsx` — `useProgress()` gating of the switch.
- `src/components/lights/Lightbulb.tsx` — `useGLTF` load and preload gating.
- `artifacts/playwright/profile/*.json` — duplicate HDR fetch evidence.
