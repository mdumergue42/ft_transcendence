// src/components/home.ts
import './ui/navbar.js'; // Import the navbar component
export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
		<app-navbar></app-navbar>
		<main class="content-area">
			<h1>Transcendence</h1>
			<button id="play-button">PLAY</button>
			<canvas id="pong-canvas" width="1000" height="600"></canvas>
		</main>`;
    }
    connectedCallback() {
        const btn = this.querySelector('#fetch-btn');
        const result = this.querySelector('#api-result');
        btn?.addEventListener('click', async () => {
            try {
                const res = await fetch('/api/data');
                const data = await res.json();
                if (result)
                    result.textContent = JSON.stringify(data, null, 2);
            }
            catch {
                if (result)
                    result.textContent = 'Erreur lors de la requête API.';
            }
        });
    }
}
customElements.define('home-page', HomePage);
