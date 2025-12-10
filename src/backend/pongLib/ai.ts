import {Player} from './player.js'
import {Ball} from './ball.js'
import {Vector2} from './vector2.js'
import {rtCollidePlane, moduloPi, getAngle} from './collision.js'
import {RECT_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH} from './global.js'

function getImpact(
	center: Vector2, speed: Vector2,
	st: Vector2, vx: number, height:number, rec: number
):[number, Vector2]
{
	var t = rtCollidePlane(center, speed, st.clone(), new Vector2(vx, 0));
	var impact = center.clone();
	var	v = speed.clone();
	v.multiplyScalar(t);
	impact.add(v);

	if (impact.y < 0 && rec > 0)
	{
		var thales = (impact.y - center.y) / (0 - center.y);
		var x = (impact.x - center.x) / thales;
		var revSpeed = speed.clone();
		revSpeed.y *= -1;
		return [getImpact(new Vector2(center.x + x, 0), revSpeed, st, vx, height, rec - 1)[0], revSpeed];
	}
	if (impact.y > height && rec > 0)
	{
		var thales = (impact.y - center.y) / (height - center.y);
		var x = (impact.x - center.x) / thales;
		var revSpeed = speed.clone();
		revSpeed.y *= -1;
		return [getImpact(new Vector2(center.x + x, height), revSpeed, st, vx, height, rec - 1)[0], revSpeed];
	}
	return [impact.y, speed];
}

function focus(speed: Vector2, y: number, width: number, point: number[])
{
    const normalMode = (phi :number, theta:number) =>
	{
		return moduloPi(theta + 2 * phi);
	};
    const func = normalMode;
	const angle = moduloPi(speed.angle());
    var dk_min = Infinity;
    var n_min = 0;
    for (let n = 0.1; n < 1; n += 0.05)
    {
        var alpha = func(getAngle(n), angle) * -1;
        const k = y - width * (Math.tan(alpha));
        for (var i = 0; i < point.length; i++)
        {
            var dk = Math.abs(point[i] - k);
            if (dk < dk_min)
            {
                dk_min = dk;
                n_min = n;
            }
        }
    }
    return n_min - 0.5;
}

export function ai(ball: Ball, self: Player)
{
	var impactSpeed, _;
	if (ball.speed.x <= 0)
	{
		var st = new Vector2(0, 0);
		var p_y;
		[p_y, impactSpeed] = getImpact(ball.center, ball.speed, st, 1, CANVAS_HEIGHT, 15);
		var p_center = new Vector2(0, p_y);
		var p_speed = impactSpeed.clone(); p_speed.x *= -1;
		[self.obj, impactSpeed] = getImpact(p_center, impactSpeed, self.st, 1, CANVAS_HEIGHT, 15)
		self.obj = (self.st.y + self.obj) / 2;

		return ;
	}
	[self.obj, impactSpeed] = getImpact(ball.center, ball.speed, self.st, 1, CANVAS_HEIGHT, 15);
	var points = [CANVAS_HEIGHT, 0];
	self.obj -= focus(impactSpeed.clone(), self.obj, CANVAS_WIDTH, points) * RECT_HEIGHT;
}
