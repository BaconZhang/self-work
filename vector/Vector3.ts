const magVector = (vector: Vector3) => Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);

class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(vector3: Vector3) {
    return vector3.x === this.x && vector3.y === this.y && vector3.z === this.z;
  }

  zero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  reverse() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }

  add(vector3: Vector3) {
    return new Vector3(
      this.x + vector3.x,
      this.y + vector3.y,
      this.z + vector3.z
    )
  }

  minus(vector3: Vector3) {
    return new Vector3(
      this.x - vector3.x,
      this.y - vector3.y,
      this.z - vector3.z
    )
  }

  mul(num: number) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
  }

  div(num: number) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
  }

  normalize() {
    this.x = this.x / this.mag();
    this.y = this.y / this.mag();
    this.z = this.z / this.mag();
  }

  mag() {
    return magVector(this);
  }
}

const product = (a: Vector3, b: Vector3) => {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

const crossProduct = (a: Vector3, b) => {
  return new Vector3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
}
