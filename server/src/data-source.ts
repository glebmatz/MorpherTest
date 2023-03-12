import { DataSource } from "typeorm";
import { ENV } from "./environment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.PG_HOST,
    port: ENV.PG_PORT ? Number(ENV.PG_PORT) : 5432,
    username: ENV.PG_USER,
    password: ENV.PG_PASSWORD,
    database: ENV.PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.model.{js,ts}'],
    subscribers: [],
    migrations: [],
})
