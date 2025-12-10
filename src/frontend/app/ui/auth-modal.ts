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
            <div id="auth-modal" class="modal-overlay fixed inset-0 bg-black/90 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm">
                <div class="bg-black border-2 PBorder rounded-xl p-8 max-w-md w-full mx-4 transform scale-95 transition-transform duration-300 PLowShadow">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold PText font-mono tracking-wider">
                            <span id="modal-title">CONNEXION</span>
                        </h2>
                        <button id="close-modal" class="PText hover:text-red-500 transition-colors duration-300 text-2xl font-bold">
                            ✕
                        </button>
                    </div>
                    <div class="flex mb-6 bg-black rounded-xl p-1 border PBorder">
                        <button id="login-tab" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-black PBoxBg border PBorder">
                            CONNEXION
                        </button>
                        <button id="register-tab" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 PText">
                            INSCRIPTION
                        </button>
                    </div>
                    <form id="login-form" class="auth-form space-y-4">
                        <div>
                            <label class="block PText font-mono text-sm mb-2">IDENTIFIANT</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="Votre nom d'utilisateur"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">MOT DE PASSE</label>
                            <input
                                type="password"
                                name="password"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="••••••••"
                            >
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-black border-2 PBorder PText PBoxHover hover:text-black font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
                        >
                            SE CONNECTER
                        </button>
                        <button
                            type="button"
                            id="resend-email-btn"
                            class="hidden w-full mt-3 text-[10px] PText opacity-60 hover:opacity-100 hover:text-white transition-all uppercase tracking-widest"
                        >
                            [ RENVOYER L'EMAIL DE VALIDATION ]
                        </button>
                    </form>
                    <form id="register-form" class="auth-form space-y-4 hidden">
                        <div>
                            <label class="block PText font-mono text-sm mb-2">IDENTIFIANT</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="Choisir un nom d'utilisateur"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="votre@email.com"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">MOT DE PASSE</label>
                            <input
                                type="password"
                                name="password"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="••••••••"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">CONFIRMER LE MOT DE PASSE</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="••••••••"
                            >
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-black border-2 PBorder PText PBoxHover hover:text-black font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 PShadowHover uppercase tracking-wider"
                        >
                            S'INSCRIRE
                        </button>
                    </form>
                    <div class="mt-6 text-center">
                        <p class="PDarkText font-mono text-xs">
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
        this.hideErrorAndResend(); //j\ai rejoute ici

        const loginTab = this.querySelector('#login-tab') as HTMLButtonElement;
        const registerTab = this.querySelector('#register-tab') as HTMLButtonElement;
        const loginForm = this.querySelector('#login-form') as HTMLFormElement;
        const registerForm = this.querySelector('#register-form') as HTMLFormElement;
        const modalTitle = this.querySelector('#modal-title') as HTMLElement;

        const inactiveClass = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 PText border border-transparent';
        
        const activeClass = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-black PBoxBg border PBorder PLowShadow';

        if (tab === 'login') {
            modalTitle.textContent = 'CONNEXION';
            loginTab.className = activeClass;
            registerTab.className = inactiveClass;
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            modalTitle.textContent = 'INSCRIPTION';
            registerTab.className = activeClass;
            loginTab.className = inactiveClass;
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    async handleLogin(e: Event) {
        e.preventDefault();
        this.hideErrorAndResend(); // la aussi
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

			const result = await response.json();
			console.log('result de authmodal: ', result);
			if (!response.ok) {
				console.error('LE back a pas renvoyer le fucking token');
				alert('Error' + (result.error || 'ID incorrects'));
			}
			if (result.token) {
				localStorage.setItem('token', result.token);
				this.close();
				window.location.reload();
			} else {
				console.error('le backend a rien renvoyer');
				alert('erreur: token manquant');
			}
				// //verif du jwt
				// const verifToken = await fetch('/api/auth/verif-token', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify({ token: result.token })
				// });
				// console.log('fetch de ses morts ok', verifToken.status)

				// const verifJWT = await verifToken.json();
				// if (verifJWT.valid) {
				// 	console.log('Login successful:', result);
                // 	this.close();
                // 	window.location.reload();
				// }
				// else {
				// 	console.log('Expired token or invalid, suppressed token');
				// 	localStorage.removeItem('tokenJWT');
				// 	alert('Invalid token, please try again');
				// }
        }
		catch (error) {
            console.error('Login error:', error);
		//	localStorage.removeItem('tokenJWT');
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    }

    showResendButton()
    {
        const btn = this.querySelector('#resend-email-btn') as HTMLElement;
        if (btn) btn.classList.remove('hidden');
    }

    hideErrorAndResend()
    {
        const errorDiv = this.querySelector('#login-error') as HTMLElement;
        const resendBtn = this.querySelector('#resend-email-btn') as HTMLElement;
        
        if (errorDiv) errorDiv.classList.add('hidden');
        if (resendBtn) resendBtn.classList.add('hidden');
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

		console.log("donnees pour le backend", registerData);

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

	async handleLogout(e: Event) {
		localStorage.removeItem('token');
		console.log('User disconnect.');
		window.location.reload();
	}

    open() {
		var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
		if (isLoggedIn)
		{
			localStorage.removeItem('token');
			localStorage.removeItem('isLoggedIn');
			window.location.reload();
			return ;
		}

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
