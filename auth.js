// ================================================
// PROFESSOR AUTHENTICATION SYSTEM
// ================================================
// Credentials are stored here. In a real deployment, this would be
// handled server-side. For a purely static site, this is the
// standard approach — keep this file access-controlled on your server.

(function () {
    'use strict';

    // ===========================
    // PROFESSOR CREDENTIALS
    // Add/remove professors here. Passwords are stored as plaintext
    // for a static site — consider bcrypt hashing if moving to a backend.
    // ===========================
    const PROFESSORS = [
        { username: 'admin',        password: 'RPI_Admin_2026!',    displayName: 'Administrator' },
    ];

    // Session duration in minutes
    const SESSION_DURATION = 120;

    // ===========================
    // AUTH STATE
    // ===========================
    let currentProfessor = null;

    function getSession() {
        try {
            const raw = localStorage.getItem('prof_session');
            if (!raw) return null;
            const session = JSON.parse(raw);
            if (Date.now() > session.expires) {
                localStorage.removeItem('prof_session');
                return null;
            }
            return session;
        } catch { return null; }
    }

    function setSession(professor) {
        const session = {
            username: professor.username,
            displayName: professor.displayName,
            expires: Date.now() + SESSION_DURATION * 60 * 1000
        };
        localStorage.setItem('prof_session', JSON.stringify(session));
        currentProfessor = session;
    }

    function clearSession() {
        localStorage.removeItem('prof_session');
        currentProfessor = null;
    }

    function login(username, password) {
        const prof = PROFESSORS.find(
            p => p.username === username.trim() && p.password === password
        );
        if (prof) {
            setSession(prof);
            return { success: true, displayName: prof.displayName };
        }
        return { success: false };
    }

    // ===========================
    // PUBLIC API
    // ===========================
    window.Auth = {
        isLoggedIn: () => !!getSession(),
        getUser: () => getSession(),
        login,
        logout: () => { clearSession(); },
        init: () => {
            const s = getSession();
            if (s) currentProfessor = s;
        }
    };

})();
