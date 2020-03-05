const V_SHADER = `
attribute vec4 a_Position;
void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}
`;

const F_SHADER = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;

function main() {
  const canvas = document.getElementById("webgl");
  const gl = Util.getWebglContext(canvas);

  const program = Util.initShaders(gl, V_SHADER, F_SHADER);

  const a_Position = gl.getAttribLocation(program, "a_Position");
  gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);

  const u_FragColor = gl.getUniformLocation(program, "u_FragColor");
  gl.uniform4f(u_FragColor, 0.0, 0.8, 0.0, 1.0);

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}

main();