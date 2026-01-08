export default {
    async fetch(req: Request) {
        return new Response("Bun chambeanding");
    } 
}

console.log(`Server running at http://localhost:3000`);