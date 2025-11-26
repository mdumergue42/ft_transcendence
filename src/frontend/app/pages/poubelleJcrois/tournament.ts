import '../ui/navbar.js';

export class TournamentPage extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
		<app-navbar></app-navbar>
		<main class="content-area" style="padding: 20px;">
			<div style="max-width: 1400px; margin: 0 auto;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="font-size: 2.5rem; margin-bottom: 10px; color: #333;">🏆 Tournoi</h1>
					<p style="color: #666; font-size: 1.1rem;">Crée ou rejoins un tournoi</p>
				</div>
				<div style="display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid #e0e0e0;">
					<button class="tab-btn active" data-tab="create" style="padding: 12px 24px; background: none; border: none; border-bottom: 3px solid #667eea; font-weight: bold; color: #667eea; cursor: pointer;">
						➕ Créer un tournoi
					</button>
					<button class="tab-btn" data-tab="join" style="padding: 12px 24px; background: none; border: none; font-weight: bold; color: #666; cursor: pointer;">
						🔍 Rejoindre un tournoi
					</button>
					<button class="tab-btn" data-tab="ongoing" style="padding: 12px 24px; background: none; border: none; font-weight: bold; color: #666; cursor: pointer;">
						⚡ Tournois en cours
					</button>
				</div>
				<div id="tab-create" class="tab-content">
					<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
						<h3 style="margin-bottom: 20px; color: #333;">Configuration du tournoi</h3>
						<form id="create-tournament-form" style="display: grid; gap: 20px;">
							<div>
								<label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Nom du tournoi</label>
								<input type="text" id="tournament-name" placeholder="Ex: Championnat d'été 2025" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
							</div>
							<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
								<div>
									<label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Nombre de joueurs</label>
									<select id="players-count" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; cursor: pointer;">
										<option value="4">4 joueurs</option>
										<option value="8" selected>8 joueurs</option>
										<option value="16">16 joueurs</option>
									</select>
								</div>
								<div>
									<label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Points par match</label>
									<select id="points-per-match" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; cursor: pointer;">
										<option value="3">3 points</option>
										<option value="5" selected>5 points</option>
										<option value="7">7 points</option>
										<option value="10">10 points</option>
									</select>
								</div>
							</div>
							<div>
								<label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
									<input type="checkbox" id="public-tournament" style="width: 20px; height: 20px; cursor: pointer;">
									<span style="font-weight: bold; color: #555;">Tournoi public (visible par tous)</span>
								</label>
							</div>
							<button type="submit" style="padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
								🏆 Créer le tournoi
							</button>
						</form>
					</div>
				</div>
				<div id="tab-join" class="tab-content hidden">
					<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
						<div style="display: flex; gap: 10px; margin-bottom: 25px;">
							<input type="text" id="search-tournament" placeholder="🔍 Rechercher un tournoi..." style="flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
							<button style="padding: 12px 20px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Rechercher</button>
						</div>
						<div id="tournaments-list" style="display: grid; gap: 15px;">
							<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center;">
								<div>
									<h4 style="margin-bottom: 5px; color: #333;">🏆 Tournoi des Légendes</h4>
									<p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Organisé par: ProGamer42</p>
									<div style="display: flex; gap: 10px; align-items: center;">
										<span style="background: #4caf50; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem;">6/8 joueurs</span>
										<span style="color: #666; font-size: 0.85rem;">5 points par match</span>
									</div>
								</div>
								<button style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Rejoindre</button>
							</div>
							<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center;">
								<div>
									<h4 style="margin-bottom: 5px; color: #333;">⚡ Speed Tournament</h4>
									<p style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Organisé par: FastPlayer</p>
									<div style="display: flex; gap: 10px; align-items: center;">
										<span style="background: #ff9800; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.75rem;">3/4 joueurs</span>
										<span style="color: #666; font-size: 0.85rem;">3 points par match</span>
									</div>
								</div>
								<button style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Rejoindre</button>
							</div>
						</div>
					</div>
				</div>
				<div id="tab-ongoing" class="tab-content hidden">
					<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
						<h3 style="margin-bottom: 20px; color: #333;">Mes tournois en cours</h3>
						<div id="ongoing-tournaments" style="display: grid; gap: 20px;">
							<div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 4px solid #667eea;">
								<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
									<div>
										<h4 style="margin-bottom: 5px; color: #333; font-size: 1.3rem;">🏆 Championnat d'automne</h4>
										<p style="color: #666; font-size: 0.9rem;">Phase: Quarts de finale</p>
									</div>
									<button style="padding: 12px 24px; background: #4caf50; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);">
										▶️ Jouer mon match
									</button>
								</div>
								<div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
									<h5 style="margin-bottom: 10px; color: #555;">📊 Arbre du tournoi</h5>
									<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.85rem;">
										<div style="text-align: center; padding: 8px; background: white; border-radius: 6px;">
											<strong>Vous</strong> 🏅<br>
											<span style="color: #4caf50;">vs Player42</span>
										</div>
										<div style="text-align: center; padding: 8px; background: white; border-radius: 6px;">
											<strong>Demi-finale</strong><br>
											<span style="color: #999;">En attente...</span>
										</div>
										<div style="text-align: center; padding: 8px; background: white; border-radius: 6px;">
											<strong>Finale</strong><br>
											<span style="color: #999;">En attente...</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>`;
	}

	connectedCallback() {
		const tabBtns = this.querySelectorAll('.tab-btn');
		const tabContents = this.querySelectorAll('.tab-content');

		tabBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const targetTab = btn.getAttribute('data-tab');

				tabBtns.forEach(b => {
					(b as HTMLElement).style.borderBottom = 'none';
					(b as HTMLElement).style.color = '#666';
					b.classList.remove('active');
				});
				tabContents.forEach(content => content.classList.add('hidden'));

				(btn as HTMLElement).style.borderBottom = '3px solid #667eea';
				(btn as HTMLElement).style.color = '#667eea';
				btn.classList.add('active');
				this.querySelector(`#tab-${targetTab}`)?.classList.remove('hidden');
			});
		});

		const createForm = this.querySelector('#create-tournament-form');
		createForm?.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = (this.querySelector('#tournament-name') as HTMLInputElement).value;
			const playersCount = (this.querySelector('#players-count') as HTMLSelectElement).value;
			const points = (this.querySelector('#points-per-match') as HTMLSelectElement).value;
			const isPublic = (this.querySelector('#public-tournament') as HTMLInputElement).checked;

			alert(`Tournoi "${name}" créé avec succès !\n${playersCount} joueurs, ${points} points par match\nPublic: ${isPublic ? 'Oui' : 'Non'}`);
			// call the backend
		});
	}
}

customElements.define('tournament-page', TournamentPage);