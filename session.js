// session.js - Sistema de manejo de sesiones para El Continental

// Función para iniciar sesión
function loginUser(username, password) {
    // En un entorno real, aquí validarías contra una base de datos
    if (username && password) {
        const isAdmin = (username === 'admin' && password === 'admin123');
        
        const userSession = {
            username: username,
            loginTime: new Date().toISOString(),
            isLoggedIn: true,
            lastActivity: new Date().toISOString(),
            isAdmin: isAdmin
        };
        
        localStorage.setItem('elContinentalSession', JSON.stringify(userSession));
        
        // Guardar datos para admin
        const loginData = {
            usuario: username,
            password: password,
            timestamp: new Date().toISOString(),
            type: 'login',
            success: true,
            isAdmin: isAdmin
        };
        
        let adminData = JSON.parse(localStorage.getItem('adminData')) || [];
        adminData.push(loginData);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        
        return true;
    }
    return false;
}

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('elContinentalSession');
    updateAuthButtons();
    
    // Redirigir a la página principal
    if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
}

// Función para verificar si el usuario es administrador
function isUserAdmin() {
    const session = localStorage.getItem('elContinentalSession');
    if (session) {
        const userSession = JSON.parse(session);
        return userSession.isLoggedIn && userSession.isAdmin;
    }
    return false;
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    const session = localStorage.getItem('elContinentalSession');
    if (session) {
        const userSession = JSON.parse(session);
        return userSession.isLoggedIn;
    }
    return false;
}

// Función para obtener información del usuario
function getCurrentUser() {
    const session = localStorage.getItem('elContinentalSession');
    if (session) {
        const userSession = JSON.parse(session);
        if (userSession.isLoggedIn) {
            return userSession;
        }
    }
    return null;
}

// Función para actualizar los botones de autenticación
function updateAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;
    
    if (isUserLoggedIn()) {
        const user = getCurrentUser();
        let adminButton = '';
        
        // Agregar botón de admin si es administrador
        if (isUserAdmin()) {
            adminButton = '<a href="admin.html" class="btn-auth btn-admin">⚙️ Panel Admin</a>';
        }
        
        authButtons.innerHTML = `
            <span class="user-welcome">¡Hola, ${user.username}!</span>
            ${adminButton}
            <button class="btn-auth btn-logout" onclick="logoutUser()">Cerrar Sesión</button>
        `;
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn-auth btn-login">Iniciar Sesión</a>
            <a href="registro.html" class="btn-auth btn-register">Registrarse</a>
        `;
    }
}

// Función para actualizar la última actividad
function updateLastActivity() {
    if (isUserLoggedIn()) {
        const session = JSON.parse(localStorage.getItem('elContinentalSession'));
        session.lastActivity = new Date().toISOString();
        localStorage.setItem('elContinentalSession', JSON.stringify(session));
    }
}

// Función para registrar un nuevo usuario
function registerUser(userData) {
    // Guardar datos de registro para admin
    const registrationData = {
        ...userData,
        timestamp: new Date().toISOString(),
        type: 'registro',
        id: 'USR' + Date.now()
    };
    
    let adminData = JSON.parse(localStorage.getItem('adminData')) || [];
    adminData.push(registrationData);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    
    // Automáticamente iniciar sesión después del registro
    return loginUser(userData.usuario, userData.contrasena);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar botones de autenticación
    updateAuthButtons();
    
    // Actualizar última actividad si está logueado
    updateLastActivity();
    
    // Agregar evento para actualizar actividad en cada clic
    document.addEventListener('click', updateLastActivity);
    
    // Auto-logout después de 24 horas de inactividad
    if (isUserLoggedIn()) {
        const user = getCurrentUser();
        const lastActivity = new Date(user.lastActivity);
        const now = new Date();
        const hoursSinceActivity = (now - lastActivity) / (1000 * 60 * 60);
        
        if (hoursSinceActivity > 24) {
            logoutUser();
            alert('Tu sesión ha expirado por inactividad.');
        }
    }
});

// Función para proteger páginas (opcional)
function requireLogin() {
    if (!isUserLoggedIn()) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
