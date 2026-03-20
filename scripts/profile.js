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
});
