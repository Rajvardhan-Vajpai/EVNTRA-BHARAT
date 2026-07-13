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
    { id: "concerts", name: "Concerts", icon: "🎵", desc: "Elite live music & arena productions" },
    { id: "festivals", name: "Festivals", icon: "🎉", desc: "Grand cultural milestone events" },
    { id: "melas", name: "Melas", icon: "🎪", desc: "Heritage communal carnivals & fairs" },
    { id: "food", name: "Food Festivals", icon: "🍴", desc: "Bespoke culinary tasting tours" },
    { id: "adventure", name: "Adventure", icon: "🏔️", desc: "High-octane geographical escapes" },
    { id: "heritage", name: "Heritage Walks", icon: "🏰", desc: "Curated historical expeditions" },
    { id: "spiritual", name: "Spiritual", icon: "🛕", desc: "Deep ancestral soul journeys" },
    { id: "gems", name: "Hidden Gems", icon: "✨", desc: "Undisclosed private paradises" }
];

const States = [
    { id: "rajasthan", name: "Rajasthan", events: 284, emoji: "🏰", img: "../assets/images/placeholder-landscape.svg" },
    { id: "goa", name: "Goa", events: 162, emoji: "🏖️", img: "../assets/images/placeholder-landscape.svg" },
    { id: "kerala", name: "Kerala", events: 191, emoji: "🌴", img: "../assets/images/placeholder-landscape.svg" },
    { id: "himachal", name: "Himachal Pradesh", events: 114, emoji: "🏔️", img: "../assets/images/placeholder-landscape.svg" },
    { id: "maharashtra", name: "Maharashtra", events: 342, emoji: "🎭", img: "../assets/images/placeholder-landscape.svg" },
    { id: "varanasi", name: "Uttar Pradesh", events: 225, emoji: "🛕", img: "../assets/images/placeholder-landscape.svg" }
];

const TrendingEvents = [
    { id: "t1", title: "A.R. Rahman Live Symphony Arena Tour", cat: "Concerts", loc: "Mumbai", date: "2026-11-20", rating: "4.9", price: "₹2,499", tag: "Selling Fast", img: "../assets/images/placeholder-landscape.svg" },
    { id: "t2", title: "Sunburn Festival 2026 Privilege Access", cat: "Festivals", loc: "Goa", date: "2026-12-27", rating: "4.8", price: "₹7,999", tag: "Trending #1", img: "../assets/images/placeholder-landscape.svg" },
    { id: "t3", title: "Royal Pushkar Camel Mela Exclusive", cat: "Melas", loc: "Jaipur", date: "2026-11-14", rating: "4.7", price: "₹1,200", tag: "Cultural Icon", img: "../assets/images/placeholder-landscape.svg" },
    { id: "t4", title: "Ziro Music Festival Boutique Experience", cat: "Festivals", loc: "Anywhere", date: "2026-09-18", rating: "4.9", price: "₹5,500", tag: "Rare Find", img: "../assets/images/placeholder-landscape.svg" }
];

const FeaturedEvents = [
    { id: "f1", title: "Eshanya Himalayan Ridge Trekking", cat: "Adventure", loc: "Himachal", date: "2026-10-05", rating: "4.8", price: "₹14,500", img: "../assets/images/placeholder-landscape.svg" },
    { id: "f2", title: "Taj Mahal Moonlight Heritage Connoisseur", cat: "Heritage", loc: "Delhi", date: "2026-10-24", rating: "5.0", price: "₹3,500", img: "../assets/images/placeholder-landscape.svg" },
    { id: "f3", title: "Maha Ganga Aarti Devotional VIP Deck Access", cat: "Spiritual", loc: "Varanasi", date: "2026-11-02", rating: "4.9", price: "₹1,800", img: "../assets/images/placeholder-landscape.svg" },
    { id: "f4", title: "Royal Mewar Palace Culinary Gala Banquet", cat: "Food Festivals", loc: "Jaipur", date: "2026-11-18", rating: "4.9", price: "₹6,000", img: "../assets/images/placeholder-landscape.svg" }
];

