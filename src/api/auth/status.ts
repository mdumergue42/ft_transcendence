// src/api/auth/status.ts
import { IncomingMessage, ServerResponse } from 'http';

export async function handleStatus(req: IncomingMessage, res: ServerResponse) {
	// fake loggedIn
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ loggedIn: false }));
}