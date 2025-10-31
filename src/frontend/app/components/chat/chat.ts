var ws : WebSocket;

export function chat()
{
	console.log("CHAT");
	const msgInput = <HTMLInputElement>document.getElementById("msg");
    const sendBtn = <HTMLButtonElement>document.getElementById("send");
	const log = <HTMLPreElement>document.getElementById("log");

	if (log == null || msgInput == null || sendBtn == null)
		return ;

    ws = new WebSocket("ws://localhost:8080");

	ws.onopen = () => log.textContent += "Connected to server\n";
	ws.onmessage = (event) => log.textContent += "Server: " + event.data + "\n";
	ws.onclose = () => log.textContent += "Disconnected\n";	

	sendBtn.onclick = () => {
		const message = msgInput.value.trim();
		if (message) {
			ws.send(message);
			log.textContent += "You: " + message + "\n";
			msgInput.value = "";
		}
	};
}
