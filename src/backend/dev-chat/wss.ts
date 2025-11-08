import WebSocket, {WebSocketServer} from 'ws';
import {FastifyInstance} from 'fastify';

class Client
{
	socket: WebSocket
	username: string
	id: number
	friendList: [number, number, string][]
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
		await db.each(`SELECT friends.id_friend, friends.flag, users.username FROM friends JOIN users ON users.id_user = friends.id_friend WHERE id_self = '${this.id}'`, (err:any, row:any) =>
		{
			this.friendList.push([row.id_friend, row.flag, row.username]);
		});
		await db.each(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = '${this.id}' OR id_to = '${this.id}' ORDER BY date`, (err:any, row:any) => {
			console.log("ALL MSG:", row);
			this.sendOldMsg(row.msg, row.id_from, row.id_to);
		});
		console.log("USER IS LOGIN; friendList:", this.friendList);
	}

	send(message:string, from:Client)
	{
		this.socket.send(`msg+${from.username}+${this.username}+${message}`)
	}

	sendOldMsg(message:string, from_id:number, to_id:number)
	{
		var from, to;
		if (from_id == this.id)
			from = this.username;
		if (to_id == this.id)
			to = this.username;
		for (let fr of this.friendList)
		{
			if (fr[0] == from_id)
				from = fr[2];
			if (fr[0] == to_id)
				to = fr[2];
		}
		this.socket.send(`msg+${from}+${to}+${message}`);
	}
}

class WsServ
{
	port: number
	server: WebSocketServer
	clients: Client[]
	db: any //need to find type!!!
	tmpPalId: number | null
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
		this.tmp() //TODO retirer car c sencer etre automatique!
		this.tmpPalId = null;
	}

	async tmp()
	{
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('bastien','a@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('gaby','b@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('maelys','c@mail.com','123')`);
		await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES('1','2','0')`);
		await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES('1','3','0')`);
		await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES('1','1','0')`);
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
		this.tmpPalId = null; //jcrois c pas bien => va jalloir enfiler les fonction...
		console.log(`SELECT id_user FROM users WHERE username = '${to}'`);
		await this.db.each(`SELECT id_user FROM users WHERE username = '${to}'`, (err:any, row:any) => {
			console.log("PALID???:", row);
			this.tmpPalId = row.id_user;
		});
		console.log("PALID:", this.tmpPalId);

		if (this.tmpPalId == null)
			return ;

		await this.db.each(`SELECT flag FROM friends WHERE id_friend = '${from.id}' AND id_self = '${this.tmpPalId}'`, (err:any, row:any) => {
			console.log("TEST FRIENDSHIP:", row);
			//test if blocked
		});

		//if not blocked
		await this.db.run(`INSERT INTO msgs(msg, id_from, id_to) VALUES(?, ?, ?)`, [message, from.id, this.tmpPalId]);

		var pal = null;
		for (let client of this.clients)
		{
			if (client.username == to)
			{
				pal = client;
				break ;
			}
		}
		if (pal) //and not blocked
		{
			pal.send(message, from);
		}
		
		return ;
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(port, server);
}
