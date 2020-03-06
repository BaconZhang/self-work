const V_SHADER = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  uniform mat4 u_MvpMatrix;
  varying vec4 v_Color;
  void main() {
    gl_Position = u_MvpMatrix * a_Position;
    v_Color = a_Color;
  }
`;

const F_SHADER = `
  precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }
`;

const main = () => {
  const canvas = document.getElementById("webgl");
  const gl = WebglUtil.getWebglContext(canvas);

  const program = WebglUtil.initShaders(gl, V_SHADER, F_SHADER);
  /**
   * @param { WebGLRenderingContext } gl
   * @param { WebGLProgram } program
   */
  const initVertexBuffer = (gl, program) => {
    const verticesColor = new Float32Array([
      0.0, 1.0, -4.0, 0.4, 1.0, 0.4,
      -0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
      0.5, -1.0, -4.0, 0.4, 1.0, 0.4,

      0.0, 1.0, -2.0, 1.0, 1.0, 0.4,
      -0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
      0.5, -1.0, -2.0, 1.0, 1.0, 0.4,

      0.0, 1.0, 0.0, 0.4, 0.4, 1.0,
      -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
      0.5, -1.0, 0.0, 1.0, 0.4, 0.4,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColor, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, verticesColor.BYTES_PER_ELEMENT * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, verticesColor.BYTES_PER_ELEMENT * 6, verticesColor.BYTES_PER_ELEMENT * 3);
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  /**
   * @param {HTMLCanvasElement} canvas 
   * @param {WebGLRenderingContext} gl 
   * @param { WebGLProgram } program
   */
  const setMVPMatrix = (canvas, gl, program) => {
    const u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');

    const modelMatrix = new Matrix4();
    modelMatrix.setTranslate(0.75, 0, 0);

    const viewMatrix = new Matrix4();
    viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);


    const projMatrix = new Matrix4();
    projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

    const mvpMatrix = new Matrix4();
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);

    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
  }

  initVertexBuffer(gl, program);
  setMVPMatrix(canvas, gl, program);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 9);
}

main();