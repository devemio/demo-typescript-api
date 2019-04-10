import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import FrameValidator, { IFrameValidatorError } from "../contracts/FrameValidator";
import IFrame from "../contracts/IFrame";
import ScoreCalculator from "../helpers/ScoreCalculator";
import Score from "../models/Score";
import IScoreRepository from "../repositories/IScoreRepository";
import ScoreTransformer from "../transformers/ScoreTransformer";

@injectable()
export default class ScoreController {
    constructor(
        @inject("IScoreRepository") protected scoreRepository: IScoreRepository,
        protected frameValidator: FrameValidator
    ) {
    }

    public async index(req: express.Request, res: express.Response): Promise<express.Response> {
        const scores: Score[] = await this.scoreRepository.all();
        const total: number = ScoreCalculator.getTotal(scores);
        const frames: IFrame[] = scores.map((score) => ScoreTransformer.toFrame(score));
        return res.json({frames, total});
    }

    public async store(req: express.Request, res: express.Response): Promise<express.Response> {
        const request: IFrame = req.body;
        const errors: IFrameValidatorError[] = await this.frameValidator.validate(request);
        if (errors.length > 0) {
            return res.status(422).json(errors);
        }

        const score: Score = ScoreTransformer.toScore(request);
        await this.scoreRepository.save(score);
        return res.json(ScoreTransformer.toFrame(score));
    }
}
