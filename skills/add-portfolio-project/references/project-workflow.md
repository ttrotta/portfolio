# Add a Portfolio Project: Repository Reference

Use this file with `../SKILL.md`; verify the source remains authoritative before applying examples.

## File map and schema

- Carousel/detail assets: `public/projects/`. The first `images` entry in `src/data/projectsData.ts` is passed to the carousel card; later entries render the detail gallery/lightbox.
- Registry: `src/data/projectsData.ts`. `Project` requires `id: number`, `slug: string`, `images: string[]`, and `stack: string[]`; `repoUrl` and `liveUrl` are optional strings. Use a unique numeric `id`, a lowercase hyphenated slug, and public-root paths such as `/projects/example.avif`.
- Detail route: `src/app/[lang]/projects/[slug]/page.tsx`. It finds the registry object by slug and reads localized `title` and `description`; an absent project becomes `notFound()`.
- Localized content: `src/dictionaries/en.json` and `src/dictionaries/es.json`, under `projectsData[slug]`. Each entry must contain exactly the consumed fields `title` and `description`; write natural English and Spanish content, respectively.
- Shared page labels: `projectPage` in both dictionaries already supplies back, image, pagination, link, and load-more labels. Add keys there only if the UI gains a new shared label.
- Navigation: `src/components/ui/Navbar.tsx` uses a static `NAV_LINKS` list. Its Projects link resolves to `/${lang}/projects/${projects[0].slug}`; do not add one navigation item per project. Carousel pagination and detail next/previous controls derive from the registry order.

## Required checks

1. Confirm the new card appears in the carousel and its first image loads.
2. Open `/${lang}/projects/<slug>` for both `en` and `es`; check title, description, gallery, stack, repository/site links, and back/navigation behavior.
3. Confirm the localized navbar Projects link still lands on the first registered project.
4. Run `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.
5. If profiling this project, add its slug to the `projects` array in `tests/profile/portfolio-profile.spec.ts`, then run `pnpm run profile --project=desktop-chromium --project=mobile-emulated-pixel-7`; optionally run `pnpm run profile:report`. The profile uses `BASE_URL` or its local `pnpm start` server and asserts successful localized project routes, but does not claim synthetic carousel clicks.
