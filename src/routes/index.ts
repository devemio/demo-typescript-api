import express from "express";
import HomeController from "../controllers/HomeController";
import PostController from "../controllers/PostController";
import { container } from "tsyringe";

const routes: express.Router = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => container.resolve(HomeController).index(req, res));
routes.post("/game", (req: express.Request, res: express.Response) => container.resolve(PostController).store(req, res));

export default routes;
