import json

events = [
  {'id': 'sunburn-festival', 'city': 'Goa', 'cat': 'Concert', 'name': 'Sunburn Festival Goa', 'date': 'Dec 28-31, 2025', 'price': '₹3,499', 'badge': 'Trending', 'b_class': 'b-trend', 'path': '../assets/images/events/goa/sunburn-festival', 'desc': 'Asia\'s biggest electronic dance music festival featuring world-renowned DJs.', 'rating': '4.9/5', 'highlights': ['Multiple Stages', 'Global Headliners', 'Flea Market']},
  {'id': 'durga-puja', 'city': 'Kolkata', 'cat': 'Religious', 'name': 'Durga Puja Kolkata', 'date': 'Oct 1-5, 2025', 'price': 'Free', 'badge': 'Editor\'s Pick', 'b_class': 'b-pick', 'path': '../assets/images/events/kolkata/durga-puja', 'desc': 'The grandest celebration of art, culture, and devotion in the City of Joy.', 'rating': '5.0/5', 'highlights': ['Art Installations', 'Cultural Performances', 'Street Food']},
  {'id': 'jaipur-lit-fest', 'city': 'Jaipur', 'cat': 'Cultural', 'name': 'Jaipur Literature Fest', 'date': 'Jan 30 - Feb 3, 2026', 'price': '₹499', 'badge': 'Popular', 'b_class': 'b-trend', 'path': '../assets/images/events/jaipur/jaipur-literature-festival', 'desc': 'The greatest literary show on Earth, bringing together authors, thinkers, and leaders.', 'rating': '4.8/5', 'highlights': ['Speaker Panels', 'Book Signings', 'Heritage Venue']},
  {'id': 'comic-con-delhi', 'city': 'Delhi', 'cat': 'Startup', 'name': 'Delhi Comic Con', 'date': 'Dec 6-8, 2025', 'price': '₹899', 'badge': 'New', 'b_class': 'b-new', 'path': '../assets/images/events/delhi/comic-con-delhi', 'desc': 'India\'s greatest pop-culture experience with cosplay, merchandise, and comics.', 'rating': '4.7/5', 'highlights': ['Cosplay Contest', 'Exclusive Merch', 'Artist Alley']},
  {'id': 'nh7-weekender-pune', 'city': 'Pune', 'cat': 'Concert', 'name': 'NH7 Weekender', 'date': 'Dec 14-15, 2025', 'price': '₹2,499', 'badge': 'Trending', 'b_class': 'b-trend', 'path': '../assets/images/events/pune/nh7-weekender-pune', 'desc': 'The happiest music festival featuring indie, rock, and electronic artists.', 'rating': '4.8/5', 'highlights': ['Multi-genre', 'Art Installations', 'Food Market']},
  {'id': 'bengaluru-food-fete', 'city': 'Bengaluru', 'cat': 'Food Festival', 'name': 'Bengaluru Food Fete', 'date': 'Nov 15-17, 2025', 'price': '₹299', 'badge': 'Editor\'s Pick', 'b_class': 'b-pick', 'path': '../assets/images/events/bengaluru/bengaluru-food-fete', 'desc': 'A culinary extravaganza showcasing the best of local and international cuisines.', 'rating': '4.6/5', 'highlights': ['Live Cooking', 'Food Trucks', 'Music']},
  {'id': 'international-kite-festival', 'city': 'Ahmedabad', 'cat': 'Cultural', 'name': 'Intl Kite Festival', 'date': 'Jan 14, 2026', 'price': 'Free', 'badge': 'Popular', 'b_class': 'b-trend', 'path': '../assets/images/events/ahmedabad/international-kite-festival', 'desc': 'The sky fills with millions of colorful kites celebrating Makar Sankranti.', 'rating': '4.9/5', 'highlights': ['Global Kite Flyers', 'Night Kites', 'Gujarati Food']},
  {'id': 'chennai-marathon', 'city': 'Chennai', 'cat': 'Sports', 'name': 'Chennai Marathon', 'date': 'Jan 5, 2026', 'price': '₹1,200', 'badge': 'New', 'b_class': 'b-new', 'path': '../assets/images/events/chennai/chennai-marathon', 'desc': 'One of India\'s largest running events spanning the beautiful coastline of Chennai.', 'rating': '4.7/5', 'highlights': ['Scenic Route', 'Medical Support', 'Finisher Medal']},
  {'id': 'numaish-exhibition', 'city': 'Hyderabad', 'cat': 'Mela', 'name': 'Numaish Exhibition', 'date': 'Jan 1 - Feb 15, 2026', 'price': '₹50', 'badge': 'Trending', 'b_class': 'b-trend', 'path': '../assets/images/events/hyderabad/numaish-exhibition', 'desc': 'A massive 45-day all-India industrial exhibition and consumer fair.', 'rating': '4.5/5', 'highlights': ['Amusement Rides', 'Shopping', 'Hyderabadi Cuisine']}
]

