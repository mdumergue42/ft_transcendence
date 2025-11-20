import {Vector2} from './vector2.js'
import {RECT_HEIGHT, RECT_WIDTH, RACKET_SPEED, CANVAS_HEIGHT} from "./global.js"

export class Player
{
	st: Vector2
	racket: Vector2
	normal: Vector2
	obj: number
	keysPressed: [number, number] //TODO JSP
	ia: boolean
	//x = 0 or canvas.widht (column)
	//ia = 0 or 1 (ia)
    constructor(x: number, ia:boolean)
    {
		if (x != 0)
			x -= RECT_WIDTH;
		//const
		this.ia = ia;
		this.normal = new Vector2(0, (x == 0 ? -1 : 1));
		this.st = new Vector2(x, (CANVAS_HEIGHT - RECT_HEIGHT) / 2);

		this.racket = new Vector2();
		this.obj = 0;
		this.keysPressed = [0, 0];
		this.init();

    }

	init()
	{
		this.racket.copy(this.st);
		this.obj = this.st.y + RECT_HEIGHT / 2;
	}

	draw(context: CanvasRenderingContext2D, color: string)
	{
		context.fillStyle = color;
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
