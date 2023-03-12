import { Response } from "express";

export const sendToAll = <T extends {}>(clients: {id: number; response: Response}[], data: T) => {
    clients.forEach(client => client.response.write(data))
}
