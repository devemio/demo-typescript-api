import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init();
    }

    private init(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use("/", routes);
    }
}

export default new App().app;
