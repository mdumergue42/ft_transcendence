import '../ui/navbar.js';

export class AIPage extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
		<app-navbar></app-navbar>
		<main class="content-area" style="padding: 20px;">
			<div style="max-width: 1200px; margin: 0 auto;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="font-size: 2.5rem; margin-bottom: 10px; color: #333;">🤖 Défi contre l'IA</h1>
					<p style="color: #666; font-size: 1.1rem;">Choisis ton niveau de difficulté et teste tes compétences</p>
				</div>
				<div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
					<h3 style="margin-bottom: 15px; color: #333;">⚙️ Niveau de l'IA</h3>
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
						<button class="difficulty-btn" data-level="easy" style="padding: 15px; background: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
							😊 Facile
						</button>
						<button class="difficulty-btn" data-level="medium" style="padding: 15px; background: #ff9800; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
							😐 Moyen
						</button>
						<button class="difficulty-btn active" data-level="hard" style="padding: 15px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s; box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.3);">
							😈 Difficile
						</button>
						<button class="difficulty-btn" data-level="impossible" style="padding: 15px; background: #9c27b0; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
							💀 Impossible
						</button>
					</div>
					<div style="margin-top: 15px; padding: 12px; background: #e3f2fd; border-radius: 6px; color: #1565c0; font-size: 14px;" id="difficulty-info">
						Niveau actuel : <strong>Difficile</strong> - L'IA réagit rapidement et anticipe tes mouvements
					</div>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 25px;">
					<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
						<div style="font-size: 2rem; font-weight: bold; color: #4caf50;">12</div>
						<div style="color: #666; font-size: 0.9rem;">Victoires</div>
					</div>
					<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
						<div style="font-size: 2rem; font-weight: bold; color: #f44336;">8</div>
						<div style="color: #666; font-size: 0.9rem;">Défaites</div>
					</div>
					<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
						<div style="font-size: 2rem; font-weight: bold; color: #ff9800;">60%</div>
						<div style="color: #666; font-size: 0.9rem;">Taux de victoire</div>
					</div>
					<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
						<div style="font-size: 2rem; font-weight: bold; color: #2196f3;">156</div>
						<div style="color: #666; font-size: 0.9rem;">Points totaux</div>
					</div>
				</div>
				<div style="text-align: center; margin-bottom: 30px;">
					<button id="start-ai-game" style="padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 50px; font-size: 1.2rem; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
						🎮 Commencer la partie
					</button>
				</div>
				<canvas id="ai-pong-canvas" width="1200" height="800" style="display: block; margin: 0 auto; border: 2px solid #333; border-radius: 8px; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"></canvas>
				<div style="max-width: 600px; margin: 30px auto; background: #f8f9fa; padding: 20px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
					<h3 style="color: #333; margin-bottom: 15px;">🎮 Contrôles</h3>
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; text-align: center;">
						<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
							<div style="font-weight: bold; color: #667eea; margin-bottom: 5px;">Joueur</div>
							<div style="font-size: 14px;">W ⬆️ / S ⬇️</div>
						</div>
						<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #333;">
							<div style="font-weight: bold; color: #333; margin-bottom: 5px;">Actions</div>
							<div style="font-size: 14px;">Espace = Pause<br>R = Reset</div>
						</div>
					</div>
				</div>
			</div>
		</main>`;
	}

	connectedCallback() {
		const difficultyBtns = this.querySelectorAll('.difficulty-btn');
		const difficultyInfo = this.querySelector('#difficulty-info');

		const difficultyTexts: Record<string, string> = {
			easy: 'Niveau actuel : <strong>Facile</strong> - L\'IA laisse passer quelques balles',
			medium: 'Niveau actuel : <strong>Moyen</strong> - L\'IA joue correctement',
			hard: 'Niveau actuel : <strong>Difficile</strong> - L\'IA réagit rapidement et anticipe tes mouvements',
			impossible: 'Niveau actuel : <strong>Impossible</strong> - Bonne chance... 💀'
		};

		difficultyBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				difficultyBtns.forEach(b => {
					(b as HTMLElement).style.boxShadow = 'none';
					b.classList.remove('active');
				});
				(btn as HTMLElement).style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.3)';
				btn.classList.add('active');

				const level = btn.getAttribute('data-level');
				if (level && difficultyInfo) {
					difficultyInfo.innerHTML = difficultyTexts[level];
				}
			});
		});

		const startBtn = this.querySelector('#start-ai-game');
		startBtn?.addEventListener('click', async () => {
			const activeBtn = this.querySelector('.difficulty-btn.active');
			const level = activeBtn?.getAttribute('data-level') || 'hard';

			try {
			/*	const { Pong } = await import('../components/pong/game.js');
				const gameInstance = Pong();

				if ((window as any).game && (window as any).game.p2) {
					(window as any).game.p2.ia = true;
					(window as any).game.p2.aiLevel = level;
				}*/
			} catch (error) {
				console.error('Erreur lors du chargement du jeu:', error);
			}
		});
	}
}

customElements.define('ai-page', AIPage);
