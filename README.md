# Aiswarya & Amal Raj

Premium Kerala wedding invitation built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion.

## Develop

Run `npm ci` and `npm run dev`. On Windows use `npm.cmd` if PowerShell blocks npm scripts. `npm run typecheck` checks types; `npm run build` creates a static deployment in `out/`.

## Personalise

`src/config/wedding.ts` holds the names, Malayalam text, dates, timezone, venues, invitation wording, original invitation link and site URL. Ceremony begins January 9, 2027 at 11:30 AM IST. Reception begins January 8 at 4 PM IST. Set verified `mapsUrl` values to display directions links. No map coordinates or unverified family/address transcriptions are used. Guests can read those details in the linked original invitation image.

Calendar links and downloads derive from the central configuration through `src/lib/calendar.ts`. Downloads use UTC instants equivalent to the IST ceremony window; Google Calendar explicitly uses Asia/Kolkata. The countdown switches to a celebration message at the ceremony start.

The original uploaded photographs remain intact but are not displayed as a gallery. The original invitation is linked in the Our Invitation section. The page uses lightweight SVG botanical, Ganesha and Kerala lamp motifs, reduced-motion support, visible keyboard focus, responsive layouts and semantic sections.

Fonts load from Google Fonts with system fallbacks. The 1200×630 sharing preview is `public/opengraph-image.png`; `scripts/create-preview.cjs` recreates it using the locally available Sharp package. Set the actual site URL before deployment if hosting elsewhere. Sites hosting is private by default; public guest access requires an explicit access change.

Validation: production static build and TypeScript check pass. Browser visual QA has not been completed.
