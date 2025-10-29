import '../ui/navbar.js';

export class ProfilPage extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
		<app-navbar></app-navbar>
		<main class="content-area" style="padding: 20px;">
			<div style="max-width: 1200px; margin: 0 auto;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="font-size: 2.5rem; margin-bottom: 10px; color: #333;">👤 Mon Profil</h1>
					<p style="color: #666; font-size: 1.1rem;">Gère tes informations personnelles</p>
				</div>
				<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 20px; margin-bottom: 30px; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); text-align: center;">
					<img src="https://dubaitickets.tours/wp-content/uploads/2023/03/img-worlds-of-adventure-dubai-ticket-10-1-1536x1152.jpg" alt="Profile" style="width: 120px; height: 120px; border-radius: 50%; border: 5px solid white; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
					<h2 style="font-size: 2rem; margin-bottom: 5px;">ProGamer42</h2>
					<p style="opacity: 0.9; margin-bottom: 15px;">Membre depuis janvier 2025</p>
					<div style="display: flex; gap: 20px; justify-content: center; font-size: 0.95rem;">
						<div>
							<div style="font-size: 1.5rem; font-weight: bold;">28</div>
							<div style="opacity: 0.9;">Victoires</div>
						</div>
						<div style="border-left: 1px solid rgba(255,255,255,0.3);"></div>
						<div>
							<div style="font-size: 1.5rem; font-weight: bold;">#12</div>
							<div style="opacity: 0.9;">Classement</div>
						</div>
						<div style="border-left: 1px solid rgba(255,255,255,0.3);"></div>
						<div>
							<div style="font-size: 1.5rem; font-weight: bold;">65%</div>
							<div style="opacity: 0.9;">Win Rate</div>
						</div>
					</div>
				</div>
				<div style="display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid #e0e0e0;">
					<button class="profile-tab active" data-tab="info" style="padding: 12px 24px; background: none; border: none; border-bottom: 3px solid #667eea; font-weight: bold; color: #667eea; cursor: pointer;">
						ℹ️ Informations
					</button>
					<button class="profile-tab" data-tab="settings" style="padding: 12px 24px; background: none; border: none; font-weight: bold; color: #666; cursor: pointer;">
						⚙️ Paramètres
					</button>
					<button class="profile-tab" data-tab="friends" style="padding: 12px 24px; background: none; border: none; font-weight: bold; color: #666; cursor: pointer;">
						👥 Amis
					</button>
				</div>
				<div id="profile-tab-info" class="profile-tab-content">
					<div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
						<h3 style="margin-bottom: 20px; color: #333;">Informations personnelles</h3>
						<div style="display: grid; gap: 20px;">
							<div style="display: grid; grid-template-columns: 200px 1fr; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<strong style="color: #666;">Nom d'utilisateur:</strong>
								<span style="color: #333;">ProGamer42</span>
							</div>
							<div style="display: grid; grid-template-columns: 200px 1fr; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<strong style="color: #666;">Email:</strong>
								<span style="color: #333;">progamer42@example.com</span>
							</div>
							<div style="display: grid; grid-template-columns: 200px 1fr; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<strong style="color: #666;">Membre depuis:</strong>
								<span style="color: #333;">15 janvier 2025</span>
							</div>
							<div style="display: grid; grid-template-columns: 200px 1fr; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<strong style="color: #666;">Dernière connexion:</strong>
								<span style="color: #333;">Aujourd'hui à 14:32</span>
							</div>
						</div>
					</div>
					<div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-top: 20px;">
						<h3 style="margin-bottom: 20px; color: #333;">🏅 Badges récents</h3>
						<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px;">
							<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 2px solid #4caf50;">
								<div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
								<div style="font-weight: bold; color: #333; font-size: 0.9rem;">Champion</div>
							</div>
							<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 2px solid #ff9800;">
								<div style="font-size: 3rem; margin-bottom: 10px;">🔥</div>
								<div style="font-weight: bold; color: #333; font-size: 0.9rem;">En feu</div>
							</div>
							<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 2px solid #2196f3;">
								<div style="font-size: 3rem; margin-bottom: 10px;">⚡</div>
								<div style="font-weight: bold; color: #333; font-size: 0.9rem;">Rapide</div>
							</div>
						</div>
					</div>
				</div>
				<div id="profile-tab-settings" class="profile-tab-content hidden">
					<div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
						<h3 style="margin-bottom: 20px; color: #333;">⚙️ Paramètres du compte</h3>
						<form style="display: grid; gap: 20px;">
							<div>
								<label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Changer l'avatar</label>
								<input type="file" accept="image/*" style="padding: 10px; border: 2px solid #ddd; border-radius: 8px; width: 100%;">
							</div>
							<div>
								<label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Changer le mot de passe</label>
								<input type="password" placeholder="Nouveau mot de passe" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 10px;">
								<input type="password" placeholder="Confirmer le mot de passe" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
							</div>
							<div>
								<label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
									<input type="checkbox" checked style="width: 20px; height: 20px;">
									<span style="color: #555;">Recevoir les notifications par email</span>
								</label>
							</div>
							<div>
								<label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
									<input type="checkbox" checked style="width: 20px; height: 20px;">
									<span style="color: #555;">Profil public</span>
								</label>
							</div>
							<button type="submit" style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
								💾 Sauvegarder les modifications
							</button>
						</form>
					</div>
				</div>
				<div id="profile-tab-friends" class="profile-tab-content hidden">
					<div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
						<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
							<h3 style="color: #333;">👥 Liste d'amis (12)</h3>
							<button style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
								➕ Ajouter un ami
							</button>
						</div>
						<div style="display: grid; gap: 15px;">
							<div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<div style="display: flex; align-items: center; gap: 15px;">
									<div style="width: 50px; height: 50px; border-radius: 50%; background: #4caf50; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JD</div>
									<div>
										<div style="font-weight: bold; color: #333;">JohnDoe</div>
										<div style="font-size: 0.85rem; color: #666;">🟢 En ligne</div>
									</div>
								</div>
								<button style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 6px; cursor: pointer;">
									🎮 Inviter
								</button>
							</div>
							<div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 10px;">
								<div style="display: flex; align-items: center; gap: 15px;">
									<div style="width: 50px; height: 50px; border-radius: 50%; background: #ff9800; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">AM</div>
									<div>
										<div style="font-weight: bold; color: #333;">AliceMaster</div>
										<div style="font-size: 0.85rem; color: #666;">⚫ Hors ligne - il y a 2h</div>
									</div>
								</div>
								<button style="padding: 8px 16px; background: #e0e0e0; color: #666; border: none; border-radius: 6px; cursor: not-allowed;">
									Hors ligne
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>`;
	}

	connectedCallback() {
		const tabBtns = this.querySelectorAll('.profile-tab');
		const tabContents = this.querySelectorAll('.profile-tab-content');

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
				this.querySelector(`#profile-tab-${targetTab}`)?.classList.remove('hidden');
			});
		});
	}
}

customElements.define('profil-page', ProfilPage);