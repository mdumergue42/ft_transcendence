export class LoginModal extends HTMLElement {
	private shadow: ShadowRoot;
	private overlay!: HTMLElement;
	private form?: HTMLFormElement;
	private toggleTextLogin?: HTMLElement;
	private toggleTextRegister?: HTMLElement;
	private isRegisterMode: boolean = false;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });

		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', '/styles.css');
		this.shadow.appendChild(link);

		const template = document.createElement('template');
		template.innerHTML = `
		<div id="login-modal" class="modal-overlay hidden">
			<div class="modal-content p-6 rounded-2xl shadow-lg relative">
				<button id="close-modal-button" class="absolute top-1.5 right-2.5 text-xl hover:text-red-500 transition-all ease-in-out hover:scale-105">&times;</button>
				<h2 class="text-xl font-bold mb-6">Login</h2>
				<form id="auth-form" class="space-y-4 mb-4">
					<div class="form-group">
						<label for="username" class="block">Username</label>
						<input type="text" id="username" name="username" placeholder="Jdoe" required class="border p-2 w-full" />
					</div>
					<div class="form-group">
						<label for="password" class="block">Password</label>
						<input type="password" id="password" name="password" placeholder="Enter your password" required class="border p-2 w-full" />
					</div>
					<div class="form-group hidden" id="confirm-password-group">
						<label for="confirm-password" class="block">Confirm Password</label>
						<input type="password" id="confirm-password" name="confirm-password" class="border p-2 w-full" />
					</div>
					<p id="error-message" class="error-message text-red-500 hidden"></p>
					<button type="submit" id="form-submit-button" class="action-button px-4 py-2 rounded">Log In</button>
				</form>
				<div id="login-toggle-text" class="toggle-form-text text-sm mt-2">No account ? <a href="" id="show-register-link" class="text-blue-500 underline">Register here</a></div>
				<div id="register-toggle-text" class="toggle-form-text text-sm mt-2 hidden">Already have an account ? <a href="" id="show-login-link" class="text-blue-500 underline">Log in</a></div>
			</div>
		</div>`;
		this.shadow.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		this.overlay = this.shadow.getElementById('login-modal') as HTMLElement;
		this.form = this.shadow.getElementById('auth-form') as HTMLFormElement;
		this.toggleTextLogin = this.shadow.getElementById('login-toggle-text')!;
		this.toggleTextRegister = this.shadow.getElementById('register-toggle-text')!;

		document.addEventListener('open-login', () => this.ShowModal());
		const closeBtn = this.shadow.getElementById('close-modal-button')!;
		closeBtn.addEventListener('click', () => this.close());

		this.shadow.getElementById('show-register-link')!
			.addEventListener('click', e => {
				e.preventDefault();
				this.isRegisterMode = true;
				this.updateMode();
			});
		this.shadow.getElementById('show-login-link')!
			.addEventListener('click', e => {
				e.preventDefault();
				this.isRegisterMode = false;
				this.updateMode();
			});

		this.form!.addEventListener('submit', async e => {
			e.preventDefault();
			const username = (this.shadow.getElementById('username') as HTMLInputElement).value;
			const password = (this.shadow.getElementById('password') as HTMLInputElement).value;
			const confirmPasswordEl = this.shadow.getElementById('confirm-password') as HTMLInputElement;
			const errorE = this.shadow.getElementById('error-message') as HTMLElement;

			if (this.isRegisterMode && password !== confirmPasswordEl.value) {
				errorE.textContent = 'Passwords do not match.';
				errorE.classList.remove('hidden');
				return;
			}

			this.close();
			this.dispatchEvent(new CustomEvent('auth-success', { bubbles: true, composed: true }));
		});
	}

	ShowModal() {
		console.log('Opening login modal');
		this.overlay.classList.remove('hidden');
	}

	close() {
		this.overlay.classList.add('hidden');
		this.isRegisterMode = false;
		this.updateMode();
		this.form!.reset();
		this.shadow.getElementById('error-message')!.classList.add('hidden');
	}

	private updateMode() {
		const pwdGroup = this.shadow.getElementById('confirm-password-group')!;
		console.log(pwdGroup);
		console.log('Password group visibility:', !pwdGroup.classList.contains('hidden'));
		if (this.isRegisterMode) {
			this.shadow.getElementById('modal-title')!.textContent = 'Register';
			(this.shadow.getElementById('form-submit-button')!).textContent = 'Register';
			pwdGroup.classList.remove('hidden');
			this.toggleTextLogin!.classList.add('hidden');
			this.toggleTextRegister!.classList.remove('hidden');
		} else {
			this.shadow.getElementById('modal-title')!.textContent = 'Login';
			(this.shadow.getElementById('form-submit-button')!).textContent = 'Log In';
			pwdGroup.classList.add('hidden');
			this.toggleTextLogin!.classList.remove('hidden');
			this.toggleTextRegister!.classList.add('hidden');
		}
	}
}

customElements.define('login-modal', LoginModal);