const Destinations = [
    { id: "d1", name: "Udaipur Lakes & Palaces", type: "Heritage & Romance", size: "size-large", img: "../assets/images/placeholder-landscape.svg" },
    { id: "d2", name: "Varkala Cliff Escapes", type: "Coastal Wilderness", size: "size-wide", img: "../assets/images/placeholder-landscape.svg" },
    { id: "d3", name: "Hampi Boulder Horizons", type: "Archeological Legacy", size: "size-tall", img: "../assets/images/placeholder-landscape.svg" },
    { id: "d4", name: "Ladakh High Passes", type: "Tectonic Serenity", size: "size-wide", img: "../assets/images/placeholder-landscape.svg" }
];

const Festivals = [
    { id: "fest1", title: "Jaipur Literature Festival 2027 Pre-Pass", loc: "Jaipur", date: "2027-01-21", price: "₹999", img: "../assets/images/placeholder-landscape.svg" },
    { id: "fest2", title: "Hornbill Festival Ultimate Tribe Access", loc: "Anywhere", date: "2026-12-01", price: "₹4,500", img: "../assets/images/placeholder-landscape.svg" },
    { id: "fest3", title: "Dev Deepawali Infinite Lights Cruise", loc: "Varanasi", date: "2026-11-23", price: "₹5,000", img: "../assets/images/placeholder-landscape.svg" }
];

const HiddenGems = [
    { id: "g1", title: "Gandikota Grand Canyon Starlight Camp", loc: "Bengaluru", price: "₹3,200", rating: "4.8", img: "../assets/images/placeholder-landscape.svg" },
    { id: "g2", title: "Lonar Crater Secret Astrophotography Outing", loc: "Mumbai", price: "₹2,500", rating: "4.9", img: "../assets/images/placeholder-landscape.svg" },
    { id: "g3", title: "Chettinad Aristocratic Mansion Culinary Trail", loc: "Anywhere", price: "₹4,800", rating: "5.0", img: "../assets/images/placeholder-landscape.svg" },
    { id: "g4", title: "Mawlynnong Living Root Bridges Private Eco Route", loc: "Anywhere", price: "₹1,900", rating: "4.7", img: "../assets/images/placeholder-landscape.svg" }
];

const HandPickedExperiences = [
    { id: "e1", title: "Old Delhi Heritage Breakfast Masterclass", Host: "Chef Sadik", rating: "4.9", price: "₹1,500", img: "../assets/images/placeholder-landscape.svg" },
    { id: "e2", title: "Backwater Traditional Houseboat Jazz Cruise", Host: "Kumarakom Elite", rating: "5.0", price: "₹12,000", img: "../assets/images/placeholder-landscape.svg" },
    { id: "e3", title: "Fontainhas Luxury Indo-Portuguese Walk", Host: "Arch. Maria", rating: "4.8", price: "₹1,800", img: "../assets/images/placeholder-landscape.svg" }
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
        <article class="premium-card style-reveal">
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
        <div class="category-pill-card style-reveal" data-category="${cat.name}">
            <div class="category-pill-icon">${cat.icon}</div>
            <div class="category-pill-info">
                <h3>${cat.name}</h3>
                <p>${cat.desc}</p>
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
        <article class="premium-card style-reveal">
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
        <article class="premium-card style-reveal">
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
        <article class="premium-card style-reveal">
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
        }
    });
}

function initializeNewsletter() {
    if (!DOM.newsletterForm) return;

    DOM.newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailVal = DOM.newsletterEmail ? DOM.newsletterEmail.value.trim() : "";
        
        if (!emailVal) return;

        const originalBtn = DOM.subscribeBtn.innerHTML;
        if (DOM.subscribeBtn) {
            DOM.subscribeBtn.innerHTML = `<span>Validating...</span>`;
            DOM.subscribeBtn.disabled = true;
        }

        setTimeout(() => {
            alert(`✨ Welcome to the Inner Circle.\n\nA private operational broadcast pipeline confirmation link has been sent to ${emailVal}. Premium allocations await.`);
            if (DOM.newsletterForm) DOM.newsletterForm.reset();
            if (DOM.subscribeBtn) {
                DOM.subscribeBtn.innerHTML = originalBtn;
                DOM.subscribeBtn.disabled = false;
            }
        }, 1000);
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

function initializeApplicationSystem() {
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

// System execution ignition thread execution anchor
document.addEventListener("DOMContentLoaded", initializeApplicationSystem);