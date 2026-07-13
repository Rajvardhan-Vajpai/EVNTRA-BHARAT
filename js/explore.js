/**
 * ==========================================================================
 * EVENTRA BHARAT - CORE EXPLORATION & TOURISM ENGINE
 * Architecture: Modular Lifecycle, Cached DOM, Decoupled State Mutators
 * Design Language: Production-Ready JavaScript Architecture
 * File: explore.js
 * ==========================================================================
 */

"use strict";

(() => {
    // =========================================================================
    // 1. APPLICATION DATA REPOSITORIES (REALISTIC INDIA DATA)
    // =========================================================================
    
    const ImageAssets = {
        square: "../assets/images/placeholder-square.svg",
        landscape: "../assets/images/placeholder-landscape.svg"
    };

    const StatesData = [
        { id: "st-rajasthan", name: "Rajasthan", events: 42, vibe: "Royal Heritage", desc: "Land of majestic hill forts, shimmering palaces, and vibrant desert festivals.", img: ImageAssets.square },
        { id: "st-kerala", name: "Kerala", events: 28, vibe: "Serene Nature", desc: "Tranquil emerald backwaters, holistic Ayurveda sanctuaries, and spice-laden hills.", img: ImageAssets.square },
        { id: "st-himachal", name: "Himachal Pradesh", events: 31, vibe: "Alpine Adventure", desc: "Snow-capped peaks, pine forests, and high-altitude valleys perfect for exploration.", img: ImageAssets.square },
        { id: "st-goa", name: "Goa", events: 35, vibe: "Coastal Rhythm", desc: "Sun-drenched golden sands, Indo-Portuguese architecture, and vibrant night bazaars.", img: ImageAssets.square },
        { id: "st-tamilnadu", name: "Tamil Nadu", events: 24, vibe: "Living Temples", desc: "Towering gopurams, ancient classical arts, and serene coastline stretches.", img: ImageAssets.square },
        { id: "st-meghalaya", name: "Meghalaya", events: 18, vibe: "Mystic Clouds", desc: "Living root bridges, deep cavern systems, and crystal-clear rainwater rivers.", img: ImageAssets.square }
    ];

    const DestinationsData = [
        { id: "dest-udaipur", name: "Udaipur", state: "Rajasthan", rating: "4.9", tags: "Palaces • Lakes • Romantic", type: "Heritage", isHorizontal: true, img: ImageAssets.landscape },
        { id: "dest-munnar", name: "Munnar", state: "Kerala", rating: "4.8", tags: "Tea Gardens • Mist • Hiking", type: "Nature", isHorizontal: false, img: ImageAssets.landscape },
        { id: "dest-hampi", name: "Hampi", state: "Karnataka", rating: "4.9", tags: "Ruins • History • Monoliths", type: "Heritage", isHorizontal: false, img: ImageAssets.landscape },
        { id: "dest-manali", name: "Manali", state: "Himachal Pradesh", rating: "4.7", tags: "Snow • Paragliding • Valleys", type: "Adventure", isHorizontal: true, img: ImageAssets.landscape },
        { id: "dest-varanasi", name: "Varanasi", state: "Uttar Pradesh", rating: "4.9", tags: "Ghats • Spirituality • Rituals", type: "Spiritual", isHorizontal: false, img: ImageAssets.landscape }
    ];

    const HeritageData = [
        { id: "her-taj", title: "The Taj Mahal, Agra", badge: "UNESCO World Heritage Site", desc: "The crown jewel of Indo-Islamic symmetry and architectural romance, constructed entirely of pristine Makrana white marble.", descriptor: "Mughal Architecture • 17th Century", img: ImageAssets.landscape },
        { id: "her-ellora", title: "Ellora Rock-Cut Temples", badge: "Monolithic Excavation", desc: " Kailash Temple (Cave 16) stands as the world's largest monolithic rock excavation, carved vertically from a single basalt cliff face.", descriptor: "Rashtrakuta Dynasty • 8th Century", img: ImageAssets.landscape },
        { id: "her-konark", title: "Konark Sun Temple", badge: "Architectural Marvel", desc: "Designed as a colossal processional chariot for the Sun God Surya, adorned with 24 meticulously carved stone wheels pulled by 7 rearing horses.", descriptor: "Ganga Dynasty • 13th Century", img: ImageAssets.landscape }
    ];

    const GemsData = [
        { id: "gem-ziro", name: "Ziro Valley", location: "Arunachal Pradesh", desc: "A sweeping high-altitude plateau home to the Apatani tribe, characterized by pine forests and dynamic music cultures.", distance: "Off-Grid Sanctuary", time: "Best Oct - Apr", img: ImageAssets.landscape },
        { id: "gem-gandikota", name: "Gandikota Gorge", location: "Andhra Pradesh", desc: "A stunning hidden assembly of massive red sandstone cliffs framing the Pennar River, frequently dubbed the Grand Canyon of India.", distance: "Geological Wonder", time: "Best Nov - Feb", img: ImageAssets.landscape },
        { id: "gem-lonar", name: "Lonar Meteorite Lake", location: "Maharashtra", desc: "A hyper-velocity impact crater lake formed over 52,000 years ago, surrounded by deep monolithic emerald forest canopies.", distance: "Astronomical Astrobleme", time: "Best Sep - Mar", img: ImageAssets.landscape }
    ];

    const AdventureData = [
        { id: "adv-zanskar", title: "Chadar Frozen River Trek", intensity: "Extreme", desc: "A dramatic winter expedition crossing the shifting, semi-frozen glass ice blocks of the Zanskar River.", img: ImageAssets.landscape },
        { id: "adv-rishikesh", title: "Grade IV White Water Rafting", intensity: "High", desc: "Conquering wild, turbulent rapids along the emerald headwaters of the holy Ganges in Rishikesh.", img: ImageAssets.landscape },
        { id: "adv-bir", title: "Paragliding Cross-Country", intensity: "Moderate", desc: "Launching into sub-Himalayan thermals from Bir Billing, the world's premier high-altitude taking-off site.", img: ImageAssets.landscape },
        { id: "adv-andaman", title: "Scuba Diving Havelock Reefs", intensity: "Moderate", desc: "Exploring volcanic drop-offs and dynamic marine ecosystems deep within the Andaman Sea.", img: ImageAssets.landscape }
    ];

    const FoodTrailsData = [
        { id: "food-old-delhi", category: "Culinary Legacy", title: "Old Delhi Spice & Mughlai Trail", desc: "Navigating century-old alleys to sample legacy paranthas, slow-cooked Nihari, and rich artisanal jalebis.", img: ImageAssets.landscape },
        { id: "food-chettinad", category: "Aromatic Spice", title: "Chettinad Heritage Feast", desc: "Experiencing complex, multi-layered culinary profiles prepared using freshly hand-ground, stone-crushed local coastal spices.", img: ImageAssets.landscape },
        { id: "food-wazwan", category: "Royal Banquet", title: "Kashmiri Wazwan Narrative", desc: "A formal multi-course slow-cooked banquet highlighting intricate aromatic preparations steeped in saffron, cockscomb, and local curd.", img: ImageAssets.landscape }
    ];

    const SpiritualData = [
        { id: "spir-yoga", title: "Ashram Contemplation", desc: "Deep meditation modules within classic stone-carved cells flanking the Ganges riverbank.", metrics: ["Vedic Philosophy", "Pranayama Alignment", "Mantra Centering"], icon: "fa-om" },
        { id: "spir-sufi", title: "Sufi Qawwali Evening", desc: "Transcendental ecstatic musical gatherings held at Hazrat Nizamuddin Aulia's historic marble shrine.", metrics: ["Mystic Poetry", "Choral Synchrony", "Spiritual Ecstasy"], icon: "fa-mosque" },
        { id: "spir-monk", title: "Vipassana Silent Retreat", desc: "Sustained internal contemplation retreats deep within high-altitude monastic architectures.", metrics: ["Absolute Silence", "Mindfulness Tracking", "Insight Cleansing"], icon: "fa-dharmachakra" }
    ];

    const SeasonalData = [
        { id: "sea-monsoon", title: "Western Ghats Monsoon Bloom", months: "July - September", desc: "Surging waterfalls, misty driving routes, and the rare purple Neelakurinji flower carpeting pristine peaks.", img: ImageAssets.landscape },
        { id: "sea-winter", title: "Rann of Kutch Salt Desert", months: "November - February", desc: "Infinite white salt flats illuminated under full moon configurations during the cultural celebration of Rann Utsav.", img: ImageAssets.landscape }
    ];

    // =========================================================================
    // 2. CENTRAL RUNTIME APPLICATION STATE LIFE CYCLE
    // =========================================================================
    const AppState = {
        filters: {
            searchQuery: "",
            region: "Anywhere",
            type: "All",
            date: ""
        },
        favorites: JSON.parse(localStorage.getItem("eventra_explorations_favs")) || []
    };

    // =========================================================================
    // 3. CACHED DOM REGISTRY MATRIX
    // =========================================================================
    const DOM = {
        // Core Inputs
        searchInput: document.getElementById("searchInput"),
        regionSelect: document.getElementById("locationSelect"),
        typeSelect: document.getElementById("categorySelect"),
        dateInput: document.getElementById("dateInput"),
        searchBtn: document.getElementById("exploreBtn"),
        quickTagsContainer: document.querySelector(".quick-explore-tags"),

        // Target Structural Viewport Grids
        stateGrid: document.getElementById("stateGrid"),
        destinationGrid: document.getElementById("destinationGrid"),
        heritageSlider: document.getElementById("heritageSlider"),
        hiddenGemsGrid: document.getElementById("hiddenGemsGrid"),
        adventureScroll: document.getElementById("adventureScroll"),
        foodTrailsGrid: document.getElementById("foodTrailsGrid"),
        spiritualGrid: document.getElementById("spiritualGrid"),
        seasonalGrid: document.getElementById("seasonalGrid"),

        // Modules
        newsletterForm: document.getElementById("newsletterForm"),
        newsletterEmail: document.getElementById("newsletterEmail"),
        scrollTrigger: document.querySelector(".scroll-indicator")
    };

    // =========================================================================
    // 4. PERFORMANCE UTILITIES & REUSABLE ASSET RENDERING PIPELINES
    // =========================================================================
    
    /**
     * Custom DOM Intersection Observer configuration for smooth layout fades
     */
    const ViewportRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (entry.target.classList.contains("lazy-image-node")) {
                    const structuralSrc = entry.target.getAttribute("data-src");
                    if (structuralSrc) {
                        entry.target.src = structuralSrc;
                        entry.target.removeAttribute("data-src");
                    }
                }
                ViewportRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    /**
     * Generic Card Generator leveraging abstract rendering architectures
     */
    const compileTemplateNode = (htmlString) => {
        const parser = new DOMParser();
        const documentReference = parser.parseFromString(htmlString, "text/html");
        return documentReference.body.firstElementChild;
    };

    /**
     * Favorite Storage Synchronizer
     */
    const toggleAssetFavoriteState = (assetId, elementNode) => {
        const targetIndex = AppState.favorites.indexOf(assetId);
        if (targetIndex > -1) {
            AppState.favorites.splice(targetIndex, 1);
            elementNode.classList.remove("is-favorited");
            elementNode.querySelector("i").className = "fa-regular fa-bookmark";
        } else {
            AppState.favorites.push(assetId);
            elementNode.classList.add("is-favorited");
            elementNode.querySelector("i").className = "fa-solid fa-bookmark";
        }
        localStorage.setItem("eventra_explorations_favs", JSON.stringify(AppState.favorites));
    };

    // =========================================================================
    // 5. MODULAR RENDERING CONSTRUCTORS
    // =========================================================================

    const RenderStatesEngine = (dataset) => {
        if (!DOM.stateGrid) return;
        DOM.stateGrid.innerHTML = "";
        
        if (dataset.length === 0) {
            DOM.stateGrid.innerHTML = `<div class="empty-query-scrim">No regions align with your filter matrix.</div>`;
            return;
        }

        dataset.forEach(state => {
            const isFav = AppState.favorites.includes(state.id);
            const rawHTML = `
                <div class="state-card-wrapper interaction-reveal-node">
                    <article class="state-card">
                        <div class="state-image-container">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E" data-src="${state.img}" class="state-img lazy-image-node" alt="${state.name}">
                            <div class="state-img-scrim"></div>
                            <button class="favorite-interactive-trigger ${isFav ? 'is-favorited' : ''}" data-id="${state.id}" aria-label="Save Destination">
                                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                            </button>
                        </div>
                        <div class="state-card-body">
                            <div class="state-meta">
                                <span class="meta-count"><i class="fa-solid fa-calendar-days"></i> ${state.events} Explorations</span>
                                <span class="meta-vibe">${state.vibe}</span>
                            </div>
                            <h3 class="state-name">${state.name}</h3>
                            <p>${state.desc}</p>
                            <a href="#" class="state-card-link">Explore Platform <i class="fa-solid fa-arrow-right-long"></i></a>
                        </div>
                    </article>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            
            // Event Delegation alternative matching robust structures
            templateNode.querySelector(".favorite-interactive-trigger").addEventListener("click", function(e) {
                e.preventDefault();
                toggleAssetFavoriteState(state.id, this);
            });

            DOM.stateGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderDestinationsEngine = (dataset) => {
        if (!DOM.destinationGrid) return;
        DOM.destinationGrid.innerHTML = "";

        if (dataset.length === 0) {
            DOM.destinationGrid.innerHTML = `<div class="empty-query-scrim">No destinations match the parameters.</div>`;
            return;
        }

        dataset.forEach(dest => {
            const rawHTML = `
                <div class="destination-item-card interaction-reveal-node ${dest.isHorizontal ? 'span-horizontal' : ''}">
                    <div class="dest-image-wrapper">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3C/svg%3E" data-src="${dest.img}" class="dest-img lazy-image-node" alt="${dest.name}">
                        <span class="dest-badge">${dest.state}</span>
                    </div>
                    <div class="dest-info-tray">
                        <div class="dest-title-line">
                            <h3>${dest.name}</h3>
                            <span class="dest-rating"><i class="fa-solid fa-star"></i> ${dest.rating}</span>
                        </div>
                        <div class="dest-tags">${dest.tags}</div>
                    </div>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.destinationGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderHeritageEngine = () => {
        if (!DOM.heritageSlider) return;
        DOM.heritageSlider.innerHTML = "";

        HeritageData.forEach(heritage => {
            const rawHTML = `
                <div class="heritage-wide-card interaction-reveal-node">
                    <div class="heritage-image-split">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3C/svg%3E" data-src="${heritage.img}" class="heritage-img lazy-image-node" alt="${heritage.title}">
                    </div>
                    <div class="heritage-content-split">
                        <div class="heritage-header">
                            <span class="heritage-id-badge">${heritage.badge}</span>
                            <h3 class="heritage-title">${heritage.title}</h3>
                        </div>
                        <p class="heritage-excerpt">${heritage.desc}</p>
                        <div class="heritage-action-bar">
                            <span class="heritage-descriptor"><i class="fa-solid fa-gopuram"></i> ${heritage.descriptor}</span>
                            <button class="btn-luxury-text">Documentary Link <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.heritageSlider.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderHiddenGemsEngine = () => {
        if (!DOM.hiddenGemsGrid) return;
        DOM.hiddenGemsGrid.innerHTML = "";

        GemsData.forEach(gem => {
            const rawHTML = `
                <article class="gem-editorial-card interaction-reveal-node">
                    <div class="gem-frame">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E" data-src="${gem.img}" class="gem-img lazy-image-node" alt="${gem.name}">
                        <span class="gem-location-stamp"><i class="fa-solid fa-location-dot"></i> ${gem.location}</span>
                    </div>
                    <div class="gem-details">
                        <h3>${gem.name}</h3>
                        <p>${gem.desc}</p>
                        <div class="gem-signature-row">
                            <span class="signature-metric"><i class="fa-solid fa-compass"></i> ${gem.distance}</span>
                            <span class="signature-metric"><i class="fa-solid fa-clock"></i> ${gem.time}</span>
                        </div>
                    </div>
                </article>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.hiddenGemsGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderAdventureEngine = () => {
        if (!DOM.adventureScroll) return;
        DOM.adventureScroll.innerHTML = "";

        AdventureData.forEach(adv => {
            const rawHTML = `
                <div class="adventure-card-node interaction-reveal-node">
                    <div class="adventure-media">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 9'%3E%3C/svg%3E" data-src="${adv.img}" class="adv-img lazy-image-node" alt="${adv.title}">
                        <span class="adv-intensity">${adv.intensity}</span>
                    </div>
                    <div class="adventure-meta-data">
                        <h3>${adv.title}</h3>
                        <p>${adv.desc}</p>
                    </div>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.adventureScroll.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderFoodTrailsEngine = () => {
        if (!DOM.foodTrailsGrid) return;
        DOM.foodTrailsGrid.innerHTML = "";

        FoodTrailsData.forEach(trail => {
            const rawHTML = `
                <article class="food-editorial-node interaction-reveal-node">
                    <div class="food-image-frame">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E" data-src="${trail.img}" class="food-img lazy-image-node" alt="${trail.title}">
                    </div>
                    <div class="food-content">
                        <span class="food-category-label">${trail.category}</span>
                        <h3>${trail.title}</h3>
                        <p>${trail.desc}</p>
                    </div>
                </article>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.foodTrailsGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    const RenderSpiritualEngine = () => {
        if (!DOM.spiritualGrid) return;
        DOM.spiritualGrid.innerHTML = "";

        SpiritualData.forEach(journey => {
            const metricListHTML = journey.metrics.map(metric => `<li><i class="fa-solid fa-circle-check"></i> ${metric}</li>`).join("");
            const rawHTML = `
                <div class="spiritual-box interaction-reveal-node">
                    <div class="spiritual-icon-frame">
                        <i class="fa-solid ${journey.icon}"></i>
                    </div>
                    <h3>${journey.title}</h3>
                    <p class="spiritual-box-desc">${journey.desc}</p>
                    <ul class="spiritual-sub-list">
                        ${metricListHTML}
                    </ul>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.spiritualGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
        });
    };

    const RenderSeasonalEngine = () => {
        if (!DOM.seasonalGrid) return;
        DOM.seasonalGrid.innerHTML = "";

        SeasonalData.forEach(season => {
            const rawHTML = `
                <div class="season-quad-cell interaction-reveal-node">
                    <div class="season-background-wrapper">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3C/svg%3E" data-src="${season.img}" class="season-img lazy-image-node" alt="${season.title}">
                    </div>
                    <div class="season-glass-overlay">
                        <h3>${season.title} <span class="season-months">${season.months}</span></h3>
                        <p class="season-desc">${season.desc}</p>
                        <span class="season-cta-tag">View Season Roadmap <i class="fa-solid fa-arrow-trend-up"></i></span>
                    </div>
                </div>
            `;
            const templateNode = compileTemplateNode(rawHTML);
            DOM.seasonalGrid.appendChild(templateNode);
            ViewportRevealObserver.observe(templateNode);
            ViewportRevealObserver.observe(templateNode.querySelector(".lazy-image-node"));
        });
    };

    // =========================================================================
    // 6. PROCESSING FILTERS & EVENT INTEGRATIONS
    // =========================================================================

    /**
     * Centralized Evaluation Pipeline matching State to Dynamic DOM Output
     */
    const evaluateApplicationDataFilters = () => {
        const query = AppState.filters.searchQuery.toLowerCase().trim();
        const targetRegion = AppState.filters.region;
        const targetType = AppState.filters.type;

        // Process State Filtration Nodes
        const filteredStates = StatesData.filter(state => {
            const matchesQuery = state.name.toLowerCase().includes(query) || state.desc.toLowerCase().includes(query) || state.vibe.toLowerCase().includes(query);
            const matchesRegion = (targetRegion === "Anywhere" || state.name === targetRegion);
            return matchesQuery && matchesRegion;
        });

        // Process Destination Filtration Nodes
        const filteredDestinations = DestinationsData.filter(dest => {
            const matchesQuery = dest.name.toLowerCase().includes(query) || dest.tags.toLowerCase().includes(query) || dest.state.toLowerCase().includes(query);
            const matchesRegion = (targetRegion === "Anywhere" || dest.state === targetRegion);
            const matchesType = (targetType === "All" || dest.type === targetType);
            return matchesQuery && matchesRegion && matchesType;
        });

        RenderStatesEngine(filteredStates);
        RenderDestinationsEngine(filteredDestinations);
    };

    /**
     * Map User Interactions to Pipeline Execution Variables
     */
    const initializeInteractionHandlers = () => {
        if (DOM.searchBtn) {
            DOM.searchBtn.addEventListener("click", (e) => {
                e.preventDefault();
                
                AppState.filters.searchQuery = DOM.searchInput ? DOM.searchInput.value : "";
                AppState.filters.region = DOM.regionSelect ? DOM.regionSelect.value : "Anywhere";
                AppState.filters.type = DOM.typeSelect ? DOM.typeSelect.value : "All";
                AppState.filters.date = DOM.dateInput ? DOM.dateInput.value : "";
                
                evaluateApplicationDataFilters();

                // Smooth structural viewport shifting to primary layout grid
                const anchorNode = DOM.stateGrid || DOM.destinationGrid;
                if (anchorNode) {
                    anchorNode.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }

        // Live Event Delegation processing for Quick Exploration Tags
        if (DOM.quickTagsContainer) {
            DOM.quickTagsContainer.addEventListener("click", (e) => {
                const clickedTag = e.target.closest(".quick-tag");
                if (!clickedTag) return;

                const tagValue = clickedTag.textContent.trim();
                if (DOM.searchInput) {
                    DOM.searchInput.value = tagValue;
                }
                AppState.filters.searchQuery = tagValue;
                evaluateApplicationDataFilters();

                const anchorNode = DOM.stateGrid || DOM.destinationGrid;
                if (anchorNode) {
                    anchorNode.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }

        // Smooth Scroll Tracking Trigger
        if (DOM.scrollTrigger) {
            DOM.scrollTrigger.addEventListener("click", (e) => {
                e.preventDefault();
                const targetSelector = DOM.scrollTrigger.getAttribute("href");
                const targetNode = document.querySelector(targetSelector);
                if (targetNode) {
                    targetNode.scrollIntoView({ behavior: "smooth" });
                }
            });
        }

        // Production Validation Engine for Newsletter Signups
        if (DOM.newsletterForm) {
            DOM.newsletterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (!DOM.newsletterEmail) return;

                const emailValue = DOM.newsletterEmail.value.trim();
                const emailRegex = /^[^\s@]+%20|[^\s@]+\.[^\s@]+$/; // Validation pattern matching legacy profiles
                const standardRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (standardRegex.test(emailValue)) {
                    // Inject a clean luxury notification layer
                    const inputBlock = document.querySelector(".newsletter-premium-input-block");
                    if (inputBlock) {
                        const originalHTML = inputBlock.innerHTML;
                        inputBlock.innerHTML = `<span style="color: var(--accent-light); font-family: var(--font-sans); font-weight: 600; width:100%; text-align:center;"><i class="fa-solid fa-circle-check"></i> VIP Access Key Transmitted. Check Inbox.</span>`;
                        DOM.newsletterEmail.value = "";
                        setTimeout(() => {
                            inputBlock.innerHTML = originalHTML;
                            // Re-bind nodes after layout refreshing to prevent runtime leaks
                            DOM.newsletterEmail = document.getElementById("newsletterEmail");
                            initializeInteractionHandlers();
                        }, 5000);
                    }
                } else {
                    DOM.newsletterEmail.style.borderBottom = "2px solid #A6383D";
                    setTimeout(() => {
                        DOM.newsletterEmail.style.borderBottom = "none";
                    }, 3000);
                }
            });
        }
    };

    // =========================================================================
    // 7. BOOTSTRAP INITIALIZATION RECEPTACLE
    // =========================================================================
    const bootstrapPlatformApplicationEngine = () => {
        // Construct Initial Non-Filtered UI Arrays
        RenderStatesEngine(StatesData);
        RenderDestinationsEngine(DestinationsData);
        RenderHeritageEngine();
        RenderHiddenGemsEngine();
        RenderAdventureEngine();
        RenderFoodTrailsEngine();
        RenderSpiritualEngine();
        RenderSeasonalEngine();

        // Attach Strategic Micro-interaction Modules
        initializeInteractionHandlers();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrapPlatformApplicationEngine);
    } else {
        bootstrapPlatformApplicationEngine();
    }
})();