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

		await db.each(`SELECT id_user FROM users WHERE username='${this.username}'`, (err:any, row:any) => {this.id = row.id_user});
		await db.each(`SELECT friends.id_friend, friends.flag, users.username FROM friends JOIN users ON users.id_user = friends.id_friend WHERE id_self = '${this.id}'`, (err:any, row:any) =>
		{
			this.friendList.push([row.id_friend, row.flag, row.username]);
		});

		await db.each(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = '${this.id}' OR id_to = '${this.id}' ORDER BY date`, async (err:any, row:any) => {
			await this.sendOldMsg(row.msg, row.id_from, row.id_to);
		});

		console.log("USER IS LOGIN; friendList:", this.friendList);
		await db.each(`SELECT id_friend,id_self FROM friends`, (err:any, row:any) => {console.log("RS:", row)});

		//TODO AJOUTER LIST BLOCKER!!
		this.socket.send(`endDb+x+x+end of stored msg`);
	}

	send(message:string, from:Client)
	{
		this.socket.send(`msg+${from.username}+${this.username}+${message}`)
	}

	async sendOldMsg(message:string, id_from:number, id_to:number)
	{
		var get_name = (id:number) => {
			for (let fr of this.friendList)
			{
				if (fr[0] == id)
					return fr;
			}
			return [-1, -1, "no"];
		}
		var from, to, _, flag;
		if (id_from == this.id)
		{
			from = this.username;
			[_,flag,to] = get_name(id_to);
		}
		else
		{
			to = this.username;
			[_,flag,from] = get_name(id_from);
		}
		if (flag == 1)
			this.socket.send(`msg+${from}+${to}+${message}`);
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
		this.tmp() //TODO retirer car c sencer etre automatique!
	}

	async tmp()
	{
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('bastien','a@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('gaby','b@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('maelys','c@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('youenn','d@mail.com','123')`);
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
			case 'add':
				this.addFriend(arg, client);
				break
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

	async addFriend(name:string, from:Client)
	{
		await this.db.each(`SELECT id_user FROM users WHERE username = '${name}'`, (err:any, row:any) => {
			
			from.socket.send(`add+${name}+x+x`);
		});
		from.socket.send(`add+${name}+no+user doest not exist`);
	}

	async newFriendShip(from:Client, o_id:number)
	{
		await this.db.each(`SELECT COUNT(1) AS nb FROM friends WHERE id_self = ${from.id} AND id_friend = ${o_id}`, async (err:any, row:any) =>{
			if (row.nb != 0)
				return ;
			await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES(?, ?, ?)`, [from.id, o_id, 1]);
			if (o_id != from.id) //TODO SUPPR C JUSTE POUR LES TEST CA
				await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES(?, ?, ?)`, [o_id, from.id, 1]);
		});
	}

	async sendTo(message:string, to:string, from:Client)
	{
		await this.db.each(`SELECT id_user as id_to FROM users WHERE username = '${to}'`, async (err:any, row:any) => {
			await this.newFriendShip(from, row.id_to);
			await this.db.run(`INSERT INTO msgs(msg, id_from, id_to) VALUES(?, ?, ?)`, [message, from.id, row.id_to]);

			await this.db.each(`SELECT flag FROM friends WHERE id_friend = '${from.id}' AND id_self = '${row.id_to}'`,
				(blockErr:any, blockRow:any) => {

				var pal = null;
				for (let client of this.clients)
				{
					if (client.username == to)
					{
						pal = client;
						break ;
					}
				}
				if (pal && blockRow.flag == 1)
				{
					pal.send(message, from);
				}
				
				return ;
			});
		});
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(port, server);
}
