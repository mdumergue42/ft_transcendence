import WebSocket, {WebSocketServer} from 'ws';

class Client
{
	socket: WebSocket
	username: string
	constructor(_socket:WebSocket)
	{
		this.socket = _socket;
		this.username = "TBD";
	}

	user(name: string)
	{
		this.username = name;
	}

	send(message:string, from:Client)
	{
		this.socket.send(`msg+${from.username}+${message}`)
	}
}

class WsServ
{
	port: number
	server: WebSocketServer
	clients: Client[]
	constructor(_port:number)
	{
		this.port = _port;
		this.clients = [];
		this.server = new WebSocketServer({ port: this.port});

		this.server.on('connection', (socket:WebSocket) => {
			this.connection(socket);
			socket.on('message', (message:string) => this.msg(`${message}`, socket));
			socket.on('close', () => this.deco(socket));
		});

		console.log(`WebSocket server running on ws://localhost:${this.port}`);
	}

	connection(socket:WebSocket)
	{
		console.log('Client connected');
		this.clients.push(new Client(socket));
	}

	deco(socket:WebSocket)
	{
		console.log('Client disconnected')
		for (let index = 0; index < this.clients.length; index++)
		{
			if (this.clients[index].socket == socket)
			{
				this.clients.splice(index, 1);
				return ;
			}
		}
	}

	msg(message:string, socket:WebSocket)
	{
		console.log('Received message:', message);

		for (let client of this.clients)
		{
			if (client.socket == socket)
			{
				this.parsing(message, client);
				return ;
			}
		}
	}

	parsing(message:string, client:Client)
	{
		const [type, arg, ...X] = message.split('+');
		const content = X.join('+');

		switch (type) {
			case 'user':
				client.user(arg);
				//SEND ALL SQL INFO?
				break;
			case 'msg':
				this.sendTo(content, arg, client);
				break;
			case 'block':
				//arg = cible
				//content = null
				break;
			case 'invite':
				//arg = cible
				//content = room
			default:
				break;
		}
	}

	sendTo(message:string, to:string, from:Client)
	{
		for (let client of this.clients)
		{
			if (client.username == to)
				client.send(message, from);
		}
		//verif si blocker ou pas
		//ajouter au sql
		return ;
	}
}

export function WSServInit(port:number)
{
	const serv = new WsServ(port);
}
