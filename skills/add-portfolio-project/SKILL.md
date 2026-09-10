---
name: add-portfolio-project
description: "Trigger: add portfolio project, new project, project carousel, project slug. Add and verify a localized portfolio project end to end."
license: Apache-2.0
metadata:
  author: "portfolio-maintainers"
  version: "1.0"
---

## Activation Contract

Load when adding a project to this portfolio's carousel, project detail route, or localized project content.

## Hard Rules

- Inspect current source before editing; preserve the existing numeric ordering, slug, field, JSON, and public-path conventions.
- Add the carousel image and every detail image under `public/projects/`, then reference them as `/projects/<filename>`.
- Register one object in `src/data/projectsData.ts` and matching `<slug>` entries in both locale dictionaries.
- Keep project data and English/Spanish copy synchronized; do not add a slug to only one locale.
- Update `tests/profile/portfolio-profile.spec.ts` when the profile's project route list should cover the new project.

## Decision Gates

| Question | Action |
|---|---|
| Is there a public repository or deployed site? | Add the corresponding optional `repoUrl` or `liveUrl`; omit unavailable links. |
| Does the project need more than the carousel image? | Add detail screenshots to `images`; the first image remains the carousel card. |
| Is the profile route list intended to cover every project? | Add the slug before running the Playwright profile. |

## Execution Steps

1. Follow the exact schema and file map in `references/project-workflow.md`; inspect neighboring entries before editing.
2. Add and validate assets, then register the next unique `id`, slug, image paths, stack, and links.
3. Add English and Spanish `projectsData` entries with identical slug keys and `{ title, description }` fields.
4. Update the profile slug list if applicable. Do not change `NAV_LINKS`: the projects navigation resolves its target from `projects[0]`.
5. Verify the carousel, `/en/projects/<slug>`, `/es/projects/<slug>`, navigation, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, and `pnpm run profile --project=desktop-chromium --project=mobile-emulated-pixel-7` when applicable.

## Output Contract

Return changed files, asset/link decisions, routes checked, commands and outcomes, and any remaining limitation. Do not claim browser interaction coverage when the profile only performs route/status checks.

## References

- `references/project-workflow.md` — repository-verified paths, schema, locale conventions, navigation behavior, and verification commands.
