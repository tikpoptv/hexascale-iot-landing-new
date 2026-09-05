const heroPanel = document.getElementById('hero-3d');
const cards = document.querySelectorAll('.card-3d');
const leadForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');

if (heroPanel) {
  const metrics = heroPanel.querySelectorAll('.metric');
  const base = Array.from(metrics).map((m) => m.style.transform || '');

  heroPanel.addEventListener('pointermove', (e) => {
    const rect = heroPanel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = y * -8;
    const ry = x * 10;
    heroPanel.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    metrics.forEach((m, idx) => {
      const z = [10, 14, 18][idx] || 0;
      m.style.transform = `translateZ(${z}px)`;
    });
  });

  heroPanel.addEventListener('pointerleave', () => {
    heroPanel.style.transform = 'rotateX(0deg) rotateY(0deg)';
    metrics.forEach((m, idx) => {
      m.style.transform = base[idx] || '';
    });
  });
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 8}deg) translateY(-3px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

if (leadForm && leadStatus) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = leadForm.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
    const email = leadForm.querySelector('input[type="email"]').value.trim();
    const msg = leadForm.querySelector('textarea').value.trim();

    if (!name || !email || !msg) {
      leadStatus.style.color = '#ef4444';
      leadStatus.textContent = 'กรุณากรอกข้อมูลให้ครบครับ';
      return;
    }

    leadStatus.style.color = '#16a34a';
    leadStatus.textContent = 'รับข้อมูลแล้วครับ ทีมเราจะติดต่อกลับภายในวันนี้';
    leadForm.reset();
  });
}
