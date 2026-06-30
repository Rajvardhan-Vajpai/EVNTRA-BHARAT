/* ==========================================
   EVENTRA BHARAT
   DISCOVER PAGE
========================================== */

"use strict";

/* ==========================================
   DOM ELEMENTS
========================================== */

const DOM = {

    searchInput: document.getElementById("searchInput"),

    locationSelect: document.getElementById("locationSelect"),

    dateInput: document.getElementById("dateInput"),

    categorySelect: document.getElementById("categorySelect"),

    exploreBtn: document.getElementById("exploreBtn"),

    trendingGrid: document.getElementById("trendingGrid"),

    categoryGrid: document.getElementById("categoryGrid"),

    stateGrid: document.getElementById("stateGrid"),

    experienceGrid: document.getElementById("experienceGrid"),

    festivalGrid: document.getElementById("festivalGrid"),

    hiddenGrid: document.getElementById("hiddenGrid"),

    offerGrid: document.getElementById("offerGrid"),

    newsletterForm: document.getElementById("newsletterForm"),

    newsletterEmail: document.getElementById("newsletterEmail")

};
/* ==========================================
   APPLICATION STATE
========================================== */

const AppState = {

    currentCategory: "All",

    currentLocation: "Anywhere",

    currentDate: "",

    searchText: ""

};
/* ==========================================
   CATEGORY DATABASE
========================================== */

const Categories = [

    {
        id: 1,
        name: "Concerts",
        icon: "🎵",
        description: "Live music experiences"
    },

    {
        id: 2,
        name: "Festivals",
        icon: "🎉",
        description: "Celebrate India's culture"
    },

    {
        id: 3,
        name: "Melas",
        icon: "🎪",
        description: "Traditional fairs"
    },

    {
        id: 4,
        name: "Heritage",
        icon: "🏰",
        description: "Historic places"
    },

    {
        id: 5,
        name: "Spiritual",
        icon: "🛕",
        description: "Pilgrimage journeys"
    },

    {
        id: 6,
        name: "Food",
        icon: "🍴",
        description: "Taste India"
    },

    {
        id: 7,
        name: "Adventure",
        icon: "🏔️",
        description: "Outdoor thrills"
    },

    {
        id: 8,
        name: "Workshops",
        icon: "🎨",
        description: "Learn new skills"
    }

];

const States = [

    {
        id:1,
        name:"Rajasthan",
        events:284,
        emoji:"🏰"
    },

    {
        id:2,
        name:"Goa",
        events:162,
        emoji:"🏖️"
    },

    {
        id:3,
        name:"Kerala",
        events:191,
        emoji:"🌴"
    },

    {
        id:4,
        name:"Himachal Pradesh",
        events:95,
        emoji:"🏔️"
    },

    {
        id:5,
        name:"Maharashtra",
        events:342,
        emoji:"🎭"
    },

    {
        id:6,
        name:"Tamil Nadu",
        events:214,
        emoji:"🛕"
    }

];

/* ==========================================
   RENDER CATEGORY CARDS
========================================== */

function renderCategories() {

    // Stop if container doesn't exist
    if (!DOM.categoryGrid) return;

    // Empty the container
    DOM.categoryGrid.innerHTML = "";

    // Loop through every category
    Categories.forEach(category => {

        const card = document.createElement("div");

        card.className = "category-card";

       card.innerHTML = `

    <div class="category-icon">

        ${category.icon}

    </div>

    <h3>

        ${category.name}

    </h3>

    <p>

        ${category.description}

    </p>

    <span class="category-count">

        Coming Soon

    </span>

`;

        DOM.categoryGrid.appendChild(card);

    });

}
function renderStates() {

    const stateGrid = document.getElementById("stateGrid");

    if (!stateGrid) return;

    stateGrid.innerHTML = "";

    States.forEach(state => {

        const card = document.createElement("div");

        card.className = "state-card";

        card.innerHTML = `

            <div class="state-icon">
                ${state.emoji}
            </div>

            <h3>${state.name}</h3>

            <p>${state.events} Events</p>

        `;

        stateGrid.appendChild(card);

    });

}
/* ==========================================
   INITIALIZE APPLICATION
========================================== */

function initializeApp() {

    renderCategories();
     renderStates();

}

document.addEventListener("DOMContentLoaded", initializeApp);