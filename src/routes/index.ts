import express from "express";
import HomeController from "../controllers/HomeController";
import PostController from "../controllers/PostController";

const routes: express.Router = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => (new HomeController()).index(req, res));
routes.post("/game", (req: express.Request, res: express.Response) => (new PostController()).store(req, res));

export default routes;