html = ''
for ev in events:
    html += f'''
        <!-- Event: {ev['name']} -->
        <article class="event-card" data-city="{ev['city']}" data-id="{ev['id']}">
          <!-- COMPACT STATE -->
          <div class="card-compact">
            <div class="ev-img">
              <img src="{ev['path']}/1.webp" alt="{ev['name']}">
              <div class="ev-badges">
                <span class="ev-badge {ev['b_class']}">{ev['badge']}</span>
                <button class="ev-fav" onclick="event.preventDefault();event.stopPropagation();toggleFav(this)">♡</button>
              </div>
            </div>
            <div class="ev-body">
              <div class="ev-meta-row"><span class="ev-cat">{ev['cat']}</span><span class="ev-sep"></span><span class="ev-city">{ev['city']}</span></div>
              <div class="ev-name">{ev['name']}</div>
              <div class="ev-date">📅 {ev['date']}</div>
              <div class="ev-footer">
                <div><div class="ev-price-label">Starting from</div><div class="ev-price-val">{ev['price']}</div></div>
                <button class="btn-book" onclick="event.preventDefault();event.stopPropagation();window.location.href='event-details.html?event={ev['id']}'">Book Now</button>
              </div>
            </div>
          </div>
          
          <!-- EXPANDED STATE -->
          <div class="card-expanded">
            <div class="expanded-carousel">
                <img src="{ev['path']}/1.webp" class="carousel-img active" data-index="0">
                <img src="{ev['path']}/2.webp" class="carousel-img" data-index="1">
                <img src="{ev['path']}/3.webp" class="carousel-img" data-index="2">
                <img src="{ev['path']}/4.webp" class="carousel-img" data-index="3">
                
                <button class="carousel-btn prev-btn">‹</button>
                <button class="carousel-btn next-btn">›</button>
                
                <div class="carousel-dots">
                    <span class="dot active" data-index="0"></span>
                    <span class="dot" data-index="1"></span>
                    <span class="dot" data-index="2"></span>
                    <span class="dot" data-index="3"></span>
                </div>
            </div>
            <div class="expanded-info">
                <button class="btn-close-expand">×</button>
                <div class="exp-meta">
                    <span class="exp-cat">{ev['cat']}</span> • <span class="exp-city">{ev['city']}</span>
                </div>
                <h3 class="exp-title">{ev['name']}</h3>
                <div class="exp-rating">⭐ {ev['rating']}</div>
                <p class="exp-desc">{ev['desc']}</p>
                <ul class="exp-highlights">
                    <li>✓ {ev['highlights'][0]}</li>
                    <li>✓ {ev['highlights'][1]}</li>
                    <li>✓ {ev['highlights'][2]}</li>
                </ul>
                <div class="exp-bottom">
                    <div class="exp-date-loc">
                        <div>📅 {ev['date']}</div>
                    </div>
                    <a href="event-details.html?event={ev['id']}" class="btn-know-more">Know More →</a>
                </div>
            </div>
          </div>
        </article>
'''

with open('html/home.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<div class="event-grid reveal" id="eventGrid">'
end_marker = '</div>\n  </div>\n</section>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx + len(start_marker)] + html + "    " + content[end_idx:]
    with open('html/home.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced eventGrid content successfully.")
else:
    print("Could not find markers.")
