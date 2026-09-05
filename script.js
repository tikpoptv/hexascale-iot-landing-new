document.getElementById('lead-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.querySelector('input[placeholder="ชื่อ-นามสกุล"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const message = e.target.querySelector('textarea').value.trim();
  const status = document.getElementById('lead-status');

  if (!name || !email || !message) {
    status.style.color = '#fda4af';
    status.textContent = 'กรุณากรอกข้อมูลให้ครบก่อนส่งครับ';
    return;
  }

  status.style.color = '#86efac';
  status.textContent = 'รับข้อมูลแล้ว — ทีมเราจะติดต่อกลับภายใน 24 ชม.';
  e.target.reset();
});

const reveal = () => {
  const el = document.querySelectorAll('.panel, .flow article, .timeline div, .visual-panel');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        item.target.animate([
          { transform: 'translateY(16px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ], { duration: 700, easing: 'ease-out', fill: 'forwards' });
        io.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });

  el.forEach((node) => io.observe(node));
};
reveal();
