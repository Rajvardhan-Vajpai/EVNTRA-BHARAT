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
      const hero = document.querySelector('.hero');
      const threshold = hero ? hero.offsetHeight - 100 : 50;
      navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }
  }, { passive: true });

  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    const frameCount = 250;
    
    // Set fixed internal resolution for the canvas
    canvas.width = 1920;
    canvas.height = 1080;
    
    const currentFrame = index => (
      `../assets/images/hero/hero/ezgif-frame-${index.toString().padStart(3, '0')}.png`
    );

    const images = [];
    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img;
      }
    };

    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
    };

    const updateImage = index => {
      const img = images[index];
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else {
        // Fallback in case user scrolls fast before it's preloaded
        const fallbackImg = new Image();
        fallbackImg.src = currentFrame(index);
        fallbackImg.onload = () => {
          context.drawImage(fallbackImg, 0, 0, canvas.width, canvas.height);
        };
      }
    };

    window.addEventListener('scroll', () => {
      // The hero section is 300vh, frame is sticky. 
      // Calculate scroll fraction within the hero section.
      const heroSection = document.querySelector('.hero');
      if (!heroSection) return;
      
      const scrollY = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight - window.innerHeight;
      
      let scrollFraction = (scrollY - heroTop) / heroHeight;
      scrollFraction = Math.max(0, Math.min(scrollFraction, 1));
      
      const frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.ceil(scrollFraction * frameCount))
      );
      
      // Fade out hero content as user scrolls
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        // Fade completely by 30% of the scroll height
        const opacity = Math.max(0, 1 - (scrollFraction * 3.33));
        heroContent.style.opacity = opacity;
        // Optionally disable pointer events when fully transparent
        heroContent.style.pointerEvents = opacity <= 0 ? 'none' : 'auto';
      }

      requestAnimationFrame(() => updateImage(frameIndex));
    }, { passive: true });

    preloadImages();
  }

  document.querySelectorAll('.city-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.city-chip').forEach(x => x.classList.remove('active'));
      chip.classList.add('active');

      const selectedCity = chip.getAttribute('data-city');
      const eventCards = document.querySelectorAll('#eventGrid .event-card');

      eventCards.forEach(card => {
        const cardCity = card.getAttribute('data-city');
        if (selectedCity === 'all' || cardCity === selectedCity) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  window.toggleFav = function toggleFav(btn) {
    const on = btn.textContent === '♥';
    btn.textContent = on ? '♡' : '♥';
    btn.style.color = on ? '' : '#e74c3c';
    btn.style.transform = 'scale(1.35)';
    setTimeout(() => btn.style.transform = '', 180);
  };

  // --- PROGRESSIVE DISCLOSURE (CARD EXPANSION & CAROUSEL) ---
  const allCards = document.querySelectorAll('.event-card');
  allCards.forEach(card => {
    let carouselInterval;
    let currentIndex = 0;
    const carouselImages = card.querySelectorAll('.carousel-img');
    const dots = card.querySelectorAll('.dot');

    function showSlide(index) {
      if (!carouselImages.length) return;
      carouselImages.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      carouselImages[index].classList.add('active');
      if(dots[index]) dots[index].classList.add('active');
      currentIndex = index;
    }

    function startCarousel() {
      stopCarousel();
      if (carouselImages.length > 1) {
        carouselInterval = setInterval(() => {
          let newIndex = currentIndex + 1;
          if (newIndex >= carouselImages.length) newIndex = 0;
          showSlide(newIndex);
        }, 3000); // Change image every 3 seconds
      }
    }

    function stopCarousel() {
      if (carouselInterval) clearInterval(carouselInterval);
    }

    // 1. Expand Card on click
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking close, favorite, or know-more
      if (e.target.closest('.btn-close-expand') || e.target.closest('.btn-know-more') || e.target.closest('.ev-fav') || e.target.closest('.carousel-btn')) {
        return;
      }
      
      const isExpanded = card.classList.contains('is-expanded');
      
      // Close all other cards first
      allCards.forEach(c => {
        c.classList.remove('is-expanded');
        // If we had a way to access other cards' stopCarousel, we would call it. 
        // For now, it's safer to just rely on the click handler.
        // But to be robust, we'll dispatch a custom event to stop them.
        c.dispatchEvent(new CustomEvent('stop-carousel'));
      });

      if (!isExpanded) {
        card.classList.add('is-expanded');
        startCarousel();
        // Smooth scroll to make sure the expanded card is visible
        setTimeout(() => {
          const y = card.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 300); // Wait for transition
      }
    });

    card.addEventListener('stop-carousel', stopCarousel);

    // 2. Close button inside expanded card
    const closeBtn = card.querySelector('.btn-close-expand');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('is-expanded');
        stopCarousel();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(idx);
        startCarousel(); // Reset timer
      });
    });
  });

  // --- NEWSLETTER SUBSCRIPTION LOGIC ---
  const nlForm = document.getElementById('newsletterForm');
  const nlSuccessMsg = document.getElementById('nlSuccessMsg');
  const nlSubmitBtn = document.getElementById('nlSubmitBtn');
  
  if (nlForm) {
    const nlWantsWhatsapp = document.getElementById('nlWantsWhatsapp');
    const nlWhatsapp = document.getElementById('nlWhatsapp');
    
    if (nlWantsWhatsapp && nlWhatsapp) {
      nlWantsWhatsapp.addEventListener('change', () => {
        if (nlWantsWhatsapp.checked) {
          nlWhatsapp.style.display = 'block';
          nlWhatsapp.required = true;
        } else {
          nlWhatsapp.style.display = 'none';
          nlWhatsapp.required = false;
        }
      });
    }

    nlForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('nlEmail');
      const email = emailInput.value.trim();
      const wants_whatsapp = nlWantsWhatsapp ? nlWantsWhatsapp.checked : false;
      const whatsapp_number = nlWhatsapp ? nlWhatsapp.value.trim() : null;
      
      if (email) {
        // Show loading state
        nlSubmitBtn.textContent = 'Subscribing...';
        nlSubmitBtn.style.opacity = '0.7';
        nlSubmitBtn.disabled = true;
        
        try {
          // Assume CONFIG is loaded globally
          const apiUrl = window.CONFIG ? window.CONFIG.API.NEWSLETTER : 'http://localhost:8000/api/newsletter/subscribe';
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email,
              wants_whatsapp: wants_whatsapp,
              whatsapp_number: whatsapp_number
            })
          });
          const data = await res.json();
          
          if (res.ok && data.success) {
            nlForm.style.display = 'none';
            nlSuccessMsg.style.display = 'block';
            nlSuccessMsg.textContent = data.message || 'Thanks for subscribing! Check your inbox for updates.';
            emailInput.value = '';
          } else {
            alert(data.detail || data.message || 'Something went wrong. Please try again.');
          }
        } catch (err) {
          console.error('Newsletter subscribe error:', err);
          alert('Could not connect to the server. Please try again later.');
        } finally {
          nlSubmitBtn.textContent = 'Subscribe';
          nlSubmitBtn.style.opacity = '1';
          nlSubmitBtn.disabled = false;
        }
      }
    });
  }
});
