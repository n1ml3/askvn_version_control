/* ========================================================
   ASK Training Vietnam – Lecture Page Scripts
   File: scripts/lecture.js
   ======================================================== */

// Mock Content Data based on URL param "id"
const courseData = {
  1: {
    title: "Nói Vạn Người Mê",
    description: "Chưa có nội dung",
    progressText: "3% Hoàn thành",
    sections: [
      {
        title: "Phần 1: Khởi động",
        videos: [
          { title: "Video1", pct: "3%", url: "https://www.youtube.com/embed/2PuFyjAs7JA?si=201-VJL5pQocJYmi", isCompleted: true },
          { title: "Video 2", pct: "1%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: false },
          { title: "Video 3", pct: "1%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: false },
          { title: "Video 4", pct: "0%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: false }
        ]
      }
    ]
  },
  2: {
    title: "Nghệ Thuật Đọc Nhanh",
    description: "Chưa có nội dung.",
    progressText: "100% Hoàn thành",
    sections: [
      {
        title: "Phần 1: Giới thiệu",
        videos: [
          { title: "Bài 1: Kiến thức nền tảng", pct: "100%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: true },
          { title: "Bài 2: Tại sao phải đọc nhanh", pct: "100%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: true }
        ]
      },
      {
        title: "Phần 2: Phương pháp & Luyện tập",
        videos: [
          { title: "Bài 3: Luyện mắt cơ bản", pct: "100%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: true },
          { title: "Bài 4: Đọc cả khối", pct: "100%", url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn", isCompleted: true }
        ]
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let courseId = urlParams.get('id');

  // Default to course 1 if id not found or invalid
  if (!courseId || !courseData[courseId]) {
    courseId = 1;
  }

  const course = courseData[courseId];

  // DOM Elements
  const headerBackLink = document.getElementById('headerBackLink');
  const courseDescription = document.getElementById('courseDescription');
  const courseProgressText = document.getElementById('courseProgressText');
  const courseAccordion = document.getElementById('courseAccordion');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoTitle = document.getElementById('videoTitle');

  // Set initial text properties
  if (headerBackLink) {
    headerBackLink.textContent = course.title;
  }
  if (courseDescription) {
    courseDescription.textContent = course.description;
  }
  if (courseProgressText) {
    courseProgressText.textContent = course.progressText;
    
    // Update progress bar
    const courseProgressBar = document.getElementById('courseProgressBar');
    if (courseProgressBar) {
      const match = course.progressText.match(/(\d+)%/);
      const pct = match ? match[1] : 0;
      courseProgressBar.style.width = `${pct}%`;
      courseProgressBar.setAttribute('aria-valuenow', pct);
    }
  }

  // Generate dynamic lesson list
  if (courseAccordion) {
    let lessonHtml = '';
    let isFirstVideoSelected = false;

    course.sections.forEach((sec, sIdx) => {
      lessonHtml += `<div class="mb-2"><p class="section-title">${sec.title}</p>`;
      sec.videos.forEach((vid) => {
        const isActiveClass = !isFirstVideoSelected ? 'active' : '';
        const lessonStatus = vid.isCompleted ? 'Last access: 12 Jan 24. 8:00PM' : 'Locked';
        const pctLabel = vid.pct && vid.pct !== '0%' ? `Progress: ${vid.pct}` : 'Not started';
        lessonHtml += `
          <div class="video-item ${isActiveClass}" 
               data-url="${vid.url}" data-title="${vid.title}">
            <div class="item-icon">
              <i class="bi bi-play-circle"></i>
            </div>
            <div>
              <div class="item-title">${vid.title}</div>
              <span class="item-subtitle">${lessonStatus} • ${pctLabel}</span>
            </div>
          </div>
        `;

        if (!isFirstVideoSelected) {
          if (videoPlayer) videoPlayer.src = vid.url;
          if (videoTitle) videoTitle.textContent = vid.title;
          isFirstVideoSelected = true;
        }
      });
      lessonHtml += '</div>';
    });

    courseAccordion.innerHTML = lessonHtml;

    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
      item.addEventListener('click', function () {
        videoItems.forEach(vi => {
          vi.classList.remove('active');
        });

        this.classList.add('active');

        const url = this.getAttribute('data-url');
        if (videoPlayer && url) {
          videoPlayer.src = url;
        }

        const title = this.getAttribute('data-title');
        if (videoTitle && title) {
          videoTitle.textContent = title;
        }
      });
    });
  }
});
