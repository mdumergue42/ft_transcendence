import {Vector2} from './vector2.js'
import {RECT_HEIGHT, RECT_WIDTH, RACKET_SPEED} from "./global.js"

export class Player
{
	st: Vector2
	racket: Vector2
	normal: Vector2
	obj: number
	color: string
	keysPressed: [number, number]
	ia: boolean
    constructor(x: number, y: number, z: number, ia:boolean)
    {
		if (x != 0)
			x -= RECT_WIDTH;
        this.st = new Vector2(x, y - RECT_HEIGHT / 2);
		this.racket = new Vector2();
		this.obj = 0;
		this.init();
		this.normal = new Vector2(0, z);
		this.color = "red";
		this.keysPressed = [0, 0];
		this.ia = ia;
    }

	init()
	{
		this.racket.copy(this.st);
		this.obj = this.st.y + RECT_HEIGHT / 2;
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
		var v;
		if (this.ia == true)
		{
			v = new Vector2(0, this.obj - this.racket.y - RECT_HEIGHT / 2);
			v.setLength(Math.min(RACKET_SPEED, v.length()));
		}
		else
		{
			var	direction = this.keysPressed[1] - this.keysPressed[0];
			v = new Vector2(0, RACKET_SPEED * direction);
		}
		this.racket.add(v);
		this.racket.y = Math.min(Math.max(0, this.racket.y), this.st.y * 2);
	}
}
