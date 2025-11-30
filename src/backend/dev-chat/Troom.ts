import {Client} from './client.js';
import {PongGame} from './backGame.js'
import {Player} from './pongLib/player.js'
import {Ball} from './pongLib/ball.js'
import {Vector2} from './pongLib/vector2.js'
import {ARoom} from './Aroom.js'

export class TRoom extends ARoom {
	assignPlayer()
	{
		this.p1 = this.players[0];
		this.p2 = this.players[1];
		//game+start+Streaming+x
	}

	addPlayer(user:Client)
	{
		return 0;
	}

	gameInput(client: Client, msg:any)
	{

	}

	endGame()
	{

	}
	reconnect(user: Client)
	{
		return 0;
	}	
}
