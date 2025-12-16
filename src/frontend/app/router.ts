import { renderHome } from './pages/home.js';
import { renderHistory, DevHistory } from './pages/history.js';
import { renderMatch, DevGame } from './pages/match.js';
import { renderSettings, DevSettings } from './pages/settings.js';
import './ui/navbar.js';
import './ui/chat.js';
import './ui/match.js';
import { devChat } from './pages/chat.js';
import { ChatUser } from './components/chat/chat.js'

import { renderDevTest, initDevTest } from './pages/dev-test.js';
import { renderWaitScreen } from './pages/waitScreen.js';

function wait30ms(x:number = 1) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(x);
		}, 30);
	});
}

async function connection(logs: HTMLElement): Promise<[boolean, ChatUser | null]> {
	logs.innerHTML = "Connection";

	function error(msg:string): [boolean, null] {
		logs.innerHTML = `Error: ${msg}`;
		logs.style.color = "red";
		return [false, null];
	}

	let isLoggedIn = false;
	let username = null;
	if (window.location.protocol != 'https:')
		return error("http");

	const token = localStorage.getItem('token');
	if (token) {
		try {
			const res = await fetch('/api/auth/status', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (res.ok) {
				const r = await res.json();
				isLoggedIn = r.loggedIn;
				username = r.user.username;

			}
			else {
				localStorage.removeItem('token');
			}
		}
		catch {
			localStorage.removeItem('token');
			return error("auth");
		}
	}
	localStorage.setItem('isLoggedIn', isLoggedIn.toString());
	
	if (!isLoggedIn && location.pathname != '/') {
		history.pushState({}, '', '/');
		window.dispatchEvent(new PopStateEvent('popstate'));
		window.location.reload();
		return [false, null];
	}

	const user = new ChatUser(username);
	if (!await user._waitWs(user.ws))
		return error("websocket");
	return [true, user];
}

function render(root: HTMLElement, user: ChatUser | null, allpath: string) {
	if (!user)
		return ;

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
		case 'settings':
			root.innerHTML = renderSettings();
			DevSettings(user);
			break;
		default:
			root.innerHTML = renderHome();
		break;
	}
	devChat(user);
}

export async function initRouter() {
	const root = document.getElementById('app')!;

	root.innerHTML = renderWaitScreen();
	var [isOpen, user] = await connection(document.getElementById('logs-waiting-screen')!);

	if (!isOpen || !user)
		return ;

	window.addEventListener('popstate', () => render(root, user, location.pathname));
	render(root, user, location.pathname);
}
