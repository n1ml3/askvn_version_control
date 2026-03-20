/* notifications.js */
// Mảng dữ liệu rỗng để test giao diện Empty State (sau này sẽ fetch từ backend)
const mockNotifications = [
  { 
    id: 1,
    title: "Thông báo",
    desc: "Thông báo",
    time: "2022-01-01",
    icon: "bi-bell",
    link: "#"
  },
  {
    id: 2,
    title: "Thông báo",
    desc: "Thông báo",
    time: "2022-01-01",
    icon: "bi-bell",
    link: "#"
  }
];

function renderNotifications(filter = 'all') {
  const container = document.getElementById('notifList');
  if(!container) return;
  
  const filtered = filter === 'unread' ? mockNotifications.filter(n => !n.isRead) : mockNotifications;
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 d-flex justify-content-center align-items-center" style="min-height: 60vh;">
        <div class="notif-empty-state text-center">
          <img src="../assets/note_taking.svg" alt="No notifications" style="max-height: 180px; margin-bottom: 20px;" />
          <h5 style="font-weight: 600; color: #111;">Thông báo</h5>
          <p style="color: #666; font-size: 14px;">Bạn chưa có thông báo nào</p>
        </div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(n => `
    <div class="col-md-6 col-xl-4">
      <div class="notif-item grid-card ${n.isRead ? '' : 'unread'}">
        <div class="notif-icon"><i class="bi ${n.icon}"></i></div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          <div class="notif-time"><i class="bi bi-clock me-1"></i>${n.time}</div>
        </div>
        ${n.isRead ? '' : '<div class="notif-unread-dot" title="Chưa đọc"></div>'}
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotifications('all');
});
