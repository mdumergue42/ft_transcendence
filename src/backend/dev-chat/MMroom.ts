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

	assignPlayer()
	{
		this.p1 = this.players[0];
		this.p2 = this.players[1];
		var name = ["-", "-", "CP"][this.flag];
		if (this.flag == 0 && this.p2)
			name = this.p2.username;
		const def = this.flag < 2 ? "pvp" : "ai";
		this.sendStartInfo(this.p1, [this.p1!.username, name], def);
		this.sendStartInfo(this.p2, [this.p1!.username, name], def);
	}
	reconnect(user:Client)
	{
		for (let k in this.players)
		{
			var p = this.players[k];
			if (p && user.id == p.id)
			{
				this.players[k] = user;
				var name = ["-", "-", "CP"][this.flag];
				if (this.flag == 0 && this.p2)
					name = this.p2.username;
				const def = this.flag < 2 ? "pvp" : "ai";
				if (this.p1 && this.p1.id == user.id) {
					this.p1 = user;
					this.sendStartInfo(this.p1, [this.p1!.username, name], def);
				}
				if (this.p2 && this.p2.id == user.id) {
					this.p2 = user;
					this.sendStartInfo(this.p2, [this.p1!.username, name], def);
				}
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
		this.inGame = 0;
		this.broadCast({type: "game", tag: "end"}); //TODO (client side)
		if (this.flag != 1)
			this.addMatch(this.p1!, this.p2, this.game.score!.x, this.game.score!.y, this.flag < 2 ? "pvp" : "ai");
		this.p1 = null;
		this.p2 = null;
		this.game.endGame();
		this.kickAllPlayers();
	}

	async addMatch(p1: Client, p2: Client | null, score_p1: number, score_p2: number, type: string)
	{
		const id = p2 ? p2.id : -1;
		await insertMatchs(type, p1.id, id, score_p1, score_p2, this.db);
	}
}
