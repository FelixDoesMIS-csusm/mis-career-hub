// Shared helpers used by every page.
(function () {
  const cfg = window.APP_CONFIG || {};

  // True once the setup values in config.js have been filled in.
  const configured =
    cfg.SUPABASE_URL && !cfg.SUPABASE_URL.startsWith("PASTE_") &&
    cfg.SUPABASE_KEY && !cfg.SUPABASE_KEY.startsWith("PASTE_");

  const db = configured && window.supabase
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY)
    : null;

  // Escape text before putting it into HTML, so content typed by an admin
  // or a visitor can never run as code (prevents cross-site scripting).
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Turn a "one item per line" text field into an array.
  function lines(value) {
    return String(value ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
  }

  // Only allow http(s) links in href attributes.
  function safeUrl(value) {
    try {
      const u = new URL(value);
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "#";
    } catch { return "#"; }
  }

  // Show a Bootstrap alert inside an element.
  function showAlert(el, type, message) {
    if (!el) return;
    el.innerHTML = `<div class="alert alert-${type} mb-0" role="alert">${esc(message)}</div>`;
  }

  function notConfiguredNotice(el) {
    showAlert(el, "warning",
      "Not connected to the database yet. Open js/config.js and paste your Supabase URL and publishable key (setup guide, step 4).");
  }

  // Fill footer and contact details from config.js.
  function fillContactDetails() {
    document.querySelectorAll("[data-contact-email]").forEach((a) => {
      a.textContent = cfg.CONTACT_EMAIL;
      a.href = "mailto:" + cfg.CONTACT_EMAIL;
    });
    document.querySelectorAll("[data-instagram]").forEach((a) => (a.href = safeUrl(cfg.INSTAGRAM_URL)));
    document.querySelectorAll("[data-linkedin]").forEach((a) => (a.href = safeUrl(cfg.LINKEDIN_URL)));
    document.querySelectorAll("[data-quiz-link]").forEach((a) => (a.href = safeUrl(cfg.QUIZ_URL)));
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  // Show "Admin" vs "Admin login" in the navbar depending on session.
  async function updateNavAuth() {
    const link = document.getElementById("nav-admin");
    if (!link || !db) return;
    const { data } = await db.auth.getSession();
    if (data.session) {
      link.textContent = "Dashboard";
      link.href = "admin.html";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    fillContactDetails();
    updateNavAuth();
  });

  window.Hub = { cfg, db, configured, esc, lines, safeUrl, showAlert, notConfiguredNotice };
})();
