import express from "express";

export default class PostController {
    public store(req: express.Request, res: express.Response) {
        // @fixme Clears all previous results and starts a new game
        res.status(204).send();
    }
}
