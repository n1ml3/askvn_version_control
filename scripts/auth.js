/* ========================================================
   ASK Training Vietnam – Auth Script
   File: scripts/auth.js
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtns = document.querySelectorAll(".auth-password-toggle");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Find the input relatively
      const input = this.parentElement.querySelector(".auth-input");
      const icon = this.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      }
    });
  });
});
