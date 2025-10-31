import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import  WebSocket, { WebSocketServer, } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	gray: '\x1b[90m'
};

const server = Fastify({ logger: false });
const pendingLogs = new Map<string, { logStart: string; startTime: number }>();

server.addHook('onRequest', async (request) => {
	const time = new Date().toLocaleTimeString('fr-FR');
	const method = request.method;
	const url = request.url;

	const methodColor =
		method === 'GET' ? colors.green :
			method === 'POST' ? colors.blue :
				method === 'PUT' ? colors.yellow :
					method === 'DELETE' ? colors.red : colors.white;

	const logStart = `${colors.gray}[${time}]${colors.reset} ${methodColor}${method}${colors.reset} ${colors.cyan}${url}${colors.reset}`;
	pendingLogs.set(request.id, { logStart, startTime: Date.now() });
});

server.addHook('onResponse', async (request, reply) => {
	const logData = pendingLogs.get(request.id) || { logStart: '', startTime: Date.now() };
	const base = logData.logStart;
	const calculatedResponseTime = Date.now() - logData.startTime;
	pendingLogs.delete(request.id);

	const status = reply.statusCode;
	const statusColor =
		status >= 500 ? colors.red :
			status >= 400 ? colors.yellow :
				status >= 300 ? colors.cyan :
				colors.green;

	console.log(`${base} ${colors.gray}→ ${colors.reset}${statusColor}${status}${colors.reset} ${colors.dim}(${calculatedResponseTime}ms)${colors.reset}`);
});

server.register(fastifyCors, {
	origin: true,
	credentials: true
});

server.register(fastifyStatic, {
	root: join(__dirname, '../../public'),
	prefix: '/',
});

server.get('/api/auth/status', async (request, reply) => {
	return { loggedIn: false };
});

server.post('/api/login', async (request, reply) => {
	const { username, password } = request.body as any;

	if (username && password) {
		return { success: true, message: 'Login successful' };
	}

	reply.code(401);
	return { success: false, message: 'Invalid credentials' };
});

server.post('/api/register', async (request, reply) => {
	const { username, password } = request.body as any;

	if (username && password) {
		return { success: true, message: 'Registration successful' };
	}

	reply.code(400);
	return { success: false, message: 'Invalid data' };
});

server.setNotFoundHandler((request, reply) => {
	reply.sendFile('index.html');
});

async function findAvailablePort(startPort: number, maxAttempts: number = 10): Promise<number> {
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		const testPort = startPort + attempt;
		try {
			await server.listen({ port: testPort, host: HOST });
			return testPort;
		} catch (err: any) {
			if (err.code === 'EADDRINUSE') {
				console.log(
					`${colors.yellow}⚠️  Port ${testPort} already in use${colors.reset}, ` +
					`${colors.dim}trying ${testPort + 1}...${colors.reset}`
				);
				continue;
			}
			throw err;
		}
	}
	throw new Error(`Could not find available port after ${maxAttempts} attempts`);
}

const start = async () => {
	try {
		const actualPort = await findAvailablePort(PORT);

		console.log(`
${colors.bright}${colors.magenta}╔════════════════════════════════════════╗${colors.reset}
${colors.bright}${colors.magenta}║${colors.reset}  🚀 ${colors.bright}${colors.cyan}Transcendence Server${colors.reset}              ${colors.bright}${colors.magenta} ║${colors.reset}
${colors.bright}${colors.magenta}║${colors.reset}                                        ${colors.bright}${colors.magenta}║${colors.reset}
${colors.bright}${colors.magenta}║${colors.reset}  🌐 ${colors.bright}${colors.green}http://localhost:${actualPort}${colors.reset}${actualPort >= 10000 ? '' : ' '}             ${colors.bright}${colors.magenta}║${colors.reset}
${colors.bright}${colors.magenta}║${colors.reset}  📁 ${colors.gray}Static files: /public${colors.reset}              ${colors.bright}${colors.magenta}║${colors.reset}
${colors.bright}${colors.magenta}╚════════════════════════════════════════╝${colors.reset}
`);

		if (actualPort !== PORT) {
			console.log(
				`${colors.blue}ℹ️  Note:${colors.reset} Port ${colors.red}${PORT}${colors.reset} was busy, ` +
				`using ${colors.green}${actualPort}${colors.reset} instead\n`
			);
		}
		
		//WS TEST

		const server = new WebSocketServer({ port: 8080 });
		var clients = [];

		server.on('connection', (socket:WebSocket) => {
			console.log('Client connected');
			clients.push(socket);

			socket.on('message', (message:string) => {
				console.log('Received message:', message);

				clients.forEach(function(client) {
					if (client != socket)
						client.send(`${message}`);
				});
			});

			socket.on('close', () => console.log('Client disconnected'));
		});

		console.log("WebSocket server running on ws://localhost:8080");
		//WS TEST</>

	} catch (err: any) {
		if (err.code === 'EADDRINUSE') {
			console.error(`\n${colors.red}❌ Error: Port ${PORT} is already in use!${colors.reset}`);
			console.error(`${colors.yellow}💡 Try one of these solutions:${colors.reset}`);
			console.error(`   ${colors.cyan}1.${colors.reset} Kill the process using port ${PORT}:`);
			console.error(`      ${colors.dim}lsof -ti:${PORT} | xargs kill -9${colors.reset}`);
			console.error(`   ${colors.cyan}2.${colors.reset} Change the port in .env:`);
			console.error(`      ${colors.dim}PORT=3001 npm run dev${colors.reset}`);
			console.error(`   ${colors.cyan}3.${colors.reset} Find what's using the port:`);
			console.error(`      ${colors.dim}lsof -i:${PORT}${colors.reset}\n`);
		} else {
			console.error(`${colors.red}❌ Failed to start server:${colors.reset}`, err);
		}
		process.exit(1);
	}
};

start();
