/* ========================================================
   ASK Training Vietnam – Lecture Page Scripts
   File: scripts/lecture.js
   ======================================================== */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

// Mock Content Data based on URL param "id"
const courseData = {
  1: {
    title: "Nói Vạn Người Mê",
    progressText: "3% Hoàn thành",
    sections: [
      {
        title: "Phần 1: Khởi động",
        videos: [
          {
            title: "Video1",
            pct: "3%",
            url: "https://www.youtube.com/embed/2PuFyjAs7JA?si=201-VJL5pQocJYmi",
            isCompleted: true,
            description: "Chưa có nội dung."
          },
          {
            title: "Video 2",
            pct: "0%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: false,
            description: "Chưa có nội dung."
          },
          {
            title: "Video 3",
            pct: "0%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: false,
            description: "Chưa có nội dung."
          },
          {
            title: "Video 4",
            pct: "0%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: false,
            description: "Chưa có nội dung."
          }
        ]
      }
    ]
  },
  2: {
    title: "Nghệ Thuật Đọc Nhanh",
    progressText: "100% Hoàn thành",
    sections: [
      {
        title: "Phần 1: Giới thiệu",
        videos: [
          {
            title: "Bài 1: Kiến thức nền tảng",
            pct: "100%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: true,
            description: "Chưa có nội dung."
          },
          {
            title: "Bài 2: Tại sao phải đọc nhanh",
            pct: "100%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: true,
            description: "Chưa có nội dung."
          }
        ]
      },
      {
        title: "Phần 2: Phương pháp & Luyện tập",
        videos: [
          {
            title: "Bài 3: Luyện mắt cơ bản",
            pct: "100%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: true,
            description: "Chưa có nội dung."
          },
          {
            title: "Bài 4: Đọc cả khối",
            pct: "100%",
            url: "https://www.youtube.com/embed/POz1-EmLsTY?si=PBblZWUomCqy_LJn",
            isCompleted: true,
            description: "Chưa có nội dung."
          }
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
  const courseProgressText = document.getElementById('courseProgressText');
  const courseAccordion = document.getElementById('courseAccordion');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoTitle = document.getElementById('videoTitle');

  // Set initial text properties
  if (headerBackLink) {
    headerBackLink.textContent = course.title;
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
        const lessonStatus = vid.isCompleted ? 'Lần xem cuối: 12 Jan 24. 8:00PM' : 'Khóa';
        const pctLabel = vid.pct && vid.pct !== '0%' ? `Tiến độ hiện tại: ${vid.pct}` : 'Chưa xem';
        const desc = vid.description || 'Chưa có mô tả cho bài học này.';
        const titleAttr = escapeAttr(vid.title);
        const titleHtml = escapeHtml(vid.title);
        const descHtml = escapeHtml(desc);
        lessonHtml += `
          <div class="video-item ${isActiveClass}" 
               data-url="${vid.url}" data-title="${titleAttr}">
            <div class="item-icon">
              <i class="bi bi-play-circle"></i>
            </div>
            <div class="video-item-body">
              <div class="item-title">${titleHtml}</div>
              <span class="item-subtitle">${lessonStatus} • ${pctLabel}</span>
              <p class="item-desc">${descHtml}</p>
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

  const discussionInput = document.getElementById('discussionInput');
  const discussionSendBtn = document.getElementById('discussionSendBtn');
  const discussionList = document.getElementById('discussionList');
  const discussionCountEl = document.getElementById('discussionCount');

  function appendDiscussionComment(text) {
    if (!discussionList || !text.trim()) return;
    const initial = 'B';
    const row = document.createElement('div');
    row.className = 'discussion-item';
    row.innerHTML = `
      <div class="avatar-dot">${initial}</div>
      <div class="discussion-text">
        <strong>Bạn</strong>
        <p></p>
      </div>
    `;
    row.querySelector('p').textContent = text.trim();
    discussionList.insertBefore(row, discussionList.firstChild);
    if (discussionCountEl) {
      const n = parseInt(discussionCountEl.textContent, 10);
      discussionCountEl.textContent = Number.isFinite(n) ? n + 1 : 1;
    }
  }

  if (discussionSendBtn && discussionInput) {
    discussionSendBtn.addEventListener('click', () => {
      appendDiscussionComment(discussionInput.value);
      discussionInput.value = '';
    });
    discussionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        appendDiscussionComment(discussionInput.value);
        discussionInput.value = '';
      }
    });
  }
});
