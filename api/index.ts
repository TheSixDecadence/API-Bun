import { cerebrasService } from "../services/cerebras";
import { groqService } from "../services/groq";
import type { AIService, ChatMessage } from "../services/types";

const services: AIService[] = [
    groqService,
    cerebrasService
]
let currentServiceIndex = 0;

function getNextService() {
    const service = services[currentServiceIndex];
    currentServiceIndex = (currentServiceIndex + 1) % services.length;
    return service;
}

export default {
    async fetch(req: Request) {
        const { pathname } = new URL(req.url);

        if (req.method === 'POST' && pathname === '/chat') {
            const { messages } = await req.json() as { messages: ChatMessage[] };
            const service = getNextService();
            
            console.log(`Using service: ${service?.name}`);

            const stream = await service?.chat(messages);

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        }
        return new Response('not found', { status: 404 })
    } 
}

console.log(`Server running at http://localhost:3000`);