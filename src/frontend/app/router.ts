import { renderHome} from './pages/home.js';
import { renderHistory, DevHistory } from './pages/history.js';
import { renderMatch, DevGame } from './pages/match.js';
import './ui/navbar.js';
import './ui/chat.js';
import './ui/match.js';

import { devChat } from './pages/chat.js';
import { renderDevTest, initDevTest } from './pages/dev-test.js';
import { ChatUser } from './components/chat/chat.js'

export function initRouter() {
	const root = document.getElementById('app')!;
	const username = null; //TODO 
	const user = new ChatUser(username);

	function render(allpath: string) {
		let [_, path, ...arg]: string[] = allpath.split('/');

		switch (path) {
			case '':
				root.innerHTML = renderHome();
				break;
			case 'match':
				root.innerHTML = renderMatch();
				DevGame(user);
				break;
			case 'history':
				root.innerHTML = renderHistory();
				if (arg.length == 1)
					DevHistory(user, arg[0]);
				else
					DevHistory(user, user.username);
				break;
			case 'ai':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>🤖 IA Mode - Coming Soon!</h1></main>';
				break;
			case 'tournament':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>🏆 Tournois - Coming Soon!</h1></main>';
				break;
			case 'stats':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>📈 Statistiques - Coming Soon!</h1></main>';
				break;
			case 'profil':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>👤 Profil - Coming Soon!</h1></main>';
				break;
			case 'dev-test':
				root.innerHTML = renderDevTest();
				setTimeout(() => initDevTest(), 100);
				break;
			default:
				root.innerHTML = renderHome();
				break;
		}
		devChat(user);
	}

	window.addEventListener('popstate', () => render(location.pathname));
	render(location.pathname);
}
