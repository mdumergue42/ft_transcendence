import {Vector2} from './vector2.js'
import {RECT_HEIGHT, RECT_WIDTH, RACKET_SPEED} from "./global.js"

export class Player
{
	static: Vector2
	racket: Vector2
	normal: Vector2
	obj: number
	color: string
    constructor(x: number, y: number, z: number)
    {
		if (x != 0)
			x -= RECT_WIDTH;
        this.static = new Vector2(x, y - RECT_HEIGHT / 2);
		this.racket = new Vector2();
		this.obj = 0;
		this.init();
		this.normal = new Vector2(0, z);
		this.color = "red";
    }

	init()
	{
		this.racket.copy(this.static);
		this.obj = this.static.y + RECT_HEIGHT / 2;
	}

	draw(context: CanvasRenderingContext2D)
	{
		context.fillStyle = this.color;
		context.fillRect(this.racket.x, this.racket.y,
			RECT_WIDTH, RECT_HEIGHT);
	}

	setObj(y: number)
	{
		this.obj = y;
	}

	move()
	{
		var v = new Vector2(0, this.obj - this.racket.y - RECT_HEIGHT / 2);
		if (v.length() < RACKET_SPEED)
			return ;
		v.setLength(RACKET_SPEED);
		this.racket.add(v);
		this.racket.y = Math.min(Math.max(0, this.racket.y), this.static.y * 2);
	}
}
