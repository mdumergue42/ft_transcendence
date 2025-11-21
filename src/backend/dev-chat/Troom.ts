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
		this.p1!.send({type: "game", tag: "start", dir:"Left"});

		this.p2 = this.players[1];
		this.p2!.send({type: "game", tag: "start", dir:"Right"});

		//game+start+Streaming+x
	}

	addPlayer(user:Client, name:string)
	{

	}

	gameInput(client: Client, msg:any)
	{

	}

	endGame()
	{

	}
}
