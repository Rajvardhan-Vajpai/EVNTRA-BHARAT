css_addition = """
/* --- EVENT CARD EXPANDED STATE --- */
.event-card {
  position: relative;
  /* Add smooth transition for expansion */
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, grid-column 0.4s, min-height 0.4s;
}
.event-card .card-expanded {
  display: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.event-card.is-expanded {
  grid-column: 1 / -1; /* Spans full width */
  background: var(--paper);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  cursor: default;
  transform: none !important;
  box-shadow: var(--shadow-3);
  min-height: 480px;
}
.event-card.is-expanded .card-compact {
  display: none;
}
.event-card.is-expanded .card-expanded {
  display: contents; /* Let grid layout the children */
  opacity: 1;
}

/* Expanded Carousel */
.expanded-carousel {
  position: relative;
  height: 100%;
  min-height: 480px;
  background: #000;
  overflow: hidden;
}
.carousel-img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease, transform 6s ease-out;
  transform: scale(1.05);
}
.carousel-img.active {
  opacity: 1;
  transform: scale(1);
}
.carousel-btn {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  color: white; border: none;
  width: 44px; height: 44px; border-radius: 50%;
  font-size: 24px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}
.carousel-btn:hover { background: rgba(255,255,255,0.4); }
.prev-btn { left: 16px; }
.next-btn { right: 16px; }
.carousel-dots {
  position: absolute;
  bottom: 20px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px; z-index: 10;
}
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,0.4); cursor: pointer;
  transition: background 0.3s;
}
.dot.active { background: white; }

/* Expanded Info Section */
.expanded-info {
  padding: 48px;
  position: relative;
  display: flex; flex-direction: column;
}
.btn-close-expand {
  position: absolute;
  top: 24px; right: 24px;
  background: transparent; border: none;
  font-size: 28px; color: var(--ink-soft);
  cursor: pointer; transition: color 0.2s;
  line-height: 1;
}
.btn-close-expand:hover { color: var(--maroon); }
.exp-meta { font-size: 13px; font-weight: 600; text-transform: uppercase; color: var(--gold); letter-spacing: 0.05em; margin-bottom: 12px; }
.exp-city { color: var(--ink-soft); }
.exp-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--ink); margin-bottom: 16px; line-height: 1.2; }
.exp-rating { font-weight: 700; color: #444; margin-bottom: 20px; font-size: 15px; }
.exp-desc { font-size: 16px; line-height: 1.6; color: var(--ink); margin-bottom: 24px; }
.exp-highlights { list-style: none; padding: 0; margin: 0 0 40px 0; }
.exp-highlights li { font-size: 14.5px; color: var(--ink-soft); margin-bottom: 8px; }

.exp-bottom {
  margin-top: auto;
  display: flex; align-items: flex-end; justify-content: space-between;
  border-top: 1px solid var(--line); padding-top: 24px;
}
.exp-date-loc { font-size: 14px; font-weight: 500; color: var(--ink); }
.btn-know-more {
  background: var(--maroon); color: #fff !important;
  font-family: 'Lato', sans-serif; font-weight: 700;
  padding: 14px 28px; border-radius: var(--r-full);
  text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
}
.btn-know-more:hover { transform: translateY(-2px); box-shadow: var(--shadow-2); }
"""

with open('css/home.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = "/* --- TESTIMONIALS --- */"
idx = content.find(target)

if idx != -1:
    new_content = content[:idx] + css_addition + "\n" + content[idx:]
    with open('css/home.css', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added CSS.")
else:
    print("Not found.")
