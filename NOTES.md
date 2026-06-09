# Notes: my design log

**Live URL (Vercel):** _paste your deployed link here_

> Fill in each section as you build. Keep it short and honest. We grade the
> reasoning, not the word count. Delete these quote lines as you go.

## 1. Route and storage choice

- What route did you create for the payment page, and why that name/location?
- Where did you store the "this user is premium" flag (`localStorage`,
  `sessionStorage`, a cookie, something else)?
- Why that one? What would have broken or felt wrong with the alternatives?

## 2. Server vs Client Components

- List the components/files you touched. For each, mark it **Server** or
  **Client**.
- Which ones were *forced* to be Client Components, and what forced them?
  (state, event handlers, browser-only APIs like `localStorage`...)
- What did you gain by keeping the rest on the server?

## 3. The first-render problem

- Did you hit a hydration mismatch or a "localStorage is not defined" error?
  Describe what happened.
- How did you fix it? (e.g. render a known state first, then read storage after
  the component mounts.)
- How do you know it's actually fixed? (what you checked in the console/UI)

## 4. How the pieces connect

- Walk through one full flow in 2-3 sentences: user submits the form, then what
  happens, ending with the ads disappearing and staying gone after a refresh.

## 5. If I had another hour

- One thing you'd change, add, or clean up, and why.
