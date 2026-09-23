# Brian Young — Portfolio

My portfolio site: a kinetic-type design built with Next.js (App Router), React, and TypeScript.

## About this build

I've been building production frontends for over ten years, and I could have hand-built this site. I chose not to, on purpose. I used it as a real project to find out what Claude can do when it's given actual design and engineering work, not a toy prompt.

The question I wanted to answer: **how far can an AI collaborator go on a real frontend project when I direct it like a junior teammate and review everything it produces?**

### How the work was split

**Mine: direction, taste, and content**

- The creative direction: bold, artistic, kinetic type, and deliberately *not* the polished "AI-forward" look.
- All copy, project selection, and the facts: my roles, the stacks, the official spellings of technologies and project names.
- Decisions on every trade-off: no links for sites that have since been redesigned, keeping the annotation tags "clunky" so they read as annotation and not design, and how the Men's Wearhouse / Jos. A. Bank work is presented.
- Review. I caught the things that make a page look unprofessional (an off-center image, a broken mobile layout, tech tags that were identical in size and color to the descriptions) and sent them back.

**Claude's: production**

- The initial page: a single-file HTML prototype, iterated in conversation.
- Layout work: the Selected work grid, tablet and mobile breakpoints, and the native `<dialog>` lightbox.
- The thumbnail for the Men's Wearhouse / Jos. A. Bank entry: my real screenshots composed into mocked browser windows and annotated.
- The port from the single-file prototype to this Next.js project.

### The process

1. **Prototype as one file.** I iterated on the design as a single self-contained HTML page. It's fast to change and easy to review, so design questions were settled before any framework was involved.
2. **Fix what's wrong.** The first mobile pass hid the project thumbnails entirely. I flagged it and the layout was reworked so thumbnails stay visible and remain the tap target for the lightbox.
3. **Compose the hardest asset in rounds.** The Men's Wearhouse / Jos. A. Bank thumbnail went through several rounds: side-by-side windows, then a centered layout after I spotted the text was pushed off-center, then a final overlapping 16:9 composition so it matches the height of the other thumbnails.
4. **Port to Next.js.** The prototype's structure became typed data (`src/data/`) plus small components with CSS Modules. Only the parts that need the browser (the lightbox, the project list state, copy-to-clipboard) are client components.
5. **Polish.** Role lines, thumbnail sizing, spacing consistency across breakpoints, and a note on the Promo entry that the live sites have changed since the screenshots were taken.
6. **Tests and accessibility.** Vitest specs for the data, the lightbox, copy-to-clipboard, and the home page. Lighthouse (axe-core) against the running site; muted type on the gold band was darkened so those labels meet WCAG AA contrast.
7. **Live weather in the footer.** A small Open-Meteo fetch on the server (no API key, revalidate every 30 minutes) maps WMO weather codes to an icon and shows Malibu in °F after the copyright. If the request fails, the copyright still renders and the weather line is omitted.

### Claude tools used

The build touched several parts of Claude, not just a chat window:

- **Claude (Cowork) as the working environment.** One long-running session handled the design iteration, the port, and the file work.
- **Published Artifacts** for the prototype. The design lived as a hosted page that was republished after each round of changes, so I could review the real thing on desktop and phone instead of reading code.
- **The built-in browser**, to look at the live Men's Wearhouse and Jos. A. Bank sites while choosing what to feature.
- **Code execution in a sandbox**, to generate the composite thumbnail (image cropping and SVG layout) and to render screenshots at desktop, tablet and phone widths to check layouts and catch overflow.
- **Direct access to my project folder**, to scaffold this repo alongside my old portfolio without touching it, and to apply later edits in place.

### What I took from it

