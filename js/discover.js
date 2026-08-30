/**
 * ==========================================================================
 * EVENTRA BHARAT - PREMIUM DISCOVER CORE CONTROLLER
 * Architecture: Vanilla JavaScript Object-Oriented Component Lifecycle
 * ==========================================================================
 */

"use strict";

/* ==========================================================================
   1. METICULOUS PREMIUM MOCK DATABASES (PRODUCTION DATA LAYERS)
   ========================================================================== */

const Categories = [
    { id: "concerts", name: "Concerts", icon: "🎵", desc: "Elite live music & arena productions", img: "../assets/images/dynamic/Concert_crowd_at_sunset.webp" },
    { id: "festivals", name: "Festivals", icon: "🎉", desc: "Grand cultural milestone events", img: "../assets/images/dynamic/Sunburn_Festival_Goa_2026.webp" },
    { id: "melas", name: "Melas", icon: "🎪", desc: "Heritage communal carnivals & fairs", img: "../assets/images/dynamic/Royal_Pushkar_Camel_Mela_Exclusive.webp" },
    { id: "food", name: "Food Festivals", icon: "🍴", desc: "Bespoke culinary tasting tours", img: "../assets/images/dynamic/Assorted_authentic_Indian_street_food_delicacies.webp" },
    { id: "adventure", name: "Adventure", icon: "🏔️", desc: "High-octane geographical escapes", img: "../assets/images/dynamic/Himalayan_Trekking___Survival_Bootcamp.webp" },
    { id: "heritage", name: "Heritage Walks", icon: "🏰", desc: "Curated historical expeditions", img: "../assets/images/dynamic/Old_Delhi_Heritage_Breakfast_Masterclass.webp" },
    { id: "spiritual", name: "Spiritual", icon: "🛕", desc: "Deep ancestral soul journeys", img: "../assets/images/dynamic/Maha_Ganga_Aarti_Devotional_VIP_Deck_Access.webp" },
    { id: "gems", name: "Hidden Gems", icon: "✨", desc: "Undisclosed private paradises", img: "../assets/images/dynamic/White_salt_flats_stretching_under_the_full_moon_in.webp" }
];

const States = [
    { id: "rajasthan", name: "Rajasthan", events: 284, emoji: "🏰", img: "../assets/images/dynamic/Royal_Palace_Architecture_in_Rajasthan.webp" },
    { id: "goa", name: "Goa", events: 162, emoji: "🏖️", img: "../assets/images/dynamic/Sunsets_over_pristine_luxury_beachfront_in_Goa.webp" },
    { id: "kerala", name: "Kerala", events: 191, emoji: "🌴", img: "../assets/images/dynamic/Backwaters_of_Kerala_lined_with_palm_trees.webp" },
    { id: "himachal", name: "Himachal Pradesh", events: 114, emoji: "🏔️", img: "../assets/images/dynamic/Cool_valleys_of_Shimla_during_premium_summer_month.webp" },
    { id: "maharashtra", name: "Maharashtra", events: 342, emoji: "🎭", img: "../assets/images/dynamic/Western_Ghats_mountain_passes_in_Maharashtra.webp" },
    { id: "varanasi", name: "Uttar Pradesh", events: 225, emoji: "🛕", img: "../assets/images/dynamic/Taj_Mahal_Cinematic_Night_View_Tour.webp" }
];

let TrendingEvents = [];

let FeaturedEvents = [];

const Destinations = [
    { id: "d1", name: "Udaipur Lakes & Palaces", type: "Heritage & Romance", size: "size-large", img: "../assets/images/dynamic/Udaipur_Lakes___Palaces.webp" },
    { id: "d2", name: "Varkala Cliff Escapes", type: "Coastal Wilderness", size: "size-wide", img: "../assets/images/dynamic/Varkala_Cliff_Escapes.webp" },
    { id: "d3", name: "Hampi Boulder Horizons", type: "Archeological Legacy", size: "size-tall", img: "../assets/images/dynamic/Hampi_Boulder_Horizons.webp" },
    { id: "d4", name: "Ladakh High Passes", type: "Tectonic Serenity", size: "size-wide", img: "../assets/images/dynamic/Ladakh_High_Passes.webp" },
    { id: "d5", name: "Kashmir Valley Orchards", type: "Alpine Paradise", size: "size-tall", img: "../assets/images/dynamic/Lush_blooming_orchards_of_the_Kashmir_Valley.webp" },
    { id: "d6", name: "Goa Sunset Beachfront", type: "Coastal Luxury", size: "size-large", img: "../assets/images/dynamic/Sunsets_over_pristine_luxury_beachfront_in_Goa.webp" }
];

