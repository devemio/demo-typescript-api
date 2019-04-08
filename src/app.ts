import bodyParser from "body-parser";
import express from "express";
import { container } from "tsyringe";
import ScoreRepository from "./repositories/db/ScoreRepository";
import routes from "./routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init();
        this.registerInterfaces();
    }

    private init(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use("/", routes);
    }

    private registerInterfaces(): void {
        container.register("IScoreRepository", {useClass: ScoreRepository});
    }
}

export default new App().app;
