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
        square: "../assets/images/dynamic/Hampi_Boulder_Horizons.webp",
        landscape: "../assets/images/dynamic/Varkala_Cliff_Escapes.webp"
    };

    const StatesData = [
        { id: "st-rajasthan", name: "Rajasthan", events: 42, vibe: "Royal Heritage", desc: "Land of majestic hill forts, shimmering palaces, and vibrant desert festivals.", img: "../assets/images/dynamic/Udaipur_Lakes___Palaces.webp" },
        { id: "st-kerala", name: "Kerala", events: 28, vibe: "Serene Nature", desc: "Tranquil emerald backwaters, holistic Ayurveda sanctuaries, and spice-laden hills.", img: "../assets/images/dynamic/Backwater_Traditional_Houseboat_Jazz_Cruise.webp" },
        { id: "st-himachal", name: "Himachal Pradesh", events: 31, vibe: "Alpine Adventure", desc: "Snow-capped peaks, pine forests, and high-altitude valleys perfect for exploration.", img: "../assets/images/dynamic/Eshanya_Himalayan_Ridge_Trekking.webp" },
        { id: "st-goa", name: "Goa", events: 35, vibe: "Coastal Rhythm", desc: "Sun-drenched golden sands, Indo-Portuguese architecture, and vibrant night bazaars.", img: "../assets/images/dynamic/Sunsets_over_pristine_luxury_beachfront_in_Goa.webp" },
        { id: "st-tamilnadu", name: "Tamil Nadu", events: 24, vibe: "Living Temples", desc: "Towering gopurams, ancient classical arts, and serene coastline stretches.", img: "../assets/images/dynamic/Chettinad_Aristocratic_Mansion_Culinary_Trail.webp" },
        { id: "st-meghalaya", name: "Meghalaya", events: 18, vibe: "Mystic Clouds", desc: "Living root bridges, deep cavern systems, and crystal-clear rainwater rivers.", img: "../assets/images/dynamic/Mawlynnong_Living_Root_Bridges_Private_Eco_Route.webp" }
    ];

    const DestinationsData = [
        { id: "dest-udaipur", name: "Udaipur", state: "Rajasthan", rating: "4.9", tags: "Palaces • Lakes • Romantic", type: "Heritage", isHorizontal: true, img: "../assets/images/dynamic/Udaipur_Mewar_Symphony_Gala.webp" },
        { id: "dest-munnar", name: "Munnar", state: "Kerala", rating: "4.8", tags: "Tea Gardens • Mist • Hiking", type: "Nature", isHorizontal: false, img: "../assets/images/dynamic/Lush_blooming_orchards_of_the_Kashmir_Valley.webp" },
        { id: "dest-hampi", name: "Hampi", state: "Karnataka", rating: "4.9", tags: "Ruins • History • Monoliths", type: "Heritage", isHorizontal: false, img: "../assets/images/dynamic/Hampi_Boulder_Horizons.webp" },
        { id: "dest-manali", name: "Manali", state: "Himachal Pradesh", rating: "4.7", tags: "Snow • Paragliding • Valleys", type: "Adventure", isHorizontal: true, img: "../assets/images/dynamic/Ladakh_High_Passes.webp" },
        { id: "dest-varanasi", name: "Varanasi", state: "Uttar Pradesh", rating: "4.9", tags: "Ghats • Spirituality • Rituals", type: "Spiritual", isHorizontal: false, img: "../assets/images/dynamic/Maha_Ganga_Aarti_Devotional_VIP_Deck_Access.webp" },
        { id: "dest-jaipur", name: "Jaipur", state: "Rajasthan", rating: "4.9", tags: "Forts • Culture • Royals", type: "Heritage", isHorizontal: true, img: "../assets/images/dynamic/Royal_Mewar_Palace_Culinary_Gala_Banquet.webp" }
    ];

    const HeritageData = [
        { id: "her-taj", title: "The Taj Mahal, Agra", badge: "UNESCO World Heritage Site", desc: "The crown jewel of Indo-Islamic symmetry and architectural romance, constructed entirely of pristine Makrana white marble.", descriptor: "Mughal Architecture • 17th Century", img: "../assets/images/dynamic/Taj_Mahal_Moonlight_Heritage_Connoisseur.webp" },
        { id: "her-ellora", title: "Ellora Rock-Cut Temples", badge: "Monolithic Excavation", desc: " Kailash Temple (Cave 16) stands as the world's largest monolithic rock excavation, carved vertically from a single basalt cliff face.", descriptor: "Rashtrakuta Dynasty • 8th Century", img: "../assets/images/dynamic/Ajanta___Ellora_Classical_Dance_Convergence.webp" },
        { id: "her-konark", title: "Konark Sun Temple", badge: "Architectural Marvel", desc: "Designed as a colossal processional chariot for the Sun God Surya, adorned with 24 meticulously carved stone wheels pulled by 7 rearing horses.", descriptor: "Ganga Dynasty • 13th Century", img: "../assets/images/dynamic/Hampi_Virupaksha_Ruins_Laser_Mapping.webp" },
        { id: "her-khajuraho", title: "Khajuraho Group of Monuments", badge: "UNESCO World Heritage", desc: "Famous for their nagara-style architectural symbolism and their erotic sculptures.", descriptor: "Chandela Dynasty • 10th Century", img: "../assets/images/dynamic/Khajuraho_Classical_Dance_Soiree.webp" },
        { id: "her-redfort", title: "Red Fort, Delhi", badge: "Historic Fortification", desc: "The main residence of the Mughal emperors, representing the zenith of Mughal creativity.", descriptor: "Mughal Architecture • 17th Century", img: "../assets/images/dynamic/Old_Delhi_Heritage_Breakfast_Masterclass.webp" },
        { id: "her-fontainhas", title: "Fontainhas, Goa", badge: "Latin Quarter", desc: "A vibrant heritage walk through pastel-colored Indo-Portuguese houses and winding streets.", descriptor: "Portuguese Architecture • 18th Century", img: "../assets/images/dynamic/Fontainhas_Luxury_Indo_Portuguese_Walk.webp" }
    ];

    const GemsData = [
        { id: "gem-ziro", name: "Ziro Valley", location: "Arunachal Pradesh", desc: "A sweeping high-altitude plateau home to the Apatani tribe, characterized by pine forests and dynamic music cultures.", distance: "Off-Grid Sanctuary", time: "Best Oct - Apr", img: "../assets/images/dynamic/Pine_forests_and_agricultural_flats_of_Ziro_Valley.webp" },
        { id: "gem-gandikota", name: "Gandikota Gorge", location: "Andhra Pradesh", desc: "A stunning hidden assembly of massive red sandstone cliffs framing the Pennar River, frequently dubbed the Grand Canyon of India.", distance: "Geological Wonder", time: "Best Nov - Feb", img: "../assets/images/dynamic/Gandikota_Grand_Canyon_Starlight_Camp.webp" },
        { id: "gem-lonar", name: "Lonar Meteorite Lake", location: "Maharashtra", desc: "A hyper-velocity impact crater lake formed over 52,000 years ago, surrounded by deep monolithic emerald forest canopies.", distance: "Astronomical Astrobleme", time: "Best Sep - Mar", img: "../assets/images/dynamic/Lonar_Crater_Secret_Astrophotography_Outing.webp" },
        { id: "gem-varkala", name: "Varkala Cliff", location: "Kerala", desc: "The only place in southern Kerala where cliffs are found adjacent to the Arabian Sea, offering dramatic views.", distance: "Coastal Escape", time: "Best Oct - Mar", img: "../assets/images/dynamic/Varkala_Cliff_Escapes.webp" },
        { id: "gem-pushkar", name: "Pushkar Lake", location: "Rajasthan", desc: "A sacred Hindu site surrounded by hundreds of temples and ghats, hosting the famous camel fair.", distance: "Spiritual Center", time: "Best Nov", img: "../assets/images/dynamic/Royal_Pushkar_Camel_Mela_Exclusive.webp" },
        { id: "gem-ziro-fest", name: "Ziro Festival", location: "Arunachal Pradesh", desc: "An outdoor music festival celebrating independent music scenes in India in a serene valley.", distance: "Cultural Music Hub", time: "Best Sep", img: "../assets/images/dynamic/Ziro_Music_Festival_Boutique_Experience.webp" }
    ];

    const AdventureData = [
        { id: "adv-zanskar", title: "Chadar Frozen River Trek", intensity: "Extreme", desc: "A dramatic winter expedition crossing the shifting, semi-frozen glass ice blocks of the Zanskar River.", img: "../assets/images/dynamic/Eshanya_Himalayan_Ridge_Trekking.webp" },
        { id: "adv-rishikesh", title: "Grade IV White Water Rafting", intensity: "High", desc: "Conquering wild, turbulent rapids along the emerald headwaters of the holy Ganges in Rishikesh.", img: "../assets/images/dynamic/Maha_Ganga_Aarti_Devotional_VIP_Deck_Access.webp" },
        { id: "adv-bir", title: "Paragliding Cross-Country", intensity: "Moderate", desc: "Launching into sub-Himalayan thermals from Bir Billing, the world's premier high-altitude taking-off site.", img: "../assets/images/dynamic/Ladakh_High_Passes.webp" },
        { id: "adv-andaman", title: "Scuba Diving Havelock Reefs", intensity: "Moderate", desc: "Exploring volcanic drop-offs and dynamic marine ecosystems deep within the Andaman Sea.", img: "../assets/images/dynamic/Sunsets_over_pristine_luxury_beachfront_in_Goa.webp" },
        { id: "adv-ladakh", title: "Ladakh Motorbike Expedition", intensity: "High", desc: "Riding across some of the highest motorable passes in the world amidst rugged terrain.", img: "../assets/images/dynamic/Le_Ladakh_Photogenic_Autumn_Motorbike_Tour.webp" },
        { id: "adv-safari", title: "Ranthambore Tiger Safari", intensity: "Moderate", desc: "Tracking the elusive Bengal Tiger through dry deciduous forests and historic ruins.", img: "../assets/images/dynamic/Traditional_Block_Printing___Indigo_Dye_Workshop.webp" }
    ];

    const FoodTrailsData = [
        { id: "food-old-delhi", category: "Culinary Legacy", title: "Old Delhi Spice & Mughlai Trail", desc: "Navigating century-old alleys to sample legacy paranthas, slow-cooked Nihari, and rich artisanal jalebis.", img: "../assets/images/dynamic/Old_Delhi_Heritage_Breakfast_Masterclass.webp" },
        { id: "food-chettinad", category: "Aromatic Spice", title: "Chettinad Heritage Feast", desc: "Experiencing complex, multi-layered culinary profiles prepared using freshly hand-ground, stone-crushed local coastal spices.", img: "../assets/images/dynamic/Chettinad_Aristocratic_Mansion_Culinary_Trail.webp" },
        { id: "food-wazwan", category: "Royal Banquet", title: "Kashmiri Wazwan Narrative", desc: "A formal multi-course slow-cooked banquet highlighting intricate aromatic preparations steeped in saffron, cockscomb, and local curd.", img: "../assets/images/dynamic/Royal_Awadhi_Gastronomy_Masterclass.webp" },
        { id: "food-zomaland", category: "Festival Eats", title: "Zomaland Mega Carnival", desc: "A massive food and culture festival featuring pop-ups from the best restaurants across the nation.", img: "../assets/images/dynamic/Zomaland_Food___Culture_Festival.webp" },
        { id: "food-jaipur", category: "Royal Dining", title: "Mewar Palace Gala Dinner", desc: "An exclusive dining experience within a historic palace featuring authentic Rajasthani royal cuisine.", img: "../assets/images/dynamic/Royal_Mewar_Palace_Culinary_Gala_Banquet.webp" },
        { id: "food-goa", category: "Coastal Cuisine", title: "Goan Seafood Masterclass", desc: "Learning the secrets of authentic Goan vindaloo, xacuti, and fresh seafood preparations.", img: "../assets/images/dynamic/Sunburn_Festival_Goa_2026.webp" }
    ];

    const SpiritualData = [
        { id: "spir-yoga", title: "Ashram Contemplation", desc: "Deep meditation modules within classic stone-carved cells flanking the Ganges riverbank.", metrics: ["Vedic Philosophy", "Pranayama Alignment", "Mantra Centering"], icon: "fa-om" },
        { id: "spir-sufi", title: "Sufi Qawwali Evening", desc: "Transcendental ecstatic musical gatherings held at Hazrat Nizamuddin Aulia's historic marble shrine.", metrics: ["Mystic Poetry", "Choral Synchrony", "Spiritual Ecstasy"], icon: "fa-mosque" },
        { id: "spir-monk", title: "Vipassana Silent Retreat", desc: "Sustained internal contemplation retreats deep within high-altitude monastic architectures.", metrics: ["Absolute Silence", "Mindfulness Tracking", "Insight Cleansing"], icon: "fa-dharmachakra" },
        { id: "spir-aarti", title: "Ganga Aarti Ceremony", desc: "A powerful evening ritual of fire, chanting, and devotion on the sacred ghats of Varanasi.", metrics: ["Fire Ritual", "Chanting", "Devotion"], icon: "fa-fire" },
        { id: "spir-temple", title: "Meenakshi Temple Tour", desc: "Exploring the vast complex of the historic Meenakshi Amman Temple in Madurai.", metrics: ["Dravidian Architecture", "Ritual Insight", "Mythology"], icon: "fa-vihara" },
        { id: "spir-bodhgaya", title: "Bodhi Tree Meditation", desc: "Finding peace and enlightenment under the sacred Bodhi Tree where the Buddha attained Nirvana.", metrics: ["Buddhist Teachings", "Silent Sitting", "Historical Site"], icon: "fa-leaf" }
    ];

    const SeasonalData = [
        { id: "sea-monsoon", title: "Western Ghats Monsoon Bloom", months: "July - September", desc: "Surging waterfalls, misty driving routes, and the rare purple Neelakurinji flower carpeting pristine peaks.", img: "../assets/images/dynamic/Varkala_Cliff_Escapes.webp" },
        { id: "sea-winter", title: "Rann of Kutch Salt Desert", months: "November - February", desc: "Infinite white salt flats illuminated under full moon configurations during the cultural celebration of Rann Utsav.", img: "../assets/images/dynamic/Ladakh_High_Passes.webp" },
        { id: "sea-summer", title: "Kashmir Valley Spring", months: "March - May", desc: "Witness the breathtaking bloom of tulips and lush orchards in the Paradise on Earth.", img: "../assets/images/dynamic/Lush_blooming_orchards_of_the_Kashmir_Valley.webp" },
        { id: "sea-autumn", title: "Ziro Valley Harvest", months: "September - October", desc: "Golden paddy fields ready for harvest set against pine-clad hills in Arunachal Pradesh.", img: "../assets/images/dynamic/Pine_forests_and_agricultural_flats_of_Ziro_Valley.webp" },
        { id: "sea-festive", title: "Varanasi Dev Deepawali", months: "November", desc: "The ghats come alive with millions of earthen lamps celebrating the descent of gods.", img: "../assets/images/dynamic/Dev_Deepawali_Infinite_Lights_Cruise.webp" },
        { id: "sea-spring", title: "Goan Carnival & Spring", months: "February - March", desc: "Vibrant parades, music, and the beautiful coastal transition from winter to summer.", img: "../assets/images/dynamic/Sunsets_over_pristine_luxury_beachfront_in_Goa.webp" }
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

        // Global Event Card Navigation Interceptor
        document.addEventListener("click", (e) => {
            const card = e.target.closest(".state-card") || 
                         e.target.closest(".destination-grid-cell") || 
                         e.target.closest(".heritage-card") || 
                         e.target.closest(".gem-card") || 
                         e.target.closest(".adventure-card") || 
                         e.target.closest(".food-card") || 
                         e.target.closest(".spiritual-card") || 
                         e.target.closest(".season-quad-cell");
            
            // Allow bookmark buttons to function without navigating
            if (card && !e.target.closest(".card-bookmark-btn") && !e.target.closest(".card-action-btn")) {
                const id = card.getAttribute("data-id") || 1;
                window.location.href = `event-details.html?id=${id}`;
            }
        });

        // Newsletter Subscription
        if (DOM.newsletterForm) {
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
                if (!DOM.newsletterEmail) return;

                const emailValue = DOM.newsletterEmail.value.trim();
                const standardRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const wants_whatsapp = nlWantsWhatsapp ? nlWantsWhatsapp.checked : false;
                const whatsapp_number = nlWhatsapp ? nlWhatsapp.value.trim() : null;

                if (!standardRegex.test(emailValue)) {
                    DOM.newsletterEmail.style.borderBottom = "2px solid #A6383D";
                    setTimeout(() => {
                        DOM.newsletterEmail.style.borderBottom = "none";
                    }, 3000);
                    return;
                }

                const inputBlock = document.querySelector(".newsletter-premium-input-block");
                try {
                    // Assume CONFIG is loaded globally
                    const apiUrl = window.CONFIG ? window.CONFIG.API.NEWSLETTER : 'http://localhost:8000/api/newsletter/subscribe';
                    const res = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            email: emailValue,
                            wants_whatsapp: wants_whatsapp,
                            whatsapp_number: whatsapp_number
                        })
                    });
                    const data = await res.json();

                    if (res.ok && data.success) {
                        if (inputBlock) {
                            const originalHTML = inputBlock.innerHTML;
                            inputBlock.innerHTML = `<span style="color: var(--accent-light); font-family: var(--font-sans); font-weight: 600; width:100%; text-align:center;"><i class="fa-solid fa-circle-check"></i> ${data.message}</span>`;
                            DOM.newsletterEmail.value = "";
                            setTimeout(() => {
                                inputBlock.innerHTML = originalHTML;
                                DOM.newsletterEmail = document.getElementById("newsletterEmail");
                                initializeInteractionHandlers();
                            }, 5000);
                        }
                    } else {
                        alert(data.detail || data.message || 'Something went wrong. Please try again.');
                    }
                } catch (err) {
                    console.error('Newsletter subscribe error:', err);
                    alert('Could not connect to the server. Please try again later.');
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

    // Navbar scroll transparency toggle
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const heroSection = document.querySelector('.hero');
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