const Festivals = [
    { id: "fest1", title: "Jaipur Literature Festival 2027 Pre-Pass", loc: "Jaipur", date: "2027-01-21", price: "₹999", img: "../assets/images/dynamic/Jaipur_Literature_Festival_2027_Pre_Pass.webp" },
    { id: "fest2", title: "Hornbill Festival Ultimate Tribe Access", loc: "Anywhere", date: "2026-12-01", price: "₹4,500", img: "../assets/images/dynamic/Hornbill_Festival_Ultimate_Tribe_Access.webp" },
    { id: "fest3", title: "Dev Deepawali Infinite Lights Cruise", loc: "Varanasi", date: "2026-11-23", price: "₹5,000", img: "../assets/images/dynamic/Dev_Deepawali_Infinite_Lights_Cruise.webp" },
    { id: "fest4", title: "Jaipur Literature Durbar Banquet", loc: "Jaipur", date: "2027-01-23", price: "₹2,200", img: "../assets/images/dynamic/Jaipur_Literature_Durbar_Banquet.webp" },
    { id: "fest5", title: "Zomaland Food & Culture Festival", loc: "Bengaluru", date: "2026-11-10", price: "₹1,499", img: "../assets/images/dynamic/Zomaland_Food___Culture_Festival.webp" },
    { id: "fest6", title: "Ajanta & Ellora Classical Dance Convergence", loc: "Mumbai", date: "2026-12-15", price: "₹1,800", img: "../assets/images/dynamic/Ajanta___Ellora_Classical_Dance_Convergence.webp" }
];

const HiddenGems = [
    { id: "g1", title: "Gandikota Grand Canyon Starlight Camp", loc: "Bengaluru", price: "₹3,200", rating: "4.8", img: "../assets/images/dynamic/Gandikota_Grand_Canyon_Starlight_Camp.webp" },
    { id: "g2", title: "Lonar Crater Secret Astrophotography Outing", loc: "Mumbai", price: "₹2,500", rating: "4.9", img: "../assets/images/dynamic/Lonar_Crater_Secret_Astrophotography_Outing.webp" },
    { id: "g3", title: "Chettinad Aristocratic Mansion Culinary Trail", loc: "Anywhere", price: "₹4,800", rating: "5.0", img: "../assets/images/dynamic/Chettinad_Aristocratic_Mansion_Culinary_Trail.webp" },
    { id: "g4", title: "Mawlynnong Living Root Bridges Private Eco Route", loc: "Anywhere", price: "₹1,900", rating: "4.7", img: "../assets/images/dynamic/Mawlynnong_Living_Root_Bridges_Private_Eco_Route.webp" },
    { id: "g5", title: "Hampi Virupaksha Ruins Laser Mapping", loc: "Bengaluru", price: "₹2,800", rating: "4.8", img: "../assets/images/dynamic/Hampi_Virupaksha_Ruins_Laser_Mapping.webp" },
    { id: "g6", title: "Ziro Valley Pine Forest Retreat", loc: "Anywhere", price: "₹3,500", rating: "4.9", img: "../assets/images/dynamic/Pine_forests_and_agricultural_flats_of_Ziro_Valley.webp" }
];

