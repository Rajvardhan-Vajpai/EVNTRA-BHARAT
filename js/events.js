/**
 * ==========================================================================
 * EVENTRA BHARAT - CORE EVENTS DISCOVERY PLATFORM ENGINE
 * Architecture: Modular, Cached DOM, Decoupled Pure Functions & Event Loop
 * Framework: Apple & Airbnb Minimal Luxury Design Framework
 * ==========================================================================
 */

"use strict";

(() => {
    // ==========================================================================
    // 1. DOM Elements Cache
    // ==========================================================================
    const DOM = {
        // Search Control Interface Inputs
        searchInput: document.getElementById("searchInput") || document.getElementById("searchBarInput"),
        locationSelect: document.getElementById("locationSelect") || document.getElementById("locationFilter"),
        dateInput: document.getElementById("dateInput") || document.getElementById("dateFilter"),
        categorySelect: document.getElementById("categorySelect") || document.getElementById("categoryFilter"),
        budgetSelect: document.getElementById("budgetSelect") || document.getElementById("priceRangeFilter"),
        ratingSelect: document.getElementById("ratingSelect") || document.getElementById("ratingFilter"),
        sortSelect: document.getElementById("sortSelect") || document.getElementById("sortDropdown"),
        exploreBtn: document.getElementById("exploreBtn"),
        resetFiltersBtn: document.getElementById("resetFiltersBtn"),

        // Structural Container Elements
        categoryPillsSlider: document.getElementById("categoryPillsSlider") || document.querySelector(".category-pills-slider"),
        featuredGrid: document.getElementById("featuredGrid") || document.querySelector(".premium-layout-grid"),
        upcomingGrid: document.getElementById("upcomingGrid") || document.querySelector(".upcoming-events-grid") || document.querySelector(".cards-grid") || document.querySelector(".experience-grid"),
        bentoCityGrid: document.getElementById("bentoCityGrid") || document.querySelector(".bento-grid-blueprint"),
        
        // Pagination & Reporting Badge Nodes
        paginationContainer: document.getElementById("paginationContainer") || document.querySelector(".pagination-orchestrator"),
        loadMoreBtn: document.getElementById("loadMoreBtn"),
        resultsCounter: document.getElementById("resultsCounter") || document.querySelector(".results-counter"),
        
        // Numerical Performance Badges
        statTotalEvents: document.getElementById("statTotalEvents"),
        statCitiesActive: document.getElementById("statCitiesActive"),
        statTicketsSold: document.getElementById("statTicketsSold"),
        
        // Contact Form Elements
        newsletterForm: document.getElementById("newsletterForm"),
        newsletterEmail: document.getElementById("newsletterEmail")
    };

    // ==========================================================================
    // 2. Application State Configuration
    // ==========================================================================
    const AppState = {
        filters: {
            searchQuery: "",
            category: "All",
            location: "Anywhere",
            date: "",
            budget: "Any Price",
            minRating: "Any Rating"
        },
        sortOption: "newest",
        pagination: {
            currentPage: 1,
            itemsPerPage: 9
        },
        events: [],
        filteredEvents: [],
        favorites: new Set()
    };

    // ==========================================================================
    // 3. Realistic Indian Event Master Dataset (32 Premium Collections)
    // ==========================================================================
        // MASTER_EVENT_DATA is now fetched from the backend API.
    const FALLBACK_EVENTS = [
        {
            id: "evt1",
            title: "A.R. Rahman Live Symphony",
            category: "Music",
            location: "Mumbai",
            date: "2026-10-15",
            price: 8500,
            rating: 4.9,
            image: "../assets/images/dynamic/A_R__Rahman_Live_Symphony_Orchestra.webp"
        },
        {
            id: "evt2",
            title: "Sufi Symphony Night",
            category: "Music",
            location: "Delhi NCR",
            date: "2026-11-20",
            price: 4500,
            rating: 4.8,
            image: "../assets/images/dynamic/Sufi_Symphony_Night.webp"
        },
        {
            id: "evt3",
            title: "Zakir Khan Live",
            category: "Comedy",
            location: "Bengaluru",
            date: "2026-09-10",
            price: 2500,
            rating: 4.7,
            image: "../assets/images/dynamic/Zakir_Khan_Live__New_Material_Show.webp"
        },
        {
            id: "evt4",
            title: "Royal Awadhi Gastronomy",
            category: "Food",
            location: "Varanasi",
            date: "2026-12-05",
            price: 6000,
            rating: 4.9,
            image: "../assets/images/dynamic/Royal_Awadhi_Gastronomy_Masterclass.webp"
        },
        {
            id: "evt5",
            title: "Himalayan Trekking Bootcamp",
            category: "Adventure",
            location: "Himachal Pradesh",
            date: "2026-10-25",
            price: 12000,
            rating: 4.8,
            image: "../assets/images/dynamic/Himalayan_Trekking___Survival_Bootcamp.webp"
        },
        {
            id: "evt6",
            title: "Taj Mahal Moonlight Heritage",
            category: "Heritage",
            location: "Agra",
            date: "2026-11-15",
            price: 3500,
            rating: 4.9,
            image: "../assets/images/dynamic/Taj_Mahal_Moonlight_Heritage_Connoisseur.webp"
        },
        {
            id: "evt7",
            title: "Pro Kabaddi Championship",
            category: "Sports",
            location: "Pune",
            date: "2026-09-30",
            price: 1500,
            rating: 4.6,
            image: "../assets/images/dynamic/Pro_Kabaddi_League_Championship_Finals.webp"
        },
        {
            id: "evt8",
            title: "Global FinTech Disruption Expo",
            category: "Technology",
            location: "Mumbai",
            date: "2026-10-05",
            price: 5000,
            rating: 4.5,
            image: "../assets/images/dynamic/Global_FinTech_Disruption_Expo.webp"
        },
        {
            id: "evt9",
            title: "Sunburn Festival Goa",
            category: "Music",
            location: "Goa",
            date: "2026-12-28",
            price: 6500,
            rating: 4.8,
            image: "../assets/images/dynamic/Sunburn_Festival_Goa_2026.webp"
        },
        {
            id: "evt10",
            title: "BTS Live Symphony & Heritage Experience",
            category: "Heritage",
            location: "Kolkata",
            date: "2026-08-19",
            price: 8500,
            rating: 4.9,
            image: "../assets/images/dynamic/Taj_Mahal_Moonlight_Heritage_Connoisseur.webp"
        }
    ];

    // Premium Category Reference Registry
    const PLATFORM_CATEGORIES = [
        { name: "All", icon: "<i class='fa-solid fa-gem'></i>" },
        { name: "Music", icon: "<i class='fa-solid fa-music'></i>" },
        { name: "Comedy", icon: "<i class='fa-solid fa-microphone-lines'></i>" },
        { name: "Food", icon: "<i class='fa-solid fa-utensils'></i>" },
        { name: "Adventure", icon: "<i class='fa-solid fa-mountain-sun'></i>" },
        { name: "Heritage", icon: "<i class='fa-solid fa-monument'></i>" },
        { name: "Sports", icon: "<i class='fa-solid fa-trophy'></i>" },
        { name: "Technology", icon: "<i class='fa-solid fa-microchip'></i>" },
        { name: "Business", icon: "<i class='fa-solid fa-briefcase'></i>" },
        { name: "Art", icon: "<i class='fa-solid fa-palette'></i>" }
    ];

    // Popular Cities Data Framework for Bento Grid
    const POPULAR_CITIES = [
        { name: "Mumbai", count: "12+ Elite Events", img: "../assets/images/dynamic/Mumbai.webp", class: "span-2 row-2" },
        { name: "Goa", count: "8+ Beach Festivals", img: "../assets/images/dynamic/Goa.webp", class: "" },
        { name: "Bengaluru", count: "14+ Tech Summits", img: "../assets/images/dynamic/Bengaluru.webp", class: "row-2" },
        { name: "Jaipur", count: "9+ Heritage Shows", img: "../assets/images/dynamic/Hawa_Mahal_terracotta_architecture_in_Jaipur.webp", class: "" },
        { name: "Delhi NCR", count: "19+ Cultural Gatherings", img: "../assets/images/dynamic/India_Gate.webp", class: "" },
        { name: "Varanasi", count: "6+ Heritage Rituals", img: "../assets/images/dynamic/Varanasi.webp", class: "span-2" },
        { name: "Kerala", count: "11+ Wellness Retreats", img: "../assets/images/dynamic/Kerala.webp", class: "" }
    ];

    // ==========================================================================
    // 4. State Synchronization & Business Engine Rules
    // ==========================================================================
    
    const evaluateBudgetMatch = (budgetRange, eventPrice) => {
        if (!budgetRange || budgetRange === "Any Price") return true;
        if (budgetRange.includes("Under ₹1,000")) return eventPrice < 1000;
        if (budgetRange.includes("₹1,000 - ₹5,000")) return eventPrice >= 1000 && eventPrice <= 5000;
        if (budgetRange.includes("Over ₹5,000")) return eventPrice > 5000;
        return true;
    };

    const evaluateRatingMatch = (ratingString, eventRating) => {
        if (!ratingString || ratingString === "Any Rating") return true;
        const match = ratingString.match(/([0-9.]+)/);
        if (!match) return true;
        return eventRating >= parseFloat(match[1]);
    };

    const compileFilteredDataset = async () => {
        const { searchQuery, category, location, date, budget, minRating } = AppState.filters;
        
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (category !== "All") params.append('category', category);
        if (location !== "Anywhere") params.append('location', location);
        if (date !== "") params.append('date', date);
        if (budget !== "Any Price") {
            if (budget.includes("Under")) { params.append('maxPrice', 1000); }
            else if (budget.includes("1,000 -")) { params.append('minPrice', 1000); params.append('maxPrice', 5000); }
            else if (budget.includes("Over")) { params.append('minPrice', 5000); }
        }
        if (minRating !== "Any Rating") {
            params.append('minRating', minRating);
        }
        if (AppState.sortOption) params.append('sort', AppState.sortOption);

        try {
            const response = await fetch(`${CONFIG.API.EVENTS}?${params.toString()}`);
            if (!response.ok) throw new Error("Backend not available");
            const data = await response.json();
            AppState.filteredEvents = data;
            AppState.pagination.currentPage = 1; 
            executeDomRenderPass();
        } catch (error) {
            console.warn("Backend fetch failed. Falling back to local static dataset.");
            
            let result = FALLBACK_EVENTS;
            if (category !== "All") result = result.filter(e => e.category === category);
            if (location !== "Anywhere" && location !== "All") result = result.filter(e => e.location === location || e.location === "All Regions");
            if (searchQuery.trim()) {
                const lowerQuery = searchQuery.toLowerCase();
                result = result.filter(e => e.title.toLowerCase().includes(lowerQuery));
            }
            
            if (budget !== "Any Price" && budget !== "All") {
                if (budget.includes("Under") || budget === "0-1000") result = result.filter(e => e.price <= 1000);
                else if (budget.includes("1,000 -") || budget === "1000-3000") result = result.filter(e => e.price > 1000 && e.price <= 3000);
                else if (budget === "3000-7000") result = result.filter(e => e.price > 3000 && e.price <= 7000);
                else if (budget.includes("Over") || budget === "7000-plus") result = result.filter(e => e.price > 7000);
            }
            if (minRating !== "Any Rating" && minRating !== "All") {
                const minR = parseFloat(minRating.replace(/[^\d.]/g, ''));
                if (!isNaN(minR)) result = result.filter(e => e.rating >= minR);
            }
            if (date) {
                result = result.filter(e => e.date === date);
            }
            if (AppState.sortOption === "trending" || AppState.sortOption === "highestRated") {
                result.sort((a,b) => b.rating - a.rating);
            } else if (AppState.sortOption === "priceLowHigh") {
                result.sort((a,b) => a.price - b.price);
            } else if (AppState.sortOption === "priceHighLow") {
                result.sort((a,b) => b.price - a.price);
            }
            
            AppState.filteredEvents = result;
            AppState.pagination.currentPage = 1;
            executeDomRenderPass();
        }
    };


    // ==========================================================================
    // 5. DOM Generation & Interface Builders
    // ==========================================================================

    const formatToIndianCurrency = (amount) => {
        if (amount === 0) return "Free";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    const createEventCardElement = (eventData) => {
        const card = document.createElement("div");
        card.className = "premium-event-card scroll-animate";
        card.setAttribute("role", "article");
        card.setAttribute("data-id", eventData.id);

        const isFavorited = AppState.favorites.has(eventData.id);
        const ticketStatusHtml = eventData.tickets_available === 0 
            ? `<button class="card-cta-btn" disabled style="background:#4a4242; opacity:0.6; cursor:not-allowed;">Sold Out</button>`
            : `<button class="card-cta-btn action-book" data-id="${eventData.id}">Book Now</button>`;
        const urgencyHtml = (eventData.tickets_available > 0 && eventData.tickets_available <= 2000) 
            ? `<div style="color: #d9534f; font-size: 0.8rem; font-weight: 600; margin-top: 5px; text-align: right;"><i class="fa-solid fa-fire"></i> Only ${eventData.tickets_available} left!</div>` 
            : '';

        card.innerHTML = `
            <div class="card-media-shell">
                <img src="${eventData.image}" alt="${eventData.title}" loading="lazy">
                <span class="card-floating-badge">${eventData.category}</span>
                <button class="card-fav-trigger action-favorite ${isFavorited ? "active" : ""}" 
                        aria-label="Add ${eventData.title} to wishlist" 
                        data-id="${eventData.id}">
                    <i class="${isFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}" style="${isFavorited ? "color:#7C1F23;" : ""}"></i>
                </button>
            </div>
            <div class="card-core-content">
                <div class="card-context-row">
                    <span><i class="fa-regular fa-calendar"></i> ${new Date(eventData.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <div class="card-rating-metric">
                        <i class="fa-solid fa-star"></i>
                        <span>${eventData.rating.toFixed(1)}</span>
                    </div>
                </div>
                <h3>${eventData.title}</h3>
                <div class="card-billing-row" style="align-items: flex-end;">
                    <div class="price-stack">
                        <span class="lbl">Tickets From</span>
                        <span class="val">${formatToIndianCurrency(eventData.price)}</span>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        ${ticketStatusHtml}
                        ${urgencyHtml}
                    </div>
                </div>
            </div>
        `;
        return card;
    };

    const renderFeaturedSection = () => {
        if (!DOM.featuredGrid) return;
        const fragment = document.createDocumentFragment();
        const pool = AppState.events.filter(ev => ev.is_featured).slice(0, 6);

        if (pool.length === 0) {
            DOM.featuredGrid.innerHTML = `
                <div class="empty-results-notice">
                    <i class="fa-solid fa-hourglass-empty"></i>
                    <h4>No Premium Highlights Selected</h4>
                    <p>Check back shortly for exclusive luxury festival updates.</p>
                </div>
            `;
            return;
        }

        pool.forEach(ev => fragment.appendChild(createEventCardElement(ev)));
        DOM.featuredGrid.innerHTML = "";
        DOM.featuredGrid.appendChild(fragment);
    };

    const renderUpcomingSection = () => {
        if (!DOM.upcomingGrid) return;
        const fragment = document.createDocumentFragment();
        const { currentPage, itemsPerPage } = AppState.pagination;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageSlice = AppState.filteredEvents.slice(startIndex, startIndex + itemsPerPage);

        if (pageSlice.length === 0) {
            DOM.upcomingGrid.innerHTML = `
                <div class="empty-results-notice">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h4>No Matching Indian Experiences Located</h4>
                    <p>Modify your search criteria, adjust budget sliders, or pick alternate cities.</p>
                </div>
            `;
            if (DOM.paginationContainer) DOM.paginationContainer.style.display = "none";
            return;
        }

        pageSlice.forEach(ev => fragment.appendChild(createEventCardElement(ev)));
        DOM.upcomingGrid.innerHTML = "";
        DOM.upcomingGrid.appendChild(fragment);
        
        if (DOM.paginationContainer) DOM.paginationContainer.style.display = "flex";
    };

    const renderCategoryPills = () => {
        if (!DOM.categoryPillsSlider) return;
        const fragment = document.createDocumentFragment();
        
        PLATFORM_CATEGORIES.forEach(cat => {
            const pill = document.createElement("button");
            const isSelected = AppState.filters.category.toLowerCase() === cat.name.toLowerCase();
            
            pill.className = `pill-node ${isSelected ? "active" : ""}`;
            pill.setAttribute("data-category", cat.name);
            pill.setAttribute("role", "tab");
            pill.setAttribute("aria-selected", isSelected ? "true" : "false");

            pill.innerHTML = `<span class="pill-node-icon">${cat.icon}</span><span>${cat.name}</span>`;
            fragment.appendChild(pill);
        });

        DOM.categoryPillsSlider.innerHTML = "";
        DOM.categoryPillsSlider.appendChild(fragment);
    };

    const renderPopularCitiesGrid = () => {
        if (!DOM.bentoCityGrid) return;
        const fragment = document.createDocumentFragment();

        POPULAR_CITIES.forEach(city => {
            const cell = document.createElement("div");
            cell.className = `bento-city-cell ${city.class} scroll-animate`;
            cell.setAttribute("data-city-target", city.name);

            cell.innerHTML = `
                <img src="${city.img}" alt="${city.name} Luxury Destinations" loading="lazy">
                <div class="bento-city-overlay"></div>
                <div class="bento-city-info">
                    <h3>${city.name}</h3>
                    <p>${city.count}</p>
                </div>
            `;
            fragment.appendChild(cell);
        });

        DOM.bentoCityGrid.innerHTML = "";
        DOM.bentoCityGrid.appendChild(fragment);
    };

    const renderPaginationControls = () => {
        if (!DOM.paginationContainer) return;
        const totalItems = AppState.filteredEvents.length;
        const { currentPage, itemsPerPage } = AppState.pagination;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        let stepWrapper = DOM.paginationContainer.querySelector(".pagination-stepper") || document.createElement("div");
        if (!stepWrapper.className) {
            stepWrapper.className = "pagination-stepper";
            DOM.paginationContainer.appendChild(stepWrapper);
        }

        if (totalPages <= 1) {
            DOM.paginationContainer.style.display = "none";
            return;
        }

        let stepperHtml = `
            <button class="step-node ${currentPage === 1 ? "disabled" : ""}" data-target="prev" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous Page">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
        `;

        for (let idx = 1; idx <= totalPages; idx++) {
            stepperHtml += `<button class="step-node ${currentPage === idx ? "active" : ""}" data-target="${idx}">${idx}</button>`;
        }

        stepperHtml += `
            <button class="step-node ${currentPage === totalPages ? "disabled" : ""}" data-target="next" ${currentPage === totalPages ? "disabled" : ""} aria-label="Next Page">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        stepWrapper.innerHTML = stepperHtml;
        if (DOM.loadMoreBtn) DOM.loadMoreBtn.style.display = currentPage === totalPages ? "none" : "flex";
    };

    const updateInterfaceStatistics = () => {
        if (DOM.resultsCounter) DOM.resultsCounter.textContent = `${AppState.filteredEvents.length} Gatherings Found`;
        if (DOM.statTotalEvents) DOM.statTotalEvents.textContent = `${AppState.events.length}+`;
        if (DOM.statCitiesActive) {
            DOM.statCitiesActive.textContent = `${new Set(AppState.events.map(ev => ev.city.toLowerCase())).size}`;
        }
        if (DOM.statTicketsSold) DOM.statTicketsSold.textContent = "150K+";
    };

    const executeDomRenderPass = () => {
        renderUpcomingSection();
        renderPaginationControls();
        updateInterfaceStatistics();
        revalidateIntersectionObserver();
    };

    // ==========================================================================
    // 6. Asynchronous Process pipelines & Interactive Handlers
    // ==========================================================================

    const createDebouncePipeline = (fn, delayThreshold) => {
        let executionTimer;
        return (...args) => {
            clearTimeout(executionTimer);
            executionTimer = setTimeout(() => fn.apply(this, args), delayThreshold);
        };
    };

    const processLiveSearchInput = createDebouncePipeline((event) => {
        AppState.filters.searchQuery = event.target.value;
        compileFilteredDataset();
    }, 300);

    const configureFilterDropdownListeners = () => {
        const mappings = [
            { el: DOM.locationSelect, field: "location" },
            { el: DOM.dateInput, field: "date" },
            { el: DOM.budgetSelect, field: "budget" },
            { el: DOM.ratingSelect, field: "minRating" }
        ];

        mappings.forEach(map => {
            if (map.el) {
                map.el.addEventListener("change", (e) => {
                    AppState.filters[map.field] = e.target.value;
                    compileFilteredDataset();
                });
            }
        });

        if (DOM.categorySelect) {
            DOM.categorySelect.addEventListener("change", (e) => {
                AppState.filters.category = e.target.value;
                renderCategoryPills();
                compileFilteredDataset();
            });
        }
        if (DOM.sortSelect) {
            DOM.sortSelect.addEventListener("change", (e) => {
                AppState.sortOption = e.target.value;
                compileFilteredDataset();
            });
        }
    };

    const executeFilterResetPipeline = () => {
        AppState.filters = { searchQuery: "", category: "All", location: "Anywhere", date: "", budget: "Any Price", minRating: "Any Rating" };
        AppState.sortOption = "newest";

        if (DOM.searchInput) DOM.searchInput.value = "";
        if (DOM.locationSelect) DOM.locationSelect.value = "Anywhere";
        if (DOM.dateInput) DOM.dateInput.value = "";
        if (DOM.categorySelect) DOM.categorySelect.value = "All";
        if (DOM.budgetSelect) DOM.budgetSelect.value = "Any Price";
        if (DOM.ratingSelect) DOM.ratingSelect.value = "Any Rating";
        if (DOM.sortSelect) DOM.sortSelect.value = "newest";

        renderCategoryPills();
        compileFilteredDataset();
    };

    const bindGlobalDocumentClickInteractions = () => {
        document.addEventListener("click", (event) => {
            const targetElement = event.target;

            // Pill Selection
            const targetedPill = targetElement.closest(".pill-node");
            if (targetedPill) {
                const targetCategory = targetedPill.getAttribute("data-category");
                AppState.filters.category = targetCategory;
                if (DOM.categorySelect) DOM.categorySelect.value = targetCategory;
                renderCategoryPills();
                compileFilteredDataset();
                return;
            }

            // Wishlist Core Triggers
            const favTrigger = targetElement.closest(".action-favorite") || targetElement.closest(".discover-heart-trigger") || targetElement.closest(".discover-heart-toggle");
            if (favTrigger) {
                event.preventDefault();
                event.stopPropagation();
                togglePlatformWishlistState(favTrigger.getAttribute("data-id"), favTrigger);
                return;
            }

            // Ticket Action Callouts
            const bookBtn = targetElement.closest(".action-book") || targetElement.closest(".discover-cta-btn");
            if (bookBtn) {
                processPremiumTicketBooking(bookBtn.getAttribute("data-id"));
                return;
            }

            // Card Navigation Interceptor
            const cardElement = targetElement.closest(".premium-event-card");
            if (cardElement && !targetElement.closest(".action-favorite") && !targetElement.closest(".action-book")) {
                const eventId = cardElement.getAttribute("data-id");
                if (eventId) {
                    window.location.href = `event-details.html?id=${eventId}`;
                    return;
                }
            }

            // Stepper Dynamic Triggers
            const pageControl = targetElement.closest(".pagination-stepper .step-node");
            if (pageControl) {
                processPaginationMovement(pageControl.getAttribute("data-target"));
                return;
            }

            // Fallback Incremental View Trigger
            if (targetElement.id === "loadMoreBtn" || targetElement.closest("#loadMoreBtn")) {
                const totalPages = Math.ceil(AppState.filteredEvents.length / AppState.pagination.itemsPerPage);
                if (AppState.pagination.currentPage < totalPages) {
                    AppState.pagination.currentPage++;
                    renderUpcomingSection();
                    renderPaginationControls();
                    revalidateIntersectionObserver();
                }
                return;
            }

            // Bento Navigation Routing
            const cityCell = targetElement.closest(".bento-city-cell");
            if (cityCell) {
                const cityTarget = cityCell.getAttribute("data-city-target");
                if (cityTarget) {
                    AppState.filters.location = cityTarget;
                    if (DOM.locationSelect) DOM.locationSelect.value = cityTarget;
                    const entryAnchorSection = document.getElementById("upcomingEventsSection") || DOM.upcomingGrid;
                    if (entryAnchorSection) entryAnchorSection.scrollIntoView({ behavior: "smooth" });
                    compileFilteredDataset();
                }
                return;
            }
        });
    };

    const togglePlatformWishlistState = async (eventId, interfaceNode) => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API.WISHLIST}/${eventId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const heartIcon = interfaceNode.querySelector("i");
                if (AppState.favorites.has(eventId)) {
                    AppState.favorites.delete(eventId);
                    interfaceNode.classList.remove("active");
                    if (heartIcon) { heartIcon.className = "fa-regular fa-heart"; heartIcon.style.color = ""; }
                } else {
                    AppState.favorites.add(eventId);
                    interfaceNode.classList.add("active");
                    if (heartIcon) { heartIcon.className = "fa-solid fa-heart"; heartIcon.style.color = "#7C1F23"; }
                    interfaceNode.style.transform = "scale(1.25)";
                    setTimeout(() => interfaceNode.style.transform = "", 180);
                }
                
                document.querySelectorAll(`[data-id="${eventId}"] .card-fav-trigger, [data-id="${eventId}"] .discover-heart-trigger`).forEach(node => {
                    const alternativeIcon = node.querySelector("i");
                    if (AppState.favorites.has(eventId)) {
                        node.classList.add("active");
                        if (alternativeIcon) { alternativeIcon.className = "fa-solid fa-heart"; alternativeIcon.style.color = "#7C1F23"; }
                    } else {
                        node.classList.remove("active");
                        if (alternativeIcon) { alternativeIcon.className = "fa-regular fa-heart"; alternativeIcon.style.color = ""; }
                    }
                });
            } else {
                if (response.status === 401 || response.status === 403) {
                     window.location.href = 'login.html';
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    const processPremiumTicketBooking = (eventId) => {
        window.location.href = `event-details.html?id=${eventId}`;
    };

    const processPaginationMovement = (directive) => {
        const { currentPage, itemsPerPage } = AppState.pagination;
        const totalPages = Math.ceil(AppState.filteredEvents.length / itemsPerPage);

        if (directive === "prev" && currentPage > 1) AppState.pagination.currentPage--;
        else if (directive === "next" && currentPage < totalPages) AppState.pagination.currentPage++;
        else if (!isNaN(parseInt(directive, 10))) AppState.pagination.currentPage = parseInt(directive, 10);

        renderUpcomingSection();
        renderPaginationControls();
        
        const anchorDiscoveryZone = document.getElementById("upcomingEventsSection") || DOM.upcomingGrid;
        if (anchorDiscoveryZone) anchorDiscoveryZone.scrollIntoView({ behavior: "smooth" });
        revalidateIntersectionObserver();
    };

    const initializeNewsletterModule = () => {
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

        DOM.newsletterForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const absoluteInputStr = DOM.newsletterEmail?.value.trim() || "";
            const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const wants_whatsapp = nlWantsWhatsapp ? nlWantsWhatsapp.checked : false;
            const whatsapp_number = nlWhatsapp ? nlWhatsapp.value.trim() : null;

            if (absoluteInputStr === "" || !validEmailRegex.test(absoluteInputStr)) {
                alert("Please enter a valid email address.");
                DOM.newsletterEmail?.focus();
                return;
            }

            try {
                // Assume CONFIG is loaded globally
                const apiUrl = window.CONFIG ? window.CONFIG.API.NEWSLETTER : 'http://localhost:8000/api/newsletter/subscribe';
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: absoluteInputStr,
                        wants_whatsapp: wants_whatsapp,
                        whatsapp_number: whatsapp_number
                    })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    alert(`🎉 ${data.message}`);
                    DOM.newsletterForm.reset();
                } else {
                    alert(data.detail || data.message || 'Something went wrong. Please try again.');
                }
            } catch (err) {
                console.error('Newsletter subscribe error:', err);
                alert('Could not connect to the server. Please try again later.');
            }
        });
    };

    // ==========================================================================
    // 7. Kinetic Scroll Reveal Orchestration
    // ==========================================================================
    let platformScrollObserver = null;

    const setupViewportRevealAnimations = () => {
        platformScrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: "0px 0px -40px 0px", threshold: 0.08 });

        revalidateIntersectionObserver();
    };

    const revalidateIntersectionObserver = () => {
        if (!platformScrollObserver) return;
        document.querySelectorAll(".premium-event-card, .scroll-animate, .bento-city-cell, .stat-node, .discover-item-card").forEach(target => {
            if (!target.classList.contains("reveal-visible")) {
                platformScrollObserver.observe(target);
            }
        });
    };

    // ==========================================================================
    // 8. Bootstrap Engine Entry Point
    // ==========================================================================
    const bootstrapPlatformApplicationEngine = async () => {
        try {
            const response = await fetch(CONFIG.API.EVENTS);
            const data = await response.json();
            AppState.events = data;
        } catch (error) {
            console.error("Failed to fetch events from API:", error);
            AppState.events = [];
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(CONFIG.API.WISHLIST, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    AppState.favorites = new Set(data.map(ev => ev.id));
                }
            } catch (e) {
                console.error("Failed to fetch wishlist", e);
            }
        } else {
            try {
                const cachedFavs = localStorage.getItem("eventra_bharat_favs");
                if (cachedFavs) AppState.favorites = new Set(JSON.parse(cachedFavs));
            } catch (e) {}
        }

        renderCategoryPills();
        renderFeaturedSection();
        renderPopularCitiesGrid();
        
        // Parse URL parameters from home.html search form
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("city")) AppState.filters.location = urlParams.get("city");
        if (urlParams.has("cat")) AppState.filters.category = urlParams.get("cat");
        if (urlParams.has("search")) AppState.filters.searchQuery = urlParams.get("search");
        
        // Update DOM inputs to match
        if (DOM.locationSelect && AppState.filters.location !== "Anywhere") DOM.locationSelect.value = AppState.filters.location;
        if (DOM.categorySelect && AppState.filters.category !== "All") DOM.categorySelect.value = AppState.filters.category;
        if (DOM.searchInput && AppState.filters.searchQuery) DOM.searchInput.value = AppState.filters.searchQuery;

        compileFilteredDataset();

        if (DOM.searchInput) {
            DOM.searchInput.addEventListener("input", processLiveSearchInput);
            DOM.searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    compileFilteredDataset();
                    const target = document.getElementById("upcomingEventsSection") || DOM.upcomingGrid;
                    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }
        if (DOM.exploreBtn) {
            DOM.exploreBtn.addEventListener("click", (e) => {
                e.preventDefault();
                compileFilteredDataset();
                const target = document.getElementById("upcomingEventsSection") || DOM.upcomingGrid;
                if (target) target.scrollIntoView({ behavior: "smooth" });
            });
        }
        if (DOM.resetFiltersBtn) DOM.resetFiltersBtn.addEventListener("click", executeFilterResetPipeline);

        configureFilterDropdownListeners();
        bindGlobalDocumentClickInteractions();
        initializeNewsletterModule();
        setupViewportRevealAnimations();
    };

    // Navbar scroll transparency toggle
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const heroSection = document.querySelector('.hero-section');
            const threshold = heroSection ? heroSection.offsetHeight * 0.35 : 80;
            navbar.classList.toggle('scrolled', window.scrollY > threshold);
        }
    }, { passive: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrapPlatformApplicationEngine);
    } else {
        bootstrapPlatformApplicationEngine();
    }
})();
