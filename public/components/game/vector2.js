export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * set x and y
     * @param a - x
     * @param b - y
     */
    set(a, b) {
        this.x = a;
        this.y = b;
        return this;
    }
    /**
     * copy the other Vector
     * @param v - other vector.
     */
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    /**
     * cloning the Vector
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
    /**
     * @param v - other vector.
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }
    /**
     * @param v - other vector.
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }
    /**
     * @param v - other vector.
     */
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
     * @param v - other vector.
     */
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * @param scalar
     */
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /**
     * @param v - other vector.
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    /**
     * @param v - other vector.
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    normalize() {
        return this.multiplyScalar(1 / (this.length() || 1));
    }
    /**
     * angle in radians.
     */
    angle() {
        const phi = Math.atan2(-this.y, -this.x) + Math.PI;
        return phi;
    }
    /**
     * angle in degree.
     */
    angleDegree() {
        return this.angle() * 180 / Math.PI;
    }
    /**
     * squarre of length.
     */
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * length.
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }
    /**
     * angle in radians.
     * @param v - other vector.
     */
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0)
            return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        var t = Math.min(Math.max(theta, -1), 1);
        return Math.acos(t);
    }
    /**
     * @param v - other vector.
     */
    distanceToSquared(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    /**
     * @param v - other vector.
     */
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    /**
     * @param length - The new length of this vector.
     * @param phi - optinal angle to set
     */
    setLengthPhi(length, phi) {
        this.x = Math.cos(phi) * length;
        this.y = Math.sin(phi) * length;
        return this;
    }
    /**
     * @param length - The new length of this vector.
     */
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    /**
     * is equal.
     * @param v - other vector.
     */
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y));
    }
    /**
     * @param angle - angle in radians.
     */
    rotate(phi) {
        const theta = this.angle();
        const len = this.length();
        this.x = Math.cos(theta + phi) * len;
        this.y = Math.sin(theta + phi) * len;
        return this;
    }
    /**
     * x = min(this.x, other.x)...
     * @param v - other vector.
     */
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    /**
     * x = max(this.x, other.x)...
     * @param v - other vector.
     */
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    /**
     * @param len
     */
    random(len) {
        this.x = (Math.random() - 0.5) * 5;
        this.y = (Math.random() - 0.5);
        this.setLength(len);
        return this;
    }
}
