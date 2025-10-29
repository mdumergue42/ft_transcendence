document.addEventListener('DOMContentLoaded', () => {
  const defaultImagePath = './oui.png';
  const userImagePath    = './oui.jpg';

  let isUserLoggedIn = false;
  let isRegisterMode = false;

  const interactiveElements = document.querySelectorAll('.sidebar a, #play-button');
  const modalOverlay        = document.getElementById('login-modal');
  const closeModalButton    = document.getElementById('close-modal-button');
  const profilePicture      = document.getElementById('profile-picture') as HTMLImageElement | null;

  const authForm             = document.getElementById('auth-form') as HTMLFormElement | null;
  const modalTitle           = document.getElementById('modal-title') as HTMLElement | null;
  const usernameInput        = document.getElementById('username') as HTMLInputElement | null;
  const loginPasswordInput   = document.getElementById('login-password') as HTMLInputElement | null;
  const registerPasswordInput= document.getElementById('register-password') as HTMLInputElement | null;
  const confirmPasswordGroup = document.getElementById('confirm-password-group') as HTMLElement | null;
  const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement | null;
  const showRegisterLink     = document.getElementById('show-register') as HTMLElement | null;
  const showLoginLink        = document.getElementById('show-login') as HTMLElement | null;
  const errorMessage         = document.getElementById('error-message') as HTMLElement | null;
  const playButton           = document.getElementById('play-button') as HTMLElement | null;

  function openModal() {
    modalOverlay?.classList.remove('hidden');
  }
  function closeModal() {
    modalOverlay?.classList.add('hidden');
  }

  function updateFormUI() {
    if (!modalTitle || !loginPasswordInput || !registerPasswordInput
        || !confirmPasswordGroup || !usernameInput || !errorMessage
        || !showRegisterLink || !showLoginLink) return;

    modalTitle.textContent = isRegisterMode ? 'Register' : 'Login';
    registerPasswordInput
      .closest('div')!
      .classList.toggle('hidden', !isRegisterMode);
    confirmPasswordGroup
      .classList.toggle('hidden', !isRegisterMode);

    showRegisterLink .classList.toggle('hidden', isRegisterMode);
    showLoginLink    .classList.toggle('hidden', !isRegisterMode);

    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }

  authForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!usernameInput || !loginPasswordInput || !registerPasswordInput
        || !confirmPasswordInput || !errorMessage) return;

    const username = usernameInput.value;
    const password = isRegisterMode
      ? registerPasswordInput.value
      : loginPasswordInput.value;

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
        const msg = data.message ?? 'Operation failed.';
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
        return;
      }

      isUserLoggedIn = true;
      closeModal();
      updateProfilePicture();
    } catch (err) {
      const msg = (err instanceof Error ? err.message : null)
                  ?? 'Could not connect to the server.';
      errorMessage.textContent = msg;
      errorMessage.classList.remove('hidden');
    }
  });

  interactiveElements.forEach(el => el.addEventListener('click', openModal));
  closeModalButton   ?.addEventListener('click', closeModal);
  modalOverlay       ?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  showRegisterLink   ?.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = true;
    updateFormUI();
  });
  showLoginLink      ?.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = false;
    updateFormUI();
  });

  function updateProfilePicture() {
    if (!profilePicture) return;
    profilePicture.src = isUserLoggedIn
      ? userImagePath
      : defaultImagePath;
  }

  updateFormUI();
  updateProfilePicture();
});
