import { validate, ValidationError } from "class-validator";
import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IFrame } from "../contracts/IFrame";
import { Score } from "../models/Score";
import IScoreRepository from "../repositories/IScoreRepository";

@injectable()
export default class ScoreController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async index(req: express.Request, res: express.Response): Promise<express.Response> {
        const scores: Score[] = await this.scoreRepository.all();
        const total: number = scores.map((score) => score.first + score.second + score.third).reduce((a, v) => a + v);
        const frames: IFrame[] = scores.map((score) => {
            const frame: IFrame = {
                first: score.first,
                second: score.second
            };
            if (score.third !== null) {
                frame.third = score.third;
            }
            return frame;
        });
        return res.json({frames, total});
    }

    public async store(req: express.Request, res: express.Response): Promise<express.Response> {
        const score = new Score();
        score.first = req.body.first;
        score.second = req.body.second;
        score.third = req.body.third;

        const errors: ValidationError[] = await validate(score);
        if (errors.length > 0) {
            return res.status(422).json(errors);
        }

        await this.scoreRepository.save(score);
        return res.json(score);
    }
}
