/* ========================================================
   ASK Training Vietnam – Calendar JS
   File: scripts/calendar.js
   ======================================================== */

(function () {
  'use strict';

  /* ---------- State ---------- */
  let currentDate = new Date();
  let currentView = 'month';

  /* ---------- Sample events (mock data) ---------- */
  // Users requested empty calendar, no sample events
  const events = [];

  /* ---------- DOM refs ---------- */
  const calBody      = document.getElementById('calBody');
  const monthTitle   = document.getElementById('monthTitle');
  const prevBtn      = document.getElementById('prevMonth');
  const nextBtn      = document.getElementById('nextMonth');
  const todayBtn     = document.getElementById('todayBtn');
  const viewBtns     = document.querySelectorAll('.cal-view-btn');
  const tabBtns      = document.querySelectorAll('.cal-tab');
  const calHeaderRow = document.querySelector('.cal-header-row');

  /* ---------- Helpers ---------- */
  const pad = n => String(n).padStart(2, '0');

  function dateKey(y, m, d) {
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  }

  function getEventsFor(y, m, d) {
    const key = dateKey(y, m, d);
    return events.filter(e => e.date === key);
  }

  /* ---------- Render Month ---------- */
  function renderMonth() {
    calHeaderRow.style.display = 'grid'; // Hiển thị header T2 tới CN
    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-based

    // Update header text
    monthTitle.textContent = `Tháng ${pad(month + 1)}/${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

    calBody.innerHTML = '';
    const totalCells = 42;

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day';

      let cellYear = year;
      let cellMonth = month;
      let dayNum;

      if (i < firstDay) {
        dayNum = prevMonthDays - firstDay + 1 + i;
        cellMonth = month - 1;
        if (cellMonth < 0) { cellMonth = 11; cellYear--; }
        cell.classList.add('other-month');
      } else if (i >= firstDay + daysInMonth) {
        dayNum = i - firstDay - daysInMonth + 1;
        cellMonth = month + 1;
        if (cellMonth > 11) { cellMonth = 0; cellYear++; }
        cell.classList.add('other-month');
      } else {
        dayNum = i - firstDay + 1;
      }

      // Today
      const cellKey = dateKey(cellYear, cellMonth, dayNum);
      if (cellKey === todayKey) cell.classList.add('today');

      // Day number
      const numEl = document.createElement('div');
      numEl.className = 'cal-day-num';
      numEl.textContent = dayNum;
      cell.appendChild(numEl);

      // Events
      const dayEvents = getEventsFor(cellYear, cellMonth, dayNum);
      dayEvents.forEach(ev => {
        const evEl = document.createElement('span');
        evEl.className = 'cal-event ' + (ev.color || '');
        evEl.textContent = ev.title;
        evEl.title = ev.title;
        cell.appendChild(evEl);
      });

      calBody.appendChild(cell);
    }
  }

  /* ---------- Render Week ---------- */
  function renderWeek() {
    calHeaderRow.style.display = 'grid'; // Giữ nguyên header
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const day = currentDate.getDay(); // 0(Sun) - 6(Sat)

    // Tính ngày đầu tuần (Chủ nhật)
    const startOfWeek = new Date(year, month, date - day);
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
    
    // Header format: Từ ngày - Đến ngày
    monthTitle.textContent = `${pad(startOfWeek.getDate())}/${pad(startOfWeek.getMonth()+1)} - ${pad(endOfWeek.getDate())}/${pad(endOfWeek.getMonth()+1)}/${endOfWeek.getFullYear()}`;

    calBody.innerHTML = '';
    
    const today = new Date();
    const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      
      const cell = document.createElement('div');
      cell.className = 'cal-day';
      // Làm cao ô để hiển thị tốt cho một cột của tuần
      cell.style.minHeight = '250px';
      
      const cellKey = dateKey(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
      if (cellKey === todayKey) cell.classList.add('today');
      
      const numEl = document.createElement('div');
      numEl.className = 'cal-day-num';
      numEl.textContent = cellDate.getDate();
      cell.appendChild(numEl);
      
      // Khong có event nên để rỗng
      calBody.appendChild(cell);
    }
  }

  /* ---------- Render Day ---------- */
  function renderDay() {
    // Ẩn grid các thứ trong tuần
    calHeaderRow.style.display = 'none';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    
    monthTitle.textContent = `Ngày ${pad(date)}/${pad(month+1)}/${year}`;
    calBody.innerHTML = '';
    
    const cell = document.createElement('div');
    cell.className = 'cal-day empty-view-cell';
    cell.style.gridColumn = '1 / -1';
    cell.style.minHeight = '300px';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '1.1rem';
    cell.style.color = '#888';
    
    const today = new Date();
    if (dateKey(year, month, date) === dateKey(today.getFullYear(), today.getMonth(), today.getDate())) {
      cell.classList.add('today');
      cell.style.borderTop = '3px solid var(--ask-red)';
    }

    cell.innerHTML = `<div><i class="bi bi-calendar-event fs-3 d-block text-center mb-2"></i>Chưa có sự kiện nào trong ngày này.</div>`;
    calBody.appendChild(cell);
  }

  /* ---------- Render List ---------- */
  function renderList() {
    // Ẩn grid các thứ trong tuần
    calHeaderRow.style.display = 'none';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Có thể hiện list của tháng hiện tại
    monthTitle.textContent = `Danh sách sự kiện (Tháng ${pad(month+1)}/${year})`;
    calBody.innerHTML = '';
    
    const cell = document.createElement('div');
    cell.className = 'cal-day empty-view-cell';
    cell.style.gridColumn = '1 / -1';
    cell.style.minHeight = '300px';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '1.1rem';
    cell.style.color = '#888';
    
    cell.innerHTML = `<div><i class="bi bi-card-list fs-3 d-block text-center mb-2"></i>Không có sự kiện nào trong danh sách.</div>`;
    calBody.appendChild(cell);
  }

  /* ---------- Router ---------- */
  function renderView() {
    if (currentView === 'month') renderMonth();
    else if (currentView === 'week') renderWeek();
    else if (currentView === 'day') renderDay();
    else if (currentView === 'list') renderList();
  }

  /* ---------- Navigation ---------- */
  prevBtn.addEventListener('click', () => {
    if (currentView === 'week') {
      currentDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'day') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    renderView();
  });

  nextBtn.addEventListener('click', () => {
    if (currentView === 'week') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (currentView === 'day') {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    renderView();
  });

  todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    renderView();
  });

  /* ---------- View switcher ---------- */
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      renderView();
    });
  });

  /* ---------- Tab switcher ---------- */
  const tabPanels = {
    timetable: document.getElementById('tabTimetable'),
    schedule:  document.getElementById('tabSchedule'),
    cancelled: document.getElementById('tabCancelled'),
    makeup:    document.getElementById('tabMakeup'),
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      Object.values(tabPanels).forEach(p => p.classList.add('d-none'));
      const key = btn.dataset.tab;
      if (tabPanels[key]) tabPanels[key].classList.remove('d-none');
    });
  });

  /* ---------- Init ---------- */
  renderView();

})();
