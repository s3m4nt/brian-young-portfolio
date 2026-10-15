# Drum setup atlas

Live page: https://brianyoung.dev/drums

A setup reference for backline technicians reproducing Brian Young’s drum kit. The page is not linked from the portfolio and uses `noindex, nofollow`; anyone with the URL can view it. It includes reference photos.

## Controls

- Drag the model to orbit. Scroll, pinch, or use + / − to zoom.
- Choose 3D overview, Overhead, Drummer, Front, or Side. Reset restores the overview and zoom.
- Tap an instrument label or choose it in Instrument details. Measurements follow that selection.
- Enable All instruments for a whole-kit comparison.
- Heights, Spacing, Cymbals, Labels, and the 6″ grid can be toggled independently.
- Expand How to use this map for the technician workflow, or View all measurements as data for tables.
- Open a reference photo to enlarge it; close it with the Close image button or Escape.
- Print setup reference expands both guides and the measurement tables before opening the browser print dialog. The current camera view and measurement toggles determine the printed canvas.

Use **Units** to switch all playing heights and horizontal spacing between inches and centimeters. Values use the exact conversion 1 inch = 2.54 cm and metric display rounds to 0.1 cm; this does not imply improved measurement accuracy. Drum/cymbal sizes stay in standard inches. The grid spacing is the same physical distance in either mode. Print uses the selected unit.

## Read the measurements

- **Cyan:** vertical floor-to-edge or floor-to-hoop height. Drum references are the top of the batter-side hoop, not head-center heights. Cymbal references are opposing near/far edges.
- **Yellow:** approximate horizontal center-to-center distance. These are overhead spacing estimates, not diagonal distances between differently elevated surfaces.
- **White crosshairs:** instrument reference centers. Dashed white lines connect them to a common horizontal yellow measurement plane. The bass drum reference is the top midpoint of its batter-side hoop, not the center of the vertical head.
- **Numeric badges:** drawn last, on opaque black backgrounds, above geometry, lines, markers, and instrument labels.
- **Near / far / left / right:** always from the drummer’s seated perspective.
- **Hi-hats:** level, with the bottom cymbal edge at 32¾″ and open top cymbal edge at 34″. These are separate cymbal heights, not a tilt measurement.
- **Throne:** 21″ from the floor to the compressed seat surface, with the drummer seated. Brian sets the throne position.

Height lines collapse when viewed directly overhead; use Side or 3D overview to see them.

## Technician workflow

1. Use Overhead and Spacing to establish drum and cymbal reference centers. Select one instrument at a time for the clearest view.
2. Use Side or 3D overview and Heights to set the near/far hoops and cymbal edges. Set the throne using its compressed, occupied height.
3. For substitute backline hardware, prioritize the playing positions. Straight, boom, and telescoping stands can differ while reproducing the same cymbal centers and edges.
4. Angle the bass drum slightly outward to the drummer’s right, matching the photos. Preserve batter-head and pedal position if a longer shell is supplied; do not match front-hoop placement.
5. Compare photos, check clearances, and have Brian confirm the final playing feel. FoW identifies the audience-facing bass drum head.

## Accuracy and limitations

Heights and sizes were supplied by Brian. Horizontal distances were estimated from above, and positions are reconstructed by triangulation and oriented to the photos. The displayed model is a setup reference, not a surveyed 3D scan. Stands, pedals, kick lift, and exact kick angle are illustrative.

Near/far cymbal heights capture one tilt component. Sideways tilt and exact tilt direction were not fully measured; use the reference photos. Drum lateral tilt is treated as level per Brian’s instruction. Earlier highest-hoop readings differed from subsequent near/far readings; the later near/far values govern the model. The snare’s earlier 25¾″ highest-hoop reading remains documented for review.

The bass drum is **22″ diameter × 14″ depth**. Other drums are 13″ × 9″ rack tom, 16″ × 16″ floor tom, and 14″ × 6½″ Black Beauty snare. Paiste Giant Beat cymbals are 15″ hi-hats, 19″ left, 24″ center-right ride, and 20″ far right.

## Source and local preview

Vanilla HTML, CSS, and JavaScript using Canvas 2D with projected 3D geometry. No atlas dependencies or separate build step.

- `index.html`: markup, CSS, static instructions, and measurements table containers.
- `app.js`: measurements in `kit` and `spans`, reconstructed positions, camera controls, rendering, measurement overlays, badge layer, and photo interactions.
- `photos/`: six final-setup reference images.
- `../../next.config.mjs`: rewrites `/drums` to `/drums/index.html`.

The HTML base URL is `/drums/`, so JavaScript and photos resolve under that path. Preserve the base element, robots metadata, existing route configuration, and photographs when updating the atlas.

From the portfolio root:

```sh
npm run dev
```

Open http://localhost:3000/drums. To test the production build, run `npm run build`, then `npm start` and use the same path. Opening this HTML directly as a local file is not the supported preview because its base URL is `/drums/`.

## Update and deploy

1. Pull the latest repository changes and inspect `git status` before editing.
2. Update the relevant files in `public/drums`. Keep measurement reference definitions consistent with the displayed numbers.
3. Run `node --check public/drums/app.js` and `npm run build`.
4. Preview `/drums`: rotate and zoom, select instruments, test selected/all overlays and camera presets, open photos, and inspect print preview. Check crowded views for legibility.
5. Commit the intended changes and push to `main`. The connected Vercel project deploys automatically.
6. Verify the deployment completes, then check https://brianyoung.dev/drums. Refresh an existing tab to load the updated code.

The separate ChatGPT-hosted atlas is a different deployment. Publishing the portfolio does not automatically update it.
