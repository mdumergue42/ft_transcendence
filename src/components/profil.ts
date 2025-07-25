// src/components/profil.ts

// Web Component for the Profil page
export class ProfilPage extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
			<app-navbar></app-navbar>
			<div class="p-4">
				<h1 class="text-2xl font-bold mb-4">👤 Profil</h1>
				<div class="space-y-2">
					<p><strong>Nom :</strong> Utilisateur</p>
					<p><strong>Email :</strong> user@example.com</p>
					<p><strong>Rôle :</strong> Joueur</p>
				</div>
			</div>
		`;
	}

	connectedCallback() {
		
	}
}

customElements.define('profil-page', ProfilPage);