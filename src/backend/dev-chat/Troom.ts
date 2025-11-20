import {Client} from './client.js';
import {DevPongGame} from './pongLib/game.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ARoom} from './Aroom.js'

export class TRoom extends ARoom {
	assignPlayer()
	{
		this.p1 = this.players[0];
		this.p1!.socket.send(`game+start+Left+x`);

		this.p2 = this.players[1];
		this.p2!.socket.send(`game+start+Right+x`);

		//game+start+Streaming+x
	}

	addPlayer(user:Client, name:string)
	{

	}

	gameInput(client: Client, arg: string, content:string)
	{

	}

	endGame()
	{

	}
}
