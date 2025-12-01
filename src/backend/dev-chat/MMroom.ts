import {Client} from './client.js';
import {PongGame} from './backGame.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ARoom} from './Aroom.js'
import {insertMatchs} from './sqlGet.js'

export class MMRoom extends ARoom {
	sendStartInfo(user: Client | null, names:[string, string], def:string)
	{
		if (!user)
			return 
		user.send({type: "game", tag: "start",
				  names:names, def:def});
	}

	getBothPlayer()
	{
		var p1, p2;
		if (this.flag <= 3) {
			p1 = this.players[0];
			p2 = this.players[1];
			return [p1, p2];
		}
		if (this.flag <= 5) {
			p1 = this.players[2];
			p2 = this.players[3];
			return [p1, p2];
		}
		p1 = this.flag % 2 == 0 ? this.players[0] : this.players[1];
		p2 = this.flag >= 8 ? this.players[3] : this.players[2];
		return [p1, p2];
	}

	assignPlayer()
	{
		[this.p1, this.p2] = this.getBothPlayer();
		console.log("ASSIGN PLAYER:", this.p1!.username, this.p2!.username)
		console.log(this.flag, Math.min(3, this.flag));

		var name = ["-", "-", "CP", this.p2 ? this.p2.username : "-"][Math.min(3, this.flag)];
		if (this.flag == 0 && this.p2)
			name = this.p2.username;
		const def = ["Online pvp", "pvp", "ai", "tournament"][Math.min(3, this.flag)];
		this.sendStartInfo(this.p1, [this.p1!.username, name], def);
		this.sendStartInfo(this.p2, [this.p1!.username, name], def);
		this.stream({type: "game",tag:"start",names:[this.p1!.username, name], def:`Watching: ${def}`});
	}

	reconnect(user:Client)
	{
		for (let k in this.players)
		{
			var p = this.players[k];
			if (p && user.id == p.id)
			{
				this.players[k] = user;
				var name = ["-", "-", "CP", this.p2 ? this.p2.username : "-"][Math.min(3, this.flag)];
				if (this.flag == 0 && this.p2)
					name = this.p2.username;
				const def = ["Online pvp", "pvp", "ai", "tournament"][Math.min(3, this.flag)];
				if (this.p1 && this.p1.id == user.id) {
					this.p1 = user;
					this.sendStartInfo(this.p1, [this.p1!.username, name], def);
				}
				else if (this.p2 && this.p2.id == user.id) {
					this.p2 = user;
					this.sendStartInfo(this.p2, [this.p1!.username, name], def);
				}
				else if (this.flag >= 3 && this.inGame)
					this.stream({type: "game",tag:"start",names:[this.p1!.username, name], def:`Watching: ${def}`});
				user.setinQ(1);
				return 1;
			}
		}
		return 0;
	}

	addPlayer(user:Client | null)
	{
		this.players.push(user);
		if (this.isOpenForMM() == 1 && this.players.length == 2)
			return 1;
		if (this.flag == 3) {
			let names = [];
			for (let k in this.players) {
				if (this.players[k]) {
					names.push(this.players[k].username);
				}
			}
			this.broadCast({type: "game", tag:"trList", list:names})
		}
		return 0;
	}

	gameInput(client: Client, msg:any)
	{
		var player;
		if (this.flag == 1) {
			player = msg.player == 1 ? this.game.p1 : this.game.p2;
		}
		else {
			if (msg.player == 2)
				return ;
			if (client == this.p1)
				player = this.game.p1;
			else if (client == this.p2)
				player = this.game.p2;
			else
				return ;
		}
		const value = msg.pressState == "up" ? 0 : 1;
		const coordinal = msg.dir == "up" ? 0 : 1;
		player!.keysPressed[coordinal] = value;
	}

	endGame()
	{
		clearInterval(this.intervals.ai);
		clearInterval(this.intervals.state);
		this.intervals = {ai: null, state: null};
		const desc = this.flag < 3 ?
			(this.flag < 2 ? "pvp" : "ai")
			:this.flag < 6 ? "Tournament 1/2" : "Tournament final";
		if (this.flag != 1)
			this.addMatch(this.p1!, this.p2, this.game.score!.x, this.game.score!.y, desc);
		if (this.flag > 2) {
			let win = this.game.score!.x >= 3;
			if (this.flag == 3)
				this.flag += win ? 1 : 2;
			else if (this.flag <= 5)
				this.flag += win ? 2 : 4;
			else
				this.inGame = 0;
			this.broadCast({type: "game", tag: "end"});
		}
		else {
			this.inGame = 0;
			this.broadCast({type: "game", tag: "end"});
		}
		this.p1 = null;
		this.p2 = null;
		this.game.endGame();
		if (this.inGame == 0)
			this.kickAllPlayers();
		else
			this.startGame();
	}

	async addMatch(p1: Client, p2: Client | null, score_p1: number, score_p2: number, type: string)
	{
		const id = p2 ? p2.id : -1;
		await insertMatchs(type, p1.id, id, score_p1, score_p2, this.db);
	}
}