- Directing worked best in small, specific steps with a visual check after each one. "Make it better" is weak; "the text on the Jos. A. Bank image isn't centered" gets a fix.
- It's fast at the mechanical parts: breakpoints, layout, porting markup to components, consistent spacing.
- It didn't replace judgment. Wording, what to claim, what to leave out, and whether something looks professional stayed with me.
- Some of its suggestions were wrong for this site (the clean, bordered annotation style, for one), and I turned them down. That's the point of staying in the driver's seat.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000 — local work only
npm run build        # production build
npm run typecheck
npm run test         # Vitest + Testing Library
npm run test:watch
npm run lighthouse   # production build on :3001, then Lighthouse
```

Always score Lighthouse against a production build. `next dev` compiles on request and ships unminified JS, so Performance lands around **40** even when the same page is in the **90s** after `next build`. `npm run lighthouse` builds, serves `:3001` (so it does not collide with `next dev` on `:3000`), then opens the report. Extra flags pass through:

```bash
npm run lighthouse -- --only-categories=accessibility
```

## Unlisted

This site is **not meant to rank**. `layout.tsx` sends `noindex, nofollow`, and `robots.ts` disallows `/`, so it only reaches people who have the URL.

Lighthouse SEO assumes you want Google to list the page, so **Page is blocked from indexing** will fail and the SEO category will sit around **50–60**. That fail is the setting working, not a bug. Do not remove `noindex` to chase a 100. Performance, Accessibility, and Best Practices are the scores that matter here.

## Tests

Specs live in `src/__tests__/` (Vitest, jsdom, Testing Library). They cover the parts that would actually break a recruiter's pass over the page:

- **Data.** Project ids are unique; titles, roles, tags, and image metadata are present; thumbnail files and the résumé PDF exist on disk; live project links are `https`.
- **Copy email.** Click copies the address and shows `copied!`; a clipboard failure shows `copy failed`.
- **Selected work.** The list renders roles, tags, and optional links; a thumbnail opens the lightbox `<dialog>`.
- **Footer weather.** A successful forecast shows an icon and temperature with a `Malibu, CA` title; a failed request leaves the copyright and hides the weather.
- **Home page.** Hero, About, Work, and Contact are present, with GitHub, LinkedIn, and résumé hrefs.

jsdom cannot fully prove native `<dialog>` keyboard behavior (Escape to close, focus returning to the thumbnail). That is a Chrome check, not a unit test.

## Accessibility

Automated checks are Lighthouse's Accessibility category (axe-core) on a **production** build (`npm run lighthouse -- --only-categories=accessibility`). The page is aimed at **WCAG AA**.

The only automated fail on the first pass was contrast on the gold About/Contact band: 13px muted labels at 60% ink on `#f3bb2d` were **4.1:1** (AA needs **4.5:1**). Those labels — About, Get in touch, click to copy — now use 75% ink. Re-run the Lighthouse command above after visual changes.

Lighthouse does not score keyboard flow. The lightbox still relies on native `<dialog>` for focus trapping, Escape, and returning focus to the thumbnail.

## Live weather

The footer is an async Server Component. It asks [Open-Meteo](https://open-meteo.com/) for Malibu (`34.0259, -118.7798`) — same coordinates as a prior Next.js project of mine — and caches the response for 30 minutes (`fetch` + `next: { revalidate: 1800 }`).

WMO `weather_code` values map to a short icon set (clear, partly cloudy, overcast, rain, snow, showers, thunder). Temperature is rounded °F. There is no client JavaScript and no API key. A failed or non-OK response is swallowed so the page never depends on a third party to ship.

That is the kind of detail I care about on production frontends: a small live data path, explicit caching, and a defined empty state.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- CSS Modules, no CSS framework
- Vitest, Testing Library, jsdom
- Lighthouse / axe-core for accessibility (WCAG AA contrast on the gold band)
- `next/font/google`: Space Grotesk (display) and IBM Plex Mono (annotations and metadata)
- `next/image` for thumbnails; native `<dialog>` for the lightbox (Esc to close, focus returns to the thumbnail)
- Open-Meteo (server `fetch`, 30-minute revalidate) for the footer weather icon

## Structure

```
src/
  app/          layout (next/font, metadata), page, globals.css
  components/   Hero, About, Work, ProjectList, Lightbox, Contact, CopyEmail, Footer
                (CSS Modules; Lightbox, ProjectList and CopyEmail are client components.
                 Footer is an async Server Component: Open-Meteo weather after the copyright)
  data/         site.ts (name, email, links)  ·  projects.ts (the Selected work entries)
  __tests__/    Vitest specs: project/site data, CopyEmail, Lightbox, ProjectList, Footer, home page
public/images/  hero background, logo, project thumbnails
public/resume/  PDF résumé
```

Adding or editing a project is a data change in `src/data/projects.ts`
(drop the image in `public/images/projects/` and reference it there).
