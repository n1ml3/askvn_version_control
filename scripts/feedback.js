/* feedback.js */
const feedbackForm = document.getElementById('feedbackForm');
const feedbackTopic = document.getElementById('feedbackTopic');
const feedbackContent = document.getElementById('feedbackContent');
const feedbackList = document.getElementById('feedbackList');
const feedbackEmpty = document.getElementById('feedbackEmpty');

// Mock Data
let mockFeedbacks = [];

function renderFeedbacks() {
  if (mockFeedbacks.length === 0) {
    feedbackEmpty.style.display = 'block';
    feedbackList.innerHTML = '';
  } else {
    feedbackEmpty.style.display = 'none';
    feedbackList.innerHTML = mockFeedbacks.map(fb => `
      <div class="feedback-item">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fb-topic">${fb.topic}</div>
          <div class="fb-date">${fb.date}</div>
        </div>
        <div class="fb-content mt-2">${fb.content}</div>
      </div>
    `).join('');
  }
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = feedbackTopic.value;
    const content = feedbackContent.value.trim();
    if (!content) return;

    // Use string padding to mimic local time cleanly
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    mockFeedbacks.unshift({
      topic,
      content,
      date: dateStr
    });

    feedbackContent.value = '';
    renderFeedbacks();
  });
}

document.addEventListener('DOMContentLoaded', renderFeedbacks);
