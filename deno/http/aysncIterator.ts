const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

let count = 0;
async function createServer(options: Deno.ListenOptions) {
    const listener: Deno.Listener = Deno.listen(options);

    for await (const conn of listener) {
        const buffer = new Uint8Array(1024);
        await conn.read(buffer);
        const str = textDecoder.decode(buffer);

        if (!str.includes(".ico")) {
            count += 1;
        }
        const CRLF = "\r\n";
        const bodyStr = `This is count of ${count}`;
        const resLines = [
            "HTTP/1.1 200",
            `content-length: ${bodyStr.length}`,
            '',
            bodyStr
        ];
        await conn.write(textEncoder.encode(resLines.join(CRLF)));
        conn.close();
    }
}

createServer({
    hostname: "127.0.0.1",
    port: 3000
});