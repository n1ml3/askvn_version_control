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
          { title: "Video 2", pct: "1%", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", isCompleted: false },
          { title: "Video 3", pct: "1%", url: "https://www.youtube.com/embed/tgbNymZ7vqY", isCompleted: false },
          { title: "Video 4", pct: "0%", url: "https://www.youtube.com/embed/9bZkp7q19f0", isCompleted: false }
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
          { title: "Bài 1: Kiến thức nền tảng", pct: "100%", url: "https://www.youtube.com/embed/1la1D45_zJg", isCompleted: true },
          { title: "Bài 2: Tại sao phải đọc nhanh", pct: "100%", url: "https://www.youtube.com/embed/E-0t47rIBfI", isCompleted: true }
        ]
      },
      {
        title: "Phần 2: Phương pháp & Luyện tập",
        videos: [
          { title: "Bài 3: Luyện mắt cơ bản", pct: "100%", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", isCompleted: true },
          { title: "Bài 4: Đọc cả khối", pct: "100%", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", isCompleted: true }
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
    headerBackLink.innerHTML = `<i class="bi bi-chevron-left me-2"></i> ${course.title}`;
  }
  if (courseDescription) {
    courseDescription.textContent = course.description;
  }
  if (courseProgressText) {
    courseProgressText.textContent = course.progressText;
  }

  // Generate dynamic accordion playlist
  if (courseAccordion) {
    let accordionHtml = '';
    let isFirstVideoSelected = false;

    course.sections.forEach((sec, sIdx) => {
      const collapseId = `collapse_${sIdx}`;
      const isExpanded = sIdx === 0 ? 'true' : 'false';
      const collapseClass = sIdx === 0 ? 'show' : '';
      const btnClass = sIdx === 0 ? '' : 'collapsed';

      let videosHtml = '';
      sec.videos.forEach((vid) => {
        // Automatically make the first video active
        const isActiveClass = !isFirstVideoSelected ? 'active border-info-subtle' : 'border-transparent';
        const iconColor = !isFirstVideoSelected ? 'text-primary' : 'text-muted';
        const pctHtml = vid.pct !== "0%" ? `<span class="text-danger ms-1">(${vid.pct})</span>` : '';

        videosHtml += `
          <div class="video-item ${isActiveClass} border rounded m-2 d-flex align-items-center px-4 py-3" 
               data-url="${vid.url}" data-title="${vid.title}">
            <div class="item-icon ${iconColor} me-3">
              <i class="bi bi-play-circle lh-1 fs-5"></i>
            </div>
            <div class="item-title text-muted fw-medium" style="font-size: 0.9rem;">
              ${vid.title} ${pctHtml}
            </div>
          </div>
        `;

        // Update player source and title to first video right away
        if (!isFirstVideoSelected) {
          if (videoPlayer) videoPlayer.src = vid.url;
          if (videoTitle) videoTitle.textContent = vid.title;
          isFirstVideoSelected = true;
        }
      });

      accordionHtml += `
        <div class="accordion-item border-bottom${sIdx === course.sections.length - 1 ? '-0' : ''}">
          <h2 class="accordion-header">
            <button class="accordion-button ${btnClass} bg-white text-dark fw-medium shadow-none px-4 py-3" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
              ${sec.title}
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse ${collapseClass}" data-bs-parent="#courseAccordion">
            <div class="accordion-body p-0">
              ${videosHtml}
            </div>
          </div>
        </div>
      `;
    });

    // Inject generated HTML
    courseAccordion.innerHTML = accordionHtml;

    // Attach click events dynamically after rendering
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
      item.addEventListener('click', function () {
        // Remove active state from all items
        videoItems.forEach(vi => {
          vi.classList.remove('active', 'border-info-subtle');
          vi.classList.add('border-transparent');
          const icon = vi.querySelector('.item-icon');
          if (icon) {
            icon.classList.remove('text-primary');
            icon.classList.add('text-muted');
          }
        });

        // Add active state to clicked item
        this.classList.add('active', 'border-info-subtle');
        this.classList.remove('border-transparent');
        const icon = this.querySelector('.item-icon');
        if (icon) {
          icon.classList.remove('text-muted');
          icon.classList.add('text-primary');
        }

        // Update video player
        const url = this.getAttribute('data-url');
        if (videoPlayer && url) {
          videoPlayer.src = url;
        }

        // Update title text under video
        const title = this.getAttribute('data-title');
        if (videoTitle && title) {
          videoTitle.textContent = title;
        }
      });
    });
  }
});
