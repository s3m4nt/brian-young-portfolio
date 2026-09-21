# BRIAN YOUNG

Software Developer | Frontend Specialist

Personal site: kinetic type, selected work, and a short bio. Built with Next.js (App Router), React, and TypeScript. Based in Los Angeles.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- CSS Modules (no CSS framework)
- `next/font/google`: Space Grotesk (display), IBM Plex Mono (annotations and metadata)
- `next/image` for project thumbnails; native `<dialog>` for the lightbox (Esc to close, focus returns to the trigger)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Structure

```
src/
  app/          layout, metadata, page, globals.css
  components/   Hero, About, Work, ProjectList, Lightbox, Contact, CopyEmail, Footer
  data/         site.ts · projects.ts
public/images/  hero, logo, project thumbnails
public/resume/  PDF résumé
```

Project entries live in `src/data/projects.ts`. Drop a thumbnail in `public/images/projects/` and reference it there.

Only `Lightbox`, `ProjectList`, and `CopyEmail` are client components.

## Contact

- Email: [bdy-dev@proton.me](mailto:bdy-dev@proton.me)
- LinkedIn: [linkedin.com/in/brian-d-young](https://www.linkedin.com/in/brian-d-young/)
- GitHub: [github.com/s3m4nt](https://github.com/s3m4nt)
