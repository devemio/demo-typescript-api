import express from "express";

export default class HomeController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        res.json({success: true});
    }
}
