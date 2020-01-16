import { Glslang } from "@webgpu/glslang";
let glslang: Glslang | undefined = undefined;
export default async function (): Promise<Glslang> {
  if (glslang !== undefined) return glslang;
  // @ts-ignore
  const glslangModule = await import(/* webpackIgnore: true */ 'https://unpkg.com/@webgpu/glslang@0.0.7/web/glslang.js');
  glslang = await glslangModule.default() as Glslang;
  return glslang;
}