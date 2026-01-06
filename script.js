const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const yearEl = document.getElementById("year");
const toast = document.getElementById("toast");
const bookingForm = document.getElementById("bookingForm");

yearEl.textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("toast--show");
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => {
    toast.classList.remove("toast--show");
  }, 2600);
}

// Mobile nav
navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after click (mobile)
navMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navMenu.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Demo booking submit: shows confirmation + opens email draft (no backend needed)
bookingForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const contact = formData.get("contact");
  const service = formData.get("service");
  const date = formData.get("date");
  const notes = formData.get("notes") || "";

  showToast("Request sent! (Demo) Check your email draft.");

  // Change this email per client
  const toEmail = "hello@luxenails.demo";
  const subject = encodeURIComponent(`Booking Request — ${service}`);
  const body = encodeURIComponent(
`Name: ${name}
Contact: ${contact}
Service: ${service}
Preferred date: ${date}

Notes:
${notes}

— Sent from Luxe Nail Studio Demo Website`
  );

  // Opens default mail app with prefilled email
  window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

  bookingForm.reset();
});
