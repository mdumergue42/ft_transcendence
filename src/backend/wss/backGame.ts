import {Player} from '../pongLib/player.js'
import {Ball} from '../pongLib/ball.js'
import {Vector2} from '../pongLib/vector2.js'
import {draw, resetCanvas} from '../pongLib/draw.js'
import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../pongLib/global.js'

export class PongGame
{
	p1: Player | null = null
	p2: Player | null = null
	ball: Ball | null = null
	score: Vector2 | null = null
	newFrame()
	{
		if (!this.p1 || !this.p2 || !this.ball || !this.score)
			return ;
		this.p1.move();
		this.p2.move();
		const res = this.ball.move(this.p1, this.p2);
		if (res != 0)
		{
			if (res == 2)
			{
				this.score.x += 1;
				this.ball.init(1);
			}
			else
			{
				this.score.y += 1;
				this.ball.init(0);
			}
			this.p1.init();
			this.p2.init();
		}
	}

	setGame(p1:Player, p2:Player, ball:Ball, score:Vector2)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.ball = ball;
		this.score = score;
	}
	initGame(p2isBot:boolean)
	{
		var mid = new Vector2(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.p1 = new Player(0, false);
		this.p2 = new Player(CANVAS_WIDTH, p2isBot);
		this.ball = new Ball(mid);
		this.score = new Vector2();
	}
	endGame()
	{
		this.p1 = null;
		this.p2 = null;
		this.ball = null;
		this.score = null;
	}
}
