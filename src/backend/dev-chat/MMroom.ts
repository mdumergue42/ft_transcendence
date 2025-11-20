import {Client} from './client.js';
import {DevPongGame} from './pongLib/game.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ARoom} from './Aroom.js'

export class MMRoom extends ARoom {
	assignPlayer()
	{
		var keys = Object.keys(this.players);
		this.p1 = this.players[Number(keys[0])];
		this.p1!.socket.send(`game+start+Left+x`);

		this.p2 = this.players[Number(keys[1])];
		this.p2!.socket.send(`game+start+Right+x`);
	}

	addPlayer(user:Client, _:string)
	{
		this.players[user.id] = user;
		
		if (this.isOpenForMM() == 1 && Object.keys(this.players).length == 2)
			this.startGame();
	}

	gameInput(client: Client, arg: string, content:string)
	{
		var player;
		if (client == this.p1)
			player = this.game.p1;
		else if (client == this.p2)
			player = this.game.p2;
		else
			return ;
		const value = arg == "up" ? 0 : 1;
		const coordinal = content == "up" ? 0 : 1;
		player!.keysPressed[coordinal] = value;
	}

	endGame()
	{
		clearInterval(this.newFrameInterval);
		this.inGame = 0;
		this.broadCast(`game+end+TODO+x`); //TODO (client side)
		this.addMatch(this.p1!, this.p2!, this.game.score!.x, this.game.score!.y, "1vs1");
		this.p1 = null;
		this.p2 = null;
		this.game.endGame();
		if (this.flag == 0)
			this.kickAllPlayers();
	}

	async addMatch(p1: Client, p2: Client, score_p1: number, score_p2: number, type: string)
	{
		await this.db.run(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`,
			[type, p1.id, p2.id, score_p1, score_p2]);
	}
}
