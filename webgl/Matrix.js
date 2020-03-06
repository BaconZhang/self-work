class Vector4 {
  constructor() {
    this.elements = new Float32Array(4);
  }
}

class Matrix4 {
  constructor() {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  /**
   * @returns {this}
   */
  setIdentity = () => {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
  }

  /**
   * @param {Matrix4} matrix
   * @returns {this}
   */
  multiply = (matrix) => {
    const a = this.elements;
    const b = matrix.elements;
    const e = this.elements;

    for (let i = 0; i < 4; i++) {
      const ai0 = a[i];
      const ai1 = a[i + 4];
      const ai2 = a[i + 8];
      const ai3 = a[i + 12];
      e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
      e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
      e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
      e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }

    return this;
  }

  /**
   * @param {Vector4} vector4
   * @returns {Vector4}
   */
  multiplyVector4 = (vector4) => {
    const e = this.elements;
    const p = vector4.elements;
    const v = new Vector4();
    const result = v.elements;

    result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
    result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
    result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
    result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

    return v;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {this}
   */
  translate = (x, y, z) => {
    const e = this.elements;
    e[12] += e[0] * x + e[4] * y + e[8] * z;
    e[13] += e[1] * x + e[5] * y + e[9] * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setTranslate = (x, y, z) => {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = x;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = y;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = z;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
  }

  /**
   * @param { number } eyeX
   * @param { number } eyeY
   * @param { number } eyeZ
   * @param { number } centerX
   * @param { number } centerY
   * @param { number } centerZ
   * @param { number } upX
   * @param { number } upY
   * @param { number } upZ
   */
  setLookAt = (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) => {
    let fx = centerX - eyeX;
    let fy = centerY - eyeY;
    let fz = centerZ - eyeZ;

    const rlf = 1 / Math.sqrt(fx ** 2 + fy ** 2 + fz ** 2);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;

    let sx = fy * upZ - fz * upY;
    let sy = fz * upX - fx * upZ;
    let sz = fx * upY - fy * upX;

    const rls = 1 / Math.sqrt(sx ** 2 + sy ** 2 + sz ** 2);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    let ux = sy * fz - sz * fy;
    let uy = sz * fx - sx * fz;
    let uz = sx * fy - sy * fx;

    const rlu = 1 / Math.sqrt(ux ** 2 + uy ** 2 + uz ** 2);
    ux *= rlu;
    uy *= rlu;
    uz *= rlu;

    const e = this.elements;
    e[0] = sx;
    e[1] = ux;
    e[2] = -fx;
    e[3] = 0;

    e[4] = sy;
    e[5] = uy;
    e[6] = -fy;
    e[7] = 0;

    e[8] = sz;
    e[9] = uz;
    e[10] = -fz;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;

    return this.translate(-eyeX, -eyeY, -eyeZ);
  }

  /**
   * @param { number } fovy
   * @param { number } aspect
   * @param { number } near
   * @param { number } far
   */
  setPerspective = (fovy, aspect, near, far) => {
    if (near === far || aspect === 0 || fovy === 0) {
      throw new Error("null frustum");
    }
    if (near <= 0) {
      throw new Error("near <= 0");
    }
    if (far <= 0) {
      throw new Error("far <= 0");
    }

    fovy = Math.PI * fovy / 180 / 2;
    const s = Math.sin(fovy);
    const rd = 1 / (far - near);
    const ct = Math.cos(fovy) / s;

    const e = this.elements;
    e[0] = ct / aspect;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = ct;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
  }

  /**
   * @param {Matrix4} src
   */
  set = (src) => {
    this.elements = Array.from(src.elements);
    return this;
  }
}