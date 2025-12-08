import { renderHome} from './pages/home.js';
import { renderHistory, DevHistory } from './pages/history.js';
import { renderMatch, DevGame } from './pages/match.js';
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
	logs.innerHTML = "Connection to API";

	await wait30ms();

	let isLoggedIn = false;
	let username = null;

	const token = localStorage.getItem('token');
	console.log('voici le token :', token);
	if (!token) {
		console.log('Token pas stock');
		return [false, null];
	}
	try {
		const res = await fetch('/api/auth/status', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (res.ok) {
			const r = await res.json();
			console.log('login successsfulllll');
		//	isLoggedIn = r.loggedIn;
			//username = TODO
			return [true, r.user];
			
		} else {
			console.log('token invalideeee, suppressionnnn');
			localStorage.removeItem('token');
			return [false, null];
		}
	}
	catch {
		logs.innerHTML = "Erreur fetch auth";
		logs.style.color = "red";
		localStorage.removeItem('token');
		return [false, null];
	}
	
	if (!isLoggedIn && location.pathname != '/') {
		history.pushState({}, '', '/');
		window.dispatchEvent(new PopStateEvent('popstate'));
		return [false, null];
	}
	await wait30ms();
	
	console.log("USERNAME:", username);
	
	logs.innerHTML = "Connection to WebSocket";
	const user = new ChatUser(username);
	const isOpen = await user._waitWs(user.ws);
	if (!isOpen) {
		logs.innerHTML = "Erreur WebSocket User";
		logs.style.color = "red";
	}
	await wait30ms();
	return [isOpen, user];
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
			root.innerHTML = '<app-def><main style="margin-left: 100px; padding: 20px; background: black; color: #00ff00; min-height: 100vh;"><h1>👤 settings - Coming Soon!</h1></main><app-def>';
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
