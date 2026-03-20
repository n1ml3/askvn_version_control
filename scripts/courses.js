/* ========================================================
   ASK Training Vietnam – Courses Page Scripts
   File: scripts/courses.js
   ======================================================== */

const mockCourses = [
  {
    id: 1,
    title: "Nghệ Thuật Đọc Nhanh",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "0 đ",
    img: "../assets/collection_banner.jpg",
    categories: ["owned", "studying"],
    progress: 45
  },
  {
    id: 2,
    title: "Nói Vạn Người Mê",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "0 đ",
    img: "../assets/collection_banner.jpg",
    emoji: "🎤",
    categories: ["owned", "completed"],
    progress: 100
  },
  {
    id: 3,
    title: "Tư Duy Phản Biện",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "0 đ",
    img: "../assets/collection_banner.jpg",
    emoji: "📗",
    categories: ["studying"],
    progress: 72
  },
  {
    id: 4,
    title: "Mật Mã Tiền Tệ",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "19,900,000 đ",
    img: "../assets/collection_banner.jpg",
    emoji: "💰",
    categories: ["owned"],
    progress: null
  }
];

const courseGrid = document.getElementById('courseGrid');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('top-bar-search');

let activeFilter = 'all';
let searchQuery = '';

function renderCourses() {
  if (!courseGrid) return;

  const filtered = mockCourses.filter(c => {
    const matchFilter = (activeFilter === 'all') || c.categories.includes(activeFilter);
    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery) || c.teacher.toLowerCase().includes(searchQuery);
    return matchFilter && matchSearch;
  });

  courseGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('d-none');
    return;
  } else {
    if (emptyState) emptyState.classList.add('d-none');
  }

  filtered.forEach(c => {
    let badgeHtml = '';
    if (c.categories.includes('completed')) {
      badgeHtml = `<span class="course-badge completed"><i class="bi bi-check-circle-fill me-1"></i>Hoàn thành</span>`;
    } else if (c.categories.includes('studying')) {
      badgeHtml = `<span class="course-badge studying">Đang học</span>`;
    } else if (c.categories.includes('owned')) {
      badgeHtml = `<span class="course-badge owned">Sở hữu</span>`;
    }

    let progressHtml = '';
    if (c.progress !== null && !c.categories.includes('completed')) {
      progressHtml = `
        <div class="course-progress">
          <div class="d-flex justify-content-between mb-1">
            <span class="progress-label">Tiến trình</span>
            <span class="progress-pct">${c.progress}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${c.progress}%"></div>
          </div>
        </div>
      `;
    }

    const html = `
      <div class="col-6 col-md-4">
        <a href="https://ask.com.vn/collections/khoa-hoc-ask" target="_blank" class="course-link">
          <div class="course-card">
            <div class="course-thumb">
              <img src="${c.img}" alt="${c.title}"
                   onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22><rect fill=%22%23f5f6fa%22 width=%22300%22 height=%22180%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>${c.emoji}</text></svg>'"/>
            </div>
            <div class="course-body">
              <h6 class="course-title">${c.title}</h6>
              <p class="course-type"><i class="bi bi-play-circle-fill me-1"></i>${c.type}</p>
              <p class="course-teacher"><i class="bi bi-person-fill me-1"></i>${c.teacher}</p>
              ${progressHtml}
              <div class="course-footer">
                <span class="course-price">${c.price}</span>
                ${badgeHtml}
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
    courseGrid.innerHTML += html;
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    renderCourses();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderCourses();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
});
