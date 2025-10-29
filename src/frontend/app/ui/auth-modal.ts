export class AuthModal extends HTMLElement {
    private isOpen = false;
    private currentTab: 'login' | 'register' = 'login';

    constructor() {
        super();
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div id="auth-modal" class="modal-overlay fixed inset-0 bg-black/80 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm">
                <div class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-cyan-400 rounded-2xl p-8 max-w-md w-full mx-4 transform scale-95 transition-transform duration-300 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-cyan-400 font-mono tracking-wider">
                            <span id="modal-title">CONNEXION</span>
                        </h2>
                        <button id="close-modal" class="text-cyan-400 hover:text-red-500 transition-colors duration-300 text-2xl font-bold">
                            ✕
                        </button>
                    </div>
                    <div class="flex mb-6 bg-black/30 rounded-xl p-1 border border-cyan-400/20">
                        <button id="login-tab" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-400 bg-cyan-400/20 border border-cyan-400/50">
                            CONNEXION
                        </button>
                        <button id="register-tab" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-300/70 hover:text-cyan-400">
                            INSCRIPTION
                        </button>
                    </div>
                    <form id="login-form" class="auth-form space-y-4">
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">IDENTIFIANT</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="Votre nom d'utilisateur"
                            >
                        </div>
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">MOT DE PASSE</label>
                            <input
                                type="password"
                                name="password"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="••••••••"
                            >
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] uppercase tracking-wider"
                        >
                            SE CONNECTER
                        </button>
                    </form>
                    <form id="register-form" class="auth-form space-y-4 hidden">
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">IDENTIFIANT</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="Choisir un nom d'utilisateur"
                            >
                        </div>
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="votre@email.com"
                            >
                        </div>
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">MOT DE PASSE</label>
                            <input
                                type="password"
                                name="password"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="••••••••"
                            >
                        </div>
                        <div>
                            <label class="block text-cyan-300 font-mono text-sm mb-2">CONFIRMER LE MOT DE PASSE</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                class="w-full bg-black/50 border-2 border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-colors duration-300 placeholder-cyan-300/40"
                                placeholder="••••••••"
                            >
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-black font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] uppercase tracking-wider"
                        >
                            S'INSCRIRE
                        </button>
                    </form>
                    <div class="mt-6 text-center">
                        <p class="text-cyan-300/70 font-mono text-xs">
                            🏓 TRANSCENDENCE v2.0 🏓
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const closeBtn = this.querySelector('#close-modal') as HTMLButtonElement;
        const modalOverlay = this.querySelector('#auth-modal') as HTMLElement;

        closeBtn?.addEventListener('click', () => this.close());
        modalOverlay?.addEventListener('click', (e) => {
            if (e.target === modalOverlay) this.close();
        });

        const loginTab = this.querySelector('#login-tab') as HTMLButtonElement;
        const registerTab = this.querySelector('#register-tab') as HTMLButtonElement;

        loginTab?.addEventListener('click', () => this.switchTab('login'));
        registerTab?.addEventListener('click', () => this.switchTab('register'));

        const loginForm = this.querySelector('#login-form') as HTMLFormElement;
        const registerForm = this.querySelector('#register-form') as HTMLFormElement;

        loginForm?.addEventListener('submit', (e) => this.handleLogin(e));
        registerForm?.addEventListener('submit', (e) => this.handleRegister(e));

        document.addEventListener('login', () => this.open());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    switchTab(tab: 'login' | 'register') {
        this.currentTab = tab;

        const loginTab = this.querySelector('#login-tab') as HTMLButtonElement;
        const registerTab = this.querySelector('#register-tab') as HTMLButtonElement;
        const loginForm = this.querySelector('#login-form') as HTMLFormElement;
        const registerForm = this.querySelector('#register-form') as HTMLFormElement;
        const modalTitle = this.querySelector('#modal-title') as HTMLElement;

        loginTab.className = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-300/70 hover:text-cyan-400';
        registerTab.className = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-300/70 hover:text-cyan-400';

        if (tab === 'login') {
            modalTitle.textContent = 'CONNEXION';
            loginTab.className = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-400 bg-cyan-400/20 border border-cyan-400/50';
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            modalTitle.textContent = 'INSCRIPTION';
            registerTab.className = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-cyan-400 bg-cyan-400/20 border border-cyan-400/50';
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    async handleLogin(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const loginData = {
            username: formData.get('username') as string,
            password: formData.get('password') as string
        };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                this.close();
                window.location.reload();
            } else {
                const error = await response.json();
                alert('Erreur de connexion: ' + (error.message || 'Identifiants incorrects'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    }

    async handleRegister(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        const registerData = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: password
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                this.switchTab('login');
            } else {
                const error = await response.json();
                alert('Erreur d\'inscription: ' + (error.message || 'Erreur inconnue'));
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Erreur d\'inscription. Veuillez réessayer.');
        }
    }

    open() {
        this.isOpen = true;
        const modal = this.querySelector('#auth-modal') as HTMLElement;
        const content = modal.querySelector('div') as HTMLElement;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');

        setTimeout(() => {
            const firstInput = this.querySelector('input') as HTMLInputElement;
            firstInput?.focus();
        }, 100);
    }

    close() {
        this.isOpen = false;
        const modal = this.querySelector('#auth-modal') as HTMLElement;
        const content = modal.querySelector('div') as HTMLElement;

        content.classList.remove('scale-100');
        content.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('opacity-0', 'pointer-events-none');
        }, 150);

        const forms = this.querySelectorAll('form') as NodeListOf<HTMLFormElement>;
        forms.forEach(form => form.reset());
    }
}

customElements.define('auth-modal', AuthModal);