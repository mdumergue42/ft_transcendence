// src/main.ts
import './components/ui/modal-form.js';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('app')!;

	let modal = document.querySelector('login-modal')!;
	if (!modal) {
		modal = document.createElement('login-modal');
		document.body.appendChild(modal);
	}

	// Listen for the custom event to open the login modal
	document.addEventListener('login', () => {
		console.log('Opening login modal from main.ts');
		(modal as any).ShowModal();
	});

	// Load and display the specified component
	async function showPage(page: string) {
		const componentName = `${page}-page`;
		const moduleName = `./components/${page}.js`;
		try {
			await import(moduleName);
			container.innerHTML = `<${componentName} class="page"></${componentName}>`;
		} catch (err) {
			console.warn(`Could not load module ${moduleName}, falling back to home.`);
			await import('./components/home.js');
			container.innerHTML = `<home-page></home-page>`;
			window.location.hash = 'home';
		}
	}

	// Handle hash change and initial load
	function router() {
		const hash = window.location.hash.slice(1) || 'home';
		showPage(hash);
	}

	// Intercept nav link clicks
	document.body.addEventListener('click', (e) => {
		const a = (e.target as HTMLElement).closest('a[data-page]') as HTMLAnchorElement | null;
		if (!a) return;
		e.preventDefault();
		const page = a.dataset.page!;
		window.location.hash = page;
	});

	window.addEventListener('hashchange', router);
	router();
});
