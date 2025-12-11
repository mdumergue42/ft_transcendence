//import fastifyReplyFrom from "@fastify/reply-from";

export class AuthModal extends HTMLElement {
    private isOpen = false;
    private currentTab: 'login' | 'register' | '2fa' = 'login';

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
                            LOGIN
                        </button>
                        <button id="register-tab" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 PText">
                            REGISTRATION
                        </button>
                        <button id="2fa-tab" style="display:none" class="auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 PText">
							2FA
                        </button>
                    </div>
                    <form id="login-form" class="auth-form space-y-4">
                        <div>
                            <label class="block PText font-mono text-sm mb-2">USERNAME</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="Your username"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">PASSWORD</label>
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
                            LOGIN
                        </button>
                        <button
                            type="button"
                            id="resend-email-btn"
                            class="hidden w-full mt-3 text-[10px] PText opacity-60 hover:opacity-100 hover:text-white transition-all uppercase tracking-widest"
                        >
                            [ Resend the email ]
                        </button>
                    </form>
                    <form id="register-form" class="auth-form space-y-4 hidden">
                        <div>
                            <label class="block PText font-mono text-sm mb-2">USERNAME</label>
                            <input
                                type="text"
                                name="username"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="Enter a username"
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
                            <label class="block PText font-mono text-sm mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                class="w-full bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus"
                                placeholder="••••••••"
                            >
                        </div>
                        <div>
                            <label class="block PText font-mono text-sm mb-2">Confirm password</label>
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
                            Register
                        </button>
                    </form>
                    </form>
                    <form id="2fa-form" class="auth-form space-y-6 hidden animate-in fade-in zoom-in duration-300">
                        <div class="text-center">
                            <div class="mb-4">
                                <span class="text-4xl animate-pulse">🔐</span>
                            </div>
                            <p class="PText font-mono text-xs mb-4 uppercase tracking-widest">Authentication code</p>
                            <p class="text-[10px] PText opacity-50 mb-4">Please enter the 6-digit code from your application.</p>
                            
                            <input
                                type="text"
                                name="2fa_code"
                                maxlength="6"
                                required
                                class="w-3/4 bg-black border-2 PBorder rounded-lg px-4 py-3 PText font-mono text-center text-3xl tracking-[0.5em] focus:PBorder focus:outline-none transition-colors duration-300 PLowShadowFocus placeholder-gray-800"
                                placeholder="000000"
                                autocomplete="off"
                            >
                        </div>

                        <div id="2fa-error" class="hidden text-red-500 text-xs font-mono text-center">Incorrect code</div>

                        <button
                            type="submit"
                            class="w-full bg-black border-2 PBorder PText PBoxHover hover:text-black font-mono font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
                        >
                            CHECK
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

