export class Vector2
{
	x:number;
	y:number;
	constructor(x: number = 0, y: number = 0)
    {
		this.x = x;
		this.y = y;
	}

	/**
	 * set x and y
	 * @param a - x 
	 * @param b - y 
	 */
	set(a: number, b: number)
	{
		this.x = a;
		this.y = b;

		return this;
	}

	/**
	 * copy the other Vector
	 * @param v - other vector.
	 */
	copy(v: Vector2)
	{
		this.x = v.x;
		this.y = v.y;

		return this;
	}

	/**
	 * cloning the Vector
	 */
	clone()
	{
		return new Vector2(this.x, this.y);
	}

    /**
     * @param v - other vector.
     */
	add(v: Vector2)
    {
		this.x += v.x;
		this.y += v.y;

		return this;
	} 

	/**
	 * @param a - The first vector.
	 * @param b - The second vector.
	 */
	addVectors(a: Vector2, b: Vector2)
    {
		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;
	}

    /**
     * @param v - other vector.
     */
	sub(v: Vector2)
    {
		this.x -= v.x;
		this.y -= v.y;

		return this;
	} 


	/**
	 * @param a - The first vector.
	 * @param b - The second vector.
	 */
	subVectors(a: Vector2, b: Vector2)
    {
		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;
	}

	/**
	 * @param v - other vector.
	 */
	divide(v: Vector2)
	{
		this.x /= v.x;
		this.y /= v.y;

		return this;
	}

	/**
	 * @param v - other vector.
	 */
	multiply(v: Vector2)
    {
		this.x *= v.x;
		this.y *= v.y;

		return this;
    }

	/**
	 * @param scalar 
	 */
	multiplyScalar(scalar: number)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	/**
	 * @param v - other vector.
	 */
	dot(v: Vector2)
    {
		return this.x * v.x + this.y * v.y;
    }

	/**
	 * @param v - other vector.
	 */
	cross(v: Vector2)
    {
		return this.x * v.y - this.y * v.x;
    }

	normalize()
    {
		return this.multiplyScalar(1 / (this.length() || 1));
    }

	/**
	 * angle in radians.
	 */
	angle()
    {
		const phi = Math.atan2(-this.y, -this.x) + Math.PI;
		return phi;
    }

	/**
	 * angle in degree.
	 */
	angleDegree()
    {
		return this.angle() * 180/Math.PI;
    }

	/**
	 * squarre of length.
	 */
	lengthSq()
    {
		return this.x * this.x + this.y * this.y;
    }

    /**
	 * length.
	 */
	length()
    {
		return Math.sqrt(this.lengthSq());
    }

	/**
	 * angle in radians.
	 * @param v - other vector.
	 */
	angleTo(v: Vector2)
    {
		const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());

		if (denominator === 0) return Math.PI / 2;

		const theta = this.dot(v) / denominator;

        var t = Math.min(Math.max(theta, -1), 1);
		return Math.acos(t);
	}

	/**
	 * @param v - other vector.
	 */
    distanceToSquared(v: Vector2)
    {
		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;
    }

	/**
	 * @param v - other vector.
	 */
	distanceTo(v: Vector2)
    {
		return Math.sqrt(this.distanceToSquared(v));
	}

	/**
	 * @param length - The new length of this vector.
	 * @param phi - optinal angle to set
	 */
	setLengthPhi(length: number, phi: number)
    {
		this.x = Math.cos(phi) * length;
		this.y = Math.sin(phi) * length;
		return this
	}
	/**
	 * @param length - The new length of this vector.
	 */
	setLength(length: number)
    {
		return this.normalize().multiplyScalar(length);
	}

	/**
	 * is equal.
	 * @param v - other vector.
	 */
	equals(v: Vector2)
    {
		return ((v.x === this.x) && (v.y === this.y));
	}

	/**
	 * @param angle - angle in radians.
	 */
	rotate(phi: number)
    {
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
	min(v: Vector2)
	{
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);

		return this;
	}

	/**
	 * x = max(this.x, other.x)...
	 * @param v - other vector.
	 */
	max(v: Vector2)
	{
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);

		return this;
	}


	/**
	 * @param len
	 */
	random(len: number)
    {
		this.x = (Math.random() - 0.5) * 5;
		this.y = (Math.random() - 0.5);
		this.setLength(len);

		return this;
    }
}
