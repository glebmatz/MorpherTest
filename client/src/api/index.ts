import axios from "axios";

export type TEventData = {
    value: number;
}

export const sendCounterUpdate = async () => {
    try {
        return await axios.post<TEventData>("/api/counter", { value: 1 });
    } catch (e) {
        console.error(e);
    }
}
