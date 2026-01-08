const server = Bun.serve({
    port: process.env.PORT ?? 3000,
    async fetch(req) {
        return new Response("Api de BUN chambeanding");
    }
})

console.log(`Server running at http://localhost:${server.port}`);