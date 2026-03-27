/* ========================================================
   ASK Training Vietnam – Profile Script
   File: scripts/profile.js
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- HANDLE TAB SELECTION FROM URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  if (tabParam === "password") {
    const passwordTabBtn = document.getElementById("password-tab");
    if (passwordTabBtn) {
      const passwordTab = new bootstrap.Tab(passwordTabBtn);
      passwordTab.show();
    }
  } else {
    // Default to 'info' tab
    const infoTabBtn = document.getElementById("info-tab");
    if (infoTabBtn) {
      const infoTab = new bootstrap.Tab(infoTabBtn);
      infoTab.show();
    }
  }

  // --- TOAST NOTIFICATION HELPERS ---
  const injectToastContainer = () => {
    if (!document.getElementById("toast-container")) {
      const container = document.createElement("div");
      container.id = "toast-container";
      container.className = "position-fixed bottom-0 end-0 p-3";
      container.style.zIndex = "1100";
      document.body.appendChild(container);
    }
  };

  const showToast = (message, type = "success") => {
    injectToastContainer();
    const container = document.getElementById("toast-container");
    const toastId = "toast-" + Date.now();
    const bgColor = type === "success" ? "#198754" : "#cc1a1a";

    const html = `
      <div id="${toastId}" class="toast align-items-center text-white border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" style="background: ${bgColor}; border-radius: 12px; display: block; opacity: 0; transform: translateY(20px); transition: all 0.3s ease;">
        <div class="d-flex">
          <div class="toast-body fw-600">
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} me-2"></i>
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
    const toastEl = document.getElementById(toastId);

    // Simple animation
    setTimeout(() => {
      toastEl.style.opacity = "1";
      toastEl.style.transform = "translateY(0)";
    }, 10);

    // Auto remove
    setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translateY(20px)";
      setTimeout(() => toastEl.remove(), 300);
    }, 4000);
  };

  // --- HANDLE FORM SUBMISSIONS ---
  const handleFormSubmit = (formId, successMsg) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Loading state
      btn.disabled = true;
      btn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Đang xử lý...';

      // Mock API call
      setTimeout(() => {
        showToast(successMsg);
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 1000);
    });
  };

  handleFormSubmit("profileForm", "Cập nhật thông tin cá nhân thành công!");
  handleFormSubmit("passwordForm", "Mật khẩu đã được thay đổi thành công!");

  // --- LOCATION LOGIC ---
  const provinceSelect = document.getElementById("province");
  const districtSelect = document.getElementById("district");
  const wardSelect = document.getElementById("ward");

  if (provinceSelect && districtSelect && wardSelect) {
    let locationData = [];

    // Fetch from Provinces API
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => {
        locationData = data;
        renderProvinces(data);

        // Mock default value for hv_ask
        provinceSelect.value =
          data.find((p) => p.name.includes("An Giang"))?.code || "";
        provinceSelect.dispatchEvent(new Event("change"));
      })
      .catch((err) => console.error("Error fetching location data:", err));

    function renderProvinces(data) {
      provinceSelect.innerHTML = '<option value="">Chọn tỉnh thành</option>';
      data.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.code;
        option.textContent = p.name;
        provinceSelect.appendChild(option);
      });
    }

    provinceSelect.addEventListener("change", function () {
      const pCode = this.value;
      districtSelect.innerHTML = '<option value="">Chọn quận huyện</option>';
      wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
      wardSelect.disabled = true;

      if (!pCode) {
        districtSelect.disabled = true;
        return;
      }

      districtSelect.disabled = false;
      const province = locationData.find((p) => p.code == pCode);
      if (province && province.districts) {
        province.districts.forEach((d) => {
          const option = document.createElement("option");
          option.value = d.code;
          option.textContent = d.name;
          districtSelect.appendChild(option);
        });
      }
    });

    districtSelect.addEventListener("change", function () {
      const pCode = provinceSelect.value;
      const dCode = this.value;
      wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';

      if (!dCode) {
        wardSelect.disabled = true;
        return;
      }

      wardSelect.disabled = false;
      const province = locationData.find((p) => p.code == pCode);
      const district = province?.districts.find((d) => d.code == dCode);
      if (district && district.wards) {
        district.wards.forEach((w) => {
          const option = document.createElement("option");
          option.value = w.code;
          option.textContent = w.name;
          wardSelect.appendChild(option);
        });
      }
    });
  }
});
