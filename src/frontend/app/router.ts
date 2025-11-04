import { renderHome } from './pages/home.js';
import { renderHistory } from './pages/history.js';
import { renderMatch } from './pages/match.js';
import './ui/navbar.js';

import { renderChat, devChat } from './pages/chat.js';

import { renderDevTest, initDevTest } from './pages/dev-test.js';

export function initRouter() {
	const root = document.getElementById('app')!;

	function render(path: string) {
		switch (path) {
			case '/':
				root.innerHTML = renderHome();
				break;
			case '/match':
				root.innerHTML = renderMatch();
				break;
			case '/history':
				root.innerHTML = renderHistory();
				break;
			case '/ai':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>🤖 IA Mode - Coming Soon!</h1></main>';
				break;
			case '/tournament':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>🏆 Tournois - Coming Soon!</h1></main>';
				break;
			case '/stats':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>📈 Statistiques - Coming Soon!</h1></main>';
				break;
			case '/profil':
				root.innerHTML = '<app-navbar></app-navbar><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>👤 Profil - Coming Soon!</h1></main>';
				break;
			case '/chat':
				root.innerHTML = renderChat();
				devChat();
				break;
			case '/dev-test':
				root.innerHTML = renderDevTest();
				setTimeout(() => initDevTest(), 100);
				break;
			default:
				root.innerHTML = renderHome();
				break;
		}
	}

	window.addEventListener('popstate', () => render(location.pathname));
	render(location.pathname);
}
