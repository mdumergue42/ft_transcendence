export function renderDevTest() {
	return `<div style="padding: 20px; font-family: monospace; background: #000; color: #0f0; min-height: 100vh;">
		<h1>DEV TEST - Codez ici vos tests</h1>

		<!-- === ZONE HTML DE TEST - MODIFIEZ ICI === -->
		<!-- Exemple: -->
		<!-- <form id="test-form" style="margin: 20px 0;">
			<input type="text" id="username" placeholder="Username" style="background: #000; color: #0f0; border: 1px solid #0f0; padding: 5px; margin: 5px;">
			<button type="submit" style="background: #000; color: #0f0; border: 1px solid #0f0; padding: 5px; margin: 5px;">Test</button>
		</form> -->

		<div id="output" style="background: #111; border: 1px solid #0f0; padding: 10px; min-height: 200px;"></div>
	</div>`;
}

declare global {
	interface Window {
		log: (message: any) => void;
		clear: () => void;
	}
}

export function initDevTest() {
	// Fonction helper pour afficher des résultats
	window.log = function(message: any) {
		const output = document.getElementById('output');
		if (output) {
			const time = new Date().toLocaleTimeString();
			output.innerHTML += `<div>[${time}] ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}</div>`;
			output.scrollTop = output.scrollHeight;
		}
	};

	// Fonction helper pour clear
	window.clear = function() {
		const output = document.getElementById('output');
		if (output) output.innerHTML = '';
	};

	// === ZONE DE TEST - MODIFIEZ ICI ===
	window.log("Page de test prête - modifiez initDevTest() pour vos tests");
}