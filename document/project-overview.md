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

## Maintenance Tips
- Refresh currency providers if rate accuracy becomes critical.
- Monitor Gmail quota/security logs for API emails.
- Use `npm audit` periodically to track dependencies.
- Update hero/gallery imagery seasonally to keep the content fresh for guests.

---
Crafted by **Enginnity** for Sunset Villa’s global clientele. For enhancements, contact the Enginnity team.

