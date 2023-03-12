import { CounterService } from "../service/counter.service";
import { Request, Response, Router } from "express";
import { sendToAll } from "../utils/sendToAll";
import { serializeEvent } from "../utils/serializeEvent";

let clients: {id: number; response: Response}[] = []

export class CounterController {
    public path = '/counter';
    public router = Router();
    public counterService = new CounterService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getValue.bind(this));
        this.router.post(`${this.path}`, this.setValue.bind(this));
    }

    async checkOrCreateValue() {
        this.counterService.checkOrCreateInitialValue()
    }

    async getValue(req: Request, res: Response) {

        // Setting headers to keep connection and support SSE
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();


        const sseId = (new Date()).toLocaleTimeString();

        try {
            const value = await this.counterService.getCounterValue();
            res.write(serializeEvent(sseId, { value }));
        } catch (e) {
            res.status(502).json({ message: "Forbidden" });
        }

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response: res
        };

        clients.push(newClient);

        req.on('close', () => {
            clients = clients.filter(client => client.id !== clientId);
        });
    }

    async setValue(req: Request, res: Response) {
        try {
            const { value } = req.body;
            const result = await this.counterService.incrementValue(+value);

            const sseId = (new Date()).toLocaleTimeString();
            sendToAll(clients, serializeEvent(sseId, { value: result }))

            return res.json({ value: result });
        } catch (e) {
            return res.status(502).json({ message: "Forbidden" })
        }
    }
}
