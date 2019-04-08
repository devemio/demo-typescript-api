import express from "express";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";
import "reflect-metadata";

@injectable()
export default class PostController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public store(req: express.Request, res: express.Response): void {
        this.scoreRepository.delete();
        res.status(204).send();
    }
}
