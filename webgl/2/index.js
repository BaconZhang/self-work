const V_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
  gl_Position = a_Position;
  v_Color = a_Color;
}`;

const F_SOURCE = `
precision mediump float;
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}
`;

function main() {
  const canvas = document.getElementById("webgl");
  const gl = WebglUtil.getWebglContext(canvas);

  const program = WebglUtil.initShaders(gl, V_SOURCE, F_SOURCE);

  /**
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLProgram} program
   */
  const initVertexBuffers = (gl, program) => {
    const vertices = new Float32Array([
      0, 0.5, 1.0, 0.0, 0.0, 1.0,
      -0.5, -0.5, 0.0, 1.0, 0.0, 1.0,
      0.5, -0.5, 0.0, 0.0, 1.0, 1.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 6 * vertices.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 6 * vertices.BYTES_PER_ELEMENT, 2 * vertices.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  initVertexBuffers(gl, program);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main();