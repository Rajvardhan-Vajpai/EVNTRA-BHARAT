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
        searchInput: document.getElementById("searchInput"),
        locationSelect: document.getElementById("locationSelect"),
        dateInput: document.getElementById("dateInput"),
        categorySelect: document.getElementById("categorySelect"),
        budgetSelect: document.getElementById("budgetSelect"),
        ratingSelect: document.getElementById("ratingSelect"),
        sortSelect: document.getElementById("sortSelect"),
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
            itemsPerPage: 8
        },
        events: [],
        filteredEvents: [],
        favorites: new Set()
    };

    // ==========================================================================
    // 3. Realistic Indian Event Master Dataset (32 Premium Collections)
    // ==========================================================================
    const MASTER_EVENT_DATA = [
        {
            id: "ev-001",
            title: "Sunburn Festival Goa 2026",
            description: "Asia's premier electronic dance music extravaganza featuring global headliners on the sands of Vagator.",
            category: "Music",
            city: "Goa",
            state: "Goa",
            venue: "Vagator Beach Arena",
            date: "2026-12-28",
            time: "16:00",
            price: 4999,
            rating: 4.9,
            reviews: 1420,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "Percept Live",
            capacity: 50000,
            availableTickets: 3200,
            tags: ["EDM", "Beach", "Festival", "Nightlife"]
        },
        {
            id: "ev-002",
            title: "Zomaland Food & Culture Festival",
            description: "A culinary wonderland showcasing top gastronomic destinations, premium acts, and artisanal installations.",
            category: "Food",
            city: "Mumbai",
            state: "Maharashtra",
            venue: "Jio World Garden",
            date: "2026-11-14",
            time: "12:00",
            price: 699,
            rating: 4.7,
            reviews: 890,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "Zomato Live",
            capacity: 15000,
            availableTickets: 2100,
            tags: ["Culinary", "Family", "Carnival", "Gourmet"]
        },
        {
            id: "ev-003",
            title: "Vir Das: Mind Fool India Tour",
            description: "International Emmy winner Vir Das delivers an explosive evening of sharp societal satire and razor-sharp storytelling.",
            category: "Comedy",
            city: "Delhi NCR",
            state: "Delhi",
            venue: "Sirifort Auditorium",
            date: "2026-10-05",
            time: "19:30",
            price: 1500,
            rating: 4.8,
            reviews: 650,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Weirdass Comedy",
            capacity: 2000,
            availableTickets: 120,
            tags: ["Standup", "Adult", "Satire", "Humor"]
        },
        {
            id: "ev-004",
            title: "Rajasthan Heritage Desert Safari & Sufi Beats",
            description: "Immersive luxury dunes camping matched with timeless desert mystical music under stargazing night skies.",
            category: "Heritage",
            city: "Jaisalmer",
            state: "Rajasthan",
            venue: "Sam Sand Dunes Enclave",
            date: "2026-11-20",
            time: "17:00",
            price: 8500,
            rating: 4.9,
            reviews: 410,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: false,
            organizer: "Marwar Tourism Royalties",
            capacity: 500,
            availableTickets: 45,
            tags: ["Sufi", "Royal", "Desert", "Culture"]
        },
        {
            id: "ev-005",
            title: "Indian Tech Leadership Summit 2026",
            description: "The marquee destination for technologists, venture capitals, innovators, and AI engineering framework deep dives.",
            category: "Technology",
            city: "Bengaluru",
            state: "Karnataka",
            venue: "NIMHANS Convention Centre",
            date: "2026-09-18",
            time: "09:00",
            price: 12000,
            rating: 4.6,
            reviews: 320,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "SiliconIndia Forums",
            capacity: 3000,
            availableTickets: 480,
            tags: ["AI", "Networking", "SaaS", "Business"]
        },
        {
            id: "ev-006",
            title: "Himalayan Trekking & Survival Bootcamp",
            description: "High-altitude wilderness mountaineering and survival mechanics masterclass across untamed ridges.",
            category: "Adventure",
            city: "Manali",
            state: "Himachal Pradesh",
            venue: "Solang Alpine Valley Base",
            date: "2026-10-10",
            time: "06:00",
            price: 14500,
            rating: 4.8,
            reviews: 190,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: false,
            organizer: "Into The Wild India",
            capacity: 80,
            availableTickets: 12,
            tags: ["Trek", "Mountains", "Extreme", "Fitness"]
        },
        {
            id: "ev-007",
            title: "Pro Kabaddi League Championship Finals",
            description: "Witness historical gladiatorial sporting intensity live as the top premium Indian franchises clash.",
            category: "Sports",
            city: "Hyderabad",
            state: "Telangana",
            venue: "Gachibowli Indoor Stadium",
            date: "2026-11-05",
            time: "19:00",
            price: 450,
            rating: 4.7,
            reviews: 2100,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Mashal Sports Entertainment",
            capacity: 8000,
            availableTickets: 650,
            tags: ["Kabaddi", "Live Sports", "Matches", "Thrilling"]
        },
        {
            id: "ev-008",
            title: "Contemporary Fine Arts Global Biennale",
            description: "A prestigious curated retrospective showcasing avant-garde canvas sculpture and generative digital installations.",
            category: "Art",
            city: "Kochi",
            state: "Kerala",
            venue: "Aspinwall House Heritage Zone",
            date: "2026-12-12",
            time: "10:00",
            price: 300,
            rating: 4.5,
            reviews: 430,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Kochi Biennale Foundation",
            capacity: 5000,
            availableTickets: 3900,
            tags: ["Exhibition", "Sculpture", "Galleries", "Creative"]
        },
        {
            id: "ev-009",
            title: "Angel Investors Startup Pitchfest",
            description: "High-stakes elite roundtable matching early-stage technology innovations with enterprise syndicate funds.",
            category: "Business",
            city: "Bengaluru",
            state: "Karnataka",
            venue: "The Leela Palace Ballroom",
            date: "2026-09-25",
            time: "10:00",
            price: 7500,
            rating: 4.4,
            reviews: 150,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "IndoVenture Partners",
            capacity: 400,
            availableTickets: 35,
            tags: ["Funding", "Capital", "Sectors", "Growth"]
        },
        {
            id: "ev-010",
            title: "A.R. Rahman Live Symphony Orchestra",
            description: "The musical maestro crafts a breathtaking panoramic score with eighty international orchestral multi-instrumentalists.",
            category: "Music",
            city: "Chennai",
            state: "Tamil Nadu",
            venue: "YMCA Grounds Nandanam",
            date: "2026-10-18",
            time: "18:30",
            price: 2499,
            rating: 5.0,
            reviews: 4890,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "Mani Sharma Global Labs",
            capacity: 35000,
            availableTickets: 1200,
            tags: ["Legend", "Symphony", "Concerts", "Bollywood"]
        },
        {
            id: "ev-011",
            title: "Zakir Khan Live: New Material Show",
            description: "The uncontested king of Indian organic comedy returns to test unfiltered deeply personal anecdotal comedy stories.",
            category: "Comedy",
            city: "Mumbai",
            state: "Maharashtra",
            venue: "Shanmukhananda Hall",
            date: "2026-09-30",
            time: "20:00",
            price: 1800,
            rating: 4.9,
            reviews: 1340,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "OML Entertainment",
            capacity: 2500,
            availableTickets: 0,
            tags: ["Sold Out", "Sakht Launda", "Poetry", "Relatable"]
        },
        {
            id: "ev-012",
            title: "Royal Awadhi Gastronomy Masterclass",
            description: "Unlock secret culinary formulations of classic slow-cooked Dum Pukht biryanis alongside generation-old chefs.",
            category: "Food",
            city: "Lucknow",
            state: "Uttar Pradesh",
            venue: "The Taj Mahal Palace Courtyard",
            date: "2026-10-22",
            time: "13:00",
            price: 3500,
            rating: 4.8,
            reviews: 280,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Nawabi Heritage Trust",
            capacity: 120,
            availableTickets: 42,
            tags: ["Kebab", "Royal Dining", "Workshop", "Awadh"]
        },
        {
            id: "ev-013",
            title: "Scuba Diving Expedition & Coral Mapping",
            description: "PADI certified deep marine dive ecosystems charting virgin reefs and aquatic biospheres.",
            category: "Adventure",
            city: "Andaman",
            state: "Andaman and Nicobar",
            venue: "Havelock Island Marine Reserve",
            date: "2026-12-05",
            time: "07:30",
            price: 9000,
            rating: 4.9,
            reviews: 160,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Oceanic India Aquatics",
            capacity: 50,
            availableTickets: 8,
            tags: ["Ocean", "Diving", "Eco Tourism", "Coral"]
        },
        {
            id: "ev-014",
            title: "Varanasi Dev Deepawali Spiritual Photography Cruise",
            description: "A transcendental sunrise boat journey experiencing millions of floating lamps and high spiritual aesthetic energy.",
            category: "Heritage",
            city: "Varanasi",
            state: "Uttar Pradesh",
            venue: "Dashashwamedh Main Ghats",
            date: "2026-11-23",
            time: "05:00",
            price: 4000,
            rating: 5.0,
            reviews: 740,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "Ganga Heritage Expediters",
            capacity: 200,
            availableTickets: 15,
            tags: ["Ghats", "Spiritual", "Photography", "Ganga Aarti"]
        },
        {
            id: "ev-015",
            title: "International Yoga & Mindfulness Retreat",
            description: "Deep ashram-based holistic alignment, transcendental breathwork, organic nutritional lifestyle structures.",
            category: "Adventure",
            city: "Rishikesh",
            state: "Uttarakhand",
            venue: "Satsang Anand Retreat Sanctuary",
            date: "2026-10-02",
            time: "05:30",
            price: 5500,
            rating: 4.7,
            reviews: 310,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Rishikesh Yogshala Alliance",
            capacity: 150,
            availableTickets: 54,
            tags: ["Meditation", "Wellness", "Peace", "Asanas"]
        },
        {
            id: "ev-016",
            title: "Global FinTech Disruption Expo",
            description: "Next-generation banking infrastructure, decentralized smart ledgers, tokenized global compliance tracking models.",
            category: "Technology",
            city: "Mumbai",
            state: "Maharashtra",
            venue: "Nesco Exhibition Center",
            date: "2026-09-22",
            time: "09:30",
            price: 3500,
            rating: 4.5,
            reviews: 820,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "FinTech Frontiers India",
            capacity: 5000,
            availableTickets: 1240,
            tags: ["Crypto", "Banking", "Web3", "Investments"]
        },
        {
            id: "ev-017",
            title: "Delhi Comic Con 2026",
            description: "The ultimate national pop-culture epicenter celebrating graphic novels, anime subcultures, and hyper-realistic cosplay tournaments.",
            category: "Art",
            city: "Delhi NCR",
            state: "Delhi",
            venue: "NSIC Exhibition Grounds",
            date: "2026-12-04",
            time: "11:00",
            price: 999,
            rating: 4.6,
            reviews: 1980,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Comic Con India",
            capacity: 25000,
            availableTickets: 4200,
            tags: ["Anime", "Gaming", "Cosplay", "Merch"]
        },
        {
            id: "ev-018",
            title: "ISL Football Derby Clash",
            description: "Unrivaled tactical standard football sporting rivalries live in front of roaring stadiums.",
            category: "Sports",
            city: "Kolkata",
            state: "West Bengal",
            venue: "Salt Lake Stadium Block E",
            date: "2026-10-29",
            time: "19:30",
            price: 350,
            rating: 4.8,
            reviews: 5600,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Football Sports Development Ltd",
            capacity: 65000,
            availableTickets: 12000,
            tags: ["Football", "Soccer", "Derby", "Stadium"]
        },
        {
            id: "ev-019",
            title: "Ajanta & Ellora Classical Dance Convergence",
            description: "World-class classical expressions of Kathak and Bharatanatyam backdropped by world heritage monolithic basalt rock architecture.",
            category: "Heritage",
            city: "Aurangabad",
            state: "Maharashtra",
            venue: "Ellora Caves Amphitheatre",
            date: "2026-10-15",
            time: "18:00",
            price: 1200,
            rating: 4.9,
            reviews: 290,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: false,
            organizer: "MTDC Tourism Corporation",
            capacity: 1200,
            availableTickets: 310,
            tags: ["Dance", "Classical", "Ancient", "UNESCO"]
        },
        {
            id: "ev-020",
            title: "E-Commerce Logistics & Supply Optimization Summit",
            description: "Enterprise operational deep dive into rapid sorting hubs, automated tracking analytics, and last-mile efficiency layers.",
            category: "Business",
            city: "Delhi NCR",
            state: "Delhi",
            venue: "The Taj Palace Convention Wing",
            date: "2026-09-15",
            time: "09:00",
            price: 9500,
            rating: 4.3,
            reviews: 110,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Logistics Circle India",
            capacity: 500,
            availableTickets: 89,
            tags: ["Supply Chain", "Retail", "B2B", "Automation"]
        },
        {
            id: "ev-021",
            title: "Prateek Kuhad: Silhouettes Acoustic Tour",
            description: "An intimate, soulful stripped-back live set showcasing cinematic folk-pop original compositions.",
            category: "Music",
            city: "Bengaluru",
            state: "Karnataka",
            venue: "Manpho Convention Grounds",
            date: "2026-11-08",
            time: "19:00",
            price: 1999,
            rating: 4.8,
            reviews: 2150,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Big Bad Wolf Agency",
            capacity: 8000,
            availableTickets: 420,
            tags: ["Indie", "Acoustic", "Vocalist", "Romantic"]
        },
        {
            id: "ev-022",
            title: "Anubhav Singh Bassi: 'Kisi Ko Batana Mat'",
            description: "High-octane anecdotal laughter riots documenting collegiate operational failures and courtroom disasters.",
            category: "Comedy",
            city: "Delhi NCR",
            state: "Delhi",
            venue: "Talkatora Indoor Stadium",
            date: "2026-11-19",
            time: "18:30",
            price: 1200,
            rating: 4.7,
            reviews: 3100,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Bassi Comedy Outlets",
            capacity: 4000,
            availableTickets: 29,
            tags: ["Desi Humor", "Storytelling", "Youth", "Blockbuster"]
        },
        {
            id: "ev-023",
            title: "Coastal Malvani Seafood Culinary Exposition",
            description: "Experience hyper-authentic spice extraction profiles, traditional clay pot curries, and masterclass sessions.",
            category: "Food",
            city: "Goa",
            state: "Goa",
            venue: "Fontainhas Luxury Pavilion",
            date: "2026-12-20",
            time: "13:00",
            price: 2200,
            rating: 4.6,
            reviews: 190,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Konkan Gastronomy Guild",
            capacity: 150,
            availableTickets: 60,
            tags: ["Seafood", "Konkan", "Spicy", "Tasting Menu"]
        },
        {
            id: "ev-024",
            title: "Le Ladakh Photogenic Autumn Motorbike Tour",
            description: "A legendary premium trans-Himalayan navigation crossing Khardung La passes, designed for seasoned riders.",
            category: "Adventure",
            city: "Leh",
            state: "Jammu and Kashmir",
            venue: "Leh Fort Assembly Point",
            date: "2026-09-28",
            time: "06:00",
            price: 28000,
            rating: 4.9,
            reviews: 320,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: false,
            organizer: "Royal Enfield Escapades",
            capacity: 40,
            availableTickets: 3,
            tags: ["Biking", "Bullet", "Ladakh", "Glaciers"]
        },
        {
            id: "ev-025",
            title: "Khajuraho Dance & Monolithic Architectural Conclave",
            description: "Sanskritic traditional performances rendered alongside intricate historic structural temples.",
            category: "Heritage",
            city: "Khajuraho",
            state: "Madhya Pradesh",
            venue: "Western Temple Compound Arena",
            date: "2026-11-25",
            time: "18:30",
            price: 500,
            rating: 4.8,
            reviews: 210,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "MP Tourism Department",
            capacity: 2500,
            availableTickets: 840,
            tags: ["Heritage Dance", "History", "Artifacts", "Elegance"]
        },
        {
            id: "ev-026",
            title: "National Cricket Elite League Double Header",
            description: "High velocity absolute action cricket match under glowing state-of-the-art stadium light frameworks.",
            category: "Sports",
            city: "Mumbai",
            state: "Maharashtra",
            venue: "Wankhede Stadium Pavilions",
            date: "2026-10-12",
            time: "15:30",
            price: 1800,
            rating: 4.9,
            reviews: 12400,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: true,
            organizer: "BCCI Corporate League Engine",
            capacity: 33000,
            availableTickets: 120,
            tags: ["Cricket", "T20", "Wankhede", "Live Match"]
        },
        {
            id: "ev-027",
            title: "Enterprise Cybersecurity Fortification Symposium",
            description: "Analyzing architectural data breaches, zero-trust cryptographic models, and automated threat vector isolation pipelines.",
            category: "Technology",
            city: "Hyderabad",
            state: "Telangana",
            venue: "HITEX Exhibition Centre",
            date: "2026-10-09",
            time: "09:00",
            price: 6000,
            rating: 4.6,
            reviews: 410,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Secured Systems Guild",
            capacity: 1200,
            availableTickets: 330,
            tags: ["Cyber", "Security", "DevSecOps", "Cloud"]
        },
        {
            id: "ev-028",
            title: "Traditional Block-Printing & Indigo Dye Workshop",
            description: "Hands-on structural organic pigment printing masterclass taught directly by authentic Rajasthani heritage craftsmen.",
            category: "Art",
            city: "Jaipur",
            state: "Rajasthan",
            venue: "Anokhi Craft Enclave",
            date: "2026-11-02",
            time: "11:00",
            price: 1500,
            rating: 4.7,
            reviews: 180,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Jaipur Handcrafted Syndicate",
            capacity: 30,
            availableTickets: 5,
            tags: ["Textiles", "Jaipur Art", "Handmade", "Organic"]
        },
        {
            id: "ev-029",
            title: "Global Healthcare Innovation & Biotech Summit",
            description: "Precision medical data engineering, CRISPR gene modulation infrastructure, and robotic tracking methodologies.",
            category: "Business",
            city: "Chennai",
            state: "Tamil Nadu",
            venue: "ITC Grand Chola Ballroom",
            date: "2026-09-19",
            time: "10:00",
            price: 11000,
            rating: 4.4,
            reviews: 240,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "BioMed Ventures India",
            capacity: 600,
            availableTickets: 142,
            tags: ["Biotech", "Pharma", "Medical AI", "B2B"]
        },
        {
            id: "ev-030",
            title: "Divine Classical Sitar Mastery Conclave",
            description: "Immerse your consciousness within meditative evening raagas masterfully performed across generational lineages.",
            category: "Music",
            city: "Varanasi",
            state: "Uttar Pradesh",
            venue: "Brij Rama Palace Terraces",
            date: "2026-11-21",
            time: "19:00",
            price: 2500,
            rating: 4.9,
            reviews: 370,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: false,
            organizer: "Kashi Music Sangam",
            capacity: 400,
            availableTickets: 82,
            tags: ["Sitar", "Classical Music", "Raga", "Tranquil"]
        },
        {
            id: "ev-031",
            title: "Mumbai International Film Retrospective",
            description: "Screening highly acclaimed cinematic achievements alongside interactive modern director debate panels.",
            category: "Art",
            city: "Mumbai",
            state: "Maharashtra",
            venue: "Regal Cinema Art Deco Hub",
            date: "2026-10-08",
            time: "14:00",
            price: 800,
            rating: 4.8,
            reviews: 1150,
            image: "../assets/images/placeholder-landscape.svg",
            featured: true,
            trending: false,
            organizer: "Mumbai Cinema Alliance",
            capacity: 1200,
            availableTickets: 410,
            tags: ["Cinema", "Indie Film", "Cannes", "Directors"]
        },
        {
            id: "ev-032",
            title: "Paragliding Cross-Country Flying Week",
            description: "Elite thermalling aerodynamic flights launched across the world-famous geographic ridges of Bir Billing.",
            category: "Adventure",
            city: "Bir Billing",
            state: "Himachal Pradesh",
            venue: "Billing Takeoff Ridge Sector 4",
            date: "2026-10-25",
            time: "08:00",
            price: 6500,
            rating: 5.0,
            reviews: 890,
            image: "../assets/images/placeholder-landscape.svg",
            featured: false,
            trending: true,
            organizer: "Aero Adventure Federation",
            capacity: 250,
            availableTickets: 67,
            tags: ["Aviation", "Paragliding", "Sky", "Thrill"]
        }
    ];

    // Premium Category Reference Registry
    const PLATFORM_CATEGORIES = [
        { name: "All", icon: "💎" },
        { name: "Music", icon: "🎵" },
        { name: "Comedy", icon: "🎙️" },
        { name: "Food", icon: "🍛" },
        { name: "Adventure", icon: "🧗" },
        { name: "Heritage", icon: "🏰" },
        { name: "Sports", icon: "🏆" },
        { name: "Technology", icon: "💻" },
        { name: "Business", icon: "📈" },
        { name: "Art", icon: "🎨" }
    ];

    // Popular Cities Data Framework for Bento Grid
    const POPULAR_CITIES = [
        { name: "Mumbai", count: "12+ Elite Events", img: "../assets/images/placeholder-landscape.svg", class: "span-2 row-2" },
        { name: "Goa", count: "8+ Beach Festivals", img: "../assets/images/placeholder-landscape.svg", class: "" },
        { name: "Bengaluru", count: "14+ Tech Summits", img: "../assets/images/placeholder-landscape.svg", class: "row-2" },
        { name: "Delhi NCR", count: "19+ Cultural Gatherings", img: "../assets/images/placeholder-landscape.svg", class: "span-2" },
        { name: "Varanasi", count: "6+ Heritage Rituals", img: "../assets/images/placeholder-landscape.svg", class: "" }
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

    const compileFilteredDataset = () => {
        const { searchQuery, category, location, date, budget, minRating } = AppState.filters;
        let trackingPool = [...AppState.events];

        // Global Text Matcher
        if (searchQuery.trim() !== "") {
            const queryToken = searchQuery.toLowerCase().trim();
            trackingPool = trackingPool.filter(ev => 
                ev.title.toLowerCase().includes(queryToken) ||
                ev.city.toLowerCase().includes(queryToken) ||
                ev.venue.toLowerCase().includes(queryToken) ||
                ev.category.toLowerCase().includes(queryToken) ||
                ev.organizer.toLowerCase().includes(queryToken) ||
                ev.tags.some(tag => tag.toLowerCase().includes(queryToken))
            );
        }

        // Dropdown Metric Rules
        if (category !== "All") {
            trackingPool = trackingPool.filter(ev => ev.category.toLowerCase() === category.toLowerCase());
        }
        if (location !== "Anywhere") {
            trackingPool = trackingPool.filter(ev => ev.city.toLowerCase() === location.toLowerCase());
        }
        if (date !== "") {
            trackingPool = trackingPool.filter(ev => ev.date === date);
        }

        trackingPool = trackingPool.filter(ev => evaluateBudgetMatch(budget, ev.price));
        trackingPool = trackingPool.filter(ev => evaluateRatingMatch(minRating, ev.rating));

        applySortingPipeline(trackingPool);
    };

    const applySortingPipeline = (dataset) => {
        switch (AppState.sortOption) {
            case "newest": dataset.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
            case "oldest": dataset.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
            case "price-low": dataset.sort((a, b) => a.price - b.price); break;
            case "price-high": dataset.sort((a, b) => b.price - a.price); break;
            case "highest-rated": dataset.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews); break;
            case "most-popular": dataset.sort((a, b) => b.reviews - a.reviews); break;
            default: dataset.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        AppState.filteredEvents = dataset;
        AppState.pagination.currentPage = 1; 
        executeDomRenderPass();
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
        const ticketStatusHtml = eventData.availableTickets === 0 
            ? `<button class="card-cta-btn" disabled style="background:#4a4242; opacity:0.6; cursor:not-allowed;">Sold Out</button>`
            : `<button class="card-cta-btn action-book" data-id="${eventData.id}">Book Now</button>`;

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
                <div class="card-billing-row">
                    <div class="price-stack">
                        <span class="lbl">Tickets From</span>
                        <span class="val">${formatToIndianCurrency(eventData.price)}</span>
                    </div>
                    ${ticketStatusHtml}
                </div>
            </div>
        `;
        return card;
    };

    const renderFeaturedSection = () => {
        if (!DOM.featuredGrid) return;
        const fragment = document.createDocumentFragment();
        const pool = AppState.events.filter(ev => ev.featured).slice(0, 4);

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

    const togglePlatformWishlistState = (eventId, interfaceNode) => {
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

        localStorage.setItem("eventra_bharat_favs", JSON.stringify([...AppState.favorites]));
        
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
    };

    const processPremiumTicketBooking = (eventId) => {
        const match = AppState.events.find(ev => ev.id === eventId);
        if (!match) return;
        alert(`Initiating Premium Gateways for:\n\n📍 ${match.title}\n🎭 Venue: ${match.venue}, ${match.city}\n🎟️ Base Price: ${formatToIndianCurrency(match.price)}\n\nRedirecting to secure Airbnb-integrated transaction token...`);
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

        DOM.newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const absoluteInputStr = DOM.newsletterEmail?.value.trim() || "";
            const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (absoluteInputStr === "" || !validEmailRegex.test(absoluteInputStr)) {
                alert("Please enter a valid electronic destination address format.");
                DOM.newsletterEmail?.focus();
                return;
            }

            alert(`🎉 Divine Connections Configured! Welcome to Eventra Bharat.\n\nPremium itineraries are now routed to: ${absoluteInputStr}`);
            DOM.newsletterForm.reset();
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
    const bootstrapPlatformApplicationEngine = () => {
        AppState.events = [...MASTER_EVENT_DATA];

        try {
            const cachedFavs = localStorage.getItem("eventra_bharat_favs");
            if (cachedFavs) AppState.favorites = new Set(JSON.parse(cachedFavs));
        } catch (e) {
            console.error("Local client sandbox prevented loading state cache.", e);
        }

        renderCategoryPills();
        renderFeaturedSection();
        renderPopularCitiesGrid();
        compileFilteredDataset();

        if (DOM.searchInput) DOM.searchInput.addEventListener("input", processLiveSearchInput);
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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrapPlatformApplicationEngine);
    } else {
        bootstrapPlatformApplicationEngine();
    }
})();
