// Public preview page: loads careers and resources from the database.
(function () {
  const { db, esc, lines, safeUrl, notConfiguredNotice } = window.Hub;

  const careerGrid = document.getElementById("career-grid");
  const resourceGrid = document.getElementById("resource-grid");
  const status = document.getElementById("load-status");
  const search = document.getElementById("career-search");
  const count = document.getElementById("career-count");
  let careers = [];

  function list(items) {
    if (!items.length) return "";
    return "<ul class='detail-list'>" + items.map((i) => `<li>${esc(i)}</li>`).join("") + "</ul>";
  }

  function careerCard(c) {
    const titles = lines(c.entry_titles).slice(0, 2);
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card career-card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="h5 card-title">${esc(c.name)}</h3>
            <p class="card-text text-secondary">${esc(c.tagline)}</p>
            ${titles.length ? `<p class="small mb-3"><span class="fw-semibold">Start as:</span> ${titles.map(esc).join(", ")}</p>` : ""}
            <div class="mt-auto d-flex align-items-center justify-content-between gap-2">
              ${c.median_pay ? `<span class="badge pay-badge">Median pay ${esc(c.median_pay)}</span>` : "<span></span>"}
              <button class="btn btn-outline-primary btn-sm" data-career-id="${c.id}"
                      data-bs-toggle="modal" data-bs-target="#careerModal">Details</button>
            </div>
          </div>
        </article>
      </div>`;
  }

  function renderCareers() {
    const term = (search?.value || "").trim().toLowerCase();
    const shown = careers.filter((c) =>
      !term ||
      [c.name, c.tagline, c.description, c.entry_titles, c.skills].join(" ").toLowerCase().includes(term)
    );
    careerGrid.innerHTML = shown.length
      ? shown.map(careerCard).join("")
      : `<div class="col-12"><p class="text-secondary">No careers match "${esc(term)}".</p></div>`;
    if (count) count.textContent = `${shown.length} of ${careers.length} career paths`;
  }

  function renderResources(rows) {
    resourceGrid.innerHTML = rows.length ? rows.map((r) => `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card resource-card h-100">
          <div class="card-body d-flex flex-column">
            ${r.category ? `<span class="badge category-badge align-self-start mb-2">${esc(r.category)}</span>` : ""}
            <h3 class="h6 card-title">${esc(r.name)}</h3>
            <p class="small card-text">${esc(r.description)}</p>
            ${r.eligibility ? `<p class="small text-secondary mb-1"><span class="fw-semibold">Who:</span> ${esc(r.eligibility)}</p>` : ""}
            ${r.how_to_get ? `<p class="small text-secondary"><span class="fw-semibold">How:</span> ${esc(r.how_to_get)}</p>` : ""}
            ${r.url ? `<a class="mt-auto small fw-semibold" href="${esc(safeUrl(r.url))}" target="_blank" rel="noopener">Official page &rarr;</a>` : ""}
          </div>
        </article>
      </div>`).join("")
      : `<div class="col-12"><p class="text-secondary">No resources yet.</p></div>`;
  }

  function fillModal(id) {
    const c = careers.find((x) => String(x.id) === String(id));
    if (!c) return;
    document.getElementById("careerModalLabel").textContent = c.name;
    document.getElementById("careerModalBody").innerHTML = `
      <p>${esc(c.description)}</p>
      <div class="row g-4">
        <div class="col-md-6">
          <h3 class="h6">A typical week</h3>${list(lines(c.weekly_tasks))}
          <h3 class="h6">Entry-level titles</h3>${list(lines(c.entry_titles))}
          <h3 class="h6">Leads to</h3>${list(lines(c.leads_to))}
        </div>
        <div class="col-md-6">
          <h3 class="h6">Skills to build</h3>${list(lines(c.skills))}
          <h3 class="h6">Certifications you can start now</h3>${list(lines(c.certs_now))}
          ${lines(c.certs_later).length ? `<h3 class="h6">Later in your career</h3>${list(lines(c.certs_later))}` : ""}
        </div>
      </div>
      ${c.outlook_occupation ? `
      <div class="outlook-box mt-3">
        <p class="mb-1"><span class="fw-semibold">Job outlook (${esc(c.outlook_occupation)}):</span>
          ${c.growth ? `growth ${esc(c.growth)} (2025&ndash;35)` : ""}${c.median_pay ? `, median pay ${esc(c.median_pay)}` : ""}.
          ${c.outlook_url ? `<a href="${esc(safeUrl(c.outlook_url))}" target="_blank" rel="noopener">BLS source</a>` : ""}</p>
        ${c.ai_note ? `<p class="mb-0 small"><span class="fw-semibold">AI and this career:</span> ${esc(c.ai_note)}</p>` : ""}
      </div>` : ""}
      ${c.starter_project ? `<p class="mt-3 mb-0"><span class="fw-semibold">Try this first:</span> ${esc(c.starter_project)}</p>` : ""}`;
  }

  async function load() {
    if (!db) {
      notConfiguredNotice(status);
      careerGrid.innerHTML = resourceGrid.innerHTML = "";
      return;
    }
    const [cRes, rRes] = await Promise.all([
      db.from("careers").select("*").order("sort_order").order("name"),
      db.from("resources").select("*").order("sort_order").order("name"),
    ]);
    if (cRes.error || rRes.error) {
      window.Hub.showAlert(status, "danger",
        "Couldn't load content: " + (cRes.error || rRes.error).message);
      return;
    }
    status.innerHTML = "";
    careers = cRes.data;
    document.getElementById("career-total").textContent = careers.length;
    renderCareers();
    renderResources(rRes.data);
  }

  search?.addEventListener("input", renderCareers);
  document.getElementById("careerModal")?.addEventListener("show.bs.modal", (e) => {
    fillModal(e.relatedTarget?.getAttribute("data-career-id"));
  });
  load();
})();
