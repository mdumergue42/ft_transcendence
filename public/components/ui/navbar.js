// src/components/navbar.ts
export class AppNavbar extends HTMLElement {
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
        }
        catch {
            console.warn('Erreur fetch auth, on part du principe non connecté.');
        }
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/styles.css');
        this.shadow.appendChild(link);
        const nav = document.createElement('nav');
        nav.classList.add('sidebar');
        nav.innerHTML = `
		<ul>
			<li><a href="#home" data-page="home" class="menu">Menu</a></li>
			<li><a href="#ai" data-page="ai" class="menu">AI</a></li>
			<li><a href="#match" data-page="match" class="menu">Match</a></li>
			<li><a href="#tournament" data-page="tournament" class="menu">Party</a></li>
			<li>${isLoggedIn ? `<a href="#profil" data-page="profil" class="profile-picture-container"><img class="profile-picture" src="https://dubaitickets.tours/wp-content/uploads/2023/03/img-worlds-of-adventure-dubai-ticket-10-1-1536x1152.jpg" alt="pp"></a>` : `<button id="login-btn" class="menu">Sing in</button>`}</li>
		</ul>`;
        this.shadow.appendChild(nav);
        if (!isLoggedIn) {
            this.shadow.getElementById('login-btn')?.addEventListener('click', () => {
                console.log('Login button clicked in navbar');
                this.dispatchEvent(new CustomEvent('login', { bubbles: true, composed: true }));
            });
        }
        const links = this.shadow.querySelectorAll('a[data-page]');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(l => l.classList.remove('font-bold'));
                link.classList.add('font-bold');
            });
        });
    }
}
customElements.define('app-navbar', AppNavbar);
