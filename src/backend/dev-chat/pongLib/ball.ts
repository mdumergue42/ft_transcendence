import {Vector2} from './vector2.js'
import {Player} from './player.js'
import {collision} from './collision.js'
import {CANVAS_HEIGHT, CANVAS_WIDTH} from './global.js'

export class Ball
{
	mid: Vector2
	center: Vector2
	speed: Vector2
	speedUp: number
	r: number
    constructor(_mid: Vector2)
    {
		this.mid = _mid;

		this.center = new Vector2();
		this.speed = new Vector2();
		this.init()

		this.speedUp = 1.1;
		this.r = 5;
    }

	draw(context: CanvasRenderingContext2D, color:string)
	{
		context.beginPath();
		context.fillStyle = color;
		context.arc(this.center.x, this.center.y,
					this.r, 0, Math.PI * 2, false);
		context.fill();
	}

	init()
	{
		this.center.copy(this.mid);
		if (Math.random() >= 0.5)
			this.speed.set(-5, 0);
		else
			this.speed.set(5, 0);
	}

	collide(p: Player)
	{
		return collision(this, p);
	}

	move(p1: Player, p2: Player)
	{
		if (this.center.y >= CANVAS_HEIGHT)
		{
			this.center.y -= (this.center.y - CANVAS_HEIGHT);
			this.speed.y *= -1;
		}
		if (this.center.y <= 0)
		{
			this.center.y -= (this.center.y);
			this.speed.y *= -1;
		}
		if (this.center.x < CANVAS_WIDTH / 2)
		{
			if (this.collide(p1) == 0)
			{
				if (this.center.x <= 0)
					return 1;
			}
		}
		else
		{
			if (this.collide(p2) == 0)
			{
				if (this.center.x >= CANVAS_WIDTH)
					return 2;
			}
		}
		this.center.add(this.speed);
		return 0;
	}
}