		const resendBtn = this.querySelector('#resend-email-btn') as HTMLButtonElement;
		resendBtn?.addEventListener('click', (e) => this.handleResendEmail(e));
    }

    switchTab(tab: 'login' | 'register' | '2fa') {
		console.log("switch Tab");
        this.currentTab = tab;
        this.hideErrorAndResend(); //j\ai rejoute ici

        const loginTab = this.querySelector('#login-tab') as HTMLButtonElement;
        const registerTab = this.querySelector('#register-tab') as HTMLButtonElement;
        const tfaTab = this.querySelector('#2fa-tab') as HTMLButtonElement;
        const loginForm = this.querySelector('#login-form') as HTMLFormElement;
        const registerForm = this.querySelector('#register-form') as HTMLFormElement;
        const tfaForm = this.querySelector('#2fa-form') as HTMLFormElement;
        const modalTitle = this.querySelector('#modal-title') as HTMLElement;

        const inactiveClass = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 PText border border-transparent';
        
        const activeClass = 'auth-tab flex-1 py-2 px-4 rounded-lg font-mono text-sm font-semibold transition-all duration-300 text-black PBoxBg border PBorder PLowShadow';

        if (tab === 'login') {
            modalTitle.textContent = 'LOGIN';
            loginTab.className = activeClass;
            registerTab.className = inactiveClass;
			loginTab.style.dispay = "";
			registerTab.style.dispay = "";
			tfaTab.style.dispay = "none";
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
			tfaForm.classList.add('hidden');
        }
		else if ( tab == '2fa') {
            modalTitle.textContent = '2FA';
			tfaTab.className = activeClass
			loginTab.style.dispay = "none";
			registerTab.style.dispay = "none";
            loginTab.style.dispay = "";
            registerForm.classList.add('hidden');
            loginForm.classList.add('hidden');
			tfaForm.classList.remove('hidden');
		}
		else {
            modalTitle.textContent = 'REGISTER';
            registerTab.className = activeClass;
            loginTab.className = inactiveClass;
			loginTab.style.dispay = "";
			registerTab.style.dispay = "";
			tfaTab.style.dispay = "none";
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
			tfaForm.classList.add('hidden');
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
			
			if (response.status === 403 && result.error === "Email not verified") {
				const errEmail = this.querySelector('#login-error') as HTMLElement;
				if (errEmail) {
					errEmail.textContent = "Please verify your email before logging in";
					errEmail.classList.remove('hidden');
				}

				this.showResendButton();
				return;
			}


			if (!response.ok) {
				alert('Error' + (result.error || 'ID incorrects'));
				return ;
			}
			if (result.token) {
				localStorage.setItem('token', result.token);
				this.close();
				window.location.reload();
			}
			else if  (result.requiresTwoFactor == true) {
			{
                this.switchTab('login');
				return;
			}
			}
			else {
				alert('Error: Missing token');
				return ;
			}
        }
		catch (error) {
			localStorage.removeItem('tokenJWT');
            alert('Connexion error. Please try again.');
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
            alert('Passwords do not match.');
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
                alert('Registration successful! You can now log in.');
                this.switchTab('login');
            } else {
                const error = await response.json();
                alert('Registration error: ' + (error.message || error.error ? error.error : 'Unknow error'));
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration error. Please try again.');
        }
    }

	async handleResendEmail(e: Event) {
		e.preventDefault();

		const userInput = this.querySelector('#login-form input[name="username"]') as HTMLInputElement | null;
		if (!userInput || !userInput.value) {
			alert("Enter your username first");
			return;
		}

		const username = userInput.value;

		try {
			const emailResult = await fetch('/api/auth/get-email-by-username', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ username })
			});
			const dataResult = await emailResult.json();

			if (!emailResult.ok || !dataResult.email) {
				alert("No email find for this user");
				return;
			}

			const emailResend = await fetch ('/api/auth/resend-verification', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ email: dataResult.email })
			});

			const dataResend = await emailResend.json();

			if (emailResend.ok) {
				alert("Your verification email has been resent");
			} else {
				alert("Error: "+ dataResend.error);
			}

		} catch (error) {
			console.error('Resend email error: ', error);
			alert("Error while resending email");
		}
	}

	async handleVerify2FA(e: Event) {
		e.preventDefault();

		const id_user = (this as any).wait2fa;
		if (!id_user) {
			alert("No pending 2fa at this moment for this user");
			return;
		}

		const codeResult = this.querySelector('#twofa-code') as HTMLInputElement;
		if (!codeResult || !codeResult.value) {
			alert("Please enter your 2fa code");
			return;
		}

		const code2fa = codeResult.value;

		try {
			const verif2fa = await fetch ('/api/auth/verify-2fa', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ id_user, code2fa })
			});

			const finalResult2fa = await verif2fa.json();

			if (!finalResult2fa.success) {
				alert(finalResult2fa.error || "invalid code 2fa");
				return;
			}
		} catch (error) {
			console.error('The 2fa verification failed: ', error);
			alert('Error with the 2fa code');
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
