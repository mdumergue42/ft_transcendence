import {Vector2} from './vector2.js'
import {Player} from './player.js'
import {collision} from './collision.js'

export class Ball
{
	mid: Vector2
	center: Vector2
	speed: Vector2
	speedUp: number
	r: number
	color: string
    constructor(_mid: Vector2)
    {
		this.mid = _mid;

		this.center = new Vector2();
		this.speed = new Vector2();
		this.init()

		this.speedUp = 1.1;
		this.r = 5;
		this.color = "blue";
    }

	draw(context: CanvasRenderingContext2D)
	{
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.center.x, this.center.y,
					this.r, 0, Math.PI * 2, false);
		context.fill();
	}

	init()
	{
		this.center.copy(this.mid);
		this.speed.random(5)
	}

	collide(p: Player)
	{
		return collision(this, p);
	}

	move(canvas: HTMLCanvasElement, p1: Player, p2: Player)
	{
		if (this.center.y >= canvas.height)
		{
			this.center.y -= (this.center.y - canvas.height);
			this.speed.y *= -1;
		}
		if (this.center.y <= 0)
		{
			this.center.y -= (this.center.y);
			this.speed.y *= -1;
		}
		if (this.center.x < canvas.width / 2)
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
				if (this.center.x >= canvas.width)
					return 2;
			}
		}
		this.center.add(this.speed);
		return 0;
	}
}
