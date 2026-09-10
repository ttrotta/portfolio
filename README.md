# Portfolio

Hey! Welcome to my personal portfolio. You can check it out live here: [thiagotrotta.vercel.app](https://thiagotrotta.vercel.app/es).

I mainly built this to have a place to show my work and things I've been building, but to be honest, it was also the perfect excuse to experiment with 3D animations and get my hands dirty with GSAP.

I really wanted to play around with bringing static designs to life, so you'll find quite a bit of scroll-based animations and 3D scenes integrated throughout the site.

_Note: I'm constantly working on this project, optimizing performance and adding new things, so it's always evolving!_

## Tech Stack

Here's the main stack I used to put this together:

- **Next.js & React**
- **GSAP** (for all the heavy-lifting animations)
- **Three.js & React Three Fiber** (for the 3D experiments)
- **Tailwind CSS v4** (for styling)
- **Lenis** (for smooth scroll)
- **TypeScript**

## Playwright profiling

Run the deterministic headless profile with `pnpm run profile`, then summarize it with
`pnpm run profile:report`. Headless Chromium may report SwiftShader; that output is
diagnostic and is not hardware-GPU evidence. To attempt headed Chromium with Windows
Direct3D 11 ANGLE, run `$env:PROFILE_HEADLESS="false"; pnpm run profile` in
PowerShell, then remove the variable afterward. The report labels server navigation,
browser emulation, and the qualified GPU attempt separately.
