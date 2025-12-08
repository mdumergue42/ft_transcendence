export class AppNavbar extends HTMLElement {
	private shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	navBarEle(show: boolean, ref: string, dataPage:string, title:string, emojy:string) {
		if (!show)
			return `<li class="w-full flex justify-center relative"></li>`;
		return `
			<li class="w-full flex justify-center relative">
				<a href="${ref}" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 PBoxBorder rounded-xl PText PBoxHover text-2xl cursor-pointer transition-all duration-300 no-underline hover:scale-110 PShadowHover group" data-page="${dataPage}" title="${title}">
					${emojy}
				</a>
				<span class="absolute left-20 bg-black/90 PText border PBoxBorder px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">${title}</span>
			</li>
		`;
	}

	async connectedCallback() {
		var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;


		const linkElement = document.createElement('link');
		linkElement.rel = 'stylesheet';
		linkElement.href = '/styles.css';
		this.shadow.appendChild(linkElement);

		const nav = document.createElement('nav');
		nav.className = 'fixed left-0 top-0 w-20 h-screen bg-black flex flex-col items-center py-5 z-50 border-r-2 PBoxBorder font-mono';		nav.innerHTML = `
		<ul class="list-none p-0 m-0 w-full flex flex-col gap-4" style="height:100%; display: grid; grid-template-rows: repeat(4, auto) 1fr ;">
			${this.navBarEle(true, "/", "home", "Accueil", "🏠")}
			${this.navBarEle(isLoggedIn,"/match", "match", "Jouer", "🎮")}
			${this.navBarEle(isLoggedIn,"/history", "history", "Historique", "📊")}
			${this.navBarEle(isLoggedIn,"/settings", "settings", "Settings", "⚙️")}
			<li class="w-full flex justify-center mt-auto relative">
				<button id="login-btn" class="menu w-14 h-14 flex items-center justify-center bg-black/30 border-2 PBoxBorder rounded-xl PText text-2xl cursor-pointer transition-all duration-300 no-underline PBoxHover hover:scale-110 PShadowHover group" title="Connexion">
					👤
				</button>
				<span class="absolute left-20 bg-black/90 PText border PBoxBorder px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-[51] font-mono group-hover:opacity-100">Se connecter</span>
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
				link.classList.add('PBoxBg', 'text-black', 'PShadow');
				link.classList.remove('bg-black/30');
			} else {
				link.classList.remove('PBoxBg', 'text-black', 'PShadow');
				link.classList.add('bg-black/30');
			}
		});
	}
}

customElements.define('app-navbar', AppNavbar);
