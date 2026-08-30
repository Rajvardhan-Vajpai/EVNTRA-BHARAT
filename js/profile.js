document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch User Data
    try {
        const resUser = await fetch(`${CONFIG.API.AUTH}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!resUser.ok) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const user = await resUser.json();
        
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        document.getElementById('profileImage').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6D0F13&color=fff&size=128`;
    } catch (e) {
        console.error("Failed to load user profile:", e);
    }

    // Fetch Wishlist Data
    try {
        const resWish = await fetch(CONFIG.API.WISHLIST, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resWish.ok) {
            const wishlist = await resWish.json();
            renderWishlist(wishlist);
        }
    } catch (e) {
        console.error("Failed to load wishlist:", e);
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'home.html';
    });
});

function renderWishlist(events) {
    const grid = document.getElementById('wishlistGrid');
    
    if (events.length === 0) {
        grid.innerHTML = `<p style="color: #666; font-style: italic;">You haven't added any events to your wishlist yet.</p>`;
        return;
    }

    let html = '';
    events.forEach(ev => {
        html += `
            <div class="profile-event-card" id="wishlist-item-${ev.id}">
                <img src="${ev.image}" alt="${ev.title}">
                <div class="profile-event-card-content">
                    <h3>${ev.title}</h3>
                    <p><i class="fa-solid fa-location-dot"></i> ${ev.venue}, ${ev.city}</p>
                    <p><i class="fa-regular fa-calendar"></i> ${new Date(ev.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</p>
                    <button class="remove-wishlist-btn" onclick="removeWishlist('${ev.id}')">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

async function removeWishlist(eventId) {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${CONFIG.API.WISHLIST}/${eventId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const card = document.getElementById(`wishlist-item-${eventId}`);
            if (card) {
                card.remove();
            }
            // Check if empty
            const grid = document.getElementById('wishlistGrid');
            if (grid.children.length === 0) {
                grid.innerHTML = `<p style="color: #666; font-style: italic;">You haven't added any events to your wishlist yet.</p>`;
            }
        }
    } catch (e) {
        console.error("Failed to remove from wishlist:", e);
    }
}
