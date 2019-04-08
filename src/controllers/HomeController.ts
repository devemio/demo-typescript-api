import express from "express";

export default class HomeController {
    public index(req: express.Request, res: express.Response) {
        res.status(200).send({success: true});
    }
}
