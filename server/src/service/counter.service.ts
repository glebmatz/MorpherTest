import { Repository } from "typeorm";
import { Counter } from "../model/counter.model";
import { AppDataSource } from "../data-source";

export class CounterService {
    repository: Repository<Counter> = AppDataSource.getRepository(Counter);

    async checkOrCreateInitialValue() {
        const initialValue = await this.repository.findOneBy({ id: 1 });

        if (!initialValue) {
            await this.repository.save(new Counter());
        }
    }

    async getCounterValue() {
        try {
            const value = await this.repository.findOneBy({ id: 1 });
            return value?.counter;
        } catch (e) {
            throw new Error();
        }
    }

    async incrementValue(count: number) {
        try {
            await this.repository.increment({ id: 1 }, "counter", count);
            return await this.getCounterValue();
        } catch (e) {
            throw new Error();
        }
    }
}
