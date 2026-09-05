const hero = document.getElementById('orbital');
const cards = document.querySelectorAll('.tile-3d');
const leadForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');

if (hero) {
  const orbs = hero.querySelectorAll('.orb');
  const start = Array.from(orbs).map((el) => el.style.transform || '');

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    hero.style.transform = `rotateX(${(y * -12 + 12).toFixed(2)}deg) rotateY(${(x * 16 - 10).toFixed(2)}deg)`;
    orbs.forEach((o, idx) => {
      const z = [6, -4, 8, -7, 2][idx] || 0;
      o.style.transform = `${start[idx]} translateZ(${z}px)`;
    });
  });

  hero.addEventListener('pointerleave', () => {
    hero.style.transform = 'rotateX(12deg) rotateY(-10deg)';
    orbs.forEach((o, idx) => {
      o.style.transform = start[idx] || '';
    });
  });

  hero.style.transform = 'rotateX(12deg) rotateY(-10deg)';
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${y * -5}deg) rotateY(${x * 8}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

if (leadForm && leadStatus) {
  leadForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = leadForm.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
    const email = leadForm.querySelector('input[type="email"]').value.trim();
    const msg = leadForm.querySelector('textarea').value.trim();

    if (!name || !email || !msg) {
      leadStatus.textContent = 'ใส่ข้อมูลให้ครบก่อนส่งครับ';
      leadStatus.style.color = '#fecaca';
      return;
    }

    leadStatus.textContent = 'รับข้อมูลแล้วครับ ทีมเราจะติดต่อกลับภายในวันนี้';
    leadStatus.style.color = '#86efac';
    leadForm.reset();
  });
}
