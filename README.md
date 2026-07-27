# MTO Painting — Website

A fast, static, no-build-step website for MTO Painting (Burlington, NJ — serving NJ & PA).
Plain HTML/CSS/JS — no frameworks, no build tools, works directly on GitHub Pages.

## What's here

```
index.html            Home
services.html          All 7 services (interior, exterior, drywall, cabinet, trim, deck/fence, power washing)
gallery.html            Project gallery with filtering + before/after
about.html               Company story, values
service-areas.html   NJ & PA cities served (50-mile radius of Burlington, NJ)
contact.html           Free estimate form + contact info + map
404.html                    Custom not-found page
css/style.css           All styling (navy & gold design system)
js/main.js               Mobile nav, image-placeholder fallback, FAQ accordion,
                         gallery filter/lightbox, contact form submit
images/                Photo folders — see IMAGES.md for exact filenames
robots.txt, sitemap.xml   Basic SEO
CNAME                       Custom domain config for GitHub Pages (mtopainting.com)
```

## 1. Preview locally

No build step required. Just open `index.html` in a browser, or run a tiny local server
(recommended, so relative paths behave exactly like production):

```bash
cd /path/to/MTO
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 2. Add your photos

The site already looks complete with styled placeholder boxes where photos go.
Open **[IMAGES.md](IMAGES.md)** for the exact list of filenames and folders —
drop a matching file into `images/...` and it appears automatically, no code edits needed.

## 3. Contact form (Formspree — free) — already connected

✅ Done. The form on `contact.html` posts to `https://formspree.io/f/xpqvoolq`,
a Formspree account under `hello@mtopainting.com`. Submissions arrive by email
to that inbox, and are also logged in the Formspree dashboard as a backup.

To manage it later (spam filtering, notification settings, etc.), log into
formspree.io with `hello@mtopainting.com`. If the form ever needs to move to
a different Formspree account, replace the `action` URL in `contact.html`'s
`<form id="contact-form" action="...">` line with the new endpoint.

Until this is done, the form will show a friendly message telling visitors to call
or email directly instead — it won't silently fail.

## 4. Deploy to GitHub Pages

```bash
# from inside this folder
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source → Deploy from branch → `main` / `root`**.

## 5. Connect your custom domain (mtopainting.com)

A `CNAME` file containing `mtopainting.com` is already in the repo root — that's
the GitHub Pages side. You still need to point DNS at GitHub from wherever you
bought the domain:

- **Apex domain (`mtopainting.com`)** — add these 4 `A` records:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- **`www` subdomain** — add a `CNAME` record pointing `www` to `<your-username>.github.io`.

Then in GitHub: **Settings → Pages → Custom domain** → enter `mtopainting.com` → Save,
and check "Enforce HTTPS" once it's available (can take a few hours after DNS propagates).

## 6. Editing content later

Everything is plain HTML — search-and-replace across all 7 pages if you ever need to
change the phone number, email, or hours (they currently appear in the top bar, footer,
and several buttons on every page). No CMS, no database, no build step.

## Notes

- **Testimonials** on the Home page are 6 real Thumbtack reviews (see `reviews/`
  for the full set of 26 — swap in different ones any time by editing the
  "Customer Reviews" section in `index.html`).
- **Service area list** (`service-areas.html`) was generated from a ~50-mile radius
  around Burlington, NJ. Feel free to trim or expand the city list as you learn
  which towns your customers actually come from.
- The site uses Google Fonts (Poppins + Inter) loaded from `fonts.googleapis.com` —
  requires an internet connection to render the exact typeface (falls back to
  system fonts automatically if blocked).
