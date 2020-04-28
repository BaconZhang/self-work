const CRLF = "\r\n";
const encoder = new TextEncoder();

function createResponse(bodyStr: string): Uint8Array {
    const resLines = [
        "HTTP/1.1 200",
        `content-length: ${bodyStr.length}`,
        '',
        bodyStr
    ];
    return encoder.encode(resLines.join(CRLF));
}

async function response(conn: Deno.Conn, content: string) {
    await conn.write(createResponse(content));
    conn.close();
}

async function server(options: Deno.ListenOptions) {
    const listener: Deno.Listener = Deno.listen(options);
    while(true) {
        const conn = await listener.accept();
        response(conn, "Hello World!");
    }
}

server({
    hostname: "127.0.0.1",
    port: 3000
});