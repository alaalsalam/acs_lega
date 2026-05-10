# ACS Legal

Premium Frappe + React website scaffold for ACS Legal.

## Stack

- Frappe app backend with public guest APIs.
- React + Vite frontend.
- CSS foundation prepared for a premium Arabic/English legal identity.
- SEO-first static shell with Organization, LegalService, and WebSite schema.

## Build

```bash
cd frontend
npm install
npm run build
```

The production build is written to `acs_legal/public/frontend`.

## Frappe routes

The React app is served from:

- `/`
- `/services`
- `/services/:slug`
- `/articles`
- `/articles/:slug`
- `/contact`
- `/en`

All routes are handled by `acs_legal.renderer.ACSLegalRenderer`.
