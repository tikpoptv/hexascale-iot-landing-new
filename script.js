const track = document.getElementById('story-track');
const leadForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');

if (track && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // duplicate slides for seamless looping
  const original = track.innerHTML;
  track.insertAdjacentHTML('beforeend', original);
}

if (leadForm && leadStatus) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = leadForm.querySelector('input[placeholder="ชื่อ"]').value.trim();
    const email = leadForm.querySelector('input[type="email"]').value.trim();
    const goal = leadForm.querySelector('textarea').value.trim();

    if (!name || !email || !goal) {
      leadStatus.style.color = '#ef4444';
      leadStatus.textContent = 'กรอกให้ครบก่อนส่งครับ';
      return;
    }

    leadStatus.style.color = '#16a34a';
    leadStatus.textContent = 'รับข้อมูลแล้วครับ ทีมเราจะติดต่อกลับเร็วๆ นี้';
    leadForm.reset();
  });
}
