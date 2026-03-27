/* ========================================================
   ASK Training Vietnam – Common Scripts
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ===== BACK TO TOP LOGIC =====
  if (!document.getElementById("backToTop")) {
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.title = "Lên đầu trang";
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== Sidebar Toggle for pages that use dashboard.css/js =====
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        sidebar.classList.toggle("show");
      } else {
        document.body.classList.toggle("sidebar-collapsed");
      }
    });
  }
});
