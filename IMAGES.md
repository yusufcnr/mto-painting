# Image Checklist — MTO Painting Website

The site works fine right now with **no photos** — every image slot shows a
styled navy/gold placeholder box instead of a broken image icon. As soon as
you drop a correctly-named file into the matching folder below, it appears
on the live site automatically. No code changes needed.

**Rules:**
- File names must match exactly (lowercase, hyphens, `.jpg` — `.png`/`.webp` also work if you update the extension in the HTML `src=` and matching `data-file=` attribute).
- Landscape photos work best for every slot on this site.
- Keep individual files under ~500KB where possible (resize/compress before uploading) so pages load fast.

---

## `/images/hero/` — full-width banner photos (recommend 1920×1080 or wider)

| Filename | Used on | Suggested shot |
|---|---|---|
| `hero-home.jpg` | Home | Best exterior "after" shot — freshly painted home |
| `hero-services.jpg` | Services | Painter actively working (roller/brush in action) |
| `hero-gallery.jpg` | Gallery | Wide shot of a standout finished project |
| `hero-about.jpg` | About | Crew or owner on a job site |
| `hero-areas.jpg` | Service Areas | Scenic NJ/PA neighborhood or town shot |
| `hero-contact.jpg` | Contact | Friendly crew photo or a finished front-door/porch shot |

## `/images/services/` — service card photos (recommend 1200×900, 4:3)

| Filename | Service |
|---|---|
| `service-interior.jpg` | Interior Painting |
| `service-exterior.jpg` | Exterior Painting |
| `service-drywall.jpg` | Drywall Repair |
| `service-cabinet.jpg` | Cabinet Painting |
| `service-trim.jpg` | Trim & Molding Painting |
| `service-deck-fence.jpg` | Deck & Fence Staining |
| `service-power-washing.jpg` | Power Washing |

## `/images/gallery/` — project gallery (recommend 1200×900, 4:3)

| Filename | Project |
|---|---|
| `exterior-01-before.jpg` | Featured before/after — BEFORE shot |
| `exterior-01-after.jpg` | Featured before/after — AFTER shot (also used as the Exterior tile) |
| `interior-01.jpg` | Interior project 1 |
| `interior-02.jpg` | Interior project 2 |
| `exterior-02.jpg` | Exterior project 2 |
| `cabinet-01.jpg` | Cabinet project 1 |
| `cabinet-02.jpg` | Cabinet project 2 |
| `drywall-01.jpg` | Drywall project 1 |
| `drywall-02.jpg` | Drywall project 2 |
| `deck-01.jpg` | Deck project 1 |
| `fence-01.jpg` | Fence project 1 |
| `powerwash-01.jpg` | Power washing project 1 |
| `powerwash-02.jpg` | Power washing project 2 |

> Add more gallery photos any time — just copy an existing `<div class="gallery-item">` block in `gallery.html`, give it a new `data-category`, and point it at a new filename.

## `/images/about/` — About & Home page photos (recommend 1200×900, 4:3)

| Filename | Used for |
|---|---|
| `crew-at-work.jpg` | Home "Why Choose Us" section |
| `prep-work.jpg` | Home "Process" section + About "Locally Based" section |
| `team-photo.jpg` | About "Our Story" section — owner or crew portrait |

## `/images/og/` — social share preview

| Filename | Notes |
|---|---|
| `og-cover.jpg` | **1200×630px exactly.** Shown when the site is shared on Facebook/Instagram/iMessage/Slack. Use your best exterior "after" photo with good contrast. |

---

## Also needed eventually

- **Real customer testimonials** — 3 placeholder review cards on the Home page (`index.html`, "Customer Reviews" section) are marked with obvious placeholder text (`"Add a real customer quote here..."`). Swap in real Google/Facebook/Instagram reviews as you collect them — don't leave placeholder text live for long, since fake-looking reviews hurt trust more than none at all.
- A real favicon is already in place (`favicon.svg`, a simple navy/gold wordmark). Replace it later if you commission a full logo.
