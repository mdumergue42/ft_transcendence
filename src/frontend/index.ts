import { initRouter } from './app/router.js';
document.addEventListener('DOMContentLoaded', () => {
	const html = document.querySelector('html')!;
	html.setAttribute("data-theme", "green");

	initRouter();
});
