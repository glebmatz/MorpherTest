import "reflect-metadata";
import express, { Express } from "express";
import { ENV } from "./src/environment";
import { AppDataSource } from "./src/data-source";
import { CounterController } from "./src/controller/counter.conroller";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = ENV.PORT;

const controller = new CounterController();
app.use('/', controller.router);

AppDataSource.initialize()
    .then(() => {
        controller.checkOrCreateValue();
        app.listen(port, () => {
            console.log(`[server]: Server is running`);
        });
    })
    .catch((error) => console.error(error))

