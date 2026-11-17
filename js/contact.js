// Contact form: saves a message to the database (only admins can read it).
(function () {
  const { db, showAlert, notConfiguredNotice } = window.Hub;
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  const button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    if (!db) return notConfiguredNotice(status);

    button.disabled = true;
    button.textContent = "Sending...";
    const data = Object.fromEntries(new FormData(form));
    const { error } = await db.from("messages").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      topic: data.topic,
      body: data.body.trim(),
    });
    button.disabled = false;
    button.textContent = "Send message";

    if (error) {
      showAlert(status, "danger", "Your message didn't send. Please try again or email us directly. (" + error.message + ")");
    } else {
      form.reset();
      form.classList.remove("was-validated");
      showAlert(status, "success", "Thanks! Your message was sent. An officer will reply by email.");
    }
  });
})();
