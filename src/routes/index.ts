import express from "express";
import HomeController from "../controllers/HomeController";

const routes: express.Router = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => (new HomeController()).index(req, res));

export default routes;