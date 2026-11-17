// Admin dashboard: add, edit and delete careers and resources; read and delete messages.
// The database rules (sql/schema.sql) are what actually protect the data.
// This page also checks you are an admin so non-admins see a clear message.
(function () {
  const { db, esc, showAlert, notConfiguredNotice } = window.Hub;
  const status = document.getElementById("admin-status");

  // Which fields each table has, and how to show them in the form.
  const TABLES = {
    careers: {
      singular: "career",
      columns: [["name", "Name"], ["median_pay", "Median pay"], ["sort_order", "Order", "d-none d-sm-table-cell"]],
      fields: [
        { key: "name", label: "Name", type: "text", required: true, maxlength: 120 },
        { key: "tagline", label: "Tagline (one sentence)", type: "text" },
        { key: "description", label: "Description", type: "textarea", rows: 3 },
        { key: "weekly_tasks", label: "A typical week", type: "textarea", help: "One item per line" },
        { key: "entry_titles", label: "Entry-level titles", type: "textarea", help: "One per line" },
        { key: "leads_to", label: "Leads to", type: "textarea", help: "One per line" },
        { key: "skills", label: "Skills to build", type: "textarea", help: "One per line" },
        { key: "certs_now", label: "Certifications to start now", type: "textarea", help: "One per line" },
        { key: "certs_later", label: "Certifications for later", type: "textarea", help: "One per line" },
        { key: "outlook_occupation", label: "BLS occupation", type: "text", half: true },
        { key: "outlook_url", label: "BLS source link", type: "url", half: true },
        { key: "growth", label: "Growth 2025–35", type: "text", half: true, placeholder: "+10%" },
        { key: "median_pay", label: "Median pay", type: "text", half: true, placeholder: "$101,860" },
        { key: "ai_note", label: "AI and this career", type: "textarea", rows: 2 },
        { key: "starter_project", label: "Starter project", type: "textarea", rows: 2 },
        { key: "sort_order", label: "Display order", type: "number", half: true, help: "Lower numbers show first" },
      ],
    },
    resources: {
      singular: "resource",
      columns: [["name", "Name"], ["category", "Category"], ["sort_order", "Order", "d-none d-sm-table-cell"]],
      fields: [
        { key: "name", label: "Name", type: "text", required: true, maxlength: 120 },
        { key: "category", label: "Category", type: "text", half: true, placeholder: "AI, Cloud, Coding..." },
        { key: "sort_order", label: "Display order", type: "number", half: true },
        { key: "description", label: "What students get", type: "textarea", rows: 3 },
        { key: "eligibility", label: "Who is eligible", type: "text" },
        { key: "how_to_get", label: "How to get it", type: "text" },
        { key: "url", label: "Official link", type: "url" },
      ],
    },
  };

  const data = { careers: [], resources: [], messages: [] };
  let editing = { table: null, id: null };
  let pendingDelete = null;

  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
  const editForm = document.getElementById("edit-form");

  // ---------- Access check ----------
  async function start() {
    if (!db) {
      notConfiguredNotice(status);
      return;
    }
    const { data: s } = await db.auth.getSession();
    if (!s.session) {
      window.location.replace("login.html");
      return;
    }
    document.getElementById("signed-in-as").textContent = s.session.user.email;

    const { data: isAdmin, error } = await db.rpc("is_admin");
    if (error || !isAdmin) {
      showAlert(status, "warning",
        "You're signed in, but this account isn't an admin yet. Run sql/make-admin.sql with your email (setup guide, step 6).");
      return;
    }
    document.getElementById("dashboard").hidden = false;
    await Promise.all([loadTable("careers"), loadTable("resources"), loadMessages()]);
  }

  // ---------- Careers and resources ----------
  async function loadTable(table) {
    const { data: rows, error } = await db.from(table).select("*").order("sort_order").order("name");
    if (error) return showAlert(status, "danger", `Couldn't load ${table}: ${error.message}`);
    data[table] = rows;
    renderTable(table);
  }

  function renderTable(table) {
    const cfg = TABLES[table];
    const rows = data[table];
    document.getElementById(`${table}-count`).textContent = rows.length;
    document.getElementById(`${table}-table`).innerHTML = `
      <thead><tr>${cfg.columns.map(([, label, cls]) => `<th scope="col" class="${cls || ""}">${label}</th>`).join("")}
        <th scope="col" class="text-end">Actions</th></tr></thead>
      <tbody>${rows.length ? rows.map((r) => `
        <tr>${cfg.columns.map(([key, , cls]) => `<td class="${cls || ""}">${esc(r[key])}</td>`).join("")}
          <td class="text-end">
            <div class="d-flex flex-column flex-sm-row justify-content-end gap-1">
              <button class="btn btn-sm btn-outline-primary" data-action="edit" data-table="${table}" data-id="${r.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger" data-action="delete" data-table="${table}" data-id="${r.id}">Delete</button>
            </div>
          </td></tr>`).join("")
        : `<tr><td colspan="${cfg.columns.length + 1}" class="text-secondary">Nothing here yet. Click "Add".</td></tr>`}
      </tbody>`;
  }

  function fieldHtml(f, value) {
    const id = `f-${f.key}`;
    const common = `id="${id}" name="${f.key}" class="form-control" ${f.required ? "required" : ""}
      ${f.maxlength ? `maxlength="${f.maxlength}"` : ""} ${f.placeholder ? `placeholder="${esc(f.placeholder)}"` : ""}`;
    const input = f.type === "textarea"
      ? `<textarea ${common} rows="${f.rows || 4}">${esc(value)}</textarea>`
      : `<input type="${f.type}" ${common} value="${esc(value)}">`;
    return `
      <div class="${f.half ? "col-md-6" : "col-12"}">
        <label for="${id}" class="form-label">${f.label}${f.required ? " *" : ""}</label>
        ${input}
        ${f.help ? `<div class="form-text">${f.help}</div>` : ""}
        ${f.required ? `<div class="invalid-feedback">${f.label} is required.</div>` : ""}
      </div>`;
  }

  function openEditor(table, id) {
    const cfg = TABLES[table];
    const row = id ? data[table].find((r) => String(r.id) === String(id)) : {};
    editing = { table, id: id || null };
    document.getElementById("editModalLabel").textContent = `${id ? "Edit" : "Add"} ${cfg.singular}`;
    editForm.classList.remove("was-validated");
    document.getElementById("edit-fields").innerHTML = cfg.fields.map((f) => fieldHtml(f, row[f.key])).join("");
    document.getElementById("edit-status").innerHTML = "";
    editModal.show();
  }

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!editForm.checkValidity()) {
      editForm.classList.add("was-validated");
      return;
    }
    const cfg = TABLES[editing.table];
    const values = {};
    cfg.fields.forEach((f) => {
      const raw = editForm.elements[f.key].value.trim();
      values[f.key] = f.type === "number" ? (raw === "" ? 100 : Number(raw)) : (raw || null);
    });

    const saveBtn = document.getElementById("save-btn");
    saveBtn.disabled = true;
    const query = editing.id
      ? db.from(editing.table).update(values).eq("id", editing.id)
      : db.from(editing.table).insert(values);
    const { error } = await query;
    saveBtn.disabled = false;

    if (error) return showAlert(document.getElementById("edit-status"), "danger", "Save failed: " + error.message);
    editModal.hide();
    showAlert(status, "success", `${cfg.singular[0].toUpperCase() + cfg.singular.slice(1)} ${editing.id ? "updated" : "added"}.`);
    loadTable(editing.table);
  });

  // ---------- Messages ----------
  async function loadMessages() {
    const { data: rows, error } = await db.from("messages").select("*").order("created_at", { ascending: false });
    if (error) return showAlert(status, "danger", "Couldn't load messages: " + error.message);
    data.messages = rows;
    document.getElementById("messages-count").textContent = rows.length;
    document.getElementById("messages-list").innerHTML = rows.length ? rows.map((m) => `
      <article class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-wrap justify-content-between gap-2 mb-2">
            <div><span class="fw-semibold">${esc(m.name)}</span>
              &middot; <a href="mailto:${esc(m.email)}">${esc(m.email)}</a>
              ${m.topic ? `<span class="badge category-badge ms-1">${esc(m.topic)}</span>` : ""}</div>
            <small class="text-secondary">${esc(new Date(m.created_at).toLocaleString())}</small>
          </div>
          <p class="mb-2" style="white-space: pre-line">${esc(m.body)}</p>
          <button class="btn btn-sm btn-outline-danger" data-action="delete" data-table="messages" data-id="${m.id}">Delete</button>
        </div>
      </article>`).join("")
      : `<p class="text-secondary">No messages yet.</p>`;
  }

  // ---------- Delete (with confirmation) ----------
  function askDelete(table, id) {
    const row = data[table].find((r) => String(r.id) === String(id));
    pendingDelete = { table, id };
    document.getElementById("delete-name").textContent = row?.name || "this item";
    deleteModal.show();
  }

  document.getElementById("confirm-delete").addEventListener("click", async () => {
    const { table, id } = pendingDelete;
    const { error } = await db.from(table).delete().eq("id", id);
    deleteModal.hide();
    if (error) return showAlert(status, "danger", "Delete failed: " + error.message);
    showAlert(status, "success", "Deleted.");
    table === "messages" ? loadMessages() : loadTable(table);
  });

  // ---------- Buttons ----------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, table, id } = btn.dataset;
    if (action === "add") openEditor(table);
    if (action === "edit") openEditor(table, id);
    if (action === "delete") askDelete(table, id);
  });

  document.getElementById("sign-out").addEventListener("click", async () => {
    if (db) await db.auth.signOut();
    window.location.replace("index.html");
  });

  start();
})();
