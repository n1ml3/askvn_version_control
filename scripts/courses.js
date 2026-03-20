/* ========================================================
   ASK Training Vietnam – Courses Page Scripts
   File: scripts/courses.js
   ======================================================== */

// ===== Filter tabs =====
const filterBtns = document.querySelectorAll('.filter-btn');
const courseItems = document.querySelectorAll('#courseGrid [data-category]');
const emptyState  = document.getElementById('emptyState');

// Search input
const searchInput = document.getElementById('top-bar-search');

function applyFilter(filter) {
  let visibleCount = 0;
  const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';

  courseItems.forEach(item => {
    const categories = item.getAttribute('data-category') || 'all';
    const title = item.querySelector('.course-title')?.textContent.toLowerCase() || '';
    const teacherEl = item.querySelector('.course-teacher')?.textContent.toLowerCase() || '';

    const matchFilter = (filter === 'all') || categories.split(' ').includes(filter);
    const matchSearch = !searchVal || title.includes(searchVal) || teacherEl.includes(searchVal);

    if (matchFilter && matchSearch) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Empty state
  if (emptyState) {
    emptyState.classList.toggle('d-none', visibleCount > 0);
  }
}

let activeFilter = 'all';

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    applyFilter(activeFilter);
  });
});

// Search live filter
if (searchInput) {
  searchInput.addEventListener('input', () => {
    applyFilter(activeFilter);
  });
}

// Initial render
applyFilter('all');
