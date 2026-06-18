# Notes: my design log

**Live URL (Vercel):** _paste your deployed link here after deploying (see README step 6)_

## 1. Route and storage choice

- **Route:** `app/premium/page.js` → `/premium`. The navbar already links here, so I used that path instead of inventing a new one.
- **Storage:** `localStorage` with key `techcart-premium` (value `"true"`).
- **Why localStorage?** Premium must survive a full page refresh and a return visit in the same browser. `sessionStorage` would drop the flag when the tab closes. Cookies would work too, but they add encoding/size rules and are usually for server-readable auth — overkill for a client-only mock payment with no backend.

## 2. Server vs Client Components

| File | Type | Why |
|------|------|-----|
| `app/layout.js` | **Server** | Root layout, fonts, metadata — no browser APIs |
| `app/page.js` | **Server** | Static product grid from data, no interactivity |
| `app/components/Navbar.js` | **Server** | Plain links, no state or events |
| `app/components/AdBanner.js` | **Client** | Must read `localStorage` and react to the premium flag |
| `app/premium/page.js` | **Client** | Controlled form inputs, submit handler, writes to `localStorage` |
| `app/lib/premium.js` | **Shared module** | Helper used only from Client Components |

**Forced Client:** `AdBanner` and the premium page — they need React state, event handlers, and `localStorage`.

**Server kept:** Home page and navbar stay on the server, so product HTML is rendered once without shipping extra client JS for the shop grid.

## 3. The first-render problem

- **Risk:** If `AdBanner` read `localStorage` during the first render, the server would always show ads while the client might hide them → hydration mismatch.
- **Fix:** First render always assumes ads visible (`hideAds = false`). After mount, a `useEffect` reads `localStorage` and updates state. Server and client agree on the first paint.
- **Trade-off:** Premium users may see ads for a split second on refresh before they disappear. Acceptable for this lab.
- **Verified:** No hydration warnings in the browser console; ads stay hidden after refresh when the flag is set.

## 4. How the pieces connect

User fills the form on `/premium` and submits. The handler validates fields, calls `setPremium()` (writes to `localStorage` and dispatches a `premium-changed` event), then shows the confirmation. `AdBanner` listens for that event (and reads storage on mount), sets `hideAds` to true, and unmounts both banners. On refresh, `useEffect` in `AdBanner` reads the same key and keeps ads hidden.

## 5. If I had another hour

Add a "Restore ads" button that clears the flag (useful for testing and demos), a Premium badge in the navbar via a small client wrapper, and `usePathname` to highlight the active nav link.
