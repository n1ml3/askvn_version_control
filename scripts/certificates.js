/* certificates.js */
const mockCertificates = [
  // {
  //   id: 1,
  //   title: "Chứng nhận hoàn thành khóa Mật Mã Tiền Tệ",
  //   date: "14/03/2026",
  //   img: "data:image/svg+xml;utf8,<svg width='200' height='150' xmlns='http://www.w3.org/2000/svg'><rect width='200' height='150' fill='%23fafafa'/><rect x='10' y='10' width='180' height='130' fill='none' stroke='%23d1d5db' stroke-width='2'/><circle cx='100' cy='60' r='20' fill='%23fcd34d'/><polygon points='95,80 105,80 110,100 100,95 90,100' fill='%23fbbf24'/><line x1='50' y1='110' x2='150' y2='110' stroke='%23374151' stroke-width='2'/><line x1='70' y1='120' x2='130' y2='120' stroke='%239ca3af' stroke-width='2'/></svg>"
  // },
  // {
  //   id: 2,
  //   title: "Chứng nhận nghệ thuật đọc nhanh K1",
  //   date: "20/02/2026",
  //   img: "data:image/svg+xml;utf8,<svg width='200' height='150' xmlns='http://www.w3.org/2000/svg'><rect width='200' height='150' fill='%23fafafa'/><rect x='10' y='10' width='180' height='130' fill='none' stroke='%23d1d5db' stroke-width='2'/><circle cx='100' cy='60' r='20' fill='%23fcd34d'/><polygon points='95,80 105,80 110,100 100,95 90,100' fill='%23fbbf24'/><line x1='50' y1='110' x2='150' y2='110' stroke='%23374151' stroke-width='2'/><line x1='70' y1='120' x2='130' y2='120' stroke='%239ca3af' stroke-width='2'/></svg>"
  // }
];

function renderCertificates() {
  const grid = document.getElementById('certificateGrid');
  const emptyState = document.getElementById('certEmptyState');
  if (!grid) return;

  if (mockCertificates.length === 0) {
    if (emptyState) emptyState.classList.remove('d-none');
    grid.innerHTML = '';
  } else {
    if (emptyState) emptyState.classList.add('d-none');

    grid.innerHTML = mockCertificates.map(cert => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="cert-card">
          <div class="cert-thumb">
            <img src="${cert.img}" alt="Certificate">
          </div>
          <div class="cert-body">
            <div class="cert-title">${cert.title}</div>
            <div class="cert-date">Cấp ngày: ${cert.date}</div>
            <div class="cert-footer">
              <a href="#" class="btn-cert btn-cert-primary"><i class="bi bi-download me-1"></i>Tải xuống</a>
              <a href="#" class="btn-cert btn-cert-primary"><i class="bi bi-eye me-1"></i>Xem</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderCertificates);
