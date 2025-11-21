import WebSocket, {WebSocketServer} from 'ws';
import {FastifyInstance} from 'fastify';
import {Client} from './client.js';
import {ARoom} from './Aroom.js';
import {MMRoom} from './MMroom.js';
import {TRoom} from './Troom.js';
import {getIdByName, getNameById, getFlagFriendShip, getHistoricById} from './sqlGet.js'


interface Dictionary<T> {
    [Key: string]: T;
}


class WsServ
{
	server: WebSocketServer
	clients: Client[] = [];
	rooms: Record<number, ARoom> = {};
	roomsIds: number = 1;
	db: any //need to find type!!!
	constructor(_port:number, SQLserver: FastifyInstance)
	{
		this.server = new WebSocketServer({ port: _port});

		this.server.on('connection', (socket:WebSocket) => {
			this.connection(socket);
			socket.on('message', (message:string) => this.msg(`${message}`, socket));
			socket.on('close', () => this.deco(socket));
		});

		this.db = SQLserver.db;
		this.tmp() //TODO retirer car c sencer etre automatique!
	}

	async tmp()
	{
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('bastien','a@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('gaby','b@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('maelys','c@mail.com','123')`);
		await this.db.run(`INSERT INTO users(username, email, password) VALUES('youenn','d@mail.com','123')`);

		const idB = await getIdByName('bastien', this.db);
		const idM = await getIdByName('maelys', this.db);

		await this.db.run(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`, ["test",idB, idM,"1","0"]);
		await this.db.run(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`, ["vsi",idB, idM,"0","1"]);
		await this.db.run(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`, ["ftg",idB, idM,"3","1"]);
		await this.db.run(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`, ["jpp",idB, idM,"3","1"]);
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
		//TODO clear rooms?
	}

	msg(message:string, socket:WebSocket)
	{
		if (message == "ping+x+x")
		{
			socket.send(`pong+x+x+x`);
			return ;
		}
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
		var [type, arg, ...X] = message.split('+');
		const content = X.join('+');

		switch (type) {
			case 'user':
			{
				if (this.clients.length == 2)
					arg = "youenn"; //TODO
				client.user(arg, this.db);
				break;
			}
			case 'msg':
				this.sendTo(content, arg, client);
				break;
			case 'add':
				this.addFriend(arg, client);
				break;
			case 'block':
				this.block(client, arg, parseInt(content, 10))
				break;
			case 'invite':
				break;

			case 'roomCreate':
				this.createRoom(client);
				break;
			case 'roomAddPlayer':
				break;
			case 'roomAddBot':
				break;
			case 'roomKickPlayer':
				break;
			case 'roomJoin':
				break;
			case 'gameInput':
				this.rooms[client.roomId!].gameInput(client, arg, content);
				break;
			case 'findGame':
				this.findGame(client);
				break;
			case 'getHistoric':
				this.getHistoric(client, arg, parseInt(content));
			default:
				break;
		}
	}

	createRoom(client: Client)
	{
		var GameRoom = new TRoom(this.roomsIds, 1, this.db);
		this.rooms[this.roomsIds] = GameRoom;
		this.roomsIds += 1;
		GameRoom.addPlayer(client, client.username);
		client.setRoomId(GameRoom.id);
	}

	findGame(client: Client)
	{
		//TODO destroy rooms after using it!!  avec delete rooms[id]
		//ATTENTION ID = index -> va causer de lourd degat!
		//faire un dico ig?
		var GameRoom;
		find : {
			for (let k in this.rooms)
			{
				var room = this.rooms[k];
				if (room.isOpenForMM() == 0)
					continue ;
				GameRoom = room;
				break find;
			}
			GameRoom = new MMRoom(this.roomsIds, 0, this.db);
			this.rooms[this.roomsIds] = GameRoom;
			this.roomsIds += 1;
		}
		GameRoom.addPlayer(client, client.username);
		client.setRoomId(GameRoom.id);
	}

	async getHistoric(client: Client, name:string, flag:number)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
		{
			client.socket.send(`historic+noUser+user not found+x`);
			return ;
		}

		const games = await getHistoricById(id, this.db);
		if (games != undefined)
		{
			for (let game of games)
			{
				const p1_name = await getNameById(game.id_p1, this.db);
				var p2_name;
				if (game.id_p2)
					p2_name = await getNameById(game.id_p2, this.db);
				else
					p2_name = "-";
				client.socket.send(`historic+${game.match_type}+${p1_name}#${p2_name}+${game.score_p1}#${game.score_p2}`);
			}
		}
		client.socket.send(`historic+endb+x+x`);
	}

	async block(client: Client, name:string, flag:number)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
			return ;

		const nb = await this.db.get(`SELECT COUNT(1) AS nb FROM friends WHERE id_self = ? AND id_friend = ?`, [client.id, id])
		if (nb == undefined)
			return ;

		if (nb.nb != 0)
			await this.db.run(`UPDATE friends SET flag = ? WHERE id_self = ? AND id_friend = ?`, [flag, client.id, id]);
		else
			await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES(?, ?, ?)`, [client.id, id, flag]);
	}

	async addFriend(name:string, from:Client)
	{
		const id = await getIdByName(name, this.db);
		if (id == undefined)
			from.socket.send(`add+${name}+no+user doest not exist`);
		else
			from.socket.send(`add+${name}+x+x`);
	}

	async newFriendShip(from:Client, o_id:number)
	{
		const nb = await this.db.get(`SELECT COUNT(1) AS nb FROM friends WHERE id_self = ? AND id_friend = ?`, [from.id, o_id]); 
		if (nb.nb == 0)
			await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES(?, ?, ?)`, [from.id, o_id, 1]);


		const nbR = await this.db.get(`SELECT COUNT(1) AS nb FROM friends WHERE id_friend = ? AND id_self = ?`, [from.id, o_id]);
		if (nbR.nb != 0)
			if (o_id != from.id) //TODO SUPPR C JUSTE POUR LES TEST CA
				await this.db.run(`INSERT INTO friends(id_self, id_friend, flag) VALUES(?, ?, ?)`, [o_id, from.id, 1]);
	}

	async sendTo(message:string, to:string, from:Client)
	{
		const id = await getIdByName(to, this.db);
		if (id == undefined)
			return ;

		await this.newFriendShip(from, id);
		await this.db.run(`INSERT INTO msgs(msg, id_from, id_to) VALUES(?, ?, ?)`, [message, from.id, id]);

		const flag = await getFlagFriendShip(from.id, id, this.db);
		if (flag == undefined)
			return ;

		var pal = null;
		for (let client of this.clients)
		{
			if (client.username == to)
			{
				pal = client;
				break ;
			}
		}
		if (pal && flag == 1)
			pal.send(message, from);
		return ;
	}
}

export function WSServInit(port:number, server:FastifyInstance)
{
	const serv = new WsServ(8080, server);
}
