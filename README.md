# Centex Insurance Solutions

A responsive Next.js 16 website using the App Router, TypeScript, React, and Lucide icons. It includes a homepage, seven coverage pages, a quote selector, a client center, and website information.

## Run locally

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. Use `pnpm build` to generate the deployable static site in `out/`, then `pnpm start` to preview the exported production site. This project uses static export; the start script serves the built files using the included Node.js static server.

## Edit

- Agency information and coverage content: `src/lib/content.ts`
- Homepage: `src/app/page.tsx`
- Styling and responsive layout: `src/app/globals.css`
- Shared navigation and footer: `src/components/`

## Connected services

The quote selector links to Centex’s existing quote service for personal auto, home, and renters inquiries; other coverage choices link to the existing contact page. Existing customer portal and carrier directory links are preserved. No quote is submitted, email sent, or insurance coverage bound by interacting with this local website. A future first-party form would need an approved submission endpoint and agency privacy wording.

Business information was verified from https://www.centexis.com/ and its About, Contact, Compare Quotes, Client Center, and Contact Your Carrier pages on October 8, 2026. Coverage examples are general discussion topics and must be confirmed by the agency before public launch. There are no fabricated reviews, pricing, savings, or ratings.

Photography: Austin skyline by Justin Wallace, https://unsplash.com/photos/a-city-skyline-at-sunset-cB_LQ6NGkq4, used under the Unsplash license. The photograph is decorative regional imagery, not the agency’s office. Carrier names are text treatments rather than official logos. The Centex brand mark is a new design concept.

Fonts: DM Sans and Manrope from Google Fonts. Typography falls back to Arial if external fonts are unavailable.

## Validate

```sh
pnpm typecheck
pnpm build
```

Sites hosting configuration lives in `.openai/hosting.json`. Do not commit credentials or environment secrets.
