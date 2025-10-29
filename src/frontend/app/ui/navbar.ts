export class AppNavbar extends HTMLElement {
	private shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		let isLoggedIn = false;
		try {
			const res = await fetch('/api/auth/status');
			if (res.ok) {
				isLoggedIn = (await res.json()).loggedIn;
			}
		} catch {
			console.warn('Erreur fetch auth, on part du principe non connecté.');
		}

		const linkElement = document.createElement('link');
		linkElement.rel = 'stylesheet';
		linkElement.href = '/styles.css';
		this.shadow.appendChild(linkElement);

		const nav = document.createElement('nav');
		nav.className = 'fixed left-0 top-0 w-20 h-screen bg-gradient-to-b from-cyan-600 to-cyan-800 flex flex-col items-center py-5 shadow-[4px_0_15px_rgba(6,182,212,0.2)] z-50 border-r-2 border-cyan-400';
		nav.innerHTML = `
		<ul class="list-none p-0 m-0 w-full flex flex-col gap-4">
			<li class="w-full flex justify-center relative">
				<a href="/" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="home" title="Accueil">
					🏠
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Accueil</span>
			</li>
			<li class="w-full flex justify-center relative">
				<a href="/match" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="match" title="Jouer">
					🎮
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Jouer</span>
			</li>
			<li class="w-full flex justify-center relative">
				<a href="/ai" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="ai" title="IA">
					🤖
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Affronter l'IA</span>
			</li>
			<li class="w-full flex justify-center relative">
				<a href="/history" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="history" title="Historique">
					📊
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Historique</span>
			</li>
			<li class="w-full flex justify-center relative">
				<a href="/tournament" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="tournament" title="Tournois">
					🏆
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Tournois</span>
			</li>
			<li class="w-full flex justify-center relative">
				<a href="/stats" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="stats" title="Statistiques">
					📈
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Statistiques</span>
			</li>
			<li class="w-full flex justify-center mt-auto relative">
				${isLoggedIn
				? `<a href="/profil" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" data-page="profil" title="Profil">
					👤
				</a>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Profil</span>`
				: `<button id="login-btn" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 border-cyan-400 rounded-xl text-cyan-400 text-2xl cursor-pointer transition-all duration-300 no-underline hover:bg-cyan-400/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group" title="Connexion">
					👤
				</button>
				<span class="absolute left-20 bg-black/90 text-cyan-400 border border-cyan-400 px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Se connecter</span>`}
			</li>
		</ul>`;
		this.shadow.appendChild(nav);
		this.shadow.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('menu')) {
				e.preventDefault();
				const page = target.getAttribute('data-page');
				if (page) {
					this.navigateTo(page);
				} else if (target.id === 'login-btn') {
					console.log('Login button clicked');
					this.dispatchEvent(new CustomEvent('login', { bubbles: true, composed: true }));
				}
			}
		});
		this.updateActiveLink();
		window.addEventListener('popstate', () => this.updateActiveLink());
	}

	private navigateTo(page: string) {
		const path = page === 'home' ? '/' : `/${page}`;
		history.pushState({}, '', path);
		window.dispatchEvent(new PopStateEvent('popstate'));
	}

	private updateActiveLink() {
		const currentPath = window.location.pathname;
		const currentPage = currentPath === '/' ? 'home' : currentPath.slice(1);
		const links = this.shadow.querySelectorAll('a[data-page]');
		links.forEach(link => {
			const linkPage = link.getAttribute('data-page');
			if (linkPage === currentPage) {
				link.classList.add('bg-cyan-400/30', 'shadow-[0_0_20px_rgba(6,182,212,0.8)]');
				link.classList.remove('bg-black/30');
			} else {
				link.classList.remove('bg-cyan-400/30', 'shadow-[0_0_20px_rgba(6,182,212,0.8)]');
				link.classList.add('bg-black/30');
			}
		});
	}
}

customElements.define('app-navbar', AppNavbar);