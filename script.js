const leadForm = document.getElementById('lead-form');
const leadStatus = document.getElementById('lead-status');
const cards = document.querySelectorAll('.card-3d');
const heroStage = document.getElementById('hero-stage');
const nodes = heroStage ? heroStage.querySelectorAll('.node') : [];
const heroRevealEls = document.querySelectorAll('.panel, .flow article, .timeline div, .visual-panel');

const stageBase = { rotateX: 18, rotateY: -16 };
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = leadForm.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
    const email = leadForm.querySelector('input[type="email"]').value.trim();
    const message = leadForm.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      leadStatus.style.color = '#fda4af';
      leadStatus.textContent = 'กรุณากรอกข้อมูลให้ครบก่อนส่งครับ';
      return;
    }

    leadStatus.style.color = '#86efac';
    leadStatus.textContent = 'รับข้อมูลแล้ว — ทีมเราจะติดต่อกลับภายใน 24 ชม.';
    leadForm.reset();
  });
}

cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const rx = ((cy / rect.height) - 0.5) * -10;
    const ry = ((cx / rect.width) - 0.5) * 12;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

if (heroStage && nodes.length) {
  heroStage.addEventListener('pointermove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = clamp((x - 0.5) * 28, -16, 16);
    const rotateX = clamp((0.5 - y) * 22, -18, 18);

    heroStage.style.transform = `rotateX(${rotateX + stageBase.rotateX}deg) rotateY(${rotateY + stageBase.rotateY}deg)`;
    nodes.forEach((node, idx) => {
      const depth = [4, -6, 7, -5, 11][idx] || 0;
      node.style.transform = `${node.style.transform.split(' translate')[0]} translateZ(${depth}px)`;
    });
  });
  heroStage.addEventListener('pointerleave', () => {
    heroStage.style.transform = `rotateX(${stageBase.rotateX}deg) rotateY(${stageBase.rotateY}deg)`;
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { transform: 'translateY(16px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        {
          duration: 700,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

heroRevealEls.forEach((el) => io.observe(el));

// bootstrap hero tilt
if (heroStage) {
  heroStage.style.transform = `rotateX(${stageBase.rotateX}deg) rotateY(${stageBase.rotateY}deg)`;
}
