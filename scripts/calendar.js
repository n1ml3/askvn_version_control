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
    calHeaderRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const headerCells = calHeaderRow.querySelectorAll('.cal-header-cell');
    headerCells.forEach((el, idx) => {
      el.style.display = 'block';
      el.innerHTML = dayNames[idx];
    });
    
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
    calHeaderRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    let day = currentDate.getDay(); // 0(Sun) - 6(Sat)

    // Standardize to Monday=0, Sunday=6
    const jsDayToMondayFirst = (day === 0) ? 6 : day - 1;

    // Tính ngày đầu tuần (Thứ Hai)
    const startOfWeek = new Date(year, month, date - jsDayToMondayFirst);
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
    
    // Header format: Từ ngày - Đến ngày
    monthTitle.textContent = `${pad(startOfWeek.getDate())}/${pad(startOfWeek.getMonth()+1)} - ${pad(endOfWeek.getDate())}/${pad(endOfWeek.getMonth()+1)}/${endOfWeek.getFullYear()}`;

    const headerCells = calHeaderRow.querySelectorAll('.cal-header-cell');
    calBody.innerHTML = '';
    
    const today = new Date();
    const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

    let timelineGridHtml = `<div class="timeline-wrapper"><div class="timeline-time-col">`;
    for(let i=0; i<=23; i++) {
      timelineGridHtml += `<div class="timeline-hour-label"><span>${pad(i)}:00</span></div>`;
    }
    timelineGridHtml += `</div><div class="timeline-grid" style="grid-template-columns: repeat(7, 1fr);">`;

    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      
      if(headerCells[i]) {
        headerCells[i].style.display = 'block';
        headerCells[i].innerHTML = `${dayNames[i]}<br><span style="font-size:0.75rem; font-weight:normal; color:#aaa;">${pad(cellDate.getDate())}/${pad(cellDate.getMonth()+1)}</span>`;
      }
      
      const cellKey = dateKey(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
      const isToday = (cellKey === todayKey);
      
      timelineGridHtml += `<div class="timeline-day-col ${isToday ? 'today' : ''}" style="${isToday ? 'background: #fff5f5;' : ''}">`;
      for(let h=0; h<=23; h++) {
        timelineGridHtml += `<div class="timeline-hour-cell"></div>`;
      }
      timelineGridHtml += `</div>`;
    }
    timelineGridHtml += `</div></div>`;
    
    const finalContainer = document.createElement('div');
    finalContainer.style.gridColumn = '1 / -1';
    finalContainer.innerHTML = timelineGridHtml;
    calBody.appendChild(finalContainer);
  }

  /* ---------- Render Day ---------- */
  function renderDay() {
    calHeaderRow.style.display = 'grid'; // Hiển thị 1 cột header
    calHeaderRow.style.gridTemplateColumns = '1fr';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    let day = currentDate.getDay(); 
    const jsDayToMondayFirst = (day === 0) ? 6 : day - 1;
    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    
    monthTitle.textContent = `Ngày ${pad(date)}/${pad(month+1)}/${year}`;
    calBody.innerHTML = '';
    
    const headerCells = calHeaderRow.querySelectorAll('.cal-header-cell');
    headerCells.forEach((el, index) => {
      if (index === 0) {
        el.style.display = 'block';
        el.innerHTML = `${dayNames[jsDayToMondayFirst]}<br><span style="font-size:0.75rem; font-weight:normal; color:#aaa;">${pad(date)}/${pad(month+1)}</span>`;
      } else {
        el.style.display = 'none';
      }
    });
    
    const today = new Date();
    const isToday = (dateKey(year, month, date) === dateKey(today.getFullYear(), today.getMonth(), today.getDate()));

    let timelineGridHtml = `<div class="timeline-wrapper"><div class="timeline-time-col">`;
    for(let i=0; i<=23; i++) {
      timelineGridHtml += `<div class="timeline-hour-label"><span>${pad(i)}:00</span></div>`;
    }
    timelineGridHtml += `</div><div class="timeline-grid" style="grid-template-columns: 1fr;">`;

    timelineGridHtml += `<div class="timeline-day-col ${isToday ? 'today' : ''}" style="${isToday ? 'background: #fff5f5;' : ''}">`;
    for(let h=0; h<=23; h++) {
      timelineGridHtml += `<div class="timeline-hour-cell"></div>`;
    }
    timelineGridHtml += `</div></div></div>`;
    
    const finalContainer = document.createElement('div');
    finalContainer.style.gridColumn = '1 / -1';
    finalContainer.innerHTML = timelineGridHtml;
    calBody.appendChild(finalContainer);
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
