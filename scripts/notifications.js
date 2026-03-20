/* notifications.js */
const mockNotifications = [
  { id: 1, title: 'Cập nhật hệ thống', desc: 'Hệ thống sẽ bảo trì nâng cấp sever video vào lúc 22:00 hôm nay. Vui lòng kết thúc bài học trước đó để tránh gián đoạn.', time: '2 giờ trước', isRead: false, icon: 'bi-info-circle' },
  { id: 2, title: 'Khóa học mới sắp ra mắt', desc: 'Khóa học Nghệ thuật bán hàng qua Telesales dự kiến sẽ ra mắt vào tháng tới.', time: '1 ngày trước', isRead: false, icon: 'bi-journal-plus' },
  { id: 3, title: 'Chứng nhận hoàn thành', desc: 'Chúc mừng! Bạn đã nhận được chứng nhận cho khóa Mật Mã Tiền Tệ.', time: '3 ngày trước', isRead: true, icon: 'bi-award' },
  { id: 4, title: 'Khuyến mãi thành viên', desc: 'Tặng bạn mã ưu đãi giảm 20% khi gia hạn gói học VIP. Hạn sử dụng 7 ngày.', time: '1 tuần trước', isRead: true, icon: 'bi-gift' },
];

function renderNotifications(filter = 'all') {
  const container = document.getElementById('notifList');
  if(!container) return;
  
  const filtered = filter === 'unread' ? mockNotifications.filter(n => !n.isRead) : mockNotifications;
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="p-5 text-center text-muted"><i class="bi bi-check2-all" style="font-size: 40px; color:#cbd5e1;"></i><p class="mt-3">Không có thông báo nào.</p></div>';
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
