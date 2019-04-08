import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import HomeController from "../controllers/HomeController";
import PostController from "../controllers/PostController";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => container.resolve(HomeController).index(req, res));
routes.post("/game", (req: Request, res: Response) => container.resolve(PostController).store(req, res));

export default routes;
