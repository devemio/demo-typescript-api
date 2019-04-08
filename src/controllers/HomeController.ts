import express from "express";

export default class HomeController {
    public index(req: express.Request, res: express.Response) {
        res.json({success: true});
    }
}