const HandPickedExperiences = [
    { id: "e1", title: "Old Delhi Heritage Breakfast Masterclass", Host: "Chef Sadik", rating: "4.9", price: "₹1,500", img: "../assets/images/dynamic/Old_Delhi_Heritage_Breakfast_Masterclass.webp" },
    { id: "e2", title: "Backwater Traditional Houseboat Jazz Cruise", Host: "Kumarakom Elite", rating: "5.0", price: "₹12,000", img: "../assets/images/dynamic/Backwater_Traditional_Houseboat_Jazz_Cruise.webp" },
    { id: "e3", title: "Fontainhas Luxury Indo-Portuguese Walk", Host: "Arch. Maria", rating: "4.8", price: "₹1,800", img: "../assets/images/dynamic/Fontainhas_Luxury_Indo_Portuguese_Walk.webp" },
    { id: "e4", title: "Royal Awadhi Gastronomy Masterclass", Host: "Chef Nawab", rating: "4.9", price: "₹2,800", img: "../assets/images/dynamic/Royal_Awadhi_Gastronomy_Masterclass.webp" },
    { id: "e5", title: "Le Ladakh Photogenic Autumn Motorbike Tour", Host: "Himalayan Riders", rating: "4.8", price: "₹18,500", img: "../assets/images/dynamic/Le_Ladakh_Photogenic_Autumn_Motorbike_Tour.webp" },
    { id: "e6", title: "Traditional Block Printing & Indigo Dye Workshop", Host: "Artisan Collective", rating: "4.7", price: "₹1,200", img: "../assets/images/dynamic/Traditional_Block_Printing___Indigo_Dye_Workshop.webp" }
];

const Offers = [
    { id: "o1", title: "Amex Premium Cardholder Privilege", desc: "Instantly unlock 15% luxury discount on any high-tier headline live concert.", code: "AMEXGOLD15", discount: "15%" },
    { id: "o2", title: "Festive Season Convergence Passage", desc: "Unlock massive reductions on curated heritage tours & luxury stay packages.", code: "BHARAT2026", discount: "20%" }
];

/* ==========================================================================
   2. DOM ELEMENT REGISTRATION MATRIX
   ========================================================================== */

const DOM = {
    searchInput: document.getElementById("searchInput"),
    locationSelect: document.getElementById("locationSelect"),
    dateInput: document.getElementById("dateInput"),
    categorySelect: document.getElementById("categorySelect"),
    exploreBtn: document.getElementById("exploreBtn"),
    trendingGrid: document.getElementById("trendingGrid"),
    categoryGrid: document.getElementById("categoryGrid"),
    stateGrid: document.getElementById("stateGrid"),
    featuredGrid: document.getElementById("featuredGrid"),
    destinationGrid: document.getElementById("destinationGrid"),
    festivalGrid: document.getElementById("festivalGrid"),
    hiddenGrid: document.getElementById("hiddenGrid"),
    experienceGrid: document.getElementById("experienceGrid"),
    offerGrid: document.getElementById("offerGrid"),
    newsletterForm: document.getElementById("newsletterForm"),
    newsletterEmail: document.getElementById("newsletterEmail"),
    subscribeBtn: document.getElementById("subscribeBtn")
};

/* ==========================================================================
   3. REUSABLE ATOMIC RENDERING ENGINES
   ========================================================================== */

