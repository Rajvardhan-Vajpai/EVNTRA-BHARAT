/* =================================
   EVENTRA BHARAT AUTH JS
================================= */

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {

    const currentUser = localStorage.getItem("eventraUser");

    // Prevent logged-in users from seeing login page
    if (
        currentUser &&
        window.location.pathname.includes("login.html")
    ) {
        window.location.href = "profile.html";
    }

    initializeLogin();
});

/* =================================
   LOGIN
================================= */

function initializeLogin() {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validation
        if (!validateEmail(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage(
                "Password must be at least 6 characters.",
                "error"
            );
            return;
        }

        // Demo user (Frontend only)
        const user = {
            id: Date.now(),
            name: email.split("@")[0],
            email: email,
            role: "user",
            loginTime: new Date().toISOString()
        };

        // Save Session
        localStorage.setItem(
            "eventraUser",
            JSON.stringify(user)
        );

        showMessage(
            "Login successful! Redirecting...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1200);
    });
}

/* =================================
   LOGOUT
================================= */

function logout() {

    localStorage.removeItem("eventraUser");

    window.location.href = "login.html";
}

/* =================================
   GET CURRENT USER
================================= */

function getCurrentUser() {

    const user = localStorage.getItem("eventraUser");

    return user ? JSON.parse(user) : null;
}

/* =================================
   PROFILE LOADER
================================= */

function loadProfile() {

    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const nameElement =
        document.getElementById("profileName");

    const emailElement =
        document.getElementById("profileEmail");

    const roleElement =
        document.getElementById("profileRole");

    const imageElement =
        document.getElementById("profileImage");

    if (nameElement)
        nameElement.textContent = user.name;

    if (emailElement)
        emailElement.textContent = user.email;

    if (roleElement)
        roleElement.textContent =
            user.role.charAt(0).toUpperCase() +
            user.role.slice(1);

    if (imageElement && user.picture) {
        imageElement.src = user.picture;
    }
}
/* =================================
   EMAIL VALIDATION
================================= */

function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

/* =================================
   MESSAGE SYSTEM
================================= */

function showMessage(message, type = "success") {

    const oldMessage =
        document.querySelector(".auth-alert");

    if (oldMessage) {
        oldMessage.remove();
    }

    const alertBox =
        document.createElement("div");

    alertBox.classList.add(
        "auth-alert",
        type
    );

    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add("show");
    }, 50);

    setTimeout(() => {

        alertBox.classList.remove("show");

        setTimeout(() => {
            alertBox.remove();
        }, 300);

    }, 3000);
}

/* =================================
   OPTIONAL ORGANIZER LOGIN
================================= */

// Later when organizer accounts exist

function redirectByRole(user) {

    if (user.role === "organizer") {

        window.location.href =
            "organizer-dashboard.html";

    } else {

        window.location.href =
            "profile.html";
    }
};
/* =================================
   GOOGLE LOGIN
================================= */

window.handleCredentialResponse = function (response) {

    try {

        const payload = JSON.parse(
            atob(response.credential.split('.')[1])
        );

        const user = {
            id: Date.now(),
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            role: "user",
            loginMethod: "google",
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(
            "eventraUser",
            JSON.stringify(user)
        );

        showMessage(
            "Google Login Successful!",
            "success"
        );

        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);

    } catch (error) {

        console.error(
            "Google Login Error:",
            error
        );

        alert(
            "Google Login Failed. Check console."
        );
    }
};