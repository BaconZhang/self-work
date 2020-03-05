import React, { Fragment, useEffect, useRef } from 'react';
import glslangModule from "@webgpu/glslang/dist/web-devel/glslang.onefile"

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("gpupresent") as RenderingContext;

      const init = async () => {
        const vertexShaderGLSL = `#version 450
          const vec2 pos[3] = vec2[3](vec2(0.0f, 0.5f), vec2(-0.5f, -0.5f), vec2(0.5f, -0.5f));
          void main() {
              gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);
          }
        `;

        const fragmentShaderGLSL = `#version 450
          layout(location = 0) out vec4 outColor;
          void main() {
              outColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
        `;

        const adapter = await (navigator.gpu as GPU).requestAdapter();
        const device = await adapter.requestDevice();
        const glslang = await glslangModule();

        const swapChainFormat = "bgra8unorm";
        // @ts-ignore:
        const swapChain: GPUSwapChain = ctx.configureSwapChain({
          device,
          format: swapChainFormat,
        });

        const pipeline = device.createRenderPipeline({
          layout: device.createPipelineLayout({ bindGroupLayouts: [] }),
          vertexStage: {
            module: device.createShaderModule({
              code: glslang.compileGLSL(vertexShaderGLSL, "vertex", true),
              // @ts-ignore
              source: vertexShaderGLSL,
              transform: (source: string) => glslang.compileGLSL(source, "vertex", true),
            }),
            entryPoint: "main"
          },
          fragmentStage: {
            module: device.createShaderModule({
              code: glslang.compileGLSL(fragmentShaderGLSL, "fragment", true),
              // @ts-ignore
              source: fragmentShaderGLSL,
              transform: (source: string) => glslang.compileGLSL(source, "fragment", true),
            }),
            entryPoint: "main"
          },
          primitiveTopology: "triangle-list",
          colorStates: [{
            format: swapChainFormat
          }]
        });

        function frame() {
          const commandEncoder = device.createCommandEncoder({});
          const textureView = swapChain.getCurrentTexture().createView();

          const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [{
              attachment: textureView,
              loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }
            }]
          };

          const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
          passEncoder.setPipeline(pipeline);
          passEncoder.draw(3, 1, 0, 0);
          passEncoder.endPass();

          device.defaultQueue.submit([commandEncoder.finish()]);
        }

        const doFrame = () => {
          frame();
          window.requestAnimationFrame(doFrame);
        }

        window.requestAnimationFrame(doFrame);
      }

      init();
    }
  }, []);
  return (
    <Fragment>
      <canvas id="canvas" width={500} height={500} ref={canvasRef}></canvas>
    </Fragment>
  );
}

export default App;
