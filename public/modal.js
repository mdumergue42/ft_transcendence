"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const defaultImagePath = './oui.png';
    const userImagePath = './oui.jpg';
    let isUserLoggedIn = false;
    let isRegisterMode = false;
    // Elements UI
    const interactiveElements = document.querySelectorAll('.sidebar a, #play-button');
    const modalOverlay = document.getElementById('login-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const profilePicture = document.getElementById('profile-picture');
    const authForm = document.getElementById('auth-form');
    const modalTitle = document.getElementById('modal-title');
    const usernameInput = document.getElementById('username');
    const loginPasswordInput = document.getElementById('login-password');
    const registerPasswordInput = document.getElementById('register-password');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const errorMessage = document.getElementById('error-message');
    const playButton = document.getElementById('play-button');
    // Ouvrir/fermer modal
    function openModal() {
        modalOverlay?.classList.remove('hidden');
    }
    function closeModal() {
        modalOverlay?.classList.add('hidden');
    }
    // Met à jour l’UI du form (Login vs Register)
    function updateFormUI() {
        if (!modalTitle || !loginPasswordInput || !registerPasswordInput
            || !confirmPasswordGroup || !usernameInput || !errorMessage
            || !showRegisterLink || !showLoginLink)
            return;
        modalTitle.textContent = isRegisterMode ? 'Register' : 'Login';
        registerPasswordInput
            .closest('div')
            .classList.toggle('hidden', !isRegisterMode);
        confirmPasswordGroup
            .classList.toggle('hidden', !isRegisterMode);
        showRegisterLink.classList.toggle('hidden', isRegisterMode);
        showLoginLink.classList.toggle('hidden', !isRegisterMode);
        // Réinitialise le message d’erreur
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }
    // Soumission du form
    authForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!usernameInput || !loginPasswordInput || !registerPasswordInput
            || !confirmPasswordInput || !errorMessage)
            return;
        const username = usernameInput.value;
        const password = isRegisterMode
            ? registerPasswordInput.value
            : loginPasswordInput.value;
        // Check matching passwords en mode Register
        if (isRegisterMode && password !== confirmPasswordInput.value) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.classList.remove('hidden');
            return;
        }
        try {
            const route = isRegisterMode ? '/api/register' : '/api/login';
            const res = await fetch(route, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                // data.message peut être undefined
                const msg = data.message ?? 'Operation failed.';
                errorMessage.textContent = msg;
                errorMessage.classList.remove('hidden');
                return;
            }
            // Succès → on ferme modal et actualise avatar
            isUserLoggedIn = true;
            closeModal();
            updateProfilePicture();
        }
        catch (err) {
            // err peut être n’importe quoi → on extrait message si Error
            const msg = (err instanceof Error ? err.message : null)
                ?? 'Could not connect to the server.';
            errorMessage.textContent = msg;
            errorMessage.classList.remove('hidden');
        }
    });
    // Gestion des clics pour ouvrir/fermer modal
    interactiveElements.forEach(el => el.addEventListener('click', openModal));
    closeModalButton?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay)
            closeModal();
    });
    showRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = true;
        updateFormUI();
    });
    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = false;
        updateFormUI();
    });
    // Met à jour l’avatar selon l’état de connexion
    function updateProfilePicture() {
        if (!profilePicture)
            return;
        profilePicture.src = isUserLoggedIn
            ? userImagePath
            : defaultImagePath;
    }
    // Initialisation UI
    updateFormUI();
    updateProfilePicture();
});
