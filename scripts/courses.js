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
    progress: 45,
  },
  {
    id: 2,
    title: "Nói Vạn Người Mê",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "0 đ",
    img: "../assets/collection_banner.jpg",
    categories: ["owned", "completed"],
    progress: 100,
  },
  {
    id: 3,
    title: "Tư Duy Phản Biện",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "0 đ",
    img: "../assets/collection_banner.jpg",
    categories: ["studying"],
    progress: 72,
  },
  {
    id: 4,
    title: "Mật Mã Tiền Tệ",
    teacher: "DG Phạm Ngọc Anh",
    type: "Học online với video",
    price: "19,900,000 đ",
    img: "../assets/collection_banner.jpg",
    categories: ["owned"],
    progress: null,
  },
];

const courseGrid = document.getElementById("courseGrid");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");
let activeFilter = "all";

function renderCourses() {
  if (!courseGrid) return;

  const filtered = mockCourses.filter((c) => {
    const matchFilter =
      activeFilter === "all" || c.categories.includes(activeFilter);
    return matchFilter;
  });

  courseGrid.innerHTML = "";

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  } else {
    if (emptyState) emptyState.classList.add("d-none");
  }

  filtered.forEach((c) => {
    let badgeHtml = "";
    let footerHtml = "";

    if (activeFilter === "owned") {
      let pg = c.progress !== null ? c.progress : 0;
      if (c.categories.includes("completed")) pg = 100;
      footerHtml = `
        <div class="course-progress" style="margin-top: 16px; margin-bottom: 20px;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="progress-label" style="font-size: 0.85rem; color: #666; font-weight: 500;">Tiến trình</span>
            <span class="progress-pct text-danger fw-bold" style="font-size: 0.9rem;">${pg}%</span>
          </div>
          <div class="progress-track" style="height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
            <div class="progress-fill" style="width:${pg}%; height: 100%; background: var(--ask-red); border-radius: 4px;"></div>
          </div>
        </div>
        <div class="mt-auto">
          <a href="lecture.html?id=${c.id}" class="btn w-100 d-flex align-items-center justify-content-center" style="border: 1px solid var(--ask-red); color: var(--ask-red); border-radius: 8px; padding: 10px 0; font-weight: 600; background: #fff; transition: all 0.2s;">
            <i class="bi bi-play-circle-fill me-2 fs-5"></i> Bài giảng
          </a>
        </div>
      `;
    } else {
      if (c.categories.includes("completed")) {
        badgeHtml = `<span class="course-badge completed"><i class="bi bi-check-circle-fill me-1"></i>Hoàn thành</span>`;
      } else if (c.categories.includes("studying")) {
        badgeHtml = `<span class="course-badge studying">Đang học</span>`;
      } else if (c.categories.includes("owned")) {
        badgeHtml = `<span class="course-badge owned">Sở hữu</span>`;
      }

      let progressHtml = "";
      if (
        c.progress !== null &&
        activeFilter !== "all" &&
        !c.categories.includes("completed")
      ) {
        progressHtml = `
          <div class="course-progress" style="margin-top: 12px;">
            <div class="d-flex justify-content-between mb-1">
              <span class="progress-label" style="font-size: 0.8rem; color: #666;">Tiến trình</span>
              <span class="progress-pct text-danger fw-bold" style="font-size: 0.85rem;">${c.progress}%</span>
            </div>
            <div class="progress-track" style="height: 6px; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
              <div class="progress-fill" style="width:${c.progress}%; height: 100%; background: var(--ask-red); border-radius: 4px;"></div>
            </div>
          </div>
        `;
      }

      footerHtml = `
        ${progressHtml}
        <div class="course-footer mt-auto" style="display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #f0f0f0; margin-top: 16px;">
          <span class="course-price" style="font-size: 0.95rem; font-weight: 700; color: var(--ask-red);">${c.price}</span>
          ${badgeHtml}
        </div>
      `;
    }

    const html = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="course-card h-100 d-flex flex-column" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: transform 0.2s;">
          <a href="${activeFilter === "owned" ? "lecture.html?id=" + c.id : "#"}" class="course-link d-flex flex-column flex-grow-1 text-decoration-none text-dark">
            <div class="course-thumb" style="aspect-ratio: 16/9; overflow: hidden; background: #f5f6fa; flex-shrink: 0;">
              <img src="${c.img}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: cover; border-top-left-radius: 16px; border-top-right-radius: 16px;"
                   onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22180%22><rect fill=%22%23f5f6fa%22 width=%22300%22 height=%22180%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>${c.emoji}</text></svg>'"/>
            </div>
            <div class="course-body d-flex flex-column flex-grow-1" style="padding: 20px;">
              <h6 class="course-title" style="font-size: 1.1rem; font-weight: 700; color: #1a1a1a; margin-bottom: 8px;">${c.title}</h6>
              <p class="course-type" style="font-size: 0.85rem; color: #777; margin-bottom: 12px;">
                <i class="bi bi-play-circle-fill" style="color: var(--ask-red); margin-right: 6px;"></i>${c.type}
              </p>
              <p class="course-teacher" style="font-size: 0.85rem; color: var(--ask-red); font-weight: 500; margin-bottom: 0;">
                <i class="bi bi-person-fill" style="margin-right: 4px;"></i>${c.teacher}
              </p>
              ${footerHtml}
            </div>
          </a>
        </div>
      </div>
    `;
    courseGrid.innerHTML += html;
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.getAttribute("data-filter");
    renderCourses();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
});
