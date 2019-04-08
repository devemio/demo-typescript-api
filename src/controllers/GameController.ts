import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";

@injectable()
export default class GameController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async store(req: express.Request, res: express.Response): Promise<void> {
        await this.scoreRepository.delete();
        res.status(204).send();
    }
}