function renderTrending() {
    if (!DOM.trendingGrid) return;
    DOM.trendingGrid.innerHTML = TrendingEvents.map(event => `
        <article class="premium-card style-reveal" data-id="${event.id}">
            <div class="card-img-wrapper">
                <span class="card-badge trending-badge">${event.tag}</span>
                <button class="card-favorite-btn" aria-label="Add to Favorites"><i class="fa-regular fa-heart"></i></button>
                <img src="${event.img}" alt="${event.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-meta-item"><i class="fa-solid fa-location-dot"></i> ${event.loc}</span>
                    <div class="card-rating"><i class="fa-solid fa-star"></i> ${event.rating}</div>
                </div>
                <h3>${event.title}</h3>
                <div class="card-footer-pricing">
                    <div class="card-price-block">
                        <span class="price-label">Tickets From</span>
                        <span class="price-value">${event.price}</span>
                    </div>
                    <button class="card-action-btn">Reserve Pass</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderCategories() {
    if (!DOM.categoryGrid) return;
    DOM.categoryGrid.innerHTML = Categories.map(cat => `
        <div class="premium-category-card style-reveal" data-category="${cat.name}">
            <img src="${cat.img}" alt="${cat.name}" class="category-img" loading="lazy">
            <div class="category-glass-overlay">
                <div class="category-header-row">
                    <div class="category-icon-wrapper">${cat.icon}</div>
                    <div class="category-arrow"><i class="fa-solid fa-arrow-up-right"></i></div>
                </div>
                <div class="category-info">
                    <h3>${cat.name}</h3>
                    <p>${cat.desc}</p>
                </div>
            </div>
        </div>
    `).join("");
}

function renderStates() {
    if (!DOM.stateGrid) return;
    DOM.stateGrid.innerHTML = States.map(state => `
        <div class="state-premium-card style-reveal">
            <div class="state-img-overlay"></div>
            <img src="${state.img}" alt="${state.name}" loading="lazy">
            <div class="state-card-content">
                <div class="state-meta-top">
                    <span class="state-emoji">${state.emoji}</span>
                </div>
                <h3>${state.name}</h3>
                <span class="state-count-tag">${state.events} Premium Matches <i class="fa-solid fa-arrow-right-long"></i></span>
            </div>
        </div>
    `).join("");
}

function renderFeatured() {
    if (!DOM.featuredGrid) return;
    DOM.featuredGrid.innerHTML = FeaturedEvents.map(event => `
        <article class="premium-card style-reveal" data-id="${event.id}">
            <div class="card-img-wrapper">
                <span class="card-badge">Exclusive Access</span>
                <button class="card-favorite-btn" aria-label="Add to Favorites"><i class="fa-regular fa-heart"></i></button>
                <img src="${event.img}" alt="${event.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-meta-item"><i class="fa-solid fa-calendar-days"></i> ${event.date}</span>
                    <div class="card-rating"><i class="fa-solid fa-star"></i> ${event.rating}</div>
                </div>
                <h3>${event.title}</h3>
                <div class="card-footer-pricing">
                    <div class="card-price-block">
                        <span class="price-label">Experience Tier</span>
                        <span class="price-value">${event.price}</span>
                    </div>
                    <button class="card-action-btn">Secure Slot</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderDestinations() {
    if (!DOM.destinationGrid) return;
    DOM.destinationGrid.innerHTML = Destinations.map(dest => `
        <div class="bento-cell ${dest.size} style-reveal">
            <div class="bento-overlay"></div>
            <img src="${dest.img}" alt="${dest.name}" loading="lazy">
            <div class="bento-info">
                <h3>${dest.name}</h3>
                <p><i class="fa-solid fa-compass"></i> ${dest.type}</p>
            </div>
        </div>
    `).join("");
}

function renderFestivals() {
    if (!DOM.festivalGrid) return;
    DOM.festivalGrid.innerHTML = Festivals.map(fest => `
        <article class="premium-card style-reveal" data-id="1">
            <div class="card-img-wrapper">
                <span class="card-badge">Major Milestone</span>
                <img src="${fest.img}" alt="${fest.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-meta-item"><i class="fa-solid fa-location-dot"></i> ${fest.loc}</span>
                    <span class="card-meta-item"><i class="fa-solid fa-calendar"></i> ${fest.date}</span>
                </div>
                <h3>${fest.title}</h3>
                <div class="card-footer-pricing">
                    <div class="card-price-block">
                        <span class="price-label">Pass Options</span>
                        <span class="price-value">${fest.price}</span>
                    </div>
                    <button class="card-action-btn">Get Passes</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderExperiences() {
    if (!DOM.experienceGrid) return;
    DOM.experienceGrid.innerHTML = HandPickedExperiences.map(exp => `
        <article class="premium-card style-reveal" data-id="2">
            <div class="card-img-wrapper">
                <span class="card-badge">Airbnb Expert Tier</span>
                <img src="${exp.img}" alt="${exp.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-meta-item"><i class="fa-solid fa-signature"></i> By ${exp.Host}</span>
                    <div class="card-rating"><i class="fa-solid fa-star"></i> ${exp.rating}</div>
                </div>
                <h3>${exp.title}</h3>
                <div class="card-footer-pricing">
                    <div class="card-price-block">
                        <span class="price-label">All-Inclusive</span>
                        <span class="price-value">${exp.price}</span>
                    </div>
                    <button class="card-action-btn">Book Master</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderOffers() {
    if (!DOM.offerGrid) return;
    DOM.offerGrid.innerHTML = Offers.map(offer => `
        <div class="offer-premium-card style-reveal">
            <div class="offer-content-block">
                <span class="offer-pill">Active Benefit</span>
                <h3>${offer.title}</h3>
                <p>${offer.desc}</p>
                <div class="offer-code-tag">Use Code: <span>${offer.code}</span></div>
            </div>
            <div class="offer-graphic-badge">
                <span class="discount-val">${offer.discount}</span>
                <span class="discount-lbl">Off</span>
            </div>
        </div>
    `).join("");
}

/* ==========================================================================
   4. SYSTEM INTERACTIVE ENGINES & COMPONENT LOGIC
   ========================================================================== */

function initializeSearch() {
    if (!DOM.exploreBtn) return;

    DOM.exploreBtn.addEventListener("click", () => {
        const query = DOM.searchInput ? DOM.searchInput.value.trim() : "";
        const location = DOM.locationSelect ? DOM.locationSelect.value : "Anywhere";
        const date = DOM.dateInput ? DOM.dateInput.value : "";
        const category = DOM.categorySelect ? DOM.categorySelect.value : "All";

        console.log("Execution Strategy Activated: Submitting query parameters to routing layer.");
        console.table({ query, location, date, category });

        // User response feedback simulation via premium dynamic notice mechanics
        const originalBtnText = DOM.exploreBtn.innerHTML;
        DOM.exploreBtn.innerHTML = `<span>Searching Platforms...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        DOM.exploreBtn.disabled = true;

        setTimeout(() => {
            DOM.exploreBtn.innerHTML = originalBtnText;
            DOM.exploreBtn.disabled = false;
            
            // Core filtration feedback system hook
            alert(`🔍 Eventra Concierge Discovery Activated:\n\nSearching for: "${query || 'All Experiences'}"\nLocation: ${location}\nDate Priority: ${date || 'Upcoming Trends'}\nCategory: ${category}\n\nOur system is analyzing matches across real-time provider systems.`);
        }, 1200);
    });

    // Integrated search category pill linking
    document.addEventListener("click", (e) => {
        const pill = e.target.closest(".category-pill-card");
        if (pill && DOM.categorySelect) {
            const targetedCategory = pill.getAttribute("data-category");
            DOM.categorySelect.value = targetedCategory;
            DOM.categorySelect.dispatchEvent(new Event('change'));
            
            // Smoothly redirect viewport metric focus up to the core search module framework
            document.querySelector(".hero-section").scrollIntoView({ behavior: "smooth" });
            return;
        }

        // Global Event Card Navigation Interceptor
        const card = e.target.closest(".premium-card") || e.target.closest(".bento-cell") || e.target.closest(".state-premium-card");
        if (card) {
            let title = "Exclusive Event", img = "", loc = "India";
            
            const imgEl = card.querySelector("img");
            if (imgEl) img = imgEl.getAttribute("src");
            
            const titleEl = card.querySelector("h3");
            if (titleEl) title = titleEl.innerText.trim();

            // Try to find location/meta info
            const locEl = card.querySelector(".fa-location-dot")?.parentElement || card.querySelector(".bento-info p");
            if (locEl) {
                loc = locEl.innerText.trim();
            } else if (card.classList.contains("state-premium-card")) {
                loc = title; // For state cards, location is the state name
            }

            const params = new URLSearchParams();
            params.append("title", title);
            if (img) params.append("img", img);
            params.append("loc", loc);
            
            window.location.href = `event-details.html?${params.toString()}`;
        }
    });
}

function initializeNewsletter() {
    if (!DOM.newsletterForm) return;

    const nlWantsWhatsapp = document.getElementById('nlWantsWhatsapp');
    const nlWhatsapp = document.getElementById('nlWhatsapp');
    const nlWhatsappContainer = document.getElementById('nlWhatsappContainer');

    if (nlWantsWhatsapp && nlWhatsappContainer && nlWhatsapp) {
        nlWantsWhatsapp.addEventListener('change', () => {
            if (nlWantsWhatsapp.checked) {
                nlWhatsappContainer.style.display = 'block';
                nlWhatsapp.required = true;
            } else {
                nlWhatsappContainer.style.display = 'none';
                nlWhatsapp.required = false;
            }
        });
    }

    DOM.newsletterForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailVal = DOM.newsletterEmail ? DOM.newsletterEmail.value.trim() : "";
        const wants_whatsapp = nlWantsWhatsapp ? nlWantsWhatsapp.checked : false;
        const whatsapp_number = nlWhatsapp ? nlWhatsapp.value.trim() : null;
        
        if (!emailVal) return;

        const originalBtn = DOM.subscribeBtn ? DOM.subscribeBtn.innerHTML : "";
        if (DOM.subscribeBtn) {
            DOM.subscribeBtn.innerHTML = `<span>Subscribing...</span>`;
            DOM.subscribeBtn.disabled = true;
        }

        try {
            // Assume CONFIG is loaded globally
            const apiUrl = window.CONFIG ? window.CONFIG.API.NEWSLETTER : 'http://localhost:8000/api/newsletter/subscribe';
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: emailVal,
                    wants_whatsapp: wants_whatsapp,
                    whatsapp_number: whatsapp_number
                })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                alert(`✨ ${data.message}`);
                if (DOM.newsletterForm) DOM.newsletterForm.reset();
            } else {
                alert(data.detail || data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Newsletter subscribe error:', err);
            alert('Could not connect to the server. Please try again later.');
        } finally {
            if (DOM.subscribeBtn) {
                DOM.subscribeBtn.innerHTML = originalBtn;
                DOM.subscribeBtn.disabled = false;
            }
        }
    });
}

function initializeAnimations() {
    // Premium reveal animation pattern logic via optimized modern CSS properties interception
    const elementsToReveal = document.querySelectorAll(".style-reveal");
    
    // Setup immediate inline fade configurations safely to eliminate initial layout flashes
    elementsToReveal.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                observer.unobserve(target); // Performance optimization: stop observing fired nodes
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers sequence just prior entry to minimize active lag
    });

    elementsToReveal.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. SYSTEM CONVERGENCE ROOT INITIALIZER
   ========================================================================== */

async function initializeApplicationSystem() {
    // Hero slider removed in favor of static image

    try {
        const responseTrending = await fetch(`${CONFIG.API.EVENTS}?is_trending=true`);
        const trendingData = await responseTrending.json();
        TrendingEvents = trendingData.slice(0, 6).map(ev => ({
            id: ev.id,
            title: ev.title,
            cat: ev.category,
            loc: ev.location.split(',')[1]?.trim() || ev.location.split(',')[0],
            date: ev.date,
            rating: ev.rating,
            price: ev.price,
            tag: ev.tickets_available < 500 ? "Selling Fast" : "Trending",
            img: ev.image
        }));

        const responseFeatured = await fetch(`${CONFIG.API.EVENTS}?is_featured=true`);
        const featuredData = await responseFeatured.json();
        FeaturedEvents = featuredData.slice(0, 6).map(ev => ({
            id: ev.id,
            title: ev.title,
            cat: ev.category,
            loc: ev.location.split(',')[1]?.trim() || ev.location.split(',')[0],
            date: ev.date,
            rating: ev.rating,
            price: ev.price,
            img: ev.image
        }));
    } catch (e) {
        console.error("Failed to load events from backend", e);
    }

    // Order-specific asynchronous dynamic initialization loops
    renderTrending();
    renderCategories();
    renderStates();
    renderFeatured();
    renderDestinations();
    renderFestivals();
    renderExperiences();
    renderOffers();

    // Functional bindings injection
    initializeSearch();
    initializeNewsletter();
    
    // Delays execution slightly to let browser parse active DOM trees for animations layout stability
    setTimeout(initializeAnimations, 100);
}

// Navbar scroll transparency toggle
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const heroSection = document.querySelector('.hero-section');
        const threshold = heroSection ? heroSection.offsetHeight * 0.35 : 80;
        navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }
}, { passive: true });

// System execution ignition thread execution anchor
document.addEventListener("DOMContentLoaded", initializeApplicationSystem);
