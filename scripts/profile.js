/* ========================================================
   ASK Training Vietnam – Profile Script
   File: scripts/profile.js
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- HANDLE TAB SELECTION FROM URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  
  if (tabParam === 'password') {
    const passwordTabBtn = document.getElementById('password-tab');
    if(passwordTabBtn) {
      const passwordTab = new bootstrap.Tab(passwordTabBtn);
      passwordTab.show();
    }
  } else {
    // Default to 'info' tab
    const infoTabBtn = document.getElementById('info-tab');
    if(infoTabBtn) {
      const infoTab = new bootstrap.Tab(infoTabBtn);
      infoTab.show();
    }
  }

  // --- HANDLE FORM SUBMISSIONS ---
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Đã cập nhật Thông tin cá nhân! (Giả lập)');
    });
  }
  
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thay đổi Mật khẩu thành công! (Giả lập)');
    });
  }

  // --- LOCATION LOGIC ---
  const provinceSelect = document.getElementById('province');
  const districtSelect = document.getElementById('district');
  const wardSelect = document.getElementById('ward');

  if (provinceSelect && districtSelect && wardSelect) {
    let locationData = [];

    // Fetch from Provinces API
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then(res => res.json())
      .then(data => {
        locationData = data;
        renderProvinces(data);
        
        // Mock default value for hv_ask
        provinceSelect.value = data.find(p => p.name.includes('An Giang'))?.code || "";
        provinceSelect.dispatchEvent(new Event('change'));
      })
      .catch(err => console.error("Error fetching location data:", err));

    function renderProvinces(data) {
      provinceSelect.innerHTML = '<option value="">Chọn tỉnh thành</option>';
      data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.code;
        option.textContent = p.name;
        provinceSelect.appendChild(option);
      });
    }

    provinceSelect.addEventListener('change', function() {
      const pCode = this.value;
      districtSelect.innerHTML = '<option value="">Chọn quận huyện</option>';
      wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
      wardSelect.disabled = true;

      if (!pCode) {
        districtSelect.disabled = true;
        return;
      }

      districtSelect.disabled = false;
      const province = locationData.find(p => p.code == pCode);
      if (province && province.districts) {
        province.districts.forEach(d => {
          const option = document.createElement('option');
          option.value = d.code;
          option.textContent = d.name;
          districtSelect.appendChild(option);
        });
      }
    });

    districtSelect.addEventListener('change', function() {
      const pCode = provinceSelect.value;
      const dCode = this.value;
      wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';

      if (!dCode) {
        wardSelect.disabled = true;
        return;
      }

      wardSelect.disabled = false;
      const province = locationData.find(p => p.code == pCode);
      const district = province?.districts.find(d => d.code == dCode);
      if (district && district.wards) {
        district.wards.forEach(w => {
          const option = document.createElement('option');
          option.value = w.code;
          option.textContent = w.name;
          wardSelect.appendChild(option);
        });
      }
    });
  }
});
