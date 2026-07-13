document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const cardElements = document.querySelectorAll('.cat-card, .event-card');

  const showNow = () => {
    revealElements.forEach(el => el.classList.add('visible'));
    cardElements.forEach((el, index) => {
      setTimeout(() => el.classList.add('visible'), index * 90);
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => io.observe(el));

    const cardIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children);
          const order = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), order * 90);
          cardIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cardElements.forEach(el => cardIo.observe(el));
  } else {
    showNow();
  }

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg) {
      const y = Math.min(window.scrollY, 600);
      heroBg.style.transform = `translateY(${y * 0.18}px) scale(${1 + y * 0.0002})`;
    }
  }, { passive: true });

  document.querySelectorAll('.city-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.city-chip').forEach(x => x.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  window.toggleFav = function toggleFav(btn) {
    const on = btn.textContent === '♥';
    btn.textContent = on ? '♡' : '♥';
    btn.style.color = on ? '' : '#e74c3c';
    btn.style.transform = 'scale(1.35)';
    setTimeout(() => btn.style.transform = '', 180);
  };
});
