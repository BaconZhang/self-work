class Util {
  /**
   * @param {HTMLCanvasElement} canvas 
   * @returns {WebGLRenderingContext}
   */
  static getWebglContext = (canvas) => {
    return canvas.getContext("webgl");
  }

  /**
   * @param {WebGLRenderingContext} gl
   * @param {number} type 
   * @param {string} source
   * @returns {WebGLShader}
   */
  static loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  /**
   * @param {WebGLRenderingContext} gl
   * @param {string} vSource
   * @param {string} fSource
   * @returns {WebGLProgram}
   */
  static createProgram = (gl, vSource, fSource) => {
    const vShader = Util.loadShader(gl, gl.VERTEX_SHADER, vSource);
    const fShader = Util.loadShader(gl, gl.FRAGMENT_SHADER, fSource);

    const program = gl.createProgram();

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }

  /**
   * @param {WebGLRenderingContext} gl 
   * @param {string} vSource 
   * @param {string} fSource 
   * @returns {WebGLProgram}
   */
  static initShaders = (gl, vSource, fSource) => {
    const program = Util.createProgram(gl, vSource, fSource);
    gl.useProgram(program);
    return program;
  }
}