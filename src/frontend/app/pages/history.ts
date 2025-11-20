import '../ui/navbar.js';
import '../ui/chat.js';
import { ChatUser } from '../components/chat/chat.js'

//TODO dashboard/profile/historic = 1thing; need to acces other player profile 2

export function renderHistory() {
	return `
		<app-navbar></app-navbar>
		<app-chat></app-chat>
		<main class="content-area" style="padding: 20px;">
			<div style="max-width: 1200px; margin: 0 auto;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="font-size: 2.5rem; margin-bottom: 10px; color: #333;">📊 Historique des Matchs</h1>
					<p style="color: #666; font-size: 1.1rem;">Retrouve tous tes matchs passés</p>
				</div>
				<div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
					<div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
						<select id="match-filter" style="padding: 10px 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; cursor: pointer;">
							<option value="all">Tous les matchs</option>
							<option value="win">Victoires</option>
							<option value="loss">Défaites</option>
							<option value="pvp">PvP uniquement</option>
							<option value="ai">vs IA uniquement</option>
						</select>
						<input type="date" id="date-filter" style="padding: 10px 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
						<button id="reset-filters" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
							🔄 Réinitialiser
						</button>
					</div>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
					<div style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);">
						<div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">Total Victoires</div>
						<div id="stat-win" style="font-size: 2.5rem; font-weight: bold;">28</div>
					</div>
					<div style="background: linear-gradient(135deg, #f44336 0%, #e57373 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);">
						<div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">Total Défaites</div>
						<div  id="stat-lose" style="font-size: 2.5rem; font-weight: bold;">15</div>
					</div>
					<div style="background: linear-gradient(135deg, #2196f3 0%, #64b5f6 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);">
						<div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">Win Rate</div>
						<div id="stat-win-rate" style="font-size: 2.5rem; font-weight: bold;">65%</div>
					</div>
					<div style="background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);">
						<div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">Série actuelle</div>
						<div id="stat-win-streak"style="font-size: 2.5rem; font-weight: bold;">+5 🔥</div>
					</div>
				</div>
				<div id="match-list" style="display: flex; flex-direction: column; gap: 15px;">
				</div>
			</div>
		</main>`;
}

export function DevHistory(user:ChatUser, name:string) {
	console.log("TEST");
	//TODO implement flag option!
	//victory only
	//lose only
	//pvp only
	//ia only
	user.askHistoric(name, 0);
}

