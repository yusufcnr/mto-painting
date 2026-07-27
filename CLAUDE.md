# MTO Painting — Project Notes

Static HTML/CSS/JS site for a painting company, deployed via GitHub Pages
at `mtopainting.com` (repo: `yusufcnr/mto-painting`, branch `main`, no
staging — pushes to `main` go live in ~1-2 min after a Pages rebuild).

Check build status: `gh api repos/yusufcnr/mto-painting/pages/builds/latest --jq '.status'`

## Done so far

- **Contact form crash fixed** — `.form-success`/`.form-error` live outside
  `<form id="contact-form">` in `contact.html`, but `js/main.js` looked them
  up with `form.querySelector(...)` (only searches inside the form) → `null`
  → crash on `null.style`. Fixed to `document.querySelector(...)`.
- **SSL cert fixed** — GitHub had never actually issued a cert for the
  custom domain despite correct DNS (site was serving the generic
  `*.github.io` wildcard cert, browsers threw a hard warning). Fixed by
  removing and re-adding the custom domain via `gh api -X PUT repos/.../pages`
  (this is what triggers GitHub to redo domain verification + cert
  issuance). "Enforce HTTPS" is now on.
- **Hero photos added** (`images/hero/*.jpg`, 6 files) — free-license Pexels
  stock photos, since these are generic/illustrative banners.
- **Hero text readability fix** (`css/style.css`) — real `<img>` hero photos
  are opaque children painted on top of `.hero`'s own darkening gradient
  background, which hid it and made white text unreadable over busy photos.
  Added a dedicated `.hero::after` overlay layer + text-shadow.
- **Service card photos added** (`images/services/*.jpg`, 7 files) — same
  reasoning as hero, generic/illustrative, stock is fine. Cropped to 4:3.
- **Real customer reviews added** — Home page "Customer Reviews" section
  now shows 6 real 5-star Thumbtack reviews (picked from 26 total, for
  variety + similar length so the grid isn't lopsided). Source screenshots
  are in `reviews/` (gitignored, not committed — just working material, the
  quotes are already in `index.html`). No city shown per reviewer since the
  screenshots don't include one — didn't want to invent one for real people.

## Deliberately NOT using stock photos for

`images/gallery/*` (13 files) and `images/about/*` (3 files, incl.
`team-photo.jpg`) plus `images/og/og-cover.jpg` — these represent MTO's own
completed work and actual team, so a stock photo there would misrepresent
things to customers. Left as placeholders (see `IMAGES.md` for exact
filenames) until the user provides real photos. **User said they'll provide
gallery photos later — check if `images/gallery/` has been filled in before
assuming it's still pending.**

## How the image system works

`<img>` tags already have their final `src="images/..."` path hardcoded.
If the file doesn't exist (404), `js/main.js`'s `initImagePlaceholders()`
catches the `error` event and swaps in a styled placeholder box — no broken
image icons. Drop a correctly-named file into the right folder and it just
works, zero code changes needed. Full filename list in `IMAGES.md`.

## Other context

- Formspree endpoint `https://formspree.io/f/xpqvoolq`, account under
  `hello@mtopainting.com` (Zoho Mail). Zoho auto-sorts Formspree's emails
  into a "Notifications" tab instead of the main inbox (Zoho's own
  categorization, not a bug) — user was advised to add a Zoho filter, not
  something I can fix from the repo.
- Git workflow used all session: commit directly to `main`, push straight
  to `origin` (no PR/branch flow) — `git pull --rebase` first if push is
  rejected (GitHub Pages settings changes, like the CNAME fix, create
  automatic commits on the remote).
- `gh` CLI is authenticated as `yusufcnr` with repo scope — used directly
  for GitHub Pages API calls (domain/cert fixes, build status checks).
