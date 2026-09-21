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

### What I took from it

- Directing worked best in small, specific steps with a visual check after each one. "Make it better" is weak; "the text on the Jos. A. Bank image isn't centered" gets a fix.
- It's fast at the mechanical parts: breakpoints, layout, porting markup to components, consistent spacing.
- It didn't replace judgment. Wording, what to claim, what to leave out, and whether something looks professional stayed with me.
- Some of its suggestions were wrong for this site (the clean, bordered annotation style, for one), and I turned them down. That's the point of staying in the driver's seat.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- CSS Modules, no CSS framework
- `next/font/google`: Space Grotesk (display) and IBM Plex Mono (annotations and metadata)
- `next/image` for thumbnails; native `<dialog>` for the lightbox (Esc to close, focus returns to the thumbnail)

## Structure

```
src/
  app/          layout (next/font, metadata), page, globals.css
  components/   Hero, About, Work, ProjectList, Lightbox, Contact, CopyEmail, Footer
                (each with a CSS Module; only Lightbox, ProjectList and CopyEmail are client components)
  data/         site.ts (name, email, links)  ·  projects.ts (the Selected work entries)
public/images/  hero background, logo, project thumbnails
```

Adding or editing a project is a data change in `src/data/projects.ts`
(drop the image in `public/images/projects/` and reference it there).

## TODO

- Replace the Résumé `#` placeholder in `src/data/site.ts`.
- Add real Open Graph image + `metadataBase` in `src/app/layout.tsx` once the domain is decided.
- Deploy on Vercel.
