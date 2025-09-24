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
export function moduloPi(phi) {
    let result = (phi + Math.PI) % (2 * Math.PI);
    if (result < 0)
        result += 2 * Math.PI;
    return result - Math.PI;
}
export function getAngle(x) {
    return Math.PI / 5 * x - Math.PI / 10;
}
export function collision(ball, player) {
    var t = raytracingCollideRect(ball, player);
    if (t <= 0)
        return 0;
    var len = ball.speed.length();
    if (t <= len) {
        var v = ball.speed.clone();
        var impact = ball.center.clone();
        v.setLength(t);
        impact.add(v);
        const normalMode = (phi, speed) => {
            speed.multiplyScalar(player.normal.y);
            var theta = (speed.angle() * player.normal.y);
            var r = moduloPi(theta + 2 * phi);
            return Math.min(Math.PI * 2 / 5, Math.max(-Math.PI * 2 / 5, r));
        };
        const phi = getAngle((impact.y - player.racket.y) / RECT_HEIGHT);
        const func = normalMode;
        const angle = func(phi, ball.speed);
        var new_speed = (Math.abs(ball.speed.x) < MAX_SPEED) ? len * ball.speedUp : len;
        ball.speed.setLengthPhi(new_speed, angle);
        if (player.normal.y == 1)
            ball.speed.x *= -1;
        v.copy(ball.speed);
        v.setLength((len - t) * ball.speedUp);
        impact.add(v);
        ball.center.copy(impact);
        return 1;
    }
}
export function rtCollidePlane(center, speed, planePoint, planeVector) {
    planePoint.sub(center);
    return (planePoint.dot(planeVector) / speed.dot(planeVector));
}
