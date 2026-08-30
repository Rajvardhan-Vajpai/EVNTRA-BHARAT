const API_URL = CONFIG.API.AUTH;

const DOM = {
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    showRegister: document.getElementById('showRegister'),
    showLogin: document.getElementById('showLogin'),
    subtitle: document.getElementById('authSubtitle'),
    alertBox: document.getElementById('alertBox'),
    
    // Login
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    loginBtn: document.getElementById('loginBtn'),
    
    // Register
    registerName: document.getElementById('registerName'),
    registerEmail: document.getElementById('registerEmail'),
    registerPassword: document.getElementById('registerPassword'),
    registerBtn: document.getElementById('registerBtn'),
};

// ==========================================
// Setup Event Listeners
// ==========================================
DOM.showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    DOM.loginForm.style.display = 'none';
    DOM.registerForm.style.display = 'flex';
    DOM.subtitle.textContent = 'Create a new account';
    hideAlert();
});

DOM.showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    DOM.registerForm.style.display = 'none';
    DOM.loginForm.style.display = 'flex';
    DOM.subtitle.textContent = 'Log in to your account';
    hideAlert();
});

DOM.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(DOM.loginBtn, true);
    
    const payload = {
        email: DOM.loginEmail.value,
        password: DOM.loginPassword.value
    };
    
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            showAlert(data.error || 'Login failed', 'error');
        } else {
            handleAuthSuccess(data);
        }
    } catch (err) {
        showAlert('Network error. Please try again.', 'error');
    } finally {
        setLoading(DOM.loginBtn, false);
    }
});

DOM.registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(DOM.registerBtn, true);
    
    const payload = {
        name: DOM.registerName.value,
        email: DOM.registerEmail.value,
        password: DOM.registerPassword.value
    };
    
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            showAlert(data.error || 'Registration failed', 'error');
        } else {
            handleAuthSuccess(data);
        }
    } catch (err) {
        showAlert('Network error. Please try again.', 'error');
    } finally {
        setLoading(DOM.registerBtn, false);
    }
});

// ==========================================
// Helpers
// ==========================================
function handleAuthSuccess(userData) {
    // Save token and user info to localStorage
    localStorage.setItem('eventra_token', userData.token);
    localStorage.setItem('eventra_user', JSON.stringify({
        id: userData.id,
        name: userData.name,
        role: userData.role
    }));
    
    showAlert('Success! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        if (userData.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'home.html';
        }
    }, 1000);
}

function showAlert(message, type) {
    DOM.alertBox.textContent = message;
    DOM.alertBox.className = `auth-alert alert-${type}`;
    DOM.alertBox.style.display = 'block';
}

function hideAlert() {
    DOM.alertBox.style.display = 'none';
}

function setLoading(btn, isLoading) {
    if (isLoading) {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Please wait...';
        btn.disabled = true;
    } else {
        btn.textContent = btn.dataset.originalText;
        btn.disabled = false;
    }
}

// Redirect if already logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('eventra_token');
    const user = JSON.parse(localStorage.getItem('eventra_user'));
    
    if (token && user) {
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'home.html';
        }
    }
});
