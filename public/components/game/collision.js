import { Vector2 } from './vector2.js';
import { RECT_HEIGHT, RECT_WIDTH, MAX_SPEED } from './global.js';
function raytracingCollideRect(ball, player) {
    var t1 = new Vector2();
    var t2 = new Vector2();
    var mins = player.racket.clone();
    var maxs = new Vector2(mins.x + RECT_WIDTH, mins.y + RECT_HEIGHT);
    var v = ball.speed.clone();
    v.normalize();
    t1.subVectors(mins, ball.center);
    t2.subVectors(maxs, ball.center);
    t1.divide(v);
    t2.divide(v);
    var tmp = t1.clone();
    t1.min(t2);
    tmp.max(t2);
    var fareset_t = Math.min(tmp.x, tmp.y);
    var nearest_t = Math.max(t1.x, t1.y);
    if (nearest_t < fareset_t)
        return (nearest_t);
    return (-1);
}
function moduloPi(phi) {
    let result = (phi + Math.PI) % (2 * Math.PI);
    if (result < 0)
        result += 2 * Math.PI;
    return result - Math.PI;
}
function getAngle(x) {
    return Math.PI / 5 * x - Math.PI / 10;
}
export function collision(ball, player) {
    var t = raytracingCollideRect(ball, player);
    if (t <= 0) {
        ball.center.add(ball.speed);
        return 0;
    }
    var len = ball.speed.length();
    if (t <= len) {
        var v = ball.speed.clone();
        var impact = ball.center.clone();
        v.setLength(t);
        impact.add(v);
        const normalMode = (phi, speed) => {
            speed.multiplyScalar(player.normal.y);
            var theta = moduloPi(moduloPi(-speed.angle() * -player.normal.y) + phi);
            return Math.min(Math.PI * 2 / 5, Math.max(moduloPi(theta + phi), -Math.PI * 2 / 5));
        };
        const nostaligiaMode = (phi, speed) => {
            return 2 * phi;
        };
        const phi = getAngle((impact.y - player.racket.y) / RECT_HEIGHT);
        const func = normalMode;
        const angle = func(phi, ball.speed);
        if (Math.abs(ball.speed.x) < MAX_SPEED)
            ball.speed.setLengthPhi(len * ball.speedUp, angle);
        if (player.normal.y == 1)
            ball.speed.x *= -1;
        v.copy(ball.speed);
        v.setLength((len - t) * ball.speedUp);
        impact.add(v);
        ball.center.copy(impact);
        return 1;
    }
}
