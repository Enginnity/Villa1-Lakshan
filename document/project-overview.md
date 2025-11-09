# Sunset Villa Galle Fort – Project Overview

## About the Project
Sunset Villa is a luxury accommodation landing site tailored for Galle Fort, Sri Lanka. The site targets international visitors by showcasing curated villa experiences, live USD↔LKR pricing, and concierge-first contact flows. The UI embraces premium travel aesthetics with immersive imagery, parallax hero, and scroll-triggered animations.

## Feature Highlights
- **Hero storytelling** – Parallax background, Galle-specific copy, contextual call-to-action.
- **Localized content** – About, attractions, and gallery content rewritten for the Galle Fort locale.
- **Rooms & pricing** – Canonical USD prices with real-time LKR conversion, secondary currency display, and amenities.
- **Live currency toggle** – Flag-based selector with global state, caching, and fallback rates.
- **Mobile-first navigation** – Animated hamburger drawer, fixed header, inline currency toggle, WhatsApp float button.
- **Gallery lightbox** – Scroll animations, zoomable modal viewer.
- **Reviews & social proof** – Curated testimonials with consistent styling.
- **Contact & booking** – Streamlined inquiries, phone/WhatsApp field, loader UX, auto-dismiss success message, and Nodemailer integration with guest auto-reply.

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript + React
- **Styling**: Tailwind CSS (custom palettes, animations)
- **Email**: Nodemailer via Next API route on Node runtime
- **Build tooling**: PostCSS, Vercel Analytics stub

## Currency System
- Source: Internal API `GET /api/exchange-rate` with cascading providers (ExchangeRate Host → Open ER → Fawaz Ahmed CDN → static fallback).
- Client: `CurrencyProvider` context fetches hourly, persists rate & preference in `localStorage`, supports USD/LKR switch with formatted output and stale rate messaging.
- UI: Reusable `CurrencySelector` component featuring flag avatars and animated dropdown.

## Contact Workflow
1. Form submission POSTs to `/api/contact`.
2. Server validates payload, sends summary email to `EMAIL_USER` via Gmail.
3. Guest receives automated confirmation email acknowledging inquiry.
4. Client shows loader, inline success or error banner; success hides after 5 seconds.

## Environment Variables
Create a `.env.local` (never commit) with:
```
EMAIL_USER=enginnity@gmail.com
EMAIL_PASS=vahq mwtj rrzf mtcr
```
> Gmail may require an app password and “Less secure app access” or OAuth configuration.

## Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Deployment Notes
- Recommended host: **Vercel** (import repo, add environment variables, deploy).
- For Node/VPS deployments run:
  ```bash
  npm install
  npm run build
  npm run start
  ```
- Ensure Node runtime functions stay on server (already declared via `export const runtime = "nodejs"`).

## Assets & Imagery
Public images highlight Galle Fort, Rumassala, Mirissa, and curated villa interiors. Two custom flag assets (`flag-us.png`, `flag-sri-lanka.png`) power the currency selector.

## Application Map

### Pages & Layout
- `app/layout.tsx` – Root layout, font setup, metadata, Vercel analytics.
- `app/page.tsx` – Main landing page composing navigation, hero, content sections, footer, and WhatsApp button within `CurrencyProvider`.

### API Routes
- `app/api/contact/route.ts`
  - `POST` handler validates inquiry payload, sends admin email, then awaits guest confirmation email.
- `app/api/exchange-rate/route.ts`
  - `GET` handler fetches live USD→LKR rate via multiple providers with graceful fallback.

### Core Components
- `components/navigation.tsx` – Responsive nav bar with desktop menu, animated mobile drawer, currency selector integration.
- `components/currency-selector.tsx` – Flag-based dropdown with outside-click handling and animated listbox.
- `components/currency-provider.tsx` – Context provider exposing `currency`, `formatPrice`, `convertToLKR`, `toggleCurrency`, and rate state.
- `components/hero.tsx` – Parallax hero banner with primary CTAs.
- `components/about.tsx` – Galle Fort story section with highlights grid.
- `components/rooms.tsx` – Room catalog with currency-aware pricing, amenity list, stale-rate notice.
- `components/gallery.tsx` – Photo grid with scroll animations and lightbox viewer.
- `components/reviews.tsx` – Guest testimonials with star ratings.
- `components/attractions.tsx` – Nearby experiences grid.
- `components/contact.tsx` – Contact/booking form with loader, success auto-dismiss, error states.
- `components/footer.tsx` – Single-line copyright and Enginnity credit.
- `components/whatsapp-button.tsx` – Floating WhatsApp quick-action button.

### Hooks & Utilities
- `hooks/use-mobile.ts`, `components/use-mobile.tsx` – Responsive helper for UI library.
- `hooks/use-toast.ts`, `components/use-toast.ts` – Toast utilities from UI kit.
- `lib/utils.ts` – Shared helpers (class name merging, etc.).

### UI Library (Shadcn-Based)
Reusable elements under `components/ui/` such as `button`, `dialog`, `accordion`, `carousel`, `tabs`, etc., available for future expansion (current pages use a subset directly).

### Context Functions (from `CurrencyProvider`)
- `formatPrice(usdAmount, options)` – Returns formatted string in active currency.
- `convertToLKR(usdAmount)` – Converts USD value using cached rate.
- `toggleCurrency()` / `setCurrency(code)` – Switch active currency.
- State values: `currency`, `rate`, `isLoading`, `isStale`, `error`, `lastUpdated`.

### Feature Checklist
- ✅ Parallax hero, scroll-triggered fades, animated mobile drawer.
- ✅ Live USD↔LKR conversion with caching & fallback.
- ✅ Flag-based currency toggle (desktop + mobile header).
- ✅ Responsive rooms grid, gallery lightbox, testimonials, attractions.
- ✅ Contact form: phone field, loader, inline success/error, Nodemailer admin + guest email.
- ✅ Floating WhatsApp contact, footer attribution, Vercel analytics hook.

## Maintenance Tips
- Refresh currency providers if rate accuracy becomes critical.
- Monitor Gmail quota/security logs for API emails.
- Use `npm audit` periodically to track dependencies.
- Update hero/gallery imagery seasonally to keep the content fresh for guests.

---
Crafted by **Enginnity** for Sunset Villa’s global clientele. For enhancements, contact the Enginnity team.

