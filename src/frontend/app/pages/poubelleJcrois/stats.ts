import '../ui/navbar.js';

export class HomePage extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
		<app-navbar></app-navbar>
		<main class="content-area" style="padding: 20px;">
			<div style="max-width: 1400px; margin: 0 auto;">
				<div style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; margin-bottom: 40px; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
					<h1 style="font-size: 3.5rem; margin-bottom: 15px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">🏓 Transcendence</h1>
					<p style="font-size: 1.3rem; margin-bottom: 30px; opacity: 0.95;">Le Pong nouvelle génération - Affrontez l'IA ou vos amis !</p>
					<button id="play-button" style="padding: 18px 45px; background: white; color: #667eea; border: none; border-radius: 50px; font-size: 1.3rem; font-weight: bold; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,0.2); transition: all 0.3s; text-transform: uppercase;">
						🎮 Jouer Maintenant
					</button>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
					<div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-top: 4px solid #4caf50;">
						<div style="font-size: 2.5rem; margin-bottom: 10px;">🏆</div>
						<div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 5px;">28</div>
						<div style="color: #666; font-size: 0.95rem;">Victoires totales</div>
					</div>
					<div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-top: 4px solid #2196f3;">
						<div style="font-size: 2.5rem; margin-bottom: 10px;">🎯</div>
						<div style="font-size: 2rem; font-weight: bold; color: #2196f3; margin-bottom: 5px;">65%</div>
						<div style="color: #666; font-size: 0.95rem;">Taux de victoire</div>
					</div>
					<div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-top: 4px solid #ff9800;">
						<div style="font-size: 2.5rem; margin-bottom: 10px;">🔥</div>
						<div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 5px;">+5</div>
						<div style="color: #666; font-size: 0.95rem;">Série en cours</div>
					</div>
					<div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; border-top: 4px solid #9c27b0;">
						<div style="font-size: 2.5rem; margin-bottom: 10px;">⭐</div>
						<div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 5px;">#12</div>
						<div style="color: #666; font-size: 0.95rem;">Classement global</div>
					</div>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px;">
					<a href="#ai" data-page="ai" style="text-decoration: none;">
						<div style="background: linear-gradient(135deg, #764ba2 0%, #9c27b0 100%); padding: 30px; border-radius: 15px; color: white; box-shadow: 0 6px 20px rgba(156, 39, 176, 0.3); transition: transform 0.3s; cursor: pointer;">
							<div style="font-size: 3rem; margin-bottom: 10px;">🤖</div>
							<h3 style="font-size: 1.5rem; margin-bottom: 10px;">Affronter l'IA</h3>
							<p style="opacity: 0.9; font-size: 0.95rem;">Teste tes compétences contre notre IA avancée</p>
						</div>
					</a>
					<a href="#game" data-page="game" style="text-decoration: none;">
						<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3); transition: transform 0.3s; cursor: pointer;">
							<div style="font-size: 3rem; margin-bottom: 10px;">👥</div>
							<h3 style="font-size: 1.5rem; margin-bottom: 10px;">Mode PvP</h3>
							<p style="opacity: 0.9; font-size: 0.95rem;">Défie un ami en local ou en ligne</p>
						</div>
					</a>
					<a href="#tournament" data-page="tournament" style="text-decoration: none;">
						<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 15px; color: white; box-shadow: 0 6px 20px rgba(245, 87, 108, 0.3); transition: transform 0.3s; cursor: pointer;">
							<div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
							<h3 style="font-size: 1.5rem; margin-bottom: 10px;">Tournois</h3>
							<p style="opacity: 0.9; font-size: 0.95rem;">Participe ou crée ton propre tournoi</p>
						</div>
					</a>
				</div>
				<div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
					<h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">📊 Activité Récente</h2>
					<div id="recent-activity" style="display: grid; gap: 15px;">
						<div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #4caf50;">
							<div style="font-size: 2rem;">🏆</div>
							<div style="flex: 1;">
								<div style="font-weight: bold; color: #333;">Victoire contre Player42</div>
								<div style="color: #666; font-size: 0.9rem;">Score: 5-3 • Il y a 2 heures</div>
							</div>
						</div>
						<div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #2196f3;">
							<div style="font-size: 2rem;">🎖️</div>
							<div style="flex: 1;">
								<div style="font-weight: bold; color: #333;">Nouveau badge débloqué</div>
								<div style="color: #666; font-size: 0.9rem;">"Série de 5 victoires" • Il y a 3 heures</div>
							</div>
						</div>
						<div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #ff9800;">
							<div style="font-size: 2rem;">⬆️</div>
							<div style="flex: 1;">
								<div style="font-weight: bold; color: #333;">Progression au classement</div>
								<div style="color: #666; font-size: 0.9rem;">#15 → #12 • Hier</div>
							</div>
						</div>
					</div>
				</div>
				<canvas id="pong-canvas" width="1000" height="400" style="display: none; margin: 40px auto; border: 2px solid #333; border-radius: 10px;"></canvas>
				<div id="dashboard" style="display: none;"></div>
				<canvas class="graph" id="line-graph" width="210" height="200" style="display: none;"></canvas>
			</div>
		</main>`;
	}

	connectedCallback() {
		const playBtn = this.querySelector('#play-button');
		playBtn?.addEventListener('click', () => {
			window.location.hash = 'game';
		});

		const cards = this.querySelectorAll('a > div');
		cards.forEach(card => {
			card.addEventListener('mouseenter', () => {
				(card as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
			});
			card.addEventListener('mouseleave', () => {
				(card as HTMLElement).style.transform = 'translateY(0) scale(1)';
			});
		});
	}
}

customElements.define('home-page', HomePage);