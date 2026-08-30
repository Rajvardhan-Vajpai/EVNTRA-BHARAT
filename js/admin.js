const API_URL = CONFIG.API.EVENTS;

const DOM = {
    tableBody: document.getElementById('eventsTableBody'),
    filterCategory: document.getElementById('filterCategory'),
    searchInput: document.getElementById('adminSearchInput'),
    
    // Modal
    modal: document.getElementById('eventModal'),
    modalTitle: document.getElementById('modalTitle'),
    closeBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelModalBtn'),
    form: document.getElementById('eventForm'),
    
    // Form Fields
    id: document.getElementById('eventId'),
    title: document.getElementById('eventTitle'),
    category: document.getElementById('eventCategory'),
    city: document.getElementById('eventCity'),
    location: document.getElementById('eventLocation'),
    date: document.getElementById('eventDate'),
    time: document.getElementById('eventTime'),
    price: document.getElementById('eventPrice'),
    tickets: document.getElementById('eventTickets'),
    image: document.getElementById('eventImage'),
    description: document.getElementById('eventDescription'),
    isTrending: document.getElementById('eventIsTrending'),
    isFeatured: document.getElementById('eventIsFeatured'),
    
    // Action Buttons
    addBtn: document.getElementById('addNewEventBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    adminNameDisplay: document.getElementById('adminNameDisplay')
};

let eventsData = [];
const token = localStorage.getItem('eventra_token');

// ==========================================
// Initialization
// ==========================================
async function init() {
    await verifyAdmin();
    await fetchEvents();
    setupEventListeners();
}

async function verifyAdmin() {
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
    try {
        const res = await fetch(`${CONFIG.API.AUTH}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Unauthorized');
        const user = await res.json();
        if (user.role !== 'admin') throw new Error('Forbidden');
        
        DOM.adminNameDisplay.textContent = user.name;
    } catch (err) {
        localStorage.removeItem('eventra_token');
        localStorage.removeItem('eventra_user');
        window.location.href = 'auth.html';
    }
}

// ==========================================
// API Calls
// ==========================================
async function fetchEvents() {
    try {
        const res = await fetch(API_URL);
        eventsData = await res.json();
        renderTable(eventsData);
    } catch (err) {
        console.error('Error fetching events:', err);
        alert('Could not load events from server.');
    }
}

async function saveEvent(eventPayload) {
    const isUpdate = !!eventPayload.id;
    const url = isUpdate ? `${API_URL}/${eventPayload.id}` : API_URL;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(eventPayload)
        });

        if (!res.ok) throw new Error('Failed to save event');
        
        closeModal();
        await fetchEvents();
        
        // Show success effect
        alert(`Event successfully ${isUpdate ? 'updated' : 'added'}!`);
    } catch (err) {
        console.error('Error saving event:', err);
        alert('Failed to save event. Check console for details.');
    }
}

async function deleteEvent(id) {
    if (!confirm('Are you sure you want to permanently delete this event?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Failed to delete event');
        
        await fetchEvents();
    } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event.');
    }
}

// ==========================================
// DOM Rendering
// ==========================================
function renderTable(data) {
    DOM.tableBody.innerHTML = '';

    if (data.length === 0) {
        DOM.tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem;">No events found</td></tr>`;
        return;
    }

    data.forEach(ev => {
        const tr = document.createElement('tr');
        
        // Format Date
        const dateObj = new Date(ev.date);
        const formattedDate = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : ev.date;
        
        // Status determination
        const isSoldOut = ev.tickets_available <= 0;
        const statusHtml = isSoldOut 
            ? `<span class="status-badge status-soldout">Sold Out</span>` 
            : `<span class="status-badge status-active">Active</span>`;

        tr.innerHTML = `
            <td>#${ev.id}</td>
            <td>
                <div class="event-cell">
                    <img src="${ev.image || 'https://via.placeholder.com/48'}" alt="${ev.title}" onerror="this.src='https://via.placeholder.com/48'">
                    <div class="event-cell-info">
                        <span class="event-cell-title">${ev.title}</span>
                        <span class="event-cell-cat">${ev.category} ${ev.is_featured ? '<i class="fa-solid fa-star" style="color:var(--warning);font-size:0.7rem;"></i>' : ''}</span>
                    </div>
                </div>
            </td>
            <td>${ev.city || '-'}</td>
            <td>${formattedDate}</td>
            <td>₹${ev.price}</td>
            <td>${ev.tickets_available}</td>
            <td>${statusHtml}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit" onclick="openEditModal(${ev.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-delete" onclick="deleteEvent(${ev.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        DOM.tableBody.appendChild(tr);
    });
}

// ==========================================
// Filtering & Searching
// ==========================================
function applyFilters() {
    const searchTerm = DOM.searchInput.value.toLowerCase().trim();
    const category = DOM.filterCategory.value;
    
    let filtered = eventsData;
    
    if (category !== 'All') {
        filtered = filtered.filter(ev => ev.category === category);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(ev => 
            ev.title.toLowerCase().includes(searchTerm) || 
            (ev.city && ev.city.toLowerCase().includes(searchTerm)) ||
            (ev.location && ev.location.toLowerCase().includes(searchTerm))
        );
    }
    
    renderTable(filtered);
}

// ==========================================
// Modal Logic
// ==========================================
function openAddModal() {
    DOM.form.reset();
    DOM.id.value = '';
    DOM.modalTitle.textContent = 'Add New Event';
    DOM.modal.style.display = 'flex';
}

function openEditModal(id) {
    const ev = eventsData.find(e => e.id === id);
    if (!ev) return;
    
    DOM.form.reset();
    DOM.modalTitle.textContent = 'Edit Event';
    
    // Populate fields
    DOM.id.value = ev.id;
    DOM.title.value = ev.title;
    DOM.category.value = ev.category;
    DOM.city.value = ev.city || '';
    DOM.location.value = ev.location || '';
    
    // Format date for input type="date"
    if (ev.date && ev.date.includes('T')) {
        DOM.date.value = ev.date.split('T')[0];
    } else {
        DOM.date.value = ev.date;
    }
    
    DOM.time.value = ev.time || '';
    DOM.price.value = ev.price;
    DOM.tickets.value = ev.tickets_available;
    DOM.image.value = ev.image || '';
    DOM.description.value = ev.description || '';
    DOM.isTrending.checked = !!ev.is_trending;
    DOM.isFeatured.checked = !!ev.is_featured;
    
    DOM.modal.style.display = 'flex';
}

function closeModal() {
    DOM.modal.style.display = 'none';
}

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    DOM.addBtn.addEventListener('click', openAddModal);
    DOM.closeBtn.addEventListener('click', closeModal);
    DOM.cancelBtn.addEventListener('click', closeModal);
    
    if (DOM.logoutBtn) {
        DOM.logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('eventra_token');
            localStorage.removeItem('eventra_user');
            window.location.href = 'auth.html';
        });
    }
    
    // Close modal when clicking outside
    DOM.modal.addEventListener('click', (e) => {
        if (e.target === DOM.modal) closeModal();
    });
    
    DOM.searchInput.addEventListener('input', applyFilters);
    DOM.filterCategory.addEventListener('change', applyFilters);
    
    DOM.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const payload = {
            title: DOM.title.value,
            category: DOM.category.value,
            city: DOM.city.value,
            location: DOM.location.value,
            date: DOM.date.value,
            time: DOM.time.value,
            price: parseFloat(DOM.price.value) || 0,
            tickets_available: parseInt(DOM.tickets.value, 10) || 0,
            image: DOM.image.value,
            description: DOM.description.value,
            is_trending: DOM.isTrending.checked,
            is_featured: DOM.isFeatured.checked,
            // Defaults to preserve schema
            organizer: "Eventra Bharat",
            rating: 5.0,
            reviews: 0,
            venue: DOM.location.value
        };
        
        const id = DOM.id.value;
        if (id) {
            payload.id = parseInt(id, 10);
        }
        
        saveEvent(payload);
    });
}

// Make globally available for onclick attributes
window.openEditModal = openEditModal;
window.deleteEvent = deleteEvent;

// Boot
document.addEventListener('DOMContentLoaded', init);
