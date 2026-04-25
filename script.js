(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-form-status");

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.hidden = !message;
    statusEl.classList.toggle("contact-form-status--error", Boolean(isError));
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");

    const nameVal = name && "value" in name ? String(name.value).trim() : "";
    const emailVal =
      email && "value" in email ? String(email.value).trim() : "";
    const msgVal =
      message && "value" in message ? String(message.value).trim() : "";

    if (!nameVal || !emailVal || !msgVal) {
      e.preventDefault();
      setStatus("Please complete all fields.", true);
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailOk) {
      e.preventDefault();
      setStatus("Please enter a valid email address.", true);
      return;
    }

    setStatus("", false);
  });
})();

(function () {
  "use strict";

  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  function syncGalleryHeights() {
    const images = gallery.querySelectorAll(".gallery-figure img");
    if (images.length === 0) return;

    gallery.style.removeProperty("--gallery-image-height");
    const firstHeight = Math.round(images[0].getBoundingClientRect().height);
    if (firstHeight <= 0) return;

    gallery.style.setProperty("--gallery-image-height", firstHeight + "px");
  }

  const firstImage = gallery.querySelector(".gallery-figure img");
  if (firstImage) {
    if (firstImage.complete) {
      syncGalleryHeights();
    } else {
      firstImage.addEventListener("load", syncGalleryHeights, { once: true });
    }
  }

  window.addEventListener("resize", syncGalleryHeights);
  window.addEventListener("load", syncGalleryHeights);
})();
