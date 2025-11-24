import {Client} from './client.js';
import {DevPongGame} from './pongLib/game.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ARoom} from './Aroom.js'
import {insertMatchs} from './sqlGet.js'

export class MMRoom extends ARoom {
	assignPlayer()
	{
		this.p1 = this.players[0];
		this.p2 = this.players[1];

		const name = this.p2 ? this.p2.username : "CP";
		this.p1!.send({type: "game", tag: "start", dir:"Left",
						names:[this.p1!.username, name], def:"pvp"});
		if (this.p2)
			this.p2.send({type: "game", tag: "start", dir:"Right",
							names:[this.p1!.username, name], def:"pvp"});
	}

	addPlayer(user:Client | null, _:string)
	{
		this.players.push(user);
		if (this.isOpenForMM() == 1 && this.players.length == 2)
			this.startGame();
	}

	gameInput(client: Client, msg:any)
	{
		var player;
		if (client == this.p1)
			player = this.game.p1;
		else if (client == this.p2)
			player = this.game.p2;
		else
			return ;
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
		this.addMatch(this.p1!, this.p2, this.game.score!.x, this.game.score!.y, this.p2 == null ? "pvp" : "ai");
		this.p1 = null;
		this.p2 = null;
		this.game.endGame();
		if (this.flag == 0)
			this.kickAllPlayers();
	}

	async addMatch(p1: Client, p2: Client | null, score_p1: number, score_p2: number, type: string)
	{
		const id = p2 ? p2.id : -1;
		await insertMatchs(type, p1.id, id, score_p1, score_p2, this.db);
	}
}
