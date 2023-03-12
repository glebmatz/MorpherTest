import dotenv from "dotenv";

dotenv.config();

const { PORT, PG_USER, PG_HOST, PG_PASSWORD, PG_PORT, PG_DATABASE } = process.env

export const ENV = { PORT, PG_USER, PG_HOST, PG_PASSWORD, PG_PORT, PG_DATABASE }
