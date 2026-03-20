/* ========================================================
   ASK Training Vietnam – Lecture Page Scripts
   File: scripts/lecture.js
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const videoPlayer = document.getElementById('videoPlayer');
  const videoTitle = document.getElementById('videoTitle');
  const videoItems = document.querySelectorAll('.video-item');

  videoItems.forEach(item => {
    item.addEventListener('click', function() {
      // 1. Remove active state from all items
      videoItems.forEach(vi => {
        vi.classList.remove('active', 'border-info-subtle');
        vi.classList.add('border-transparent');
        // Reset icon color
        const icon = vi.querySelector('.item-icon');
        if (icon) {
          icon.classList.remove('text-primary');
          icon.classList.add('text-muted');
        }
      });

      // 2. Add active state to clicked item
      this.classList.add('active', 'border-info-subtle');
      this.classList.remove('border-transparent');
      
      const icon = this.querySelector('.item-icon');
      if (icon) {
        icon.classList.remove('text-muted');
        icon.classList.add('text-primary');
      }

      // 3. Update video player iframe source
      const url = this.getAttribute('data-url');
      if (videoPlayer && url) {
        videoPlayer.src = url;
      }

      // 4. Update the title below video player
      const title = this.getAttribute('data-title');
      if (videoTitle && title) {
        videoTitle.textContent = title;
      }
    });
  });
});
