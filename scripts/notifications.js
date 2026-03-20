/* notifications.js */
// Mảng dữ liệu rỗng để test giao diện Empty State (sau này sẽ fetch từ backend)
const mockNotifications = [];

function renderNotifications(filter = 'all') {
  const container = document.getElementById('notifList');
  if(!container) return;
  
  const filtered = filter === 'unread' ? mockNotifications.filter(n => !n.isRead) : mockNotifications;
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="notif-empty-state">
        <img src="../assets/note_taking.svg" alt="No notifications" />
        <h5>Thông báo</h5>
        <p>Bạn chưa có thông báo nào</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(n => `
    <div class="notif-item ${n.isRead ? '' : 'unread'}">
      <div class="notif-icon"><i class="bi ${n.icon}"></i></div>
      <div class="notif-content">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-time"><i class="bi bi-clock me-1"></i>${n.time}</div>
      </div>
      ${n.isRead ? '' : '<div class="notif-unread-dot" title="Chưa đọc"></div>'}
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotifications('all');
  
  const tabs = document.querySelectorAll('.filter-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderNotifications(e.target.dataset.filter);
    });
  });
});
