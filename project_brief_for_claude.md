# ACS Legal Design Brief For Claude

## Goal

Build a premium Arabic-first legal website for ACS Legal inside this existing Frappe + React app. Improve visual design without changing the integration contract.

## Hard Constraints

- Keep the Frappe API layer in `frontend/src/api/frappe.ts`.
- Keep backend routes and renderer in `acs_legal/renderer.py`.
- Keep production output in `acs_legal/public/frontend`.
- Preserve Arabic RTL as the primary language.
- Do not replace the app with unrelated frameworks.
- Do not hardcode backend URLs; use `/api/method/acs_legal.api.website...`.
- Keep SEO metadata and JSON-LD in `frontend/index.html` and strengthen it if needed.

## Design Direction

- Premium Saudi legal/compliance identity.
- Serious, calm, high-trust, boardroom-grade.
- Avoid generic landing-page fluff.
- Use dense but elegant sections: services, methodology, insights, contact.
- Make services scannable for business owners and foreign investors.
- Preferred palette: deep ink, warm legal gold, restrained green, porcelain/off-white, small blue accents.
- Avoid a one-color dark-blue theme.

## Expected Output

- Refine components and CSS.
- Keep content structure compatible with `SiteData`.
- Ensure mobile layout is polished.
- Do not remove contact submission.
- Run `npm run build` before handing off.
