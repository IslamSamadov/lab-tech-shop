# Lab: Pay to make the ads go away

<img src="./public/main.png" width=600 />

## Introduction

This time you are not fixing someone else's mess. You are _monetizing_ one.

You've inherited **TechCart**, a small online shop that sells gadgets. The shop
works fine. The problem is the ads: a scrolling banner glued to the top and a
blinking "CONGRATULATIONS! 🎉" card that follows you around the bottom-right
corner of every page. They are obnoxious. That is on purpose.

Your job is to build the thing that makes them stop: a **Premium** page where a
user "pays" (a fake, mock payment with no real money and no real card
processing) and, once they do, the ads disappear. And here is the part that actually matters:
they must **stay** gone, even after the user refreshes the page or closes the
tab and comes back.

This lab is about a skill you'll use constantly on the front end: **keeping a
small piece of state in the browser** and letting the rest of your UI react to
it. You'll also bump straight into the line between Server Components and Client
Components, and learn _why_ it's there.

## The situation

Your product owner told you:

> "The ads pay our bills, but power users hate them, so let's
> sell a way out. Build a Premium page with a payment form. When someone submits
> it, show them a nice 'payment done' message and kill the ads. And I mean kill
> them for good: if they refresh, the ads should still be gone. Figure out how
> to _remember_ that they paid. I want you to understand where that memory lives.
> We'll do a fake payment page to see how it looks before starting the production branch."

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You should see the shop, the top banner, and the
blinking corner ad. Click **"Go Premium"** in the navbar. It tries
to go to `/premium`, which **does not exist yet**, so you get a 404.

Building that page is your first task.

## Your job

There are a few pieces. Build them in this order.

### 1. The Premium / payment page (`app/premium/page.js`)

Create the route the navbar already points at. It holds a **payment form** with,
at minimum:

- Cardholder name
- Card number
- Expiry date
- CVC
- Email

Make the inputs **controlled** (their values live in React state). Handle the
form's submit, but **do not actually send anything anywhere**. This is a mock.
There is no backend, no real charge.

### 2. The confirmation

When the user submits, replace the form with a clear confirmation message,
something like **"✅ Payment complete, ads removed!"**. The user should _know_
it worked.

### 3. Make it stick

A confirmation that vanishes on refresh is useless. Persist a flag in the
**browser** so that "premium account" survives a page reload and a fresh
visit. Decide _where_ in the browser that flag should live, and write it the
moment the payment succeeds.

### 4. Make the ads obey the flag

Open `app/components/AdBanner.js`. Right now it always renders both ads. Change
it so that when the premium flag is set, the ads **do not render at all**. Once
this works, going premium and refreshing should leave you with a clean,
ad-free shop.

### 5. Write your `NOTES.md`

Create a `NOTES.md` at the project root and write a short **design log**. Not an
essay. We grade the _thinking_, not the length. Cover:

- Which route and which browser-storage approach you chose, and why.
- Which of your files/components are Server Components and which are Client
  Components, and advantages of it.
- How you dealt with the first-render problem (see the hints below).
- One thing you'd do differently or add if you had another hour.

### 6. Deploy it to Vercel

Your manager wants to see how this looks before the real production branch, so
ship it. Put the project on **Vercel** and hand over a live URL.

1. Push your code to a **GitHub** repository.
2. Go to <https://vercel.com>, sign in with GitHub, and **Import** that repo.
3. Vercel auto-detects Next.js. You don't need to change any build settings, and
   there are no environment variables for this lab. Click **Deploy**.
4. Wait for the build to finish and open the live URL. Click through the shop,
   go premium, and refresh to confirm the deployed site behaves like your local
   one (the product images already work, the remote host is whitelisted in
   `next.config.mjs`).
5. Put that live URL at the top of your `NOTES.md` so the manager can click it.

## 💡 Think about it

A few nudges, no code:

- **Where does browser memory live?** You need something that survives a
  refresh. `sessionStorage` forgets when the tab closes; `localStorage` doesn't.
  Pick on purpose.
- **Who can read it?** Reading browser storage needs... the browser. Server
  Components render on the server, where there is no `window` and no
  `localStorage`. That tells you which components have to become Client
  Components (`'use client'`), and which can stay on the server.
- **The first-render trap.** The server renders your page _before_ the browser
  has read storage. If a component decides "show ads / hide ads" during that very
  first render, the server and the browser can disagree and React will complain
  about a **hydration mismatch**. A common fix: render one known state first,
  then read storage _after_ the component has mounted, and update from there.

## Checklist before you call it done

✅ `/premium` exists and shows a payment form.
✅ Submitting the form shows a clear "payment done" confirmation.
✅ After submitting, both ads (top banner **and** corner card) are gone.
✅ After a full page refresh, the ads are **still** gone.
✅ The navbar reaches `/premium` from every page.
✅ No errors or hydration warnings in the browser console.
✅ `NOTES.md` is written.
✅ The app is deployed to Vercel and the live URL is in `NOTES.md`.

## If you finish early

- Validate the form (e.g. reject an empty or too-short card number) before
  accepting the payment.
- Add a "Restore ads" / cancel-premium button that clears the flag.
- Offer two plans (monthly / lifetime) and store which one they picked.
- Highlight the active link in the navbar using `usePathname`.
- Show a tiny "Premium ✓" badge in the navbar when the user has paid.

## Key concepts to review

- `localStorage` / `sessionStorage`: reading, writing, and what survives a
  refresh.
- Server Components vs Client Components: what each can and cannot touch.
- The `'use client'` directive and when a component _must_ have it.
- Controlled form inputs and handling `onSubmit`.
- Conditional rendering, and the hydration mismatch that bites you when server
  and client disagree on the first render.
