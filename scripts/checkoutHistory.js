/* ========================================================
   ASK Training Vietnam – Checkout History Scripts
   File: scripts/checkoutHistory.js
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockOrders = [
    // {
    //   code: "ASK-PAY-10023",
    //   date: "14/10/2026 - 15:30",
    //   status: "paid",
    //   courseName: "Mật Mã Tiền Tệ - K10",
    //   teacher: "Mr. Phạm Ngọc Anh",
    //   amount: "19,900,000 đ"
    // },
    // {
    //   code: "ASK-PAY-10018",
    //   date: "02/09/2026 - 09:12",
    //   status: "paid",
    //   courseName: "Wake Up - K105",
    //   teacher: "Mr. Phạm Ngọc Anh",
    //   amount: "9,900,000 đ"
    // },
    // {
    //   code: "ASK-PAY-10055",
    //   date: "20/03/2026 - 10:05",
    //   status: "pending",
    //   courseName: "Trại Lãnh Đạo Cấp Cao - K05",
    //   teacher: "Mr. Phạm Ngọc Anh",
    //   amount: "49,900,000 đ"
    // },
    // {
    //   code: "ASK-PAY-10060",
    //   date: "21/03/2026 - 08:00",
    //   status: "pending",
    //   courseName: "Sales Success System - K08",
    //   teacher: "Mr. Phạm Ngọc Anh",
    //   amount: "15,500,000 đ"
    // }
  ];

  function renderOrders() {
    const tabPaid = document.getElementById('tabPaid');
    const tabPending = document.getElementById('tabPending');
    
    if(!tabPaid || !tabPending) return;

    tabPaid.innerHTML = '';
    tabPending.innerHTML = '';

    const paidOrders = mockOrders.filter(o => o.status === 'paid');
    const pendingOrders = mockOrders.filter(o => o.status === 'pending');

    const generateCard = (order) => {
      const isPaid = order.status === 'paid';
      const statusClass = isPaid ? 'badge-success' : 'badge-warning';
      const statusText = isPaid ? 'Đã thanh toán' : 'Chờ thanh toán';
      const amountClass = isPaid ? '' : 'text-warning';
      
      let html = `
        <div class="order-card">
          <div class="order-header">
            <div class="order-code">Mã Đơn: <strong>${order.code}</strong></div>
            <div class="order-date"><i class="bi bi-calendar3"></i> ${order.date}</div>
            <div class="order-status ${statusClass}">${statusText}</div>
          </div>
          <div class="order-body">
            <div class="order-info">
              <h4 class="course-name">${order.courseName}</h4>
              <p class="course-teacher"><i class="bi bi-person-workspace"></i> ${order.teacher}</p>
            </div>
            <div class="order-amount ${amountClass}">${order.amount}</div>
      `;

      if (!isPaid) {
        html += `
            <div class="order-actions">
              <button class="btn btn-sm btn-danger mt-3">Thanh toán ngay</button>
            </div>
        `;
      }

      html += `
          </div>
        </div>
      `;
      return html;
    };

    paidOrders.forEach(o => {
      tabPaid.innerHTML += generateCard(o);
    });

    if(paidOrders.length === 0) {
      tabPaid.innerHTML = `
        <div class="checkout-empty-state">
          <img src="../assets/note_taking.svg" alt="Empty" />
          <h5>Đã thanh toán</h5>
          <p>Chưa có thông tin nào</p>
        </div>
      `;
    }

    pendingOrders.forEach(o => {
      tabPending.innerHTML += generateCard(o);
    });

    if(pendingOrders.length === 0) {
      tabPending.innerHTML = `
        <div class="checkout-empty-state">
          <img src="../assets/note_taking.svg" alt="Empty" />
          <h5>Chờ thanh toán</h5>
          <p>Chưa có thông tin nào</p>
        </div>
      `;
    }
  }

  // Khởi chạy render
  renderOrders();

  // --- TAB LOGIC ---
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
