import WebSocket, {WebSocketServer} from 'ws';
import {FastifyInstance} from 'fastify';

class Client
{
	socket: WebSocket
	username: string
	id: number
	friendList: [number, number][]
	constructor(_socket:WebSocket)
	{
		this.socket = _socket;
		this.username = "TBD";
		this.id = 0
		this.friendList = [];
	}

	async user(name: string, db:any)
	{
		this.username = name;
		console.log("this.username:", this.username);

		await db.each(`SELECT id_user,username FROM users`, (err:any, row:any) => {console.log("ALLROW:", row)});
		await db.each(`SELECT id_user FROM users WHERE username='${this.username}'`, (err:any, row:any) => {this.id = row.id_user});
		await db.each(`SELECT id_friend, flag FROM friends WHERE id_user = '${this.id}'`, (err:any, row:any) =>
		{
			console.log("friend,flag:", row.id_friend, row.flag);
			this.friendList.push([row.id_friend, row.flag]);
		});
			//await db.all(`SELECT msg FROM msgs WHERE id_from = '${this.id}' OR id_to = '${this.id}' ORDER BY date`,
			//	(err:any, row:any) => {
			//	console.log("ALL MSG:", row);
		//sendALL(msg[], friend)
			//})
		console.log("USER IS LOGIN; friendList:", this.friendList);
	}

	send(message:string, from:Client)
	{
		this.socket.send(`msg+${from.username}+${message}`)
	}

	sendALL(messages:string[], from_name:string)
	{
		this.socket.send(`allMsgStart+${from_name}+.`);
		for (let msg of messages)
		{
			this.socket.send(`msg+${from_name}+${msg}`)
		}
		this.socket.send(`allMsgEnd+${from_name}+.`);
		return;
	}
}

class WsServ
{
	port: number
	server: WebSocketServer
	clients: Client[]
	db: any //need to find type!!!
	constructor(_port:number, SQLserver: FastifyInstance)
	{
		this.port = _port;
		this.clients = [];
		this.server = new WebSocketServer({ port: this.port});

		this.server.on('connection', (socket:WebSocket) => {
			this.connection(socket);
			socket.on('message', (message:string) => this.msg(`${message}`, socket));
			socket.on('close', () => this.deco(socket));
		});

		console.log(`WebSocket server running on wss://localhost:${this.port}`);
		this.db = SQLserver.db;
	}

	tmp()
	{
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('bastien','a@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('gaby','b@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('maelys','c@mail.com','123')`);
		await this.db.run(`INSERT INTO friends(id_user, id_friend, flag) VALUES('1','2','0')`);
		await this.db.run(`INSERT INTO friends(id_user, id_friend, flag) VALUES('1','3','0')`);
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
				client.user(arg, this.db);
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

	async sendTo(message:string, to:string, from:Client)
	{
		var pal;
		for (let client of this.clients)
		{
			if (client.username == to)
			{
				pal = client;
				break ;
			}
		}
		await this.db.each(`SELECT flag FROM friends WHERE id_friend = '${from.id}' AND id_user = '${pal.id}'`, (err:any, row:any) =>
		   {
			//test if blocked
		});
		pal.send(message, from);
		await this.db.run(`INSERT INTO msgs(msg, id_from, id_to) VALUES(?, ?, ?)`, message, from.id, pal.id);

		
			//await db.all(`SELECT msg FROM msgs WHERE id_from = '${this.id}' OR id_to = '${this.id}' ORDER BY date`,
		//verif si blocker ou pas
		//ajouter au sql
		return ;
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(port, server);
}
