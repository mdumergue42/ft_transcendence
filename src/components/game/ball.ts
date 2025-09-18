import {Vector2} from './vector2.js'

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

	move()
	{
		this.center.add(this.speed);
	}
}
