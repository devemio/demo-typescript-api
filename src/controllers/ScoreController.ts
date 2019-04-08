import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";

@injectable()
export default class ScoreController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public index(req: express.Request, res: express.Response): void {
        this.scoreRepository.all();
        res.status(204).send();
    }

    public update(req: express.Request, res: express.Response): void {
        this.scoreRepository.all();
        res.status(204).send();
    }
}
