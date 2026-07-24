/* =========================================================
   MTO Painting — site scripts
   Vanilla JS, no build step. Handles: mobile nav, image
   placeholder fallback, scroll reveal, FAQ accordion,
   gallery filter + lightbox, contact form submit.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initImagePlaceholders();
  initScrollReveal();
  initFaq();
  initGalleryFilter();
  initLightbox();
  initContactForm();
  initYear();
});

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const scrim = document.querySelector(".nav-scrim");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
  };
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
  scrim?.addEventListener("click", close);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

/* ---------- Image placeholder fallback ----------
   Any <img data-fallback="Label" data-file="filename.jpg" class="ph-img">
   swaps to a styled placeholder box if the real file 404s,
   so the site never shows a broken-image icon before photos
   are added. Drop a correctly-named file in /images/... and
   it just works automatically — no code changes needed. */
function initImagePlaceholders() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", () => renderPlaceholder(img), { once: true });
    // If the browser already failed to load before listener attached
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
      renderPlaceholder(img);
    }
  });
}

function renderPlaceholder(img) {
  const label = img.dataset.fallback || "Photo coming soon";
  const file = img.dataset.file || img.getAttribute("src").split("/").pop();
  const div = document.createElement("div");
  div.className = "img-placeholder";
  div.setAttribute("role", "img");
  div.setAttribute("aria-label", label);
  div.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
    <span class="ph-label">${label}</span>
    <span class="ph-file">images/${file}</span>
  `;
  img.replaceWith(div);
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q?.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- Gallery filter ---------- */
function initGalleryFilter() {
  const bar = document.querySelector(".filter-bar");
  const items = document.querySelectorAll(".gallery-item");
  if (!bar || !items.length) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    items.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.style.display = match ? "" : "none";
    });
  });
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;
  const frame = lightbox.querySelector(".frame");
  const caption = lightbox.querySelector(".lightbox-cap");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      frame.innerHTML = item.querySelector(".thumb")?.innerHTML || item.innerHTML;
      caption.textContent = item.dataset.caption || "";
      lightbox.classList.add("open");
    });
  });
  const close = () => lightbox.classList.remove("open");
  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const success = form.querySelector(".form-success");
  const error = form.querySelector(".form-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    success.style.display = "none";
    error.style.display = "none";

    const action = form.getAttribute("action") || "";
    if (action.includes("YOUR_FORM_ID")) {
      // Formspree endpoint not configured yet — see README.md
      error.textContent =
        "This form isn't connected yet. Please call (609) 795-6441 or email hello@mtopainting.com — see README.md to finish setup.";
      error.style.display = "block";
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        success.style.display = "block";
      } else {
        throw new Error("Submit failed");
      }
    } catch (err) {
      error.textContent =
        "Something went wrong sending your message. Please call (609) 795-6441 or email hello@mtopainting.com.";
      error.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/* ---------- Footer year ---------- */
function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
