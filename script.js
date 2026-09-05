const leadForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');
const heroStage = document.getElementById('hero-stage');
const cards = document.querySelectorAll('.card-3d');

if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = leadForm.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
    const email = leadForm.querySelector('input[type="email"]').value.trim();
    const company = leadForm.querySelector('input[placeholder="บริษัท"]').value.trim();
    const message = leadForm.querySelector('textarea').value.trim();

    if (!name || !email || !company || !message) {
      leadStatus.textContent = 'ใส่ข้อมูลให้ครบก่อนส่งครับ';
      leadStatus.style.color = '#fecaca';
      return;
    }

    leadStatus.textContent = 'รับข้อมูลแล้วครับ ทีมเราจะติดต่อกลับภายใน 1 วันทำการ';
    leadStatus.style.color = '#86efac';
    leadForm.reset();
  });
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-3px) rotateX(${y * -6}deg) rotateY(${x * 8}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

if (heroStage) {
  const nodes = heroStage.querySelectorAll('.node');
  const baseTransforms = Array.from(nodes).map((node) => node.style.transform || '');

  heroStage.addEventListener('pointermove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroStage.style.transform = `rotateX(${(y * -10 + 18).toFixed(2)}deg) rotateY(${(x * 20 - 12).toFixed(2)}deg)`;

    nodes.forEach((n, i) => {
      const add = [4, -4, 6, -4, 2][i] || 0;
      n.style.transform = `${baseTransforms[i] || ''} translateZ(${add}px)`;
    });
  });

  heroStage.addEventListener('pointerleave', () => {
    heroStage.style.transform = 'rotateX(18deg) rotateY(-12deg)';
    nodes.forEach((n, i) => {
      n.style.transform = baseTransforms[i] || '';
    });
  });

  heroStage.style.transform = 'rotateX(18deg) rotateY(-12deg)';
}
