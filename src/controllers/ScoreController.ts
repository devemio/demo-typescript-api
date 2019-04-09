import { validate, ValidationError } from "class-validator";
import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Score from "../models/Score";
import IScoreRepository from "../repositories/IScoreRepository";
import ScoreHelper from "../helpers/ScoreHelper";
import IFrame from "../contracts/IFrame";
import ScoreTransformer from "../transformers/ScoreTransformer";

@injectable()
export default class ScoreController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async index(req: express.Request, res: express.Response): Promise<express.Response> {
        const scores: Score[] = await this.scoreRepository.all();
        const total: number = ScoreHelper.getTotal(scores);
        const frames: IFrame[] = scores.map(score => ScoreTransformer.toFrame(score));
        return res.json({frames, total});
    }

    public async store(req: express.Request, res: express.Response): Promise<express.Response> {
        const request: IFrame = req.body;
        const score: Score = ScoreTransformer.toScore(request);

        const errors: ValidationError[] = await validate(score);
        if (errors.length > 0) {
            return res.status(422).json(errors);
        }

        await this.scoreRepository.save(score);
        return res.json(score);
    }
}
