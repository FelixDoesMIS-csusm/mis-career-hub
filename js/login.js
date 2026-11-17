// Admin login with Supabase email + password.
(function () {
  const { db, showAlert, notConfiguredNotice } = window.Hub;
  const form = document.getElementById("login-form");
  const status = document.getElementById("login-status");
  const button = form.querySelector("button[type=submit]");

  // Already signed in? Go straight to the dashboard.
  if (db) {
    db.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace("admin.html");
    });
  } else {
    notConfiguredNotice(status);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    if (!db) return notConfiguredNotice(status);

    button.disabled = true;
    button.textContent = "Signing in...";
    const { error } = await db.auth.signInWithPassword({
      email: form.email.value.trim(),
      password: form.password.value,
    });
    button.disabled = false;
    button.textContent = "Sign in";

    if (error) {
      showAlert(status, "danger", "Sign-in failed: " + error.message);
      form.password.value = "";
      form.password.focus();
    } else {
      window.location.replace("admin.html");
    }
  });
})();
