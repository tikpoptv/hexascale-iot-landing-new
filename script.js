const scene = document.getElementById('isometric');
const cards = document.querySelectorAll('.card-3d');
const contactForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

if (scene) {
  const isos = scene.querySelectorAll('.iso');
  const baseTransform = Array.from(isos).map((el) => el.style.transform || '');

  scene.addEventListener('pointermove', (event) => {
    const r = scene.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;

    const rx = clamp(py * -15, -18, 18);
    const ry = clamp(px * 20, -22, 22);
    scene.style.transform = `rotateX(${14 + rx}deg) rotateY(${-8 + ry}deg)`;

    isos.forEach((el, i) => {
      const depth = [28, 44, 72, 44, 30][i] || 0;
      el.style.transform = `${baseTransform[i]} translateZ(${depth}px)`;
    });
  });

  scene.addEventListener('pointerleave', () => {
    scene.style.transform = 'rotateX(12deg) rotateY(-8deg)';
    isos.forEach((el, i) => {
      el.style.transform = baseTransform[i] || '';
    });
  });

  scene.style.transform = 'rotateX(12deg) rotateY(-8deg)';
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const r = card.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 5}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

if (contactForm && leadStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const msg = contactForm.querySelector('textarea').value.trim();

    if (!name || !email || !msg) {
      leadStatus.style.color = '#fecdd3';
      leadStatus.textContent = 'ใส่ข้อมูลให้ครบก่อนส่งครับ';
      return;
    }

    leadStatus.style.color = '#86efac';
    leadStatus.textContent = 'รับข้อมูลแล้วครับ ทีมเราจะติดต่อกลับภายในวันนี้';
    contactForm.reset();
  });
}
