const decoder = new TextDecoder();
const encoder = new TextEncoder();

const str = "Hello world!";
const stream = encoder.encode(str);
const reader = new Deno.Buffer(stream);
const chunk: Uint8Array = new Uint8Array(13);

async function main() {
  const result = await reader.read(chunk);
  console.log(result);
  console.log(decoder.decode(chunk));
}

main();
