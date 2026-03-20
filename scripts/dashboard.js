/* ========================================================
   ASK Training Vietnam – Dashboard Scripts
   File: scripts/dashboard.js
   ======================================================== */

// ===== Sidebar toggle =====
// Desktop: thu nhỏ/mở rộng (icon-only ↔ full)
// Mobile:  ẩn/hiện hoàn toàn (overlay)
document.getElementById('sidebarToggle').addEventListener('click', () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.getElementById('sidebar').classList.toggle('show');
  } else {
    document.body.classList.toggle('sidebar-collapsed');
  }
});

// ===== Calendar logic =====
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTHS_VN = [
  'Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6',
  'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'
];

// Các ngày có sự kiện trong tháng hiện tại (tuỳ chỉnh)
const EVENT_DAYS = [19];

const now = new Date();
let viewYear  = now.getFullYear();
let viewMonth = now.getMonth(); // 0-based

const selMonth = document.getElementById('selMonth');
const selYear  = document.getElementById('selYear');

// Populate year dropdown
for (let y = viewYear - 3; y <= viewYear + 3; y++) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.textContent = y;
  if (y === viewYear) opt.selected = true;
  selYear.appendChild(opt);
}

selMonth.value = viewMonth;

/**
 * Render calendar grid cho năm/tháng được chỉ định.
 * @param {number} year
 * @param {number} month  0-based
 */
function renderCalendar(year, month) {
  selMonth.value = month;
  selYear.value  = year;
  document.getElementById('calTitle').textContent = `${MONTHS_VN[month]} ${year}`;

  // Ngày đầu tháng (0=CN, 1=T2 … 6=T7)
  const firstDay    = new Date(year, month, 1).getDay();
  // Chuyển sang Mon-based (T2=0 … CN=6)
  const startOffset = (firstDay === 0) ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  let html = '<table><thead><tr>';
  DAYS.forEach(d => { html += `<th>${d}</th>`; });
  html += '</tr></thead><tbody><tr>';

  let dayCount = 0;

  // Ngày tháng trước (mờ)
  for (let i = startOffset - 1; i >= 0; i--) {
    html += `<td class="other-month"><span class="day-num">${daysInPrev - i}</span></td>`;
    dayCount++;
  }

  // Ngày tháng hiện tại
  for (let d = 1; d <= daysInMonth; d++) {
    if (dayCount % 7 === 0 && dayCount !== 0) html += '</tr><tr>';

    const isToday = (
      d === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    );
    const isEvent = EVENT_DAYS.includes(d) && !isToday;

    let cls = '';
    if (isToday)      cls = 'today';
    else if (isEvent) cls = 'has-event';

    html += `<td class="${cls}" title="${d}/${month + 1}/${year}"><span class="day-num">${d}</span></td>`;
    dayCount++;
  }

  // Ngày tháng sau (mờ)
  const remaining = 7 - (dayCount % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      html += `<td class="other-month"><span class="day-num">${d}</span></td>`;
    }
  }

  html += '</tr></tbody></table>';
  document.getElementById('calendar').innerHTML = html;
}

// Render mặc định
renderCalendar(viewYear, viewMonth);

// Navigation buttons
document.getElementById('prevMonth').addEventListener('click', () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  renderCalendar(viewYear, viewMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar(viewYear, viewMonth);
});

// Dropdowns
selMonth.addEventListener('change', () => {
  viewMonth = +selMonth.value;
  renderCalendar(viewYear, viewMonth);
});

selYear.addEventListener('change', () => {
  viewYear = +selYear.value;
  renderCalendar(viewYear, viewMonth);
});
