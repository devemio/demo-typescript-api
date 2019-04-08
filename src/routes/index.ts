import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import GameController from "../controllers/GameController";
import HomeController from "../controllers/HomeController";
import ScoreController from "../controllers/ScoreController";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => container.resolve(HomeController).index(req, res));
routes.post("/game", (req: Request, res: Response) => container.resolve(GameController).store(req, res));

routes.get("/scores", (req: Request, res: Response) => container.resolve(ScoreController).index(req, res));
routes.put("/scores", (req: Request, res: Response) => container.resolve(ScoreController).update(req, res));

export default routes;
