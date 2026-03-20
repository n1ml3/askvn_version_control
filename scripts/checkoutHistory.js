/* ========================================================
   ASK Training Vietnam – Checkout History Scripts
   File: scripts/checkoutHistory.js
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.checkout-tab-btn');
  const panels = document.querySelectorAll('.checkout-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Bỏ active tất cả các tab
      tabBtns.forEach(b => b.classList.remove('active'));
      // Active tab được click
      btn.classList.add('active');

      // Ẩn tất cả các panel
      panels.forEach(p => p.classList.add('d-none'));

      // Hiện panel tương ứng
      const targetId = btn.getAttribute('data-tab') === 'paid' ? 'tabPaid' : 'tabPending';
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.remove('d-none');
      }
    });
  });
});
